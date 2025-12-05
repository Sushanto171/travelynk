"use client"
import { OtpDialog } from '@/components/shared/OtpDialog';
import { verify } from '@/services/auth/verify.service';
import { useState, useTransition } from 'react';

export default function VerifyEmail({ email, token }: { email?: string, token?: string }) {
  const [open, setOpen] = useState(email ? true : false)
  const [otp, setOtp] = useState("")
  const [isPending, startTransition] = useTransition()
  if (!email) return
  const handleSubmit = () => {
    if(!otp) return 
    console.log({ otp, email });
    startTransition(async() => {
   const res= await  verify({
        email, otp, token
      })
      console.log(res);
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