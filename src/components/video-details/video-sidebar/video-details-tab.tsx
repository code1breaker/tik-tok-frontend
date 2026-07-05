"use client";
import { useAppSelector } from "@/src/hooks/store";
import Comment from "../../common/comment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import VideoCreator from "../creator-video/video-creator";

export default function VideoDetailsTab() {
  const { videos, activeIndex } = useAppSelector((state) => state.videoDetails);
  const currentVideo = videos[activeIndex];
  const videoId = currentVideo?._id;
  const commentCount = currentVideo?.stats?.comments ?? 0;

  if (!videos.length) return;
  return (
    <div className="flex-1 overflow-hidden">
      <Tabs defaultValue="comments" className="h-full">
        <TabsList variant="line" className="w-full border-b border-[#555555]">
          <TabsTrigger value="comments">Comments ({commentCount})</TabsTrigger>
          <TabsTrigger value="creatorVideo">Creator Video</TabsTrigger>
        </TabsList>
        <TabsContent value="comments" className="overflow-hidden flex flex-col px-4">
          <Comment videoId={videoId} />
        </TabsContent>
        <TabsContent value="creatorVideo" className="overflow-hidden">
          <VideoCreator />
        </TabsContent>
      </Tabs>
    </div>
  );
}
