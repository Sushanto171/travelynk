"use client";
import { LoadingButton } from "@/components/shared/LoadingButton";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import GetFieldError from "@/lib/GetFieldError";
import { registerTraveler } from "@/services/auth/register.service";
import Link from "next/link";
import { useActionState, useEffect } from 'react';
import { toast } from "sonner";

export default function RegisterForm() {

  const [state, action, isPending] = useActionState(registerTraveler, null)

  useEffect(() => {
    if (!state) return
    if (!state.success && !Array.isArray(state.error)) {
      toast.error(state.message === "Duplicate key error" ? "This email already exist" : state.message)
    }
  }, [state])

  return (
    <form action={action}>
      <FieldGroup>
        <div className="grid md:grid-cols-2 gap-4">
          {/* name */}
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input id="name" name="name" type="text"
              defaultValue={state?.FormData?.name || null}

              placeholder="John Doe" />
            <GetFieldError state={state} name="name" />

          </Field>
          {/* email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              name="email"
              defaultValue={state?.FormData?.email || null}

              placeholder="m@example.com"
            />
            <GetFieldError state={state} name="email" />
          </Field>
          {/* address */}
          <Field>
            <FieldLabel htmlFor="address">Address (Optional)</FieldLabel>
            <Input id="address" name="address"
              defaultValue={state?.FormData?.email || null}
              type="text" />
          </Field>
          {/* password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" name="password" type="password" />
            <GetFieldError state={state} name="password" />

          </Field>
        </div>
        {/* confirmPassword */}
        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
          <Input id="confirmPassword" name="confirmPassword" type="password" />
          <GetFieldError state={state} name="confirmPassword" />

        </Field>
        <Field>                  <LoadingButton type="submit" isLoading={isPending} loadingText="Registering..." >
          Register
        </LoadingButton>

          <FieldDescription className="text-center">
            Already have an account? <Link href="/login">Login</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form >
  );
}
