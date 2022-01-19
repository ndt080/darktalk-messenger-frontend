<template>
  <div class="avatar">
    <img
      :src="link ? link : getImage(assetImage)"
      :width="width"
      :height="height"
      alt="avatar"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Avatar",
  props: {
    link: {
      type: String,
    },
    assetImage: {
      type: String,
      default: "avatar.png"
    },
    width: {
      type: String,
      default: "30"
    },
    height: {
      type: String,
      default: "30"
    }
  },
  methods: {
    getImage(image: string) {
      const images = require.context('@/assets/img/', false, /\.png$/)
      return images('./' + image + ".png")
    },
  }
});
</script>

<style lang="scss" scoped>
.avatar {
  font-size: 0;
  line-height: 0;

  img {
    border-radius: 50%;
  }
}
</style>