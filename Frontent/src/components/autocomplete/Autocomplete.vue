<template>
  <div class="autocomplete">
    <input
      ref="autocompleteInput"
      type="search"
      :placeholder="placeholder"
      class="autocomplete__input common-input title-regular-14"
      @input.prevent="onChangeValue"
    />
    <ul class="autocomplete__list" :class="{'active': this.isShowList}">
      <li v-for="(item, index) of data" :key="index" @click.prevent="onItemSelected(item)">
        <slot :item="item"></slot>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Autocomplete",
  data: () => ({
    autocompleteInput: {} as HTMLInputElement,
    isShowList: false,
  }),
  props: {
    value: {
      type: String,
      default: ""
    },
    data: Object as PropType<any[]>,
    placeholder: {
      type: String,
      default: "Search"
    },
  },
  emits: ["update:value", "itemSelect"],
  mounted() {
    this.autocompleteInput = (this.$refs.autocompleteInput as HTMLInputElement);
    this.autocompleteInput.value = this.value as string;
  },
  methods: {
    async onChangeValue() {
      const value = this.autocompleteInput.value.split('').length;

      if(value > 1) {
        this.$emit("update:value", this.autocompleteInput.value);
      } else {
        this.isShowList = false;
      }
    },
    onItemSelected(item: any) {
      this.autocompleteInput.value = "";
      this.isShowList = false;
      this.$emit('itemSelect', item)
    }
  },
  watch: {
    value(value) {
      this.autocompleteInput.value = value;
    },
    data(value) {
      this.isShowList = value?.length > 0;
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
    visibility: hidden;
    height: 0;
  }

  &__list.active {
    visibility: visible;
    position: absolute;
    display: block;
    list-style: none;
    left: 0;
    right: 0;

    min-height: 40px;
    height: auto;
    border-radius: 15px;
    padding: 15px;
    background: var(--card-background-color);
  }
}
</style>