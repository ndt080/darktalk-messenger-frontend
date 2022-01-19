<template>
  <div class="autocomplete">
    <input
      ref="autocomplete"
      type="search"
      :placeholder="placeholder"
      class="autocomplete__input common-input title-regular-14"
      @input.prevent="onChangeValue"
    />
    <ul class="autocomplete__list">
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Autocomplete",
  data: () => ({
    autocomplete: {} as HTMLElement
  }),
  props: {
    value: String,
    placeholder: {
      type: String,
      default: "Search"
    }
  },
  emits: ["update:value"],
  mounted() {
    this.autocomplete = (this.$refs.autocomplete as HTMLElement);
    this.autocomplete.textContent = this.value as string;
  },
  methods: {
    onChangeValue() {
      this.$emit("update:value", this.autocomplete.textContent);
    }
  },
  watch: {
    value(newValue) {
      this.autocomplete.textContent = newValue;
    }
  }
});
</script>

<style lang="scss" scoped>
.autocomplete {
  position: relative;
  width: 100%;

  &__input {
    width: 100%;
  }

  &__list {
    display: none;
  }

  &__list.active {
    position: absolute;
    display: block;
    list-style: none;
    left: 0;
    right: 0;
    top: -10px;

    height: 100px;
    border-radius: 15px;
    padding: 15px;
    background: var(--card-background-color);
  }
}
</style>