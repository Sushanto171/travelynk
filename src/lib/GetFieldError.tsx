"use client"

import { FieldDescription } from "@/components/ui/field";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function GetFieldError({ state, name }: { state: any, name: string }) {
  let error = null
  if (state && !state.success && Array.isArray(state.error)) {
    error = state.error.find((field: { message: string, field: string }) => (field.field === name) ? field.message : "")?.message
  }
  return (
    <FieldDescription className="text-red-500 text-sm">{error}</FieldDescription>
  );
}