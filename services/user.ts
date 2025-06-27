import { auth } from "@/auth";

export async function getUserInfo() {
  const session = await auth();
  if (!session) return null;
  return session.user;
}
