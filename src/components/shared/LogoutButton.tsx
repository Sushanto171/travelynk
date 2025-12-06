"use client";
import { logoutUser } from "@/services/auth/logout.service";
import { HTMLAttributes } from "react";
import { Button } from "../ui/button";

type ClassName = {
  className?: HTMLAttributes<HTMLButtonElement>["className"];
};

export default function LogoutButton({ className }: ClassName) {
  return (
    <Button onClick={logoutUser} className={className} variant="outline">
      Logout
    </Button>
  );
}
