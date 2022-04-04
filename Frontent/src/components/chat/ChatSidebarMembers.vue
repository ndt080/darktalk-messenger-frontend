<template>
  <div class="chat-sidebar-members">
    <div class="chat-sidebar-members__title title-regular-14">
      Members
      <span class="chat-sidebar-members__title_count">{{members.length}}</span>
    </div>
    <div class="chat-sidebar-members__list custom-scroll unselectable">

      <template v-for="member of members" :key="member.user.uid">
        <div class="chat-sidebar-members__item title-regular-14">
          <div class="chat-sidebar-members__item_avatar">
            <BaseAvatar :text="member.user.fullname || member.user.username"/>
          </div>
          <div class="chat-sidebar-members__item_name">
            {{member.user.fullname || member.user.username}}
          </div>
          <div class="chat-sidebar-members__item_tag" v-if="member.role === chatRole.OWNER">
             Creator
          </div>

        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import { RoomUser } from "@/core/models/room-user.model";
import BaseAvatar from "@/components/base/BaseAvatar.vue";
import { RoomRole } from "@/core/consts/room-role.enum";

const store = useStore();
const router = useRouter();
const props = defineProps<{ members: RoomUser[], isOwnerUser: boolean }>();
const chatRole = RoomRole;

</script>

<style lang="scss" scoped>
.chat-sidebar-members {
  &__title {
    color: var(--second-title-color);
    margin-bottom: 8px;

    &_count {
      color: var(--main-title-color);
    }
  }

  &__list {
    max-height: 116px;
    overflow-y: scroll;
    padding-right: 8px;
  }

  &__item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 4px;
    transition: background 0.5s;

    &_avatar {
      width: 32px;
      height: 32px;
      margin-right: 4px;
      transform: scale(0.8);
    }

    &_tag {
      color: var(--warning-color);
      margin-left: 4px;
    }
  }

  &__item:hover {
    background-color: var(--popup-background-color);
    border-radius: 8px;
    transition: background 0.5s;
  }
}
</style>