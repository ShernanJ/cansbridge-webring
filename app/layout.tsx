import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"] as const,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cansbridgewebring.com"), // change to your domain

  title: {
    default: "cansbridge webring",
    template: "%s · cansbridge webring",
  },

  description: "a simple webring of cansbridge scholar websites",

  keywords: [
    "cansbridge scholars",
    "cansbridge webring",
    "student portfolios",
    "canadian tech students",
    "developer portfolios",
  ],

  openGraph: {
    type: "website",
    url: "https://cansbridgewebring.com",
    title: "cansbridge webring",
    description: "a simple webring of cansbridge scholar websites",
    images: [
      {
        url: "/og-image.png", // place in /public/og.png
        width: 1200,
        height: 630,
        alt: "cansbridge webring",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "cansbridge webring",
    description: "a simple webring of cansbridge scholar websites",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={lato.className}>{children}</body>
    </html>
  );
}
