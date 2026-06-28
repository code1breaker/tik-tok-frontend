"use client";
import { ProfileAvatar } from "./avatar";
import { ProfileBio } from "./bio";
import ProfileStats from "./stats";

export interface ProfileDataIf {
  _id: string;
  username: string;
  fullname: string;
  avatar: string;
  photoUrl: string;
  follower: number;
  following: number;
  likes: number;
  bio: string;
  relationship?: {
    isFollowing: boolean;
    requestStatus: string;
  };
}
export default function ProfileHeader({
  profileData,
}: {
  profileData: ProfileDataIf;
}) {
  const {
    username,
    photoUrl: avatar,
    follower,
    following,
    likes = 60,
    bio,
  } = profileData || {};

  return (
    <div className="flex gap-6 items-center">
      <ProfileAvatar src={avatar} />

      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">@{username}</h2>

        <ProfileStats
          followers={follower}
          following={following}
          likes={likes}
        />

        <ProfileBio bio={bio} />
      </div>
    </div>
  );
}
