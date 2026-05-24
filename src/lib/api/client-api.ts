import axios from "axios";
import env from "../env";
import { getSession } from "next-auth/react";

const clientApi = axios.create({
  baseURL: env.API_BASE_URL,
  withCredentials: true,
});

clientApi.interceptors.request.use(async (config) => {
  console.log("Api Url: ", config.url);
  console.log("Api Params: ", config.params);

  const session = await getSession();
  const { accessToken } = session || {};

  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

clientApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error.response);
  },
);

export default clientApi;
