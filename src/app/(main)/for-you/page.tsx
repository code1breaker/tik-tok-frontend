import ForYouFeed from "@/src/components/for-you/for-you-feed";
import * as feedApi from "@/src/services/feed/feed.server";

async function getPostData() {
  try {
    const res = await feedApi.feed({
      limit: 3,
      page: 4,
    });

    return res.data?.data;
  } catch (error) {
    console.log("Get Post Data Error: ", error);
    return [];
  }
}

export default async function ForyouPage() {
  const posts = await getPostData();
  return (
    <>
      <ForYouFeed posts={posts} />
    </>
  );
}
