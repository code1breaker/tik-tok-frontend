import { VIDEO_API } from "../../constants/api";
import api from "../../lib/api/client-api";

export interface CreateVideoIf {
  url?: string;
  filename?: string;
  duration?: number;
  caption?: string;
  thumbnail?: string;
  hashtags?: string[];
  visibility?: string;
  status?: string;
}
export interface UpdateVideoIf {
  body: CreateVideoIf;
  videoId: string;
}
export interface GetVideoCommentsIf {
  params: { page: number; limit: number };
  videoId: string;
}
export interface GetVideoRepliesIf {
  params: { page: number; limit: number };
  commentId: string;
}
export interface AddVideoCommentsIf {
  body: { message: string; parentId?: string };
  videoId: string;
}

export interface LikeVideoIf {
  videoId: string;
}

export const createVideo = async (body: CreateVideoIf) => {
  const res = await api.post(VIDEO_API.VIDEO, body);
  return res;
};

export const updateVideo = async ({ body, videoId }: UpdateVideoIf) => {
  const endpoint = VIDEO_API.VIDEO + `/${videoId}`;
  const res = await api.patch(endpoint, body);
  return res;
};

export const getVideoComments = async ({
  videoId,
  params,
}: GetVideoCommentsIf) => {
  const endpoint = VIDEO_API.COMMENT + `/${videoId}/comments`;
  const res = await api.get(endpoint, { params });
  return res;
};

export const getVideoReplies = async ({
  commentId,
  params,
}: GetVideoRepliesIf) => {
  const endpoint = VIDEO_API.COMMENT + `/comments/${commentId}/replies`;
  const res = await api.get(endpoint, { params });
  return res;
};

export const addVideoComments = async ({
  videoId,
  body,
}: AddVideoCommentsIf) => {
  const endpoint = VIDEO_API.COMMENT + `/${videoId}/comments`;
  const res = await api.post(endpoint, body);
  return res;
};

export const likeVideo = async ({ videoId }: LikeVideoIf) => {
  const endpoint = VIDEO_API.LIKE + `/${videoId}/like`;
  const res = await api.post(endpoint);
  return res;
};
