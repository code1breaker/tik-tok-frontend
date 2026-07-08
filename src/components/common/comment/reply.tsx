import { useEffect, useRef } from "react";
import CommentItem from "./item";
import useInfiniteScroll from "@/src/hooks/use-infinite-scroll";
import { getPostReplies } from "@/src/services/post/post.client";
import { useAppSelector } from "@/src/hooks/store";
import {
  CommentIf,
  CommentReplyPropsIf,
} from "@/src/types/components/common/comment.types";

export default function CommentReply({
  commentId,
  setReply,
}: CommentReplyPropsIf) {
  const newComment = useAppSelector((state) => state.videoComment.newComment);
  const scrollRef = useRef(null);

  const { data: replies, refresh: refreshReplies } =
    useInfiniteScroll<CommentIf>({
      callback: ({ page = 1, limit = 10 }) =>
        getPostReplies({ commentId, params: { page, limit } }),
      scrollRef,
    });

  useEffect(() => {
    if (newComment) {
      refreshReplies();
    }
  }, [newComment]);

  return (
    <div
      ref={scrollRef}
      className="max-h-[30rem] overflow-auto hide-scrollbar "
    >
      {replies?.map((item) => (
        <CommentItem key={item._id} item={item} setReply={setReply} />
      ))}
    </div>
  );
}
