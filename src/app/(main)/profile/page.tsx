import ProfileContent from "@/src/components/profile/profile-content";
import ProfileHeader from "@/src/components/profile/profile-header/index";
import * as authApi from "@/src/services/auth/auth.server";

async function getProfileData() {
  try {
    const res = await authApi.profile();
    return res.data;
  } catch (error: any) {
    console.log("Get Profile Data Error: ", error.data);
    return { data: {} };
  }
}

export default async function ProfilePage() {
  const { data } = await getProfileData();

  const profile = {
    username: data?.username,
    avatar: data?.photoUrl || "https://github.com/shadcn.png",
    followers: data?.follower || 20,
    following: data?.following || 10,
    likes: data?.likes || 60,
    bio: data?.bio || "this is bio",
  };
  return (
    <div className="w-full p-5 space-y-5">
      <ProfileHeader profile={profile} />
      <ProfileContent />
    </div>
  );
}
