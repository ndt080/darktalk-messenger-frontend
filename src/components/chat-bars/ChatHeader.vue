<template>
  <div class="chat-header">
    <a href="#" @click.prevent="$router.back()" class="chat-header__back">
      <i class="fas fa-arrow-left"></i>
    </a>
    <div class="chat-header__menu">
      <a href="#" class="chat-header__menu_btn">
        <i class="app-icons icon-grid"></i>
      </a>
    </div>
    <div class="chat-header__title title-semi-18">
      Chat <span class="user-number">{{}}</span>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ChatHeader"
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
     color: var(--main-title-color);
    }

    &__menu {
      &_btn {
        padding: 0 10px;
        text-decoration: none;
        font-size: 24px;
        color: var(--main-title-color);;
      }
    }
  }
</style>