<template>
  <footer class="focused-youtube-footer">
    <a
      class="focused-youtube-footer__link"
      target="_blank"
      :href="storeUrl">
      <strong>Rate it</strong>
    </a>

    <a
      class="focused-youtube-footer__link"
      target="_blank"
      href="https://twitter.com/makaroni4">
      <strong>Say hi</strong>
    </a>

    <a
      class="focused-youtube-footer__link"
      target="_blank"
      href="https://github.com/makaroni4/focused_youtube/issues">
      <strong>Feedback</strong>
    </a>

    <a
      class="focused-youtube-footer__link"
      target="_blank"
      href="https://github.com/makaroni4/focused_youtube">
      <strong>Source code</strong>
    </a>
  </footer>
</template>

<script>
import { storeUrl }from "@helpers/store-urls"

export default {
  data() {
    return { storeUrl }
  }
}
</script>

<style lang="scss" scoped>
.focused-youtube-footer {
  display: flex;
  justify-content: space-between;

  &__link {
    color: #5F6368;
  }
}
</style>
