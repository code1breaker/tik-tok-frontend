import { auth } from "@/src/auth";
import { LOGIN_PATH } from "@/src/constants/endpoints";
import { redirect } from "next/navigation";

export default async function PoriflePage() {
  const session = await auth();

  if (!session) {
    redirect(LOGIN_PATH);
  }

  const { user } = session;
  const { username = "" } = user;

  const redirectUrl = `/@${username}`;

  redirect(redirectUrl);
}
