<template>
  <div class="auth">
    <template v-if="activeIndex === 0">
      <sign-in-form></sign-in-form>
      <div class="auth__help_text">
        <p>Don't have an account?</p>
        <div class="auth__link" @click="setActiveIndex(1)">Sign up</div>
      </div>
    </template>
    <template v-if="activeIndex === 1">
      <sign-up-form @toSignIn="setActiveIndex(0)"></sign-up-form>
      <div class="auth__help_text">
        <p>Already have an account?</p>
        <div class="auth__link" @click="setActiveIndex(0)">Sign in</div>
      </div>
    </template>
<!--    <template v-if="activeIndex === 2">-->

<!--    </template>-->
  </div>
</template>

<script lang="ts">
import SignInForm from "@/components/authorization-forms/sign-in-form.vue";
import SignUpForm from "@/components/authorization-forms/sign-up-form.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",
  data() {
    return {
      activeIndex: 0,
    }
  },
  methods: {
    setActiveIndex(index: number): void {
      this.activeIndex = index;
    }
  },
  components: { SignUpForm, SignInForm }
});
</script>

<style lang="scss" scoped>
  .auth {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;
    padding: 30px;

    //width: 300px;
    background-color: var(--card-background-color);
    border-radius: $main-border-radius;

    &__help_text {
      text-align: center;
      color: var(--second-title-color);
      margin-top: 20px;
    }

    &__link {
      cursor: pointer;
      text-align: center;
      color: var(--primary-color)
    }
  }

</style>