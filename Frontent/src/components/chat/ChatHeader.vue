<template>
  <div class="chat-header">
    <div class="chat-header__left_block">
      <a href="#" @click.prevent="goHome" class="chat-header__back">
        <i class="fas fa-arrow-left"></i>
      </a>
      <div class="chat-header__menu">
        <a href="#" class="chat-header__menu_btn">
          <i class="app-icons icon-grid"></i>
        </a>
      </div>
      <div class="chat-header__title title-semi-14 unselectable">
        Chat <span class="user-number">{{ props.chat.users.length }}</span>
      </div>
    </div>

    <div class="chat-header__right_block">
      <div class="chat-header__users">
        <template v-for="member of props.chat.users.slice(0, 2)" :key="member.user.uid">
          <base-avatar type="alias" :text="member.user.fullname || member.user.username" />
        </template>
        <template v-if="props.chat.users.length > 2">
          <base-avatar type="text" :text="`+${props.chat.users.length - 2}`" />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { RouterPaths } from "@/core/consts/router-paths.enum";
import { Room } from "@/core/models/room.model";
import BaseAvatar from "@/components/base/BaseAvatar.vue";

interface ChatHeaderProps {
  chat: Room,
}

const router = useRouter();
const props = defineProps<ChatHeaderProps>();

const goHome = () => router.push(`/${RouterPaths.HOME}`);
</script>

<style lang="scss" scoped>
.chat-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  height: 30px;
  background: var(--main-background-color);
  box-shadow: 0 15px 15px 0 var(--main-background-color);
  z-index: 10;

  &__left_block, &__right_block {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  &__right_block {
    margin-right: 30px;
  }

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

  &__users {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__users > div {
    margin-right: 5px;
  }

  &__users > div:last-child {
    margin-right: 0;
  }
}
</style>