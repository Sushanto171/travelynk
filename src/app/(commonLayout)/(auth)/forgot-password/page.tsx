import ForgotPasswordForm from "@/components/modules/auth/ForgotPasswordForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, KeyRound, Mail, Plane } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex flex-col justify-center items-center p-12 text-white relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/heroImage.jpg')" }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 via-transparent to-orange-500/30" />

        <div className="relative z-10 max-w-md space-y-8 text-center">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-colors">
              <Plane className="h-10 w-10" />
            </div>
            <span className="text-4xl font-bold">Travelynk</span>
          </Link>

          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-4">
              <KeyRound className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold leading-tight">
              Reset Your Password
            </h1>
            <p className="text-lg text-white/90">
              Don&apos;t worry! It happens. Enter your email and we&apos;ll send you instructions to reset your password.
            </p>
          </div>

          <div className="pt-8 space-y-3 text-sm text-white/80">
            <div className="flex items-center gap-2 justify-center">
              <Mail className="w-4 h-4" />
              <span>Check your email inbox</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <KeyRound className="w-4 h-4" />
              <span>Click the reset link</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Plane className="w-4 h-4" />
              <span>Get back to traveling!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden flex items-center gap-2 justify-center mb-8">
            <Plane className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Travelynk</span>
          </Link>

          {/* Back to Login */}
          <Link href="/login">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Button>
          </Link>

          <Card className="border-2">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
              <CardDescription>
                Enter your email address and we&apos;ll send you a reset link
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ForgotPasswordForm />
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link href="/login" className="text-primary hover:underline font-semibold">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}