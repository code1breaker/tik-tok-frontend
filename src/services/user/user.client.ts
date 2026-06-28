import { USER_API } from "@/src/constants/api";
import api from "../../lib/api/client-api";
import {
  FollowUserIf,
  GetProfileByUsernameIf,
  GetUserPostsIf,
} from "@/src/types/services/user.types";

export const getProfileByUsername = async (args: GetProfileByUsernameIf) => {
  const { username } = args;
  const url = `${USER_API.USER}/${username}`;
  const res = await api.get(url);
  return res;
};

export const getUserPosts = async (args: GetUserPostsIf) => {
  const { username, sort, page, limit } = args;
  const params = { sort, page, limit };
  const url = `${USER_API.POST}/${username}/posts`;
  const res = await api.get(url, { params });
  return res;
};

export const getFollowers = async (args: GetUserPostsIf) => {
  const { username, page, limit } = args;
  const params = { page, limit };
  const url = `${USER_API.POST}/${username}/followers`;
  const res = await api.get(url, { params });
  return res;
};

export const getFollowing = async (args: GetUserPostsIf) => {
  const { username } = args;
  const params = {};
  const url = `${USER_API.POST}/${username}/following`;
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

export const getUserPostsById = async (args: GetUserPostsIf) => {
  const { username, postId } = args;
  const url = `${USER_API.POST}/${username}/posts/${postId}`;
  const res = await api.get(url);
  return res;
};

export const getUserPostsByDirection = async (args: GetUserPostsIf) => {
  const { username, direction, postId, page, limit } = args;
  const params = { page, limit };
  const url = `${USER_API.POST}/${username}/posts/${postId}/${direction}`;
  const res = await api.get(url, { params });
  return res;
};
