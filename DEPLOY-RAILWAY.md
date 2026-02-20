# Railway Deployment Guide - AgentHost Mini Backend

## Prerequisites

1. GitHub account (connected to Railway)
2. Railway account (free tier available)
3. OpenClaw instance running (for research functionality)

## Step-by-Step Deployment

### 1. Sign Up for Railway

1. Go to https://railway.app
2. Click "Login" → "Login with GitHub"
3. Authorize Railway to access your GitHub repos

### 2. Create New Project

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Search for and select **appydam/agenthost-mini**
4. Railway will detect the repo and show deployment options

### 3. Configure Backend Service

1. When Railway asks for the root directory, enter: **backend**
2. Railway will auto-detect `package.json` and use Node.js buildpack
3. Click "Deploy"

### 4. Set Environment Variables

After deployment starts, click on your service → "Variables" tab:

Add these variables:

```
OPENCLAW_ENDPOINT=http://localhost:3100
NODE_ENV=production
PORT=3000
```

**Important:** 
- If your OpenClaw is publicly accessible, use its public URL for `OPENCLAW_ENDPOINT`
- If OpenClaw is local-only, the backend won't be able to call it (see workaround below)

### 5. Get Your Production URL

1. Go to "Settings" tab
2. Scroll to "Domains"
3. Railway auto-generates a domain like: `agenthost-mini-production-xxxx.up.railway.app`
4. Copy this URL

### 6. Update Chrome Extension

Open `background.js` in the extension code and update line 3:

```javascript
// Before:
const API_ENDPOINT = 'https://api.agenthost.dev/research';

// After (use your Railway URL):
const API_ENDPOINT = 'https://agenthost-mini-production-xxxx.up.railway.app/research';
```

Commit and push:
```bash
git add background.js
git commit -m "chore: update API endpoint to Railway production URL"
git push
```

### 7. Test the Deployment

```bash
# Health check
curl https://your-railway-url.up.railway.app/health

# Should return:
# {"status":"ok","service":"agenthost-mini-api"}

# Test research endpoint (free tier)
curl -X POST https://your-railway-url.up.railway.app/research \
  -H "Content-Type: application/json" \
  -H "X-API-Key: demo-key" \
  -d '{"company": "Stripe"}'
```

### 8. Monitor Logs

1. In Railway dashboard, click on your service
2. Go to "Deployments" tab
3. Click on latest deployment → "View Logs"
4. Check for any errors

## OpenClaw Connection Workaround

**Problem:** If OpenClaw is running on `localhost:3100`, Railway can't access it.

**Solutions:**

### Option A: Deploy OpenClaw Publicly
- Deploy OpenClaw to Railway/Render/Fly.io
- Use that public URL in `OPENCLAW_ENDPOINT`

### Option B: Use Cloudflare Tunnel (Recommended for testing)
```bash
# On your local machine where OpenClaw runs
cloudflared tunnel --url http://localhost:3100
```
This gives you a public URL like `https://abc-123-xyz.trycloudflare.com`

Update Railway environment variable:
```
OPENCLAW_ENDPOINT=https://abc-123-xyz.trycloudflare.com
```

### Option C: Mock Mode (Development only)
Set environment variable:
```
NODE_ENV=development
```
This enables mock data fallback when OpenClaw is unavailable.

## Deployment Checklist

- [ ] Railway project created
- [ ] Backend service deployed
- [ ] Environment variables set
- [ ] Production URL obtained
- [ ] `background.js` updated with production URL
- [ ] Extension code committed and pushed
- [ ] Health check endpoint returns 200 OK
- [ ] Test research request succeeds
- [ ] Extension tested with production backend

## Cost Estimates

**Railway Pricing:**
- Free tier: $5 credit/month (enough for MVP testing)
- Starter: $5/month (if free credits depleted)
- Pro: $20/month (for production scale)

**Expected usage (MVP):**
- 100 users × 3 requests/day = 300 requests/day
- ~9,000 requests/month
- Should fit in free tier comfortably

## Troubleshooting

### Deployment Failed

Check Railway build logs:
1. Go to "Deployments" → Click failed deployment
2. Look for errors in build logs
3. Common issues:
   - Missing `package.json` → Ensure root directory is set to `backend`
   - Port binding error → Railway sets PORT automatically, don't override
   - Dependency errors → Run `npm install` locally first to verify

### API Returns 500 Error

1. Check Railway logs for error messages
2. Verify environment variables are set correctly
3. Test OpenClaw endpoint separately: `curl http://your-openclaw/api/sessions/send`

### CORS Errors in Extension

The backend has CORS enabled for all origins. If you still see CORS errors:
1. Check that the API URL in `background.js` is correct
2. Ensure the request includes `Content-Type: application/json` header
3. Check browser console for exact error message

## Next Steps After Deployment

1. ✅ Backend deployed and tested
2. ⬜ Update extension with production URL
3. ⬜ Test extension end-to-end with production backend
4. ⬜ Deploy landing page (GitHub Pages or Vercel)
5. ⬜ Create promotional images for Chrome Web Store
6. ⬜ Submit extension to Chrome Web Store

## Support

- **Railway docs:** https://docs.railway.app
- **GitHub repo:** https://github.com/appydam/agenthost-mini
- **Issues:** https://github.com/appydam/agenthost-mini/issues

---

**Last updated:** 2026-02-20  
**Status:** Ready for deployment 🚀
