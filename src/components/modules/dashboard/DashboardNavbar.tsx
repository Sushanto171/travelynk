import { IUser } from "@/types/user.interface";
import DashboardNavbarContent from "./DashboardNavbarContent";

interface IDashboardNavbarProps {
  user: IUser
}

export default function DashboardNavbar({ user }: IDashboardNavbarProps) { 
  return (
    <header className="h-16 px-6 flex items-center border-b shadow-sm">
      <DashboardNavbarContent user={user} />
    </header>
  );
}
