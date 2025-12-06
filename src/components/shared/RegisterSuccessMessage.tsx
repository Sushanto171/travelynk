"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function RegisterSuccessMessage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const register = searchParams.get("register");

  useEffect(() => {
    if (register === "true") {
      toast.success("Registration success");

      const params = new URLSearchParams(searchParams.toString());
      params.delete("register");

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [register, pathname, searchParams, router]);

  return null;
}
