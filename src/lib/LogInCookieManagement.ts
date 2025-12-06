"use server"

import { getToken, setCookie } from "./tokenHelpers";

export const loginCookieManagement = async (res: Response) => {
  const setCookieHeaders = res.headers.getSetCookie();
  if (!setCookieHeaders.length) {
    throw new Error("No Headers Cookie Found")
  }
  const accessToken = await getToken("accessToken", setCookieHeaders)
  const refreshToken = await getToken("refreshToken", setCookieHeaders)

  if (!refreshToken || !accessToken) {
    throw new Error("No Headers token found")
  }
  await setCookie(accessToken)
  await setCookie(refreshToken)
}