"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface UserCardProps {
  id: string;
  name: string;
  email?: string,
  profile_photo?: string;
  subText?: string;
  linkToProfile?: boolean;
  className?: string;
  children?: React.ReactNode; // allows comment or extra content
}

export const UserCard = ({
  id,
  name,
  email,
  profile_photo,
  subText,
  linkToProfile = true,
  className,
  children,
}: UserCardProps) => {
  const content = (
    <div
      className={`flex flex-col gap-1 p-2 rounded-md hover: transition ${className}`}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          {profile_photo ? (
            <AvatarImage src={profile_photo} alt={name} />
          ) : (
            <AvatarFallback>{name[0]}</AvatarFallback>
          )}
        </Avatar>
        <div className="flex flex-col text-sm">
          <span className="font-medium ">{name}</span>
          <span className="font-small ">{email}</span>
          {subText && <span className="text-muted-foreground">{subText}</span>}
        </div>
      </div>
      {children && <div className="pl-16 text-sm text-opacity-7">{children}</div>}
    </div>
  );

  return linkToProfile ? <Link href={`/profile/${id}`}>{content}</Link> : content;
};
