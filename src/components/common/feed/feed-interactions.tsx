"use client";

import { MESSAGES } from "@/src/constants/messages";
import * as postApi from "@/src/services/post/post.client";
import { FeedInteractionsPropsIf } from "@/src/types/components/common/feed.types";
import { PlusIcon } from "lucide-react";
import { startTransition, useOptimistic, useState } from "react";
import { BiSolidMessage } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { IoIosCopy } from "react-icons/io";
import { PiShareFatFill } from "react-icons/pi";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  ThreadsIcon,
  ThreadsShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
  XShareButton,
} from "react-share";
import { toast } from "sonner";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "../../ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import env from "@/src/lib/env";
import Link from "next/link";

export default function FeedInteractions({
  item,
  className,
  onCommentClick,
}: FeedInteractionsPropsIf) {
  const [post, setPost] = useState({
    isLiked: item.isLiked,
    likesCount: item.stats.likes,
  });
  const [optimisticPost, setOptimisticPost] = useOptimistic(post);
  const shareUrl = `${env.APP_BASE_URL}/@${item.user?.username}/video/${item._id}`;

  const handleLikeClick = async () => {
    startTransition(async () => {
      try {
        const next = {
          isLiked: !optimisticPost.isLiked,
          likesCount:
            optimisticPost.likesCount + (optimisticPost.isLiked ? -1 : 1),
        };

        setOptimisticPost(next);
        await postApi.likePost({ postId: item?._id });
        setPost(next);
      } catch (error: any) {
        console.log("Error in like api", error);
        toast.error(
          MESSAGES[error?.data?.code as keyof typeof MESSAGES] ||
            MESSAGES.DEFAULT_MESSAGE,
        );
      }
    });
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("copied!!!", { position: "top-center" });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Link href={`/@${item.user?.username}`} className="block">
        <Avatar className="grayscale">
          <AvatarImage
            src="https://github.com/pranathip.png"
            alt="@pranathip"
          />
          <AvatarFallback>PP</AvatarFallback>
          <AvatarBadge>
            <PlusIcon />
          </AvatarBadge>
        </Avatar>
      </Link>

      <div>
        <FaHeart
          className={`text-2xl text-muted-foreground cursor-pointer ${optimisticPost?.isLiked ? "text-primary" : ""}`}
          onClick={handleLikeClick}
        />
        <p className="text-md text-muted-foreground">
          {optimisticPost.likesCount}
        </p>
      </div>

      <div onClick={() => onCommentClick?.()}>
        <BiSolidMessage className="text-2xl text-muted-foreground cursor-pointer" />
        <p className="text-md text-muted-foreground">{item?.stats?.comments}</p>
      </div>

      <div>
        <Dialog>
          <DialogTrigger>
            <PiShareFatFill className="text-2xl text-muted-foreground cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share</DialogTitle>
            </DialogHeader>
            <div className="flex gap-5 w-full overflow-auto">
              <div
                className="w-10 h-10 flex justify-center items-center rounded-full bg-muted-foreground cursor-pointer"
                onClick={handleCopyClick}
                title="Copy"
              >
                <IoIosCopy />
              </div>

              <div title="Email">
                <EmailShareButton
                  subject="🎬 Check out this amazing video!"
                  body={`I found this video and thought you'd enjoy it!\n\nWatch it here:\n${shareUrl}`}
                  url={shareUrl}
                  aria-label="Email"
                >
                  <EmailIcon size={40} round />
                </EmailShareButton>
              </div>

              <div title="Facebook">
                <FacebookShareButton
                  hashtag="#Shorts #Trending #WatchNow"
                  url={shareUrl}
                  aria-label="Facebook"
                >
                  <FacebookIcon size={40} round />
                </FacebookShareButton>
              </div>

              <div title="WhatsApp">
                <WhatsappShareButton url={shareUrl} aria-label="WhatsApp">
                  <WhatsappIcon size={40} round />
                </WhatsappShareButton>
              </div>

              <div title="Threads">
                <ThreadsShareButton
                  title="🔥 This video is worth watching!"
                  url={shareUrl}
                  aria-label="Threads"
                >
                  <ThreadsIcon size={40} round />
                </ThreadsShareButton>
              </div>

              <div title="X">
                <XShareButton url={shareUrl} aria-label="X">
                  <XIcon size={40} round />
                </XShareButton>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
