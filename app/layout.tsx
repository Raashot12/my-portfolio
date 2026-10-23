import type { Metadata, Viewport } from "next";
import { Goudy_Bookletter_1911 } from "next/font/google";

import "./globals.css";
import PortfolioStructuredData from "@/components/PortfolioStructuredData";
import { getSiteUrl } from "@/lib/site-url";

const goudyBookletter = Goudy_Bookletter_1911({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-goudy-bookletter",
  fallback: ["Georgia", "Times New Roman"],
});

const SITE_URL = getSiteUrl();

const brandName = "Rashdev Solution";
const title = `${brandName} | Rasheed Iskilu — Full-Stack Developer, Frontend Focus`;
const description =
  "Rashdev Solution is the portfolio of Rasheed Iskilu, a Lagos-based full-stack developer with a frontend focus, building reliable healthcare, fintech, and mobile products with React, Next.js, TypeScript, and React Native.";

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title,
  description,
  applicationName: brandName,
  authors: [{ name: "Rasheed Iskilu", url: SITE_URL }],
  creator: "Rasheed Iskilu",
  publisher: brandName,
  category: "technology",
  keywords: [
    "Rashdev Solution",
    "Rashdev",
    "Rasheed Iskilu",
    "Full-Stack Developer Lagos",
    "Frontend-Focused Full-Stack Developer",
    "Frontend Engineer Lagos",
    "React developer Nigeria",
    "Next.js developer",
    "TypeScript engineer",
    "React Native developer",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    title,
    description,
    siteName: brandName,
    images: [
      {
        url: "/og_thumbnail.webp",
        width: 1731,
        height: 909,
        alt: "Rasheed Iskilu - Full-Stack Developer, Frontend Focus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@rashdev_i",
    images: ["/og_thumbnail.webp"],
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3155df",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="format-detection" content="telephone=no" />
        <PortfolioStructuredData />
      </head>
      <body className={goudyBookletter.variable}>{children}</body>
    </html>
  );
}
