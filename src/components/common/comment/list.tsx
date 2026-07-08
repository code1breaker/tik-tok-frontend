import { CommentListPropsIf } from "@/src/types/components/common/comment.types";
import CommentItem from "./item";

export default function CommentList({
  comments,
  setReply,
  scrollRef,
}: CommentListPropsIf) {
  return (
    <div className="flex-1 overflow-auto hide-scrollbar" ref={scrollRef}>
      {comments?.map((comment) => (
        <CommentItem
          key={comment?._id}
          item={comment}
          setReply={setReply}
        />
      ))}
    </div>
  );
}
