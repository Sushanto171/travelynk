"use server";

import catchAsync from "@/lib/catchAsync";
import { catchAsyncAction } from "@/lib/catchAsyncAction";
import { serverFetch } from "@/lib/server-fetch";
import { IUser, UserRole } from "@/types/user.interface";
import { revalidateTag } from "next/cache";

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
        result.data.profile_photo = result.data?.admin?.profile_photo || null;
        break
      case UserRole.USER:
        result.data.name = result.data?.traveler?.name || "Unknown User";
        result.data.profile_photo = result.data?.traveler?.profile_photo || null;
        break
      default:
        result.data.name = "Unknown User";
        result.data.profile_photo = null
    }

    return result.data
  } catch {
    return null;
  }
}


export const getUserById = catchAsync(async (id: string) => {
  const res = await serverFetch.get(`/user/${id}`)
  const result = await res.json()

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
})

export const updateProfilePhoto = catchAsyncAction(async (pre, formData) => {
  const res = await serverFetch.patch(`/user/update-profile-photo`, {
    body: formData
  })

  const result = await res.json()

  revalidateTag("user-info", { expire: 0 })
  if (!result?.success) {
    throw new Error(
      `Profile photo update failed: ${result?.message || "Unknown server error"}`
    );
  }
  return result
})