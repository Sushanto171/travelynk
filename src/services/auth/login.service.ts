"use server"
import { getDefaultDashboardRoute, isValidUrlForRole } from "@/lib/authUtils";
import { catchAsyncAction } from "@/lib/catchAsyncAction";
import { setCookie } from "@/lib/cookieHelpers";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { UserRole } from "@/types/user.interface";
import { loginValidationZodSchema } from "@/zod/auth/loginUser.validation";
import { parse } from "cookie";
import jwt, { Secret } from "jsonwebtoken";
import { redirect } from "next/navigation";

export type IAccessToken = {
  accessToken?: string;
  "Max-Age"?: string;
  Path?: string;
  Expires?: string;
  SameSite?: "lax" | "none";
};

export type IRefreshToken = {
  refreshToken?: string;
  "Max-Age"?: string;
  Path?: string;
  Expires?: string;
  SameSite?: "lax" | "none";
};

export const login = catchAsyncAction(async (_pres, formData) => {
  const payload = {
    email: formData.get("email"),
    password: formData.get("password")
  }

  let accessTokenObject: IAccessToken = {};
  let refreshTokenObject: IRefreshToken = {};
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

  // await loginCookieManagement(res)

  const setCookieHeaders = res.headers.getSetCookie();

  if (!setCookieHeaders.length) {
    throw new Error("No set-cookie headers found");
  }

  setCookieHeaders.forEach((cookie) => {
    if (parse(cookie)["accessToken"]) {
      accessTokenObject = parse(cookie) as IAccessToken;
    }
    if (parse(cookie)["refreshToken"]) {
      refreshTokenObject = parse(cookie) as IRefreshToken;
    }
  });

  if (!accessTokenObject.accessToken) {
    throw new Error("AccessToken does not found");
  }
  if (!refreshTokenObject.refreshToken) {
    throw new Error("RefreshToken does not found");
  }

  await setCookie("accessToken", accessTokenObject.accessToken, {
    secure: true,
    sameSite: accessTokenObject.SameSite || "none",
    httpOnly: true,
    path: accessTokenObject.Path || "/",
    expires: Date.parse(accessTokenObject.Expires as string),
  });

  await setCookie("refreshToken", refreshTokenObject.refreshToken, {
    secure: true,
    sameSite: refreshTokenObject.SameSite || "none",
    httpOnly: true,
    path: refreshTokenObject.Path || "/",
    expires: Date.parse(refreshTokenObject.Expires as string),
  });

  const verifiedToken = jwt.verify(
    accessTokenObject.accessToken as string,
    process.env.JWT_ACCESS_SECRET as Secret
  );

  if (typeof verifiedToken === "string") {
    throw new Error("Invalid token");
  }

  const userRole: UserRole = verifiedToken.role;



  // const userRole: UserRole = result.data.role ?? UserRole.USER

  if (redirectTo) {
    const requestedPath = redirectTo.toString();
    if (isValidUrlForRole(requestedPath, userRole)) {
      return redirect(`${requestedPath}?loggedIn=true`);
    } else {
      return redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
    }
  } else {
    return redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
  }

  return result
})