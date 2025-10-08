"use client";
import { Atom, Users, Rss } from "lucide-react";
import { User } from "@/types/user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

import { AdminSidebarContent } from "./admin-sidebar-content";
import { AdminSidebarFooter } from "./admin-sidebar-footer";

const menus = [
  {
    title: "用户管理",
    url: "#",
    icon: Users,
    isActive: true,
    items: [
      {
        title: "用户列表",
        url: "/admin/users",
      },
    ],
  },
  {
    title: "文章管理",
    url: "#",
    icon: Rss,
    isActive: false,
    items: [
      {
        title: "文章列表",
        url: "/admin/posts",
      },
    ],
  },
];

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: User }) {
  const { user, ...restProps } = props;

  return (
    <Sidebar collapsible="icon" {...restProps}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <Atom size="18" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Nextjs</span>
              <span className="truncate text-xs">Starter Template</span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <AdminSidebarContent items={menus} />
      </SidebarContent>
      <SidebarFooter>
        <AdminSidebarFooter user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
