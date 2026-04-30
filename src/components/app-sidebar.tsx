"use client";
import * as React from "react";

import { SearchForm } from "@/src/components/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/src/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Compass,
  Home,
  Send,
  SquarePlus,
  UserRound,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const sidenav = {
  menu: [
    {
      submenu: [
        {
          title: "For You",
          url: "/for-you",
          icon: <Home />,
        },
        {
          title: "Explore",
          url: "/explore",
          icon: <Compass />,
        },
        {
          title: "Following",
          url: "/following",
          icon: <UserRoundPlus />,
        },
        {
          title: "Friends",
          url: "/friends",
          icon: <UsersRound />,
        },
        {
          title: "Upload",
          url: "/upload",
          icon: <SquarePlus />,
        },
        {
          title: "Activity",
          url: "/activity",
          icon: <Activity />,
        },
        {
          title: "Messages",
          url: "/messages",
          icon: <Send />,
        },
        {
          title: "Profile",
          url: "/profile",
          icon: <UserRound />,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  console.log(pathname, "pathname");
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <h1 className="px-2">TikTok</h1>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {sidenav.menu.map((item, idx) => (
          <SidebarMenu key={idx} className="px-4 py-2">
            {item.submenu.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  variant={"ghost"}
                  isActive={pathname === item.url}
                >
                  <Link href={item.url}>
                    {item?.icon}
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
