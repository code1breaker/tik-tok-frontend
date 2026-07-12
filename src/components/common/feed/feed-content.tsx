import useMediaOrientation from "@/src/hooks/use-media-orientation";
import { Card, CardContent } from "../../ui/card";
import { CarouselItem } from "../../ui/carousel";
import FeedInteractions from "./feed-interactions";
import { FeedContentPropsIf } from "@/src/types/components/common/feed.types";
import VideoPlayer from "../video-player";
import VideoVolumeBtn from "../../video-details/video-content/video-volume-btn";

export default function FeedContent({
  item,
  isActive,
  isVolumeEnable,
  setIsVolumeEnable,
  showVolumeBtn,
  showInteraction,
  onCommentClick,
}: FeedContentPropsIf) {
  const { imageOrientation } = useMediaOrientation({
    imgSrc: item?.thumbnail,
  });
  return (
    <CarouselItem className="h-full flex gap-4">
      <Card className="w-full h-full bg-black p-0">
        <CardContent className="flex justify-center items-center h-full p-0 relative">
          {/* Volume */}
          {showVolumeBtn && (
            <VideoVolumeBtn
              isVolumeEnable={isVolumeEnable}
              onToggleVolume={() => setIsVolumeEnable((prev) => !prev)}
              className="top-5 left-5 z-50"
            />
          )}

          {/* Thumbnail */}
          <div
            className={`w-full h-full bg-center bg-contain bg-no-repeat absolute top-0 right-0 ${imageOrientation === "landscape" ? "bg-contain" : "bg-cover"} `}
            style={{
              backgroundImage: `url(${item.thumbnail})`,
            }}
            draggable={false}
          />

          {/* Video */}
          {isActive && (
            <div className="w-full h-full absolute right-0">
              <VideoPlayer
                src={item.videoUrl}
                isVolumeEnable={isVolumeEnable}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {showInteraction && (
        <FeedInteractions
          item={item}
          className={`self-end`}
          onCommentClick={onCommentClick}
        />
      )}
    </CarouselItem>
  );
}
