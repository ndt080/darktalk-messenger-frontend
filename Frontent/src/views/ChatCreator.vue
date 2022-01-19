<template>
  <div class="chat-creator">
    <div class="chat-creator__header">
      <a href="#" @click.prevent="goHome" class="chat-creator__back">
        <i class="fas fa-arrow-left"></i>
      </a>
      <div class="chat-creator__title title-semi-14">
        Creating a chat
      </div>
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
          <Autocomplete placeholder="Search users"></Autocomplete>
        </div>
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
import Autocomplete from "@/components/autocomplete/Autocomplete.vue";

export default defineComponent({
  name: "ChatCreator",
  components: { Autocomplete },
  setup() {
    const roomTypes = Object.values(RoomType);

    const state = reactive({
      title: "",
      description: "",
      roomType: null,
      users: [],
    });

    const rules = computed(() => {
      return {
        title: { required, minLength: minLength(3) },
        description: { required, minLength: minLength(3) },
        roomType: { required },
        users: { required, minLength: minLength(2) },
      };
    });

    const v$ = useVuelidate(rules, state, { $autoDirty: true });
    return { state, v$, roomTypes };
  },
  methods: {
    async submit() {
      throw ""
    },

    goHome() {
      this.$router.push(`/${RouterPaths.HOME}`);
    }
  }
});
</script>

<style lang="scss" scoped>
.chat-creator {
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
}

@media screen and (max-width: 650px) {
  .chat-creator {
    &__form_input {
      width: 95%;
    }
  }
}
</style>