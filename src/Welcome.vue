<script>
export default {
  components: {
  }
}
</script>

<template>
<div class="focused-youtube-welcome-page">
  <header class="focused-youtube-welcome-page__header">
    <img
      src="./assets/logo_with_name.svg"
      class="focused-youtube-welcome-page__logo"
      alt="Focused Youtube logo" />

    <img
      src="./assets/info_icon.svg"
      class="focused-youtube-welcome-page__logo"
      alt="Focused Youtube logo" />
  </header>

  <div class="focused-youtube-popup__steps">
    <div class="focused-youtube-popup__step">
      <h2>1. Pin the extension.</h2>

      It'll allow you to temporarily disable it and adjust configs.
    </div>

    <div class="focused-youtube-popup__step">
      <h2>2. Use uBlock Origin Adblocker.</h2>
    </div>

    <div class="focused-youtube-popup__step">
      <h2>3. Report issues or new ideas via Github isssues.</h2>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.focused-youtube-welcome-page {
  padding: 8px;

  &__logo {
    height: 25px;
  }
}
</style>
