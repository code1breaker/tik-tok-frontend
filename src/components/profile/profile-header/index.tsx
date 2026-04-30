"use client";
import { ProfileAvatar } from "./avatar";
import { ProfileBio } from "./bio";
import ProfileStats from "./stats";

export interface ProfileIf {
  username: string;
  avatar: string;
  followers: number;
  following: number;
  likes: number;
  bio: string;
}
export default function ProfileHeader({ profile }: { profile: ProfileIf }) {
  return (
    <div className="flex gap-6 items-center">
      <ProfileAvatar src={profile.avatar} />

      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">@{profile.username}</h2>

        <ProfileStats
          followers={profile.followers}
          following={profile.following}
          likes={profile.likes}
        />

        <ProfileBio bio={profile.bio} />
      </div>
    </div>
  );
}
