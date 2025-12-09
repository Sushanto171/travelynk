"use client"
import { ManagementPageHeader } from '@/components/shared/ManagementPageHeader';
import { useState } from 'react';
import CountryFormDialog from './CountryFormDialog';

export default function CountryManagementHeader() {
  const [open, setOpen] = useState(false)
  const [key, setKey] = useState(1)
  const handleDialogOpen = () => {
    setOpen(true)
    setKey(prev => prev + 1)
  }
  return (
    <div>
      <ManagementPageHeader
        title="Country Management"
        description="Manage countries and update"
        action={
          {
            label: "Add Country",
            onClick: () => handleDialogOpen()
          }
        }
      />

      <CountryFormDialog
        open={open}
        key={key}
        onClose={() => setOpen(false)} />

    </div>
  );
}