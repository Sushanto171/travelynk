"use server"
import { getDefaultDashboardRoute, isValidUrlForRole } from "@/lib/authUtils";
import { catchAsyncAction } from "@/lib/catchAsyncAction";
import { loginCookieManagement } from "@/lib/LogInCookieManagement";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { loginValidationZodSchema } from "@/zod/auth/loginUser.validation";
import { redirect } from "next/navigation";
import { getUserAction } from "./getUser.service";
import {  NextResponse } from 'next/server';
import { UserRole } from "@/types/user.interface";

export const login = catchAsyncAction(async (_pres, formData) => {
  const payload = {
    email: formData.get("email"),
    password: formData.get("password")
  }
  // login?redirectTo="my-profile"
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

  
  // from server redirect ==> "/verify"
  if (result.redirectTo) {
    return redirect(`${result.redirectTo}`)
  }
  
  if (!result.success) {
    throw new Error(process.env.NODE_ENV === "development" ? result.message : "Login Failed. You might have entered incorrect email or password.")
  }

  await loginCookieManagement(res)

  const user =await getUserAction() 

  const userRole : UserRole = user!.role

  if (redirectTo) {
      const requestedPath = redirectTo.toString();
      if (isValidUrlForRole(requestedPath, userRole)) {
      return  redirect(`${requestedPath}?loggedIn=true`);
      } else {
       return redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
      }
    } else {
     return redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
    }
})