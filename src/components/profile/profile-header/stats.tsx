import FollowList from "./follow-list";

export interface ProfileStatsPropsIf {
  followers: number;
  following: number;
  likes: number;
}

export default function ProfileStats({
  followers,
  following,
  likes,
}: ProfileStatsPropsIf) {
  return (
    <div className="flex gap-6 text-sm">
      <FollowList trigger={<Stat label="Following" value={following} />} />
      <FollowList trigger={<Stat label="Followers" value={followers} />} />
      <Stat label="Likes" value={likes} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex gap-2 items-center cursor-pointer">
      <span className="font-semibold">{value}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
