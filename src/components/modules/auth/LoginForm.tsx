"use client";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GetFieldError from "@/lib/GetFieldError";
import { login } from "@/services/auth/login.service";
import { EyeIcon, EyeOffIcon, Lock, Mail, ShieldUser ,UserLock} from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export default function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const [state, action, isPending] = useActionState(login, null);

  useEffect(() => {
    if (!state) return;
    if (!state.success && !Array.isArray(state.error)) {
      toast.error(state.message);
    }
  }, [state]);

  const fillCredentials = (userEmail: string, userPassword: string) => {
    setEmail(userEmail);
    setPassword(userPassword);
    toast.success("Credentials filled! Click Login to continue.");
  };

  return (
    <div className="space-y-6">
      <form action={action} className="space-y-5">
        {redirectTo && (
          <input name="redirectTo" type="hidden" defaultValue={redirectTo} />
        )}

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="pl-10 h-11"
            />
          </div>
          <GetFieldError state={state} name="email" />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-xs text-primary hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={isVisible ? "text" : "password"}
              autoComplete="current-password"
              className="pl-10 pr-10 h-11"
            />
            <Button
              variant="ghost"
              size="icon"
              aria-label={isVisible ? "Hide password" : "Show password"}
              className="absolute right-0 top-0 h-11 w-11 hover:bg-transparent"
              onClick={toggleVisibility}
              type="button"
            >
              {isVisible ? (
                <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
              ) : (
                <EyeIcon className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          <GetFieldError state={state} name="password" />
        </div>

        {/* Login Button */}
        <LoadingButton
          isLoading={isPending}
          loadingText="Logging in..."
          className="w-full h-11 text-base font-semibold"
        >
          Login to Your Account
        </LoadingButton>

        {/* Register Link */}
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline font-semibold">
            Create one now
          </Link>
        </p>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Quick Test Access
          </span>
        </div>
      </div>

      {/* Quick Fill Buttons */}
      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => fillCredentials("admin@example.com", "123456")}
          className="w-full h-11 justify-start gap-3 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-600 dark:hover:text-red-400 transition-colors group"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 group-hover:bg-red-500/20">
            <ShieldUser className="w-4 h-4 text-red-500" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-semibold text-sm">Admin Account</div>
            <div className="text-xs text-muted-foreground">admin@example.com</div>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 font-semibold">
            Admin
          </span>
        </Button>

        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => fillCredentials("traveler@gmail.com", "123456")}
          className="w-full h-11 justify-start gap-3 hover:bg-blue-500/10 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20">
            <UserLock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-semibold text-sm">User Account</div>
            <div className="text-xs text-muted-foreground">traveler@gmail.com</div>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold">
            User
          </span>
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        Click a test account to auto-fill credentials
      </p>
    </div>
  );
}
