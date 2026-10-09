import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { getSiteUrlString } from "@/lib/site-url";

const siteUrl = getSiteUrlString();
export function generateStaticParams() { return caseStudies.map(({ slug }) => ({ slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return {};
  const canonical = "/work/" + study.slug;
  return {
    title: study.title + " | Rasheed Iskilu",
    description: study.description,
    alternates: { canonical },
    openGraph: { type: "article", url: canonical, title: study.title + " | Rasheed Iskilu", description: study.description, siteName: "Rasheed Iskilu Portfolio", images: [{ url: "/og_thumbnail.webp", width: 1731, height: 909, alt: study.title }] },
    twitter: { card: "summary_large_image", title: study.title + " | Rasheed Iskilu", description: study.description, images: ["/og_thumbnail.webp"] },
  };
}
export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();
  const pageUrl = siteUrl + "/work/" + study.slug;
  const structuredData = {
    "@context": "https://schema.org", "@type": "WebPage", "@id": pageUrl + "#webpage", url: pageUrl,
    name: study.title, description: study.description, inLanguage: "en",
    isPartOf: { "@id": siteUrl + "/#website" },
    author: { "@type": "Person", "@id": siteUrl + "/#person", name: "Rasheed Iskilu", url: siteUrl },
    mainEntity: { "@type": "CreativeWork", name: study.title, description: study.description, creator: { "@id": siteUrl + "/#person" }, keywords: study.technologies.join(", ") },
    breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Selected work", item: siteUrl + "/#work" },
      { "@type": "ListItem", position: 3, name: study.title, item: pageUrl },
    ] },
  };
  return (
    <main className="case-study-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <nav className="case-study-nav" aria-label="Breadcrumb">
        <Link href="/">Rasheed Iskilu</Link><span aria-hidden="true">/</span><Link href="/#work">Selected work</Link>
      </nav>
      <article className="case-study-content">
        <p className="case-study-eyebrow">{study.focus}</p>
        <h1>{study.title}</h1>
        <p className="case-study-lede">{study.description}</p>
        <dl className="case-study-meta"><div><dt>Role</dt><dd>{study.role}</dd></div><div><dt>Platform</dt><dd>{study.platform}</dd></div></dl>
        <section aria-labelledby="overview-heading"><h2 id="overview-heading">The work</h2>{study.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>
        <section aria-labelledby="contribution-heading"><h2 id="contribution-heading">My contributions</h2><ul>{study.contributions.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section aria-labelledby="outcome-heading"><h2 id="outcome-heading">Outcome</h2><p>{study.outcome}</p></section>
        <section aria-labelledby="technology-heading"><h2 id="technology-heading">Technologies</h2><ul className="case-study-tech">{study.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></section>
        <div className="case-study-links">{study.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label}<span aria-hidden="true"> ↗</span></a>)}</div>
        <Link className="case-study-back" href="/#work">← Back to selected work</Link>
      </article>
      <footer className="case-study-footer"><span>Lagos, Nigeria · Working globally</span><a href="mailto:rasheediskilu.dev@gmail.com">Get in touch</a></footer>
    </main>
  );
}
