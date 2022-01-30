<template>
  <div class="sidebar">
    <div class="sidebar__header">
      <div class="sidebar__avatar" @click.prevent="isOpenMenu = !isOpenMenu">
        <base-avatar
          class="sidebar__avatar_img"
          :class="{'active': isOpenMenu}"
          type="alias"
          variant="rounded-square"
          :text="currentUser.fullname || currentUser.username"
          width="40px"
          height="40px"
        />
      </div>
      <div class="sidebar__select_msg_type">
        <i class="fas fa-comments primary left-icon"></i>
        <span class="title-regular-18">All</span>
        <i class="fas fa-chevron-down right-icon"></i>
      </div>
    </div>
    <ul class="sidebar__menu" :class="{'active': isOpenMenu}">
      <li class="sidebar__menu_item">
        <a href="#" class="sidebar__menu_link">
          <i class="sidebar__menu_icon fas fa-user"></i>
          Profile
        </a>
      </li>
      <li class="sidebar__menu_divider"></li>
      <li class="sidebar__menu_item">
        <a href="#" class="sidebar__menu_link" @click.prevent="login">
          <i class="sidebar__menu_icon fas fa-sign-out-alt"></i>
          Sign out
        </a>
      </li>
    </ul>

    <div class="sidebar__chats_list">
      <ChatsList></ChatsList>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouterPaths } from "@/core/consts/router-paths.enum";
import ChatsList from "@/components/chats-list/ChatsList.vue";
import BaseAvatar from "@/components/base/BaseAvatar.vue";
import { User } from "@/core/models/user.model";

export default defineComponent({
  name: "AppSidebar",
  components: { BaseAvatar, ChatsList },
  data: () => ({
    isOpenMenu: false
  }),
  computed: {
    currentUser(): User {
      return this.$store.getters.user;
    }
  },
  methods: {
    login() {
      this.$store.dispatch("logout").then(() => this.$router.push(`/${RouterPaths.LOGIN}`));
    }
  }
});
</script>

<style lang="scss" scoped>
.sidebar {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  scroll-behavior: smooth;
  padding: 20px 30px;

  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__avatar_img {
    overflow: hidden;
    border-radius: 20px;
    border: 6px solid rgba(gray, 0.2);
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

  &__chats_list {
    margin-top: 20px;
  }
}

.sidebar::-webkit-scrollbar {
  display: none;
}
</style>