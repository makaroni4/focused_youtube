<script>
import Settings from "@components/Settings.vue"
import PopupFooter from "@components/PopupFooter.vue"
import browserAPI from "@helpers/browser-api.js"

export default {
  components: {
    Settings,
    PopupFooter
  },
  methods: {
    openWelcomePage() {
      const extensionId = browserAPI.runtime.id

      browserAPI.tabs.create({
        url: `chrome-extension://${extensionId}/welcome.html`
      })
    }
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

    <img
      src="./assets/info_icon.svg"
      class="focused-youtube-popup__info-icon"
      alt="Info page"
      @click.prevent="openWelcomePage" />
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
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 36px;
  }

  &__logo {
    height: 25px;
  }

  &__info-icon {
    width: 20px;

    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  &__hr {
    margin: 16px 0;

    border-top: 1px solid #e5e5e5;
    border-bottom: 0;
  }
}
</style>
