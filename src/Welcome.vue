<script>
export default {
  components: {
  }
}
</script>

<template>
<div class="fy-welcome-page">
  <header class="fy-welcome-page__header">
    <img
      src="./assets/logo.svg"
      class="fy-welcome-page__logo"
      alt="Focused Youtube logo" />
  </header>

  <div class="fy-welcome-page__banner">
    <strong>👋 Welcome to Focused Youtube!</strong>

    Focused Youtube is ready to go, but I bet you want to <u>configure it</u> to have the best experience. It'll take you 1 minute. 👇
  </div>

  <div class="fy-welcome-page__steps">
    <div class="fy-welcome-page__step">
      <h2>1. Pin the extension.</h2>

      <p>
        Pin the extension icon for quick access. You can easily access Focused Youtube settings to temporarily disable the extension or customize specific YouTube sections.
      </p>

      <img
        class="fy-welcome-page__how-to-pin-gif"
        src="./assets/how_to_pin.gif"
        alt="How to pin">
    </div>

    <div class="fy-welcome-page__step">
      <h2>2. Use uBlock Origin ad blocker.</h2>

      <p>
        Focused Youtube can interfere with your ad blocker and you'll have a subpar performance: longer page loading times, ads or interface sections might jump or blink.
      </p>

      <p>
        I highly recommend switching to <a href="https://ublockorigin.com/">uBlock Origin</a> because it is:

        <ul>
          <ol><strong>🏎️ Extremely fast.</strong> Since an ad blocker and Focused Youtube both modify the same page, it's critical to have a fast ad blocker. uBlock Origin is simply the best.</ol>

          <ol><strong>🔓 Secure.</strong> uBlock Origin does NOT require permissions to read and modify page content, it only blocks ad network requests in the background.</ol>

          <ol><strong>🔍 Open-sourced.</strong> Like Focused Youtube, the source code of uBlock Origin is publicly available.</ol>
        </ul>

        <a class="fy-welcome-page__btn" href="https://ublockorigin.com/">Get uBlock Origin ad blocker</a>
      </p>
    </div>

    <div class="fy-welcome-page__step">
      <h2>3. Report issues and share ideas.</h2>

      <p>
        Focused Youtube is built with your feedback. If you notice a bug (YouTube constantly changes their layout, so some previously blocked sections might re-appear) or have a suggestion, please <a href="https://github.com/makaroni4/focused_youtube/issues">create an issue on Github</a> 🔗.
      </p>

      <p>
        You can easily access the feedback link in the Focused Youtube settings (when the extension is pinned).
      </p>
    </div>
  </div>

  Enjoy Focused Youtube! 🍻
</div>
</template>

<style lang="scss" scoped>
.fy-welcome-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 8px;

  &__header {
    margin-bottom: 24px;
  }

  &__logo {
    height: 25px;
  }

  &__banner {
    padding: 16px;

    border-radius: 8px;

    background-color: #FFF6D8;
  }

  &__how-to-pin-gif {
    max-width: 600px;

    border: 3px solid #F2F2F2;
    border-radius: 8px;
  }

  &__steps {
    margin-bottom: 24px;
  }

  &__btn {
    display: inline-block;
    padding: 12px 24px;

    border-radius: 8px;
    outline: none;
    border: 1px solid transparent;

    background-color: #065fd4;

    color: #FFF;
    text-decoration: none;
    text-align: center;

    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
