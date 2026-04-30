"use client";
import { useState } from "react";
import ProfileFilters from "./filters";
import ProfileTabs from "./tabs";
import { Card, CardContent } from "../../ui/card";

export default function ProfileContent() {
  const [tab, setTab] = useState<"videos" | "likes" | "favorites">("videos");

  return (
    <div>
      <div className="flex justify-between items-center space-y-5">
        <ProfileTabs tab={tab} setTab={setTab} />
        <ProfileFilters />
      </div>

      <div className="grid grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Card key={item} className="h-72 rounded-xs">
            <CardContent>card {item}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
