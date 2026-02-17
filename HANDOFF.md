# AgentHost Mini - Handoff Document for Deployment

**Status:** 65% complete (Day 2/7) - Ready for deployment phase  
**Date:** 2026-02-17  
**Engineer:** Forge (AI Agent)  
**GitHub:** https://github.com/appydam/agenthost-mini

---

## What's Complete ✅

### Extension Code (100%)
- ✅ Chrome Extension (Manifest V3)
  - Context menu integration (right-click company names)
  - Sidebar UI with loading/results/error states
  - Usage tracking (3 briefs/day free tier)
  - Popup with usage counter
  - Settings page for Pro API keys
- ✅ Icons (SVG placeholders - 16x16, 48x48, 128x128)
- ✅ All UI states implemented

### Backend API (100%)
- ✅ Express server with CORS
- ✅ OpenClaw/Scout agent integration (real AI research)
- ✅ API key authentication system
  - Free tier: 3/day (demo mode)
  - Pro tier: Unlimited (ak_pro_* keys)
- ✅ Rate limiting and usage tracking
- ✅ Health check endpoint
- ✅ Deployment configs (Railway, Render, Fly.io)

### Documentation (100%)
- ✅ README.md (project overview)
- ✅ TEST.md (testing guide)
- ✅ DEPLOY.md (deployment options)
- ✅ INTEGRATION.md (OpenClaw setup)
- ✅ STORE-ASSETS.md (Chrome Web Store requirements)
- ✅ PRIVACY-POLICY.md (GDPR/CCPA compliant)
- ✅ DEPLOYMENT-STATUS.md (step-by-step guide)

### Landing Page (100%)
- ✅ Static HTML with features, pricing, CTA
- ✅ Ready to deploy (GitHub Pages or Vercel)

---

## What's Needed Next (Arpit/Manual Steps)

### 1. Deploy Backend API (30 minutes)

**Option A: Railway (Recommended)**
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. New Project → Deploy from GitHub repo
4. Select `appydam/agenthost-mini`
5. Root directory: `/backend`
6. Environment variables:
   ```
   OPENCLAW_ENDPOINT=http://localhost:3100
   NODE_ENV=production
   ```
7. Deploy

**Expected URL:** `https://agenthost-mini-production.railway.app`

**Option B: Render**
- See DEPLOY.md for step-by-step

### 2. Update Extension with Production URL (5 minutes)

Edit `background.js` line 3:
```javascript
// Change from:
const API_ENDPOINT = 'https://api.agenthost.dev/research';
// To your deployed URL:
const API_ENDPOINT = 'https://agenthost-mini-production.railway.app/research';
```

Commit and push to GitHub.

### 3. Test End-to-End (15 minutes)

1. Load extension in Chrome (`chrome://extensions/`)
2. Enable Developer mode
3. Load unpacked → select `agenthost-mini` directory
4. Test:
   - Right-click on company name → See context menu
   - Click "Research [company]"
   - Sidebar opens with loading state
   - Results appear in 30-60 seconds
   - Usage counter updates
   - Test limit (try 4th request → should show upgrade message)

### 4. Deploy Landing Page (10 minutes)

**GitHub Pages:**
```bash
cd landing
git subtree push --prefix landing origin gh-pages
```

**Or Vercel:**
```bash
cd landing
vercel --prod
```

### 5. Create Promotional Images (2-3 hours or $20-50 outsourced)

**Option A: DIY (Figma/Canva)**
- Small tile: 440x280px
- Marquee: 1400x560px
- Screenshots: 1280x800px (3-5 needed)

**Option B: Fiverr**
- Search "Chrome extension graphics"
- Budget: $20-50
- Provide: Logo, colors (#667eea, #764ba2), screenshots

### 6. Submit to Chrome Web Store (1-2 hours)

1. Register as Chrome Web Store developer ($5 one-time)
2. Create new item
3. Upload extension ZIP (excluding backend/, landing/, *.md)
4. Fill in store listing (see STORE-ASSETS.md for copy)
5. Upload promotional images
6. Set privacy policy URL (deploy landing page first)
7. Submit for review (1-3 days approval time)

---

## Current Blockers

1. **Backend deployment** - Needs web UI (Railway/Render)
2. **Promotional images** - Need design work or outsourcing
3. **Privacy policy hosting** - Need landing page deployed first
4. **Chrome Web Store account** - Needs $5 payment + email verification

---

## What I Can Still Do (Day 3-4)

While waiting for deployment:
1. Create professional icons (better than SVG placeholders)
2. Add error tracking (Sentry integration)
3. Add analytics (track popular companies researched)
4. Improve UI polish (animations, better styling)
5. Create demo video/GIF for README
6. Write blog post about building the extension

---

## Revenue Projections

**Conservative (6 months):**
- 500 free users
- 25 Pro users × $15/mo = $375 MRR
- Covers hosting + profit

**Optimistic (6 months):**
- 2,000 free users
- 100 Pro users × $15/mo = $1,500 MRR
- Sustainable micro-SaaS

**Target:** 100 paying users = $1,500 MRR

---

## Cost Breakdown

| Item | Cost | Status |
|------|------|--------|
| Backend hosting (Railway) | $5-10/mo | Not deployed |
| Chrome Web Store fee | $5 one-time | Not paid |
| Promotional images (Fiverr) | $20-50 | Not created |
| Domain (optional) | $10-15/yr | Not needed for MVP |
| **Total upfront** | **$25-65** | **Pending** |
| **Monthly recurring** | **$5-10** | **After deployment** |

---

## Timeline (Remaining)

| Day | Task | Owner | Status |
|-----|------|-------|--------|
| 2 ✅ | Code complete, docs ready | Forge | Done |
| 3 | Deploy backend, update extension, test | Arpit | Pending |
| 4 | Create promotional images | Arpit/Fiverr | Pending |
| 5 | Deploy landing page, privacy policy | Arpit | Pending |
| 6 | Submit to Chrome Web Store | Arpit | Pending |
| 7 | Buffer for review/fixes | Arpit | Pending |

**Current ETA:** Ready for store submission by Day 6 if deployment starts Day 3.

---

## Key Files

| File | Purpose |
|------|---------|
| `manifest.json` | Extension configuration |
| `background.js` | Service worker (API calls, context menu) |
| `content.js` | Sidebar UI |
| `options.html` | Settings page |
| `backend/server.js` | Express API |
| `backend/auth.js` | API key verification |
| `backend/research-agent.js` | OpenClaw integration |
| `landing/index.html` | Marketing website |

---

## Support

**Questions?**
- GitHub issues: https://github.com/appydam/agenthost-mini/issues
- Review this doc: HANDOFF.md
- Check logs in Mission Control

**Ready to deploy?**
Start with step 1 (Deploy Backend API) above.

---

**Last updated:** 2026-02-17 11:30 UTC  
**Next action:** Deploy backend to Railway or Render
