"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function VerifySuccessMessage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const verify = searchParams.get("verified");

  useEffect(() => {
    if (verify === "true") {
      toast.success("Verification successfully");

      const params = new URLSearchParams(searchParams.toString());
      params.delete("verified");

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [verify, pathname, router, searchParams]);

  return null;
}
