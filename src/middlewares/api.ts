import axios from "axios/index";

const api = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;