import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getUserInfo } from "@/services/user";
import { AccessDenied } from "@/components/auth/access-denied";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const userInfo = await getUserInfo();

  if (!userInfo?.email) return redirect("/auth/signin");

  const adminEmails = process.env.ADMIN_EMAILS?.split(",");

  if (!adminEmails?.includes(userInfo.email)) {
    return <AccessDenied />;
  }

  return <div>{children}</div>;
}
