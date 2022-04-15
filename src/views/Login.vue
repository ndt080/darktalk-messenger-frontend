<template>
  <div class="auth">
    <template v-if="activeIndex === 0">
      <auth-form-sign-in></auth-form-sign-in>
      <div class="auth__help_text">
        <p>Don't have an account?</p>
        <div class="auth__link" @click="setActiveIndex(1)">Sign up</div>
      </div>
    </template>
    <template v-if="activeIndex === 1">
      <auth-form-sign-up @toSignIn="setActiveIndex(0)"></auth-form-sign-up>
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
import AuthFormSignIn from "@/components/auth-form/AuthFormSignIn.vue";
import AuthFormSignUp from "@/components/auth-form/AuthFormSignUp.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",
  components: { AuthFormSignIn, AuthFormSignUp },
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
      margin-top: 8px;
    }

    &__link {
      cursor: pointer;
      text-align: center;
      color: var(--primary-color)
    }
  }

</style>