// Content script for AgentHost Mini sidebar

let sidebarOpen = false;

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case 'SHOW_LOADING':
      showSidebar();
      renderLoading(message.company);
      break;
    case 'SHOW_RESULTS':
      renderResults(message.company, message.data, message.usage);
      break;
    case 'SHOW_ERROR':
      renderError(message.message);
      break;
    case 'SHOW_LIMIT':
      renderLimitReached(message.message);
      break;
  }
});

function showSidebar() {
  if (sidebarOpen) return;
  
  // Create sidebar container
  const sidebar = document.createElement('div');
  sidebar.id = 'agenthost-sidebar';
  sidebar.innerHTML = `
    <div class="agenthost-header">
      <img src="${chrome.runtime.getURL('icons/icon-48.png')}" alt="AgentHost" />
      <h3>AgentHost Mini</h3>
      <button id="agenthost-close">×</button>
    </div>
    <div class="agenthost-content">
      <div class="agenthost-loading">Loading...</div>
    </div>
  `;
  
  document.body.appendChild(sidebar);
  sidebarOpen = true;
  
  // Close button handler
  document.getElementById('agenthost-close').addEventListener('click', closeSidebar);
}

function closeSidebar() {
  const sidebar = document.getElementById('agenthost-sidebar');
  if (sidebar) {
    sidebar.remove();
    sidebarOpen = false;
  }
}

function renderLoading(company) {
  const content = document.querySelector('.agenthost-content');
  if (!content) return;
  
  content.innerHTML = `
    <div class="agenthost-loading">
      <div class="spinner"></div>
      <p>Researching <strong>${escapeHtml(company)}</strong>...</p>
      <p class="sub">This usually takes 30-60 seconds</p>
    </div>
  `;
}

function renderResults(company, data, usage) {
  const content = document.querySelector('.agenthost-content');
  if (!content) return;
  
  content.innerHTML = `
    <div class="agenthost-results">
      <h2>${escapeHtml(company)}</h2>
      
      <div class="section">
        <h3>📊 Overview</h3>
        <p>${escapeHtml(data.overview || 'No overview available')}</p>
      </div>
      
      <div class="section">
        <h3>💰 Funding</h3>
        <p>${escapeHtml(data.funding || 'No funding data available')}</p>
      </div>
      
      <div class="section">
        <h3>🔧 Tech Stack</h3>
        <p>${escapeHtml(data.techStack || 'No tech stack data available')}</p>
      </div>
      
      <div class="section">
        <h3>📰 Recent News</h3>
        <p>${escapeHtml(data.news || 'No recent news')}</p>
      </div>
      
      <div class="section">
        <h3>🎯 Pain Points</h3>
        <p>${escapeHtml(data.painPoints || 'No identified pain points')}</p>
      </div>
      
      <div class="usage-badge">
        ${usage}/3 briefs used today
        ${usage >= 3 ? '<a href="https://agenthost.dev/pricing" target="_blank">Upgrade to Pro →</a>' : ''}
      </div>
    </div>
  `;
}

function renderError(message) {
  const content = document.querySelector('.agenthost-content');
  if (!content) return;
  
  content.innerHTML = `
    <div class="agenthost-error">
      <p>❌ ${escapeHtml(message)}</p>
      <button onclick="document.getElementById('agenthost-close').click()">Close</button>
    </div>
  `;
}

function renderLimitReached(message) {
  const content = document.querySelector('.agenthost-content');
  if (!content) return;
  
  content.innerHTML = `
    <div class="agenthost-limit">
      <h2>Daily Limit Reached</h2>
      <p>${escapeHtml(message)}</p>
      <a href="https://agenthost.dev/pricing" target="_blank" class="upgrade-btn">
        Upgrade to Pro - $15/month
      </a>
      <p class="sub">Unlimited research briefs • Priority support • Advanced insights</p>
    </div>
  `;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
