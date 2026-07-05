import { useCallback, useEffect, useState } from "react";
import { SlidesIf } from "../types/components/common/feed.types";

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

const useVideoDetailsFeed = ({ callback, limit = 2 }: useForYouFeedPropsIf) => {
  const [data, setData] = useState<SlidesIf[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await callback({ page: 1, limit });

      return res.data?.data ?? [];
    } catch (error) {
      console.log("Infinite scroll hook error: ", error);
      setError(String(error));
      return [];
    } finally {
      setLoading(false);
    }
  }, [callback, limit]);

  const loadData = useCallback(async () => {
    const resData = await fetchData();
    setData((prevData) => [...prevData, ...resData]);
  }, [fetchData]);

  const onSelect = (index: number) => {
    if (data.length - 1 !== index) return;
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, loading, error, onSelect };
};

export default useVideoDetailsFeed;
