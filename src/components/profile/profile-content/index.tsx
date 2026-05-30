"use client";
import { CategoryTy, FilterTy } from "@/src/types/components/profile.types";
import { useState } from "react";
import ProfileCategory from "./category";
import ProfileFilters from "./filters";
import VideoCardList from "./video-card-list";

export default function ProfileContent() {
  const [category, setCategory] = useState<CategoryTy>("videos");
  const [filter, setFilter] = useState<FilterTy>("latest");

  return (
    <div>
      <div className="flex justify-between items-center space-y-5">
        <ProfileCategory category={category} setCategory={setCategory} />
        <ProfileFilters filter={filter} setFilter={setFilter} />
      </div>

      <VideoCardList filter={filter} />
    </div>
  );
}
