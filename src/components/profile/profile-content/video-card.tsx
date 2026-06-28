import { Card, CardContent } from "@/src/components/ui/card";
import useMediaOrientation from "@/src/hooks/use-media-orientation";
import {
  VideoCardItemIf,
  VideoCardPropIf,
} from "@/src/types/components/profile.types";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function VideoCard({
  video,
  className,
  children,
}: VideoCardPropIf) {
  const router = useRouter();
  const params = useParams();
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const { imageOrientation } = useMediaOrientation({
    imgSrc: video?.thumbnail,
  });
  const username = params.username as string;

  const handleClick = (video: VideoCardItemIf) => {
    router.push(`/@${username}/video/${video._id}`);
  };

  return (
    <Card key={video?._id} className={`rounded-xs relative p-0 ${className}`}>
      <CardContent className="h-full flex aspect-square items-center justify-center p-0">
        <div
          className="flex justify-center items-center cursor-pointer w-full h-full relative"
          onClick={() => handleClick(video)}
          onMouseEnter={() => setIsMouseEnter(true)}
          onMouseLeave={() => setIsMouseEnter(false)}
        >
          <div
            className={`${imageOrientation === "landscape" ? "bg-contain" : "bg-cover"} w-full h-full bg-center bg-no-repeat absolute top-0 right-0 `}
            style={{
              backgroundImage: `url(${video?.thumbnail})`,
            }}
          />
          {isMouseEnter && (
            <video
              src={video?.videoUrl}
              className="absolute right-0"
              autoPlay
              muted
              loop
            />
          )}
        </div>
        <div>{children}</div>
      </CardContent>
    </Card>
  );
}
