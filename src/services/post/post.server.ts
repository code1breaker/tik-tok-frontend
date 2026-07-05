import { POST_API } from "@/src/constants/api";
import { GetPostCommentsIf } from "./post.client";
import serverApi from "@/src/lib/api/server-api";

export const getPostComments = async ({
  postId,
  params,
}: GetPostCommentsIf) => {
  const endpoint = POST_API.COMMENT + `/${postId}/comments`;
  const res = await serverApi.get(endpoint, { params });
  return res;
};
