<template>
  <div class="chat-input-bar">
    <div class="chat-input-bar__container">
      <div class="chat-input-bar__avatar">
        <Avatar assetImage="chat" width="30"></Avatar>
      </div>
      <div class="chat-input-bar__input">
        <multiline-text-field placeholder="Your message" v-model:value="inputValue"></multiline-text-field>
      </div>
      <button class="chat-input-bar__send_btn" :disabled="!inputValue" @click.prevent="sendMessage">
        <i class="btn-icon app-icons icon-plane"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MultilineTextField from "@/components/custom-text-fields/multiline-text-field.vue";
import Avatar from "@/components/img-boxes/Avatar.vue";

export default defineComponent({
  name: "ChatInputBar",
  components: { Avatar, MultilineTextField },
  data: () => ({
    inputValue: ""
  }),
  emits: ['sendMessage'],
  methods: {
    sendMessage() {
      this.$emit('sendMessage', this.inputValue);
      this.inputValue = "";
    }
  }
});
</script>

<style lang="scss" scoped>
  .chat-input-bar {
    position: absolute;
    display: flex;
    right: 30px;
    bottom: 20px;
    left: 30px;
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
      width: 100%;
      min-height: 60px;
      max-height: 240px;
      background: var(--input-background-color);
      border-radius: 20px;
      padding: 15px;
    }

    &__avatar {
      //font-size: 0;
      align-self: flex-start;
      //
      //img {
      //  width: 30px;
      //  height: 30px;
      //  border-radius: 50%;
      //}
    }

    &__input {
      box-sizing: border-box;
      padding: 0 30px 0 15px;
      height: 100%;
      width: 100%;

      .common-input {
        width: 100%;
      }
    }

    &__send_btn {
      display: flex;
      justify-content: center;
      align-items: center;
      align-self: flex-start;
      width: 30px;
      height: 30px;
      background: transparent;
      outline: none;
      border: none;
      cursor: pointer;

      .btn-icon {
        font-size: 24px;
        line-height: 0;
        color: var(--main-title-color);
      }
    }

    &__send_btn:hover {
      .btn-icon {
        color: var(--second-title-color);
      }
    }

    &__send_btn:disabled {
      cursor: default;

      .btn-icon {
        color: var(--second-title-color);
      }
    }

  }
</style>