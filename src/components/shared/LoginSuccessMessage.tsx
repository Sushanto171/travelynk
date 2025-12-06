"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function LoginSuccessMessage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  // const fired = useRef(false); // Prevent multiple executions

  const login = searchParams.get("loggedIn");

  useEffect(() => {
    if (login === "true") {
      toast.success("You have been login successfully");

      const params = new URLSearchParams(searchParams.toString());
      params.delete("loggedIn");

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [login, pathname, router, searchParams]);

  return null;
}
