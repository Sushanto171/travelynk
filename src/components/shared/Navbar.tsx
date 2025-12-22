import { getDefaultDashboardRoute } from "@/lib/authUtils";
import { getUserAction } from "@/services/auth/getUser.service";
import { UserRole } from "@/types/user.interface";
import { EllipsisVertical, Plane } from "lucide-react";
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
import { ModeToggle } from "./ModeToggle";
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
    ...(user && user.role === UserRole.USER
      ? [{ title: "My travel plans", href: "/dashboard/my-travel-plans" }]
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
          <Link href="/" className="flex items-center text-2xl font-bold ">
            <Plane className="h-7 w-7 text-primary mr-1" />
            <span className="text-xl font-bold text-foreground">
              Travelynk
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavLinks links={links} />
          
          <div className="flex gap-2">
          <ModeToggle />
          {/* Desktop Buttons */}
          {user ? <LogoutButton className="hidden md:block" /> : <NavAuthButton />}
          </div>
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
                    <Link href="/" className="flex items-center text-2xl font-bold ">
                      <Plane className="h-7 w-7 text-primary mr-1" />
                      <span className="text-xl font-bold text-foreground">
                        Travelynk
                      </span>
                    </Link>
                  </SheetTitle>
                  <SheetDescription className="sr-only"></SheetDescription>
                </SheetHeader>

                <NavLinks isMobile={true} links={links} />
                <ModeToggle />
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
