<script>
import Settings from "@components/Settings.vue"
import PopupFooter from "@components/PopupFooter.vue"

export default {
  components: {
    Settings,
    PopupFooter
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

  <hr class="focused-youtube-popup__hr">

  <div class="focused-youtube-popup__footer">
    <PopupFooter />
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
    height: 25px;
  }

  &__hr {
    margin: 16px 0;

    border-top: 1px solid #e5e5e5;
    border-bottom: 0;
  }
}
</style>
