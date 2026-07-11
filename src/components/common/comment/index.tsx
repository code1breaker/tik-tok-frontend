"use client";
import { useEffect, useRef, useState } from "react";
import CommentList from "./list";
import useInfiniteScroll from "@/src/hooks/use-infinite-scroll";
import { DEFAULT_PAGE_LIMIT } from "@/src/constants";
import { getVideoComments } from "@/src/services/video/video.client";
import CommentInput from "./input";
import { useAppSelector } from "@/src/hooks/store";
import {
  CommentIf,
  CommentPropsIf,
} from "@/src/types/components/common/comment.types";

export default function Comment({ videoId }: CommentPropsIf) {
  const [reply, setReply] = useState<CommentIf | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const newComment = useAppSelector((state) => state.videoComment.newComment);

  const { data: comments, refresh: refreshComments } =
    useInfiniteScroll<CommentIf>({
      callback: ({ page = 1, limit = DEFAULT_PAGE_LIMIT }) =>
        getVideoComments({ videoId: videoId, params: { page, limit } }),
      deps: [videoId],
      scrollRef,
    });

  useEffect(() => {
    if (newComment) refreshComments();
  }, [newComment]);

  return (
    <div className="min-h-0 flex-1 flex flex-col">
      <CommentList
        comments={comments}
        setReply={setReply}
        scrollRef={scrollRef}
      />
      <CommentInput videoId={videoId} reply={reply} setReply={setReply} />
    </div>
  );
}
