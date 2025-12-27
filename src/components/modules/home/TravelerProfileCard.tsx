"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface TravelerProfileCardProps {
  id: string;
  name: string;
  location?: string;
  rating?: number;
  profilePhoto?: string | null;
  index?: number;
}

export function TravelerProfileCard({
  id,
  name,
  location,
  rating = 0,
  profilePhoto,
  index = 0
}: TravelerProfileCardProps) {
  const avatarColors = [
    "from-blue-500 to-cyan-600",
    "from-emerald-500 to-green-600",
    "from-purple-500 to-pink-600",
    "from-amber-500 to-orange-600",
    "from-blue-600 to-blue-400",
    "from-green-600 to-emerald-400"
  ];

  const bgColor = avatarColors[index % avatarColors.length];

  return (
    <Link href={`/profile/${id}`}>
      <div className="flex flex-col items-center cursor-pointer group w-28">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative mb-3"
        >
          {profilePhoto ? (
            <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-background shadow-lg group-hover:ring-primary transition-all">
              <Image src={profilePhoto} alt={name} fill className="object-cover" />
            </div>
          ) : (
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${bgColor} flex items-center justify-center text-white font-bold text-2xl shadow-lg ring-2 ring-background group-hover:ring-primary transition-all`}>
              {name[0].toUpperCase()}
            </div>
          )}

          {rating > 0 && (
            <div className="absolute -bottom-1 -right-1 bg-black text-white text-xs px-2 py-0.5 rounded-full font-semibold border-2 border-background">
              ★ {rating.toFixed(1)}
            </div>
          )}
        </motion.div>

        <h3 className="text-sm font-bold text-center line-clamp-1 w-full">{name}</h3>
      </div>
    </Link>
  );
}
