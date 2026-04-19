import { FEED_API } from "../constants/api";
import api from "../lib/api";

export const feed = async () => {
  const res = await api.get(FEED_API.FEED);
  return res;
};
