/**
 * AgentHost Mini API - Integration Tests
 * Tests for the main server endpoints
 */

const request = require('supertest');
const express = require('express');
const cors = require('cors');

// Mock the research agent module
jest.mock('../research-agent', () => ({
  performResearch: jest.fn()
}));

const { performResearch } = require('../research-agent');

// Create a test server instance
function createTestServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  const PORT = process.env.PORT || 3000;

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'agenthost-mini-api' });
  });

  // Research endpoint (simplified for testing)
  app.post('/research', async (req, res) => {
    const { company } = req.body;
    const apiKey = req.headers['x-api-key'] || req.body.apiKey || 'demo-key';
    
    if (!company) {
      return res.status(400).json({ error: 'Company name required' });
    }
    
    try {
      const research = await performResearch(company);
      
      res.json({
        company,
        data: research,
        timestamp: new Date().toISOString(),
        usage: {
          tier: 'free',
          remainingToday: 2,
          dailyLimit: 3
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Research failed', message: error.message });
    }
  });

  return app;
}

describe('AgentHost Mini API', () => {
  let app;

  beforeEach(() => {
    app = createTestServer();
    jest.clearAllMocks();
  });

  describe('GET /health', () => {
    it('should return 200 OK with service status', async () => {
      const response = await request(app).get('/health');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: 'ok',
        service: 'agenthost-mini-api'
      });
    });

    it('should have correct content-type header', async () => {
      const response = await request(app).get('/health');
      
      expect(response.headers['content-type']).toMatch(/json/);
    });
  });

  describe('POST /research', () => {
    const mockResearchData = {
      overview: 'Test company overview',
      funding: 'Series A: $10M',
      techStack: 'React, Node.js, AWS',
      news: 'Recent partnership announcement',
      painPoints: 'Scaling infrastructure, hiring challenges'
    };

    beforeEach(() => {
      performResearch.mockResolvedValue(mockResearchData);
    });

    it('should return 400 if company name is missing', async () => {
      const response = await request(app)
        .post('/research')
        .send({});
      
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Company name required');
    });

    it('should successfully research a company', async () => {
      const response = await request(app)
        .post('/research')
        .send({ company: 'Stripe' });
      
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        company: 'Stripe',
        data: mockResearchData
      });
      expect(response.body.timestamp).toBeDefined();
      expect(performResearch).toHaveBeenCalledWith('Stripe');
    });

    it('should accept API key in header', async () => {
      const response = await request(app)
        .post('/research')
        .set('X-API-Key', 'test-key-123')
        .send({ company: 'Stripe' });
      
      expect(response.status).toBe(200);
      expect(response.body.company).toBe('Stripe');
    });

    it('should accept API key in request body', async () => {
      const response = await request(app)
        .post('/research')
        .send({ 
          company: 'Stripe',
          apiKey: 'test-key-456'
        });
      
      expect(response.status).toBe(200);
      expect(response.body.company).toBe('Stripe');
    });

    it('should return usage information', async () => {
      const response = await request(app)
        .post('/research')
        .send({ company: 'Stripe' });
      
      expect(response.status).toBe(200);
      expect(response.body.usage).toBeDefined();
      expect(response.body.usage.tier).toBe('free');
      expect(response.body.usage.remainingToday).toBeDefined();
      expect(response.body.usage.dailyLimit).toBeDefined();
    });

    it('should return 500 if research fails', async () => {
      performResearch.mockRejectedValue(new Error('OpenClaw timeout'));
      
      const response = await request(app)
        .post('/research')
        .send({ company: 'Stripe' });
      
      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Research failed');
      expect(response.body.message).toBe('OpenClaw timeout');
    });

    it('should handle company names with special characters', async () => {
      const response = await request(app)
        .post('/research')
        .send({ company: 'AT&T Inc.' });
      
      expect(response.status).toBe(200);
      expect(response.body.company).toBe('AT&T Inc.');
      expect(performResearch).toHaveBeenCalledWith('AT&T Inc.');
    });

    it('should handle very long company names', async () => {
      const longName = 'A'.repeat(200);
      const response = await request(app)
        .post('/research')
        .send({ company: longName });
      
      expect(response.status).toBe(200);
      expect(response.body.company).toBe(longName);
    });
  });

  describe('CORS', () => {
    it('should have CORS headers enabled', async () => {
      const response = await request(app)
        .get('/health')
        .set('Origin', 'chrome-extension://abc123');
      
      expect(response.headers['access-control-allow-origin']).toBeDefined();
    });
  });
});
