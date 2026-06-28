"use client";
import copyToClipboard from "@/src/helpers/copyToClipboard";
import { useEffect, useState } from "react";
import { BiSolidMessage } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { Button } from "../../ui/button";
import { Item, ItemActions, ItemContent, ItemDescription } from "../../ui/item";
import { useAppSelector } from "@/src/hooks/store";

export default function VideoInteraction() {
  const [fullUrl, setFullUrl] = useState<string>("");
  const { videos, activeIndex } = useAppSelector((state) => state.videoDetails);
  const currentVideo = videos[activeIndex];

  useEffect(() => {
    setFullUrl(window.location.href);
  }, []);

  const handleCopy = () => {
    copyToClipboard(fullUrl);
  };

  return (
    <div className="px-4 space-y-4">
      <div className="flex gap-5">
        <div className="flex gap-2 items-center">
          <FaHeart />
          <p className="text-muted-foreground">{currentVideo?.stats?.likes}</p>
        </div>
        <div className="flex gap-2 items-center">
          <BiSolidMessage />
          <p className="text-muted-foreground">
            {currentVideo?.stats?.comments}
          </p>
        </div>
      </div>

      <Item variant="outline" className="flex">
        <ItemContent className="overflow-hidden">
          <ItemDescription className="text-ellipsis">{fullUrl}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant={"ghost"} onClick={handleCopy}>
            Copy link
          </Button>
        </ItemActions>
      </Item>
    </div>
  );
}
