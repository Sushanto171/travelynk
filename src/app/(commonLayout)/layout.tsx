
import PublicNavbar from "@/components/shared/Navbar";
import NavbarWrapper from "@/components/shared/NavbarWrapper";
import { PublicFooter } from '@/components/shared/PublicFooter';
import { getUser } from "@/services/auth/getUser.service";
import { IUser } from "@/types/user.interface";
import React from "react";

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser() as IUser


  return (
    <div className=" min-h-svh flex flex-col ">
      <NavbarWrapper>
        <PublicNavbar user={user} />
      </NavbarWrapper>

      <main className="flex-1 ">{children}</main>
      <PublicFooter />
    </div>
  );
}
