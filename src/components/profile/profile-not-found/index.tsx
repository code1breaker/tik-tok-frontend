import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../../ui/empty";
import { AiOutlineUser } from "react-icons/ai";

export default function ProfileNotFound() {
  return (
    <Empty className="h-screen bg-muted/30">
      <EmptyHeader>
        <EmptyMedia>
          <AiOutlineUser className="text-[5rem]" />
        </EmptyMedia>
        <EmptyTitle className="text-2xl">Couldn't find this account</EmptyTitle>
        <EmptyDescription className="text-pretty text-md">
          Looking for videos? Try browsing our trending creators, hashtags, and
          sounds.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent></EmptyContent>
    </Empty>
  );
}
