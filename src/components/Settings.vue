<template>
  <div class="focused-youtube-settings">
    <div class="focused-youtube-settings__toggles">
      <Toggle
        name="Extension enabled"
        class="focused-youtube-settings__toggle"
        :toggled="extensionEnabled"
        @toggle="handleExtensionToggle" />

      <Toggle
        v-if="extensionEnabled"
        name="Comments"
        class="focused-youtube-settings__toggle"
        :toggled="commentsSectionEnabled"
        @toggle="handleCommentsToggle"
      />

      <Toggle
        v-if="extensionEnabled"
        name="Description"
        class="focused-youtube-settings__toggle"
        :toggled="videoDescriptionEnabled"
        @toggle="handleVideoDescriptionToggle" />

      <Toggle
        v-if="extensionEnabled"
        name="Infinite scroll"
        class="focused-youtube-settings__toggle"
        :toggled="infiniteScrollEnabled"
        @toggle="handleInfiniteScrollToggle"
      />

      <Toggle
        v-if="extensionEnabled"
        name="Shorts"
        class="focused-youtube-settings__toggle"
        :toggled="shortsEnabled"
        @toggle="handleShortsToggle"
      />
    </div>
  </div>
</template>

<script>
import Toggle from "@components/Toggle.vue"
import {
  INFINITE_SCROLL_KEY,
  SETTINGS_COMMENTS_KEY,
  EXTENSION_ENABLED_KEY,
  SETTINGS_DESCRIPTION_KEY,
  SETTINGS_SHORTS_KEY,
  writeStorageData,
  readStorageKeys
} from "@helpers/chrome-storage"

export default {
  components: {
    Toggle
  },
  data() {
    return {
      extensionEnabled: false,
      commentsSectionEnabled: false,
      infiniteScrollEnabled: false,
      videoDescriptionEnabled: false,
      shortsEnabled: false
    }
  },
  mounted() {
    readStorageKeys([
      EXTENSION_ENABLED_KEY,
      SETTINGS_DESCRIPTION_KEY,
      SETTINGS_COMMENTS_KEY,
      INFINITE_SCROLL_KEY,
      SETTINGS_SHORTS_KEY
    ], (keys) => {
      this.extensionEnabled = keys[EXTENSION_ENABLED_KEY] !== undefined ?
        keys[EXTENSION_ENABLED_KEY] : true

      this.videoDescriptionEnabled = keys[SETTINGS_DESCRIPTION_KEY] !== undefined ?
        keys[SETTINGS_DESCRIPTION_KEY] : true

      this.commentsSectionEnabled = keys[SETTINGS_COMMENTS_KEY] !== undefined ?
        keys[SETTINGS_COMMENTS_KEY] : true

      this.infiniteScrollEnabled = keys[INFINITE_SCROLL_KEY] !== undefined ?
        keys[INFINITE_SCROLL_KEY] : true

      this.shortsEnabled = keys[SETTINGS_SHORTS_KEY] !== undefined ?
        keys[SETTINGS_SHORTS_KEY] : true
    })
  },
  methods: {
    handleExtensionToggle(val) {
      writeStorageData(EXTENSION_ENABLED_KEY, val, () => {
        this.extensionEnabled = val

        // IMPORTANT
        // The YouTube page is reloaded in the content_script.js file.
        // Here we reloading the Popup page.
        window.location.reload()
      })
    },
    handleCommentsToggle(val) {
      writeStorageData(SETTINGS_COMMENTS_KEY, val, () => {
        this.commentsSectionEnabled = val
      })
    },
    handleInfiniteScrollToggle(val) {
      writeStorageData(INFINITE_SCROLL_KEY, val, () => {
        this.infiniteScrollEnabled = val
      })
    },
    handleVideoDescriptionToggle(val) {
      writeStorageData(SETTINGS_DESCRIPTION_KEY, val, () => {
        this.videoDescriptionEnabled = val
      })
    },
    handleShortsToggle(val) {
      writeStorageData(SETTINGS_SHORTS_KEY, val, () => {
        this.shortsEnabled = val
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.focused-youtube-settings {
  &__toggles {
    display: flex;
    flex-direction: column;
    margin-bottom: 36px;
  }

  &__toggle {
    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }
}
</style>
