// components/profile/tabs/TrustTab.tsx

import { ProfileTabContent } from "../ProfileTabContent";
import { KeyValueRow } from "../KeyValueRow";
import { ITraveler, IUser } from "@/types/user.interface";
import { Check } from "lucide-react";

export function TrustTab({
  user,
  traveler,
}: {
  user: IUser;
  traveler: ITraveler;
}) {
  return (
    <ProfileTabContent
      title="Trust & Verification"
      description="Verification, authentication, and trust signals."
    >
      <div className="space-y-3">
        <KeyValueRow label="Verified Account" value={user?.is_verified} />

        <KeyValueRow
          label="Verified Badge"
          value={traveler?.has_verified_badge}
        />

        <KeyValueRow
          label="Subscription Active"
          value={traveler?.subscription_active}
        />

        <KeyValueRow
          label="Last Active"
          value={traveler?.last_active_at}
        />

        {/* Connected Providers */}
        <div>
          <span className="text-sm font-medium">Connected Providers</span>
          <div className="mt-1">
            {user?.auths?.map((a, i: number) => (
              <div
                key={i}
                className="text-sm text-muted-foreground py-1 flex items-center gap-2"
              >
                <Check className="w-4 h-4 text-green-600" />
                {a.auth_providers.provider}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProfileTabContent>
  );
}
