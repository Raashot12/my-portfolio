import type { Metadata, Viewport } from "next";
import { Goudy_Bookletter_1911 } from "next/font/google";

import "./globals.css";
import PortfolioStructuredData from "@/components/PortfolioStructuredData";

const goudyBookletter = Goudy_Bookletter_1911({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-goudy-bookletter",
  fallback: ["Georgia", "Times New Roman"],
});

const FALLBACK_SITE_URL = "https://rashdev.vercel.app";
const SITE_URL = (() => {
  try {
    const url = new URL(
      process.env.NEXT_PUBLIC_SITE_URL?.trim() || FALLBACK_SITE_URL,
    );
    url.hash = "";
    url.search = "";
    return url;
  } catch {
    return new URL(FALLBACK_SITE_URL);
  }
})();

const title = "Rasheed Iskilu | Frontend Engineer in Lagos";
const description =
  "Rasheed Iskilu is a Frontend engineer in Lagos, Nigeria, building reliable healthcare, fintech, and mobile products with React, Next.js, TypeScript, and React Native.";

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title,
  description,
  applicationName: "Rasheed Iskilu Portfolio",
  authors: [{ name: "Rasheed Iskilu", url: SITE_URL }],
  creator: "Rasheed Iskilu",
  category: "technology",
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
    siteName: "Rasheed Iskilu Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Rasheed Iskilu - Frontend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@rashdev_i",
    images: ["/opengraph-image"],
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
