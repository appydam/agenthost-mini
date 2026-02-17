// Background service worker for AgentHost Mini

const API_ENDPOINT = 'https://api.agenthost.dev/research'; // TODO: Deploy backend

// Create context menu on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'research-company',
    title: 'Research "%s" with AgentHost',
    contexts: ['selection']
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'research-company') {
    const companyName = info.selectionText;
    
    // Show loading state
    chrome.tabs.sendMessage(tab.id, {
      type: 'SHOW_LOADING',
      company: companyName
    });
    
    try {
      // Check usage limit
      const usage = await getUsageCount();
      if (usage >= 3) {
        chrome.tabs.sendMessage(tab.id, {
          type: 'SHOW_LIMIT',
          message: 'Daily limit reached (3/3). Upgrade to Pro for unlimited research.'
        });
        return;
      }
      
      // Call research API
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getApiKey()}`
        },
        body: JSON.stringify({
          company: companyName,
          requestId: crypto.randomUUID()
        })
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Increment usage
      await incrementUsage();
      
      // Show results
      chrome.tabs.sendMessage(tab.id, {
        type: 'SHOW_RESULTS',
        company: companyName,
        data: data,
        usage: usage + 1
      });
      
    } catch (error) {
      console.error('Research failed:', error);
      chrome.tabs.sendMessage(tab.id, {
        type: 'SHOW_ERROR',
        message: 'Failed to fetch research. Please try again.'
      });
    }
  }
});

// Storage helpers
async function getUsageCount() {
  const today = new Date().toDateString();
  const data = await chrome.storage.local.get(['usage', 'lastReset']);
  
  // Reset daily counter
  if (data.lastReset !== today) {
    await chrome.storage.local.set({ usage: 0, lastReset: today });
    return 0;
  }
  
  return data.usage || 0;
}

async function incrementUsage() {
  const usage = await getUsageCount();
  await chrome.storage.local.set({ usage: usage + 1 });
}

async function getApiKey() {
  const data = await chrome.storage.local.get('apiKey');
  return data.apiKey || 'demo-key'; // Demo mode = client-side limits
}

// Allow users to set API key (for Pro tier)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'SET_API_KEY') {
    chrome.storage.local.set({ apiKey: request.apiKey }, () => {
      sendResponse({ success: true });
    });
    return true; // Async response
  }
  
  if (request.type === 'GET_USAGE') {
    getUsageCount().then(sendResponse);
    return true;
  }
});

// Note: Message listener already defined above (merged)
