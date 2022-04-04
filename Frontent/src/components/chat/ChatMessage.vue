<template>
  <div class="chat-message" :class="{ 'chat-message--my': isCurrentUser }">
    <div class="chat-message__container" :class="{ 'chat-message--group': isGrouped }">
      <div class="chat-message__avatar">
        <router-link class="chat-message__link" :to="`/profile/${message.sender}`">
          <base-avatar
            type="alias"
            :text="sender"
            width="40px"
            height="40px"
          />
        </router-link>
      </div>

      <template v-if="isCurrentUser">
        <div class="chat-message__content title-regular-14">
          <p class="chat-message__content_sender">
            <span class="chat-message__content_time title-regular-10">{{ createdAt }}</span>
            You
          </p>
          <div class="chat-message__content_message">{{ message.text }}</div>
        </div>
      </template>

      <template v-else>
        <div class="chat-message__content title-regular-14">
          <p class="chat-message__content_sender">
            {{ sender }}
            <span class="chat-message__content_time title-regular-10">{{ createdAt }}</span>
          </p>
          <div class="chat-message__content_message">{{ message.text }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Message } from "@/core/models/message.model";
import { RoomUser } from "@/core/models/room-user.model";
import BaseAvatar from "@/components/base/BaseAvatar.vue";
import moment from "moment/";

export default defineComponent({
  name: "ChatMessage",
  components: { BaseAvatar },
  data: () => ({
    sender: "",
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
    createdAt() {
      return moment(this.message?.updated_at).format('hh:mm, MMM Do YY');
    },
    currentUserId() {
      return this.$store.getters.user?.uid;
    },
    isCurrentUser(): boolean {
      return this.currentUserId === this.message?.sender;
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

  &__link {
    text-decoration: none;
  }

  &__container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 8px 0;
    width: 100%;
  }

  &__avatar {
    margin-right: 16px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    color: var(--main-title-color);
    margin-right: 20%;
    margin-left: 0;

    &_message {
      display: inline-block;
      white-space: pre-line;

      margin-top: 8px;
      padding: 8px 16px;
      background: var(--message-background-color);
      border-radius: 0 16px 16px 16px;

      overflow-wrap: normal;
      word-wrap: normal;
      word-break: normal;
      line-break: auto;
      hyphens: manual;
    }

    &_time {
      color: var(--second-title-color);
    }
  }
}

.chat-message.chat-message--my {
  justify-content: flex-end;

  .chat-message__avatar {
    margin-right: 0;
    margin-left: 16px;
  }

  .chat-message__container {
    flex-direction: row-reverse;
  }

  .chat-message__content {
    margin-right: 0;
    margin-left: 20%;

    &_sender {
      text-align: right;
    }
  }

  .chat-message__content_message {
    background: var(--primary-color);
    border-radius: 16px 0 16px 16px;
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
    border-radius: 16px;
  }
}

@media screen and (max-width: 1000px) {
  .chat-message {
    &__avatar {
      transform: scale(0.75);
      margin-right: 4px;
      margin-left: 0;
    }

    &__content_sender {
      font-size: 12px;
    }

    &__content_time {
      font-size: 10px;
    }
  }
  .chat-message.chat-message--my {
    .chat-message__avatar {
      margin-right: 0;
      margin-left: 4px;
    }
  }
}
</style>