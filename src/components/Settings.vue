<script>
import VueToggle from "vue-toggle-component";
import { writeStorageData, readStorageData } from "../js/chrome-storage";

const SETTINGS_COMMENTS_KEY = "settings:comments";

export default {
  components: {
    VueToggle
  },
  data() {
    return {
      showCommentsToggle: false,
      commentsSectionEnabled: false
    }
  },
  methods: {
    handleCommentsToggle(val) {
      console.log(`--> val: `, val);

      writeStorageData(SETTINGS_COMMENTS_KEY, val, () => {
        this.commentsSectionEnabled = val;
      });
    }
  },
  mounted() {
    readStorageData(SETTINGS_COMMENTS_KEY, (value) => {
      console.log("READ: ", value, typeof(value))

      this.commentsSectionEnabled = value;
      this.showCommentsToggle = true;
    });
  }
};
</script>

<template>
  <div class="focused-youtube-settings">
    <h1>Settings</h1>

    <div>
      {{ commentsSectionEnabled }}

      <VueToggle
        v-if="showCommentsToggle"
        title="Comments section"
        name="Comments section"
        @toggle="handleCommentsToggle"
        :toggled="commentsSectionEnabled" />
    </div>

    <div class="focused-youtube-settings__menu">
      <a
        class="font-small"
        target="_blank"
        href="https://chrome.google.com/webstore/detail/focused-youtube/nfghbmabdoakhobmimnjkamfdnpfammn?hl=en">
        <strong>Rate it</strong>
      </a>

      <a
        class="font-small"
        target="_blank"
        href="https://twitter.com/makaroni4">
        <strong>Say hi</strong>
      </a>

      <a
        class="font-small"
        target="_blank"
        href="https://github.com/makaroni4/focused_youtube/issues">
        <strong>Feedback</strong>
      </a>

      <a
        class="font-small"
        target="_blank"
        href="https://github.com/makaroni4/focused_youtube">
        <strong>Source code</strong>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.focused-youtube-settings {
  &__menu {
    display: flex;
    flex-direction: column;
  }
}
</style>
