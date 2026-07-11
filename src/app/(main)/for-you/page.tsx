import ForYouFeed from "@/src/components/for-you/for-you-feed";
import * as feedApi from "@/src/services/feed/feed.server";

async function getVideoData() {
  try {
    const res = await feedApi.feed({
      limit: 3,
      page: 4,
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
