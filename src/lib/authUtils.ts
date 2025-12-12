import { UserRole } from "@/types/user.interface";

type RouteConfig = {
  patterns: RegExp[];
  exact: string[];
};

const commonProtectedRoutes: RouteConfig = {
  patterns: [],
  exact: ["/my-profile", "/settings", "/change-password","/subscriptions"],
};

const adminProtectedRoutes: RouteConfig = {
  patterns: [/^\/admin/],
  exact: [],
};


const userProtectedRoutes: RouteConfig = {
  patterns: [/^\/dashboard/],
  exact: [],
};

const isRouteMatches = (pathname: string, routes: RouteConfig) => {
  if (routes.exact.includes(pathname)) {
    return true;
  }

  return routes.patterns.some((pattern) => pattern.test(pathname));
};

export const getRouteOwner = (
  pathname: string
): "ADMIN" | "USER" | "COMMON" | null => {
  if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  }
  if (isRouteMatches(pathname, userProtectedRoutes)) {
    return "USER";
  }
  if (isRouteMatches(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }
  return null;
};

const authRoutes = [
  "/login",
  "/register",
  "/forget-password",
  "/verify"
];

export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route) => route === pathname);
};

export const getDefaultDashboardRoute = (role: UserRole) => {
  switch (role) {
    case UserRole.ADMIN:
      return "/admin/dashboard";
    case UserRole.USER:
      return "/dashboard";
    default:
      return "/";
  }
};

export const isValidUrlForRole = (pathname: string, role: UserRole) => {
  const routeOwner = getRouteOwner(pathname);
  if (routeOwner === "COMMON" || routeOwner === null) {
    return true;
  }
  if (routeOwner === role) {
    return true;
  }
  return false;
};
