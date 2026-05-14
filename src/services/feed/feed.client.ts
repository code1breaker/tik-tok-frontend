import { GetProfileFeedIf } from "@/src/types/services/feed,types";
import { FEED_API } from "../../constants/api";
import api from "../../lib/api/client-api";

export const feed = async (params: { page: number; limit: number }) => {
  const res = await api.get(FEED_API.FEED, { params });
  return res;
};

export const getProfileFeed = async (args: GetProfileFeedIf) => {
  const { userId, sort } = args;
  const params = { sort };
  const url = `${FEED_API.FEED}/${userId}`;
  const res = await api.get(url, { params });
  return res;
};
