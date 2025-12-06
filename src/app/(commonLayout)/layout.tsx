
import PublicNavbar from "@/components/shared/Navbar";
import NavbarWrapper from "@/components/shared/NavbarWrapper";
import { PublicFooter } from '@/components/shared/PublicFooter';
import React from "react";

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <div className=" min-h-svh flex flex-col ">
      <NavbarWrapper>
        <PublicNavbar />
      </NavbarWrapper>

      <main className="flex-1 ">{children}</main>
      <PublicFooter />
    </div>
  );
}
