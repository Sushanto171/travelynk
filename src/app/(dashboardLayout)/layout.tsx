import DashboardNavbar from "@/components/modules/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/modules/dashboard/DashboardSidebar";
import { getUserAction } from "@/services/auth/getUser.service";
import { ReactNode } from "react";

export const dynamic = "force-dynamic"

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getUserAction()
  if (!user) return null
  return (
    <div className="h-screen w-full flex overflow-hidden ">
      <DashboardSidebar user={user} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardNavbar user={user} />
        <main className="flex-1 h-full overflow-y-auto px-6 py-4">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}