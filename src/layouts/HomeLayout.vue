<template>
  <div class="layout" v-if="isLoad">
    <div class="layout__wrapper desktop">
      <div class="layout__content layout--side">
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

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import AppSidebar from "@/components/AppSidebar.vue";
import BaseLoader from "@/components/base/BaseLoader.vue";
import { useStore } from "@/store";


const isLoad = ref<boolean>(false);
const store = useStore();

onMounted(async () => {
  isLoad.value = false;
  try {
    await store.dispatch('getRooms');
    isLoad.value = true;
  } catch (error) {
    console.log(error)
  }
});
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;

  &__loader {
    width: 100vw;
    height: 100%;
  }

  &__wrapper.mobile {
    display: none;
    grid-template-columns: 1fr;
    width: 100%;
    height: 100%;
  }

  &__wrapper.desktop {
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr;
    width: 100%;
    height: 100%;
  }

  &__content {
    width: 100%;
    height: 100%;
  }

  &__content.layout--side {
    border-right: 1px solid var(--divider-color);
    width: 350px;
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