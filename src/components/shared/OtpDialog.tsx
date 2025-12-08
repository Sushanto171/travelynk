"use client"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { Loader2Icon, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"

const otpClass =
  "w-10 h-12 rounded-md border border-input text-lg font-medium focus-visible:ring-2 focus-visible:ring-primary"

interface IOtpDialogProps {
  title?: string
  description?: string
  email?: string
  open: boolean
  onChange: (value: string) => void
  onClose: (open: boolean) => void
  onClick: () => void
  isPending: boolean
}

export function OtpDialog({
  title = "Enter Verification Code",
  description,
  email,
  open,
  onClose,
  onChange,
  onClick,
  isPending
}: IOtpDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}
     >
      <AlertDialogContent className="max-w-sm rounded-xl border border-border bg-card shadow-xl p-6 mx-auto">
        <AlertDialogHeader className="flex flex-col items-center space-y-4">
          {/* Icon */}
          <ShieldCheck className="h-10 w-10 text-primary" />

          {/* Title */}
          <AlertDialogTitle className="text-xl font-semibold tracking-tight text-center">
            {title}
          </AlertDialogTitle>

          {/* Description */}
          <AlertDialogDescription className="text-sm text-muted-foreground text-center">
            {description ?? `We’ve sent a 6-digit code to ${email}. Please enter it below.`}
          </AlertDialogDescription>

          {/* OTP Input */}
          <div className="flex justify-center pt-2">
            <InputOTP
              maxLength={6}
              onChange={onChange}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              className="gap-3"
            >
              <InputOTPGroup className="flex gap-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlot key={i} index={i} className={otpClass} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
        </AlertDialogHeader>

        {/* Footer */}
        <AlertDialogFooter className="pt-6">
          <div className="w-full flex gap-4 items-center justify-center">

            <Button
              disabled={isPending}
              variant="outline"
            >
              <Link aria-disabled={isPending} href="/">
                Go Back
              </Link>
            </Button>
            <Button
              disabled={isPending}
              onClick={onClick}
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                  Submit
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
