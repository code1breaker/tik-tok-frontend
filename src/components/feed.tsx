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

export default function Feed() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await feed();
        console.log(res.data, "res");
        setSlides(res.data.data);
      } catch (error) {
        console.log("Fetch Feed Error: ", error);
      }
    };
    fetchFeed();
  }, []);

  return (
    <Carousel opts={{}} className="w-full h-full" orientation="vertical">
      <CarouselContent className="w-md h-full">
        {slides?.map((slide, index) => (
          <CarouselItem key={index} className="">
            <Card className="h-full">
              <CardContent className="h-full flex aspect-square items-center justify-center p-0">
                <video src={slide?.videoUrl} controls />
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
