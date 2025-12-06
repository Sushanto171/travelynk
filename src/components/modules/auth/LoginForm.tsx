"use client";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import GetFieldError from "@/lib/GetFieldError";
import { login } from "@/services/auth/login.service";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";


export default function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const [state, action, isPending] = useActionState(login, null)
  useEffect(() => {
    if (!state) return
    if (!state.success && !Array.isArray(state.error)) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <form action={action}>
      <FieldGroup>
        {redirectTo && (
          <input name="redirectTo" type="hidden" defaultValue={redirectTo} />
        )}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="text"
            placeholder="m@example.com"
            defaultValue={"admin@example.com"}
          />
          <GetFieldError state={state} name="email" />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Link
              href="/forgot-password"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              name="password"
              placeholder="Password"
              defaultValue={"123456"}
              type={isVisible ? "text" : "password"}
            />

            <Button
              variant={"ghost"}
              aria-controls="password"
              aria-label={isVisible ? "Hide password" : "Show password"}
              aria-pressed={isVisible}
              className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center "
              onClick={toggleVisibility}
              type="button"
            >
              {isVisible ? (
                <EyeOffIcon aria-hidden="true" size={16} />
              ) : (
                <EyeIcon aria-hidden="true" size={16} />
              )}
            </Button>
          </div>
          <GetFieldError state={state} name="password" />

        </Field>
        <Field>

          <LoadingButton isLoading={isPending} loadingText="Logging in..." >
            Login
          </LoadingButton>

          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/register">Register now</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
