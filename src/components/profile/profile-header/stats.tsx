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
      <Stat label="Following" value={following} />
      <Stat label="Followers" value={followers} />
      <Stat label="Likes" value={likes} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex gap-2 items-center">
      <span className="font-semibold">{value}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
