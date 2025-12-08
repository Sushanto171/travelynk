import { getCookie } from "./tokenHelpers";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api/v1"

type IServerFetchProps = (
  endpoint: string,
  options: RequestInit
) => Promise<Response>

/**
 * 
 * @param endpoint 
 * 
 * @example 
 * 
 * endpoint: "user" | "auth" | "dashboard"
 * options: {
 * method: "POST" | "GET" | "PATCH" | "DELETE" | "PUT"
 * body:{data},
 * credentials: "include"   
 *  }
 *
 */

const serverFetchHelper: IServerFetchProps = async (endpoint, options) => {
   const { headers, ...restOptions } = options;
  const accessToken = await getCookie("accessToken");
  const refreshToken = await getCookie("refreshToken");

  const cookieHeader = [
    accessToken && `accessToken=${accessToken}`,
    refreshToken && `refreshToken=${refreshToken}`,
  ]
    .filter(Boolean)
    .join("; ");

  const response = await fetch(`${baseUrl}${endpoint}`, {
    headers: {
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      ...headers,
    },
    credentials: "include",
    ...restOptions,
  });

  return response
}


export const serverFetch = {
  get: async (endpoint: string, options?: RequestInit) => serverFetchHelper(endpoint, { method: "GET", ...options }),
  post: async (endpoint: string, options: RequestInit) => serverFetchHelper(endpoint, {
    method: "POST", ...options
  }),
  put: async (endpoint: string, options: RequestInit) =>
    serverFetchHelper(endpoint, { ...options, method: "PUT" }),

  patch: async (endpoint: string, options: RequestInit) =>
    serverFetchHelper(endpoint, { ...options, method: "PATCH" }),

  delete: async (endpoint: string, options?: RequestInit) =>
    serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
}

