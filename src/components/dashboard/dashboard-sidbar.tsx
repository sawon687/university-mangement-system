"use client";
import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import Logo from "../../assets/Logo";
import { HomeIcon, LayoutDashboard } from "lucide-react";
import { stat } from "fs";
import Link from "next/link";
import { adminRoutes } from "../../routes/admin.routes";
import { studentroutes } from "../../routes/student.routes";
import { SidbarItems } from "../../type/sidebar.type";
import { usePathname } from "next/navigation";
// This is sample data.
const sidebarRoutes = {
  ADMIN: adminRoutes,
  STUDENT: studentroutes,
};
export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const role = "ADMIN";
  const pathname = usePathname();
  const routes: SidbarItems = sidebarRoutes[role] || [];
  console.log("state", state);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="my-5 px-4">
          {" "}
          <Logo flexColRow={"flex-row"} state={state} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                   
                      render={<Link href={item.url} />}
                   
                      isActive={pathname == item.url}
                       className={`${pathname===item.url? 'bg-primary!  text-white!':''} px-4`}
                      tooltip={item.title}
                    >
                      {item.icon && <item.icon />}
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
