import LogoutButton from "@/components/shared/LogoutButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUser } from "@/types/user.interface";
import { Settings, User } from "lucide-react";
import Link from "next/link";

type UserDropdownProps = {
  user: IUser;
};

export default function UserDropdown({ user }: UserDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center justify-center">
          <span className="w-10 h-10 rounded-full flex items-center justify-center border border-border">
            {user.name.slice(0, 1).toUpperCase()}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuLabel className="font-bold">
          {user?.name}
        </DropdownMenuLabel>
        <DropdownMenuLabel className="text-sm opacity-70">
          {user.email}
        </DropdownMenuLabel>
        <DropdownMenuLabel className="text-primary">
          {user.role}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/my-profile">
          <DropdownMenuItem>
            <User className="text-foreground" /> Profile
          </DropdownMenuItem>
        </Link>
        <Link href="/change-password">
          <DropdownMenuItem>
            <Settings className="text-foreground" /> Change Password
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator className="bg-red-400 opacity-70" />
        <LogoutButton className="w-full border-red-400! bg-red-500!" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
