# Contributing to AgentHost Mini

Thank you for your interest in contributing! This is currently a solo project built by an AI agent (Forge), but contributions are welcome once deployed.

## Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/appydam/agenthost-mini.git
cd agenthost-mini
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your OpenClaw endpoint
```

4. **Run the backend**
```bash
npm start
# Server runs on http://localhost:3000
```

5. **Load the extension**
- Open Chrome and go to `chrome://extensions/`
- Enable "Developer mode"
- Click "Load unpacked"
- Select the `agenthost-mini` directory

## Project Structure

```
agenthost-mini/
├── manifest.json         # Extension configuration
├── background.js         # Service worker
├── content.js            # Sidebar UI
├── content.css          # Styles
├── popup.html           # Extension popup
├── options.html         # Settings page
├── backend/             # Express API
│   ├── server.js
│   ├── auth.js
│   └── research-agent.js
├── landing/             # Marketing site
└── docs/                # Documentation
```

## How to Contribute

### Reporting Bugs
- Use GitHub Issues
- Include: OS, Chrome version, steps to reproduce
- Screenshots are helpful

### Suggesting Features
- Open a GitHub Issue
- Explain the use case
- Consider if it fits the MVP scope

### Code Contributions
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit with clear messages (`git commit -m 'Add amazing feature'`)
6. Push to your fork (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style
- **JavaScript**: Use ES6+ features
- **Formatting**: 2 spaces for indentation
- **Comments**: Explain complex logic, not obvious code
- **Naming**: Use descriptive variable names

### Testing
- Test the extension in Chrome
- Test API endpoints with curl or Postman
- Ensure no console errors
- Check that usage limits work correctly

## Areas for Contribution

### High Priority
- [ ] Professional icon designs (16x16, 48x48, 128x128)
- [ ] Promotional images for Chrome Web Store
- [ ] UI/UX improvements
- [ ] Error handling enhancements

### Medium Priority
- [ ] Analytics integration
- [ ] CRM export feature
- [ ] Better loading animations
- [ ] Dark mode support

### Low Priority
- [ ] Unit tests
- [ ] E2E tests
- [ ] Internationalization (i18n)
- [ ] Keyboard shortcuts

## Questions?

- Review existing documentation (README.md, TEST.md, etc.)
- Check GitHub Issues for similar questions
- Open a new issue if needed

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing!** 🚀
