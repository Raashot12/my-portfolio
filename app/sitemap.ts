import type { MetadataRoute } from "next";

const fallbackSiteUrl = "https://rashdev.vercel.app";
const lastModified = "2026-10-06";

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
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
