(function () {
  document.body.style.display = "block";

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
    } else {
      initDefaultPage();
    }
  }

  // Pages where we don't hide comments or recommendations, like stories or profile pages.
  const initDefaultPage = () => {
    const toggleSwitch = document.querySelector(".fy-switch");

    if(toggleSwitch) {
      toggleSwitch.remove();
    }
  }

  const initToggleSwitch = () => {
    const container = document.querySelector("#start.ytd-masthead");

    if (!container) {
      return;
    }

    const toggleSwitch = document.querySelector(".fy-switch");

    if (toggleSwitch) {
      // This is desired UX: turn switch ON on every page load.
      const input = toggleSwitch.querySelector("input");
      input.checked = true;

      return;
    }

    const label = document.createElement("label");
    label.classList.add("fy-switch");
    container.appendChild(label);

    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = true;
    label.appendChild(input);

    const span = document.createElement("span");
    span.classList.add("fy-switch__slider");
    label.appendChild(span);

    input.addEventListener("change", function () {
      if (this.checked) {
        initFY();
      } else {
        cleanUpFYClasses();
      }
    });
  }

  const initWatchPage = () => {
    document.body.classList.add("fy-watch-page");

    initToggleSwitch();
  }

  const initResultsPage = () => {
    document.body.classList.add("fy-results-page");

    initToggleSwitch();
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
})();
