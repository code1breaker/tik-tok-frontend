import { USER_API } from "@/src/constants/api";
import api from "../../lib/api/client-api";
import {
  FollowUserIf,
  GetProfileByUsernameIf,
  GetUserVideosByDirectionIf,
  GetUserVideosByIdIf,
  GetUserVideosIf,
} from "@/src/types/services/user.types";

export const getProfileByUsername = async (args: GetProfileByUsernameIf) => {
  const { username } = args;
  const url = `${USER_API.USER}/${username}`;
  const res = await api.get(url);
  return res;
};

export const getUserVideos = async (args: GetUserVideosIf) => {
  const { username, sort, page, limit } = args;
  const params = { sort, page, limit };
  const url = `${USER_API.VIDEO}/${username}/videos`;
  const res = await api.get(url, { params });
  return res;
};

export const getFollowers = async (args: GetUserVideosIf) => {
  const { username, page, limit } = args;
  const params = { page, limit };
  const url = `${USER_API.VIDEO}/${username}/followers`;
  const res = await api.get(url, { params });
  return res;
};

export const getFollowing = async (args: GetUserVideosIf) => {
  const { username } = args;
  const params = {};
  const url = `${USER_API.VIDEO}/${username}/following`;
  const res = await api.get(url, { params });
  return res;
};

export const followUser = async (args: FollowUserIf) => {
  const { userId } = args;
  const url = `${USER_API.FOLLOW}/${userId}/follow`;
  const res = await api.patch(url);
  return res;
};

export const unFollowUser = async (args: FollowUserIf) => {
  const { userId } = args;
  const url = `${USER_API.FOLLOW}/${userId}/follow`;
  const res = await api.delete(url);
  return res;
};

export const getUserVideosById = async (args: GetUserVideosByIdIf) => {
  const { username, videoId } = args;
  const url = `${USER_API.VIDEO}/${username}/videos/${videoId}`;
  const res = await api.get(url);
  return res;
};

export const getUserVideosByDirection = async (
  args: GetUserVideosByDirectionIf,
) => {
  const { username, direction, videoId, page, limit } = args;
  const params = { page, limit };
  const url = `${USER_API.VIDEO}/${username}/videos/${videoId}/${direction}`;
  const res = await api.get(url, { params });
  return res;
};
