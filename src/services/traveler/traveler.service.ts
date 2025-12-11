"use server"

import catchAsync from "@/lib/catchAsync";
import { catchAsyncAction } from "@/lib/catchAsyncAction";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { UpdateTravelerInput, updateTravelerSchema } from "@/zod/traveler/updateTraveler.validation";
import { UUID } from "crypto";
import { revalidateTag } from "next/cache";

export const updateTraveler = catchAsyncAction(async (pre, formData: FormData) => {
  const rawDob = formData.get("date_of_birth");

  const parseDate = (value: FormDataEntryValue | null) => {
    if (!value) return undefined;
    if (typeof value !== "string" || value.trim() === "") return undefined;

    const d = new Date(value);
    return isNaN(d.getTime()) ? undefined : d;
  };

  const payload: UpdateTravelerInput = {
    id: formData.get("id") as UUID,
    name: formData.get("name") as string || undefined,
    bio: formData.get("bio") as string || undefined,
    contact_number: formData.get("contact_number") as string || undefined,
    date_of_birth: parseDate(rawDob),
    address: formData.get("address") as string || undefined,
    current_location: formData.get("current_location") as string || undefined,

    interests: formData.getAll("interests[]").map(String),
    remove_interests: formData.getAll("remove_interests[]").map(String),

    visited_countries: formData.getAll("visited_countries[]").map(String),
    remove_visited_countries: formData
      .getAll("remove_visited_countries[]")
      .map(String),

    profile_photo: formData.get("file") as File || undefined,
  };



  const validate = zodValidator(payload, updateTravelerSchema)

  if (!validate.success || !validate.data) {
    return validate
  }

  const { profile_photo, id, ...data } = validate.data
  const newFormData = new FormData()

  newFormData.append("data", JSON.stringify(data))
  newFormData.append("file", profile_photo as Blob)

  const res = await serverFetch.patch(`/traveler/${id}`, {
    body: newFormData
  })

  revalidateTag("user-info", { expire: 0 })

  const result = await res.json()

  if (!result?.success) {
    throw new Error(
      `Profile update failed: ${result?.message || "Unknown server error"}`
    );
  }

  return result

})

export const getTravelerById = catchAsync(async (id: string) => {
  const res = await serverFetch.get(`/traveler/${id}`)
  const result = await res.json()
  return result.data
})