<template>
  <div class="chat__wrapper" v-if="isLoad">
    <ChatHeader :chat="chat"></ChatHeader>
    <div class="chat__message_list" ref="chat">
      <ChatMessage
        v-for="(message, index) of chat.messages" :key="index"
        :message="message"
        :members="chat.users"
        :currentUser="currentUser"
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
import NotificationService from "@/services/notification.service";
import { Room } from "@/core/models/room.model";
import { RouterPaths } from "@/core/consts/router-paths.enum";
import { User } from "@/core/models/user.model";
import ChatMessage from "@/components/chat/ChatMessage.vue";
import { Message } from "@/core/models/message.model";
import { RoomUser } from "@/core/models/room-user.model";

export default defineComponent({
  name: "Chat",
  components: { ChatMessage, ChatHeader, ChatInputBar },
  data: () => ({
    isLoad: false,
    chat: {} as Room,
    currentUser: {} as User,
    connection: {} as WebSocket,
    takenMessage: "",
  }),
  async mounted() {
    await this.getRoomById(this.chatId);
    this.connectToWebsocket(this.token, this.chatId);
    this.scrollToBottom();
    this.getCurrentUser();
  },
  computed: {
    chatId(): string {
      return this.$route.params.id as string
    },
    token(): string {
      return TokenStorageService.getTokens()?.access as string;
    }
  },
  methods: {
    async getRoomById(chatId: string) {
      this.isLoad = false;
      try {
        await this.$store.dispatch('getRoomById', chatId);
        this.chat = this.$store.getters.openedRoom;
        this.isLoad = true;
      } catch (e) {
        NotificationService.error("Error!", e)
      }
    },
    handleMessage(event: MessageEvent) {
      this.takenMessage = event.data.message
    },
    connectToWebsocket(token: string, chatId: string) {
      console.log("Starting connection to WebSocket Server")
      this.connection = new WebSocket(`${process.env.VUE_APP_ROOT_SOCKET}/chat/${chatId}/?token=${token}`)

      this.connection.onmessage = (event: MessageEvent) => this.handleMessage(event);
      this.connection.onopen = () => console.log("Successfully connected to the echo websocket server...");
    },
    sendMessage(message: string) {
      this.connection.send(JSON.stringify({
        message: message,
        sender: this.currentUser.id
      }));

      this.chat.messages.push({
        text: message,
        sender: this.currentUser.id,
        created_at: new Date(),
        updated_at: new Date(),
      } as Message);
    },
    scrollToBottom() {
      const el = this.$refs.chat as HTMLElement;
      el.scrollTop = el.scrollHeight;
    },
    isGroupedMessages(index: number): boolean {
      if(index < 1) return false;

      return this.chat.messages[index].sender === this.chat.messages[index - 1].sender;
    },
    getCurrentUser() {
      const username = this.$store.getters.user.username;
      const currRoomUser = this.chat?.users?.find(roomUser => roomUser?.user?.username === username) as RoomUser;
      this.currentUser = currRoomUser.user as User;
    }
  },
  watch:{
    async $route(to) {
      this.connection.close();

      if(to.fullPath.includes(`/${RouterPaths.CHAT}`)) {
        await this.getRoomById(this.chatId);
        this.connectToWebsocket(this.token, this.chatId);
        this.scrollToBottom();
      }
    }
  },
});
</script>

<style lang="scss" scoped>
.chat {
  &__wrapper {
    position: relative;
  }

  &__message_list {
    display: block;
    box-sizing: border-box;
    height: 100vh;
    max-height: 100vh;
    overflow-y: scroll !important;
    scroll-behavior: smooth;
    padding: 80px 20px 120px 20px;
  }

  &__message_list::-webkit-scrollbar {
    display: none;
  }
}

</style>