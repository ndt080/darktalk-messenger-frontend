<template>
  <header class="app-header">
    <div class="app-header__header">
      <div class="app-header__avatar" @click.prevent="isOpenMenu = !isOpenMenu">
        <base-avatar
          class="app-header__avatar_img"
          :class="{'active': isOpenMenu}"
          type="alias"
          variant="rounded-square"
          :text="currentUser.fullname || currentUser.username"
          width="40px"
          height="40px"
        />
      </div>
      <div class="app-header__select_msg_type">
        <i class="fas fa-comments primary left-icon"></i>
        <span class="title-regular-18">All</span>
        <i class="fas fa-chevron-down right-icon"></i>
      </div>
    </div>
    <ul class="app-header__menu" :class="{'active': isOpenMenu}">
      <li class="app-header__menu_item">
        <router-link :to="`/profile/${currentUser.uid}`" class="app-header__menu_link">
          <i class="app-header__menu_icon fas fa-user"></i>
          Profile
        </router-link>
      </li>
      <li class="app-header__menu_divider"></li>
      <li class="app-header__menu_item">
        <a href="#" class="app-header__menu_link" @click.prevent="login">
          <i class="app-header__menu_icon fas fa-sign-out-alt"></i>
          Sign out
        </a>
      </li>
    </ul>
  </header>
</template>

<script lang="ts" setup>
import BaseAvatar from "@/components/base/BaseAvatar.vue";
import { computed, ref } from "vue";
import { useStore } from "@/store";
import { User } from "@/core/models/user.model";
import { RouterPaths } from "@/core/consts/router-paths.enum";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const isOpenMenu = ref<boolean>(false);

const currentUser = computed((): User => store.getters.user);

function login() {
  store.dispatch("logout").then(() => router.push(`/${RouterPaths.LOGIN}`));
}
</script>

<style lang="scss" scoped>
.app-header {
  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__avatar_img {
    overflow: hidden;
    border-radius: 20px;
    border: 6px solid rgba(128, 128, 128, 0.2);
    width: 40px;
    height: 40px;
  }

  &__avatar_img.active {
    border-color: rgba($primary-color, 0.5);
  }

  &__avatar {
    position: relative;
    cursor: pointer;
  }

  &__avatar:before {
    content: '';
    position: absolute;
    top: 35%;
    left: 0;
    z-index: 2;
    height: 12px;
    width: 0;
    border-right: 3px solid var(--primary-color);
  }

  &__select_msg_type {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100px;
    color: var(--main-title-color);

    .left-icon {
      font-size: 24px;
    }

    .right-icon {
      font-size: 14px;
      color: gray;
    }
  }

  &__menu {
    list-style: none;
    visibility: hidden;
    opacity: 0;
    height: 0;
    color: var(--main-title-color);
    transition: 0.3s all;

    &_icon {
      padding-right: 10px;
    }

    &_divider {
      margin: 15px 0;
      border-bottom: 2px solid var(--divider-color);
    }

    &_link {
      color: var(--second-title-color);
      text-decoration: none;
    }

    &_link:hover {
      transition: 0.2s all;
      color: var(--main-title-color);
    }
  }

  &__menu.active {
    visibility: visible;
    opacity: 1;
    border-radius: 15px;
    margin-top: 10px;
    padding: 20px;
    background-color: var(--popup-background-color);
    height: auto;
    transition: 0.5s all;
  }
}
</style>