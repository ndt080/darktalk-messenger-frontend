<template>
  <div class="chat__wrapper">
    <TopChatBar></TopChatBar>
    <div class="chat__message_list">

    </div>
    <BottomChatBar></BottomChatBar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TokenStorageService from "@/services/storage/token-storage.service";
import BottomChatBar from "@/components/chat-bars/BottomChatBar.vue";
import TopChatBar from "@/components/chat-bars/TopChatBar.vue";

export default defineComponent({
  name: "Chat",
  components: { TopChatBar, BottomChatBar },
  data: () => ({
    chatId: "",
    connection: {} as WebSocket,
    takenMessage: ""
  }),
  mounted() {
    this.chatId = this.$route.params.id as string;

    this.connectToWebsocket(TokenStorageService.getTokens()?.access as string, this.chatId);
  },
  computed: {
    getId() {
      console.log(this.$route.params.id)
      return this.$route.params.id
    }
  },
  methods: {
    handleMessage(event: MessageEvent) {
      this.takenMessage = event.data.message
    },
    connectToWebsocket(token: string, chatId: string) {
      console.log("Starting connection to WebSocket Server")
      this.connection = new WebSocket(`${process.env.VUE_APP_ROOT_SOCKET}/chat/${chatId}/?token=${token}`)

      this.connection.onmessage = (event: MessageEvent) => this.handleMessage(event);
      this.connection.onopen = () => console.log("Successfully connected to the echo websocket server...");
    }
  }
});
</script>

<style lang="scss" scoped>
.chat {
  &__wrapper {
    position: relative;
    display: block;
    width: 100%;
    //grid-template-rows: auto 1fr auto;
  }
}

</style>