"use server";

import { deleteCookie } from "@/lib/tokenHelpers";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const logoutUser = async () => {
  await deleteCookie("accessToken");
  await deleteCookie("refreshToken");
  revalidateTag("user-info", { expire: 0 });
  redirect("/login?loggedOut=true");
};