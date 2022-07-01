<template>
  <div class="app-loader">
    <div class="app-loader__container">
      <div class="app-loader__shadow"></div>
      <div class="app-loader__box"></div>
      <div class="app-loader__text">Loading...</div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@keyframes loader {
  0% { left: -100px }
  100% { left: 110%; }
}

@keyframes animate {
  17% { border-bottom-right-radius: 3px; }
  25% { transform: translateY(9px) rotate(22.5deg); }
  50% {
    transform: translateY(18px) scale(1,.9) rotate(45deg) ;
    border-bottom-right-radius: 40px;
  }
  75% { transform: translateY(9px) rotate(67.5deg); }
  100% { transform: translateY(0) rotate(90deg); }
}

@keyframes shadow {
  50% {
    transform: scale(1.2,1);
  }
}

@keyframes text {
  50% {
    opacity: 0.5;
  }
}

.app-loader {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  &__container {
    position: absolute;
    top: calc(50% - 20px);
    left: calc(50% - 20px);
  }

  &__box {
    width: 50px;
    height: 50px;
    background: var(--popup-background-color);
    animation: animate .5s linear infinite;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 3px;
  }

  &__text {
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translateX(-10%);
    color: var(--second-title-color);
    animation: text 3s linear infinite;
  }

  &__shadow {
    width: 50px;
    height: 5px;
    background: var(--second-title-color);
    opacity: 0.1;
    position: absolute;
    top: 59px;
    left: 0;
    border-radius: 50%;
    animation: shadow .5s linear infinite;
  }
}

</style>
