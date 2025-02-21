chrome.runtime.onInstalled.addListener(e=>{e.reason==="install"&&chrome.tabs.create({url:"welcome.html"})});
