# SEO Audit Report — Rashdev Solution

**Audit date:** November 9, 2026  
**Scope:** Source-level full-site audit of the homepage and five case-study routes at `https://rashdevsolution.vercel.app/`. This review covers repository metadata, route structure, content, structured data, crawler configuration, and image usage.  
**Business type:** Personal portfolio / individual developer.

## Audit Summary

The codebase has a solid SEO foundation: route-specific canonicals and social metadata, generated robots and sitemap routes, server-rendered case studies, and a JSON-LD entity graph. The baseline had three verified issues: the homepage content was client-only and hidden behind a readiness gate, the homepage title and description were verbose, and the sitemap/schema modification dates were older than the latest content change. The first four action items have since been implemented locally.

**Overall score:** Not assigned. Category scores below are directional and use repository plus live-baseline evidence; **score confidence is low** because the refreshed code is not deployed and performance metrics are unavailable.

The category scores use the audit rubric’s signal-count approach and warning penalties. Content quality, performance, images, and AI search readiness account for 45% of the full-site weighting and remain unscored, so a weighted overall score would be misleading.

| Category | Score | Evidence and limit |
|---|---:|---|
| Technical SEO | 75/100 | Robots and sitemap return 200 and the sitemap lists six routes; deployed homepage HTML is still a client-only shell. |
| On-page SEO | 57/100 | Case studies have unique metadata; deployed homepage title is 72 characters and description is 220 characters. |
| Schema | 75/100 | JSON-LD graph is present and parseable; deployed modification dates are stale. Rich-result eligibility was not tested. |
| Content quality | Not scored | Case studies contain 172–396 parsed words; the deployed homepage HTML exposes only the shell. No case-study word-count benchmark was applied. |
| Performance / Core Web Vitals | Not measured | PageSpeed Insights was unavailable because the fetch dependency is missing. |
| Images | Not scored | Source includes descriptive hero alt text and Next.js image components; delivered formats, dimensions, and response sizes were not fetched. |
| AI search readiness | Not scored | Live robots allows all user agents and `/llms.txt` returns 404; no citation or traffic data is available. |

### Top findings

1. **Homepage content depends on client rendering.** The app renders a generic loading screen initially; the portfolio page is excluded from server rendering and remains hidden until the client marks it ready. This is a resilience risk, not proof that Google cannot index the page. Google renders JavaScript, though content may wait in a render queue; server or static rendering also serves users and crawlers that do not execute the app JavaScript. [Google JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
2. **Homepage metadata is verbose.** The 72-character title and 220-character description can be shortened to give the portfolio’s purpose and specialization more quickly. Google recommends concise titles, and may truncate snippets to fit the device; these are presentation opportunities, not hard character limits. [Title link guidance](https://developers.google.com/search/docs/appearance/title-link) · [Snippet guidance](https://developers.google.com/search/docs/appearance/snippet)
3. **Freshness dates are stale.** Sitemap and profile schema dates predate the latest case-study content update in the repository.

## Baseline Findings (before workspace changes)

| Area | Severity | Confidence | Finding | Evidence | Fix |
|---|---|---|---|---|---|
| Rendering / crawlability | Warning | Confirmed (implementation); likely (impact) | The homepage’s main portfolio content is client-rendered and hidden until readiness state changes. | `app/page.tsx` renders `PortfolioBootLoader`; `components/PortfolioBootLoader.tsx` imports `PortfolioPage` with `ssr: false` and keeps `.portfolio-boot-app` hidden until `isReady`. The fallback timer is 5.2 seconds. | Put the hero copy, project summaries, and crawlable project links in initial HTML. Keep WebGL and browser-only effects as enhancements. |
| On-page metadata | Warning | Confirmed | The homepage title and description are unusually long. | `app/layout.tsx` produces a 72-character title and a 220-character description. | Use a concise, descriptive title and a shorter, distinct description. Example title: `Rasheed Iskilu | Full-Stack Developer in Lagos` (46 characters). Example description: `Lagos-based full-stack developer Rasheed Iskilu builds healthcare, fintech and operations products with React, Next.js, TypeScript and React Native.` (148 characters). |
| Freshness signals | Warning | Confirmed | Sitemap and profile schema use hard-coded modification dates that predate the latest content update. | `app/sitemap.ts` uses `2026-10-13`; `components/PortfolioStructuredData.tsx` uses `2026-10-07`; commit `9ab15ef` changed `lib/case-studies.ts` on `2026-10-23`. | Derive modification dates from the content source or update them whenever the represented content changes. |
| Image accessibility | Warning | Confirmed | One active carousel alt text contains a typo and does not clearly describe the image. | `components/PortfolioPage.tsx` labels the NeoPharmacy login image `NeoPharmacy Login page(pseduo)`. | Replace it with an accurate description, such as `NeoPharmacy login screen for pharmacy staff`. |
| Crawler policy | Info | Confirmed (live) | Robots allows all user agents and disallows `/api/`; AI crawlers inherit the wildcard policy. | Live `/robots.txt` returned 200, allowed `/`, disallowed `/api/`, and referenced `/sitemap.xml`; no bot-specific rules were present. | Keep this policy if all public pages should be available to AI and other crawlers. |
| Crawl structure | Pass | Confirmed (live) | The sitemap lists the homepage and all five case studies. | Live `/sitemap.xml` returned 200 with six URLs. All five case-study routes were fetched and parsed. | Keep new public case studies in the shared source list and sitemap. |
| Case-study metadata | Pass | Confirmed (live) | Each case study has a distinct title, description, canonical, H1, and structured content. | Live parsing found one H1 and a self-referencing canonical on each of the five routes; each page had three internal links. | Preserve this pattern for future routes. |
| Structured data | Pass | Confirmed (source only) | JSON-LD describes the person, organization, website, profile page, projects, breadcrumbs, and services. | `components/PortfolioStructuredData.tsx` emits an `application/ld+json` graph with absolute site URLs. Case-study pages add WebPage and BreadcrumbList JSON-LD. | Preserve the JSON-LD format and validate the generated deployed markup after the next deployment. |

## Live Baseline and Local Build Verification

- **Current deployed homepage:** HTTP 200. Its initial HTML still contains the old 72-character title and 220-character description, one H1 (`Preparing the interface.`), no H2s, no links, and no images; the parsed body has 17 visible words. This confirms the deployed homepage is still the old app shell.
- **Current deployed case studies:** All five routes returned distinct titles and descriptions, one H1, a canonical URL, three internal links, and one image. Parsed body word counts were Plural Health 202, Betpikr 181, myNeoHealth / VisiLite 172, User Management Platform 277, and LIV DOT 396. These are observations, not thin-content thresholds for portfolio pages.
- **Current deployed sitemap:** HTTP 200, six URLs, with `lastmod` still set to `2026-10-13` for every URL. The live JSON-LD still uses `dateModified: 2026-10-07`.
- **Social metadata:** Open Graph and Twitter tags are all present on the live homepage. The current deployed values repeat the long title and description.
- **Redirects and links:** The homepage resolves directly with HTTP 200 and no redirects. Link checks found zero homepage anchors because the initial HTML is only the app shell, so the linked project destinations could not be checked from that response.
- **Response headers:** HTTPS and HSTS are present. The live scan did not find Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, or Permissions-Policy. This is a security hardening finding; it does not establish a ranking penalty.
- **AI crawler files:** `/llms.txt` and `/llms-full.txt` both returned 404. This is informational; absence alone is not a confirmed Google Search defect.
- **Local build:** `npm run build` succeeded and generated 14 routes. The generated homepage HTML contains the new 46-character title and 148-character description, a meaningful H1, seven H2s, 37 links, seven images, and 1,184 visible words. The local sitemap build uses `2026-10-23`. Build output had existing lint warnings in UI components and an outdated Browserslist database notice.
- **Schema check:** The HTML parser extracted typed JSON-LD graph nodes. The bundled `validate_schema.py` warned that the top-level `@graph` wrapper has no `@type`; this was not treated as a content-node error. Rich-result eligibility was not tested.

## Content and E-E-A-T Review

- **Experience — Strong source signals:** First-person case studies describe product context, the author’s role, specific contributions, and outcomes across healthcare, operations, sports technology, and event software.
- **Expertise — Moderate to strong source signals:** The content names concrete implementation work and technologies, including offline-first pharmacy flows, role-based workflows, and transaction-safe persistence. Claims are not independently verified in this audit.
- **Authoritativeness — Unknown:** The site links to professional profiles and project pages, but external mentions, backlinks, and Search Console data were not available.
- **Trust — Moderate source signals:** The portfolio names its author, provides an email contact, location, and social profiles. No external reputation or live HTTPS/header checks were completed.
- **Content depth — Moderate:** Case-study pages render 172–396 words, with role, project context, contributions, technologies, and outcome sections. Add verified metrics or original artifacts where available; no portfolio-specific minimum word count was applied.
- **AI citation readiness — Partial:** The JSON-LD graph and specific project narratives provide entity and topic context. The robots file permits AI crawlers through the wildcard rule; no `llms.txt` is served. No traffic or AI citation data is available.

## Technical Notes

- `NEXT_PUBLIC_SITE_URL` is configured as `https://rashdevsolution.vercel.app` in the local environment, and `lib/site-url.ts` requires it instead of falling back to another domain.
- The homepage and case-study routes define canonical metadata and social cards in source.
- The homepage metadata includes indexing directives. The case-study route renders semantic article sections with one H1, section headings, breadcrumbs, and project links in its server component.
- `SEO_IMPLEMENTATION.md` says three crawlable case studies exist, while the current source defines five. This is a repository documentation mismatch, not a confirmed live-site defect.
- Source image files include several large originals. Case-study hero images use `next/image`, which may optimize delivery; actual transfer sizes were not measured, so no oversized-delivery finding is confirmed.

## Environment Limitations and Unknowns

- The direct web reader could not access the portfolio URL. After approval, `requests` and `beautifulsoup4` were installed and the bundled fetch/parse scripts accessed the live site.
- PageSpeed Insights returned an API rate-limit response after its built-in retries, so there are no lab or field Core Web Vitals values. Search Console indexing, traffic, and query data were not available.
- The readability script returned a seven-word extraction with unrelated template rewrite examples; that score was excluded. The raw HTML evidence above is used instead.
- Google Search Console data, field CWV data, backlink evidence, and Google’s rendered-page output were not available.
- The SEO skill’s freshness checker flagged 10 local reference files as older than 90 days, including `llm-audit-rubric.md`, `quality-gates.md`, `cwv-thresholds.md`, `schema-types.md`, and `google-seo-reference.md`. Current JavaScript, title, and snippet guidance was cross-checked against official Google Search Central documentation linked above.

## Finding Verification

The bundled `finding_verifier.py` processed five consolidated findings: **5 verified, 0 dropped**. The baseline homepage rendering and metadata findings are supported by both repository and live HTML evidence. The live security-header result is kept separate from SEO ranking claims.

## Implementation Follow-up — November 9, 2026

After the source audit, priorities 1–4 in the action plan were implemented in the workspace: homepage content now uses server rendering and remains visible while WebGL initializes; the loader is a non-blocking status pill; homepage metadata is shorter; sitemap and profile schema share the October 23, 2026 content date; and the NeoPharmacy alt text is corrected. The repository SEO notes now list all five case studies. The production build passed, and generated HTML was parsed locally. The live site still serves the pre-change deployment, so public verification of these fixes remains pending deployment.
