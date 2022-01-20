<template>
  <div class="chat-message" :class="styleClass">
    <div class="chat-message__container" :class="{'chat-message--group': isGrouped}">
      <div class="chat-message__avatar">
        <Avatar assetImage="avatar" width="40" height="40" />
      </div>
      <div class="chat-message__content">
        <p class="chat-message__content_sender title-regular-14">{{ sender }}</p>
        <div class="chat-message__content_message title-regular-14">
          {{ message.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Message } from "@/core/models/message.model";
import { RoomUser } from "@/core/models/room-user.model";
import Avatar from "@/components/img-boxes/Avatar.vue";

export default defineComponent({
  name: "ChatMessage",
  components: { Avatar },
  data: () => ({
    sender: ""
  }),
  props: {
    message: Object as PropType<Message>,
    members: Object as PropType<RoomUser[]>,
    isGrouped: {
      type: Boolean,
      default: false
    }
  },
  created() {
    const member = this.members?.find(roomUser => roomUser.user.uid == this.message?.sender) as RoomUser;
    const senderFullName = member?.user?.fullname as string;
    const senderUserName = member?.user?.username as string;
    this.sender = senderFullName ? senderFullName : senderUserName;
  },
  computed: {
    currentUserId() {
      return this.$store.getters.user?.uid;
    },
    currentUserName() {
      return this.$store.getters.user?.username;
    },
    styleClass(): string {
      return this.currentUserId === this.message?.sender ? "chat-message--my_message" : "";
    }
  }
});
</script>

<style lang="scss" scoped>
.chat-message {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  &__container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 10px 0;
  }

  &__avatar {
    margin-right: 20px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    color: var(--main-title-color);

    &_message {
      display: inline-block;
      white-space: pre-line;

      margin-top: 10px;
      padding: 10px 10px;
      background: var(--message-background-color);
      border-radius: 0 15px 15px 15px;

      overflow-wrap: normal;
      word-wrap: normal;
      word-break: normal;
      line-break: auto;
      hyphens: manual;
    }
  }
}

.chat-message.chat-message--my_message {
  justify-content: flex-end;

  .chat-message__avatar {
    margin-right: 0;
    margin-left: 20px;
  }

  .chat-message__container {
    flex-direction: row-reverse;
  }

  .chat-message__content_message {
    background: var(--primary-color);
    border-radius: 15px 0 15px 15px;
  }
}

.chat-message__container.chat-message--group {
  margin-top: -5px;

  .chat-message__avatar {
    visibility: hidden;
  }

  .chat-message__content_sender {
    display: none;
  }

  .chat-message__content_message {
    margin: 0;
    border-radius: 15px;
  }
}

@media screen and (max-width: 650px) {
  .chat-message {
    &__avatar {
      margin-left: 0;
      margin-right: 10px;
    }
  }

  .chat-message.chat-message--my_message {
    .chat-message__avatar {
      margin-right: 0;
      margin-left: 10px;
    }
  }
}
</style>