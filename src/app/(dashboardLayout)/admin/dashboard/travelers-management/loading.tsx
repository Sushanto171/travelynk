import { ManagementPageLoading } from "@/components/shared/ManagementPageLoader";

export default function AdminManagementLoading() {
  return (
    <div>
      <ManagementPageLoading
        columns={10}
        hasActionButton={true}
        filterCount={1}
        filterWidths={["w-60"]}
      />
    </div>
  );
}
