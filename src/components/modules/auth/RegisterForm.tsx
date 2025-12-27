"use client";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GetFieldError from "@/lib/GetFieldError";
import { registerTraveler } from "@/services/auth/register.service";
import { EyeIcon, EyeOffIcon, Lock, Mail, MapPin, User } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [state, action, isPending] = useActionState(registerTraveler, null);

  useEffect(() => {
    if (!state) return;
    if (!state.success && !Array.isArray(state.error)) {
      toast.error(
        state.message === "Duplicate key error"
          ? "This email already exists"
          : state.message
      );
    }
  }, [state]);

  return (
    <form action={action} className="space-y-5">
      {/* Name and Email Row */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              defaultValue={state?.FormData?.name || ""}
              className="pl-10 h-11"
            />
          </div>
          <GetFieldError state={state} name="name" />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              defaultValue={state?.FormData?.email || ""}
              className="pl-10 h-11"
            />
          </div>
          <GetFieldError state={state} name="email" />
        </div>
      </div>

      {/* Address Field */}
      <div className="space-y-2">
        <Label htmlFor="address" className="text-sm font-medium">
          Address <span className="text-muted-foreground">(Optional)</span>
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="address"
            name="address"
            type="text"
            placeholder="City, Country"
            defaultValue={state?.FormData?.address || ""}
            className="pl-10 h-11"
          />
        </div>
      </div>

      {/* Password and Confirm Password Row */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
              className="pl-10 pr-10 h-11"
            />
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-0 h-11 w-11 hover:bg-transparent"
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
              ) : (
                <EyeIcon className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          <GetFieldError state={state} name="password" />
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="pl-10 pr-10 h-11"
            />
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-0 top-0 h-11 w-11 hover:bg-transparent"
            >
              {showConfirmPassword ? (
                <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
              ) : (
                <EyeIcon className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          <GetFieldError state={state} name="confirmPassword" />
        </div>
      </div>

      {/* Register Button */}
      <LoadingButton
        type="submit"
        isLoading={isPending}
        loadingText="Creating your account..."
        className="w-full h-11 text-base font-semibold"
      >
        Create Account
      </LoadingButton>

      {/* Login Link */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline font-semibold">
          Sign in here
        </Link>
      </p>
    </form>
  );
}
