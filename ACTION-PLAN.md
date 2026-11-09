# SEO Action Plan — Rashdev Solution

**Status:** Priorities 1–4 are implemented in the workspace and pass the production build. Priority 5 is complete for the current deployment baseline; verification of the new code awaits deployment. No Google indexing blocker has been confirmed.

## Complete — Make the homepage content available in initial HTML

**Effort:** Medium · **Impact:** High resilience improvement

- Enabled server rendering for the portfolio page and made its content visible before the WebGL scene is ready.
- Kept the loading indicator as a small, non-blocking status pill and removed its competing H1.
- The local production HTML contains the intended H1 and project links. Confirm the same on the public site after deployment.

## Complete — Shorten homepage search metadata

**Effort:** Low · **Impact:** Medium CTR / result clarity opportunity

- Set the title to `Rasheed Iskilu | Full-Stack Developer in Lagos`.
- Set the description to `Lagos-based full-stack developer Rasheed Iskilu builds healthcare, fintech and operations products with React, Next.js, TypeScript and React Native.`
- Keep titles and descriptions accurate and unique. Treat character lengths as preview guidance; Google can rewrite titles and snippets.

## Complete — Keep modification dates aligned with content

**Effort:** Low · **Impact:** Low to medium freshness signal

- Added one shared `contentLastModified` source and aligned sitemap and profile schema dates to October 23, 2026.
- Update this value when the portfolio copy changes.
- The local build uses the shared date in sitemap and JSON-LD. Confirm the live endpoints after deployment.

## Complete — Correct the carousel image description

**Effort:** Low · **Impact:** Low accessibility and image-context improvement

- Updated the slide alt text to `NeoPharmacy login screen for pharmacy staff` in `components/PortfolioPage.tsx`.
- Check alt text for newly added carousel slides as part of content updates.

## Partially complete — Live verification

**Effort:** Low · **Impact:** Validation

- Installed `requests` and `beautifulsoup4`; fetched the homepage and all five case studies. The deployed homepage still serves the old app shell: its initial HTML has one generic H1 and no project links or images. The local build now contains the full portfolio content.
- Live `/robots.txt` and `/sitemap.xml` both return 200. The sitemap lists all six URLs, but still has the old `2026-10-13` modification date. Redirect checks found no hops. Case-study pages have unique titles, canonicals, H1s, and three internal links each.
- Live social metadata is complete but still uses the old long title and description. The homepage link checker found no anchors in its raw response, so project link destinations could not be checked there.
- The live header scan found HSTS but not CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, or Permissions-Policy. Review a compatible policy before adding headers, especially CSP.
- PageSpeed Insights returned an API rate limit after built-in retries. Google Search Console URL Inspection and field Core Web Vitals data were unavailable; rankings and indexing status remain unknown.
- Deploying the local code changes is still required before verifying them against the public site.
