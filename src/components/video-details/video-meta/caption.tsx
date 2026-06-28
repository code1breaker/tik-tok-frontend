"use client";

import { useAppSelector } from "@/src/hooks/store";

export default function VideoCaption() {
  const { videos, activeIndex } = useAppSelector((state) => state.videoDetails);
  const currentVideo = videos[activeIndex];

  return <div className="text-muted-foreground">{currentVideo?.caption}</div>;
}
