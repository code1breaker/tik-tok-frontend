import axios from "axios";
import env from "./env";

const api = axios.create({
  baseURL: env.API_BASE_URL,
  headers: {
    "content-type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  console.log("Api Url: ", config.url);
  return config;
});

api.interceptors.response.use((config) => {
  return config;
});

export default api;
