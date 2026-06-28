import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/src/components/ui/item";
import { MESSAGES } from "@/src/constants/messages";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as userApi from "@/src/services/user/user.client";
import Link from "next/link";
import { FolloUserRowPropsIf } from "@/src/types/components/profile.types";

export default function FollowUserRow({
  user,
  isMe,
  relationship,
  onFollowChange,
}: FolloUserRowPropsIf) {
  const router = useRouter();
  const { isFollowing, requestStatus } = relationship;
  const isAccepted = isFollowing && requestStatus === "accepted";
  const isRequested = isFollowing && requestStatus === "pending";

  const handleFollowBtnClick = async () => {
    try {
      const res = await userApi.followUser({ userId: user._id });
      const { status } = res.data?.data;
      onFollowChange({
        userId: user._id,
        isFollowing: true,
        requestStatus: status || "accepted",
      });
      toast.success(
        MESSAGES[res.data.code as keyof typeof MESSAGES] ||
          MESSAGES.FOLLOW_REQUEST_SUCCESS,
      );
    } catch (error: any) {
      toast.error(
        MESSAGES[error.data.code as keyof typeof MESSAGES] ||
          MESSAGES.DEFAULT_MESSAGE,
      );
      console.log("Follow Error: ", error);
    }
  };

  const handleRequestBtnClick = async () => {
    try {
      const res = await userApi.unFollowUser({ userId: user._id });
      onFollowChange({
        userId: user._id,
        isFollowing: false,
      });
      toast.success(
        MESSAGES[res.data.code as keyof typeof MESSAGES] ||
          MESSAGES.UNFOLLOW_SUCCESS,
      );
    } catch (error: any) {
      toast.error(
        MESSAGES[error.data.code as keyof typeof MESSAGES] ||
          MESSAGES.DEFAULT_MESSAGE,
      );
      console.log("Unfollow Error: ", error);
    }
  };

  const handleMessageBtnClick = () => {
    router.push(`/message/${user._id}`);
  };

  return (
    <Item variant="default">
      <ItemMedia>
        <Link href={`/@${user.username}`}>
          <Avatar className="size-10">
            <AvatarImage
              src={user?.photoUrl || "https://github.com/evilrabbit.png"}
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </Link>
      </ItemMedia>
      <ItemContent>
        <Link href={`/@${user.username}`}>
          <ItemTitle>{user?.fullname}</ItemTitle>
          <ItemDescription>@{user?.username}</ItemDescription>
        </Link>
      </ItemContent>

      {!isMe && (
        <ItemActions>
          {!isFollowing && (
            <Button variant="primary" size="sm" onClick={handleFollowBtnClick}>
              Follow
            </Button>
          )}

          {isRequested && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleRequestBtnClick}
            >
              Requested
            </Button>
          )}

          {isAccepted && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleMessageBtnClick}
            >
              Message
            </Button>
          )}
        </ItemActions>
      )}
    </Item>
  );
}
