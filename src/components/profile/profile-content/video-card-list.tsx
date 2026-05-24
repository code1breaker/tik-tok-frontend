import { useEffect, useState } from "react";
import VideoCard from "./video-card";
import { FilterTy } from "@/src/types/components/profile.types";
import { getUserPosts } from "@/src/services/user/user.client";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { MESSAGES } from "@/src/constants/messages";
import { DEFAULT_PAGE_LIMIT } from "@/src/constants";

export interface PostsIf {
  _id: string;
  videoUrl: string;
  stats: {
    views: number;
  };
}

export default function VideoCardList({ filter }: { filter: FilterTy }) {
  const [posts, setPosts] = useState<PostsIf[]>([]);
  const [pageNumber, setPageNumber] = useState(1);

  const [hasMoreData, setHasMoredata] = useState(
    posts?.length === DEFAULT_PAGE_LIMIT,
  );
  const session = useSession();

  const fetchUserPosts = async (page: number) => {
    if (session.status !== "authenticated") return [];

    try {
      const user = session?.data?.user;
      const res = await getUserPosts({
        userId: user?._id,
        sort: filter,
        page,
      });
      return res.data?.data || [];
    } catch (error: any) {
      console.log("Get Profile Post Error: ", error);
      toast.error(
        MESSAGES[error.data.code as keyof typeof MESSAGES] ||
          MESSAGES.DEFAULT_MESSAGE,
      );
      return [];
    }
  };

  const loadMorePosts = async () => {
    if (!hasMoreData) return [];

    const nextPage = pageNumber + 1;
    const data = await fetchUserPosts(nextPage);
    if (data?.length !== DEFAULT_PAGE_LIMIT) {
      setHasMoredata(false);
    }
    setPosts((prev) => [...prev, ...data]);
    setPageNumber(nextPage);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        loadMorePosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const page = 1;
    const loadPost = async () => {
      const data = await fetchUserPosts(page);
      setPosts(data);
      setPageNumber(1);
    };
    loadPost();
  }, [filter, session?.status]);

  return (
    <>
      <VideoCard posts={posts} />
    </>
  );
}
