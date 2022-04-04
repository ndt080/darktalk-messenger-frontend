<template>
  <div class="chat-sidebar">
    <div class="chat-sidebar__header">
      <div class="chat-sidebar__title title-regular-18">
        <i class="fas fa-info-circle" style="margin-right: 8px"></i>
        Chat details
      </div>
      <div class="chat-sidebar__close-button" @click.prevent="onCloseSidebar">
        <i class="fas fa-times"></i>
      </div>
    </div>

    <div class="chat-sidebar__body">
      <ChatSidebarMembers :members="chat.users" :isOwnerUser="isOwnerUser"/>
      <ChatSidebarInvite />

    </div>
    <div class="chat-sidebar__footer">
      <div
        class="chat-sidebar__leave-chat-button"
        @click.prevent="onLeaveChat"
      >
        <i class="fas fa-sign-out-alt"></i>
        {{ isOwnerUser ? "Remove chat" : "Leave the chat" }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, onMounted, ref } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import { Room } from "@/core/models/room.model";
import { RoomRole } from "@/core/consts/room-role.enum";
import ChatSidebarMembers from "@/components/chat/ChatSidebarMembers.vue";
import ChatSidebarInvite from "@/components/chat/ChatSidebarInvite.vue";

const store = useStore();
const router = useRouter();
const props = defineProps<{ chat: Room }>();
const isOwnerUser = ref<boolean>(false);
const emits = defineEmits(["close"]);

onMounted(() => {
  const currUID = store.getters.user?.uid;
  isOwnerUser.value = !!props.chat.users.find(chatUser => {
    return chatUser.role == RoomRole.OWNER &&
      chatUser.user?.uid == currUID;
  });
});


const onCloseSidebar = (event: Event) => emits("close", event);
const onLeaveChat = () => {
  if(isOwnerUser.value) {
    store.dispatch("removeRoom", props.chat.id);
  } else {
    store.dispatch("leaveRoom", props.chat.id);
  }

  router.push('/');
};

</script>

<style lang="scss" scoped>
.chat-sidebar {
  background-color: var(--main-background-color);
  border-left: 1px solid var(--divider-color);
  min-width: 400px;
  color: var(--main-title-color);


  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
  }

  &__body {
    padding: 16px;
  }

  &__close-button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: var(--popup-background-color);
    background-color: var(--second-background-color);
    border-radius: 50%;
    font-size: 14px;
    width: 32px;
    height: 32px;
    cursor: pointer;
    transition: all 0.5s;
  }

  &__close-button:hover {
    transform: scale(0.7);
    transition: all 0.5s;
  }

  &__leave-chat-button {
    color: var(--danger-color);
    cursor: pointer;
    transition: all 0.5s;
    text-align: left;
  }

  &__leave-chat-button:hover {
    opacity: 0.5;
    transition: all 0.5s;
  }

  &__footer {
    padding: 16px;
  }
}

@media screen and (max-width: 1050px) {
  .chat-sidebar {
    min-width: 300px;
  }
}

@media screen and (max-width: 1000px) {
  .chat-sidebar {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    z-index: 300;
  }
}
</style>