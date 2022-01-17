<template>
  <form class="form" @submit.prevent="submit()" novalidate>
    <div class="form__group">
      <h1 class="form__title title-semi-32">Sign in</h1>
    </div>
    <div class="form__group">
      <div class="form__input_container">
        <input
          type="email"
          placeholder="Email"
          class="common-input title-regular-14"
          autocomplete="on"
          :class="{
            'input--error' : v$.email.$error,
            'input--success' : !v$.email.$error && state.email
          }"
          v-model="state.email"
        />
      </div>
    </div>
    <div class="form__group">
      <div class="form__input_container">
        <input
          type="password"
          placeholder="Password"
          class="common-input title-regular-14"
          autocomplete="on"
          :class="{
            'input--error' : v$.password.$error,
            'input--success' : !v$.password.$error && state.password
          }"
          v-model="state.password"
        />
      </div>
    </div>
    <button class="form__btn primary-btn" type="submit" :disabled="v$.$invalid">Sign in</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { email, minLength, required } from "@vuelidate/validators";
import { User } from "@/core/models/user.model";
import NotificationService from "@/services/notification.service";
import { RouterPaths } from "@/core/consts/router-paths.enum";

export default defineComponent({
  name: "sign-in-form",
  setup() {
    const state = reactive({
      email: null,
      password: null
    });

    const rules = {
      email: { required, email },
      password: { required, minLength: minLength(6) }
    };

    const v$ = useVuelidate(rules, state, { $autoDirty: true });
    return { state, v$ };
  },
  methods: {
    async submit() {
      const result = await this.v$.$validate();
      if (!result) return;

      await this.$store.dispatch("login", this.getUser(this.state))
        .then(() => this.$router.push(`/${RouterPaths.HOME}`));
    },

    getUser(state: any): User {
      return {
        email: state.email,
        password: state.password
      };
    }
  }
});
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;

  &__title {
    text-align: center;
    color: var(--second-title-color);
  }

  &__group {
    margin-bottom: 20px
  }

  &__input_container input {
    min-width: 200px;
  }

  &__btn {
    align-self: center;
    text-transform: uppercase;
  }
}
</style>