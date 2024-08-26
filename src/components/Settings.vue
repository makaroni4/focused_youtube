<script>
import Toggle from "@components/Toggle.vue"
import { EXTENSION_ENABLED_KEY, INFINITE_SCROLL_KEY, SETTINGS_COMMENTS_KEY, writeStorageData, readStorageKey } from "@js/chrome-storage"

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
    }
  },
  mounted() {
    readStorageKey(EXTENSION_ENABLED_KEY, (value) => {
      this.extensionEnabled = value !== undefined ? value : true
      this.showExtensionToggle = true
      if (this.extensionEnabled) {
        this.enableOtherSettings()
      }else {
        this.disbleOtherSettings()
      }
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
        title="Show comments"
        name="Comments section"
        class="focused-youtube-settings__toggle"
        :toggled="commentsSectionEnabled"
        @toggle="handleCommentsToggle"
      />

      <Toggle
        v-if="showInfiniteScrollToggle"
        title="Enable infinite scroll"
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