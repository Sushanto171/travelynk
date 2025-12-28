
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
 * credentials: "omit"   
 *  }
 *
 */

const publicServerFetchHelper: IServerFetchProps = async (endpoint, options) => {

  const response = await fetch(`${baseUrl}${endpoint}`, {
    headers: {
      ...options.headers,
    },
    credentials: "omit",
    ...options,
  });

  return response
}


export const publicServerFetch = {
  get: async (endpoint: string, options?: RequestInit) => publicServerFetchHelper(endpoint, { method: "GET", ...options }),
}

