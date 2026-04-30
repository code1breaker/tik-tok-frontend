export function ProfileBio({ bio }: { bio: string }) {
  return <p className="text-sm text-muted-foreground max-w-md">{bio}</p>;
}