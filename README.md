# AgentHost Mini - Sales Research Extension

> Right-click any company name to get AI-powered research in 30 seconds

Chrome extension MVP for B2B sales and BD professionals. Get instant company insights without leaving your browser.

## Features

- **Context menu integration**: Right-click any selected text → "Research [company] with AgentHost"
- **Instant insights**: Company overview, funding, tech stack, recent news, pain points
- **Free tier**: 3 briefs per day
- **Pro tier**: Unlimited research ($15/month)
- **Clean sidebar UI**: Results display in a non-intrusive sidebar
- **Privacy-focused**: Your searches are private

## Project Structure

```
agenthost-mini/
├── manifest.json         # Chrome extension manifest (V3)
├── background.js         # Service worker (context menu, API calls)
├── content.js            # Content script (sidebar UI)
├── content.css           # Sidebar styles
├── popup.html            # Extension popup
├── popup.js              # Popup logic
├── icons/                # Extension icons
├── backend/              # API server
│   ├── server.js         # Express API
│   └── package.json      # Node.js dependencies
└── landing/              # Landing page
    └── index.html        # Marketing site
```

## Installation (Development)

### 1. Load the Extension

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the `agenthost-mini` directory

### 2. Run the Backend API

```bash
cd backend
npm install
npm start
```

API runs on `http://localhost:3000`

## Usage

1. Select a company name on any webpage
2. Right-click → "Research [company] with AgentHost"
3. Sidebar opens with loading state
4. Research brief loads in 30-60 seconds
5. View insights (overview, funding, tech stack, news, pain points)

## Tech Stack

**Extension:**
- Manifest V3
- Vanilla JavaScript (no frameworks for lightweight bundle)
- CSS3 animations

**Backend:**
- Node.js + Express
- OpenClaw agents for research (TODO: integrate)
- CORS enabled for Chrome extension

**Landing Page:**
- Static HTML/CSS
- Lightweight (<10KB)
- Responsive design

## Deployment

### Extension

1. Zip the extension directory (exclude `backend/` and `landing/`)
2. Upload to Chrome Web Store
3. Submit for review

### Backend API

Deploy to Railway/Render/Fly.io:

```bash
cd backend
# Update API_ENDPOINT in background.js to production URL
railway up
```

### Landing Page

Deploy to GitHub Pages or Vercel:

```bash
cd landing
# Deploy static HTML
```

## TODO

- [ ] Create actual icons (16x16, 48x48, 128x128)
- [ ] Integrate real OpenClaw agent for research
- [ ] Add authentication flow (email login)
- [ ] Add usage tracking/analytics
- [ ] Add CRM export feature (Pro tier)
- [ ] Add Chrome Web Store assets (screenshots, promo images)
- [ ] Add privacy policy & terms of service
- [ ] Set up payment processing (Stripe) for Pro tier
- [ ] Add error tracking (Sentry)
- [ ] Add tests

## Revenue Model

**Free Tier**: 3 briefs/day (limited, drive upgrades)  
**Pro Tier**: $15/month unlimited (target: 100 paying users = $1,500 MRR)

**Target Market**: B2B sales reps, BD professionals, account executives

## License

MIT License - See LICENSE file

---

Built by [AppyDam](https://appydam.github.io/portfolio-site/) | [Contact](mailto:hello@agenthost.dev)
