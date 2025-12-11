"use server"

import { catchAsyncAction } from "@/lib/catchAsyncAction";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createTravelerValidation } from "@/zod/auth/registerTraveler.validation";
import { redirect } from "next/navigation";


export const registerTraveler = catchAsyncAction(async (_pre, fromData: FormData) => {
  // (_pre, fromData);

  const payload = {
    name: fromData.get("name"),
    email: fromData.get("email"),
    address: fromData.get("address"),
    password: fromData.get("password"),
    confirmPassword: fromData.get("confirmPassword"),
  }

  const validate = zodValidator(payload, createTravelerValidation)
  if (!validate.success || !validate.data) {
    return validate
  }

  const registerData = {
    password: validate.data.password as string,
    traveler: {
      name: validate.data.name as string,
      email: validate.data.email as string,
      address: validate.data.address as string
    }
  }

  const res = await serverFetch.post("/user/create-traveler", {
    body: JSON.stringify(registerData),
    headers: {
      "Content-Type": "application/json"
    }
  })
  const result = await res.json()
  // form server ===> "/verify"
  if (result.redirectTo) {
    redirect(`${result.redirectTo}&register="true"`)
  }
  return result
})
