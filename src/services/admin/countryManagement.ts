/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import catchAsync from "@/lib/catchAsync"
import { catchAsyncAction } from "@/lib/catchAsyncAction"
import { serverFetch } from "@/lib/server-fetch"
import { zodValidator } from "@/lib/zodValidator"
import { ICountry } from "@/types/country.interface"
import { createCountriesArraySchemaZod } from "@/zod/admin/country.validation"
import { ZodObject } from "zod"
import { transformEntriesToCountries } from './../../lib/transformEntriesToCountries'

export const getCountry = catchAsync(async (params?: string) => {
  const res = await serverFetch.get(`/country?${params ? `?searchTerm=${params}` : ""}`)
  const result = await res.json()
  return result?.data ?? []
})


export const createMultipleCountries = catchAsyncAction(async (_prev: any, formData: FormData) => {
  const entries = Array.from(formData.entries());

  const countries: ICountry[] = transformEntriesToCountries(entries);

  const validate = zodValidator(
    countries,
    createCountriesArraySchemaZod as unknown as ZodObject
  );

  if (!validate.success || !validate.data) {
    return {
      ...validate,
      message: "All Field are required: code, name"
    };
  }

  const payload = validate.data;

  const res = await serverFetch.post("/country", {
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  });

  const result = await res.json();

  if (!result?.success) {
    throw new Error(
      `Bulk country creation failed: ${result?.message || "Unknown server error"}`
    );
  }

  return result;
});

export const updateCountry = catchAsyncAction(async (_prev: any, formData: FormData) => {
  const id = formData.get("id")?.toString().trim()
  const code = formData.get("code")?.toString().trim()
  const name = formData.get("name")?.toString().trim()

  if (!code || !name) {
    throw new Error(`All fields are required: code, name`)
  }

  const payload = { id, code, name }

  const res = await serverFetch.patch(`/country/${id}`, {
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  })

  const result = await res.json()

  if (!result?.success) {
    throw new Error(
      `Country update failed: ${result?.message || "Unknown server error"}`
    )
  }

  return result
})


export const deleteCountryById = catchAsync(async (id: string) => {
  const res = await serverFetch.delete(`/country/${id}`,)
  const result = await res.json()

  if (!result?.success) {
    throw new Error(
      `Country deletion failed: ${result?.message || "Unknown server error"}`
    )
  }

  return result
})
