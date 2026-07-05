"use client";

import useMediaOrientation from "@/src/hooks/use-media-orientation";
import { VideoPlayerPropsIf } from "@/src/types/components/common/video-player.types";
import { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";

export default function VideoPlayer({
  src,
  isVolumeEnable,
}: VideoPlayerPropsIf) {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { videoOrientation } = useMediaOrientation({ videoSrc: src });

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
    <div className="w-full h-full relative" onClick={handleClick}>
      <video
        src={src}
        ref={videoRef}
        loop
        muted={!isVolumeEnable}
        className={`w-full h-full cursor-pointer ${videoOrientation === "landscape" ? "object-contain" : "object-cover"}`}
      />
      {!isPlaying && (
        <FaPlay className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[4rem] z-1 cursor-pointer" />
      )}
    </div>
  );
}
