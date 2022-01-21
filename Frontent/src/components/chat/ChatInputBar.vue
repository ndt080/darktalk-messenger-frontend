<template>
  <div class="chat-input-bar">
    <div class="chat-input-bar__container">
      <div class="chat-input-bar__avatar">
        <Avatar assetImage="chat" width="30"></Avatar>
      </div>
      <div class="chat-input-bar__input">
        <multiline-textfield placeholder="Your message" v-model:value="inputValue" @submit="sendMessage"></multiline-textfield>
      </div>
      <button class="chat-input-bar__send_btn" :disabled="!inputValue" @click.prevent="sendMessage">
        <i class="btn-icon app-icons icon-plane"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Avatar from "@/components/img-boxes/Avatar.vue";
import MultilineTextfield from "@/components/custom-text-fields/multiline-textfield.vue";

export default defineComponent({
  name: "ChatInputBar",
  components: { MultilineTextfield, Avatar,  },
  data: () => ({
    inputValue: "",
    isSubmit: false,
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
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    &__container {
      display: flex;
      box-sizing: border-box;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 0 20px 20px 30px;
      width: 100%;
      max-height: 240px;
      background: var(--input-background-color);
      border-radius: 20px;
      padding: 15px;
    }

    &__avatar {
      align-self: flex-start;
    }

    &__input {
      box-sizing: border-box;
      padding: 0 30px 0 15px;
      width: 100%;
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