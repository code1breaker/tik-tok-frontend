import { DEFAULT_PAGE_LIMIT } from "@/src/constants";
import * as userApi from "@/src/services/user/user.server";
import {
  GetPostDataArgsIf,
  PostsResIf,
  VideoContentParamsIf,
} from "@/src/types/components/video-details/video-content.types";
import VideoCloseBtn from "./video-close-btn";
import VideoDetailsFeed from "./video-details-feed";

export default async function VideoContent({
  params,
}: {
  params: VideoContentParamsIf;
}) {
  const { username, videoId } = params;
  const [current, prev, next] = await Promise.all([
    getCurrentPostData({ username, videoId }),
    getPrevPostData({ username, videoId }),
    getNextPostData({ username, videoId }),
  ]);

  const posts: PostsResIf[] = [...prev, current, ...next];
  const startIndex = posts.findIndex((post) => post._id === videoId);

  return (
    <div className="w-full h-screen flex justify-center items-center py-8 relative">
      <VideoCloseBtn />
      <VideoDetailsFeed posts={posts} startIndex={startIndex} />
    </div>
  );
}

async function getCurrentPostData({ username, videoId }: GetPostDataArgsIf) {
  try {
    const res = await userApi.getUserPostsById({
      username,
      postId: videoId,
    });

    return res.data?.data;
  } catch (error) {
    console.log("Get Current Post Data Error: ", error);
    return {};
  }
}

async function getPrevPostData({ username, videoId }: GetPostDataArgsIf) {
  try {
    const res = await userApi.getUserPostsByDirection({
      postId: videoId,
      username,
      direction: "prev",
      limit: DEFAULT_PAGE_LIMIT,
    });

    return res.data?.data;
  } catch (error) {
    console.log("Get Prev Post Data Error: ", error);
    return [];
  }
}

async function getNextPostData({ username, videoId }: GetPostDataArgsIf) {
  try {
    const res = await userApi.getUserPostsByDirection({
      postId: videoId,
      username,
      direction: "next",
      limit: DEFAULT_PAGE_LIMIT,
    });

    return res.data?.data;
  } catch (error) {
    console.log("Get Next Post Data Error: ", error);
    return [];
  }
}
