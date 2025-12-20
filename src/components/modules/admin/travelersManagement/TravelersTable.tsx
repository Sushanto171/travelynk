"use client"

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { ManagementTable } from "@/components/shared/ManagementTable";
import { deleteTravelerById } from "@/services/traveler/traveler.service";
import { ICountry } from "@/types/country.interface";
import { IInterest } from "@/types/interest.interface";
import { ITraveler } from "@/types/user.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import UpdateTravelerDialog from "../../traveler/TravelerFormDialog";
import { travelersColumn } from './TravelersColumn';

export default function TravelersTable({ travelers, countries, interests }: { travelers: ITraveler[], countries: ICountry[], interests: IInterest[] }) {
  const [traveler, setTraveler] = useState<ITraveler | null>(null)
  const [deleteTraveler, setDeleteTraveler] = useState<ITraveler | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter()

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh()
    })
  }
  const handleConfirm = async () => {
    if (!deleteTraveler || !deleteTraveler.id) return
    setIsDeleting(true)
    const result = await deleteTravelerById(deleteTraveler.id)
    if (result.success) {
      toast.success(result.message || "interest deleted successfully");
      handleRefresh();
      setDeleteTraveler(null);
    } else {
      toast.error(result.message || "Failed to delete");
    }
    setIsDeleting(false);
  }
  return (
    <div>
      <UpdateTravelerDialog traveler={traveler!} interests={interests} countries={countries} showButton={false} handleRefresh={handleRefresh} />

      <DeleteConfirmationDialog
        open={!!deleteTraveler}
        onConfirm={handleConfirm}
        onOpenChange={(open) => !open && setDeleteTraveler(null)}
        title="Delete traveler"
                description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              {deleteTraveler?.name}
            </span>
            ? This action cannot be undone.
          </>
        }
      />

      <ManagementTable
        data={travelers}
        columns={travelersColumn}
        getRowKey={(row) => row.id!}
        onDelete={setDeleteTraveler}
        onEdit={setTraveler}
        isRefreshing={isPending || isDeleting}
      />
    </div>
  );
}