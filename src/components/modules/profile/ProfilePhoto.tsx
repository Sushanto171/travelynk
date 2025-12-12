import { getInitials } from '@/lib/formatters';
import Image from 'next/image';
import ProfilePhotoUpdateDialog from '../traveler/UpdateProfilePhoto';

export default function ProfilePhoto({ profile_photo, name }: { profile_photo?: string, name: string }) {
  return (
    <div className="relative">
<ProfilePhotoUpdateDialog profile_photo={profile_photo} />

      <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-full ring-4 ring-background overflow-hidden bg-muted">
        {profile_photo ? (
          <>

            <Image
              src={profile_photo}
              alt="Profile"
              fill
              sizes="128px"
              className="object-cover"
            />
          </>

        ) : (
          <div className="w-full h-full flex items-center justify-center " >
            <span className="text-4xl">{getInitials(name)}</span>
          </div>
        )}
      </div>

    </div>
  );
}