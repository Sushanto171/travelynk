"use client";
import { OtpDialog } from "@/components/shared/OtpDialog";
import { verify } from "@/services/auth/verify.service";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function VerifyEmail({ email, token }: { email: string; token?: string }) {
  const router = useRouter();

  const [open, setOpen] = useState(!!email);
  const [otp, setOtp] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (!otp) return;

    startTransition(async () => {
      const res = await verify({ email, otp, token });

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success("Email verified successfully");

      // optional: navigate user to dashboard or login
      router.replace("/login");
    });
  };

  return (
    <OtpDialog
      open={open}
      onClose={setOpen}
      onChange={setOtp}
      onClick={handleSubmit}
      email={email}
      isPending={isPending}
    />
  );
}
