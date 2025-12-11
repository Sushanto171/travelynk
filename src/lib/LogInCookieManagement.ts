"use server"

import { getHeaderToken } from "./cookieHelpers";

export const loginCookieManagement = async (res: Response) => {
  const setCookieHeaders = res.headers.getSetCookie();
  if (!setCookieHeaders.length) {
    throw new Error("No Headers Cookie Found")
  }
  const accessToken = await getHeaderToken("accessToken", setCookieHeaders)
  const refreshToken = await getHeaderToken("refreshToken", setCookieHeaders)

  if (!refreshToken || !accessToken) {
    throw new Error("No Headers token found")
  }
  // await setCookie(accessToken)
  // await setCookie(refreshToken)
}