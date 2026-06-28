"use client";
import { useSession } from "next-auth/react";
import * as userApi from "@/src/services/user/user.client";
import { toast } from "sonner";
import { MESSAGES } from "@/src/constants/messages";
import FollowUserRow from "../../profile/profile-header/follow-list/follow-user-row";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { OnFollowChangeIf } from "@/src/types/components/profile.types";
import { ProfileDataIf } from "../../profile/profile-header";

export default function CreatorInfo() {
  const [targetUser, setTargetUser] = useState<ProfileDataIf | null>(null);
  const params = useParams();
  const session = useSession();
  const loggedInUser = session.data?.user;
  const username = params.username as string;

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await userApi.getProfileByUsername({ username });
        setTargetUser(res.data?.data);
      } catch (error) {
        const apiError = error as { data?: { code?: string } };
        toast.error(
          MESSAGES[apiError.data?.code as keyof typeof MESSAGES] ||
            MESSAGES.DEFAULT_MESSAGE,
        );
      }
    };

    getUserProfile();
  }, [username]);

  const onFollowChange = ({
    isFollowing,
    requestStatus = "none",
  }: OnFollowChangeIf) => {
    setTargetUser((prevData) => prevData && ({
      ...prevData,
      relationship: { isFollowing, requestStatus },
    }));
  };

  if (!targetUser) return;

  return (
    <FollowUserRow
      user={targetUser}
      isMe={username === loggedInUser?.username}
      relationship={
        targetUser?.relationship ?? {
          isFollowing: true,
          requestStatus: "accepted",
        }
      }
      onFollowChange={onFollowChange}
    />
  );
}
