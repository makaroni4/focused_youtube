import{S as c,r}from"./chrome-storage.js";document.body.style.display="block";let a=window.location.href,l=()=>{document.body.classList.forEach(e=>{e.startsWith("fy-")&&document.body.classList.remove(e)})};const d=()=>{l(),window.location.pathname==="/"?u():window.location.pathname==="/results"?m():window.location.pathname==="/watch"&&f()},f=()=>{document.body.classList.add("fy-watch-page"),r(c,e=>{const o=document.querySelector("body");e?o.classList.add("fy-watch-page--comments-visible"):o.classList.remove("fy-watch-page--comments-visible")})},m=()=>{document.body.classList.add("fy-results-page")},u=()=>{const e=s=>{s.preventDefault();const n=t.querySelector(".fy-search-form__text-input").value;window.location.href="https://www.youtube.com/results?search_query="+encodeURIComponent(n)};document.body.classList.add("fy-home-page");const o=document.querySelector("body"),t=document.createElement("div");t.id="mega-app",o.innerHTML="",document.body.appendChild(t),t.innerHTML=`
    <div class="fy-home-page">
      <div class="fy-home-page__logo">
      </div>

      <div class="fy-home-page__body">
        <form class="fy-home-page__form fy-search-form" action="#">
          <input class="fy-search-form__text-input" type="text" placeholder="Search" />
          <button class="fy-search-form__submit"></button>
        </form>
      </div>
    </div>
  `,t.querySelector(".fy-search-form").onsubmit=e},y=function(){const e=window.MutationObserver||window.WebKitMutationObserver,o=window.addEventListener;return function(t,s){e?new e(function(i){(i[0].addedNodes.length||i[0].removedNodes.length)&&s()}).observe(t,{childList:!0,subtree:!0}):o&&(t.addEventListener("DOMNodeInserted",s,!1),t.addEventListener("DOMNodeRemoved",s,!1))}}();d();y(document.body,function(){a!==window.location.href&&(a=window.location.href,d())});chrome.storage.onChanged.addListener(e=>{for(let[o,{newValue:t}]of Object.entries(e))if(o===c){const s=document.querySelector("body");t?s.classList.add("fy-watch-page--comments-visible"):s.classList.remove("fy-watch-page--comments-visible")}});
