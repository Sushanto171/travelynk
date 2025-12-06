"use server"
import { catchAsyncAction } from "@/lib/catchAsyncAction";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { loginValidationZodSchema } from "@/zod/auth/loginUser.validation";
import { redirect } from "next/navigation";

export const login = catchAsyncAction(async (_pres, formData) => {
  const payload = {
    email: formData.get("email"),
    password: formData.get("password")
  }
  // login?redirectTO="my-profile"
  const redirectTo = formData.get("redirectTo")

  const validate = zodValidator(payload, loginValidationZodSchema)

  if (!validate.success || !validate.data) {
    return validate
  }

  const loginData = {
    email: validate.data.email,
    password: validate.data.password
  }

  const res = await serverFetch.post("/auth/login", {
    body: JSON.stringify(loginData),
    headers: {
      "Content-Type": "application/json"
    }
  })
  const result = await res.json()


  if (result.success) {
    // from server redirect ==> "/verify"
    if (result.redirectTo) {
      return redirect(result.redirectTo)
    }
    if (redirectTo) {
      return redirect(redirectTo)
    } {
      // from verify ==> "/dashboard"
      return redirect("/dashboard")
    }
  }
  return result
})