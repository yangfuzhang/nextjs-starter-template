import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AccessDenied } from "@/components/auth/access-denied";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/auth/signin");

  const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];

  if (!adminEmails.includes(user.email!)) {
    return <AccessDenied />;
  }

  return redirect("/admin/users");
}
