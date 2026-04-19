import axios from "axios";
import env from "./env";

const api = axios.create({
  baseURL: env.API_BASE_URL,
  withCredentials: true,
  headers: {
    "content-type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  console.log("Api Url: ", config.url);
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error.response);
  },
);

export default api;
