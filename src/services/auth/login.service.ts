"use server"
import { getDefaultDashboardRoute } from "@/lib/authUtils";
import { catchAsyncAction } from "@/lib/catchAsyncAction";
import { loginCookieManagement } from "@/lib/LogInCookieManagement";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { loginValidationZodSchema } from "@/zod/auth/loginUser.validation";
import { redirect } from "next/navigation";
import { getUserAction } from "./getUser.service";

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

  console.log({result});

  // from server redirect ==> "/verify"
  if (result.redirectTo) {
    return redirect(`${result.redirectTo}`)
  }

  if (!result.success) {
    throw new Error(process.env.NODE_ENV === "development" ? result.message : "Login Failed. You might have entered incorrect email or password.")
  }

  await loginCookieManagement(res)

  const user = await getUserAction()
  if (redirectTo) {
    // from loginForm ===> "/any"
    return redirect(`${redirectTo}?loggedIn=true`)
  } {
    // from verify ==> "/dashboard"
    return redirect(`${getDefaultDashboardRoute(user!.role)}?loggedIn=true`)
  }
})