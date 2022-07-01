<template>
  <div class="chat__message_list custom-scroll" ref="chatBox" v-if="!!messages.length">
    <template v-for="(message, index) of messages" :key="index">
      <ChatMessage
        :message="message"
        :members="members"
        :isGrouped="isGroupedMessages(index)"
      />
    </template>
  </div>

  <div class="chat__message_list chat--empty custom-scroll" v-else>
    <i class="fas fa-inbox"></i>
    <span class="title-semi-26">There is no message</span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, onUpdated, ref } from "vue";
import ChatMessage from "@/components/chat/ChatMessage.vue";
import { Message } from "@/core/models/message.model";
import { RoomUser } from "@/core/models/room-user.model";


const chatBox = ref();
const props = defineProps<{ messages: Message[], members: RoomUser[] }>();

onMounted(() => scrollToBottom());
onUpdated(() => scrollToBottom());

const scrollToBottom = () => {
  const el = (chatBox.value as HTMLElement)?.lastElementChild;
  if (el) el?.scrollIntoView({ behavior: "smooth", block: "center" });
}

const isGroupedMessages = (index: number): boolean => {
  if (index < 1) return false;
  return props.messages[index].sender === props.messages[index - 1].sender;
}
</script>

<style lang="scss" scoped>

.chat {
  &__message_list {
    display: block;
    box-sizing: border-box;
    padding: 8px;
    height: 100%;
    overflow-y: scroll !important;
    scroll-behavior: smooth;
  }

  &__message_list.chat--empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 64px;
    color: var(--second-background-color);
  }
}

@media screen and (max-width: 1000px) {
  .chat {
    &__message_list {
      padding: 4px;
    }
  }
}
</style>
