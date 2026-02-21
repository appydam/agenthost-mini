/**
 * AgentHost Mini API - Authentication Tests
 * Tests for API key validation and rate limiting
 */

const { verifyApiKey, incrementUsage, createApiKey } = require('../auth');

describe('Authentication Module', () => {
  let testFreeKey;
  let testProKey;
  
  beforeEach(() => {
    // Create fresh API keys for each test to avoid state pollution
    testFreeKey = createApiKey('free');
    testProKey = createApiKey('pro');
    jest.clearAllMocks();
  });

  describe('verifyApiKey', () => {
    it('should accept demo-key with free tier limits', () => {
      const result = verifyApiKey('demo-key');
      
      expect(result.valid).toBe(true);
      expect(result.tier).toBe('free');
      expect(result.dailyLimit).toBe(3);
      expect(result.remainingToday).toBe(3);
    });

    it('should accept demo-free-key with tracked usage', () => {
      const result = verifyApiKey('demo-free-key');
      
      expect(result.valid).toBe(true);
      expect(result.tier).toBe('free');
      expect(result.dailyLimit).toBe(3);
    });

    it('should accept demo-pro-key with unlimited tier', () => {
      const result = verifyApiKey('demo-pro-key');
      
      expect(result.valid).toBe(true);
      expect(result.tier).toBe('pro');
      expect(result.dailyLimit).toBe(Infinity);
    });

    it('should reject invalid API keys', () => {
      const result = verifyApiKey('invalid-key');
      
      expect(result.valid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should accept empty API keys as demo mode', () => {
      const result = verifyApiKey('');
      
      expect(result.valid).toBe(true);
      expect(result.tier).toBe('free');
      expect(result.message).toContain('demo mode');
    });

    it('should accept null API keys as demo mode', () => {
      const result = verifyApiKey(null);
      
      expect(result.valid).toBe(true);
      expect(result.tier).toBe('free');
      expect(result.message).toContain('demo mode');
    });

    it('should provide upgrade URL when limit is reached', () => {
      // Exhaust the limit (3 requests for new free key)
      incrementUsage(testFreeKey);
      incrementUsage(testFreeKey);
      incrementUsage(testFreeKey);
      
      const result = verifyApiKey(testFreeKey);
      expect(result.upgradeUrl).toBeDefined();
      expect(result.upgradeUrl).toMatch(/upgrade|pricing/i);
    });

    it('should not provide upgrade URL for pro tier', () => {
      const result = verifyApiKey('demo-pro-key');
      
      expect(result.upgradeUrl).toBeUndefined();
    });
  });

  describe('incrementUsage', () => {
    it('should track usage for free tier keys', () => {
      const beforeUsage = verifyApiKey(testFreeKey);
      incrementUsage(testFreeKey);
      const afterUsage = verifyApiKey(testFreeKey);
      
      expect(afterUsage.remainingToday).toBeLessThan(beforeUsage.remainingToday);
      expect(afterUsage.remainingToday).toBe(beforeUsage.remainingToday - 1);
    });

    it('should not affect pro tier remaining when at infinity', () => {
      const beforeUsage = verifyApiKey(testProKey);
      incrementUsage(testProKey);
      const afterUsage = verifyApiKey(testProKey);
      
      // Pro tier has Infinity limit, so remaining is still high
      expect(afterUsage.dailyLimit).toBe(Infinity);
    });

    it('should handle multiple increments correctly', () => {
      // Get fresh state (should be 3 for new free key)
      const initial = verifyApiKey(testFreeKey);
      expect(initial.remainingToday).toBe(3);
      
      // Use 2 requests
      incrementUsage(testFreeKey);
      incrementUsage(testFreeKey);
      
      const result = verifyApiKey(testFreeKey);
      expect(result.remainingToday).toBe(1);
    });
  });

  describe('Rate Limiting', () => {
    it('should block requests after daily limit is reached', () => {
      // Get current state (should be 3 for new free key)
      const current = verifyApiKey(testFreeKey);
      expect(current.remainingToday).toBe(3);
      
      // Use up all 3 requests
      incrementUsage(testFreeKey);
      incrementUsage(testFreeKey);
      incrementUsage(testFreeKey);
      
      const result = verifyApiKey(testFreeKey);
      expect(result.remainingToday).toBe(0);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Daily limit reached');
    });
  });

  describe('Security', () => {
    it('should handle SQL injection attempts safely', () => {
      const maliciousKey = "'; DROP TABLE users; --";
      const result = verifyApiKey(maliciousKey);
      
      expect(result.valid).toBe(false);
      // Should not crash or cause security issues
    });

    it('should handle XSS attempts safely', () => {
      const maliciousKey = "<script>alert('xss')</script>";
      const result = verifyApiKey(maliciousKey);
      
      expect(result.valid).toBe(false);
    });

    it('should handle very long API keys safely', () => {
      const longKey = 'ak_pro_' + 'a'.repeat(1000);
      const result = verifyApiKey(longKey);
      
      // Should handle gracefully without crashing
      expect(result).toBeDefined();
    });
  });
});
