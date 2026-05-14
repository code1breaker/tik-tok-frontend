import { auth } from "@/src/auth";
import ProfileContent from "@/src/components/profile/profile-content";
import ProfileHeader from "@/src/components/profile/profile-header/index";
import * as userApi from "@/src/services/user/user.server";

async function getProfileData() {
  try {
    const session = await auth();
    const userId = session?.user?._id || "";
    const res = await userApi.getProfileById({ userId });

    return res.data;
  } catch (error: any) {
    console.log("Get Profile Data Error: ", error);
    return { data: {} };
  }
}

export default async function ProfilePage() {
  const profile = await getProfileData();

  return (
    <div className="w-full p-5 space-y-5">
      <ProfileHeader profileData={profile?.data} />
      <ProfileContent />
    </div>
  );
}
