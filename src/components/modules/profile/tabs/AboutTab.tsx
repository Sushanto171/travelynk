
import { formatTimeDate } from "@/lib/formatters";
import { ITraveler } from "@/types/user.interface";
import { KeyValueRow } from "../KeyValueRow";
import { ProfileTabContent } from "../ProfileTabContent";

export function AboutTab({ traveler }: { traveler: ITraveler }) {
  return (
    <ProfileTabContent
      title="About"
      description="Personal details and basic profile information."
    >
      <div className="space-y-3">
        <KeyValueRow label="Name" value={traveler?.name} />
        <KeyValueRow label="Bio" value={traveler?.bio} />
        <KeyValueRow label="Contact Number" value={traveler?.contact_number || null} />
        <KeyValueRow label="Date of Birth" value={traveler?.date_of_birth ? formatTimeDate(traveler.date_of_birth) : null} />
        <KeyValueRow label="Address" value={traveler?.address || null} />
        <KeyValueRow
          label="Current Location"
          value={traveler?.current_location || null}
        />
      </div>
    </ProfileTabContent>
  );
}
