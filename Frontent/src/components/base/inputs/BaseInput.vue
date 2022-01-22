<template>
  <div class="base-input" :class="styleClass">
    <input
      class="base-input__input"
      :style="style"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      v-model="inputValue"
    />
    <i class="base-input__icon icon-success fas fa-check"></i>
    <i class="base-input__icon icon-error fas fa-exclamation"></i>
  </div>
  <div class="base-input__error title-regular-12" v-if="isError && errorMessage">{{ errorMessage }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseInput",
  props: {
    type: { type: String, default: "text" },
    autocomplete: { type: String, default: 'on'},
    placeholder: { type: String, default: "Enter value..." },
    style: Object,
    value: String,
    isSuccess: { type: Boolean, default: false },
    isError: { type: Boolean, default: false },
    errorMessage: { type: String, default: "" }
  },
  emits: ["update:value"],
  data: () => ({
    inputValue: ""
  }),
  computed: {
    styleClass() {
      return {
        "base-input--error": this.isError,
        "base-input--success": this.isSuccess && !this.isError
      };
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(current: string) {
        this.inputValue = current;
      }
    },
    inputValue(value: string) {
      this.$emit("update:value", value);
    }
  }
});
</script>

<style lang="scss" scoped></style>