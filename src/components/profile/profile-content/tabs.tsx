import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";

type Tab = "videos" | "likes" | "favorites";

export default function ProfileTabs({
  tab,
  setTab,
}: {
  tab: Tab;
  setTab: (value: Tab) => void;
}) {
  return (
    // <Tabs defaultValue="videos">
    <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
      <TabsList variant="line">
        <TabsTrigger value="videos">Videos</TabsTrigger>
        <TabsTrigger value="favoutites">Favoutites</TabsTrigger>
        <TabsTrigger value="likes">Likes</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
