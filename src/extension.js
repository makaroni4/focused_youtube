import './style-overrides.css'

document.body.style.display = "block";

const SETTINGS_COMMENTS_KEY = "settings:comments";

let currentUrl = window.location.href;

let cleanUpFYClasses = () => {
  document.body.classList.forEach(className => {
    if (className.startsWith("fy-")) {
      document.body.classList.remove(className);
    }
  });
}

const initFY = () => {
  cleanUpFYClasses();

  if (window.location.pathname === "/") {
    initHomePage();
  } else if (window.location.pathname === "/results") {
    initResultsPage();
  } else if (window.location.pathname === "/watch") {
    initWatchPage();
  }
}

const initWatchPage = () => {
  document.body.classList.add("fy-watch-page");

  const readStorageData = (storageKey, callback) => {
    chrome.storage.local.get([storageKey], function(result) {
      const value = result[storageKey];

      callback(value);
    });
  };

  readStorageData(SETTINGS_COMMENTS_KEY, (value) => {
    const $body = document.querySelector("body");

    if(value) {
      $body.classList.add("fy-comments-active");
    } else {
      $body.classList.remove("fy-comments-active");
    }
  });
}

const initResultsPage = () => {
  document.body.classList.add("fy-results-page");
}

const initHomePage = () => {
  const search = (event) => {
    event.preventDefault();

    const query = anchor.querySelector(".fy-search-form__text-input").value;
    window.location.href = "https://www.youtube.com/results?search_query=" + encodeURIComponent(query);
  }

  document.body.classList.add("fy-home-page");

  const body = document.querySelector("body");
  const anchor = document.createElement("div");
  anchor.id = "mega-app";

  body.innerHTML = "";
  document.body.appendChild(anchor);

  anchor.innerHTML = `
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
  `;

  anchor.querySelector(".fy-search-form").onsubmit = search;
}

const observeDOM = (function () {
  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  const eventListenerSupported = window.addEventListener;

  return function (obj, callback) {
    if (MutationObserver) {
      let obs = new MutationObserver(function (mutations, observer) {
        if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
          callback();
        }
      });

      obs.observe(obj, {
        childList: true,
        subtree: true
      });
    } else if (eventListenerSupported) {
      obj.addEventListener("DOMNodeInserted", callback, false);
      obj.addEventListener("DOMNodeRemoved", callback, false);
    }
  };
})();

initFY();

observeDOM(document.body, function () {
  if (currentUrl !== window.location.href) {
    currentUrl = window.location.href;

    initFY();
  }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { newValue }] of Object.entries(changes)) {
    if(key === SETTINGS_COMMENTS_KEY) {
      const $body = document.querySelector("body");

      if(newValue) {
        $body.classList.add("fy-watch-page--comments-visible");
      } else {
        $body.classList.remove("fy-watch-page--comments-visible");
      }
    }
  }
});
