"use client";
import { HTMLAttributes } from "react";
import { Button } from "../ui/button";

type ClassName = {
  className?: HTMLAttributes<HTMLButtonElement>["className"];
};

export default function LogoutButton({ className }: ClassName) {
  return (
    <Button className={className} variant="outline">
      Logout
    </Button>
  );
}
