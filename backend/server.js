// AgentHost Mini Backend API
// Simple Express server that triggers OpenClaw agent research

const express = require('express');
const cors = require('cors');
const { performResearch } = require('./research-agent');
const { verifyApiKey, incrementUsage } = require('./auth');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Research endpoint
app.post('/research', async (req, res) => {
  const { company, requestId } = req.body;
  const apiKey = req.headers['x-api-key'] || req.body.apiKey || 'demo-key';
  
  if (!company) {
    return res.status(400).json({ error: 'Company name required' });
  }
  
  // Verify API key and check limits
  const auth = verifyApiKey(apiKey);
  
  if (!auth.valid) {
    return res.status(auth.remainingToday === 0 ? 429 : 401).json({
      error: auth.error,
      tier: auth.tier,
      upgradeUrl: auth.upgradeUrl
    });
  }
  
  try {
    // Perform research
    const research = await performResearch(company);
    
    // Increment usage (if not demo mode)
    incrementUsage(apiKey);
    
    // Get updated usage
    const updatedAuth = verifyApiKey(apiKey);
    
    res.json({
      company,
      requestId,
      data: research,
      timestamp: new Date().toISOString(),
      usage: {
        tier: updatedAuth.tier,
        remainingToday: updatedAuth.remainingToday,
        dailyLimit: updatedAuth.dailyLimit
      }
    });
    
  } catch (error) {
    console.error('Research failed:', error);
    res.status(500).json({ error: 'Research failed', message: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'agenthost-mini-api' });
});

app.listen(PORT, () => {
  console.log(`AgentHost Mini API running on port ${PORT}`);
});
