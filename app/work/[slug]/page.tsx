import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { getSiteUrlString } from "@/lib/site-url";
import CaseStudyHero from "@/components/CaseStudyHero";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const siteUrl = getSiteUrlString();
export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return {};
  const canonical = "/work/" + study.slug;
  return {
    title: study.title + " | Rasheed Iskilu",
    description: study.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: study.title + " | Rasheed Iskilu",
      description: study.description,
      siteName: "Rashdev Solution",
      images: [{ url: study.hero.image, alt: study.hero.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: study.title + " | Rasheed Iskilu",
      description: study.description,
      images: [study.hero.image],
    },
  };
}
export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();
  const pageUrl = siteUrl + "/work/" + study.slug;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": pageUrl + "#webpage",
    url: pageUrl,
    name: study.title,
    description: study.description,
    inLanguage: "en",
    isPartOf: { "@id": siteUrl + "/#website" },
    author: {
      "@type": "Person",
      "@id": siteUrl + "/#person",
      name: "Rasheed Iskilu",
      url: siteUrl,
    },
    mainEntity: {
      "@type": ["CreativeWork", "SoftwareApplication"],
      name: study.title,
      description: study.description,
        genre: study.categories,
        about: study.categories.map((category) => ({
          "@type": "Thing",
          name: category,
        })),
      creator: { "@id": siteUrl + "/#person" },
        keywords: [...study.categories, ...study.technologies].join(", "),
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Selected work",
          item: siteUrl + "/#work",
        },
        { "@type": "ListItem", position: 3, name: study.title, item: pageUrl },
      ],
    },
  };
  return (
    <main className="case-study-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <nav className="case-study-nav" aria-label="Breadcrumb">
        <Link href="/">Rasheed Iskilu</Link>
        <span aria-hidden="true">/</span>
        <Link href="/#work">Selected work</Link>
      </nav>
      <CaseStudyHero study={study} />
      <article className="case-study-content" id="case-study-details">
        <section className="case-study-section" aria-labelledby="overview-heading">
          <h2 id="overview-heading">The work</h2>
          {study.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
        {study.challenge?.length ? (
          <section className="case-study-section" aria-labelledby="challenge-heading">
            <h2 id="challenge-heading">The challenge</h2>
            {study.challenge.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ) : null}
        {study.approach?.length ? (
          <section className="case-study-section" aria-labelledby="approach-heading">
            <h2 id="approach-heading">Approach and architecture</h2>
            {study.approach.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ) : null}
        <section className="case-study-section" aria-labelledby="contribution-heading">
          <h2 id="contribution-heading">My contributions</h2>
          <ul>
            {study.contributions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="case-study-section case-study-outcome" aria-labelledby="outcome-heading">
          <h2 id="outcome-heading">Outcome</h2>
          <p>{study.outcome}</p>
        </section>
        <section className="case-study-section" aria-labelledby="technology-heading">
          <h2 id="technology-heading">Technologies</h2>
          <ul className="case-study-tech">
            {study.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </section>
        <nav className="case-study-links" aria-label="Project resources">
          {study.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          ))}
        </nav>
        <Link className="case-study-back" href="/#work">
          <ArrowLeft aria-hidden="true" size={16} />
          Back to selected work
        </Link>
      </article>
      <footer className="case-study-footer">
        <span>Lagos, Nigeria · Working globally</span>
        <a href="mailto:rasheediskilu.dev@gmail.com">Get in touch</a>
      </footer>
    </main>
  );
}
