import { VideosResIf } from "../video-details/video-content.types";

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
  showInteraction?: boolean;
  onCommentClick?: () => void;
}

export interface FeedItemIf extends VideosResIf {}

export interface FeedContentPropsIf {
  item: FeedItemIf;
  showInteraction?: boolean;
  isActive: boolean;
  isVolumeEnable: boolean;
  onCommentClick?: () => void;
}

export interface FeedInteractionsPropsIf {
  item: FeedItemIf;
  className: string;
  onCommentClick?: () => void;
}
