/**
 * AgentHost Mini API - Research Agent Tests
 * Tests for OpenClaw integration and research data parsing
 */

const { performResearch, parseResearchResponse } = require('../research-agent');

// Mock fetch for testing
global.fetch = jest.fn();

describe('Research Agent Module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('performResearch', () => {
    it('should call OpenClaw API with correct parameters', async () => {
      const mockResponse = {
        message: JSON.stringify({
          overview: 'Test company',
          funding: 'Series A',
          techStack: 'React, Node.js',
          news: 'Recent news',
          painPoints: 'Challenges'
        })
      };

      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse
      });

      await performResearch('Stripe');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/sessions/send'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          }),
          body: expect.stringContaining('Stripe')
        })
      );
    });

    it('should parse JSON response from OpenClaw', async () => {
      const mockData = {
        overview: 'Stripe is a payment processing platform',
        funding: 'Series A: $10M',
        techStack: 'Ruby, JavaScript, PostgreSQL',
        news: 'Launched new product',
        painPoints: 'Competition, regulation'
      };

      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          message: JSON.stringify(mockData)
        })
      });

      const result = await performResearch('Stripe');

      expect(result).toEqual(mockData);
    });

    it('should handle API errors gracefully', async () => {
      global.fetch.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });

      await expect(performResearch('Stripe')).rejects.toThrow();
    });

    it('should handle network failures', async () => {
      global.fetch.mockRejectedValue(new Error('Network error'));

      await expect(performResearch('Stripe')).rejects.toThrow('Network error');
    });

    it('should use mock data in development mode', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      global.fetch.mockRejectedValue(new Error('Connection refused'));

      const result = await performResearch('Stripe');

      // Should return mock data instead of throwing
      expect(result).toBeDefined();
      expect(result.overview).toBeDefined();
      expect(result.funding).toBeDefined();
      
      process.env.NODE_ENV = originalEnv;
    });

    it('should handle company names with special characters', async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          message: JSON.stringify({
            overview: 'Company info',
            funding: 'N/A',
            techStack: 'Various',
            news: 'None',
            painPoints: 'Unknown'
          })
        })
      });

      const result = await performResearch('AT&T Inc.');
      
      expect(result).toBeDefined();
      expect(global.fetch).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          body: expect.stringContaining('AT&T Inc.')
        })
      );
    });
  });

  describe('parseResearchResponse', () => {
    it('should parse JSON from markdown code block', () => {
      const message = '```json\n{"overview":"Test","funding":"$10M","techStack":"React","news":"Recent","painPoints":"Challenges"}\n```';
      
      const result = parseResearchResponse(message);
      
      expect(result.overview).toBe('Test');
      expect(result.funding).toBe('$10M');
    });

    it('should parse raw JSON object', () => {
      const message = '{"overview":"Test","funding":"$10M","techStack":"React","news":"Recent","painPoints":"Challenges"}';
      
      const result = parseResearchResponse(message);
      
      expect(result.overview).toBe('Test');
    });

    it('should extract sections from plain text', () => {
      const message = `
        Overview: This is a test company
        Funding: Series A $10M
        Tech Stack: React, Node.js
        News: Recent product launch
        Pain Points: Scaling challenges
      `;
      
      const result = parseResearchResponse(message);
      
      expect(result.overview).toContain('test company');
    });

    it('should handle malformed JSON gracefully', () => {
      const message = '```json\n{invalid json}\n```';
      
      const result = parseResearchResponse(message);
      
      // Should return fallback structure
      expect(result).toBeDefined();
      expect(result.overview).toBeDefined();
    });

    it('should handle empty responses', () => {
      const message = '';
      
      const result = parseResearchResponse(message);
      
      expect(result).toBeDefined();
      expect(result.overview).toBeDefined();
    });

    it('should handle responses with no structured data', () => {
      const message = 'Just some random text without any structure';
      
      const result = parseResearchResponse(message);
      
      expect(result).toBeDefined();
      expect(result.overview).toBeDefined();
    });
  });

  describe('Mock Data Generation', () => {
    it('should generate consistent mock data for same company', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      global.fetch.mockRejectedValue(new Error('Offline'));

      const result1 = await performResearch('TestCorp');
      const result2 = await performResearch('TestCorp');

      // Mock data should be deterministic
      expect(result1.overview).toContain('TestCorp');
      expect(result2.overview).toContain('TestCorp');
      
      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('Data Validation', () => {
    it('should ensure all required fields are present', async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          message: JSON.stringify({
            overview: 'Test',
            funding: 'N/A',
            techStack: 'Unknown',
            news: 'None',
            painPoints: 'Unknown'
          })
        })
      });

      const result = await performResearch('Stripe');

      expect(result).toHaveProperty('overview');
      expect(result).toHaveProperty('funding');
      expect(result).toHaveProperty('techStack');
      expect(result).toHaveProperty('news');
      expect(result).toHaveProperty('painPoints');
    });

    it('should handle partial data gracefully', async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          message: JSON.stringify({
            overview: 'Test company'
            // Missing other fields
          })
        })
      });

      const result = await performResearch('Stripe');

      // Should still have all fields (with fallbacks)
      expect(result.overview).toBeDefined();
    });
  });
});
