"use client"
import { ManagementPageHeader } from '@/components/shared/ManagementPageHeader';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import InterestFormDialog from './InterestFormDialog';

export default function InterestManagementHeader() {
  const [open, setOpen] = useState(false)
  const [key, setKey] = useState(1)

  const [, startTransition] = useTransition()
  const router = useRouter()

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh()
    })
  }

  const handleDialogOpen = () => {
    setOpen(true)
    setKey(prev => prev + 1)
  }
  return (
    <div>
      <ManagementPageHeader
        title="Interests Management"
        description="Manage interests and update"
        action={
          {
            label: "Add Interest",
            onClick: () => handleDialogOpen()
          }
        }
      />
      
      <InterestFormDialog
        open={open}
        key={key}
        onClose={() => setOpen(false)}
        onSuccess={handleRefresh}
      />

    </div>
  );
}