"use client";
import { DEFAULT_PAGE_LIMIT } from "@/src/constants";
import { useAppSelector } from "@/src/hooks/store";
import useInfiniteScroll from "@/src/hooks/use-infinite-scroll";
import { getPostComments } from "@/src/services/post/post.client";
import {
  CommentIf,
  ReplyIf,
} from "@/src/types/components/video-details/video-comment.types";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Separator } from "../../ui/separator";
import VideoCommentInput from "./input";
import VideoCommentItem from "./item";

export default function VideoComment() {
  const [reply, setReply] = useState<ReplyIf | Record<string, any>>({});
  const { videos, activeIndex } = useAppSelector((state) => state.videoDetails);
  const newComment = useAppSelector((state) => state.videoComment.newComment);
  const currentVideo = videos[activeIndex];
  const videoId = currentVideo?._id;

  const { data: comments, refresh: refreshComments } =
    useInfiniteScroll<CommentIf>({
      callback: ({ page = 1, limit = DEFAULT_PAGE_LIMIT }) =>
        getPostComments({
          postId: videoId,
          params: { page, limit },
        }),
      deps: [videoId],
    });

  useEffect(() => {
    if (newComment) refreshComments();
  }, [newComment]);

  if (!videos.length) return;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto hide-scrollbar px-4">
        {comments?.map((item) => (
          <VideoCommentItem key={item._id} item={item} setReply={setReply} />
        ))}
      </div>

      {reply?.userId && (
        <div className="flex justify-between items-center p-2 text-muted-foreground bg-[#171717]">
          <p>Reply to @{reply?.userId?.username}</p>
          <IoClose
            className="cursor-pointer text-lg"
            onClick={() => setReply({})}
          />
        </div>
      )}
      <Separator className=" bg-[#555555]" />

      <div className="py-2">
        <VideoCommentInput reply={reply} setReply={setReply} />
      </div>
    </div>
  );
}
