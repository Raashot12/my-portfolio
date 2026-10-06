const fallbackSiteUrl = "https://rashdev.vercel.app";

export default function PortfolioStructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || fallbackSiteUrl;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Rasheed Iskilu",
        url: siteUrl,
        email: "mailto:rasheediskilu.dev@gmail.com",
        jobTitle: "Senior Frontend Engineer",
        description:
          "Senior Frontend Engineer with 5+ years of experience building production web and mobile products across healthcare, fintech, ticketing, and supply chain.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lagos",
          addressCountry: "NG",
        },
        sameAs: [
          "https://www.linkedin.com/in/rasheed-dev/",
          "https://github.com/Raashot12",
          "https://x.com/rashdev_i",
        ],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Lagos State University",
        },
        knowsAbout: [
          "React",
          "Next.js",
          "TypeScript",
          "React Native",
          "Frontend architecture",
          "Design systems",
          "Accessible user interfaces",
          "Offline-first web applications",
          "Automated frontend testing",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Rasheed Iskilu - Senior Frontend Engineer",
        description:
          "Selected product work, experience and capabilities of Senior Frontend Engineer Rasheed Iskilu.",
        inLanguage: "en",
        author: { "@id": `${siteUrl}/#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
