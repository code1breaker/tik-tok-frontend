"use client";
import { DEFAULT_PAGE_LIMIT } from "@/src/constants";
import * as feedApi from "@/src/services/feed/feed.client";
import { PostsResIf } from "@/src/types/components/video-details/video-content.types";
import { useState } from "react";
import Feed from "../common/feed";
import ForYouDrawer from "./for-you-drawer";

export default function ForYouFeed({ posts }: { posts: PostsResIf[] }) {
  const [videos, setVideos] = useState(posts ?? []);
  const [activeVideoId, setActiveVideoId] = useState(videos[0]?._id);
  const [openDrawer, setOpenDrawer] = useState(false);

  const loadMoreVideos = async ({}: { direction: string }) => {
    try {
      if (!videos.length) return;
      const res = await feedApi.feed({
        limit: DEFAULT_PAGE_LIMIT,
        page: 1,
      });
      const nextVideos = res.data?.data ?? [];

      setVideos((prevVideos) => {
        return [...prevVideos, ...nextVideos];
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

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center p-8">
        <Feed
          data={posts}
          onSelect={onSelect}
          loadMoreData={loadMoreVideos}
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
