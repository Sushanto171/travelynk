"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import { FilterContainer } from "@/components/shared/FilterContainer";
import MultiSelectFilter from "@/components/shared/MultiSelectFilter";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import { cn } from "@/lib/utils";
import { useState } from "react";
interface TravelPlanFilterProps {
  className?: string;
  showPadding?:boolean
}

export default function TravelPlanFilter({ className , showPadding=true}: TravelPlanFilterProps) {
  const [key, setKey] = useState(1);
  const handleAfterClear = () => {
    setKey((prev) => prev + 1);
  }
  return (
    <div className={ cn("mx-auto max-w-7xl w-full ", showPadding?"px-4 sm:px-6 lg:px-8": "")}>
      <FilterContainer className={className}>
        <div className="w-full flex-1 min-w-[300px]">
          <SearchFilter
            resetKey={`searchTerm-${key}`}
            placeholder="Search travel plans..."
            paramName="searchTerm"
          />
        </div>

        <MultiSelectFilter
          key={`multi-${key}`}
          paramName="tour_type"
          placeholder="Tour Type"
          searchPlaceholder="Search tour type..."
          emptyMessage="No specialty found."
          options={[
            { label: "Solo", value: "SOLO" },
            { label: "Group", value: "GROUP" },
            { label: "Family", value: "FAMILY" },
            { label: "Friends", value: "FRIENDS" },
            { label: "Colleagues", value: "COLLEAGUES" },
            { label: "Couples", value: "COUPLES" },
            { label: "Pets", value: "PETS" },
            { label: "Other", value: "OTHER" },
          ]}
          badgesOnly={false}
        />

        <SelectFilter
          key={`select-${key}`}
          paramName="status"
          placeholder="Trip Status"
          defaultValue="All Status"
          options={[
            { label: "Pending", value: "PENDING" },
            { label: "Ongoing", value: "ONGOING" },
            { label: "Completed", value: "COMPLETED" },
            { label: "Cancelled", value: "CANCELLED" },
          ]}
        />

        {/* Always new line */}
        <div className="w-full flex justify-start pt-3 ">
          <ClearFiltersButton onAfterClear={handleAfterClear} />
        </div>
      </FilterContainer>

    </div>
  );

}
