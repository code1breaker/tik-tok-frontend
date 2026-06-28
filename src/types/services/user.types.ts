import { FilterTy } from "../components/profile.types";
export interface GetProfileByUsernameIf {
  username: string | number;
}

export interface GetUserPostsIf {
  username: string;
  sort?: FilterTy;
  page?: number;
  limit?: number;
  postId?: string;
  direction?: "prev" | "next";
}

export interface FollowUserIf {
  userId: string;
}
