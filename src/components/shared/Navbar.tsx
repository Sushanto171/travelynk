import { getDefaultDashboardRoute } from "@/lib/authUtils";
import { getUserAction } from "@/services/auth/getUser.service";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import LogoutButton from "./LogoutButton";
import NavAuthButton from "./NavAuthButton";
import NavLinks from "./Navlinks";

type ILink = {
  title: string;
  href: string;
};

export const dynamic = "force-dynamic";


export default async function PublicNavbar() {
  const user = await getUserAction()

  const links: ILink[] = [
    { title: "Home", href: "/" },
    ...(user
      ? [{ title: "Dashboard", href: getDefaultDashboardRoute(user.role) }]
      : []),
    { title: "Find travel plans", href: "/travel-plans" },
    { title: "About us", href: "/about-us" },
    { title: "Contact us", href: "/contact-us" },
    { title: "Service", href: "/service" },
  ];

  return (
    <header>
      <div className="max-w-7xl mx-auto ">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center text-2xl font-bold text-indigo-600">
            TL<span className="text-gray-800">ynk</span>
          </Link>

          {/* Desktop Navigation */}
          <NavLinks links={links} />

          {/* Desktop Buttons */}
          {user ? <LogoutButton className="hidden md:block" /> : <NavAuthButton />}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <EllipsisVertical size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center text-2xl font-bold text-indigo-600">
                      TL<span className="text-gray-800">ynk</span>
                    </Link>
                  </SheetTitle>
                  <SheetDescription className="sr-only"></SheetDescription>
                </SheetHeader>

                <NavLinks isMobile={true} links={links} />

                <SheetFooter>
                  {user ? <LogoutButton /> : <NavAuthButton isMobile={true} />}
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
