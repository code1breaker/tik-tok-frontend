import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import VideoCaption from "./caption";
import CreatorInfo from "./creator-info";

export default function VideoMeta() {
  return (
    <div className="px-4 pt-4">
      <Card size="sm" className="w-full">
        <CardHeader className="px-4">
          <CardTitle>
            <CreatorInfo />
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4">
          <VideoCaption />
        </CardContent>
      </Card>
    </div>
  );
}
