# Privacy Policy for AgentHost Mini

**Last Updated:** February 17, 2026

## Overview

AgentHost Mini ("we", "our", or "the extension") is committed to protecting your privacy. This policy explains how we collect, use, and protect your information.

## Information We Collect

### Information Stored Locally

**Usage Tracking (Local Storage Only):**
- Daily research count (to enforce 3/day free tier limit)
- Last reset date
- This data is stored locally in your browser using `chrome.storage.local`
- This data NEVER leaves your device
- We cannot access this data

### Information Sent to Our Servers

When you request company research:
- **Company name** (the text you selected)
- **Request ID** (random UUID for debugging)
- **Timestamp** (when the request was made)

We do NOT collect:
- Your browsing history
- Personal information
- Email addresses (unless you sign up for Pro)
- Cookies or tracking identifiers
- The webpage URL where you made the request

## How We Use Information

**Company research requests** are:
- Sent to our API server
- Processed by AI to generate research briefs
- Returned to you via the extension
- NOT stored or logged permanently (except for debugging)

**Usage tracking** is:
- Stored only in your browser
- Used only to enforce free tier limits
- Reset daily at midnight (your local time)

## Third-Party Services

**OpenAI/Anthropic (AI Research):**
- We use AI services to generate company research
- Company names are sent to these services
- They process requests according to their own privacy policies
- We use API-only access (no data training or storage)

**Web Search (Google/Bing):**
- We may perform web searches to gather public company information
- Searches are anonymized (not linked to you personally)

## Data Retention

- **Free tier:** No account, no data stored
- **Pro tier (if you upgrade):**
  - Email address (for account management)
  - Payment information (handled by Stripe, not stored by us)
  - Usage history (for billing purposes only)

We delete all user data within 30 days of account closure.

## Your Rights

You have the right to:
- **Access** your data (email hello@agenthost.dev)
- **Delete** your data (uninstall extension or close account)
- **Opt out** of any data collection (don't use the extension)

## Security

- All API requests use HTTPS encryption
- No passwords stored (Pro accounts use OAuth)
- Local storage is isolated to your browser
- We follow industry-standard security practices

## Children's Privacy

AgentHost Mini is not intended for users under 13 years old. We do not knowingly collect information from children.

## Changes to This Policy

We may update this privacy policy from time to time. Changes will be posted on this page with an updated "Last Updated" date.

## Contact Us

Questions about privacy?  
Email: **hello@agenthost.dev**  
Website: **https://agenthost.dev**

## Compliance

This extension complies with:
- Chrome Web Store Developer Program Policies
- GDPR (European Union)
- CCPA (California)
- General data protection best practices

---

**Summary for Chrome Web Store:**

*AgentHost Mini stores usage counts locally in your browser to enforce free tier limits (3 briefs/day). When you request research, we send the company name to our API and AI services to generate insights. We do not track your browsing, collect personal info (unless you sign up for Pro), or sell your data. All requests are encrypted via HTTPS.*
