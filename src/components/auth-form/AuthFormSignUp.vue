<template>
  <form class="form" @submit.prevent="submit()" novalidate>
    <div class="form__group">
      <h1 class="form__title title-semi-32">Sign up</h1>
    </div>
    <div class="form__row_wrapper">
      <div class="form__col_wrapper" style="margin-right: 30px">
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
            placeholder="Username"
            :is-success="!!state.username"
            :is-error="v$.username.$error && !!state.username"
            :style="{'min-width': ' 220px'}"
            v-model:value="state.username"
          />
        </div>
        <div class="form__group">
          <base-input
            placeholder="Full name"
            :is-success="!!state.fullname"
            :is-error="v$.fullname.$error && !!state.fullname"
            :style="{'min-width': ' 220px'}"
            v-model:value="state.fullname"
          />
        </div>
      </div>
      <div class="form__col_wrapper">
        <div class="form__group">
          <base-input
            type="date"
            placeholder="Birthday"
            :is-success="!!state.birthday"
            :is-error="v$.birthday.$error && !!state.birthday"
            :style="{'min-width': ' 220px'}"
            v-model:value="state.birthday"
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
        <div class="form__group">
          <base-input
            type="password"
            placeholder="Confirm password"
            autocomplete="new-password"
            :is-success="!!state.confirm"
            :is-error="v$.confirm.$error && !!state.confirm"
            :style="{'min-width': ' 220px'}"
            v-model:value="state.confirm"
          />
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
import BaseInput from "@/components/base/inputs/BaseInput.vue";

export default defineComponent({
  name: "AuthFormSignUp",
  components: { BaseInput },
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