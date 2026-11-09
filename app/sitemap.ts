import type { MetadataRoute } from "next";
import { caseStudies, contentLastModified } from "@/lib/case-studies";
import { getSiteUrlString } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrlString();
  const lastModified = new Date(contentLastModified);

  return [
    { url: siteUrl, lastModified },
    ...caseStudies.map(({ slug }) => ({
      url: `${siteUrl}/work/${slug}`,
      lastModified,
    })),
  ];
}
