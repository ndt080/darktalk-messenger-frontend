<template>
  <div class="chat-creator">
    <div class="chat-creator__header">
      <a href="#" @click.prevent="goHome" class="chat-creator__back">
        <i class="fas fa-arrow-left"></i>
      </a>
      <div class="chat-creator__title title-regular-18">Creating a chat</div>
    </div>

    <div class="chat-creator__body">
      <form class="chat-creator__form" @submit.prevent="submit()" novalidate>
        <div class="chat-creator__input">
          <base-input
            placeholder="Title"
            :is-success="!!state.title"
            :is-error="v$.title.$error"
            v-model:value="state.title"
          />
        </div>
        <div class="chat-creator__input">
          <base-input
            placeholder="Description"
            :is-success="!!state.description"
            :is-error="v$.description.$error"
            v-model:value="state.description"
          />
        </div>
        <div class="chat-creator__input">
          <base-select
            placeholder="Chat type"
            :data="selectOptions"
            :is-success="!!state.roomType"
            v-model:value="state.roomType"
          />
        </div>
        <div class="chat-creator__input">
          <base-autocomplete
            placeholder="Search users..."
            :query-function="queryFunction"
            @item-selected="addUser($event)"
          >
            <template v-slot:result="scope">@{{ scope.item.username }}</template>
          </base-autocomplete>
        </div>
        <div class="chat-creator__input">
          <template v-for="([ key, value ], index) of state.users" :key="index">
            <div class="user-btn">
              {{ value.username }}
              <span class="user-btn_icon" @click.prevent="removeUser(key)">
                <i class="far fa-trash-alt"></i>
              </span>
            </div>
          </template>
        </div>
        <button
          class="chat-creator__btn primary-btn"
          type="submit"
          :disabled="isValidForm"
        >
          Create chat
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import { RouterPaths } from "@/core/consts/router-paths.enum";
import { minLength, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { RoomType } from "@/core/consts/room-type.enum";
import ApiUserService from "@/services/api/api-user.service";
import { User } from "@/core/models/user.model";
import UserMapperUtil from "@/utils/user-mapper.util";
import BaseInput from "@/components/base/inputs/BaseInput.vue";
import BaseSelect from "@/components/base/inputs/BaseSelect.vue";
import BaseSelectOption from "@/core/models/inputs/base-select-option.model";
import BaseAutocomplete from "@/components/base/inputs/BaseAutocomplete.vue";
import NotificationService from "@/services/notification.service";

export default defineComponent({
  name: "ChatCreator",
  components: { BaseAutocomplete, BaseSelect, BaseInput },
  setup() {
    const state = reactive({
      title: "",
      description: "",
      roomType: null,
      users: new Map<number, User>()
    });

    const rules = computed(() => {
      return {
        title: { required, minLength: minLength(3) },
        description: { required, minLength: minLength(3) },
        roomType: { required },
        users: { minLength: minLength(2) }
      };
    });

    const v$ = useVuelidate(rules, state, { $autoDirty: true });
    return { state, v$ };
  },
  data: () => ({
    selectOptions: [] as BaseSelectOption[]
  }),
  computed: {
    username(): string {
      return this.$store.getters.user?.username;
    },
    isValidForm(): boolean {
      return this.v$.$invalid || this.state.users.size < 1;
    }
  },
  created() {
    const optionsValues = Object.values(RoomType);
    this.selectOptions = Array.from(optionsValues).map(value => ({
      title: value,
      value: value
    } as BaseSelectOption));
  },
  methods: {
    goHome() {
      this.$router.push(`/${RouterPaths.HOME}`);
    },
    async queryFunction(query: string): Promise<User[]> {
      if(query.length < 3) return [];

      const response = await ApiUserService.findUserByUsername(query);
      const result: User[] = response?.data.length <= 10 ? response?.data : [];

      return UserMapperUtil.mapToUsers(result);
    },
    async submit() {
      const result = await this.v$.$validate();
      if (!result) return;

      await this.$store.dispatch("createRoom", {
        title: this.state.title,
        description: this.state.description,
        room_type: this.state.roomType,
        users: [...this.state.users.keys()]
      }).then(() => {
        NotificationService.success("Success create chat!");
        this.goHome();
      });
    },
    addUser(user: User) {
      if (this.state.users.get(user?.uid as number) || user.username == this.username) return;

      this.state.users.set(user?.uid as number, user);
    },
    removeUser(key: number) {
      this.state.users.delete(key);
    },
  }
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

  &__input {
    margin-bottom: 20px;
    min-width: 250px;
    width: 50%;
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
    &__input {
      width: 100%;
    }
  }
}

.chat-creator::-webkit-scrollbar {
  display: none;
}
</style>
