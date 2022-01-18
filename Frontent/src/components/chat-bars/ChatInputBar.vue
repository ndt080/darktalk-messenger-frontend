<template>
  <div class="chat-input-bar">
    <div class="chat-input-bar__container">
      <div class="chat-input-bar__avatar">
        <img src="@/assets/img/chat.png" alt="avatar" />
      </div>
      <div class="chat-input-bar__send_btn">
        <i class="btn-icon app-icons icon-plane"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ChatInputBar"
});
</script>

<style lang="scss" scoped>
  .chat-input-bar {
    position: absolute;
    display: flex;
    right: 0;
    bottom: 30px;
    left: 0;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    &__container {
      display: flex;
      box-sizing: border-box;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      width: 80%;
      min-height: 60px;
      max-height: 240px;
      background: var(--input-background-color);
      border-radius: 20px;
      padding: 15px;
    }

    &__avatar {
      font-size: 0;
      align-self: flex-start;

      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }

    &__send_btn {
      align-self: flex-start;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;

      .btn-icon {
        font-size: 24px;
        line-height: 0;
        color: var(--main-title-color);
      }
    }

  }
</style>