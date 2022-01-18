<template>
  <form class="form" @submit.prevent="submit()" novalidate>
    <div class="form__group">
      <h1 class="form__title title-semi-32">Sign up</h1>
    </div>
    <div class="form__row_wrapper">
      <div class="form__col_wrapper" style="margin-right: 30px">
        <div class="form__group">
          <div class="form__input_container">
            <input
              name="email"
              type="email"
              placeholder="Email"
              class="common-input title-regular-14"
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
              name="username"
              type="text"
              placeholder="Username"
              class="common-input title-regular-14"
              :class="{
                'input--error' : v$.username.$error,
                'input--success' : !v$.username.$error && state.username
              }"
              v-model="state.username"
            />
          </div>
        </div>
        <div class="form__group">
          <div class="form__input_container">
            <input
              name="fullname"
              type="text"
              placeholder="Full name"
              class="common-input title-regular-14"
              :class="{
                'input--error' : v$.fullname.$error,
                'input--success' : !v$.fullname.$error && state.fullname
              }"
              v-model="state.fullname"
            />
          </div>
        </div>
      </div>
      <div class="form__col_wrapper">
        <div class="form__group">
          <div class="form__input_container">
            <input
              name="birthday"
              type="date"
              placeholder="Birthday"
              class="common-input title-regular-14"
              :class="{
                'input--error' : v$.birthday.$error,
                'input--success' : !v$.birthday.$error && state.birthday
              }"
              v-model="state.birthday"
            />
          </div>
        </div>
        <div class="form__group">
          <div class="form__input_container">
            <input
              name="password"
              type="password"
              placeholder="Password"
              autocomplete="new-password"
              class="common-input title-regular-14"
              :class="{
            'input--error' : v$.password.$error,
            'input--success' : !v$.password.$error && state.password
          }"
              v-model="state.password"
            />
          </div>
        </div>
        <div class="form__group">
          <div class="form__input_container">
            <input
              name="confirm"
              type="password"
              placeholder="Confirm password"
              autocomplete="new-password"
              class="common-input title-regular-14"
              :class="{
            'input--error' : v$.confirm.$error,
            'input--success' : !v$.confirm.$error && state.confirm
          }"
              v-model="state.confirm"
            />
          </div>
        </div>
      </div>
    </div>
    <button class="form__btn primary-btn" type="submit" :disabled="v$.$invalid">Sign up</button>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import { email, minLength, required, sameAs } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {User} from "@/core/models/user.model";
import NotificationService from "@/services/notification.service";
import { RouterPaths } from "@/core/consts/router-paths.enum";

export default defineComponent({
  name: "sign-up-form",
  setup() {
    const state = reactive({
      email: "",
      username: "",
      fullname: "",
      birthday: "",
      password: "",
      confirm: ""
    });

    const rules = computed(() => {
      return {
        email: { required, email },
        username: { required, minLength: minLength(3) },
        fullname: { required, minLength: minLength(3) },
        birthday: { required },
        password: { required, minLength: minLength(6) },
        confirm: { required, sameAs: sameAs(state.password) }
      };
    });

    const v$ = useVuelidate(rules, state, { $autoDirty: true });
    return { state, v$ };
  },
  methods: {
    async submit() {
      const result = await this.v$.$validate();
      if (!result) return;

      await this.$store.dispatch("registration", this.getUser(this.state))
        .then(() => this.$emit('toSignIn'));
    },

    getUser(state: any): User {
      return {
        email: state.email,
        username: state.username,
        fullname: state.fullname,
        birthday: state?.birthday,
        password: state.password,
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;

  &__row_wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  &__col_wrapper {
    display: flex;
    flex-direction: column;
  }

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

@media screen and (max-width: 550px) {
  .form__row_wrapper {
    display: block;
  }
}
</style>