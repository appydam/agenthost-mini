# Testing Guide

## Local Testing

### 1. Test Backend API

Start the backend locally:
```bash
cd backend
npm install
NODE_ENV=development npm start
```

Test the research endpoint:
```bash
# Health check
curl http://localhost:3000/health

# Research endpoint (will use mock data in dev mode)
curl -X POST http://localhost:3000/research \
  -H 'Content-Type: application/json' \
  -d '{"company": "Stripe", "requestId": "test-123"}'
```

Expected response:
```json
{
  "company": "Stripe",
  "requestId": "test-123",
  "data": {
    "overview": "...",
    "funding": "...",
    "techStack": "...",
    "news": "...",
    "painPoints": "..."
  },
  "timestamp": "..."
}
```

### 2. Test Chrome Extension

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `agenthost-mini` directory
5. Extension should load with placeholder icon

**Test context menu:**
1. Go to any webpage (e.g., https://news.ycombinator.com)
2. Select some text (e.g., "Stripe" or "OpenAI")
3. Right-click → Should see "Research [text] with AgentHost"
4. Click it → Sidebar should open with loading state

**Test popup:**
1. Click the extension icon in toolbar
2. Should see usage counter (0/3) and instructions

**Test sidebar UI:**
- Loading state displays with spinner
- Results display in clean format
- Usage counter updates
- Close button works

### 3. Test with Real OpenClaw Agent

1. Ensure OpenClaw gateway is running:
```bash
openclaw status
# If not running:
openclaw gateway start
```

2. Set environment variables:
```bash
cd backend
export OPENCLAW_ENDPOINT=http://localhost:3100
export NODE_ENV=production
npm start
```

3. Update extension's `background.js`:
```javascript
const API_ENDPOINT = 'http://localhost:3000/research';
```

4. Reload extension in Chrome (chrome://extensions/ → click reload icon)

5. Test research flow:
   - Select company name on any page
   - Right-click → Research with AgentHost
   - Should trigger real OpenClaw Scout agent
   - Wait 30-60 seconds for research
   - Results should appear in sidebar

### 4. Test Error Handling

**API down:**
- Stop backend server
- Try to research → Should show error message

**Rate limiting:**
- Research 3 companies quickly
- On 4th attempt → Should show "Daily limit reached" message

**Invalid company:**
- Select non-company text (e.g., random gibberish)
- Research → Should return "Information not available" in fields

## Production Testing Checklist

Before deploying to Chrome Web Store:

- [ ] Backend deployed and accessible
- [ ] Extension points to production API URL
- [ ] Icons display correctly
- [ ] Context menu appears on all pages
- [ ] Sidebar displays properly
- [ ] Research completes successfully
- [ ] Usage limits enforced correctly
- [ ] Error messages display properly
- [ ] Loading states work
- [ ] Popup shows correct usage count
- [ ] Extension works across different websites
- [ ] No console errors
- [ ] Performance is acceptable (<5s for research)

## Common Issues

**"Failed to fetch research"**
- Check backend is running
- Check CORS is enabled
- Check API endpoint URL is correct

**Sidebar doesn't open**
- Check content script is injected (inspect page → check for sidebar div)
- Check console for errors
- Reload extension

**Usage counter stuck at 0/3**
- Check chrome.storage permissions in manifest
- Check background service worker is running (chrome://extensions/ → background page)
- Clear extension storage and reload

**OpenClaw agent timeout**
- Increase timeoutSeconds in research-agent.js
- Check OpenClaw gateway is accessible
- Check Scout agent is available
