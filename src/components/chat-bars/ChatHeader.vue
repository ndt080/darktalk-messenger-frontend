<template>
  <div class="chat-header">
    <a href="#" @click.prevent="goHome" class="chat-header__back">
      <i class="fas fa-arrow-left"></i>
    </a>
    <div class="chat-header__menu">
      <a href="#" class="chat-header__menu_btn">
        <i class="app-icons icon-grid"></i>
      </a>
    </div>
    <div class="chat-header__title title-semi-14">
      Chat <span class="user-number ">{{ chat.users.length }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RouterPaths } from "@/core/consts/router-paths.enum";
import { Room } from "@/core/models/room.model";

export default defineComponent({
  name: "ChatHeader",
  props: {
    chat: Object as PropType<Room>
  },
  methods: {
    goHome() {
      this.$router.push(`/${RouterPaths.HOME}`);
    }
  }
});
</script>

<style lang="scss" scoped>
.chat-header {
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: flex-start;
  padding: 20px;
  align-items: center;
  height: 30px;
  box-shadow: 0 30px 10px -10px var(--main-background-color);

  &__back {
    font-size: 20px;
    text-decoration: none;
    color: var(--main-title-color);
    transition: 0.5s all;
    margin-right: 10px;
  }

  &__back:hover {
    text-decoration: none;
    color: var(--second-title-color);
    transition: 0.5s all;
  }

  &__title {
    line-height: 1 !important;
    color: var(--main-title-color);

    .user-number {
      margin-left: 8px;
      color: var(--second-title-color);
    }
  }

  &__menu {
    &_btn {
      padding: 0 20px;
      text-decoration: none;
      font-size: 20px;
      line-height: 0;
      color: var(--main-title-color);;
    }
  }
}
</style>