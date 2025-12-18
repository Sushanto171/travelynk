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
import Image from "next/image";
import Link from "next/link";

type UserDropdownProps = {
  user: IUser;
};

export default function UserDropdown({ user }: UserDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-10 h-10 rounded-full border border-border overflow-hidden flex items-center justify-center bg-muted">
          {user?.profile_photo ? (
            <Image
              src={user.profile_photo}
              alt={user.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
              priority
            />
          ) : (
            <span className="text-sm font-medium">
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-52">
        <DropdownMenuLabel className="font-semibold">
          {user.name}
        </DropdownMenuLabel>
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          {user.email}
        </DropdownMenuLabel>
        <DropdownMenuLabel className="text-xs text-primary uppercase">
          {user.role}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <Link href="/my-profile">
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
        </Link>

        <Link href="/change-password">
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Change Password
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <LogoutButton className="w-full" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
