import { FilterTy } from "../components/profile.types";

export interface GetProfileFeedIf {
  userId: string;
  sort?: FilterTy;
  page?: number;
  limit?: number;
}
