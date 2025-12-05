"use server"

import { serverFetch } from "@/lib/server-fetch";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const verify = async (payload: { email: string, otp: string, token?: string }) => {
  try {
    const { token, ...data } = payload

    const res = await serverFetch.post(
      `/auth/verify${token ? `?token=${token}` : ""}`,
      {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json()
    console.log(JSON.stringify(data));
    return result
    // return
  } catch (error: any) {
    console.log(error);
    return error.message
  }
}