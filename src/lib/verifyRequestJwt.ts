import { NextRequest, NextResponse } from "next/server"
import { deleteCookie } from "./cookieHelpers"
import { jwtHelper } from "./jwt"

export const verifyRequestJwt = async (cookie: string, req: NextRequest) => {
  try {
    const decoded = jwtHelper.verifyToken(cookie, process.env.JWT_ACCESS_SECRET as string)
    return decoded
  } catch {
    await deleteCookie("accessToken")
    await deleteCookie("refreshToken")
    const loginUrl = new URL("/login", req.url)
    return NextResponse.redirect(loginUrl)
  }
}