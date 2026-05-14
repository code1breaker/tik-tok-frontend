import { auth } from "@/src/auth";
import Feed from "@/src/components/feed";

export default async function ForyouPage() {
  const session = await auth();
  return (
    <div className="w-full h-screen flex justify-center items-center p-8">
      <Feed />
    </div>
  );
}
