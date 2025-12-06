"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { NavSection } from "@/types/sidebar";
import { IUser } from "@/types/user.interface";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getIconComponent } from "./GetIconComponent";

type DashboardSidebarContentProps = {
  user: IUser;
  navItems: NavSection[];
  dashboardHome: string;
  isMobile?: boolean;
};

export default function DashboardSidebarContent({
  user,
  navItems,
  dashboardHome,
  isMobile = false,
}: DashboardSidebarContentProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "hidden md:flex  w-64 h-full border-r shadow-sm p-4",
        isMobile ? "block md:hidden" : "hidden"
      )}
    >
      <div className="flex flex-col w-full h-full">
        {/* Brand /Logo */}
        <div>
          <Link className="flex items-center space-x-2" href={dashboardHome}>
            <span className="text-xl text-primary font-bold">Travelynk</span>
          </Link>
        </div>

        {/* Navigation*/}
        <ScrollArea
          className="flex-1 px-3 py-4 overflow-y-auto 
scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/40
      "
        >
          <nav className="space-y-6">
            {navItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                {section.title && (
                  <h4 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {section.title}
                  </h4>
                )}

                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = getIconComponent(item.icon);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="flex-1">{item.title}</span>
                        {item.badge && (
                          <Badge
                            variant={isActive ? "secondary" : "default"}
                            className="ml-auto"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    );
                  })}
                </div>
                {sectionIdx < navItems.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </nav>
        </ScrollArea>

        {/* footer */}
        <footer className="w-full">
          <Separator className="w-full" />
          <div className="pt-2 flex gap-2">
            <div className="flex items-center justify-center">
              <span className="w-10 h-10 rounded-full flex items-center justify-center border border-muted ">
                {user?.name.slice(0, 1).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-semibold opacity-80">{user?.name}</p>
              <p className="text-sm opacity-60">
                {user?.role.slice(0, 1) +
                  user?.role.slice(1).toLowerCase()}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
