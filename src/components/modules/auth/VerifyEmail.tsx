"use client"
import { OtpDialog } from '@/components/shared/OtpDialog';
import { verify } from '@/services/auth/verify.service';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

export default function VerifyEmail({ email, token }: { email?: string, token?: string }) {
  const [open, setOpen] = useState(email ? true : false)
  const [otp, setOtp] = useState("")
  const [isPending, startTransition] = useTransition()
  if (!email) return
  const handleSubmit = () => {
    if (!otp) return
    startTransition(async () => {
      const res = await verify({
        email, otp, token
      })
      console.log(res);
      if (!res.success) {
        toast.error(res.message)
      }
    })
  }

  return (
    <div>
      <OtpDialog
        open={open}
        onClose={(value: boolean) => setOpen(value)}
        onChange={(value) => setOtp(value)}
        onClick={handleSubmit}
        email={email}
        isPending={isPending}
      />
    </div>
  );
}