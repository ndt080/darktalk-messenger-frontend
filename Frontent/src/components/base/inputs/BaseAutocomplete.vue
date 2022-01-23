<template>
  <div class="base-autocomplete">
    <div class="base-autocomplete__input">
      <base-input type="search" :placeholder="props.placeholder" v-model:value="searchQuery" />
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

<script lang="ts" setup>
import { withDefaults, defineProps, defineEmits, ref, watch, computed } from "vue";
import BaseInput from "@/components/base/inputs/BaseInput.vue";
import BaseAutocompleteQueryFunction from "@/core/models/inputs/base-autocomplete-query-function.model";

interface BaseAutocompleteProps {
  query?: string,
  queryFunction: BaseAutocompleteQueryFunction,
  placeholder?: string,
}

const props = withDefaults(defineProps<BaseAutocompleteProps>(), {
  placeholder: 'Search...'
});
const emits = defineEmits(["update:query", "update:result", "item-selected"]);

const searchQuery = ref("");
const result = ref([]);
const isShowResult = ref(false);
const query = computed((): string => props.query || "");

watch(query, (currentValue: string) => (searchQuery.value = currentValue));
watch(searchQuery, async (currentValue: string) => {
  emits("update:query", currentValue);

  result.value = await props.queryFunction(currentValue);
  isShowResult.value = result.value.length > 0;
  emits("update:result", result.value);
});

const onItemSelected = (item: any) => {
  emits("item-selected", item);
  searchQuery.value = "";
  isShowResult.value = false;
}
</script>

<style lang="scss" scoped></style>