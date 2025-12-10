
import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface ProfileLayoutProps {
  cover: ReactNode;
  profile: ReactNode;
  tabs: ReactNode;
  children?: ReactNode;
}

export default function ProfileLayout({ cover, profile, tabs, children }: ProfileLayoutProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="overflow-hidden rounded-2xl shadow-sm pt-0">
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
