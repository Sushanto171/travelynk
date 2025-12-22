import {
  Compass,
  Facebook,
  Globe,
  Instagram,
  LogOut,
  Mail,
  MapPin,
  Plane,
  Twitter,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import NewslatterForm from "../modules/admin/newslatterManagement/NewslatterForm";

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-foreground">
        {title}
      </h4>
      <div className="flex flex-col gap-2">
        {children}
      </div>
    </div>
  );
}

const FooterLink = ({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon?: React.ElementType;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
  >
    {Icon && <Icon className="h-4 w-4" />}
    {children}
  </Link>
);

export function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background">
      <Separator />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Plane className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold text-foreground">
                Travelynk
              </span>
            </div>

            <p className="text-sm text-muted-foreground max-w-xs">
              Connect with fellow travelers, share your wanderlust, and co-create
              unforgettable journeys.
            </p>

            <div className="flex gap-3">
              <Button size="icon" variant="ghost">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <FooterColumn title="Features">
            <FooterLink href="/plans" icon={MapPin}>Create a Plan</FooterLink>
            <FooterLink href="/buddies" icon={Users}>Find Buddies</FooterLink>
            <FooterLink href="/discover" icon={Compass}>Discover</FooterLink>
            <FooterLink href="/messages" icon={Mail}>Messaging</FooterLink>
          </FooterColumn>

          {/* Company */}
          <FooterColumn title="Company">
            <FooterLink href="/about" icon={Globe}>About</FooterLink>
            <FooterLink href="/careers" icon={LogOut}>Careers</FooterLink>
            <FooterLink href="/help" icon={Compass}>Help Center</FooterLink>
            <FooterLink href="/contact" icon={Mail}>Contact</FooterLink>
          </FooterColumn>

          {/* Legal */}
          <FooterColumn title="Legal">
            <FooterLink href="/terms">Terms</FooterLink>
            <FooterLink href="/privacy">Privacy</FooterLink>
            <FooterLink href="/cookies">Cookies</FooterLink>
            <FooterLink href="/security">Security</FooterLink>
          </FooterColumn>
        </div>

        {/* Newsletter */}
        <NewslatterForm />

        <Separator />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
          <span>© {year} Travelynk. All rights reserved.</span>
          <span>Built for travelers, by travelers.</span>
        </div>
      </div>
    </footer>
  );
}


