import { POST_API } from "../../constants/api";
import api from "../../lib/api/client-api";

export interface CreatePostIf {
  url?: string;
  filename?: string;
  duration?: number;
  caption?: string;
  thumbnail?: string;
  hashtags?: string[];
  visibility?: string;
  status?: string;
}
export interface UpdatePostIf {
  body: CreatePostIf;
  postId: string;
}
export interface GetPostCommentsIf {
  params: { page: number; limit: number };
  postId: string;
}
export interface GetPostRepliesIf {
  params: { page: number; limit: number };
  commentId: string;
}
export interface AddPostCommentsIf {
  body: { message: string; parentId?: string };
  postId: string;
}

export const createPost = async (body: CreatePostIf) => {
  const res = await api.post(POST_API.POST, body);
  return res;
};

export const updatePost = async ({ body, postId }: UpdatePostIf) => {
  const endpoint = POST_API.POST + `/${postId}`;
  const res = await api.patch(endpoint, body);
  return res;
};

export const getPostComments = async ({
  postId,
  params,
}: GetPostCommentsIf) => {
  const endpoint = POST_API.COMMENT + `/${postId}/comments`;
  const res = await api.get(endpoint, { params });
  return res;
};

export const getPostReplies = async ({
  commentId,
  params,
}: GetPostRepliesIf) => {
  const endpoint = POST_API.COMMENT + `/comments/${commentId}/replies`;
  const res = await api.get(endpoint, { params });
  return res;
};

export const addPostComments = async ({ postId, body }: AddPostCommentsIf) => {
  const endpoint = POST_API.COMMENT + `/${postId}/comments`;
  const res = await api.post(endpoint, body);
  return res;
};
