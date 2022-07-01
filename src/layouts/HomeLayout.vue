<template>
  <div class="layout" v-if="isLoad">
    <div class="layout__wrapper" :class="{
      'desktop': isDesktop,
      'mobile': isMobile
    }">
      <template v-if="isDesktop">
        <div class="layout__content layout--side">
          <AppSideBar></AppSideBar>
        </div>
      </template>
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
import { computed, defineAsyncComponent, onMounted, onUnmounted, provide, ref } from "vue";
import { useStore } from "@/store";
import BaseLoader from "@/components/base/BaseLoader.vue";


const store = useStore();

const isLoad = ref<boolean>(false);
const connection = ref<WebSocket>();
const platform = ref<"desktop" | "mobile">(getPlatform(window.innerWidth));

const isDesktop = computed<boolean>(() => (platform.value === "desktop"));
const isMobile = computed<boolean>(() => (platform.value === "mobile"));

const AppSideBar = defineAsyncComponent(() => {
  return import("@/components/AppSidebar.vue");
});

provide('platform', platform);

onMounted(async () => {
  isLoad.value = false;
  try {
    await store.dispatch("getChats");
    await store.dispatch("connectAppSocket").then((instance: WebSocket) => {
      connection.value = instance;
    });
    isLoad.value = true;
  } catch (error) {
    console.log(error);
  }

  if (connection.value) {
    connection.value.onmessage = (event: MessageEvent) => {
      store.dispatch("handleAppSocketMessage", event);
    };
  }

  window.onresize = (event: UIEvent) => {
    platform.value = getPlatform((event.target as any).innerWidth);
  };
});

onUnmounted(() => {
  store.dispatch("disconnectAppSocket");
});

function getPlatform(width: number) {
  return width >= 650 ? "desktop" : "mobile";
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;

  &__loader {
    width: 100vw;
    height: 100%;
  }

  &__wrapper {
    &.mobile {
      display: none;
      grid-template-columns: 1fr;
      width: 100%;
      height: 100%;

      .layout--side {
        display: none;
      }
    }
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
