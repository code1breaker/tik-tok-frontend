import { FEED_API } from "../constants/api";
import api from "../lib/api";

export const feed = async (params: { page: number; limit: number }) => {
  const res = await api.get(FEED_API.FEED, { params });
  return res;
};
