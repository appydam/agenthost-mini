// OpenClaw Agent Integration for Company Research
// Uses Scout agent to perform web research and return structured data

const OPENCLAW_ENDPOINT = process.env.OPENCLAW_ENDPOINT || 'http://localhost:3100';
const OPENCLAW_TOKEN = process.env.OPENCLAW_TOKEN || '';

/**
 * Perform company research using OpenClaw Scout agent
 * @param {string} company - Company name to research
 * @returns {Promise<Object>} Structured research data
 */
async function performResearch(company) {
  const prompt = `Research ${company} and provide the following information in JSON format:

{
  "overview": "Brief company description (2-3 sentences covering what they do, industry, founding year if known)",
  "funding": "Funding rounds, investors, total raised, current valuation (if available). If not available, state 'Funding information not publicly available'",
  "techStack": "Technologies, frameworks, languages, cloud providers they use. If not available, infer based on industry/job postings",
  "news": "Recent news, announcements, product launches, partnerships from last 3 months. Focus on significant events only",
  "painPoints": "3-5 likely pain points, challenges, or needs based on company stage, industry, and recent activity. Be specific and actionable for sales outreach"
}

Use web search to gather accurate, up-to-date information. If specific data is unavailable, state that clearly rather than guessing. Be concise but informative.`;

  try {
    // Call OpenClaw sessions/send endpoint
    const response = await fetch(`${OPENCLAW_ENDPOINT}/api/sessions/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(OPENCLAW_TOKEN && { 'Authorization': `Bearer ${OPENCLAW_TOKEN}` })
      },
      body: JSON.stringify({
        message: prompt,
        sessionKey: 'agenthost-research', // Dedicated session for research
        agentId: 'scout', // Use Scout for research tasks
        timeoutSeconds: 120
      })
    });

    if (!response.ok) {
      throw new Error(`OpenClaw API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Parse the response - look for JSON block
    return parseResearchResponse(data.message || data.content || data);
    
  } catch (error) {
    console.error('Research failed:', error);
    
    // Fallback to mock data if OpenClaw is unavailable
    if (process.env.NODE_ENV === 'development') {
      console.warn('Using mock data (OpenClaw unavailable)');
      return getMockResearch(company);
    }
    
    throw error;
  }
}

/**
 * Parse research response from OpenClaw agent
 * Extracts JSON from markdown code blocks or plain text
 */
function parseResearchResponse(message) {
  // Try to extract JSON from markdown code block
  const jsonBlockMatch = message.match(/```json\n([\s\S]*?)\n```/);
  if (jsonBlockMatch) {
    try {
      return JSON.parse(jsonBlockMatch[1]);
    } catch (e) {
      console.error('Failed to parse JSON block:', e);
    }
  }
  
  // Try to find raw JSON object
  const jsonMatch = message.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.error('Failed to parse JSON:', e);
    }
  }
  
  // Fallback: parse plain text sections
  return {
    overview: extractSection(message, 'overview') || 'Information not available',
    funding: extractSection(message, 'funding') || 'Funding information not publicly available',
    techStack: extractSection(message, 'tech stack|technology') || 'Tech stack information not available',
    news: extractSection(message, 'news|recent') || 'No recent news available',
    painPoints: extractSection(message, 'pain points|challenges') || 'Pain points analysis not available'
  };
}

/**
 * Extract a section from plain text response
 */
function extractSection(text, sectionRegex) {
  const regex = new RegExp(`(?:${sectionRegex})[:\\s]*([^\\n]+(?:\\n(?!\\w+:)[^\\n]+)*)`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : null;
}

/**
 * Mock research data for development/testing
 */
function getMockResearch(company) {
  return {
    overview: `${company} is a technology company operating in the B2B SaaS space. Founded in 2020, they provide enterprise solutions for mid-market companies with a focus on automation and productivity.`,
    funding: `Series A: $10M raised from Sequoia Capital (2022). Total funding: $15M. Current valuation estimated at $50M based on recent private transactions.`,
    techStack: `React, Node.js, TypeScript, PostgreSQL, AWS (EC2, RDS, S3, Lambda), Redis, Docker. Uses microservices architecture with GraphQL API layer.`,
    news: `Recently announced partnership with Microsoft Azure (Jan 2026) for enterprise distribution. Expanded to European market with London office opening. Hired new VP of Engineering from Google (Dec 2025).`,
    painPoints: `1. Scaling infrastructure costs as customer base grows 2. Customer acquisition in competitive market (CAC increasing) 3. Need for enterprise security certifications (SOC 2, ISO 27001) to close larger deals 4. Technical debt from rapid early development 5. Hiring and retaining senior engineering talent in tight market`
  };
}

module.exports = {
  performResearch,
  parseResearchResponse
};
