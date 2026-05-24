import { useAppSelector } from "@/src/hooks/store";
import { useEffect, useRef, useState } from "react";
import {
  FileHiddenInput,
  FileTrigger,
  FileUpload,
} from "../common/file-upload";
import { FaPlay } from "react-icons/fa";
import generateVideoThumbnail from "@/src/helpers/upload/generateVideoThumbnail";
import createFrame from "@/src/helpers/upload/createFrame";

export interface SelectCoverPropsIf {
  poster: string;
  setPoster: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectCover({ poster, setPoster }: SelectCoverPropsIf) {
  const file = useAppSelector((state) => state.upload.file);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  useEffect(() => {
    const getThumbnails = async () => {
      const thumbnailsData = await generateVideoThumbnail({
        videoSrc: file?.url,
      });
      setThumbnails(thumbnailsData);
      setPoster(thumbnailsData[0]);
    };

    getThumbnails();
  }, []);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const { currentTime, duration } = e.currentTarget;
    const progressValue = (currentTime / duration) * 100;
    setProgress(progressValue);
  };

  const handleFileChange = (field: { value: File[] }) => {
    const file = field.value[0];
    const url = URL.createObjectURL(file);
    setPoster(url);

    videoRef.current?.pause();
  };

  const handleSlider = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = (value / 100) * video.duration;
    setProgress(value);

    await new Promise((resolve) => {
      video.onseeked = resolve;
    });

    setPoster(createFrame({ video }));
  };

  return (
    <div className="w-full h-100 flex">
      {/* Video Section */}
      <div className="relative w-1/2 cursor-pointer" onClick={handleVideoClick}>
        <video
          className="w-full h-full object-cover"
          ref={videoRef}
          src={file?.url}
          loop
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
        />

        {!isPlaying && (
          <>
            <FaPlay className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[4rem] z-1" />

            {poster && (
              <div className="absolute top-0 w-full h-full">
                <img className="w-full h-full object-cover" src={poster} />
              </div>
            )}
          </>
        )}
      </div>

      <div className="w-[18rem] h-fit mx-auto space-y-4">
        <div className="flex justify-between">
          <p className="font-medium text-base">Select Cover</p>

          <FileUpload onFileChange={handleFileChange}>
            <FileHiddenInput />

            <FileTrigger>
              <p className="font-medium text-base text-primary cursor-pointer hover:underline hover:underline-offset-4">
                Upload Cover
              </p>
            </FileTrigger>
          </FileUpload>
        </div>

        {/* Group of Thumbnails */}
        <div className="relative ">
          {/* Thumbnails */}
          <div className="flex h-16">
            {thumbnails?.map((thumbnail, idx) => (
              <div key={idx} className="w-full">
                <img
                  src={thumbnail}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Vertical Progress Line */}
          <div
            className="absolute top-1/2 bottom-0 -translate-y-1/2 w-1 h-[105%] rounded bg-blue-500 z-10 pointer-events-none"
            style={{
              left: `${progress}%`,
            }}
          />

          {/* Invisible Slider Overlay */}
          <input
            type="range"
            min={0}
            max={100}
            className="absolute inset-0 w-full h-full opacity-0 cursor-grab z-20"
            value={progress}
            onChange={handleSlider}
            onPointerDown={() => setIsPlaying(true)}
            onPointerUp={() => setIsPlaying(false)}
          />
        </div>
      </div>
    </div>
  );
}
