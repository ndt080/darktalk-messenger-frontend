<template>
  <div class="chats-list">
    <div id="chats-list__header" class="chats-list__header">
      <div class="chats-list__title title-semi-26">Messages</div>
      <div class="chats-list__toolbar">
        <i class="chats-list__toolbar_icon fas fa-edit"></i>
      </div>
    </div>

    <div id="chats-list__search" class="chats-list__search">
      <input
        type="search"
        placeholder="Search"
        class="common-input title-regular-14"
      />
    </div>
    <div class="chats-list__list">
      <div v-for="card of cards" :key="card.id">
        <ChatsListCard :card="card"></ChatsListCard>
      </div>
      <div v-if="!cards.length" class="chats-list__empty_box">

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ChatsListCard from "@/components/chats-list/ChatsListCard.vue";
import { Room } from "@/core/models/room.model";

export default defineComponent({
  name: "ChatsList",
  components: { ChatsListCard },
  data: () => ({
    cards: [] as Room[],
  }),
  mounted() {
    this.cards = this.$store.getters.rooms;
  }
});
</script>

<style lang="scss" scoped>
.chats-list {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    color: var(--second-title-color);
  }

  &__toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;

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

    input {
      width: 100%;
    }
  }
  &__empty_box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
</style>