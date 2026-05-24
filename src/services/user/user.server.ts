import { USER_API } from "@/src/constants/api";
import serverApi from "@/src/lib/api/server-api";
import {
  GetProfileByIdIf,
  GetUserPostsIf,
} from "@/src/types/services/user.types";

export const getProfileById = async (args: GetProfileByIdIf) => {
  const { userId } = args;
  const url = `${USER_API.USER}/${userId}`;
  const res = await serverApi.get(url);
  return res;
};

export const getUserPosts = async (args: GetUserPostsIf) => {
  const { userId } = args;
  const url = `${USER_API.POST}/${userId}/posts`;
  const res = await serverApi.get(url);
  return res;
};
