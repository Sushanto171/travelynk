// components/profile/ProfileHeader.tsx

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Edit, UserPlus } from "lucide-react";

interface Props {
  name: string;
  bio?: string;
  avatar?: string;
  isOwner?: boolean;
}

export default function ProfileHeader({ name, bio, avatar, isOwner }: Props) {
  return (
    <div className="flex items-end gap-4 relative">

      {/* AVATAR */}
      <div className="h-32 w-32 rounded-full ring-4 ring-background overflow-hidden bg-muted">
        {avatar ? (
          <Image src={avatar} alt="Profile" fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-300" />
        )}
      </div>

      {/* TEXT BLOCK */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold">{name}</h2>
        {bio && <p className="text-sm text-muted-foreground mt-1">{bio}</p>}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-2">
        {isOwner ? (
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-1" /> Edit Profile
          </Button>
        ) : (
          <Button variant="default" size="sm">
            <UserPlus className="w-4 h-4 mr-1" /> Follow
          </Button>
        )}
      </div>
    </div>
  );
}
