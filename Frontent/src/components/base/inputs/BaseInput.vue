<template>
  <div class="base-input" :class="styleClass">
    <input
      class="base-input__input"
      :style="props.style"
      :type="props.type"
      :placeholder="props.placeholder"
      :autocomplete="props.autocomplete"
      v-model="inputValue"
    />
    <i class="base-input__icon icon-success fas fa-check"></i>
    <i class="base-input__icon icon-error fas fa-exclamation"></i>
  </div>
  <div class="base-input__error title-regular-12" v-if="props.isError && props.errorMessage">
    {{ props.errorMessage }}
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, defineEmits, ref, watch, computed } from "vue";

interface BaseInputProps {
  type?: string,
  autocomplete?: string,
  placeholder?: string,
  style?: { [key: string]: string | number },
  value?: string,
  isSuccess?: boolean,
  isError?: boolean,
  errorMessage?: string,
}

const props = withDefaults(defineProps<BaseInputProps>(), {
  type: "text",
  autocomplete: "on",
  placeholder: "Enter value...",
  isSuccess: false,
  isError: false,
  errorMessage: ""
});

const emits = defineEmits(['update:value'])

const inputValue = ref('');
const value = computed((): string => props.value || "");
const styleClass = computed(() => ({
  "base-input--error": props.isError,
  "base-input--success": props.isSuccess && !props.isError
}));

watch(value, (currentValue: string) => {
  inputValue.value = currentValue;
});

watch(inputValue, (currentValue: string) => {
  emits("update:value", currentValue);
});
</script>

<style lang="scss" scoped></style>