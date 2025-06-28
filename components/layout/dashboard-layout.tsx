import { ReactNode } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { User } from "@/types/user";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminSidebar } from "./admin-sidebar";

export async function DashboardLayout({
  user,
  children,
}: {
  user: User;
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSidebar user={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-0.5 text-sm hover:underline"
            >
              站点首页
              <ExternalLink size="16" />
            </Link>
          </div>
        </header>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
