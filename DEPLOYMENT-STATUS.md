# Deployment Status

## Backend API

**Status:** 🟡 Ready to deploy (not yet deployed)

**Deployment Options:**

### Option 1: Railway (Recommended)
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. New Project → Deploy from GitHub repo
4. Select `appydam/agenthost-mini`
5. Root directory: `/backend`
6. Add environment variables:
   - `OPENCLAW_ENDPOINT`: Your OpenClaw instance URL
   - `OPENCLAW_TOKEN`: (optional) API token
7. Deploy

**Expected cost:** Free tier or $5/month

### Option 2: Render
1. Go to [render.com](https://render.com)
2. New Web Service
3. Connect GitHub repo: `appydam/agenthost-mini`
4. Root directory: `backend`
5. Build command: `npm install`
6. Start command: `npm start`
7. Add environment variables (same as above)
8. Create Web Service

**Expected cost:** Free tier

### Option 3: Fly.io
```bash
cd backend
fly launch
fly deploy
```

## Chrome Extension

**Status:** 🟡 Ready for local testing

**Steps:**
1. Backend must be deployed first
2. Update `background.js` with production API URL
3. Test locally (see TEST.md)
4. Create promotional assets (screenshots, icons)
5. Submit to Chrome Web Store

## Landing Page

**Status:** 🟡 Ready to deploy

**Deployment:**
```bash
cd landing
# Deploy to GitHub Pages or Vercel
vercel --prod
```

## Next Actions

1. **Deploy backend** (choose Railway or Render)
2. **Get production URL** (e.g., https://agenthost-mini-api.railway.app)
3. **Update extension**:
   - Edit `background.js`: `const API_ENDPOINT = 'https://your-api-url/research'`
4. **Test end-to-end**
5. **Deploy landing page**
6. **Prepare Chrome Web Store submission**

---

**Last updated:** 2026-02-17 (Day 2)
