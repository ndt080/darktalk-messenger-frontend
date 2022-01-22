<template>
  <div class="base-autocomplete">
    <div class="base-autocomplete__input">
      <base-input type="search" :placeholder="placeholder" v-model:value="searchQuery" />
    </div>
    <ul class="base-autocomplete__result" :class="{'base-autocomplete__result--active': isShowResult}">
      <li
        class="base-autocomplete__result_item"
        v-for="(item, index) of result"
        :key="index"
        @click.prevent="onItemSelected(item)"
      >
        <slot name="result" :item="item"></slot>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import BaseInput from "@/components/base/inputs/BaseInput.vue";
import BaseAutocompleteQueryFunction from "@/core/models/inputs/base-autocomplete-query-function.model";

export default defineComponent({
  name: "BaseAutocomplete",
  components: { BaseInput },
  props: {
    query: String,
    queryFunction: { type: Function as PropType<BaseAutocompleteQueryFunction>, required: true },
    placeholder: { type: String, default: "Search..." }
  },
  emits: ["update:query", "update:result", "item-selected"],
  data: () => ({
    searchQuery: "",
    result: [],
    isShowResult: false
  }),
  watch: {
    query: {
      immediate: true,
      handler(current: string) {
        this.searchQuery = current;
      }
    },
    async searchQuery(value: string) {
      this.$emit("update:query", value);

      this.result = await (this.queryFunction as BaseAutocompleteQueryFunction)(value);
      this.$emit("update:result", this.result);
      this.isShowResult = this.result.length > 0;
    }
  },
  methods: {
    onItemSelected(item: any) {
      this.$emit("item-selected", item);
      this.searchQuery = "";
      this.isShowResult = false;
    }
  }
});
</script>

<style lang="scss" scoped></style>