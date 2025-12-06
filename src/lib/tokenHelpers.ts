"use server";
import { parse } from "cookie";
import { cookies } from "next/headers";

interface IToken {
  name: string;
  value: string;
  Path?: string;
  Expires?: number;
  SameSite?: boolean | "none" | "lax" | "strict";
}

export const getToken = async (
  name: string,
  setCookieHeaders: string[]
): Promise<IToken | null> => {
  for (const rawCookie of setCookieHeaders) {
    const parsed = parse(rawCookie);

    // Match cookie by key
    if (parsed[name]) {
      return {
        name,
        value: parsed[name],
        Path: parsed["Path"],
        Expires: Date.parse(parsed["Expires"] as string),
        SameSite: parsed["SameSite"] as IToken["SameSite"],
      };
    }
  }

  return null;
};


export const setCookie = async (token: IToken) => {
  const cookieStore = await cookies()

  cookieStore.set(token.name, token.value, {
    expires: token.Expires as number,
    secure: true,
    httpOnly: true,
    path: token.Path,
    sameSite: "none",
  })
}