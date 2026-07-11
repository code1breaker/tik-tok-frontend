import { VideosResIf } from "../components/video-details/video-content.types";

export interface VideoStateIf {
  videos: VideosResIf[] | [];
  activeIndex: number;
}
