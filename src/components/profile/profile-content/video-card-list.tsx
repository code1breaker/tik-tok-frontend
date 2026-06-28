"use client";
import useInfiniteScroll from "@/src/hooks/use-infinite-scroll";
import { getUserPosts } from "@/src/services/user/user.client";
import {
  FilterTy,
  VideoCardItemIf,
} from "@/src/types/components/profile.types";
import { useParams } from "next/navigation";
import { ReactNode } from "react";
import VideoNotFound from "./video-not-found";

export default function VideoCardList({
  filter,
  className,
  renderItem,
}: {
  filter?: FilterTy;
  className?: string;
  renderItem: (props: {
    video: VideoCardItemIf;
    loading?: boolean;
  }) => ReactNode;
}) {
  const params = useParams();
  const username = params.username as string;

  const { data: videos, loading } = useInfiniteScroll<VideoCardItemIf>({
    callback: ({ page = 1, limit = 10 }) =>
      getUserPosts({
        username,
        sort: filter,
        page,
        limit,
      }),
    deps: [filter],
  });

  if (!loading && !videos?.length) return <VideoNotFound />;

  return (
    <div
      className={`grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 ${className}`}
    >
      {videos?.map((video) => renderItem({ video, loading }))}
    </div>
  );
}
