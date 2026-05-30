export interface UseInfiniteScrollProps<T> {
  callback: ({ page, limit }: { page: number; limit: number }) => Promise<any>;
  limit?: number;
  deps?: any[];
}
