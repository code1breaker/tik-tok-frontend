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

export const createPost = async (body: CreatePostIf) => {
  const res = await api.post(POST_API.POST, body);
  return res;
};

export const updatePost = async ({ body, postId }: UpdatePostIf) => {
  const endpoint = POST_API.POST + `/${postId}`;
  const res = await api.patch(endpoint, body);
  return res;
};
