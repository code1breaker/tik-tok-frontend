import { auth } from "@/src/auth";
import axios from "axios";
import env from "../env";

const serverApi = axios.create({
  baseURL: env.API_BASE_URL,
  withCredentials: true,
});

serverApi.interceptors.request.use(async (config) => {
  // console.log("Api Url: ", config.url);
  // console.log("Api Params: ", config.params);

  const session = await auth();
  const { accessToken } = session || {};

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

serverApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

export default serverApi;
