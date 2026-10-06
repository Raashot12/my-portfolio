import type { MetadataRoute } from "next";

const fallbackSiteUrl = "https://rashdev.vercel.app";

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

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
