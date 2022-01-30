<template>
  <div class="layout" v-if="isLoad">
    <div class="layout__wrapper desktop">
      <div class="layout__side_container">
        <AppSidebar></AppSidebar>
      </div>
      <div class="layout__content">
        <router-view />
      </div>
    </div>

    <div class="layout__wrapper mobile">
      <div class="layout__content">
        <router-view />
      </div>
    </div>
  </div>
  <div class="layout__loader" v-else>
    <base-loader></base-loader>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppSidebar from "@/components/AppSidebar.vue";
import BaseLoader from "@/components/base/BaseLoader.vue";

export default defineComponent({
  components: { BaseLoader, AppSidebar },
  data: () => ({
    isLoad: false
  }),
  async mounted() {
    this.isLoad = false;
    try {
      await this.$store.dispatch('getRooms');
      this.isLoad = true;
    } catch (error) {
      console.log(error)
    }
  }
});
</script>

<style lang="scss" scoped>
.layout {
  &__loader {
    width: 100vw;
    height: 100vh;
  }

  &__wrapper.mobile {
    display: none;
    grid-template-columns: 1fr;
    width: 100vw;
    height: 100vh;
  }

  &__wrapper.desktop {
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr;
    width: 100vw;
    height: 100vh;
  }

  &__side_container {
    display: block;
    width: 350px;
    height: 100%;
    border-right: 1px solid var(--divider-color);
  }

  &__content {
    width: 100%;
  }
}

@media screen and (max-width: 900px) {
  .layout {
    &__side_container {
      width: 300px;
    }
  }
}

@media screen and (max-width: 650px) {
  .layout {
    &__wrapper.desktop {
      display: none;
    }

    &__wrapper.mobile {
      display: grid;
    }
  }
}
</style>