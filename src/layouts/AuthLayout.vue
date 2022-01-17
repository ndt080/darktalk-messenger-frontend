<template>
  <div class="layout">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
  .layout {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 100vw;
    height: 100vh;
  }
</style>