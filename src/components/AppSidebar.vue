<template>
  <div class="app-sidebar">
    <div class="app-sidebar__header-wrapper">
      <app-header></app-header>

      <div class="app-sidebar__user-chats-header">
        <div class="app-sidebar__title title-semi-26">Messages</div>
        <div class="app-sidebar__toolbar">
          <router-link :to="createChatUrl" class="app-sidebar__toolbar_item">
            <i class="app-sidebar__toolbar_icon fas fa-edit"></i>
          </router-link>
        </div>
      </div>

      <div class="app-sidebar__search">
        <BaseAutocomplete
          placeholder="Search..."
          class="common-input title-regular-14"
          :query-function="queryFunction"
        />
      </div>
    </div>
    <ChatsList :items="chatListItems"></ChatsList>
    <div class="app-sidebar__panel"></div>
  </div>
</template>

<script lang="ts" setup>
import ChatsList from "@/components/chats-list/ChatsList.vue";
import AppHeader from "@/components/AppHeader.vue";
import { RouterPaths } from "@/core/consts/router-paths.enum";
import { computed, ref, watch } from "vue";
import { useStore } from "@/store";
import BaseAutocomplete from "@/components/base/inputs/BaseAutocomplete.vue";
import { Room } from "@/core/models/room.model";

const store = useStore();

const chats = computed(() => store.getters.rooms);
const createChatUrl = computed((): string => `/${RouterPaths.CREATE_CHAT}`);
const chatListItems = ref<Room[]>(chats.value);


watch(chats, (value: Room[]) => {
  chatListItems.value = value;
});

const queryFunction = (query: string): Room[] => {
  if(query.length < 2) {
    chatListItems.value = chats.value;
    return [];
  }

  chatListItems.value = chats.value.filter((chat: Room) => {
    return chat.title.toLowerCase().includes(query.toLowerCase());
  });
  return [];
}
</script>

<style lang="scss" scoped>
.app-sidebar {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
  max-height: 100vh;
  padding: 16px;
  box-sizing: border-box;

  &__user-chats-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    margin-top: 32px;
  }

  &__title {
    color: var(--second-title-color);
  }

  &__toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;

    &_icon {
      font-size: 20px;
      color: var(--second-title-color);
      transition: 0.2s all;
      cursor: pointer;
    }

    &_icon:hover {
      color: var(--success-color);
      transition: 0.2s all;
    }
  }

  &__search {
    margin: 20px 0;
    box-sizing: border-box;

    input {
      width: 100%;
    }
  }
}
</style>