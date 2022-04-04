<template>
  <div class="home-page mobile">
    <AppSidebar></AppSidebar>
  </div>
  <div class="home-page desktop">
  </div>
</template>

<script lang="ts">
import AppSidebar from "@/components/AppSidebar.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: { AppSidebar },
});
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