import { useEffect, useState } from "react";

type Orientation = "landscape" | "portrait";

interface UseMediaOrientationProps {
  imgSrc?: string;
  videoSrc?: string;
}

const useMediaOrientation = ({
  imgSrc,
  videoSrc,
}: UseMediaOrientationProps) => {
  const [imageOrientation, setImageOrientation] = useState<Orientation | null>(
    null,
  );
  const [videoOrientation, setVideoOrientation] = useState<Orientation | null>(
    null,
  );

  useEffect(() => {
    if (imgSrc) {
      const img = new Image();

      img.onload = () => {
        setImageOrientation(
          img.naturalWidth >= img.naturalHeight ? "landscape" : "portrait",
        );
      };

      img.src = imgSrc;
    }

    if (videoSrc) {
      const video = document.createElement("video");

      video.preload = "metadata";

      video.onloadedmetadata = () => {
        setVideoOrientation(
          video.videoWidth >= video.videoHeight ? "landscape" : "portrait",
        );
      };

      video.src = videoSrc;
    }
  }, [imgSrc, videoSrc]);

  return {
    imageOrientation,
    videoOrientation,
  };
};

export default useMediaOrientation;
