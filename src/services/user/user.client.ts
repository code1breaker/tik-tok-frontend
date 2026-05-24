import { USER_API } from "@/src/constants/api";
import api from "../../lib/api/client-api";
import { GetUserPostsIf } from "@/src/types/services/user.types";

export const getUserPosts = async (args: GetUserPostsIf) => {
  const { userId, sort } = args;
  const params = { sort };
  const url = `${USER_API.POST}/${userId}/posts`;
  const res = await api.get(url, { params });
  return res;
};
