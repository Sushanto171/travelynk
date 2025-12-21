"use client"
import SearchFilter from '@/components/shared/SearchFilter';
import SelectFilter from '@/components/shared/SelectFilter';


export default function TravelPlanFilter() {
  return (
    <div>
      <SearchFilter placeholder="Search Travel Plans..." paramName="searchTerm" />
      <SelectFilter
          paramName="status"
          placeholder="Trip Status"
          defaultValue="All Trip Status"
          options={[
            { label: "Pending", value: "PENDING" },
            { label: "Ongoing", value: "ONGOING" },
            { label: "Completed", value: "COMPLETED" },
            { label: "Cancelled", value: "CANCELLED" },
          ]}
        />
      <SelectFilter
          paramName="tour_type"
          placeholder="Tour Type"
          defaultValue="All Tour Types"
          options={[
            { label: "Pending", value: "PENDING" },
            { label: "Ongoing", value: "ONGOING" },
            { label: "Completed", value: "COMPLETED" },
            { label: "Cancelled", value: "CANCELLED" },
          ]}
        />
    </div>
  );
}