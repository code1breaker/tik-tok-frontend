import { Card, CardContent } from "@/src/components/ui/card";
import {
  VideoCardIf,
  VideoCardItemIf,
} from "@/src/types/components/profile.types";
import { useParams, useRouter } from "next/navigation";

export default function VideoCard({ videos }: VideoCardIf) {
  const router = useRouter();
  const params = useParams();
  const username = params.username as string;

  const handleClick = (item: VideoCardItemIf) => {
    router.push(`/@${username}/video/${item._id}`);
  };
  return (
    <>
      {videos?.map((item) => (
        <Card key={item?._id} className="h-72 rounded-xs">
          <CardContent className="h-full flex aspect-square items-center justify-center p-0">
            <div className="cursor-pointer" onClick={() => handleClick(item)}>
              <video src={item?.videoUrl} poster={item?.thumbnail} />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
