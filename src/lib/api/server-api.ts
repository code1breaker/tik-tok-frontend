import axios from "axios";
import env from "../env";
import { cookies } from "next/headers";

const serverApi = axios.create({
  // baseURL: env.APP_BASE_URL + `/api/backend`,
  baseURL: env.API_BASE_URL,
  withCredentials: true,
});

serverApi.interceptors.request.use(async (config) => {
  console.log("Api Url: ", config.url);
  console.log("Api Params: ", config.params);

  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  config.headers = config.headers ?? {};
  config.headers.Cookie = cookieHeader;

  return config;
});

serverApi.interceptors.response.use(
  (response) => {
    console.log(response.data, "response data");
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await serverApi.get("/api/auth/refresh-token");
        const { accessToken, refreshToken } = res.data?.data;

        originalRequest.headers.Cookie = `accessToken=${accessToken}; refreshToken=${refreshToken}`;

        return axios(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default serverApi;
