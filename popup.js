// Popup script for AgentHost Mini

// Load and display current usage
chrome.runtime.sendMessage({ type: 'GET_USAGE' }, (usage) => {
  document.getElementById('usage-count').textContent = `${usage || 0}/3`;
});
