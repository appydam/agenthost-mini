# AgentHost Mini Backend API

Express server that provides research endpoint for the Chrome extension.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your OpenClaw endpoint and token
```

3. Run locally:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

Server runs on `http://localhost:3000`

## Endpoints

### POST /research
Research a company using OpenClaw Scout agent.

**Request:**
```json
{
  "company": "Stripe",
  "requestId": "uuid-here"
}
```

**Response:**
```json
{
  "company": "Stripe",
  "requestId": "uuid-here",
  "data": {
    "overview": "Brief company description...",
    "funding": "Funding information...",
    "techStack": "Technologies they use...",
    "news": "Recent news...",
    "painPoints": "Likely challenges..."
  },
  "timestamp": "2026-02-17T03:30:00.000Z"
}
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "service": "agenthost-mini-api"
}
```

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | 3000 | Server port |
| `NODE_ENV` | No | development | Environment (development/production) |
| `OPENCLAW_ENDPOINT` | Yes | http://localhost:3100 | OpenClaw gateway URL |
| `OPENCLAW_TOKEN` | No | - | OpenClaw API token (optional for local) |

## Deployment

See [DEPLOY.md](../DEPLOY.md) for deployment instructions (Railway, Render, Fly.io).

## Development Mode

In development mode (`NODE_ENV=development`), if OpenClaw is unavailable, the API will fall back to mock data instead of failing. This allows testing the extension without a running OpenClaw instance.
