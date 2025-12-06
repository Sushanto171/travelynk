"use server"

import catchAsync from "@/lib/catchAsync";
import { jwtHelper } from "@/lib/jwt";
import { serverFetch } from "@/lib/server-fetch";
import { redirect } from "next/navigation";
import { login } from "./login.service";



export const verify = catchAsync(async (payload: { email: string, otp: string, token?: string, redirectTo?: string }) => {

  const { token, ...data } = payload

  const res = await serverFetch.post(
    `/auth/verify${token ? `?token=${token}` : ""}`,
    {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await res.json()

  if (!result.success) {
    throw new Error(result.message)
  }

  if (result.success) {
    if (result.data.token) {
      const info = jwtHelper.verifyToken(result.data.token, process.env.NEXT_PUBLIC_JWT_LOGIN_SECRET as string)
      const newFormData = new FormData()

      newFormData.append("email", info.email)
      newFormData.append("password", info.password)
      return await login(null, newFormData)

    }
    if (payload.redirectTo) {
      const path = payload.redirectTo.toString()
      return redirect(`${path}?verified=true`)
    }
    if (!payload.redirectTo) {
      return redirect("/login?verified=true")
    }
  }

})