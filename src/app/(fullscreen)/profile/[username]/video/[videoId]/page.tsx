import VideoContent from "@/src/components/video-details/video-content";
import VideoSidebar from "@/src/components/video-details/video-sidebar";
import { VideoDetailsPagePropsIf } from "@/src/types/page/video-details-page.types";

export default async function VideoDetailsPage({
  params,
}: VideoDetailsPagePropsIf) {
  const paramsRes = await params;

  return (
    <div className="h-screen flex gap-4">
      <div className="w-[65%]">
        <VideoContent params={paramsRes} />
      </div>
      <div className="w-[35%] bg-black">
        <VideoSidebar />
      </div>
    </div>
  );
}
