<template>
  <div class="profile" :class="{ 'profile--load': isLoad }">
    <div class="profile__header">
      <a href="#" @click.prevent="goBack" class="profile__back">
        <i class="fas fa-arrow-left"></i>
      </a>
      <div class="profile__header_title title-regular-18">
        User profile | <span class="profile__header_title_user">{{ headerTitle }}</span>
      </div>
    </div>
    <div class="profile__user_info" v-if="!isLoad">
      <base-avatar
        type="alias"
        variant="rounded-square"
        :text="inputs?.fullname || inputs?.username"
        width="120px"
        height="120px"
      />
      <div class="profile__group">
        <div class="profile__input">
          <p class="profile__label title-regular-14">Full name: </p>
          <base-input
            :value="inputs?.fullname"
            :disabled="true"
            placeholder="Full Name"
            style="min-width: 200px"
          />
        </div>
        <div class="profile__input">
          <p class="profile__label title-regular-14">Birthday: </p>
          <base-input
            type="date"
            :value="inputs?.birthday"
            :disabled="true"
            placeholder="Username"
            style="min-width: 200px"
          />
        </div>

        <div class="profile__input">
          <p class="profile__label title-regular-14">Username: </p>
          <base-input
            :value="inputs?.username"
            :disabled="true"
            placeholder="Username"
            style="min-width: 200px"
          />
        </div>
        <div class="profile__input">
          <p class="profile__label title-regular-14">Email: </p>
          <base-input
            :value="inputs?.email"
            :disabled="true"
            placeholder="Email"
            style="min-width: 200px"
          />
        </div>
        <div class="profile__input">
          <p class="profile__label title-regular-14">Date joined: </p>
          <base-input
            type="date"
            :value="inputs?.joined"
            :disabled="true"
            placeholder="Joined"
            style="min-width: 200px"
          />
        </div>

      </div>
      <div class="profile__group">

      </div>
    </div>

    <base-loader v-else></base-loader>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/store";
import ApiUserService from "@/services/api/api-user.service";
import UserMapperUtil from "@/utils/user-mapper.util";
import { User } from "@/core/models/user.model";
import { Room } from "@/core/models/room.model";
import { RoomRole } from "@/core/consts/room-role.enum";
import RoomsMapperUtil from "@/utils/rooms-mapper.util";
import { RoomType } from "@/core/consts/room-type.enum";
import BaseLoader from "@/components/base/BaseLoader.vue";
import BaseAvatar from "@/components/base/BaseAvatar.vue";
import BaseInput from "@/components/base/inputs/BaseInput.vue";

interface RoomData {
  room: Room,
  role: RoomRole
}

const route = useRoute();
const router = useRouter();
const store = useStore();

const uid = ref<string>(route.params.id.toString());
const currUid = ref<string>(store.getters.user?.uid?.toString());
const isLoad = ref<boolean>(true);
const headerTitle = computed(() => uid.value === currUid.value ? 'You' : inputs.fullname);

const inputs = reactive({
  fullname: "",
  username: "",
  email: "",
  birthday: new Date(),
  joined: new Date(),
})
const rooms = ref<RoomData[]>();


onMounted(async () => {
  await ApiUserService.findUserById(uid.value).then(json => {
    const user = UserMapperUtil.mapToUser(json.data);
    const roomsData = json.data.rooms?.map((data) => ({
      room: RoomsMapperUtil.mapToChat(data["room"]),
      role: data["role"]
    } as { room: Room, role: RoomRole }));

    rooms.value = filterRooms(roomsData || []);
    setDataToInputs(user);
    isLoad.value = false;
  });
});

const setDataToInputs = (user: User) => {
  inputs.fullname = user.fullname || '';
  inputs.username = user.username || '';
  inputs.email = user.email || '';
  inputs.birthday = user.birthday || new Date();
  inputs.joined = user.dateJoined || new Date();
}

const goBack = () =>  router.back();
const filterRooms = (roomsData: RoomData[]): RoomData[] => {
  if (currUid.value === uid.value) return roomsData;
  return roomsData.filter(data => data.room.roomType == RoomType.OPEN);
}
</script>

<style lang="scss" scoped>
.profile {
  &__header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 20px;
    height: 60px;
    background: var(--main-background-color);
    box-shadow: 0 15px 15px -5px var(--main-background-color);

    &_title {
      line-height: 1 !important;
      color: var(--main-title-color);

      &_user {
        color: var(--second-title-color);
      }
    }
  }

  &__back {
    font-size: 20px;
    text-decoration: none;
    color: var(--main-title-color);
    transition: 0.5s all;
    margin-right: 30px;
  }

  &__back:hover {
    text-decoration: none;
    color: var(--second-title-color);
    transition: 0.5s all;
  }

  &__user_info {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 20px;
  }

  &__input {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-left: 30px;
    margin-bottom: 10px;
    color: var(--second-title-color);
  }

  &__label {
    min-width: 100px;
  }

}

.profile--load {
  width: 100%;
  height: 100%;
}

@media screen and (max-width: 650px)  {
  .profile {
    &__input {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }

    &__label {
      margin-left: 8px;
      margin-bottom: 5px;
    }
  }
}

@media screen and (max-width: 385px)  {
  .profile {
    &__input {
      margin-left: 10px;
    }
  }
}
</style>
