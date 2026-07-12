"use client";

import useMediaOrientation from "@/src/hooks/use-media-orientation";
import { VideoPlayerPropsIf } from "@/src/types/components/common/video-player.types";
import { useEffect, useRef, useState } from "react";
import { Progress } from "../ui/progress";
export default function VideoPlayer({
  src,
  isVolumeEnable,
}: VideoPlayerPropsIf) {
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const isPlaying = useRef(false);
  const isDragging = useRef(false);

  const { videoOrientation } = useMediaOrientation({ videoSrc: src });

  const handleVideoClick = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      isPlaying.current = true;
    } else {
      video.pause();
      isPlaying.current = false;
    }
  };

  const updateProgressLoop = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.duration) {
      const currentProgress = (video.currentTime / video.duration) * 100;
      setProgress(currentProgress);
    }
    // Continue loop on the next animation frame
    animationFrameRef.current = requestAnimationFrame(updateProgressLoop);
  };

  const handlePlay = () => {
    animationFrameRef.current = requestAnimationFrame(updateProgressLoop);
  };

  const handlePauseOrEnd = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const handleProgressClick = (e: React.MouseEvent | MouseEvent) => {
    e.stopPropagation();

    const video = videoRef.current;
    const progressBar = progressRef.current;
    if (!video || !progressBar || !video.duration) return;

    // Get the exact geometry of the progress bar on the screen
    const rect = progressBar.getBoundingClientRect();

    // Calculate how many pixels from the left side the user clicked
    const clickX = e.clientX - rect.left;

    // Get the ratio (e.g., 0.5 for exactly halfway)
    const clickRatio = Math.max(0, Math.min(1, clickX / rect.width));

    // Snap the video to the new time!
    video.currentTime = clickRatio * video.duration;

    // Instantly update the visual bar state so it doesn't flicker
    setProgress(clickRatio * 100);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    isPlaying.current = !video.paused;
    video.pause();
    isDragging.current = true;
    handleProgressClick(e);
  };

  const handleMouseUp = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    if (isPlaying.current) {
      video.play();
      isPlaying.current = true;
    }
    isDragging.current = false;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleProgressClick(e);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.onloadeddata = () => {
      video.play().catch((err) => console.log("Autoplay blocked:", err));
      isPlaying.current = true;
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePauseOrEnd);
    video.addEventListener("ended", handlePauseOrEnd);

    if (!video.paused) {
      handlePlay();
    }

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePauseOrEnd);
      video.removeEventListener("ended", handlePauseOrEnd);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full h-full relative cursor-pointer" draggable={"false"}>
      <div onClick={handleVideoClick} className="w-full h-full select-none">
        <video
          src={src}
          className={`w-full h-full select-none ${
            videoOrientation === "landscape" ? "object-contain" : "object-cover"
          }`}
          ref={videoRef}
          loop
          autoPlay
          preload="none"
          muted={!isVolumeEnable}
          draggable="false"
        />
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-1 overflow-hidden bg-secondary"
        ref={progressRef}
        onClick={handleProgressClick}
        onMouseDown={handleMouseDown}
        draggable={false}
      >
        <Progress
          value={progress}
          className="w-full h-full rounded-none [&>div]:transition-transform [&>div]:duration-75 [&>div]:ease-linear"
        />
      </div>
    </div>
  );
}
