<template>
  <form class="form" @submit.prevent="submit" novalidate>
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

  <AuthFormGoogle />
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { email, minLength, required } from "@vuelidate/validators";
import { User } from "@/core/models/user.model";
import { RouterPaths } from "@/core/consts/router-paths.enum";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import BaseInput from "@/components/base/inputs/BaseInput.vue";
import AuthFormGoogle from "@/components/auth-form/AuthFormGoogle.vue";


interface Credentials {
  email?: string;
  password?: string;
}

const store = useStore();
const router = useRouter();

const state = reactive({} as Credentials);
const v$ = useVuelidate({
  email: { required, email },
  password: { required, minLength: minLength(6) }
}, state, { $autoDirty: true });


const submit = async () => {
  if (!await v$.value.$validate()) return;

  await store.dispatch("login", getUser(state))
    .then(() => router.push(`/${RouterPaths.HOME}`));
}

const getUser = (state: Credentials): User => ({
  email: state.email,
  password: state.password
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
</style>
