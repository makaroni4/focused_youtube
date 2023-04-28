<script setup>
import { ref } from 'vue'

defineProps({
})
</script>

<template>
  <div class="focused-youtube-settings">
    <h1>Settings</h1>

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
