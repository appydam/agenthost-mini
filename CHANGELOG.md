# Changelog

All notable changes to AgentHost Mini will be documented in this file.

## [Unreleased] - 2026-02-17

### Added
- Chrome extension with Manifest V3
- Context menu integration (right-click to research companies)
- Sidebar UI with loading/results/error states
- Popup with usage counter
- Settings page for Pro API keys
- Backend Express API with OpenClaw/Scout integration
- API key authentication system (Free: 3/day, Pro: unlimited)
- Rate limiting and usage tracking
- Privacy policy (GDPR/CCPA compliant)
- Landing page with pricing
- Comprehensive documentation:
  - README.md (project overview)
  - TEST.md (testing guide)
  - DEPLOY.md (deployment options)
  - INTEGRATION.md (OpenClaw setup)
  - STORE-ASSETS.md (Chrome Web Store requirements)
  - PRIVACY-POLICY.md
  - DEPLOYMENT-STATUS.md
  - HANDOFF.md (deployment guide for Arpit)
  - CHANGELOG.md (this file)

### Technical Details
- **Extension**: Vanilla JavaScript (lightweight, no frameworks)
- **Backend**: Node.js + Express
- **AI**: OpenClaw agents (Scout for research)
- **Auth**: Simple API key system with in-memory storage (MVP)
- **Icons**: SVG placeholders (to be replaced with professional designs)

## [0.1.0] - 2026-02-16 - Initial Development

### Day 1
- Project initialization
- Chrome extension structure
- Basic sidebar UI
- Mock backend API
- Initial documentation

### Day 2
- Real OpenClaw agent integration
- API key authentication
- Privacy policy
- Store assets checklist
- Deployment configurations
- Complete documentation
- Handoff guide

## Future Releases

### [0.2.0] - Planned
- Professional icons (replace SVG placeholders)
- Backend deployment
- End-to-end testing
- Chrome Web Store submission
- Landing page deployment

### [0.3.0] - Planned
- Error tracking (Sentry)
- Analytics integration
- CRM export feature (Pro tier)
- Improved UI animations
- Better loading states

### [1.0.0] - Planned
- Chrome Web Store approval
- Payment processing (Stripe)
- User accounts and dashboard
- Advanced AI insights
- API rate limiting improvements

---

**Note**: Versions 0.1.x are pre-release development. Version 0.2.x will be the first deployable version. Version 1.0.0 will be the first public Chrome Web Store release.
