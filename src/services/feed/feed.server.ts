import { FEED_API } from "@/src/constants/api";
import serverApi from "@/src/lib/api/server-api";
import { GetProfileFeedIf } from "@/src/types/services/feed,types";

export const getProfileFeed = async (args: GetProfileFeedIf) => {
  const { userId } = args;
  const url = `${FEED_API.FEED}/${userId}`;
  const res = await serverApi.get(url);
  return res;
};
