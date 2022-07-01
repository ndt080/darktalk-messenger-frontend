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
      <ChatSidebar :chat="chat" @close="onVisibleSidebar" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import TokenStorageService from "@/services/storage/token-storage.service";

const ChatSidebar = defineAsyncComponent(() => import("@/components/chat/ChatSidebar.vue"));

import ChatMessageList from "@/components/chat/ChatMessageList.vue";
import ChatInputBar from "@/components/chat/ChatInputBar.vue";
import ChatHeader from "@/components/chat/ChatHeader.vue";

import BaseLoader from "@/components/base/BaseLoader.vue";
import { Room } from "@/core/models/room.model";
import { Message } from "@/core/models/message.model";

import { RouterPaths } from "@/core/consts/router-paths.enum";

const store = useStore();
const route = useRoute();

const isLoad = ref<boolean>(false);
const isShowSidebar = ref<boolean>(false);

const connection = ref<WebSocket>();
const chat = computed<Room>(() => store.getters.openedChat);
const uid = computed<number>(() => store.getters.user.uid);
const id = computed<string>(() => route.params.id.toString() || '');


onMounted(async () => {
  isLoad.value = false;

  closeConnection();
  connection.value = createConnection(id.value);
  await store.dispatch("getChatById", id.value);

  isLoad.value = true;
  handleConnectionMessages(connection.value);
});

onUnmounted(() => closeConnection());

watch(() => route.fullPath, async (to) => {
  if (new RegExp(`^/${RouterPaths.CHAT}/\\d+$`).test(to)) {
    isLoad.value = false;

    closeConnection();
    connection.value = createConnection(id.value);
    await store.dispatch("getChatById", id.value);

    isLoad.value = true;
  }
});

function onVisibleSidebar() {
  isShowSidebar.value = !isShowSidebar.value
}

function createConnection(id: string): WebSocket {
  const token = TokenStorageService.getTokens()?.access;

  const socketBaseUrl = process.env.VUE_APP_ROOT_SOCKET;
  const socketUrl = `${socketBaseUrl}/chat/${id}/?token=${token}`;
  return new WebSocket(socketUrl);
}

function closeConnection() {
  connection.value?.close();
}

function handleConnectionMessages (connection: WebSocket | undefined) {
  if (!connection) return;

  connection.onmessage = (event: MessageEvent) => {
    const message: Message = JSON.parse(event.data);
    store.commit('addMessageToOpenedChat', message);

    if(message.sender === uid.value) {
      store.commit('addMessageToChat', message);
    }
  };
}

function sendMessage(message: string) {
  const messageString = JSON.stringify({ message });
  connection.value?.send(messageString);
}
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
