import { UserIf } from "../../user.types";

export interface VideoContentParamsIf {
  username: string;
  videoId: string;
}

export interface GetVideoDataArgsIf extends VideoContentParamsIf {}

export interface VideosResIf {
  _id: string;
  user: UserIf;
  filename: string;
  duration: number;
  videoUrl: string;
  thumbnail: string;
  caption: string;
  visibility: "everyone" | "followers" | "private";
  status: "published" | "draft";
  hashtags: string[];
  isLiked: boolean;

  stats: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };

  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type LoadDirectionIf = "prev" | "next";

export interface VideoDetailsFeedPropsIf {
  videos: VideosResIf[];
  startIndex: number;
}
