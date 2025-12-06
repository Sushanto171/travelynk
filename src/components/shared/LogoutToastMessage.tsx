"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function LogoutSuccessMessage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const Logout = searchParams.get("loggedOut");

  useEffect(() => {
    if (Logout === "true") {
      toast.success("Verification successfully");

      const params = new URLSearchParams(searchParams.toString());
      params.delete("loggedOut");

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [Logout, pathname, router, searchParams]);

  return null;
}
