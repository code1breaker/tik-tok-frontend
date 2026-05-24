import { FilterTy } from "../components/profile.types";
export interface GetProfileByIdIf {
  userId: string | number;
}

export interface GetUserPostsIf {
  userId: string;
  sort?: FilterTy;
  page?: number;
  limit?: number;
}
