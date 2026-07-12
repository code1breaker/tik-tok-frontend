import ForYouFeed from "@/src/components/for-you/for-you-feed";
import { DEFAULT_PAGE_LIMIT } from "@/src/constants";
import * as feedApi from "@/src/services/feed/feed.server";

async function getVideoData() {
  try {
    const res = await feedApi.feed({
      limit: DEFAULT_PAGE_LIMIT,
      page: 1,
    });

    return res.data?.data;
  } catch (error) {
    console.log("Get Video Data Error: ", error);
    return [];
  }
}

export default async function ForyouPage() {
  const videos = await getVideoData();
  return (
    <>
      <ForYouFeed videos={videos} />
    </>
  );
}
