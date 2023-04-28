<script setup>
import Settings from './components/Settings.vue'
</script>

<template>
  <div class="focused-youtube-settings">
    <div>
      <img src="./assets/icon.svg" class="logo vue" alt="Vue logo" />
      <strong>Focused Youtube</strong>
    </div>

    <div>
      <Settings />
    </div>
  </div>

</template>

<style scoped>
.focused-youtube-settings {
  width: 500px;
  height: 300px;
}
</style>
