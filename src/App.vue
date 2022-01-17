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
      return (this.$route.meta.layout || "home") + "-layout";
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
</style>
