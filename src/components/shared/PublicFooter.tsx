import { Compass, Facebook, Globe, Instagram, LogOut, Mail, MapPin, Plane, Twitter, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';



const FooterLink = ({  children, icon: Icon }: { href: string; children: React.ReactNode; icon?: React.ElementType }) => (
  <Link
    href={"/#"}
    className="hover:text-indigo-400 transition-colors flex items-center gap-2 py-1 text-sm"
  >
    {Icon && <Icon className="w-4 h-4" />}
    {children}
  </Link>
);

export const PublicFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

        {/* Main Grid Layout for Desktop */}
        {/* Mobile: 2 columns | Tablet/Desktop: 5 columns (Branding takes 2) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">

          {/* Column 1: Branding and Mission (2/5 width on desktop) */}
          <div className="col-span-2 md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <Plane className="w-8 h-8 text-indigo-500" />
              <h3 className="text-2xl font-bold tracking-tight ">
                Travelynk
              </h3>
            </div>
            <p className="text-sm max-w-xs">
              Connect with fellow travelers, share your wanderlust, and co-create unforgettable journeys. Your next adventure starts here.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" aria-label="Twitter" className="transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Facebook" className="transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram" className="transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Travelynk Features - Specific to your app's core value */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold  mb-2 border-b border-indigo-500/50 pb-1">Features</h4>
            <nav className="flex flex-col space-y-2">
              <FooterLink href="/plans" icon={MapPin}>Create a Plan</FooterLink>
              <FooterLink href="/buddies" icon={Users}>Find Travel Buddies</FooterLink>
              <FooterLink href="/discover" icon={Compass}>Discover Destinations</FooterLink>
              <FooterLink href="/messages" icon={Mail}>Messaging</FooterLink>
            </nav>
          </div>

          {/* Column 3: Company & Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold  mb-2 border-b border-indigo-500/50 pb-1">Company</h4>
            <nav className="flex flex-col space-y-2">
              <FooterLink href="/about" icon={Globe}>About Us</FooterLink>
              <FooterLink href="/careers" icon={LogOut}>Careers (We&lsquo;re hiring!)</FooterLink>
              <FooterLink href="/help" icon={Compass}>Help Center</FooterLink>
              <FooterLink href="/contact" icon={Mail}>Contact Support</FooterLink>
            </nav>
          </div>

          {/* Column 4: Legal & Policies */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold  mb-2 border-b border-indigo-500/50 pb-1">Legal</h4>
            <nav className="flex flex-col space-y-2">
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/cookies">Cookie Settings</FooterLink>
              <FooterLink href="/security">Security</FooterLink>
            </nav>
          </div>
        </div>

        {/* Optional: Newsletter Signup/CTA Section (Full Width) */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h4 className="text-lg font-semibold  mb-4">
            Stay Updated on New Destinations
          </h4>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md">
            {/* Replaced with mock Input and Button from shadcn */}
            <Input placeholder="Enter your email address" className="flex-grow" />
            <Button>
              Subscribe
            </Button>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {currentYear} Travelynk. All rights reserved.</p>
          <p className="mt-4 md:mt-0">
            Made for travelers, by travelers.
          </p>
        </div>
      </div>
    </footer>
  );
};

