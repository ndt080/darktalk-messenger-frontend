<template>
  <div class="base-select" :class="styleClass">
    <select
      class="base-select__select"
      :style="style"
      v-model="inputValue"
    >
      <option class="base-select__option" :value="null" disabled>{{ placeholder }}</option>

      <template v-for="option of data" :key="option.title">
        <option class="base-select__option" :value="option.value">
          {{ option.title }}
        </option>
      </template>

    </select>
    <i class="base-select__icon icon-appearance fas fa-chevron-down"></i>
    <i class="base-select__icon icon-success fas fa-check"></i>
    <i class="base-select__icon icon-error fas fa-exclamation"></i>
  </div>
  <div class="base-select__error title-regular-12" v-if="isError && errorMessage">{{ errorMessage }}</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import BaseSelectOption from "@/core/models/inputs/base-select-option.model";

export default defineComponent({
  name: "BaseSelect",
  props: {
    placeholder: { type: String, default: "Select value..." },
    style: Object,
    value: String,
    data: { type: Object as PropType<BaseSelectOption[]>, required: true },
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
        "base-select--error": this.isError,
        "base-select--success": this.isSuccess && !this.isError
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