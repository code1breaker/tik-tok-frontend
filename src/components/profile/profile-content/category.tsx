import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { CategoryTy } from "@/src/types/components/profile.types";

export default function ProfileCategory({
  category,
  setCategory,
}: {
  category: CategoryTy;
  setCategory: (value: CategoryTy) => void;
}) {
  return (
    <Tabs value={category} onValueChange={(v) => setCategory(v as CategoryTy)}>
      <TabsList variant="line">
        <TabsTrigger value="videos">Videos</TabsTrigger>
        <TabsTrigger value="favoutites">Favoutites</TabsTrigger>
        <TabsTrigger value="likes">Likes</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
