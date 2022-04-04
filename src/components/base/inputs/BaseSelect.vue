<template>
  <div class="base-select" :class="styleClass">
    <select
      class="base-select__select"
      :style="props.style"
      v-model="inputValue"
    >
      <option class="base-select__option" value="" disabled>{{ props.placeholder }}</option>

      <template v-for="option of props.data" :key="option.title">
        <option class="base-select__option" :value="option.value">
          {{ option.title }}
        </option>
      </template>

    </select>
    <i class="base-select__icon icon-appearance fas fa-chevron-down"></i>
    <i class="base-select__icon icon-success fas fa-check"></i>
    <i class="base-select__icon icon-error fas fa-exclamation"></i>
  </div>
  <div class="base-select__error title-regular-12" v-if="props.isError && props.errorMessage">{{ props.errorMessage }}</div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, defineEmits, ref, watch, computed } from "vue";
import BaseSelectOption from "@/core/models/inputs/base-select-option.model";

interface BaseSelectProps {
  placeholder?: string,
  style?: { [key: string]: string | number },
  value?: string,
  data: BaseSelectOption[],
  isSuccess?: boolean,
  isError?: boolean,
  errorMessage?: string,
}

const props = withDefaults(defineProps<BaseSelectProps>(), {
  placeholder: "Select value...",
  isSuccess: false,
  isError: false,
  errorMessage: ""
});

const emits = defineEmits(['update:value'])

const inputValue = ref('');
const value = computed((): string => props.value || "");
const styleClass = computed(() => ({
  "base-select--error": props.isError,
  "base-select--success": props.isSuccess && !props.isError
}));

watch(value, (currentValue: string) => {
  inputValue.value = currentValue;
});

watch(inputValue, (currentValue: string) => {
  emits("update:value", currentValue);
});
</script>

<style lang="scss" scoped></style>