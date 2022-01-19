<template>
  <div class="chat-creator">
    <div class="chat-creator__header">
      <a href="#" @click.prevent="goHome" class="chat-creator__back">
        <i class="fas fa-arrow-left"></i>
      </a>
      <div class="chat-creator__title title-semi-14">Creating a chat</div>
    </div>

    <div class="chat-creator__body">
      <form class="chat-creator__form" @submit.prevent="submit()" novalidate>
        <div class="chat-creator__form_input">
          <input
            name="Title"
            type="text"
            placeholder="Title"
            class="common-input title-regular-14"
            :class="{
                'input--error' : v$.title.$error,
                'input--success' : !v$.title.$error && state.title
              }"
            v-model="state.title"
          />
        </div>
        <div class="chat-creator__form_input">
          <input
            name="description"
            type="text"
            placeholder="Description"
            class="common-input title-regular-14"
            :class="{
                'input--error' : v$.description.$error,
                'input--success' : !v$.description.$error && state.description
              }"
            v-model="state.description"
          />
        </div>
        <div class="chat-creator__form_input">
          <select
            name="description"
            class="common-input title-regular-14"
            :class="{
                'input--error' : v$.roomType.$error,
                'input--success' : !v$.roomType.$error && state.roomType
              }"
            v-model="state.roomType"
          >
            <option :value="null" disabled>Chat type</option>
            <option v-for="(type, index) of roomTypes" :key="index" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
        <div class="chat-creator__form_input">
          <Autocomplete
            :data="queryResult"
            @update:value="findUser($event)"
            @itemSelect="addUser($event)"
            placeholder="Search users"
          >
            <template v-slot:default="slotProp">
              <div class="autocomplete__result title-regular-14">
                @{{slotProp.item?.username}}
              </div>
            </template>
          </Autocomplete>
        </div>
        <div class="chat-creator__form_input">
          <template v-for="([ key, value ], index) of state.users" :key="index">
            <div class="user-btn">
              {{value.username}}
              <span class="user-btn_icon" @click.prevent="removeUser(key)">
                <i class="far fa-trash-alt"></i>
              </span>
            </div>
          </template>
        </div>
        <button class="chat-creator__btn primary-btn" type="submit" :disabled="v$.$invalid || state.users.size < 1">
          Create chat
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { RouterPaths } from "@/core/consts/router-paths.enum";
import { minLength, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { RoomType } from "@/core/consts/room-type.enum";
import Autocomplete from "@/components/autocomplete/Autocomplete.vue";
import ApiUserService from "@/services/api/api-user.service";
import { User } from "@/core/models/user.model";
import UserMapperUtil from "@/utils/user-mapper.util";
import NotificationService from "@/services/notification.service";

export default defineComponent({
  name: "ChatCreator",
  components: { Autocomplete },
  setup() {
    const roomTypes = Object.values(RoomType);
    const queryResult = ref([] as User[])

    const state = reactive({
      title: "",
      description: "",
      roomType: null,
      users: new Map<number, User>(),
    });

    const rules = computed(() => {
      return {
        title: { required, minLength: minLength(3) },
        description: { required, minLength: minLength(3) },
        roomType: { required },
        users: { minLength: minLength(2) },
      };
    });

    const v$ = useVuelidate(rules, state, { $autoDirty: true });
    return { state, v$, roomTypes, queryResult };
  },
  methods: {
    async submit() {
      const result = await this.v$.$validate();
      if (!result) return;

      await this.$store.dispatch("createRoom", {
        title: this.state.title,
        description: this.state.description,
        room_type: this.state.roomType,
        users: this.state.users.keys()
      })
        .then(() => NotificationService.success("Success create chat!"));
    },
    findUser(query: string) {
      ApiUserService.findUserByUsername(query).then(response => {
        if(response?.data.length <= 10) {
          this.queryResult = UserMapperUtil.mapToUsers(response?.data);
        }
      })
    },
    addUser(user: User) {
      if(this.state?.users.get(user?.id as number)) return;

      this.state?.users.set(user?.id as number, user);
    },
    removeUser(key: number) {
      this.state?.users.delete(key);
    },
    goHome() {
      this.$router.push(`/${RouterPaths.HOME}`);
    }
  },
});
</script>

<style lang="scss" scoped>
.chat-creator {
  height: 100vh;
  max-height: 100vh;
  overflow-y: scroll !important;
  scroll-behavior: smooth;

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

  &__title {
    line-height: 1 !important;
    color: var(--main-title-color);
  }

  &__body {
    display: block;
    box-sizing: border-box;
    padding: 30px;
  }

  &__form {
    &_input {
      margin-bottom: 20px;
      min-width: 250px;
      width: 50%;
    }

    &_input input, &_input select {
      width: 100%;
    }
  }

  .user-btn {
    display: inline-block;
    margin: 5px;
    padding: 5px 10px;
    box-sizing: border-box;
    background-color: var(--message-background-color);
    color: var(--main-title-color);
    border-radius: 15px;

    &_icon {
      font-size: 14px;
      color: var(--danger-color);
      margin-left: 10px;
      cursor: pointer;
    }
  }
}

@media screen and (max-width: 650px) {
  .chat-creator {
    &__form_input {
      width: 95%;
    }
  }
}

.autocomplete__result {
  cursor: pointer;
  padding: 5px 0;
  color: var(--second-title-color);
}

.autocomplete__result:hover {
  color: var(--success-color);
}
.chat-creator::-webkit-scrollbar {
  display: none;
}
</style>