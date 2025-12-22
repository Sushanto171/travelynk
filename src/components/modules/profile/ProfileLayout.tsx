import { Card } from "@/components/ui/card";
import clsx from "clsx"; // optional for cleaner class merging
import { HTMLAttributes, ReactNode } from "react";

interface ProfileLayoutProps {
  cover: ReactNode;
  profile: ReactNode;
  tabs: ReactNode;
  children?: ReactNode;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

export default function ProfileLayout({
  cover,
  profile,
  tabs,
  children,
  className,
}: ProfileLayoutProps) {
  return (
    <div className={clsx("w-full max-w-7xl mx-auto space-y-6", className)}>
      <Card className="overflow-hidden rounded-none shadow-sm pt-0 ">
        {/* COVER SECTION */}
        {cover}

        {/* PROFILE HEADER */}
        <div className="px-6 -mt-20 pb-4 relative">{profile}</div>

        {/* TABS */}
        <div className="px-6">{tabs}</div>
      </Card>

      {/* TAB CONTENT */}
      <div>{children}</div>
    </div>
  );
}
