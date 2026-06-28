"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import VideoComment from "../video-comment";
import VideoCreator from "../creator-video/video-creator";
import { useAppSelector } from "@/src/hooks/store";

export default function VideoDetailsTab() {
  const { videos, activeIndex } = useAppSelector((state) => state.videoDetails);
  const currentVideo = videos[activeIndex];
  const commentCount = currentVideo?.stats?.comments ?? 0;

  if (!videos.length) return;
  return (
    <div className="flex-1 overflow-hidden">
      <Tabs defaultValue="comments" className="h-full">
        <TabsList variant="line" className="w-full border-b border-[#555555]">
          <TabsTrigger value="comments">Comments ({commentCount})</TabsTrigger>
          <TabsTrigger value="creatorVideo">Creator Video</TabsTrigger>
        </TabsList>
        <TabsContent value="comments" className="overflow-hidden">
          <VideoComment />
        </TabsContent>
        <TabsContent value="creatorVideo" className="overflow-hidden">
          <VideoCreator />
        </TabsContent>
      </Tabs>
    </div>
  );
}
