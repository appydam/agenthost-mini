// Options page script for AgentHost Mini

// Load current API key
chrome.storage.local.get(['apiKey'], (result) => {
  if (result.apiKey && result.apiKey !== 'demo-key') {
    document.getElementById('apiKey').value = result.apiKey;
    
    // Update tier display
    if (result.apiKey.startsWith('ak_pro_')) {
      document.getElementById('tier').textContent = 'Pro';
      document.getElementById('tier').classList.add('pro');
      document.getElementById('limits').textContent = 'Unlimited research briefs';
    }
  }
});

// Save API key
document.getElementById('save').addEventListener('click', () => {
  const apiKey = document.getElementById('apiKey').value.trim();
  
  chrome.runtime.sendMessage({
    type: 'SET_API_KEY',
    apiKey: apiKey || 'demo-key'
  }, (response) => {
    if (response.success) {
      // Show success message
      const successEl = document.getElementById('success');
      successEl.style.display = 'block';
      setTimeout(() => {
        successEl.style.display = 'none';
      }, 3000);
      
      // Update tier display
      if (apiKey.startsWith('ak_pro_')) {
        document.getElementById('tier').textContent = 'Pro';
        document.getElementById('tier').classList.add('pro');
        document.getElementById('limits').textContent = 'Unlimited research briefs';
      } else {
        document.getElementById('tier').textContent = 'Free';
        document.getElementById('tier').classList.remove('pro');
        document.getElementById('limits').textContent = '3 research briefs per day';
      }
    }
  });
});
