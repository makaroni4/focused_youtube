<script>
import Toggle from "@components/Toggle.vue"
import { INFINITE_SCROLL_KEY, SETTINGS_COMMENTS_KEY, writeStorageData, readStorageKey } from "@js/chrome-storage"

export default {
  components: {
    Toggle
  },
  data() {
    return {
      showCommentsToggle: false,
      commentsSectionEnabled: false,
      infiniteScrollEnabled: false,
      showInfiniteScrollToggle: false
    }
  },
  mounted() {
    readStorageKey(SETTINGS_COMMENTS_KEY, (value) => {
      if(typeof(value) === "undefined") {
        this.commentsSectionEnabled = false
      } else {
        this.commentsSectionEnabled = value
      }

      this.showCommentsToggle = true
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
    handleCommentsToggle(val) {
      writeStorageData(SETTINGS_COMMENTS_KEY, val, () => {
        this.commentsSectionEnabled = val
      })
    },
    handleInfiniteScrollToggle(val) {
      writeStorageData(INFINITE_SCROLL_KEY, val, () => {
        this.infiniteScrollEnabled = val
      })
    }
  }
}
</script>

<template>
  <div class="focused-youtube-settings">
    <div class="focused-youtube-settings__toggles">
      <Toggle
        v-if="showCommentsToggle"
        title="Show video comments"
        name="Comments section"
        class="focused-youtube-settings__toggle"
        :toggled="commentsSectionEnabled"
        @toggle="handleCommentsToggle" />

      <Toggle
        v-if="showInfiniteScrollToggle"
        title="Enable infinite scroll"
        name="Infinite scroll"
        class="focused-youtube-settings__toggle"
        :toggled="infiniteScrollEnabled"
        @toggle="handleInfiniteScrollToggle" />
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
