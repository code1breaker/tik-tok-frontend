import { useEffect, useState } from "react";
import VideoCard from "./video-card";
import { FilterTy } from "@/src/types/components/profile.types";
import { getProfileFeed } from "@/src/services/feed/feed.client";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { MESSAGES } from "@/src/constants/messages";
import { DEFAULT_PAGE_LIMIT } from "@/src/constants";

export interface FeedIf {
  _id: string;
  videoUrl: string;
  stats: {
    views: number;
  };
}

export default function VideoCardList({ filter }: { filter: FilterTy }) {
  const [feed, setFeed] = useState<FeedIf[]>([]);
  const [pageNumber, setPageNumber] = useState(1);

  const [hasMoreData, setHasMoredata] = useState(
    feed?.length === DEFAULT_PAGE_LIMIT,
  );
  const session = useSession();

  const fetchProfileFeed = async (page: number) => {
    if (session.status !== "authenticated") return [];

    try {
      const user = session?.data?.user;
      const res = await getProfileFeed({
        userId: user?._id,
        sort: filter,
        page,
      });
      return res.data?.data || [];
    } catch (error: any) {
      console.log("Get Profile Feed Error: ", error);
      toast.error(
        MESSAGES[error.data.code as keyof typeof MESSAGES] ||
          MESSAGES.DEFAULT_MESSAGE,
      );
      return [];
    }
  };

  const loadMoreFeed = async () => {
    if (!hasMoreData) return [];

    const nextPage = pageNumber + 1;
    const data = await fetchProfileFeed(nextPage);
    if (data?.length !== DEFAULT_PAGE_LIMIT) {
      setHasMoredata(false);
    }
    setFeed((prev) => [...prev, ...data]);
    setPageNumber(nextPage);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        loadMoreFeed();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const page = 1;
    const loadFeed = async () => {
      const data = await fetchProfileFeed(page);
      setFeed(data);
      setPageNumber(1);
    };
    loadFeed();
  }, [filter, session?.status]);

  return (
    <>
      <VideoCard feed={feed} />
    </>
  );
}
