import { FilterTy } from "../components/profile.types";
export interface GetProfileByUsernameIf {
  username: string;
}

export interface GetUserVideosIf {
  username: string;
  sort: FilterTy;
  page: number;
  limit: number;
}

export interface GetUserVideosByIdIf {
  username: string;
  videoId: string;
}

export interface GetUserVideosByDirectionIf {
  username: string;
  direction: string;
  videoId: string;
  page?: number;
  limit: number;
}

export interface VideosIf {
  username: string;
  sort?: FilterTy;
  page?: number;
  limit?: number;
  videoId?: string;
  direction?: "prev" | "next";
}

export interface FollowUserIf {
  userId: string;
}
