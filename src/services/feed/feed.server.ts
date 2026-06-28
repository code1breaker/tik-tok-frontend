import serverApi from "@/src/lib/api/server-api";
import { FEED_API } from "../../constants/api";

export const feed = async (params: { page: number; limit: number }) => {
  const res = await serverApi.get(FEED_API.FEED, { params });
  return res;
};
