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
import { createMultipleCountries, updateCountry } from "@/services/admin/countryManagement";
import { ICountry } from "@/types/country.interface";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

interface CountryModalProps {
  open: boolean;
  onClose: () => void;
  country?: ICountry;
  onSuccess: () => void;
}

export default function CountryFormDialog({
  open,
  onClose,
  country,
  onSuccess
}: CountryModalProps) {
  const isCreate = !country;

  // ---------- Initialize Form Rows ----------
  const [rows, setRows] = useState(
    isCreate
      ? [{ code: "", name: "" }]
      : [{ code: country.code, name: country.name }]
  );

  const addRow = () =>
    setRows((prev) => [...prev, { code: "", name: "" }]);

  const removeRow = (index: number) =>
    setRows((prev) => prev.filter((_, i) => i !== index));

  // ---------- Server Action Handler ----------
  const [state, action, isPending] = useActionState(isCreate ? createMultipleCountries : updateCountry, null);

  useEffect(() => {
    if (!state) return

    if (state.success) {
      onSuccess()
      onClose()
      toast.success(state.message)
    } else {
      toast.error(state.message)
    }

  }, [state])


  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md overflow-y-auto max-h-[400px]">
        <DialogHeader>
          <DialogTitle>
            {isCreate ? "Create Country" : "Update Country"}
          </DialogTitle>
        </DialogHeader>

        <form action={action} className="space-y-5">
          <FieldGroup className="gap-4">

            {rows.map((row, i) => (
              <div
                key={i}
                className="space-y-3 border rounded-md p-4 bg-background"
              >
                {
                  country && (
                    <Input
                      id={`id`}
                      name={"id"}
                      defaultValue={country?.id || state?.FormData?.id}
                      hidden={true}
                    />
                  )
                }

                {/* CODE FIELD */}
                <Field>
                  <FieldLabel htmlFor={`code-${i}`}>Code</FieldLabel>
                  <Input
                    id={`code-${i}`}
                    name={isCreate ? `countries[${i}].code` : "code"}
                    defaultValue={row?.code || country?.code}
                    placeholder="BN"
                  />
                  <GetFieldError
                    state={state}
                    name={"code"}
                  />
                </Field>

                {/* NAME FIELD */}
                <Field>
                  <FieldLabel htmlFor={`name-${i}`}>Name</FieldLabel>
                  <Input
                    id={`name-${i}`}
                    name={isCreate ? `countries[${i}].name` : "name"}
                    defaultValue={row?.name || country?.name}
                    placeholder="Bangladesh"
                  />
                  <GetFieldError
                    state={state}
                    name={isCreate ? `countries.${i}` : "name"}
                  />
                </Field>

                {/* REMOVE ROW (CREATE MODE ONLY) */}
                {isCreate && rows.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeRow(i)}
                    className="w-full"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}

            {/* ADD ROW BUTTON */}
            {isCreate && (
              <Button
                type="button"
                variant="secondary"
                className="w-full"
                onClick={addRow}
              >
                Add Another Country
              </Button>
            )}
          </FieldGroup>

          {/* FOOTER ACTIONS */}
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
