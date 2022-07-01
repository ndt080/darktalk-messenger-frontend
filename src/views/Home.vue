<template>
  <div class="home-page mobile">
    <template v-if="platform === 'mobile'">
      <AppSidebar></AppSidebar>
    </template>
  </div>
  <div class="home-page desktop">
  </div>
</template>

<script lang="ts" setup>
import { inject } from "vue";
import AppSidebar from "@/components/AppSidebar.vue";

const platform = inject('platform');
</script>

<style lang="scss" scoped>
.home-page.desktop {
  display: block;
  width: 100%;
}

.home-page.mobile {
  display: none;
  width: 100%;
}

@media screen and (max-width: 650px) {
  .home-page.desktop {
    display: none;
  }

  .home-page.mobile {
    display: block;
  }
}
</style>
