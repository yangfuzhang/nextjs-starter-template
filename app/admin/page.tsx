import { redirect } from "next/navigation";
import { getUserInfo } from "@/services/user";

export default async function Page() {
  const userInfo = await getUserInfo();

  if (!userInfo?.email) return redirect("/auth/signin");

  return redirect("/admin/users");
}
