import { getDefaultDashboardRoute } from "@/lib/authUtils";
import { getDashboardNavItems } from "@/lib/dashboardNavItems.config";
import { NavSection } from "@/types/sidebar";
import { IUser } from "@/types/user.interface";
import DashboardSidebarContent from "./DashboardSidebarContent";

interface IDashboardSidebarProps {
  user: IUser
}

export default async function DashboardSidebar({ user }: IDashboardSidebarProps) {
  const dashboardUrl = getDefaultDashboardRoute(user.role);
  const navItems: NavSection[] = getDashboardNavItems(user.role, user?.traveler?.subscription_active
  );

  return (
    <aside >
      <DashboardSidebarContent
        user={user}
        dashboardHome={dashboardUrl}
        navItems={navItems}
      />
    </aside>
  );
}
