import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { FilterTy } from "@/src/types/components/profile.types";

export default function ProfileFilters({
  filter,
  setFilter,
}: {
  filter: FilterTy;
  setFilter: (value: FilterTy) => void;
}) {
  return (
    <Tabs
      value={filter}
      onValueChange={(v) => setFilter(v as FilterTy)}
      defaultValue="latest"
    >
      <TabsList>
        <TabsTrigger value="latest">Latest</TabsTrigger>
        <TabsTrigger value="popular">Popular</TabsTrigger>
        <TabsTrigger value="oldest">Oldest</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
