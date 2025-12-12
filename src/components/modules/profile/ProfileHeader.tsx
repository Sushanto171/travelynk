import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { firstLatterUppercase, getInitials } from "@/lib/formatters";
import { ICountry } from "@/types/country.interface";
import { IInterest } from "@/types/interest.interface";
import { ITraveler } from "@/types/user.interface";
import { BadgeCheck, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import UpdateTravelerDialog from "../traveler/TravelerFormDialog";
import ProfilePhotoUpdateDialog from "../traveler/UpdateProfilePhoto";
import ProfilePhoto from "./ProfilePhoto";

interface Props {
  name: string;
  bio?: string;
  avatar?: string;
  isOwner?: boolean;
  hasVerifyBadge?: boolean;
  interests: IInterest[];
  countries: ICountry[]
  traveler?: ITraveler
}

export default function ProfileHeader({
  name,
  bio,
  avatar,
  isOwner,
  hasVerifyBadge,
  traveler,
  interests, countries
}: Props) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-end gap-4 relative w-full">

      {/* AVATAR */}
    <ProfilePhoto profile_photo={avatar} name={name} />

      {/* TEXT BLOCK */}
      <div className="flex-1 w-full">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-xl md:text-2xl font-semibold">
            {firstLatterUppercase(name)}
          </h2>

          {hasVerifyBadge && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <BadgeCheck className="w-5 h-5 text-blue-500 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                  Verified Profile
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <div className="min-h-5 mt-1">
          {bio && (
            <p className="text-sm text-muted-foreground">{bio}</p>
          )}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-wrap gap-4 w-full md:w-auto md:justify-end">
        {isOwner ? (
          <>
            {/* Subscription Button */}
            {!hasVerifyBadge &&
              <Link href="/subscriptions">
                <Button
                  variant="outline"
                  size="sm"
                  className="relative animate-pulse shadow-[0_0_10px_rgba(0,150,255,0.6)] w-full md:w-auto"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Premium Subscription
                </Button>
              </Link>
            }
            {
              traveler && (

                <UpdateTravelerDialog traveler={traveler} interests={interests} countries={countries} />
              )
            }
            {/* <Button variant="outline" size="sm" className="w-full md:w-auto">
              <Edit className="w-4 h-4 mr-1" />
              Edit Profile
            </Button> */}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
