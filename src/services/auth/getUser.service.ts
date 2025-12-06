"use server"
import catchAsync from "@/lib/catchAsync";
import { serverFetch } from "@/lib/server-fetch";
import { IUser } from "@/types/user.interface";

export const getUser = catchAsync(async (): Promise<IUser> => {

  const res = await serverFetch.get("/auth/me", {
    credentials: "include",
    cache: "force-cache",
    next: { tags: ["user-info"] },
  })
  const result = await res.json()
  console.log(result);
  return result
}) 