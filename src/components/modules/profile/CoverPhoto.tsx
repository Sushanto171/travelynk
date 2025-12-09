// components/profile/CoverPhoto.tsx

import Image from "next/image";

export function CoverPhoto({ src }: { src?: string }) {
  return (
    <div className="relative h-48 w-full bg-muted overflow-hidden">
      {src ? (
        <Image
          src={src}
          alt="Cover"
          fill
          className="object-cover"
        />
      ) : (
        <div className="h-full w-full bg-gradient-to-r from-gray-200 to-gray-300" />
      )}
    </div>
  );
}
