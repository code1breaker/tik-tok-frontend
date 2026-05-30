import useInfiniteScroll from "@/src/hooks/use-infinite-scroll";
import { getUserPosts } from "@/src/services/user/user.client";
import {
  FilterTy,
  VideoCardItemIf,
} from "@/src/types/components/profile.types";
import { useParams } from "next/navigation";
import VideoCard from "./video-card";
import VideoNotFound from "./video-not-found";

export default function VideoCardList({ filter }: { filter: FilterTy }) {
  const params = useParams();
  const username = params.username as string;

  const { data: videos, loading: videosLoading } =
    useInfiniteScroll<VideoCardItemIf>({
      callback: ({ page = 1, limit = 10 }) =>
        getUserPosts({
          username,
          sort: filter,
          page,
          limit,
        }),
      deps: [filter],
    });

  if (!videosLoading && !videos?.length) return <VideoNotFound />;

  return (
    <div className="grid grid-cols-5 gap-4">
      <VideoCard videos={videos} />
    </div>
  );
}
