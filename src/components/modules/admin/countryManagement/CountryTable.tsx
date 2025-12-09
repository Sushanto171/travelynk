"use client"

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { ManagementTable } from "@/components/shared/ManagementTable";
import { ICountry } from "@/types/country.interface";
import { useState, useTransition } from "react";
import { countryColumns } from "./countryColumns";
import CountryFormDialog from "./CountryFormDialog";
import { useRouter } from "next/navigation";

export default function CountryTable({ countries }: { countries: ICountry[] }) {
  const [country, setCountry] = useState<ICountry | null>(null)
  const [deleteCountry, setDeleteCountry] = useState<ICountry | null>(null)
  const [isPending , startTransition] = useTransition()
  const router = useRouter()

  const handleRefresh =()=>{
    startTransition(()=>{
      router.refresh()
    })
  }
  const handleConfirm = async () => {
    if (!deleteCountry) return
    console.log(deleteCountry);
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
        isRefreshing={isPending}
      />
    </div>
  );
}