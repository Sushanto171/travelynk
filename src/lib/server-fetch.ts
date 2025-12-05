const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:5000/api/v1"

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

  const { headers } = options

  const response = await fetch(`${baseUrl}/${endpoint}`, {
    ...headers,
    credentials: "include",
    ...options
  })

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

