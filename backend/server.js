// AgentHost Mini Backend API
// Simple Express server that triggers OpenClaw agent research

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const OPENCLAW_ENDPOINT = process.env.OPENCLAW_ENDPOINT || 'http://localhost:3100';

// Research endpoint
app.post('/research', async (req, res) => {
  const { company, requestId } = req.body;
  
  if (!company) {
    return res.status(400).json({ error: 'Company name required' });
  }
  
  try {
    // TODO: Call OpenClaw agent to perform research
    // For MVP, return mock data
    const research = await performResearch(company);
    
    res.json({
      company,
      requestId,
      data: research,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Research failed:', error);
    res.status(500).json({ error: 'Research failed', message: error.message });
  }
});

// Import OpenClaw research agent integration
const { performResearch } = require('./research-agent');

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'agenthost-mini-api' });
});

app.listen(PORT, () => {
  console.log(`AgentHost Mini API running on port ${PORT}`);
});
