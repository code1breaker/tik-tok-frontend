import axios from "axios";
import { UPLOAD_API } from "../../constants/api";
import api from "../../lib/api/client-api";
import formatBytes from "@/src/helpers/upload/formatBytes";

export const uploadSignature = async (params: {}) => {
  const res = await api.get(UPLOAD_API.SIGNATURE, { params });
  return res;
};

export const uploadToCloudinary = async ({
  url,
  body,
  onProgress,
}: {
  url: string;
  body: {
    file: File;
    folder: string;
    signature: string;
    api_key: string;
    timestamp: string;
  };
  onProgress?: ({
    progress,
    loaded,
    total,
  }: {
    progress: number;
    loaded: string;
    total: string;
  }) => void;
}) => {
  const { file, folder, signature, api_key, timestamp } = body;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);
  formData.append("signature", signature);
  formData.append("api_key", api_key);
  formData.append("timestamp", timestamp);

  const res = await axios.post(url, formData, {
    onUploadProgress: (progressEvent) => {
      const loaded = progressEvent.loaded;
      const total = progressEvent.total || 1;

      const percentCompleted = Math.round((loaded * 100) / total);

      onProgress?.({
        progress: percentCompleted,
        loaded: formatBytes({ bytes: loaded }),
        total: formatBytes({ bytes: total }),
      });
    },
  });
  return res;
};

export const deleteVideo = async (body: {
  publicId: string;
  resourceType: string;
}) => {
  const res = await api.delete(UPLOAD_API.DELETE_VIDEO, { data: body });
  return res;
};
