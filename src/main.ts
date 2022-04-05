import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";

import VueGapi from 'vue-gapi';

import setupApiInterceptor from "@/services/api/setup-api-interceptor.service";
import "./registerServiceWorker";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.min";
import "mosha-vue-toastify/dist/style.css";
import "@/assets/styles/icons.scss";

setupApiInterceptor();

const app = createApp(App);
app.use(store, key);
app.use(router);
app.mount("#app");

app.use(VueGapi, {
  apiKey: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  clientId: `${process.env.VUE_APP_GOOGLE_SECRET_KEY}.apps.googleusercontent.com`,
  discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  scope: 'https://www.googleapis.com/auth/spreadsheets',
})
