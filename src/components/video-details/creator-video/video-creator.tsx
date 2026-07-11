"use client";
import { DEFAULT_PAGE_LIMIT } from "@/src/constants";
import { useAppDispatch, useAppSelector } from "@/src/hooks/store";
import {
  appendVideos,
  prependVideos,
} from "@/src/lib/store/video-details-slice";
import * as userApi from "@/src/services/user/user.client";
import { VideosResIf } from "@/src/types/components/video-details/video-content.types";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import VideoCard from "../../profile/profile-content/video-card";

export default function VideoCreator() {
  const params = useParams();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState({
    isAtTop: false,
    isAtBottom: false,
  });
  const [hasMoreNextData, setHasMoreNextData] = useState(true);
  const [hasMorePrevData, setHasMorePrevData] = useState(true);

  const { videos, activeIndex } = useAppSelector((state) => state.videoDetails);
  const dispatch = useAppDispatch();
  const currentVideo = videos[activeIndex];
  const videoId = currentVideo?._id;
  const username = params.username as string;

  const maskClass = scrollPos?.isAtTop
    ? "[mask-image:linear-gradient(to_top,transparent,black_20px)]"
    : scrollPos?.isAtBottom
      ? "[mask-image:linear-gradient(to_bottom,transparent,black_20px)]"
      : "[mask-image:linear-gradient(to_bottom,transparent,black_20px,black_calc(100%-20px),transparent)]";

  const loadMoreNextData = async ({
    isAtTop,
    isAtBottom,
  }: {
    isAtTop: boolean;
    isAtBottom: boolean;
  }) => {
    try {
      if (!videos.length) return;

      if (!isAtTop && !isAtBottom) return;
      if (isAtTop && !hasMorePrevData) return;
      if (isAtBottom && !hasMoreNextData) return;

      const direction = isAtTop ? "prev" : isAtBottom ? "next" : "next";

      const videoId =
        direction === "prev" ? videos[0]._id : videos[videos.length - 1]?._id;

      const res = await userApi.getUserVideosByDirection({
        direction,
        username,
        videoId,
        limit: DEFAULT_PAGE_LIMIT,
      });
      const moreVideos = (res.data?.data ?? []) as VideosResIf[];
      if (moreVideos?.length !== DEFAULT_PAGE_LIMIT) {
        isAtBottom && setHasMoreNextData(false);
        isAtTop && setHasMorePrevData(false);
      }

      if (direction === "prev") {
        dispatch(prependVideos(moreVideos));
      } else {
        dispatch(appendVideos(moreVideos));
      }
    } catch (error) {
      console.log("Load more videos error: ", error);
    }
  };

  useEffect(() => {
    const scroll = scrollRef?.current;
    if (!scroll) return;
    if (hasMoreNextData) scroll.scrollTop = 20;

    const handleScroll = (e: Event) => {
      if (!e.currentTarget) return;
      const target = e.currentTarget as HTMLDivElement;
      const isAtTop = target.scrollTop === 0;
      const isAtBottom =
        Math.ceil(scroll.scrollTop + scroll.clientHeight) ===
        scroll.scrollHeight;

      loadMoreNextData({ isAtTop, isAtBottom });
      setScrollPos({ isAtTop, isAtBottom });
    };

    scroll.addEventListener("scroll", handleScroll);
    return () => scroll.removeEventListener("scroll", handleScroll);
  }, [videos, hasMoreNextData]);

  useEffect(() => {
    const videoCard = document.getElementById(`${videoId}`);
    if (!videoCard) return;
    videoCard?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="flex flex-col h-full px-4 py-4">
      <div
        ref={scrollRef}
        className={`overflow-auto hide-scrollbar 
          ${maskClass} mask-size-[100%] mask-no-repeat`}
      >
        <div className={`grid grid-cols-3 gap-4`}>
          {videos?.map((video) => (
            <VideoCard key={video._id} className="h-56 relative" video={video}>
              {video._id === currentVideo?._id && (
                <div
                  id={video._id}
                  className="absolute top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-xl"
                >
                  <p>Now playing</p>
                </div>
              )}
            </VideoCard>
          ))}
        </div>
      </div>
    </div>
  );
}
