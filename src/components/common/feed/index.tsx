"use client";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  FeedItemIf,
  FeedPropsIf,
} from "../../../types/components/common/feed.types";
import FeedContent from "./feed-content";

export default function Feed<T extends FeedItemIf>({
  data,
  onSelect,
  startIndex = 0,
  loadMoreData,
  isVolumeEnable = true,
  showInteraction = true,
  onCommentClick,
}: FeedPropsIf<T>) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const prevLengthRef = useRef(data?.length);
  const isLoadingRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const handleSelect = () => {
    if (!api) return;
    const selectedIndex = api.selectedScrollSnap();
    setCurrentIndex(selectedIndex);
    onSelect?.(selectedIndex);
  };

  const handleSettle = async () => {
    if (!api || !loadMoreData || isLoadingRef.current) return;

    const firstIndex = 0;
    const lastIndex = api.scrollSnapList().length - 1;
    const selectedIndex = api.selectedScrollSnap();

    if (selectedIndex === firstIndex) {
      isLoadingRef.current = true;
      try {
        await loadMoreData({ direction: "prev" });
      } finally {
        isLoadingRef.current = false;
      }
      return;
    }

    if (selectedIndex === lastIndex) {
      isLoadingRef.current = true;
      try {
        await loadMoreData({ direction: "next" });
      } finally {
        isLoadingRef.current = false;
      }
    }
  };

  useLayoutEffect(() => {
    if (!api) return;

    const currentLength = data?.length;
    const oldLength = prevLengthRef.current;

    if (currentLength > oldLength) {
      const addedCount = currentLength - oldLength;
      const selectedIndex = api.selectedScrollSnap();

      if (selectedIndex === 0) {
        api.reInit();
        api.scrollTo(addedCount, true);
      } else {
        api.reInit();
      }
    }

    prevLengthRef.current = currentLength;
  }, [data, api]);

  useEffect(() => {
    if (!api) return;

    api.on("select", handleSelect);
    api.on("settle", handleSettle);

    return () => {
      api.off("select", handleSelect);
      api.off("settle", handleSettle);
    };
  }, [api, handleSelect, handleSettle]);

  return (
    <Carousel
      opts={{
        startIndex,
        duration: 35,
        watchSlides: true,
      }}
      setApi={setApi}
      className="w-full h-full"
      orientation="vertical"
    >
      <CarouselContent className="w-md h-full">
        {data?.map((item, idx) => {
          const isActive = currentIndex === idx;
          return (
            <FeedContent
              key={item._id}
              item={item}
              isVolumeEnable={isVolumeEnable}
              isActive={isActive}
              showInteraction={showInteraction}
              onCommentClick={onCommentClick}
            />
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="top-[46%] left-auto right-0 -translate-y-1/2" />
      <CarouselNext className="top-[54%] left-auto right-0 -translate-y-1/2" />
    </Carousel>
  );
}
