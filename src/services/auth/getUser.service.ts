"use server";

import { serverFetch } from "@/lib/server-fetch";
import { IUser, UserRole } from "@/types/user.interface";

export async function getUserAction(): Promise<IUser | null> {
  try {
    const res = await serverFetch.get("/auth/me", {
      credentials: "include",
      cache: "force-cache",
      next: { tags: ["user-info"] },
    })
    const result = await res.json();
    if (!result.success) {
      return null
    }

    switch (result.data.role as UserRole) {
      case UserRole.ADMIN:
        result.data.name = result.data?.admin?.name || "Unknown User";
        break
      case UserRole.USER:
        result.data.name = result.data?.traveler?.name || "Unknown User";
        break
      default:
        result.data.name = "Unknown User";
    }
    
    return result.data
  } catch {
    return null;
  }
}
