<script>
import Toggle from "./Toggle.vue";
import { writeStorageData, readStorageData } from "../js/chrome-storage";

const SETTINGS_COMMENTS_KEY = "settings:comments";

export default {
  components: {
    Toggle
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
    <div class="focused-youtube-settings__toggles">
      <Toggle
        v-if="showCommentsToggle"
        title="Show video comments"
        name="Comments section"
        @toggle="handleCommentsToggle"
        :toggled="commentsSectionEnabled" />
    </div>

    <hr class="focused-youtube-settings__hr">

    <footer class="focused-youtube-settings__footer">
      <a
        class="focused-youtube-settings__link"
        target="_blank"
        href="https://chrome.google.com/webstore/detail/focused-youtube/nfghbmabdoakhobmimnjkamfdnpfammn?hl=en">
        <strong>Rate it</strong>
      </a>

      <a
        class="focused-youtube-settings__link"
        target="_blank"
        href="https://twitter.com/makaroni4">
        <strong>Say hi</strong>
      </a>

      <a
        class="focused-youtube-settings__link"
        target="_blank"
        href="https://github.com/makaroni4/focused_youtube/issues">
        <strong>Feedback</strong>
      </a>

      <a
        class="focused-youtube-settings__link"
        target="_blank"
        href="https://github.com/makaroni4/focused_youtube">
        <strong>Source code</strong>
      </a>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.focused-youtube-settings {
  &__toggles {
    display: flex;
    flex-direction: column;
    margin-bottom: 36px;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
  }

  &__link {
    color: #282828;
  }

  &__hr {
    margin: 16px 0;

    border-top: 1px solid #e5e5e5;
    border-bottom: 0;
  }
}
</style>
