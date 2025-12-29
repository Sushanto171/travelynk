"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import { FilterContainer } from "@/components/shared/FilterContainer";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import { cn } from "@/lib/utils";
import { useState } from "react";
interface TravelPlanFilterProps {
  className?: string;
  showPadding?:boolean
}

export default function TravelerFilter({ className , showPadding=true}: TravelPlanFilterProps) {
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
            placeholder="Search name, email..."
            paramName="searchTerm"
          />
        </div>

            <SelectFilter
          key={`subscription-${key}`}
          paramName="subscription"
          placeholder="Subscription status"
          defaultValue="All Status"
          options={[
            { label: "Active", value: "ACTIVE" },
            { label: "Inactive", value: "INACTIVE" },
          ]}
        />

        <SelectFilter
          key={`select-${key}`}
          paramName="status"
          placeholder="User status"
          defaultValue="All Status"
          options={[
            { label: "Active", value: "ACTIVE" },
            { label: "Deleted", value: "DELETED" },
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
