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

      <SegmentedControl
        v-if="extensionEnabled"
        name="Video display"
        class="focused-youtube-settings__toggle"
        :value="videoDisplay"
        :options="videoDisplayOptions"
        @select="handleVideoDisplaySelect"
      />
    </div>
  </div>
</template>

<script>
import Toggle from "@components/Toggle.vue"
import SegmentedControl from "@components/SegmentedControl.vue"
import {
  INFINITE_SCROLL_KEY,
  SETTINGS_COMMENTS_KEY,
  EXTENSION_ENABLED_KEY,
  SETTINGS_DESCRIPTION_KEY,
  SETTINGS_SHORTS_KEY,
  SETTINGS_VIDEO_DISPLAY_KEY,
  VIDEO_DISPLAY_DEFAULT,
  writeStorageData,
  readStorageKeys
} from "@helpers/chrome-storage"

export default {
  components: {
    Toggle,
    SegmentedControl
  },
  data() {
    return {
      extensionEnabled: false,
      commentsSectionEnabled: false,
      infiniteScrollEnabled: false,
      videoDescriptionEnabled: false,
      shortsEnabled: false,
      videoDisplay: VIDEO_DISPLAY_DEFAULT,
      videoDisplayOptions: [
        { label: "Video", value: "video" },
        { label: "Thumbnail", value: "thumbnail" },
        { label: "Black", value: "black" }
      ]
    }
  },
  mounted() {
    readStorageKeys([
      EXTENSION_ENABLED_KEY,
      SETTINGS_DESCRIPTION_KEY,
      SETTINGS_COMMENTS_KEY,
      INFINITE_SCROLL_KEY,
      SETTINGS_SHORTS_KEY,
      SETTINGS_VIDEO_DISPLAY_KEY
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

      this.videoDisplay = keys[SETTINGS_VIDEO_DISPLAY_KEY] !== undefined ?
        keys[SETTINGS_VIDEO_DISPLAY_KEY] : VIDEO_DISPLAY_DEFAULT
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
    },
    handleVideoDisplaySelect(val) {
      writeStorageData(SETTINGS_VIDEO_DISPLAY_KEY, val, () => {
        this.videoDisplay = val
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
