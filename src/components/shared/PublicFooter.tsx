"use client";

import { Separator } from "@/components/ui/separator";
import {
  Compass,
  Facebook,
  Globe,
  Heart,
  Instagram,
  Linkedin,
  MapPin,
  Plane,
  Twitter,
  Users,
  Youtube
} from "lucide-react";
import Link from "next/link";
import NewslatterForm from "../modules/admin/newslatterManagement/NewslatterForm";

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h4 className="text-base font-bold text-foreground">{title}</h4>
      <div className="flex flex-col gap-3">{children}</div>
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
    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
  >
    {Icon && <Icon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
    {children}
  </Link>
);

const SocialButton = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all hover:scale-110"
  >
    <Icon className="h-5 w-5" />
  </a>
);

export function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-background to-muted/30 border-t border-border/50">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Plane className="h-7 w-7 text-primary" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Travelynk
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Connect with fellow travelers, share your wanderlust, and co-create
              unforgettable journeys around the world. Your adventure starts here.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <SocialButton href="https://twitter.com" icon={Twitter} label="Twitter" />
              <SocialButton href="https://facebook.com" icon={Facebook} label="Facebook" />
              <SocialButton href="https://instagram.com" icon={Instagram} label="Instagram" />
              <SocialButton href="https://linkedin.com" icon={Linkedin} label="LinkedIn" />
              <SocialButton href="https://youtube.com" icon={Youtube} label="YouTube" />
            </div>
          </div>

          {/* Features */}
          <div className="lg:col-span-2">
            <FooterColumn title="Features">
              <FooterLink href="/travel-plans" icon={MapPin}>
                Travel Plans
              </FooterLink>
              <FooterLink href="/explore" icon={Users}>
                Find Travelers
              </FooterLink>
              <FooterLink href="/destinations" icon={Compass}>
                Destinations
              </FooterLink>
              <FooterLink href="/dashboard" icon={Globe}>
                Dashboard
              </FooterLink>
            </FooterColumn>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <FooterColumn title="Company">
              <FooterLink href="/about-us">About Us</FooterLink>
              <FooterLink href="/contact-us">Contact</FooterLink>
              <FooterLink href="/service">Services</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
            </FooterColumn>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <FooterColumn title="Support">
              <FooterLink href="/help">Help Center</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/safety">Safety Tips</FooterLink>
              <FooterLink href="/community">Community</FooterLink>
            </FooterColumn>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <FooterColumn title="Legal">
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/cookies">Cookie Policy</FooterLink>
              <FooterLink href="/guidelines">Guidelines</FooterLink>
            </FooterColumn>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-primary/5 via-emerald-500/5 to-primary/5 rounded-2xl p-8 border border-border/50">
          <NewslatterForm />
        </div>

        <Separator className="opacity-50" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>© {year} Travelynk. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span>for travelers, by travelers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
