<template>
  <div class="text-field__wrapper">
    <div
      class="text-field common-input"
      ref="textarea"
      contenteditable="true"
      :placeholder="props.placeholder"
      aria-multiline="true"
      @input.prevent="onChangeValue()"
      @keydown="handlePressingEnter"
    ></div>

    <div class="text-field__emoji" v-if="props.withEmoji" @click="onShowPicker">
      <i class="fas fa-smile-wink"></i>
    </div>

    <div class="text-field__emoji_picker" v-if="isShowEmojiPicker">
      <div class="text-field__emoji_picker-wrapper" @click="onShowPicker"></div>
      <VuemojiPicker @emojiClick="handleEmojiClick" :is-dark="true" :picker-style="emojiPickerStyle"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { VuemojiPicker, EmojiClickEventDetail, VuemojiPickerStyle } from 'vuemoji-picker'
import { defineProps, defineEmits, ref, computed, watch } from "vue";

const props = defineProps<{
  value?: string,
  placeholder?: string,
  withEmoji?: boolean,
}>();
const emits = defineEmits(['update:value', 'input-submit']);

const text = ref<string>();
const textarea = ref<HTMLElement>({} as HTMLElement);
const textareaValue = computed((): string => textarea.value?.innerText);

const isShowEmojiPicker = ref<boolean>(false);
const emojiPickerStyle = ref<VuemojiPickerStyle>({
  background: 'var(--input-background-color)',
  borderColor: 'var(--divider-color)',
  inputBorderColor: 'var(--divider-color)',
  outlineColor: 'var(--divider-color)',
  inputFontColor: 'var(--dark-title-color)',
  inputPlaceholderColor: 'var(--dark-title-color)',
} as VuemojiPickerStyle);

watch(() => props.value, (value) => {
  if(!value) {
    textarea.value.innerHTML = "";
    text.value = "";
  }
})

const onShowPicker = () => {
  isShowEmojiPicker.value = !isShowEmojiPicker.value;
}

const onChangeValue = () => {
  text.value = textareaValue.value.replace(/\n\n/g, "\n");
  if (text.value === "\n" || text.value === "") {
    text.value = "";
    textarea.value.innerHTML = "";
  }
  emits('update:value', textarea.value.innerText)
}

const handlePressingEnter = (event: KeyboardEvent) => {
  if (event.keyCode === 13 && !event.shiftKey) {
    event.preventDefault();
    submit();
  } else if (event.shiftKey && event.keyCode === 13) {
    event.preventDefault();
    const textLength = textarea.value?.innerHTML.length;
    const isEntered = textarea.value?.innerHTML
      .substr(textLength - 4, 4) == "<br>";
    textarea.value.innerText += !isEntered ? "\n\n" : "\n";
    setCaretPosition();
  }
};

const submit = () => {
  emits('input-submit', text.value);
  textarea.value.innerText = "";
}

const setCaretPosition = () => {
  const selection = window.getSelection();
  selection?.collapse(textarea.value.childNodes[textarea.value.childNodes.length - 1], 0);
}

function handleEmojiClick(detail: EmojiClickEventDetail) {
  textarea.value.innerText += detail.unicode;
  emits('update:value', textarea.value.innerText)
}
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

  &__wrapper {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &__emoji {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-self: flex-start;
    width: 32px;
    height: 100%;
    color: var(--popup-background-color);
    border-radius: 50%;
    font-size: 24px;
    padding-top: 4px;

    cursor: pointer;
    transition: all 0.5s;

    &_picker {
      position: absolute;
      bottom: 52px;
      right: -50px;
    }

    &_picker-wrapper {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }

  &__emoji:hover {
    transform: scale(0.85);
    transition: all 0.5s;
  }
}

.text-field::-webkit-scrollbar {
  display: none;
}

.text-field:focus {
  outline: none;
}

</style>