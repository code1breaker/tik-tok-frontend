"use client";
import { DEFAULT_PAGE_LIMIT } from "@/src/constants";
import { useAppDispatch, useAppSelector } from "@/src/hooks/store";
import {
  appendVideos,
  prependVideos,
  setActiveIndex,
  setVideos,
} from "@/src/lib/store/video-details-slice";
import * as userApi from "@/src/services/user/user.client";
import {
  LoadDirectionIf,
  VideosResIf,
  VideoDetailsFeedPropsIf,
} from "@/src/types/components/video-details/video-content.types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Feed from "../../common/feed";
import VideoVolumeBtn from "./video-volume-btn";

export default function VideoDetailsFeed({
  videos,
  startIndex = 0,
}: VideoDetailsFeedPropsIf) {
  const dispatch = useAppDispatch();
  const params = useParams();
  const videosData = useAppSelector((state) => state.videoDetails.videos);
  const [isVolumeEnable, setIsVolumeEnable] = useState(false);

  useEffect(() => {
    dispatch(setVideos(videos));
    dispatch(setActiveIndex(startIndex));
  }, [dispatch, videos]);

  const username = params.username as string;

  const loadMoreVideos = async ({
    direction,
  }: {
    direction: LoadDirectionIf;
  }) => {
    try {
      if (!videosData.length) return;
      const videoId =
        direction === "prev" ? videosData[0]._id : videosData[videosData.length - 1]?._id;

      const res = await userApi.getUserVideosByDirection({
        direction,
        username,
        videoId,
        limit: DEFAULT_PAGE_LIMIT,
      });
      const moreVideos = (res.data?.data ?? []) as VideosResIf[];

      if (direction === "prev") {
        dispatch(prependVideos(moreVideos));
      } else {
        dispatch(appendVideos(moreVideos));
      }
    } catch (error) {
      console.log("Load more videos error: ", error);
    }
  };

  const onSelect = (index: number) => {
    const selectedVideoId = videos[index]?._id;
    if (!selectedVideoId) return;

    window.history.replaceState(
      {},
      "",
      `/@${username}/video/${selectedVideoId}`,
    );
    dispatch(setActiveIndex(index));
  };

  if (!videos?.length) return;

  return (
    <>
      <Feed
        data={videos}
        startIndex={startIndex}
        onSelect={onSelect}
        loadMoreData={loadMoreVideos}
        isVolumeEnable={isVolumeEnable}
        showInteraction={false}
      />

      <VideoVolumeBtn
        isVolumeEnable={isVolumeEnable}
        onToggleVolume={() => setIsVolumeEnable((prev) => !prev)}
      />
    </>
  );
}
