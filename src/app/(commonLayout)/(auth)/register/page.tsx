import RegisterForm from "@/components/modules/auth/RegisterForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Plane, Shield, Users } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
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
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 via-transparent to-primary/30" />

        <div className="relative z-10 max-w-md space-y-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-colors">
              <Plane className="h-10 w-10" />
            </div>
            <span className="text-4xl font-bold">Travelynk</span>
          </Link>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight">
              Start Your Journey with Amazing Travelers
            </h1>
            <p className="text-lg text-white/90">
              Join our community of explorers and adventurers. Create your profile and start connecting today.
            </p>
          </div>

          <div className="space-y-4 pt-8">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/20">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Connect Globally</h3>
                <p className="text-sm text-white/80">Meet travelers from around the world</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/20">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Discover Destinations</h3>
                <p className="text-sm text-white/80">Explore new places with local insights</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/20">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Safe & Verified</h3>
                <p className="text-sm text-white/80">Trusted community with verified profiles</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-xl space-y-6">
          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden flex items-center gap-2 justify-center mb-8">
            <Plane className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Travelynk</span>
          </Link>

          <Card className="border-2">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
              <CardDescription>
                Join thousands of travelers and start your adventure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm />
            </CardContent>
          </Card>

          {/* Footer Links */}
          <p className="text-center text-sm text-muted-foreground">
            By registering, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>
            {" and "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
