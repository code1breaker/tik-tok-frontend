import useInfiniteScroll from "@/src/hooks/use-infinite-scroll";
import { getFollowers, getFollowing } from "@/src/services/user/user.client";
import {
  FollowDataIf,
  FollowUserListPropsIf,
  GetFollowUserIf,
  OnFollowChangeIf,
} from "@/src/types/components/profile.types";
import { useSession } from "next-auth/react";
import FollowUserRow from "./FollowUserRow";

export const fetcherMap = {
  follower: getFollowers,
  following: getFollowing,
  suggested: getFollowing,
};

export default function FollowUserList({
  variant,
  username,
}: FollowUserListPropsIf) {
  const session = useSession();
  const loggedInUserId = session?.data?.user?._id;

  const fetcher = fetcherMap[variant];
  const { data, setData, loading, error } = useInfiniteScroll<FollowDataIf>({
    callback: ({ page = 1, limit = 10 }) =>
      fetcher({
        page,
        limit,
        username,
      }),
    deps: [variant],
  });

  const getUser = ({ variant, item }: GetFollowUserIf) => {
    switch (variant) {
      case "follower":
        return item?.followerId;
      case "following":
        return item?.followingId;
      case "suggested":
        return item?.followingId;
      default:
        return {};
    }
  };

  const onFollowChange = ({
    userId,
    isFollowing,
    requestStatus = "none",
  }: OnFollowChangeIf) => {
    setData((prevData) => {
      return prevData?.map((item) => {
        const currentUser = getUser({ variant, item });

        if (currentUser._id === userId)
          return { ...item, relationship: { isFollowing, requestStatus } };

        return item;
      });
    });
  };

  return (
    <>
      {data?.map((item) => {
        const user = getUser({ variant, item });
        const isMe = user?._id === loggedInUserId;
        const relationship = item?.relationship ?? {
          isFollowing: true,
          requestStatus: "accepted",
        };

        return (
          <FollowUserRow
            key={user?._id}
            user={user}
            isMe={isMe}
            relationship={relationship}
            onFollowChange={onFollowChange}
          />
        );
      })}
    </>
  );
}
