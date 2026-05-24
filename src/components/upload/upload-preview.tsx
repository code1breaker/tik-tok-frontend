import { useAppSelector } from "@/src/hooks/store";
import { useEffect, useRef, useState } from "react";

export default function UploadPreview() {
  const file = useAppSelector((state) => state.upload.file);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPortrait, setIsPortrait] = useState<boolean | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      const { videoWidth, videoHeight } = video;

      setIsPortrait(videoHeight > videoWidth);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [file]);

  return (
    <div className="bg-black py-8 w-fit rounded-3xl">
      <div className={`w-[20rem] h-120`}>
        <video
          ref={videoRef}
          className={`w-full h-full  ${
            isPortrait ? "object-cover" : "object-contain"
          }`}
          src={file?.url}
          loop
        />
      </div>
    </div>
  );
}
