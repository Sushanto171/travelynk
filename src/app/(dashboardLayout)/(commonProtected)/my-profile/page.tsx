import { CoverPhoto } from "@/components/modules/admin/profile/CoverPhoto";
import ProfileLayout from "@/components/modules/admin/profile/ProfileLayout";
import { ProfileTabs } from "@/components/modules/admin/profile/ProfileTabs";
import ProfileHeader from "@/components/modules/admin/profile/ProrileHeader";


export default function MyProfilePage({ params }: { params: { id: string } }) {
  const isOwner = params.id === "me"; // or your auth check

  const mock = {
    name: "John Doe",
    bio: "Traveler • Photographer • Explorer",
    avatar: "profile.jpg",
    cover: "/cover.jpg",
  };

  return (
    <ProfileLayout
      cover={<CoverPhoto src={mock.cover} />}
    profile={
        <ProfileHeader
          name={mock.name}
          bio={mock.bio}
          // avatar={mock.avatar}
          isOwner={isOwner}
        />
      }
      tabs={<ProfileTabs />}
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
