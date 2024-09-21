const l="settings:extension_enabled",d="settings:comments",y="settings:infinite_scroll",f="settings:description",p="settings:rating_link_clicked",n="settings:extension_installed_at",v="settings:rating_reminder_dismissed_at",g=(e,t,s)=>{chrome.storage.local.set({[e]:t},()=>{s&&s(t)})},r=(e,t)=>{chrome.storage.local.get(e,function(s){t(s)})},D=()=>{r([n],e=>{if(!e[n]){const t=Math.floor(new Date().getTime()/1e3);g(n,t,()=>{})}})};const w=()=>{document.cookie="wide=; Max-Age=0; path=/; domain=.youtube.com"},T=()=>{w();const e=new Date;e.setFullYear(e.getFullYear()+1),document.cookie="wide=1; expires="+e.toUTCString()+"; path=/; domain=.youtube.com"},k=(e,t)=>e?!!(e.matches&&e.matches(t)||e.querySelector&&e.querySelector(t)):!1,a=e=>{const t=document.querySelectorAll("ytd-shelf-renderer.style-scope.ytd-item-section-renderer"),s=Array.from(t).find(o=>{const i=o.querySelector("#title");return i?i.innerText.includes(e):!1});s&&s.classList.add("fy-invisible")},_=(e,t,s)=>{new window.MutationObserver(function(i){i[0].addedNodes.length&&Array.from(i[0].addedNodes).some(u=>k(u,t))&&s()}).observe(e,{childList:!0,subtree:!0})},A=()=>{Array.from(document.body.classList).filter(t=>t.startsWith("fy-")).forEach(t=>{document.body.classList.remove(t)})},L=()=>Math.floor(new Date().getTime()/1e3),S=(e,t)=>(t-e)/60/60/24,M=()=>{document.querySelector(".fy-review-reminder")||r([v,p,n],e=>{if(!e[n]||e[p])return;const t=e[v],s=e[n],o=L(),i=t?S(t,o):-1,u=S(s,o),I=90;if(u<=7||i<=I)return;const c=document.createElement("div");c.classList="fy-review-reminder",c.innerHTML=`
      <div class="fy-review-reminder__body">
        <div class="fy-review-reminder__close js-fy-close-review-reminder">
          Dismiss
        </div>

        <div class="fy-review-reminder__container">
          <div class="fy-review-reminder__logo">
          </div>

          <div class="fy-review-reminder__copy">
            Focused YouTube is built with your feedback – leave a review and help spread the word! ⭐️
          </div>

          <a class="fy-review-reminder__cta js-fy-leave-review">
            Leave a review
          </a>
        </div>
      </div>
    `;const m=document.querySelector("body");m.appendChild(c),m.querySelector(".js-fy-close-review-reminder").addEventListener("click",h=>{h.preventDefault();const N=L();g(v,N,()=>{c.remove()})}),m.querySelector(".js-fy-leave-review").addEventListener("click",h=>{h.preventDefault(),g(p,1,()=>{window.location.href="https://chromewebstore.google.com/detail/focused-youtube/nfghbmabdoakhobmimnjkamfdnpfammn/reviews?hl=en"})})})},b=()=>{if(document.querySelector(".fy-logo-menu"))return;let t=document.querySelector("#logo");if(t||(t=document.querySelector(".fy-home-page__logo")),!t)return;const s=document.createElement("div");s.classList="fy-logo-menu",s.innerHTML=`
    <div class="fy-logo-menu__body">
      <div class="fy-logo-menu__links">
        <a href="/feed/history" class="fy-logo-menu__link">Watch history</a>

        <a href="/feed/playlists" class="fy-logo-menu__link">Playlists</a>

        <a href="/playlist?list=WL" class="fy-logo-menu__link">Watch later</a>

        <a href="/playlist?list=LL" class="fy-logo-menu__link">Liked videos</a>

        <a href="/account" class="fy-logo-menu__link">Account</a>
      </div>
    </div>
  `,t.appendChild(s)},q=()=>{const e=o=>{o.preventDefault();const i=s.querySelector(".fy-search-form__text-input").value;window.location.href="https://www.youtube.com/results?search_query="+encodeURIComponent(i)};document.body.classList.add("fy-home-page");const t=document.querySelector("body"),s=document.createElement("div");s.id="mega-app",t.innerHTML="",document.body.appendChild(s),s.innerHTML=`
    <div class="fy-home-page">
      <div id="logo" class="fy-home-page__logo">
      </div>

      <div class="fy-home-page__body">
        <form class="fy-home-page__form fy-search-form" action="#">
          <input class="fy-search-form__text-input" type="text" placeholder="Search" autofocus />
          <button class="fy-search-form__submit"></button>
        </form>
      </div>
    </div>
  `,s.querySelector(".fy-search-form").onsubmit=e,b()},R=()=>{document.body.classList.add("fy-watch-page"),r([d,f],e=>{const t=document.querySelector("body");typeof e[d]>"u"||e[d]?t.classList.add("fy-watch-page--comments-visible"):t.classList.remove("fy-watch-page--comments-visible"),typeof e[f]>"u"||e[f]?t.classList.add("fy-watch-page--description-visible"):t.classList.remove("fy-watch-page--description-visible")})},C=()=>{document.body.classList.add("fy-playlist-page")},Y=()=>{document.body.classList.add("fy-playlists-page")},P=()=>{document.body.classList.add("fy-history-page")},F=()=>{document.body.classList.add("fy-channel-page")},$=()=>{document.body.classList.add("fy-results-page"),r([y],e=>{const t=document.querySelector("body");typeof e[y]>"u"||e[y]?t.classList.add("fy-results-page--infinite-scroll-enabled"):t.classList.remove("fy-results-page--infinite-scroll-enabled")})};D();document.body.style.display="block";const E=()=>{A(),T();const e=window.location.pathname;e==="/"?q():e==="/results"?$():e==="/watch"||e.match(/\/live\/[\w-]+/)?R():e==="/feed/history"?P():e==="/playlist"?C():e==="/feed/playlists"?Y():(e.startsWith("/@")||e.startsWith("/channel"))&&F(),setTimeout(()=>{M()},5e3)};chrome.storage.onChanged.addListener(e=>{for(let[t,{newValue:s}]of Object.entries(e)){if(t===d){const o=document.querySelector("body");s?o.classList.add("fy-watch-page--comments-visible"):o.classList.remove("fy-watch-page--comments-visible")}if(t===f){const o=document.querySelector("body");s?o.classList.add("fy-watch-page--description-visible"):o.classList.remove("fy-watch-page--description-visible")}if(t===y){const o=document.querySelector("body");s?o.classList.add("fy-results-page--infinite-scroll-enabled"):o.classList.remove("fy-results-page--infinite-scroll-enabled")}t===l&&(s?T():w(),window.location.reload())}});r([l],e=>{if(e[l]||typeof e[l]>"u"){E(),b(),_(document.body,"ytd-shelf-renderer.style-scope.ytd-item-section-renderer",function(){a("For you"),a("Latest posts from"),a("Latest from"),a("Popular today")}),_(document.body,"ytd-topbar-logo-renderer#logo",function(){b()});let t=window.location.href;_(document.body,"*",function(){t!==window.location.href&&(t=window.location.href,E())})}else w()});
