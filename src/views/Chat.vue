<template>
  <div class="chat__wrapper" v-if="isLoad">
    <ChatHeader :chat="chat"></ChatHeader>
    <div class="chat__message_list">

    </div>
    <ChatInputBar></ChatInputBar>
  </div>
  <div v-else></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TokenStorageService from "@/services/storage/token-storage.service";
import ChatInputBar from "@/components/chat-bars/ChatInputBar.vue";
import ChatHeader from "@/components/chat-bars/ChatHeader.vue";
import NotificationService from "@/services/notification.service";
import { Room } from "@/core/models/room.model";
import { RouterPaths } from "@/core/consts/router-paths.enum";

export default defineComponent({
  name: "Chat",
  components: { ChatHeader, ChatInputBar },
  data: () => ({
    isLoad: false,
    chat: {} as Room,
    connection: {} as WebSocket,
    takenMessage: ""
  }),
  async mounted() {
    await this.getRoomById(this.chatId);
    this.connectToWebsocket(this.token, this.chatId);
  },
  computed: {
    chatId(): string {
      return this.$route.params.id as string
    },
    token(): string {
      return  TokenStorageService.getTokens()?.access as string;
    }
  },
  methods: {
    async getRoomById(chatId: string) {
      this.isLoad = false;
      try {
        await this.$store.dispatch('getRoomById', chatId);
        this.chat = this.$store.getters.openedRoom;
        this.isLoad = true;
        console.log(this.chat)
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
    }
  },
  watch:{
    async $route(to, from) {
      this.connection.close();

      if(to.fullPath != `/${RouterPaths.HOME}`) {
        await this.getRoomById(this.chatId);
        this.connectToWebsocket(this.token, this.chatId);
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
    overflow-y: scroll;
  }

  &__message_list::-webkit-scrollbar {
    display: none;
  }
}

</style>