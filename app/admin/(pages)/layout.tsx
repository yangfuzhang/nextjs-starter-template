import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getUserInfo } from "@/services/user";
import { User } from "@/types/user";
import { AccessDenied } from "@/components/auth/access-denied";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

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

  return <DashboardLayout user={userInfo as User}>{children}</DashboardLayout>;
}
