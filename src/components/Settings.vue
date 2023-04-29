<script>
import Toggle from "./Toggle.vue";
import Footer from "./Footer.vue";
import { writeStorageData, readStorageData } from "../js/chrome-storage";

const SETTINGS_COMMENTS_KEY = "settings:comments";

export default {
  components: {
    Toggle,
    Footer
  },
  data() {
    return {
      showCommentsToggle: false,
      commentsSectionEnabled: false
    }
  },
  methods: {
    handleCommentsToggle(val) {
      writeStorageData(SETTINGS_COMMENTS_KEY, val, () => {
        this.commentsSectionEnabled = val;
      });
    }
  },
  mounted() {
    readStorageData(SETTINGS_COMMENTS_KEY, (value) => {
      if(typeof(value) === "undefined") {
        this.commentsSectionEnabled = false;
      } else {
        this.commentsSectionEnabled = value;
      }

      this.showCommentsToggle = true;
    });
  }
};
</script>

<template>
  <div class="focused-youtube-settings">
    <div class="focused-youtube-settings__toggles">
      <Toggle
        v-if="showCommentsToggle"
        title="Show video comments"
        name="Comments section"
        @toggle="handleCommentsToggle"
        :toggled="commentsSectionEnabled" />
    </div>

    <hr class="focused-youtube-settings__hr">

    <Footer />
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
