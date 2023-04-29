<script>
import Settings from "./components/Settings.vue"

export default {
  components: {
    Settings
  }
}
</script>

<template>
<div class="focused-youtube-popup">
  <header class="focused-youtube-popup__header">
    <img
      src="./assets/logo_with_name.svg"
      class="focused-youtube-popup__logo"
      alt="Focused Youtube logo" />
  </header>

  <div class="focused-youtube-popup__settings">
    <Settings />
  </div>
</div>
</template>

<style lang="scss" scoped>
.focused-youtube-popup {
  padding: 8px;

  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 36px;
  }

  &__logo {
    width: 100%;
  }
}
</style>
