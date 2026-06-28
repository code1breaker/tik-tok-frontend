export type CategoryTy = "videos" | "likes" | "favorites";
export type FilterTy = "latest" | "popular" | "oldest";

// Follow User List
export type VariantIf = "follower" | "following" | "suggested";
export interface FollowUserListPropsIf {
  variant: VariantIf;
  username: string;
}
export interface GetFollowUserIf {
  variant: VariantIf;
  item: Record<string, any>;
}
export interface OnFollowChangeIf {
  userId: string;
  isFollowing: boolean;
  requestStatus?: string;
}
export interface FollowUserIf {
  _id: string;
  fullname: string;
  username: string;
}
export interface FollowDataIf {
  followerId?: FollowUserIf;
  followingId?: FollowUserIf;
  relationship?: {
    isFollowing: boolean;
    requestStatus: string;
  };
}

// Follow User Row
export interface FolloUserRowPropsIf {
  user: {
    photoUrl?: string;
    _id: string;
    fullname: string;
    username: string;
  };
  isMe: boolean;
  relationship: { isFollowing: boolean; requestStatus: string };
  onFollowChange: ({
    userId,
    isFollowing,
    requestStatus,
  }: {
    userId: string;
    isFollowing: boolean;
    requestStatus?: string;
  }) => void;
}

// Video
export interface VideoCardItemIf {
  _id: string;
  videoUrl: string;
  thumbnail: string;
  stats: {
    views: number;
  };
}
export interface VideoCardPropIf {
  video: VideoCardItemIf;
  className?: string;
  children?: React.ReactNode;
}
