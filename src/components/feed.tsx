"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import { useEffect, useState } from "react";
import { feed } from "../services/feed.service";
import { UseEmblaCarouselType } from "embla-carousel-react";

export interface SlidesIf {
  videoUrl: string;
}

export default function Feed() {
  const [slides, setSlides] = useState<SlidesIf[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [api, setApi] = useState<UseEmblaCarouselType[1] | null>(null);

  const fetchFeed = async ({ pageNumber }: { pageNumber: number }) => {
    try {
      if (!hasMore) return;

      const res = await feed({ page: pageNumber, limit: 2 });

      if (!res.data.data.length) {
        setHasMore(false);
        return;
      }

      setHasMore(true);
      setSlides((prev) => [...prev, ...res.data.data]);
    } catch (error) {
      console.log("Fetch Feed Error: ", error);
    }
  };

  const handleSelect = () => {
    if (!api) return;

    const index = api.selectedScrollSnap();
    if (slides.length - 1 !== index) return;
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    fetchFeed({ pageNumber: page });
  }, [page]);

  useEffect(() => {
    if (!api) return;
    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api, handleSelect, page]);

  return (
    <Carousel
      opts={{}}
      setApi={setApi}
      className="w-full h-full"
      orientation="vertical"
    >
      <CarouselContent className="w-md h-full">
        {slides?.map((slide, index) => (
          <CarouselItem key={index} className="">
            <Card className="h-full">
              <CardContent className="h-full flex aspect-square items-center justify-center p-0">
                <video src={slide?.videoUrl} />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="top-[46%] left-auto right-0 -translate-y-1/2" />
      <CarouselNext className="top-[54%] left-auto right-0 -translate-y-1/2" />
    </Carousel>
  );
}
