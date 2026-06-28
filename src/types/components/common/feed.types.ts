import { PostsResIf } from "../video-details/video-content.types";

export interface SlidesIf {
  _id: string;
  videoUrl: string;
}

export type LoadDirectionIf = "prev" | "next";

export interface FeedPropsIf<T> {
  data: T[];
  onSelect?: (index: number) => void;
  startIndex?: number;
  loadMoreData?: (args: { direction: LoadDirectionIf }) => Promise<void> | void;
  isVolumeEnable?: boolean;
}

export interface FeedItemIf extends PostsResIf {}
