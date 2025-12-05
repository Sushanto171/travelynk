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

interface IPublicNavbarProps {
  user: boolean | null
}

export default async function PublicNavbar({ user }: IPublicNavbarProps) {

  const links: ILink[] = [
    { title: "Home", href: "/" },
    // ...(user 
    //   ? [{ title: "Dashboard", href: getDefaultDashboardRoute(user.role) }]
    //   : []),
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
          <Link href="/">
            <Button
              variant="secondary"
              className={` p-0 bg-transparent cursor-pointer text-2xl font-semibold text-primary`}
            >
              Health-Care
            </Button>
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
                    <Link href="/">
                      <Button
                        variant="secondary"
                        className="p-0 bg-transparent text-lg font-semibold text-primary"
                      >
                        Health-Care
                      </Button>
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
