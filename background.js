chrome.runtime.onInstalled.addListener(function() {
    console.log('Extension installed.');
  });
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'executeCodeInBackground') {
      console.log('Executing code in the background page.');
      // 在这里执行后台页的代码逻辑
    }
  });
  