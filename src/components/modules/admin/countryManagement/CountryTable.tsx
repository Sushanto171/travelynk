"use client"

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { ManagementTable } from "@/components/shared/ManagementTable";
import { deleteCountryById } from "@/services/admin/countryManagement";
import { ICountry } from "@/types/country.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { countryColumns } from "./countryColumns";
import CountryFormDialog from "./CountryFormDialog";

export default function CountryTable({ countries }: { countries: ICountry[] }) {
  const [country, setCountry] = useState<ICountry | null>(null)
  const [deleteCountry, setDeleteCountry] = useState<ICountry | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter()

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh()
    })
  }
  const handleConfirm = async () => {
    if (!deleteCountry || !deleteCountry.id) return
    setIsDeleting(true)
    const result = await deleteCountryById(deleteCountry.id)
    console.log(result);
    if (result.success) {
      toast.success(result.message || "Country deleted successfully");
      handleRefresh();
      setDeleteCountry(null);
    } else {
      toast.error(result.message || "Failed to delete");
    }
    setIsDeleting(false);
  }
  return (
    <div>
      <CountryFormDialog
        open={!!country}
        country={country!}
        onClose={() => setCountry(null)}
        onSuccess={handleRefresh}
      />

      <DeleteConfirmationDialog
        open={!!deleteCountry}
        onConfirm={handleConfirm}
        onOpenChange={(open) => !open && setDeleteCountry(null)}
        title="Delete Country"
        description={`Are you sure you want to delete ${deleteCountry?.name}? This action cannot be undone.`}
      />

      <ManagementTable
        data={countries}
        columns={countryColumns}
        getRowKey={(row) => row.code}
        onDelete={setDeleteCountry}
        onEdit={setCountry}
        isRefreshing={isPending || isDeleting}
      />
    </div>
  );
}