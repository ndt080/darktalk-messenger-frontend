<template>
  <div class="chat-input-bar">
    <div class="chat-input-bar__container">
      <div class="chat-input-bar__avatar">
        <base-avatar
          type="alias"
          :text="currentUser.fullname || currentUser.username"
        />
      </div>
      <div class="chat-input-bar__input">
        <base-multiline-input
          placeholder="Your message"
          v-model:value="inputValue"
          @submit="sendMessage"
        >
        </base-multiline-input>
      </div>
      <button class="chat-input-bar__send_btn" :disabled="!inputValue" @click.prevent="sendMessage">
        <i class="btn-icon app-icons icon-plane"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseAvatar from "@/components/base/BaseAvatar.vue";
import BaseMultilineInput from "@/components/base/inputs/BaseMultilineInput.vue";
import { User } from "@/core/models/user.model";

export default defineComponent({
  name: "ChatInputBar",
  components: { BaseMultilineInput, BaseAvatar,  },
  data: () => ({
    inputValue: "",
    isSubmit: false,
  }),
  computed: {
    currentUser(): User {
      return this.$store.getters.user;
    }
  },
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