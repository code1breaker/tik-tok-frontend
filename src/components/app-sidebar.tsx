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

const data = {
  navMain: [
    {
      items: [
        {
          title: "For You",
          url: "/for-you",
        },
        {
          title: "Explore",
          url: "/explore",
        },
        {
          title: "Following",
          url: "/following",
        },
        {
          title: "Friends",
          url: "/friends",
        },
        {
          title: "Upload",
          url: "/upload",
        },
        {
          title: "Activity",
          url: "/activity",
        },
        {
          title: "Messages",
          url: "/messages",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <h1 className="px-2">TikTok</h1>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item, idx) => (
          <SidebarMenu key={idx}>
            {item.items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  variant={"default"}
                  // isActive={item?.isActive}
                >
                  <Link href={item.url}>{item.title}</Link>
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
