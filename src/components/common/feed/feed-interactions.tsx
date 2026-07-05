"use client";

import { BiSolidMessage } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "../../ui/avatar";
import { PlusIcon } from "lucide-react";
import { PiShareFatFill } from "react-icons/pi";
import { FeedInteractionsPropsIf } from "@/src/types/components/common/feed.types";

export default function FeedInteractions({
  item,
  className,
  onCommentClick,
}: FeedInteractionsPropsIf) {
  return (
    <div className={`space-y-6 ${className}`}>
      <Avatar className="grayscale">
        <AvatarImage src="https://github.com/pranathip.png" alt="@pranathip" />
        <AvatarFallback>PP</AvatarFallback>
        <AvatarBadge>
          <PlusIcon />
        </AvatarBadge>
      </Avatar>

      <div>
        <FaHeart className="text-2xl text-muted-foreground cursor-pointer" />
        <p className="text-md text-muted-foreground">10k</p>
      </div>

      <div onClick={() => onCommentClick?.()}>
        <BiSolidMessage className="text-2xl text-muted-foreground cursor-pointer" />
        <p className="text-md text-muted-foreground">{item?.stats?.comments}</p>
      </div>

      <div>
        <PiShareFatFill className="text-2xl text-muted-foreground cursor-pointer" />
        <p className="text-md text-muted-foreground">2.2k</p>
      </div>
    </div>
  );
}
