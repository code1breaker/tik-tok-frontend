import { VIDEO_API } from "../../constants/api";
import api from "../../lib/api/client-api";

export interface UploadVideoIf {
  url?: string;
  filename?: string;
  duration?: number;
  caption?: string;
  thumbnail?: string;
  hashtags?: string[];
  visibility?: string;
  status?: string;
}
export interface UpdateUploadVideoIf {
  body: UploadVideoIf;
  videoId: string;
}

export const uploadVideo = async (body: UploadVideoIf) => {
  const res = await api.post(VIDEO_API.VIDEO, body);
  return res;
};

export const updateUploadVideo = async ({
  body,
  videoId,
}: UpdateUploadVideoIf) => {
  const endpoint = VIDEO_API.VIDEO + `/${videoId}`;
  const res = await api.patch(endpoint, body);
  return res;
};
