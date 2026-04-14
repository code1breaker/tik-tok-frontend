import api from "@/src/lib/api";

export const signup = async ({ body }: any) => {
  const res = await api.post("/signup", { body });
  return res;
};
