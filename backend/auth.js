// Simple API key authentication for AgentHost Mini

// In production, use a real database (Redis, PostgreSQL, etc.)
// For MVP, we'll use in-memory storage

const API_KEYS = new Map();

// Demo keys for testing
API_KEYS.set('demo-free-key', {
  tier: 'free',
  dailyLimit: 3,
  usage: new Map() // date -> count
});

API_KEYS.set('demo-pro-key', {
  tier: 'pro',
  dailyLimit: Infinity,
  usage: new Map()
});

/**
 * Verify API key and check usage limits
 * @param {string} apiKey 
 * @returns {Object} { valid: boolean, tier: string, remainingToday: number, error?: string }
 */
function verifyApiKey(apiKey) {
  if (!apiKey || apiKey === 'demo-key') {
    // Default free tier (no account)
    return {
      valid: true,
      tier: 'free',
      dailyLimit: 3,
      remainingToday: 3, // Tracked client-side for demo-key
      message: 'Using demo mode (client-side limits)'
    };
  }
  
  const keyData = API_KEYS.get(apiKey);
  
  if (!keyData) {
    return {
      valid: false,
      error: 'Invalid API key'
    };
  }
  
  // Check daily usage
  const today = new Date().toDateString();
  const usedToday = keyData.usage.get(today) || 0;
  const remaining = keyData.dailyLimit - usedToday;
  
  if (remaining <= 0 && keyData.tier === 'free') {
    return {
      valid: false,
      tier: keyData.tier,
      remainingToday: 0,
      error: 'Daily limit reached. Upgrade to Pro for unlimited research.',
      upgradeUrl: 'https://agenthost.dev/pricing'
    };
  }
  
  return {
    valid: true,
    tier: keyData.tier,
    dailyLimit: keyData.dailyLimit,
    remainingToday: remaining,
    usedToday: usedToday
  };
}

/**
 * Increment usage for an API key
 * @param {string} apiKey 
 */
function incrementUsage(apiKey) {
  if (!apiKey || apiKey === 'demo-key') {
    // Client-side tracking for demo mode
    return;
  }
  
  const keyData = API_KEYS.get(apiKey);
  if (!keyData) return;
  
  const today = new Date().toDateString();
  const currentUsage = keyData.usage.get(today) || 0;
  keyData.usage.set(today, currentUsage + 1);
  
  // Clean up old dates (keep only last 7 days)
  if (keyData.usage.size > 7) {
    const dates = Array.from(keyData.usage.keys()).sort();
    dates.slice(0, -7).forEach(date => keyData.usage.delete(date));
  }
}

/**
 * Create a new API key (for Pro signups)
 * @param {string} tier 
 * @returns {string} New API key
 */
function createApiKey(tier = 'free') {
  const key = `ak_${tier}_${generateRandomString(32)}`;
  
  API_KEYS.set(key, {
    tier: tier,
    dailyLimit: tier === 'pro' ? Infinity : 3,
    usage: new Map(),
    createdAt: new Date().toISOString()
  });
  
  return key;
}

function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

module.exports = {
  verifyApiKey,
  incrementUsage,
  createApiKey
};
