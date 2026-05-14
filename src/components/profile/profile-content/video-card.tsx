import { Card, CardContent } from "@/src/components/ui/card";

export interface VideoCardIf {
  _id: string;
  videoUrl: string;
  stats: {
    views: number;
  };
}

export default function VideoCard({ feed }: { feed: VideoCardIf[] }) {
  return (
    <>
      {feed?.map((item) => (
        <Card key={item?._id} className="h-72 rounded-xs">
          <CardContent className="h-full flex aspect-square items-center justify-center p-0">
            <video src={item?.videoUrl} />
          </CardContent>
        </Card>
      ))}
    </>
  );
}
