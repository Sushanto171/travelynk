"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function RegisterForm() {



  return (
    <form >
      <FieldGroup>
        <div className="grid md:grid-cols-2 gap-4">
          {/* name */}
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input id="name" name="name" type="text" placeholder="John Doe" />
          </Field>
          {/* email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
            />
          </Field>
          {/* address */}
          <Field>
            <FieldLabel htmlFor="address">Address (Optional)</FieldLabel>
            <Input id="address" name="address" type="text" />
          </Field>
          {/* password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" name="password" type="password" />
          </Field>
        </div>
        {/* confirmPassword */}
        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
          <Input id="confirmPassword" name="confirmPassword" type="password" />
        </Field>
        <Field>
          <Button type="submit">
            Register
          </Button>

          <FieldDescription className="text-center">
            Already have an account? <Link href="/login">Login</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form >
  );
}
