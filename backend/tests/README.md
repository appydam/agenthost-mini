# AgentHost Mini API - Test Suite

Comprehensive test suite for the backend API endpoints and modules.

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode (auto-rerun on changes)
```bash
npm run test:watch
```

### Run tests with coverage report
```bash
npm run test:coverage
```

## Test Structure

```
tests/
├── README.md              # This file
├── server.test.js         # Integration tests for API endpoints
├── auth.test.js           # Tests for authentication & rate limiting
└── research-agent.test.js # Tests for OpenClaw integration
```

## Test Coverage

### server.test.js
- **Health check endpoint** (`GET /health`)
  - Returns 200 OK
  - Correct JSON response format
  - Proper content-type headers

- **Research endpoint** (`POST /research`)
  - Validates company name is required
  - Successfully researches companies
  - Accepts API keys in headers and body
  - Returns proper usage information
  - Handles errors gracefully (500 errors)
  - Handles special characters in company names
  - Handles very long company names

- **CORS**
  - Verifies CORS headers are enabled
  - Allows Chrome extension origins

### auth.test.js
- **API Key Verification**
  - Accepts demo-key with free tier limits
  - Accepts ak_pro_* keys with unlimited tier
  - Rejects invalid API keys
  - Handles empty/null keys
  - Provides upgrade URLs for free tier

- **Usage Tracking**
  - Tracks usage for free tier
  - Pro tier has unlimited usage
  - Handles multiple increments correctly

- **Rate Limiting**
  - Blocks requests after daily limit reached
  - Enforces 3/day limit for free tier

- **Security**
  - Handles SQL injection attempts safely
  - Handles XSS attempts safely
  - Handles very long API keys

### research-agent.test.js
- **OpenClaw Integration**
  - Calls API with correct parameters
  - Parses JSON responses
  - Handles API errors gracefully
  - Handles network failures
  - Uses mock data in development mode
  - Handles special characters in company names

- **Response Parsing**
  - Parses JSON from markdown code blocks
  - Parses raw JSON objects
  - Extracts sections from plain text
  - Handles malformed JSON
  - Handles empty responses

- **Data Validation**
  - Ensures all required fields are present
  - Handles partial data gracefully
  - Mock data is consistent

## Test Philosophy

### Unit Tests
Each module (auth, research-agent) is tested in isolation with mocked dependencies.

### Integration Tests
The server tests verify that endpoints work correctly with real HTTP requests (using supertest).

### Mocking Strategy
- OpenClaw API calls are mocked to avoid external dependencies
- Fetch API is mocked for research-agent tests
- Auth module uses in-memory tracking for tests

## CI/CD Integration

These tests are designed to run in CI/CD pipelines:

### GitHub Actions Example
```yaml
- name: Run tests
  run: |
    cd backend
    npm install
    npm test
```

### Railway/Render
Tests can be run as part of the build process:
```bash
npm run test && npm start
```

## Writing New Tests

### Test Template
```javascript
describe('Feature Name', () => {
  beforeEach(() => {
    // Setup
    jest.clearAllMocks();
  });

  it('should do something specific', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = functionUnderTest(input);
    
    // Assert
    expect(result).toBe('expected');
  });
});
```

### Best Practices
1. **Clear test names** - Describe what is being tested
2. **AAA pattern** - Arrange, Act, Assert
3. **One assertion per test** - Keep tests focused
4. **Mock external dependencies** - Tests should be isolated
5. **Test edge cases** - Empty strings, null, special characters
6. **Test error conditions** - Not just happy paths

## Known Limitations

### Mock Data
Some tests use mock data when OpenClaw is unavailable. In production, ensure the real API is accessible.

### Rate Limiting
Rate limit tests use in-memory tracking. In production, use a proper data store (Redis) for distributed rate limiting.

### Security
Security tests verify input handling but are not exhaustive. Follow OWASP guidelines for production deployments.

## Future Improvements

- [ ] Add E2E tests with real Chrome extension
- [ ] Add performance/load testing
- [ ] Add database integration tests (when DB is added)
- [ ] Add webhook/async operation tests
- [ ] Increase test coverage to 90%+
- [ ] Add mutation testing
- [ ] Add contract testing for OpenClaw API

## Troubleshooting

### Tests fail with "Cannot find module"
```bash
npm install
```

### Tests timeout
Increase jest timeout:
```javascript
jest.setTimeout(10000); // 10 seconds
```

### Mock data doesn't match production
Update mock data in `getMockResearch()` function to match real API responses.

---

**Last updated:** 2026-02-21  
**Test Framework:** Jest 30.2.0  
**Coverage:** Server endpoints, authentication, research agent  
**Status:** All tests passing ✅
