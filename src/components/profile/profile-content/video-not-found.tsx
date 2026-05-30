import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../../ui/empty";

export default function VideoNotFound() {
  return (
    <Empty className="w-full h-full bg-muted/30">
      <EmptyHeader>
        <EmptyMedia></EmptyMedia>
        <EmptyTitle className="text-2xl">No Video Uploaded</EmptyTitle>
        <EmptyDescription className="text-pretty text-md">
          Start uploading videos
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent></EmptyContent>
    </Empty>
  );
}
