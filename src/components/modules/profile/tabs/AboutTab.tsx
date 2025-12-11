import { formatTimeDate } from "@/lib/formatters";
import { ITraveler } from "@/types/user.interface";
import { KeyValueRow } from "../KeyValueRow";
import { ProfileTabContent } from "../ProfileTabContent";

export function AboutTab({ traveler }: { traveler: ITraveler }) {
  return (
    <ProfileTabContent
      title="About"
      description="Personal details, interests, and travel experiences."
    >
      <div className="space-y-3">
        {/* Personal Info */}
        <KeyValueRow label="Name" value={traveler?.name} />
        <KeyValueRow label="Bio" value={traveler?.bio} />
        <KeyValueRow label="Contact Number" value={traveler?.contact_number || null} />
        <KeyValueRow
          label="Date of Birth"
          value={traveler?.date_of_birth ? formatTimeDate(traveler.date_of_birth, false) : null}
        />
        <KeyValueRow label="Address" value={traveler?.address || null} />
        <KeyValueRow label="Current Location" value={traveler?.current_location || null} />

        {/* Traveler Metadata */}
        {traveler?.interests?.length > 0 && (
          <KeyValueRow
            label="Interests"
            value={traveler.interests.map(i => i.name).join(", ")}
          />
        )}

        {traveler?.visited_countries?.length > 0 && (
          <KeyValueRow
            label="Visited Countries"
            value={traveler.visited_countries.map(c => c.name).join(", ")}
          />
        )}
      </div>
    </ProfileTabContent>
  );
}
