"use client";

import { VideoPlayerPropsIf } from "@/src/types/components/common/video-player.types";
import { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";

export default function VideoPlayer({
  src,
  isVolumeEnable,
}: VideoPlayerPropsIf) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      await video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.onloadeddata = () => {
      video.play();
      setIsPlaying(true);
    };
  }, []);

  return (
    <div className="relative" onClick={handleClick}>
      <video
        src={src}
        ref={videoRef}
        loop
        muted={!isVolumeEnable}
        className="cursor-pointer"
      />
      {!isPlaying && (
        <FaPlay className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[4rem] z-1 cursor-pointer" />
      )}
    </div>
  );
}
