<template>
  <div class="google-login" ref="googleBtn">
    <img
      class="google-login__img"
      src="@/assets/img/icons/google.svg"
      alt="google"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useStore } from "@/store";
import { RouterPaths } from "@/core/consts/router-paths.enum";
import { useRouter } from "vue-router";


const store = useStore();
const router = useRouter();
const googleBtn = ref();

onMounted(() => {
  // eslint-disable-next-line no-undef
  gapi.load("auth2", () => {
    const client = getAuthClient(process.env.VUE_APP_GOOGLE_CLIENT_ID);

    client.attachClickHandler(googleBtn.value,
      { ux_mode: "popup" },
      handleSuccessAuth,
      handleFailureAuth,
    )
  });
});

function getAuthClient(client_id: string) {
  return window.gapi.auth2.init({ client_id });
}

// eslint-disable-next-line no-undef
function handleSuccessAuth(response: gapi.auth2.GoogleUser) {
  const { access_token } = response.getAuthResponse(true);
  store.dispatch("googleLogin", access_token).then(() => {
    router.push(`/${RouterPaths.HOME}`);
  });
}

function handleFailureAuth(error: string) {
  console.log(error)
}
</script>

<style lang="scss" scoped>
.google-login {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: var(--second-background-color);
  cursor: pointer;
  transition: all 0.5s;

  &__img {
    width: 16px;
    height: 16px;
  }
}

.google-login:hover {
  background-color: var(--popup-background-color);
  transform: scale(1.25);
  transition: all 0.5s;
}
</style>
