/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { LoadingButton } from "@/components/shared/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import GetFieldError from "@/lib/GetFieldError";
import {
  createMultipleInterests,
  updateInterest,
} from "@/services/admin/interestManagement";
import { IInterest } from "@/types/interest.interface";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

interface InterestModalProps {
  open: boolean;
  onClose: () => void;
  interest?: IInterest;
  onSuccess: () => void;
}

export default function InterestFormDialog({
  open,
  onClose,
  interest,
  onSuccess,
}: InterestModalProps) {
  const isCreate = !interest;

  // ---------- Initialize Rows ----------
  const [rows, setRows] = useState(
    isCreate ? [{ name: "" }] : [{ name: interest?.name }]
  );

  const addRow = () =>
    setRows((prev) => [...prev, { name: "" }]);

  const removeRow = (index: number) =>
    setRows((prev) => prev.filter((_, i) => i !== index));

  // ---------- Server Action Handler ----------
  const [state, action, isPending] = useActionState(
    isCreate ? createMultipleInterests : updateInterest,
    null
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      onSuccess();
      onClose();
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md overflow-y-auto max-h-[400px]">
        <DialogHeader>
          <DialogTitle>
            {isCreate ? "Create Interest" : "Update Interest"}
          </DialogTitle>
        </DialogHeader>

        <form action={action} className="space-y-5">
          <FieldGroup className="gap-4">

            {rows.map((row, i) => (
              <div key={i} className="space-y-3 border rounded-md p-4 bg-background">

                {/** Hidden ID in update mode */}
                {interest && (
                  <Input
                    name="id"
                    defaultValue={interest?.id || state?.FormData?.id}
                    hidden
                  />
                )}

                {/** NAME FIELD */}
                <Field>
                  <FieldLabel htmlFor={`name-${i}`}>Name</FieldLabel>
                  <Input
                    id={`name-${i}`}
                    name={isCreate ? `interests[${i}].name` : "name"}
                    defaultValue={row?.name || interest?.name}
                    placeholder="e.g. Traveling"
                  />

                  <GetFieldError
                    state={state}
                    name={isCreate ? `interests.${i}` : "name"}
                  />
                </Field>

                {/** REMOVE ROW (CREATE MODE ONLY) */}
                {isCreate && rows.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    className="w-full"
                    onClick={() => removeRow(i)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}

            {/** ADD ROW button (CREATE ONLY) */}
            {isCreate && (
              <Button
                type="button"
                variant="secondary"
                className="w-full"
                onClick={addRow}
              >
                Add Another Interest
              </Button>
            )}
          </FieldGroup>

          {/** FOOTER ACTIONS */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>

            <LoadingButton isLoading={isPending} loadingText="Saving...">
              {isCreate ? "Create" : "Update"}
            </LoadingButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
