"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

type ILink = {
  title: string;
  href: string;
};


export default function NavLinks({ isMobile = false, links }: {
  links: ILink[]
  isMobile?: boolean
}) {
  const location = usePathname();

  return (
    <nav className={`${isMobile ? "md:hidden px-4" : " hidden md:block"}`}>
      <ul
        className={`flex ${isMobile ? "flex-col w-full space-y-2 mt-4" : "md:gap-1"
          }`}
      >
        {links.map((link, i) => (
          <li key={i}>
            <Link href={link.href}>
              <Button
                variant="link"
                className={`${location === link.href
                    ? "text-primary font-bold underline decoration-2 underline-offset-4"
                    : "text-foreground/80 hover:text-foreground"
                  } ${isMobile ? "w-full justify-start" : ""} transition-colors`}
              >
                {link.title}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
