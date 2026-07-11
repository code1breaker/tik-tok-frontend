import { VIDEO_API } from "@/src/constants/api";
import { GetVideoCommentsIf } from "./video.client";
import serverApi from "@/src/lib/api/server-api";

export const getVideoComments = async ({
  videoId,
  params,
}: GetVideoCommentsIf) => {
  const endpoint = VIDEO_API.COMMENT + `/${videoId}/comments`;
  const res = await serverApi.get(endpoint, { params });
  return res;
};
