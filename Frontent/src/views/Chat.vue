<template>
  <div class="chat__wrapper" v-if="isLoad">
    <ChatHeader :chat="chat"></ChatHeader>
    <div class="chat__message_list" ref="chatBox">
      <ChatMessage
        v-for="(message, index) of chat.messages" :key="index"
        :message="message"
        :members="chat.users"
        :isGrouped="isGroupedMessages(index)"
      >
      </ChatMessage>
    </div>
    <ChatInputBar @sendMessage="sendMessage($event)"></ChatInputBar>
  </div>
  <div v-else></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TokenStorageService from "@/services/storage/token-storage.service";
import ChatInputBar from "@/components/chat/ChatInputBar.vue";
import ChatHeader from "@/components/chat/ChatHeader.vue";
import ChatMessage from "@/components/chat/ChatMessage.vue";
import NotificationService from "@/services/notification.service";
import { Room } from "@/core/models/room.model";
import { RouterPaths } from "@/core/consts/router-paths.enum";
import { Message } from "@/core/models/message.model";

export default defineComponent({
  name: "Chat",
  components: { ChatMessage, ChatHeader, ChatInputBar },
  data: () => ({
    isLoad: false,
    chat: {} as Room,
    connection: {} as WebSocket
  }),
  computed: {
    currentUserId() {
      return this.$store.getters.user?.uid;
    },
    currentUserName() {
      return this.$store.getters.user?.username;
    },
    chatId() {
      return this.$route.params.id.toString();
    },
    token(): string {
      return TokenStorageService.getTokens()?.access as string;
    }
  },
  watch: {
    async $route(to) {
      this.connection.close();

      if (to.fullPath.includes(`/${RouterPaths.CHAT}`)) {
        await this.getRoomById(this.chatId);
        this.connectToWebsocket(this.token, this.chatId);
      }
    }
  },
  async mounted() {
    await this.getRoomById(this.chatId);
    this.connectToWebsocket(this.token, this.chatId);
  },
  updated() {
    this.scrollToBottom();
  },
  methods: {
    async getRoomById(chatId: string) {
      this.isLoad = false;
      try {
        await this.$store.dispatch("getRoomById", chatId);
        this.chat = this.$store.getters.openedRoom;
        this.isLoad = true;
      } catch (e) {
        NotificationService.error("Error!", e);
      }
    },
    handleMessage(event: MessageEvent) {
      this.chat.messages.push(JSON.parse(event.data) as Message);
    },
    connectToWebsocket(token: string, chatId: string) {
      console.log("Starting connection to WebSocket Server");
      this.connection = new WebSocket(`${process.env.VUE_APP_ROOT_SOCKET}/chat/${chatId}/?token=${token}`);

      this.connection.onmessage = (event) => this.handleMessage(event);
      this.connection.onopen = () => console.log("Successfully connected to the echo websocket server...");
    },
    sendMessage(message: string) {
      this.connection.send(JSON.stringify({ message: message }));
    },
    scrollToBottom() {
      const el = (this.$refs.chatBox as HTMLElement)?.lastElementChild;
      if (el) el?.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    isGroupedMessages(index: number): boolean {
      if (index < 1) return false;

      return this.chat.messages[index].sender === this.chat.messages[index - 1].sender;
    }
  }
});
</script>

<style lang="scss" scoped>
.chat {
  &__wrapper {
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr auto;
    box-sizing: border-box;
    height: 100vh;
  }

  &__message_list {
    display: block;
    box-sizing: border-box;
    padding: 0 20px;
    height: 100%;
    overflow-y: scroll !important;
    scroll-behavior: smooth;
  }

  &__message_list::-webkit-scrollbar {
    display: none;
  }
}
</style>