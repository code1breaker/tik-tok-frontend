import { PostsResIf } from "../components/video-details/video-content.types";

export interface VideoStateIf {
  videos: PostsResIf[] | [];
  activeIndex: number;
}
