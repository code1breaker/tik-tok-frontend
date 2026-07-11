import { USER_API } from "@/src/constants/api";
import serverApi from "@/src/lib/api/server-api";
import {
  GetProfileByUsernameIf,
  GetUserVideosByDirectionIf,
  GetUserVideosByIdIf,
  GetUserVideosIf,
} from "@/src/types/services/user.types";

export const getProfileByUsername = async (args: GetProfileByUsernameIf) => {
  const { username } = args;
  const url = `${USER_API.USER}/${username}`;
  const res = await serverApi.get(url);
  return res;
};

export const getUserVideos = async (args: GetUserVideosIf) => {
  const { username } = args;
  const url = `${USER_API.VIDEO}/${username}/videos`;
  const res = await serverApi.get(url);
  return res;
};

export const getUserVideosById = async (args: GetUserVideosByIdIf) => {
  const { username, videoId } = args;
  const url = `${USER_API.VIDEO}/${username}/videos/${videoId}`;
  const res = await serverApi.get(url);
  return res;
};

export const getUserVideosByDirection = async (
  args: GetUserVideosByDirectionIf,
) => {
  const { username, direction, videoId, page, limit } = args;
  const params = { page, limit };
  const url = `${USER_API.VIDEO}/${username}/videos/${videoId}/${direction}`;
  const res = await serverApi.get(url, { params });
  return res;
};
