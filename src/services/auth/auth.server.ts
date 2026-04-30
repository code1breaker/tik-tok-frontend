import { AUTH_API } from "../../constants/api";
import serverApi from "../../lib/api/server-api";

export const profile = async () => {
  const res = await serverApi.get(AUTH_API.PROFILE);
  return res;
};
