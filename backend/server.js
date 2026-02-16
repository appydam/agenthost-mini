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

// Mock research function (replace with real OpenClaw agent call)
async function performResearch(company) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // TODO: Replace with actual OpenClaw agent research
  // Example OpenClaw integration:
  // const response = await fetch(`${OPENCLAW_ENDPOINT}/api/agents/research`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     task: `Research ${company}: overview, funding, tech stack, recent news, pain points`,
  //     agentId: 'scout',
  //     timeoutSeconds: 120
  //   })
  // });
  
  return {
    overview: `${company} is a technology company operating in the B2B SaaS space. Founded in 2020, they provide enterprise solutions for mid-market companies.`,
    funding: `Series A: $10M raised from Sequoia Capital (2022). Total funding: $15M. Valuation estimated at $50M.`,
    techStack: `React, Node.js, PostgreSQL, AWS (EC2, RDS, S3), Redis, Docker. Uses microservices architecture.`,
    news: `Recently announced partnership with Microsoft Azure (Jan 2026). Expanded to European market with London office opening.`,
    painPoints: `Scaling infrastructure costs, customer acquisition in competitive market, need for enterprise security certifications (SOC 2, ISO 27001).`
  };
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'agenthost-mini-api' });
});

app.listen(PORT, () => {
  console.log(`AgentHost Mini API running on port ${PORT}`);
});
