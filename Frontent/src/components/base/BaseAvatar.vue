<template>
  <div class="avatar title-semi-12 unselectable" :class="styleClass">
    <template v-if="props.type === 'image'">
      <img
        class="avatar__image"
        :src="props.url ? props.url : getImage(props.assetImage)"
        :style="componentStyle"
        alt="avatar"
      />
    </template>
    <template v-else-if="props.type === 'alias'">
      <div class="avatar__text" :style="componentStyle" ref="avatarTextBlock">
        <span class="avatar__text-img">{{ avatarAlias }}</span>
      </div>
    </template>
    <template v-else-if="props.type === 'text'">
      <div class="avatar__text" :style="componentStyle" ref="avatarTextBlock">
        <span class="avatar__text-img">{{ props.text }}</span>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, ref, computed, onMounted } from "vue";
import { BaseAvatarType, BaseAvatarVariant } from "@/core/consts/base";

interface BaseAvatarProps {
  type?: BaseAvatarType,
  variant?: BaseAvatarVariant,
  url?: string,
  text?: string,
  assetImage?: string,
  width?: string,
  height?: string,
}

const props = withDefaults(defineProps<BaseAvatarProps>(), {
  type: "alias",
  variant: "circle",
  text: "Current user",
  assetImage: "avatar",
  width: "30px",
  height: "30px"
});

const avatarTextBlock = ref<HTMLElement>();
const avatarAlias = ref(getTextAlias(props.text));
const styleClass = ref(`${getStyleClass(props.text)} avatar--${props.variant}`);
const componentStyle = computed(() => ({
  "min-width": props.width,
  "min-height": props.height
}));

onMounted(() => {
  const textBlock =  avatarTextBlock.value as HTMLElement;
  const width = textBlock?.offsetWidth as number;
  if(width > 30) textBlock.style.fontSize = `${width * 0.4}px`;
});

function getStyleClass(text: string): string {
  if (new RegExp("^[a-fA-Fа-жА-Ж]").test(text)) return "avatar--primary";
  if (new RegExp("^[g-lG-lз-оЗ-О]").test(text)) return "avatar--warning";
  if (new RegExp("^[m-rM-Rп-цП-Ц]").test(text)) return "avatar--danger";
  if (new RegExp("^[s-zS-Zч-яЧ-Я]").test(text)) return "avatar--success";

  return "avatar--secondary";
}

function getTextAlias(text: string): string {
  const nameParts = text.split(" ");

  return nameParts.length > 1
    ? `${nameParts[0][0].toUpperCase()}${nameParts[1][0].toUpperCase()}`
    : nameParts[0].slice(0, 2).toUpperCase();
}

function getImage(imageName: string) {
  const images = require.context("@/assets/img/", false, /\.png$/);
  return images("./" + imageName + ".png");
}
</script>

<style lang="scss" scoped>
.avatar {
  min-height: 30px;
  min-width: 30px;
  line-height: 0;

  img {
    font-size: 0;
  }

  &__text {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-collapse: collapse;
    font-size: 100%;

    &-img {
      color: var(--main-title-color);
    }
  }
}

.avatar.avatar--rounded-square {
  img {
    border-radius: 30%;
  }

  .avatar__text {
    border-radius: 30%;
  }
}

.avatar.avatar--circle {
  img {
    border-radius: 50%;
  }

  .avatar__text {
    border-radius: 50%;
  }
}

.avatar.avatar--primary .avatar__text {
  background-color: rgba($primary-color, 0.7);
}

.avatar.avatar--warning .avatar__text {
  background-color: rgba($warning-color, 0.8);
}

.avatar.avatar--danger .avatar__text {
  background-color: rgba($danger-color, 0.9);
}

.avatar.avatar--success .avatar__text {
  background-color: rgba($success-color, 0.9);
}

.avatar.avatar--secondary .avatar__text {
  background-color: var(--message-background-color);

  .avatar__text-img {
    color: var(--second-title-color);
  }
}
</style>