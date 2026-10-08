import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";

const fallbackSiteUrl = "https://rashdev.vercel.app";
const lastModified = new Date("2026-10-07");

function getSiteUrl() {
  try {
    const url = new URL(
      process.env.NEXT_PUBLIC_SITE_URL?.trim() || fallbackSiteUrl,
    );
    return url.toString().replace(/\/$/, "");
  } catch {
    return fallbackSiteUrl;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return [
    { url: siteUrl, lastModified },
    ...caseStudies.map(({ slug }) => ({
      url: `${siteUrl}/work/${slug}`,
      lastModified,
    })),
  ];
}
