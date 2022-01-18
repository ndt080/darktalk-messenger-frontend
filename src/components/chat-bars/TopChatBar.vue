<template>
  <div class="top-chat-bar">

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TopChatBar"
});
</script>

<style lang="scss" scoped>
  .top-chat-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    background-color: yellow;
    height: 30px;
  }
</style>