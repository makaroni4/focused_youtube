<script>
import Toggle from "@components/Toggle.vue"
import {
  INFINITE_SCROLL_KEY,
  SETTINGS_COMMENTS_KEY,
  EXTENSION_ENABLED_KEY,
  SETTINGS_DESCRIPTION_KEY,
  writeStorageData,
  readStorageKey
} from "@js/chrome-storage"

export default {
  components: {
    Toggle
  },
  data() {
    return {
      showExtensionToggle: false,
      showCommentsToggle: false,
      showInfiniteScrollToggle: false,
      extensionEnabled: false,
      commentsSectionEnabled: false,
      infiniteScrollEnabled: false,
      showInfiniteScrollToggle: false,
      showVideoDescriptionToggle: false,
      videoDescriptionEnabled: false
    }
  },
  mounted() {
    readStorageKey(EXTENSION_ENABLED_KEY, (value) => {
      this.extensionEnabled = value !== undefined ? value : false
      this.showExtensionToggle = true
      if (this.extensionEnabled) {
        this.enableOtherSettings()
      }else {
        this.disbleOtherSettings()
      }

      this.showCommentsToggle = true
    })

    readStorageKey(SETTINGS_DESCRIPTION_KEY, (value) => {
      if(typeof(value) === "undefined") {
        this.videoDescriptionEnabled = false
      } else {
        this.videoDescriptionEnabled = value
      }

      this.showVideoDescriptionToggle = true
    })

    readStorageKey(INFINITE_SCROLL_KEY, (value) => {
      if(typeof(value) === "undefined") {
        this.infiniteScrollEnabled = false
      } else {
        this.infiniteScrollEnabled = value
      }

      this.showInfiniteScrollToggle = true
    })
  },
  methods: {
    disbleOtherSettings(){
      this.commentsSectionEnabled = false
      this.infiniteScrollEnabled = false
      this.showCommentsToggle = false
      this.showInfiniteScrollToggle = false

      
    },
    enableOtherSettings() {
      readStorageKey(SETTINGS_COMMENTS_KEY, (value) => {
        this.commentsSectionEnabled = value !== undefined ? value : false
        this.showCommentsToggle = true
      })

      readStorageKey(INFINITE_SCROLL_KEY, (value) => {
        this.infiniteScrollEnabled = value !== undefined ? value : false
        this.showInfiniteScrollToggle = true
      })
    },
    handleExtensionToggle(val) {
      writeStorageData(EXTENSION_ENABLED_KEY, val, () => {
        this.extensionEnabled = val
        if (val) {
          this.enableOtherSettings()
        } else {
          this.disbleOtherSettings()
        }
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
    }
  }
}
</script>

<template>
  <div class="focused-youtube-settings">
    <div class="focused-youtube-settings__toggles">
      <Toggle
        v-if="showExtensionToggle"
        title="Enable Extension"
        name="Extension status"
        class="focused-youtube-settings__toggle"
        :toggled="extensionEnabled"
        @toggle="handleExtensionToggle" />

      <Toggle
        v-if="showCommentsToggle"
        title="Comments"
        name="Comments"
        class="focused-youtube-settings__toggle"
        :toggled="commentsSectionEnabled"
        @toggle="handleCommentsToggle"
      />

      <Toggle
        v-if="showVideoDescriptionToggle"
        title="Description"
        name="Description"
        class="focused-youtube-settings__toggle"
        :toggled="videoDescriptionEnabled"
        @toggle="handleVideoDescriptionToggle" />

      <Toggle
        v-if="showInfiniteScrollToggle"
        title="Infinite scroll"
        name="Infinite scroll"
        class="focused-youtube-settings__toggle"
        :toggled="infiniteScrollEnabled"
        @toggle="handleInfiniteScrollToggle"
      />
    </div>
  </div>
</template>

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
