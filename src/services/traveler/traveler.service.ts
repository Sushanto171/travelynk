"use server"

import { catchAsyncAction } from "@/lib/catchAsyncAction";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { UpdateTravelerInput, updateTravelerSchema } from "@/zod/traveler/updateTraveler.validation";
import { UUID } from "crypto";

export const updateTraveler = catchAsyncAction(async (pre, formData: FormData) => {
  const id = formData.get("id")
  const payload: UpdateTravelerInput = {
    id: formData.get("id") as UUID,
    name: formData.get("name") as string|| undefined,
    bio: formData.get("bio") as string|| undefined,
    contact_number: formData.get("contact_number") as string || undefined,
    date_of_birth: formData.get("date_of_birth")
      ? new Date(formData.get("date_of_birth") as string) : undefined,
    address: formData.get("address") as string|| undefined,
    current_location: formData.get("current_location") as string|| undefined,
    interests: formData.getAll("interests[]").map((v) => v.toString()),
    remove_interests: formData.getAll("remove_interests[]").map((v) => v.toString()),
    visited_countries: formData.getAll("visited_countries[]").map((v) => v.toString()),
    remove_visited_countries: formData
      .getAll("remove_visited_countries[]")
      .map((v) => v.toString()),
    profile_photo: formData.get("file") as File|| undefined
  };


  const validate = zodValidator(payload, updateTravelerSchema)

  if (!validate.success || !validate.data) {
    return validate
  }

  const {profile_photo,...data} = validate.data
  const newFormData = new FormData()

  newFormData.append("data", JSON.stringify(data))
  newFormData.append("file", profile_photo as Blob)

  const res = await serverFetch.patch(`/traveler/${id}`,{
    body: newFormData
  })

  const result = await res.json()
  console.log(result)
  return result

})