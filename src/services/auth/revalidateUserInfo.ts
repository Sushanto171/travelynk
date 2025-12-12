"use server";

import { revalidateTag } from "next/cache";
export async function revalidateUserInfo() {
  revalidateTag("user-info", { expire: 0 });
}
