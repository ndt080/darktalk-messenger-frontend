<template>
  <div
    class="text-field common-input"
    ref="multiline_text_field"
    contenteditable="true"
    :placeholder="placeholder"
    aria-multiline="true"
    @input.prevent="onChangeValue($event)"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "multiline-textfield",
  data: () => ({
    textarea: {} as HTMLElement,
  }),
  props: {
    value: String,
    isSubmittable: Boolean,
    placeholder: String,
  },
  emits: ['update:value', 'submit'],
  mounted() {
    this.textarea = (this.$refs.multiline_text_field as HTMLElement);

    this.textarea.addEventListener('keydown', (event: KeyboardEvent) => {
      if(event.keyCode == 13 && !event.shiftKey) {
        event.preventDefault();
        this.submit();
        return false;
      }

      if(event.shiftKey && event.keyCode == 13) {
        event.preventDefault();
        this.textarea.innerText += "\n\n"
        this.setCaretPosition();
      }
    })
  },
  methods: {
    setCaretPosition() {
      const tmp = this.textarea.innerHTML.replace(/.*?(<br>)/g, '');
      const lastLine = tmp.replace(/&nbsp;/gi," ");
      const selection = window.getSelection();
      selection?.collapse(this.textarea.childNodes[this.textarea.childNodes.length - 1], lastLine.length);
    },
    submit() {
      this.$emit('submit', this.textarea.textContent);
    },
    onChangeValue() {
      this.$emit('update:value', this.textarea.innerText);
    },
  },
  watch: {
    value(newValue) {
      this.textarea.innerText = newValue.replace(/(\*\*|__)(.*?)\1/g, "<strong>$2</strong>");
      this.setCaretPosition();
    },

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
  display: block;
  padding: 5px;
  overflow: auto;
  border: none;
  width: 100%;
  max-height: 200px;
  white-space: pre-line;

  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
  -ms-word-break: break-all;
  word-break: break-all;

  color: var(--main-title-color);

  -webkit-line-break: after-white-space;
  -webkit-user-modify: read-write;
    line-break: after-white-space;
  overflow-wrap: break-word;
}

.text-field::-webkit-scrollbar {
  display: none;
}

.text-field:focus {
  outline: none;
}

</style>