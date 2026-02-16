# Deployment Guide

## Backend API Deployment

### Option 1: Railway

1. Install Railway CLI:
```bash
npm i -g @railway/cli
```

2. Deploy:
```bash
cd backend
railway login
railway init
railway up
```

3. Get deployment URL and update `background.js`:
```javascript
const API_ENDPOINT = 'https://your-app.railway.app/research';
```

### Option 2: Render

1. Create account at render.com
2. New Web Service → Connect GitHub repo
3. Build command: `cd backend && npm install`
4. Start command: `npm start`
5. Environment: Node
6. Update `background.js` with Render URL

### Option 3: Fly.io

1. Install Fly CLI:
```bash
curl -L https://fly.io/install.sh | sh
```

2. Deploy:
```bash
cd backend
fly launch
fly deploy
```

3. Update `background.js` with Fly.io URL

## Landing Page Deployment

### GitHub Pages

1. Push landing page to `gh-pages` branch:
```bash
cd landing
git subtree push --prefix landing origin gh-pages
```

2. Enable GitHub Pages in repo settings
3. URL: `https://appydam.github.io/agenthost-mini/`

### Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd landing
vercel --prod
```

## Chrome Extension Publication

### Prepare Extension

1. **Create icons** (hire designer or use Figma):
   - 16x16px (toolbar)
   - 48x48px (management page)
   - 128x128px (Chrome Web Store)

2. **Add promotional images**:
   - Small tile: 440x280px
   - Large tile: 920x680px
   - Marquee: 1400x560px
   - Screenshots: 1280x800px or 640x400px (at least 1)

3. **Update API endpoint** in `background.js` to production URL

4. **Test thoroughly**:
   - Load unpacked extension
   - Test right-click context menu
   - Test sidebar UI
   - Test usage limits
   - Test on multiple websites

5. **Create .zip**:
```bash
# Exclude unnecessary files
zip -r agenthost-mini.zip . -x "*.git*" -x "*node_modules*" -x "*backend*" -x "*landing*" -x "*.md"
```

### Submit to Chrome Web Store

1. Create Chrome Web Store Developer account ($5 one-time fee)
2. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
3. Click "New Item"
4. Upload `agenthost-mini.zip`
5. Fill in store listing:
   - **Name**: AgentHost Mini - Sales Research
   - **Description**: Right-click any company name to get instant AI-powered research. Perfect for B2B sales and BD professionals.
   - **Category**: Productivity
   - **Language**: English
6. Upload promotional images and screenshots
7. Set pricing (Free tier + optional in-app purchases for Pro)
8. Submit for review (typically 1-3 days)

### Post-Launch

1. Monitor reviews and user feedback
2. Set up analytics (Google Analytics or Mixpanel)
3. Track usage and conversion rates (Free → Pro)
4. Iterate based on user feedback

## Environment Variables

Set these in your backend deployment:

```bash
PORT=3000
OPENCLAW_ENDPOINT=http://your-openclaw-instance:3100
NODE_ENV=production
```

## Monitoring

Add error tracking:

```bash
cd backend
npm install @sentry/node
```

Add to `server.js`:
```javascript
const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'YOUR_SENTRY_DSN' });
```

## Cost Estimate

- **Railway/Render**: $5-10/month (free tier available)
- **Chrome Web Store**: $5 one-time
- **Domain** (optional): $10-15/year
- **Total**: ~$5-10/month + $5 upfront

## Revenue Projections

**Conservative (100 users, 10% conversion):**
- 100 free users
- 10 Pro users × $15/mo = $150 MRR
- Covers hosting + profit margin

**Optimistic (1000 users, 5% conversion):**
- 1000 free users
- 50 Pro users × $15/mo = $750 MRR
- Sustainable micro-SaaS

**Target: 100 paying users = $1,500 MRR within 6 months**
