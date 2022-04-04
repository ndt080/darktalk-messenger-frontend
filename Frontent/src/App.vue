<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeLayout from "@/layouts/HomeLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";

export default defineComponent({
  name: "App",
  computed: {
    layout() {
      return (this.$route.meta.layout || "main") + "-layout";
    }
  },
  components: { HomeLayout, AuthLayout }
});
</script>

<style lang="scss">
  *, html {
    padding: 0;
    margin: 0;
  }

  html {
    background-color: var(--main-background-color);
  }

  #app {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
