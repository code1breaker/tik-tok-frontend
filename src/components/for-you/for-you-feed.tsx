"use client";
import { DEFAULT_PAGE_LIMIT } from "@/src/constants";
import * as feedApi from "@/src/services/feed/feed.client";
import { useState } from "react";
import Feed from "../feed";
import { PostsResIf } from "@/src/types/components/video-details/video-content.types";

export default function ForYouFeed({ posts }: { posts: PostsResIf[] }) {
  const [videos, setVideos] = useState(posts ?? []);

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
  };

  return (
    <Feed data={posts} onSelect={onSelect} loadMoreData={loadMoreVideos} />
  );
}
