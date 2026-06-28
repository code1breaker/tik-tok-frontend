import { SlidesIf } from "../types/components/common/feed.types";
import { useCallback, useEffect, useState } from "react";

interface FeedResponse {
  data?: {
    data?: SlidesIf[];
  };
}

export interface useForYouFeedPropsIf {
  callback: ({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }) => Promise<FeedResponse>;
  limit?: number;
}

const useForYouFeed = ({ callback, limit = 2 }: useForYouFeedPropsIf) => {
  const [data, setData] = useState<SlidesIf[]>([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(
    async ({ page = 1 }: { page?: number }) => {
      try {
        setLoading(true);
        const res = await callback({ page, limit });

        return res.data?.data ?? [];
      } catch (error) {
        console.log("Infinite scroll hook error: ", error);
        setError(String(error));
        return [];
      } finally {
        setLoading(false);
      }
    },
    [callback, limit],
  );

  const loadData = useCallback(async () => {
    const resData = await fetchData({ page });
    setData((prevData) => [...prevData, ...resData]);
  }, [fetchData, page]);

  const onSelect = (index: number) => {
    if (data.length - 1 !== index) return;
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, loading, error, onSelect };
};

export default useForYouFeed;
