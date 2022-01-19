<template>
  <div
    class="text-field common-input"
    ref="multiline_text_field"
    contenteditable="true"
    :placeholder="placeholder"
    @input.prevent="onChangeValue"
  >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "multiline-text-field",
  data: () => ({
    textarea: {} as HTMLElement,
  }),
  props: {
    value: String,
    placeholder: String,
  },
  emits: ['update:value'],
  mounted() {
    this.textarea = (this.$refs.multiline_text_field as HTMLElement);
    this.textarea.innerText = this.value as string;
  },
  methods: {
    onChangeValue() {
      this.$emit('update:value', this.textarea.innerText)
    },
    setCaretPosition() {
      const tmp = this.textarea.innerHTML.replace(/.*?(<br>)/g, '');
      const lastLine = tmp.replace(/&nbsp;/gi," ");
      const selection = window.getSelection();
      selection?.collapse(this.textarea.childNodes[this.textarea.childNodes.length - 1], lastLine.length);
    }
  },
  watch: {
    value(newValue) {
      this.textarea.innerText = newValue.replace(/(\*\*|__)(.*?)\1/g, "<strong>$2</strong>");
      this.setCaretPosition();
    }
  }
});
</script>

<style lang="scss" scoped>
[contenteditable=true]:empty:before {
  content: attr(placeholder);
  pointer-events: none;
  display: block;
  color: var(--second-title-color);
}

.text-field {
  padding: 5px;
  display: block;
  overflow-y: auto;
  color: var(--main-title-color);
  white-space: pre-line;
  max-height: 200px;
}

.text-field:focus {
  outline: none;
}

</style>