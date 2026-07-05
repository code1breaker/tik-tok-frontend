import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../../ui/item";
import { useEffect, useRef, useState } from "react";
import { Separator } from "../../ui/separator";
import { MdKeyboardArrowDown } from "react-icons/md";
import CommentReply from "./reply";
import { CommentItemPropsIf } from "@/src/types/components/common/comment.types";

export default function CommentItem({ item, setReply }: CommentItemPropsIf) {
  const [showReplies, setShowReplies] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [isViewMoreOpen, setIsViewMoreOpen] = useState(false);
  const commentTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const elem = commentTextRef.current;
    if (elem) {
      setViewMore(elem.scrollHeight > elem.clientHeight);
    }
  }, [isViewMoreOpen]);

  return (
    <Item variant="default" className="px-0 py-4">
      <ItemMedia>
        <Avatar className="size-10 ">
          <AvatarImage
            src={item?.userId?.photoUrl || "https://github.com/evilrabbit.png"}
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{item?.userId?.fullname}</ItemTitle>
        <ItemDescription className="line-clamp-none">
          <span
            ref={commentTextRef}
            className={`${isViewMoreOpen ? "" : "line-clamp-3"}`}
          >
            {item?.message}
          </span>
          <br />
          {(viewMore || isViewMoreOpen) && (
            <span
              onClick={() => setIsViewMoreOpen(!isViewMoreOpen)}
              className="cursor-pointer text-white"
            >
              {isViewMoreOpen ? "view less..." : "view more..."}
            </span>
          )}
        </ItemDescription>
        <div className="w-full flex  justify-between">
          <div className="flex items-center gap-2 ">
            <span className="text-muted-foreground text-xs">
              {moment(item?.updatedAt).fromNow()}
            </span>
            <span
              className="text-xs text-shadow-muted-foreground cursor-pointer"
              onClick={() => {
                setReply(item);
              }}
            >
              Reply
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            {/* <FaHeart />
            <span>5432</span> */}
          </div>
        </div>

        {!!item?.replyCount && (
          <>
            <div className="flex justify-start items-center gap-2">
              <Separator className="w-10! h-0.5! bg-[#555]!" />
              <span
                className="text-muted-foreground  cursor-pointer"
                onClick={() => setShowReplies(!showReplies)}
              >
                View {item?.replyCount} Replies
              </span>
              <MdKeyboardArrowDown className="text-muted-foreground text-lg cursor-pointer" />
            </div>
            {showReplies && (
              <CommentReply commentId={item?._id} setReply={setReply} />
            )}
          </>
        )}
      </ItemContent>
    </Item>
  );
}
