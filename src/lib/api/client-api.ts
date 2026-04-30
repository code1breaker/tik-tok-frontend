import axios from "axios";
import env from "../env";

const clientApi = axios.create({
  baseURL: env.API_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processedQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

clientApi.interceptors.request.use(async (config) => {
  console.log("Api Url: ", config.url);
  console.log("Api Params: ", config.params);
  return config;
});

clientApi.interceptors.response.use(
  (response) => {
    console.log(response, "response");
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => clientApi(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await clientApi.get("/api/auth/refresh-token");
        processedQueue(null);
        return clientApi(originalRequest);
      } catch (error) {
        processedQueue(error);
        return Promise.reject(error);
      } finally {
        isRefreshing = true;
      }
    }
    return Promise.reject(error.response);
  },
);

export default clientApi;
