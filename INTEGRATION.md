# OpenClaw Agent Integration Guide

This document explains how to integrate real OpenClaw agents for company research.

## Architecture

```
User selects text → Extension background.js
                   ↓
            Backend API (Express)
                   ↓
         OpenClaw Agent (Scout)
                   ↓
      Research (web search + synthesis)
                   ↓
       Return structured data → Extension UI
```

## Backend Integration

Update `backend/server.js` to call OpenClaw agents:

### Method 1: Direct HTTP Call

```javascript
async function performResearch(company) {
  const response = await fetch(`${OPENCLAW_ENDPOINT}/api/sessions/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENCLAW_TOKEN}`
    },
    body: JSON.stringify({
      message: `Research ${company}: Provide overview, funding, tech stack, recent news, and pain points. Format as JSON with keys: overview, funding, techStack, news, painPoints`,
      agentId: 'scout',
      timeoutSeconds: 120
    })
  });
  
  if (!response.ok) {
    throw new Error(`OpenClaw API error: ${response.status}`);
  }
  
  const data = await response.json();
  return parseResearchResponse(data.message);
}

function parseResearchResponse(message) {
  // Extract JSON from agent response
  const jsonMatch = message.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  
  // Fallback: parse plain text
  return {
    overview: extractSection(message, 'overview'),
    funding: extractSection(message, 'funding'),
    techStack: extractSection(message, 'tech stack'),
    news: extractSection(message, 'news'),
    painPoints: extractSection(message, 'pain points')
  };
}

function extractSection(text, section) {
  const regex = new RegExp(`${section}:?\\s*([^\\n]+)`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : 'N/A';
}
```

### Method 2: Spawn Isolated Session

```javascript
async function performResearch(company) {
  const response = await fetch(`${OPENCLAW_ENDPOINT}/api/sessions/spawn`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENCLAW_TOKEN}`
    },
    body: JSON.stringify({
      agentId: 'scout',
      task: `Research ${company} and return JSON with: overview, funding, techStack, news, painPoints`,
      runTimeoutSeconds: 120,
      cleanup: 'delete'
    })
  });
  
  const result = await response.json();
  return parseResearchResponse(result.output);
}
```

## Research Prompt Template

Use this prompt for consistent, structured output:

```
Research {COMPANY_NAME} and provide the following information in JSON format:

{
  "overview": "Brief company description (2-3 sentences)",
  "funding": "Funding rounds, investors, total raised, valuation",
  "techStack": "Technologies they use (languages, frameworks, cloud providers)",
  "news": "Recent news, announcements, product launches (last 3 months)",
  "painPoints": "Likely pain points, challenges, or needs based on industry/stage"
}

Use web search to gather accurate, up-to-date information. If data is unavailable, state "Information not available" rather than guessing.
```

## Caching Strategy

To reduce OpenClaw API calls and improve speed:

```javascript
const cache = new Map();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

async function getCachedResearch(company) {
  const key = company.toLowerCase();
  const cached = cache.get(key);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  
  const data = await performResearch(company);
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}
```

Or use Redis:

```javascript
const redis = require('redis');
const client = redis.createClient();

async function getCachedResearch(company) {
  const key = `research:${company.toLowerCase()}`;
  const cached = await client.get(key);
  
  if (cached) {
    return JSON.parse(cached);
  }
  
  const data = await performResearch(company);
  await client.setex(key, 86400, JSON.stringify(data)); // 24h expiry
  return data;
}
```

## Rate Limiting

Protect your API from abuse:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 requests per 15 min
  message: 'Too many research requests, please try again later'
});

app.post('/research', limiter, async (req, res) => {
  // ... research logic
});
```

## Authentication

Add user authentication to track usage:

```javascript
const jwt = require('jsonwebtoken');

// Middleware to verify user
async function authenticateUser(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

app.post('/research', authenticateUser, async (req, res) => {
  // Check user's plan and usage
  const usage = await getUserUsage(req.userId);
  const plan = await getUserPlan(req.userId);
  
  if (plan === 'free' && usage >= 3) {
    return res.status(429).json({ 
      error: 'Daily limit reached',
      upgrade_url: 'https://agenthost.dev/pricing'
    });
  }
  
  // Perform research...
  await incrementUsage(req.userId);
  // ...
});
```

## Testing

Test the integration locally:

```bash
# Start OpenClaw gateway
openclaw gateway start

# Set environment variables
export OPENCLAW_ENDPOINT=http://localhost:3100
export OPENCLAW_TOKEN=your-token

# Start backend
cd backend
npm start

# Test research endpoint
curl -X POST http://localhost:3000/research \
  -H 'Content-Type: application/json' \
  -d '{"company": "Stripe"}'
```

## Production Checklist

- [ ] OpenClaw instance deployed and accessible
- [ ] API token stored securely (environment variable)
- [ ] Caching implemented (Redis or in-memory)
- [ ] Rate limiting enabled
- [ ] Error handling and retries
- [ ] Logging and monitoring (Sentry)
- [ ] Authentication for paid features
- [ ] Usage tracking per user
- [ ] Graceful degradation if OpenClaw is down

## Costs

**OpenClaw API usage:**
- Free tier: 100 requests/day
- ~$0.05-0.10 per research request (web search + LLM)
- 100 free users × 3 requests/day = 300 requests/day
- ~$15-30/day without caching
- With 24h cache: ~$5-10/day

**Cost optimization:**
- Implement aggressive caching (24-48h)
- Use cheaper models for overview/funding (less critical)
- Batch requests where possible
