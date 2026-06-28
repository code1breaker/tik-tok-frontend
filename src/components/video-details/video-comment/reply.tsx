import { useAppSelector } from "@/src/hooks/store";
import useInfiniteScroll from "@/src/hooks/use-infinite-scroll";
import { getPostReplies } from "@/src/services/post/post.client";
import { useEffect } from "react";
import VideoCommentItem from "../video-comment/item";
import {
  CommentIf,
  CommentReplyPropsIf,
} from "@/src/types/components/video-details/video-comment.types";

export default function CommentReply({
  commentId,
  setReply,
}: CommentReplyPropsIf) {
  const newComment = useAppSelector((state) => state.videoComment.newComment);

  const { data: replies, refresh: refreshReplies } =
    useInfiniteScroll<CommentIf>({
      callback: ({ page = 1, limit = 10 }) =>
        getPostReplies({ commentId, params: { page, limit } }),
    });

  useEffect(() => {
    if (newComment) refreshReplies();
  }, [newComment]);

  return (
    <div>
      {replies?.map((item) => (
        <VideoCommentItem key={item._id} item={item} setReply={setReply} />
      ))}
    </div>
  );
}
