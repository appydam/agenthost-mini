# Chrome Web Store Assets Checklist

## Required for Submission

### Extension Icons ✅
- [x] 16x16px - Toolbar icon (icon-16.svg)
- [x] 48x48px - Extension management (icon-48.svg)
- [x] 128x128px - Chrome Web Store (icon-128.svg)

**Status:** Placeholder SVGs created. Replace with professional designs before store submission.

### Promotional Images (Required)

#### 1. Small Promotional Tile
- **Size:** 440x280px
- **Format:** PNG or JPEG
- **Use:** Extension listing thumbnail
- **Status:** ⚠️ TODO

**Design ideas:**
- AgentHost logo + "Instant Company Research"
- Screenshot of sidebar in action
- Clean gradient background (#667eea to #764ba2)

#### 2. Marquee Promotional Tile (Optional but recommended)
- **Size:** 1400x560px
- **Format:** PNG or JPEG
- **Use:** Featured placement on Chrome Web Store
- **Status:** ⚠️ TODO

**Design ideas:**
- Full extension demo: selected text → context menu → sidebar results
- "Get AI-powered company insights in 30 seconds"
- Call to action: "Right-click any company name"

### Screenshots (At least 1, max 5)

#### Required Screenshots:
1. **Context menu in action** (1280x800 or 640x400)
   - Show: Webpage with selected text, right-click menu visible
   - Highlight: "Research [Company] with AgentHost" option

2. **Sidebar with results** (1280x800 or 640x400)
   - Show: Research brief displayed in sidebar
   - Sections visible: Overview, Funding, Tech Stack, News, Pain Points

3. **Extension popup** (1280x800 or 640x400)
   - Show: Usage counter (X/3 briefs used)
   - Highlight: "Upgrade to Pro" CTA

#### Optional Screenshots:
4. **Loading state** - Sidebar showing research in progress
5. **Limit reached screen** - Free tier limit message

**Status:** ⚠️ TODO (need deployed backend to take real screenshots)

### Store Listing Copy

#### Name (max 45 characters)
**Current:** "AgentHost Mini - Sales Research" (37 chars) ✅

**Alternatives:**
- "AgentHost - Company Research for Sales" (38 chars)
- "Sales Research - AI Company Insights" (36 chars)

#### Tagline/Summary (max 132 characters)
**Draft:** "Right-click any company name to get AI-powered research in 30 seconds. Perfect for B2B sales professionals." (109 chars) ✅

#### Description (max 16,384 characters)

**Draft:**

```
## Get Instant Company Research for Sales

AgentHost Mini turns company research from hours into seconds. Right-click any company name on any webpage to get comprehensive AI-powered insights — perfect for B2B sales reps, BD professionals, and account executives.

### 🚀 How It Works

1. **Select** a company name on any webpage
2. **Right-click** and choose "Research [Company] with AgentHost"
3. **Get insights** in 30 seconds:
   - Company overview and industry
   - Funding rounds and investors
   - Tech stack and tools they use
   - Recent news and announcements
   - Likely pain points for sales outreach

### ✨ Key Features

- **⚡ Lightning fast:** Research in 30-60 seconds, not hours
- **🎯 Always relevant:** Context tailored for sales conversations
- **🔒 Privacy-focused:** Your searches are private
- **💼 Professional:** Clean, distraction-free sidebar interface
- **📱 Works everywhere:** Any website, any company

### 💰 Pricing

**Free Tier:** 3 research briefs per day
**Pro Tier:** Unlimited research for $15/month

### 🎓 Perfect For

- B2B sales representatives
- Business development professionals
- Account executives
- Startup founders doing sales
- Anyone who needs to research companies quickly

### 🔐 Privacy & Security

- No tracking or selling of your data
- Research history stored locally
- Optional account for Pro features only

### 🆘 Support

Questions? Email hello@agenthost.dev

---

**Built by engineers for sales professionals. Try it free today!**
```

**Status:** ✅ Draft complete

### Categories
- **Primary:** Productivity
- **Secondary:** Tools (if available)

### Language
- English

### Privacy Policy URL
**Status:** ⚠️ TODO - Need to create privacy policy page

Suggested URL: `https://agenthost.dev/privacy` (deploy landing page first)

### Support/Help URL (Optional)
Suggested: `https://agenthost.dev/support` or `mailto:hello@agenthost.dev`

## Pre-Submission Checklist

Before submitting to Chrome Web Store:

- [ ] Professional icons (hire designer or create in Figma)
- [ ] Small promotional tile (440x280)
- [ ] Marquee tile (1400x560) - optional but recommended
- [ ] At least 3 screenshots
- [ ] Privacy policy page deployed
- [ ] Landing page deployed
- [ ] Backend API deployed
- [ ] Extension tested end-to-end
- [ ] No console errors
- [ ] Manifest validated
- [ ] Store listing copy finalized
- [ ] Support email set up (hello@agenthost.dev)

## Timeline

**Today (Day 2):** Prepare assets specifications ✅  
**Day 3:** Create promotional images (or hire designer)  
**Day 4:** Deploy backend + test + take screenshots  
**Day 5:** Create privacy policy, finalize copy  
**Day 6:** Submit to Chrome Web Store  
**Day 7:** Buffer for review/changes  

## Cost Estimates

- Chrome Web Store developer registration: $5 (one-time)
- Icon/promotional image design (Fiverr): $20-50
- Total: ~$25-55

## Notes

- Chrome Web Store review typically takes 1-3 business days
- Can start with basic screenshots and improve after approval
- Privacy policy is REQUIRED for extensions that collect data
- Since we track usage locally (chrome.storage), need to disclose this
