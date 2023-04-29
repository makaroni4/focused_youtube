<script>
import Toggle from "@components/Toggle.vue"
import PopupFooter from "@components/PopupFooter.vue"
import { SETTINGS_COMMENTS_KEY, writeStorageData, readStorageData } from "@js/chrome-storage"

export default {
  components: {
    Toggle,
    PopupFooter
  },
  data() {
    return {
      showCommentsToggle: false,
      commentsSectionEnabled: false
    }
  },
  mounted() {
    readStorageData(SETTINGS_COMMENTS_KEY, (value) => {
      if(typeof(value) === "undefined") {
        this.commentsSectionEnabled = false
      } else {
        this.commentsSectionEnabled = value
      }

      this.showCommentsToggle = true
    })
  },
  methods: {
    handleCommentsToggle(val) {
      writeStorageData(SETTINGS_COMMENTS_KEY, val, () => {
        this.commentsSectionEnabled = val
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
        :toggled="commentsSectionEnabled"
        @toggle="handleCommentsToggle" />
    </div>

    <hr class="focused-youtube-settings__hr">

    <PopupFooter />
  </div>
</template>

<style lang="scss" scoped>
.focused-youtube-settings {
  &__toggles {
    display: flex;
    flex-direction: column;
    margin-bottom: 36px;
  }

  &__hr {
    margin: 16px 0;

    border-top: 1px solid #e5e5e5;
    border-bottom: 0;
  }
}
</style>
