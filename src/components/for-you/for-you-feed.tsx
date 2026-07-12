"use client";
import { DEFAULT_PAGE_LIMIT } from "@/src/constants";
import { useAppSelector } from "@/src/hooks/store";
import * as feedApi from "@/src/services/feed/feed.client";
import { VideosResIf } from "@/src/types/components/video-details/video-content.types";
import { useEffect, useState } from "react";
import Feed from "../common/feed";
import ForYouDrawer from "./for-you-drawer";

export default function ForYouFeed({ videos }: { videos: VideosResIf[] }) {
  const [data, setData] = useState(videos ?? []);
  const [activeVideoId, setActiveVideoId] = useState(data[0]?._id);
  const [page, setPage] = useState(1);
  const newComment = useAppSelector((state) => state.videoComment.newComment);
  const [openDrawer, setOpenDrawer] = useState(false);

  const loadMoreVideos = async () => {
    try {
      if (!data.length) return;
      const nextPage = page + 1;
      const res = await feedApi.feed({
        limit: DEFAULT_PAGE_LIMIT,
        page: nextPage,
      });

      const nextVideos = res.data?.data ?? [];
      setPage(nextPage);
      setData((prevData) => {
        return [...prevData, ...nextVideos];
      });
    } catch (error) {
      console.log("Load more videos error: ", error);
    }
  };

  const onSelect = (index: number) => {
    const selectedVideoId = videos[index]?._id;
    if (!selectedVideoId) return;
    setActiveVideoId(selectedVideoId);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  useEffect(() => {
    setData((prevData) =>
      prevData.map((video) => {
        if (video._id === newComment.videoId) {
          return {
            ...video,
            stats: { ...video.stats, comments: video.stats.comments + 1 },
          };
        }
        return video;
      }),
    );
  }, [newComment]);

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center p-8">
        <Feed
          data={data}
          onSelect={onSelect}
          showVolumeBtn={true}
          loadMoreData={loadMoreVideos}
          enableLoadMorePreviousData={false}
          onCommentClick={handleOpenDrawer}
        />
      </div>
      <ForYouDrawer
        videoId={activeVideoId}
        openDrawer={openDrawer}
        onClose={handleOpenDrawer}
      />
    </>
  );
}
