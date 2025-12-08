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
  const res = await serverFetch.get("/country")
  const result = await res.json()
  return result?.data ?? []
})


export const createMultipleCountries = catchAsyncAction(async (pre: any, formData: FormData) => {


  const entries = Array.from(formData.entries())

  const countries: ICountry[] = transformEntriesToCountries(entries)

  const validate = zodValidator(countries, createCountriesArraySchemaZod as unknown as ZodObject)

  if (!validate.success || !validate.data) {
    return validate
  }

  const payload = validate.data

  const res = await serverFetch.post("/country", {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  })

  return await res.json()

})

export const updateCountry = catchAsyncAction(async (pre: any, formData: FormData) => {

  const id = formData.get('id')
  const code = formData.get('code')
  const name = formData.get("name")

  if (!code || !name || !id) {
    throw new Error(`Country ${code || name ||id} not found`)
  }

  const payload ={
    id,
    code ,
    name
  }
  const res = await serverFetch.patch("/country", {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  })
  return await res.json()

})