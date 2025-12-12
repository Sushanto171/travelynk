"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getDefaultDashboardRoute } from "@/lib/authUtils";
import { getDashboardNavItems } from "@/lib/dashboardNavItems.config";
import { NavSection } from "@/types/sidebar";
import { IUser } from "@/types/user.interface";
import { useEffect, useState } from "react";
import DashboardSidebarContent from "./DashboardSidebarContent";
import UserDropdown from "./UserDropdown";

type DashboardNavbarContentProps = {
  user: IUser;
};

export default function DashboardNavbarContent({
  user,
}: DashboardNavbarContentProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      const windowSize = window.innerWidth;
      if (windowSize >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const dashboardUrl = getDefaultDashboardRoute(user.role);
  const navItems: NavSection[] = getDashboardNavItems(user.role);
  return (
    <div className="w-full flex justify-between items-center gap-6">
      {/* mobile side */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <Button variant={"outline"} size="icon" asChild >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-fit">
            <SheetTitle className="hidden" />
            <SheetDescription className="hidden" />

            <DashboardSidebarContent
              user={user}
              dashboardHome={dashboardUrl}
              navItems={navItems}
              isMobile={true}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Search input */}
      <div className="relative flex-1">
        {/* <Input className="w-full px-10" placeholder="Search...." />
        <Button className="absolute left-0" variant="ghost" size="icon">
          <Search />
        </Button> */}
      </div>
      {/* Notification Bell */}
      <div className="relative">
        <Badge className="absolute -top-2 -right-2">3</Badge>
        <Button variant="outline" size="icon">
          <Bell />
        </Button>
      </div>
      {/* User Dropdown */}
      <UserDropdown user={user} />
    </div>
  );
}
