import { NextRequest, NextResponse } from "next/server";
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute } from "./lib/authUtils";
import { deleteCookie, getCookie } from "./lib/cookieHelpers";
import { jwtHelper } from "./lib/jwt";
import { UserRole } from "./types/user.interface";

export const proxy = async (request: NextRequest) => {
  const { pathname, origin, searchParams } = request.nextUrl;

  const ignoredPrefixes = ["/api", "/_next", "/favicon.ico", "/sitemap.xml", "/robots.txt", "/assets"];
  if (ignoredPrefixes.some(p => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Skip Server Actions / mutation POSTs
  if (request.method === "POST") {
    return NextResponse.next();
  }


  if (request.method === "POST" && isAuthRoute(pathname)) {
    return NextResponse.next();
  }

  const isAuthPage = isAuthRoute(pathname)
  const routeOwner = getRouteOwner(pathname)
  let userRole: UserRole | null = null


  if (pathname === "/verify") {
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.redirect(new URL("/", origin));
    }
  }

  const accessToken = await getCookie("accessToken")

  if (accessToken) {
    try {
      const decoded = jwtHelper.verifyToken(accessToken as string, process.env.JWT_ACCESS_SECRET as string)
      userRole = decoded.role
    } catch {
      await deleteCookie("accessToken")
      await deleteCookie("refreshToken")
      return NextResponse.redirect(new URL(`/login?redirectTo=${pathname}`, origin))
    }
  }

  // --- Enforce global access rules ---
  // Case: No role and no restricted ownership → allow
  if (!userRole && !routeOwner) return NextResponse.next();

  // Case: Hitting /login|/register but user already authenticated → redirect dashboard
  if (isAuthPage && userRole) {
    return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole), origin));
  }


  // prevent unAuthorized user for protected route
  if (routeOwner && !userRole) {
    return NextResponse.redirect(new URL(`/login?redirectTo=${pathname}`, origin))
  }

  // --- Route-level authorization (RBAC) ---
  if (routeOwner && userRole) {
    // (redirectTo ? redirectTo : new URL(getDefaultDashboardRoute(userRole), origin))
    // Open to all → allow
    if (routeOwner === "COMMON") return NextResponse.next()

    const isAdminRoute = routeOwner === "ADMIN"
    const isUserRoute = routeOwner === "USER"

    const isAuthorized = (isAdminRoute && userRole === UserRole.ADMIN) || (isUserRoute && userRole === UserRole.USER)

    if (!isAuthorized) {
      return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole), origin));
    }
    return NextResponse.next()
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
