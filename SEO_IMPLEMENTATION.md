# Portfolio SEO

## Current implementation

- Page titles, descriptions, canonical URL, Open Graph, and Twitter metadata are defined in `app/layout.tsx`.
- `NEXT_PUBLIC_SITE_URL` is required; there is no fallback domain, so crawlers cannot receive metadata for the wrong site.
- The homepage and project case studies are included in the generated sitemap.
- `app/robots.ts` allows public pages and points crawlers to the sitemap.
- The homepage has Person, WebSite, ProfilePage, and project structured data. Case studies have page and breadcrumb structured data that reflects their visible copy.
- Three crawlable case studies live at `/work/plural-health`, `/work/betpikr`, and `/work/myneohealth-visilite`.
- Homepage content renders without waiting for the 3D scene to initialize.

## After deployment

1. Set `NEXT_PUBLIC_SITE_URL` to the canonical public domain before building or deploying.
2. Verify the domain in Google Search Console and inspect the homepage and case study URLs.
3. Submit `/sitemap.xml` in Search Console, then request indexing for the updated pages.
4. Check search queries, impressions, clicks, and crawl issues in Search Console over time.
5. Add links to the portfolio from current professional profiles and relevant project pages.

Search position depends on the query, competition, and references to the site. Metadata and structured data help search engines understand the pages; they do not guarantee a particular ranking.
