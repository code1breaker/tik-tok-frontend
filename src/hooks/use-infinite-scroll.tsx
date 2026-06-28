import { useEffect, useState } from "react";
import { UseInfiniteScrollProps } from "../types/hooks/use-infinite-scroll.types";

const useInfiniteScroll = <T,>({
  callback,
  limit = 10,
  deps = [],
}: UseInfiniteScrollProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);

  const fetchData = async ({ page = 1 }) => {
    try {
      setLoading(true);
      const res = await callback({ page, limit });
      if (res.data.data.length !== limit) {
        setHasMoreData(false);
      }
      return res.data?.data;
    } catch (error: any) {
      console.log("Infinite scroll hook error: ", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    const resData = await fetchData({ page: 1 });
    setData([...resData]);
  };

  const loadMoreData = async () => {
    if (!hasMoreData) return;
    const nextPage = pageNumber + 1;
    const resData = await fetchData({ page: nextPage });
    setData((prev) => [...prev, ...resData]);
    setPageNumber(nextPage);
  };

  const refresh = () => {
    loadData();
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      loadMoreData();
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [hasMoreData]);

  useEffect(() => {
    loadData();
  }, [...deps]);

  return { data, setData, loading, error, refresh };
};

export default useInfiniteScroll;
