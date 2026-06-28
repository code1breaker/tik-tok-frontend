export interface UseInfiniteScrollProps<T> {
  callback: ({ page, limit }: { page: number; limit: number }) => Promise<Record<string,any>>;
  limit?: number;
  deps?: any[];
}
