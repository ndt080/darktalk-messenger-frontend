<template>
  <router-link :to="getChatLink" class="chat-card__wrapper">
    <div class="chat-card" :class="{'active': !!active}">
      <div class="chat-card__img">
        <base-avatar
          class="chat-card__img"
          type="alias"
          :text="card.title"
          width="50px"
          height="50px"
        />
      </div>
      <div class="chat-card__content">
        <p class="chat-card__content_title">{{ card.title }}</p>
        <p class="chat-card__content_description title-regular-10">
          <span class="username">{{ lastMessageSender ? `${lastMessageSender}:` : '' }}</span>
          {{ lastMessage?.text }}
        </p>
      </div>
      <div class="chat-card__tag">
        <div v-if="getTag" class="tag-timestamp title-regular-12">{{ getTag }}</div>
        <div v-else class="tag-indicator"></div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Room } from "@/core/models/room.model";
import { Message } from "@/core/models/message.model";
import moment from "moment/";
import { RouterPaths } from "@/core/consts/router-paths.enum";
import { RoomUser } from "@/core/models/room-user.model";
import BaseAvatar from "@/components/base/BaseAvatar.vue";


export default defineComponent({
  name: "ChatsListCard",
  components: { BaseAvatar },
  data: () => ({
    lastMessageSender: ""
  }),
  props: {
    card: Object as PropType<Room>,
    active: {
      type: Boolean as PropType<boolean>,
      required: false,
    }
  },
  computed: {
    lastMessage() {
      return this.card?.messages[this.card?.messages?.length - 1] as Message;
    },
    getTag() {
      const lassMessageTime = this.lastMessage?.created_at as Date;
      return lassMessageTime ? moment(lassMessageTime).format("h:mm") : '';
    },
    getChatLink(): string {
      return `/${RouterPaths.CHAT}/${this.card?.id}`;
    }
  },
  mounted() {
    this.lastMessageSender = this.getSender(this.card);
  },
  watch: {
    lastMessage() {
      this.lastMessageSender = this.getSender(this.card);
    }
  },
  methods: {
    getSender(card: Room | undefined): string {
      if (!card) return '';

      const members = card?.users as RoomUser[];
      const msgSender = members.find(roomUser => roomUser.user.uid == this.lastMessage?.sender);
      return msgSender?.user?.username as string;
    }
  }
});
</script>

<style lang="scss" scoped>
.chat-card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-radius: 15px;
  width: 100%;
  padding: 10px;
  transition: 0.7s all;

  &__wrapper {
    text-decoration: none;
  }

  &__content {
    display: block;
    box-sizing: border-box;
    margin: 0 20px;
    width: 100%;
    align-self: flex-start;

    &_title {
      color: var(--main-title-color);
    }

    &_description {
      max-height: 24px;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--main-title-color);

      .username {
        color: var(--second-title-color);
      }
    }
  }

  &__tag {
    .tag-timestamp {
      color: var(--main-title-color);
    }

    .tag-indicator {
      display: block;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: var(--divider-color);
    }
  }
}

.chat-card:hover {
  background-color: var(--card-background-color);
  transition: 0.5s all;
}

.chat-card.active {
  background-color: var(--message-background-color);
  transition: 0.5s all;
}
</style>
