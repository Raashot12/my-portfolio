import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { getSiteUrlString } from "@/lib/site-url";
const lastModified = new Date("2026-10-07");

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrlString();

  return [
    { url: siteUrl, lastModified },
    ...caseStudies.map(({ slug }) => ({
      url: `${siteUrl}/work/${slug}`,
      lastModified,
    })),
  ];
}
