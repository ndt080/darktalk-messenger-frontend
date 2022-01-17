import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store"

import setupApiInterceptor from "@/services/api/setup-api-interceptor.service";
import "./registerServiceWorker";

import 'mosha-vue-toastify/dist/style.css';

setupApiInterceptor();

createApp(App).use(store, key).use(router).mount("#app");
