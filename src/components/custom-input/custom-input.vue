<template>
  <div class="custom-input">
    <slot :styleClass="styleClass"></slot>
    <div class="custom-input__icon"></div>
  </div>
  <div class="error__message">{{ message }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "custom-input",
  data() {
    return {
      // styleClass: ""
    }
  },
  props: {
    isValid: Boolean,
    message: String
  },
  computed: {
    styleClass(): string {
      console.log(this.isValid)
      if(this.isValid == undefined) return "";
      return this.isValid ? "input--success" : "input--error";
    }
  },
  watch: {
    isValid: {
      immediate: true,
      handler (val, oldVal) {
        console.log("asdasd")
        // if(value == undefined) return;
        // this.styleClass = value ? "input--success" : "input--error";
      }
    }
  },
});
</script>

<style lang="scss" scoped>
.custom-input {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
</style>