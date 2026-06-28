import VideoMeta from "../video-meta";
import VideoInteraction from "../video-meta/interaction";
import VideoDetailsTab from "./video-details-tab";

export default function VideoSidebar() {
  return (
    <div className="h-screen flex flex-col space-y-4">
      <VideoMeta />
      <VideoInteraction />
      <VideoDetailsTab />
    </div>
  );
}
