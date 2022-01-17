import axios from "axios/index";

const api = axios.create({
  baseURL: `https://fakemessenger.herokuapp.com/api`,
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;