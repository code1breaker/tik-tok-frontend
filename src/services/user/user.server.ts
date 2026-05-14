import { USER_API } from "@/src/constants/api";
import serverApi from "@/src/lib/api/server-api";
import { GetProfileByIdIf } from "@/src/types/services/user.types";

export const getProfileById = async (args: GetProfileByIdIf) => {
  const { userId } = args;
  const url = `${USER_API.USER}/${userId}`;
  const res = await serverApi.get(url);
  return res;
};
