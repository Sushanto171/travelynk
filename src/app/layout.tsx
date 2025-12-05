
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Travelynk | Smart Travel Planning, Itineraries & Trip Management",
  description:
    "Travelynk is an all-in-one travel planning platform to create itineraries, manage trips, explore destinations, track budgets, and collaborate seamlessly. Plan smarter. Travel better.",
  keywords: [
    "travel planning app",
    "trip planner",
    "travel itinerary",
    "tour planning",
    "budget travel planner",
    "collaborative trip planner",
    "destination management",
    "Travelynk",
  ],
  authors: [{ name: "Travelynk Team" }],
  creator: "Travelynk",
  publisher: "Travelynk",
  metadataBase: new URL("https://travelynk.com"),
  openGraph: {
    title: "Travelynk | Smart Travel Planning & Itinerary Management",
    description:
      "Build itineraries, manage trips, track budgets, and collaborate in real time with Travelynk — your intelligent travel planning companion.",
    url: "https://travelynk.com",
    siteName: "Travelynk",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Travelynk Travel Planning Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travelynk | Smart Travel Planning",
    description:
      "Plan, organize, and manage your trips with powerful itinerary tools and real-time collaboration.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
