import { CoverPhoto } from "@/components/modules/profile/CoverPhoto";
import ProfileHeader from "@/components/modules/profile/ProfileHeader";
import ProfileLayout from "@/components/modules/profile/ProfileLayout";
import { ProfileTabs } from "@/components/modules/profile/ProfileTabs";
import { getCountry } from "@/services/admin/countryManagement";
import { getInterests } from "@/services/admin/interestManagement";
import { getUserAction } from "@/services/auth/getUser.service";
import { redirect } from "next/navigation";


export default async function MyProfilePage() {
  const user = await getUserAction()
  const interests = await getInterests()
  const countries = await getCountry()
  if (!user)  return redirect(`/login`);
  return (
    <ProfileLayout
      cover={<CoverPhoto src={"/cover.jpg"} />}
      profile={
        <ProfileHeader
          interests={interests}
          countries={countries}
          traveler={user?.traveler}
          name={user.name}
          bio={user?.traveler?.bio}
          avatar={user?.traveler?.profile_photo || user?.admin?.profile_photo}
          isOwner={true}
          hasVerifyBadge={(user.admin ? true : user?.traveler?.has_verified_badge)}
        />
      }
      tabs={<ProfileTabs user={user!} traveler={user.traveler!} />}
    >
      {/* TAB CONTENT SLOTS (add real content later) */}
      {/* <div className="p-6 bg-card border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold">About Section</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Add your content based on tab state...
        </p>
      </div> */}
    </ProfileLayout>
  );
}
