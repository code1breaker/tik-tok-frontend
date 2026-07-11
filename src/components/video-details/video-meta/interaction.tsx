"use client";
import { MESSAGES } from "@/src/constants/messages";
import copyToClipboard from "@/src/helpers/copyToClipboard";
import { useAppSelector } from "@/src/hooks/store";
import * as videoApi from "@/src/services/video/video.client";
import { startTransition, useEffect, useOptimistic, useState } from "react";
import { BiSolidMessage } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { Item, ItemActions, ItemContent, ItemDescription } from "../../ui/item";

export default function VideoInteraction() {
  const [fullUrl, setFullUrl] = useState<string>("");
  const { videos, activeIndex } = useAppSelector((state) => state.videoDetails);
  const currentVideo = videos[activeIndex];

  const [video, setVideo] = useState({
    isLiked: false,
    likesCount: 0,
  });

  const [optimisticVideo, setOptimisticVideo] = useOptimistic(video);

  const handleLikeClick = async () => {
    startTransition(async () => {
      try {
        const next = {
          isLiked: !optimisticVideo.isLiked,
          likesCount:
            optimisticVideo.likesCount + (optimisticVideo.isLiked ? -1 : 1),
        };

        setOptimisticVideo(next);
        await videoApi.likeVideo({ videoId: currentVideo?._id });
        setVideo(next);
      } catch (error: any) {
        console.log("Error in like api", error);
        toast.error(
          MESSAGES[error?.data?.code as keyof typeof MESSAGES] ||
            MESSAGES.DEFAULT_MESSAGE,
        );
      }
    });
  };

  useEffect(() => {
    setFullUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (!currentVideo) return;
    setVideo({
      isLiked: currentVideo?.isLiked,
      likesCount: currentVideo?.stats.likes,
    });
  }, [currentVideo]);

  const handleCopy = () => {
    copyToClipboard(fullUrl);
  };

  return (
    <div className="px-4 space-y-4">
      <div className="flex gap-5">
        <div className="flex gap-2 items-center">
          <FaHeart
            className={`text-2xl text-muted-foreground cursor-pointer ${optimisticVideo.isLiked ? "text-primary" : ""}`}
            onClick={handleLikeClick}
          />
          <p className="text-muted-foreground">{optimisticVideo.likesCount}</p>
        </div>
        <div className="flex gap-2 items-center">
          <BiSolidMessage />
          <p className="text-muted-foreground">
            {currentVideo?.stats?.comments}
          </p>
        </div>
      </div>

      <Item variant="outline" className="flex">
        <ItemContent className="overflow-hidden">
          <ItemDescription className="text-ellipsis">{fullUrl}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant={"ghost"} onClick={handleCopy}>
            Copy link
          </Button>
        </ItemActions>
      </Item>
    </div>
  );
}
