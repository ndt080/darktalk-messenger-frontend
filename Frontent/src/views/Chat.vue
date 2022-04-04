<template>
  <div class="chat">
    <div class="chat__wrapper" v-if="isLoad">
      <ChatHeader :chat="chat" @visibleSidebar="onVisibleSidebar"></ChatHeader>

      <ChatMessageList
        :messages="chat.messages"
        :members="chat.users"
      />

      <ChatInputBar @sendMessage="sendMessage($event)" />
    </div>
    <BaseLoader v-else></BaseLoader>
    <template v-if="isShowSidebar">
      <ChatSidebar :chat="chat" @close="onVisibleSidebar"/>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import TokenStorageService from "@/services/storage/token-storage.service";
import ChatInputBar from "@/components/chat/ChatInputBar.vue";
import ChatHeader from "@/components/chat/ChatHeader.vue";
import NotificationService from "@/services/notification.service";
import { Room } from "@/core/models/room.model";
import { RouterPaths } from "@/core/consts/router-paths.enum";
import { Message } from "@/core/models/message.model";
import BaseLoader from "@/components/base/BaseLoader.vue";
import { useStore } from "@/store";
import { useRoute } from "vue-router";
import ChatSidebar from "@/components/chat/ChatSidebar.vue";
import ChatMessageList from "@/components/chat/ChatMessageList.vue";


const store = useStore();
const route = useRoute();

const isLoad = ref<boolean>(false);
const isShowSidebar = ref<boolean>(false);
const chat = ref<Room>({} as Room);
const connection = ref<WebSocket>();

const chatId = computed(():string => route.params.id?.toString());
const token = computed(():string => TokenStorageService.getTokens()?.access || '');

onMounted(async () => {
  await getRoomById(chatId.value);
  connectToWebsocket(token.value, chatId.value);
});

const onVisibleSidebar = () => {
  isShowSidebar.value = !isShowSidebar.value;
}


const getRoomById = async (chatId: string) => {
  isLoad.value = false;
  try {
    await store.dispatch("getRoomById", chatId);
    chat.value = store.getters.openedRoom;
    isLoad.value = true;
  } catch (e) {
    NotificationService.error("Error!", e);
  }
}

const handleMessage = (event: MessageEvent) =>  {
  const message: Message = JSON.parse(event.data);
  chat.value.messages.push(message);
  store.dispatch('addMessageToRoom', { message: message, roomId: Number(chatId.value)})
}

const connectToWebsocket = (token: string, chatId: string) => {
  console.log("Starting connection to WebSocket Server");
  connection.value = new WebSocket(`${process.env.VUE_APP_ROOT_SOCKET}/chat/${chatId}/?token=${token}`);

  connection.value.onmessage = handleMessage;
  connection.value.onopen = () => console.log("Successfully connected to the echo websocket server...");
}

const sendMessage = (message: string) => {
  connection.value?.send(JSON.stringify({ message: message }));
}

watch(route, async (to) => {
  connection.value?.close();

  if (to.fullPath.includes(`/${RouterPaths.CHAT}`) &&
    !to.fullPath.includes(`/${RouterPaths.CHAT}/create`)
  ) {
    await getRoomById(chatId.value);
    connectToWebsocket(token.value, chatId.value);
  }
});
</script>

<style lang="scss" scoped>
.chat {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  box-sizing: border-box;
  height: 100vh;

  &__wrapper {
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr auto;
    box-sizing: border-box;
    height: 100vh;
  }
}
</style>