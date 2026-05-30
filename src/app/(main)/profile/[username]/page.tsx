import { auth } from "@/src/auth";
import ProfileContent from "@/src/components/profile/profile-content";
import ProfileHeader from "@/src/components/profile/profile-header/index";
import ProfileNotFound from "@/src/components/profile/profile-not-found";
import { MESSAGES } from "@/src/constants/messages";
import * as userApi from "@/src/services/user/user.server";

export interface UserProfilePagePropsIf {
  params: Promise<{ username: string }>;
}

export interface GetProfileDataIf {
  username: string;
}

async function getProfileData({ username }: GetProfileDataIf) {
  try {
    const res = await userApi.getProfileByUsername({ username });

    return res.data;
  } catch (error: any) {
    console.log("Get Profile Data Error: ", error);
    return { data: error.response.data };
  }
}

export default async function UserProfilePage({
  params,
}: UserProfilePagePropsIf) {
  const { username } = await params;
  const profile = await getProfileData({ username });

  if (MESSAGES[profile?.data?.code as keyof typeof MESSAGES]) {
    return <ProfileNotFound />;
  }

  return (
    <div className="w-full p-5 space-y-5">
      <ProfileHeader profileData={profile?.data} />
      <ProfileContent />
    </div>
  );
}
