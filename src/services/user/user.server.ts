import { USER_API } from "@/src/constants/api";
import serverApi from "@/src/lib/api/server-api";
import {
  GetProfileByUsernameIf,
  GetUserPostsIf,
} from "@/src/types/services/user.types";

export const getProfileByUsername = async (args: GetProfileByUsernameIf) => {
  const { username } = args;
  const url = `${USER_API.USER}/${username}`;
  const res = await serverApi.get(url);
  return res;
};

export const getUserPosts = async (args: GetUserPostsIf) => {
  const { username } = args;
  const url = `${USER_API.POST}/${username}/posts`;
  const res = await serverApi.get(url);
  return res;
};

export const getUserPostsById = async (args: GetUserPostsIf) => {
  const { username, postId } = args;
  const url = `${USER_API.POST}/${username}/posts/${postId}`;
  const res = await serverApi.get(url);
  return res;
};

export const getUserPostsByDirection = async (args: GetUserPostsIf) => {
  const { username, direction, postId, page, limit } = args;
  const params = { page, limit };
  const url = `${USER_API.POST}/${username}/posts/${postId}/${direction}`;
  const res = await serverApi.get(url, { params });
  return res;
};
