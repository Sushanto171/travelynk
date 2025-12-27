import LoginForm from "@/components/modules/auth/LoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ISearchParams } from "@/types/searchParams";
import { Plane, Shield, User } from "lucide-react";
import Link from "next/link";

export default async function LoginPage({ searchParams }: ISearchParams) {
  const { redirectTo } = await searchParams;

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex flex-col justify-center items-center p-12 text-white relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/heroImage.jpg')" }}
        />
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />

        {/* Subtle animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-emerald-500/30" />

        <div className="relative z-10 max-w-md space-y-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-colors">
              <Plane className="h-10 w-10" />
            </div>
            <span className="text-4xl font-bold">Travelynk</span>
          </Link>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight">
              Welcome Back to Your Travel Community
            </h1>
            <p className="text-lg text-white/90">
              Connect with fellow travelers, plan amazing trips, and create unforgettable memories together.
            </p>
          </div>

          <div className="space-y-4 pt-8">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/20">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Find Travel Companions</h3>
                <p className="text-sm text-white/80">Match with like-minded travelers worldwide</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/20">
                <Plane className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Plan Together</h3>
                <p className="text-sm text-white/80">Collaborate on itineraries and share experiences</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/20">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Travel Safely</h3>
                <p className="text-sm text-white/80">Verified profiles and secure messaging</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden flex items-center gap-2 justify-center mb-8">
            <Plane className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Travelynk</span>
          </Link>

          <Card className="border-2">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm redirectTo={redirectTo} />
            </CardContent>
          </Card>


          {/* Footer Links */}
          {/* <div className="text-center text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary hover:underline">
              Privacy Policy
            </Link>
            {" · "}
            <Link href="/terms" className="hover:text-primary hover:underline">
              Terms of Service
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}