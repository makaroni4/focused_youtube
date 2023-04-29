const e="settings:comments",r=(t,o,s)=>{chrome.storage.local.set({[t]:o},()=>{s&&s(o)})},c=(t,o)=>{chrome.storage.local.get([t],function(s){const a=s[t];o(a)})};export{e as S,c as r,r as w};
