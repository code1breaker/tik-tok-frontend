import { DEFAULT_PAGE_LIMIT } from "@/src/constants";
import * as userApi from "@/src/services/user/user.server";
import {
  GetVideoDataArgsIf,
  VideosResIf,
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
    getCurrentVideoData({ username, videoId }),
    getPrevVideoData({ username, videoId }),
    getNextVideoData({ username, videoId }),
  ]);

  const videos: VideosResIf[] = [...prev, current, ...next];
  const startIndex = videos.findIndex((video) => video._id === videoId);

  return (
    <div className="w-full h-screen flex justify-center items-center py-8 relative">
      <VideoCloseBtn />
      <VideoDetailsFeed videos={videos} startIndex={startIndex} />
    </div>
  );
}

async function getCurrentVideoData({ username, videoId }: GetVideoDataArgsIf) {
  try {
    const res = await userApi.getUserVideosById({
      username,
      videoId,
    });

    return res.data?.data;
  } catch (error) {
    console.log("Get Current Video Data Error: ", error);
    return {};
  }
}

async function getPrevVideoData({ username, videoId }: GetVideoDataArgsIf) {
  try {
    const res = await userApi.getUserVideosByDirection({
      videoId,
      username,
      direction: "prev",
      limit: DEFAULT_PAGE_LIMIT,
    });

    return res.data?.data;
  } catch (error) {
    console.log("Get Prev Video Data Error: ", error);
    return [];
  }
}

async function getNextVideoData({ username, videoId }: GetVideoDataArgsIf) {
  try {
    const res = await userApi.getUserVideosByDirection({
      videoId,
      username,
      direction: "next",
      limit: DEFAULT_PAGE_LIMIT,
    });

    return res.data?.data;
  } catch (error) {
    console.log("Get Next Video Data Error: ", error);
    return [];
  }
}
