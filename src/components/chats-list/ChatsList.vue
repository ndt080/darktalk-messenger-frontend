<template>
  <div class="chats-list custom-scroll">
    <template v-for="item of props.items" :key="item?.id">
      <ChatsListCard
        :card="item"
        :active="!!openedChat && item?.id === openedChat?.id"
      />
    </template>
    <div v-if="!props.items.length" class="chats-list__empty_box"></div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, withDefaults } from "vue";
import { useStore } from "@/store";
import ChatsListCard from "@/components/chats-list/ChatsListCard.vue";
import { Room } from "@/core/models/room.model";

const store = useStore();
const openedChat = computed<Room>(() => store.getters.openedChat);
const props = withDefaults(defineProps<{items: Room[]}>(), {
  items: () => []
});
</script>

<style lang="scss" scoped>
.chats-list {
  display: block;
  min-width: 300px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding-right: 8px;

  &__empty_box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
</style>
