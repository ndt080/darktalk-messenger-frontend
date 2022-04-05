<template>
  <form class="form" @submit.prevent="submit()" novalidate>
    <div class="form__group">
      <h1 class="form__title title-semi-32">Sign in</h1>
    </div>
    <div class="form__group">
      <base-input
        type="email"
        placeholder="Email"
        :is-success="!!state.email"
        :is-error="v$.email.$error && !!state.email"
        :style="{'min-width': ' 220px'}"
        v-model:value="state.email"
      />
    </div>
    <div class="form__group">
      <base-input
        type="password"
        placeholder="Password"
        :is-success="!!state.password"
        :is-error="v$.password.$error && !!state.password"
        :style="{'min-width': ' 220px'}"
        v-model:value="state.password"
      />
    </div>
    <button class="form__btn primary-btn" type="submit" :disabled="v$.$invalid">Sign in</button>
  </form>

  <div class="hr-80"></div>

  <div class="google-login" @click.prevent="signInWithGoogle()">
    <img class="google-login__img" src="@/assets/img/icons/google.svg"  alt="google" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { email, minLength, required } from "@vuelidate/validators";
import { User } from "@/core/models/user.model";
import { RouterPaths } from "@/core/consts/router-paths.enum";
import BaseInput from "@/components/base/inputs/BaseInput.vue";

interface Credentials {
  email?: string;
  password?: string;
}

export default defineComponent({
  name: "AuthFormSignIn",
  components: { BaseInput },
  setup() {
    const state = reactive({} as Credentials);
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
    getUser(state: Credentials): User {
      return {
        email: state.email,
        password: state.password
      };
    },
    signInWithGoogle() {
      this.$gapi.login();
    }
  },
});
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;

  &__title {
    text-align: center;
    color: var(--second-title-color);
  }

  &__group {
    margin-bottom: 20px
  }

  &__btn {
    align-self: center;
    text-transform: uppercase;
  }
}

.google-login {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: var(--second-background-color);
  cursor: pointer;
  transition: all 0.5s;

  &__img {
    width: 16px;
    height: 16px;
  }
}

.google-login:hover {
  ackground-color: var(--popup-background-color);
  transform: scale(1.25);
  transition: all 0.5s;
}
</style>