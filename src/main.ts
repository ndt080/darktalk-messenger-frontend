import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";

import setupTokenInterceptor  from "@/middlewares/token.interceptor";
import "./registerServiceWorker";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.min";
import "mosha-vue-toastify/dist/style.css";
import "@/assets/styles/icons.scss";


setupTokenInterceptor();

const app = createApp(App);
app.use(store, key);
app.use(router);
app.mount("#app");


