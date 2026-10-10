import { getSiteUrlString } from "@/lib/site-url";

const profileName = "Rasheed Iskilu";
const profileTitle = "Frontend Engineer";
const profileDescription =
  "Frontend Engineer in Lagos, Nigeria building accessible, high-performance web and mobile products with React, Next.js, TypeScript and React Native.";
const lastModified = "2026-10-07";

type ProjectEntity = {
  id: string;
  name: string;
  description: string;
  image: string;
  url?: string;
  category: string;
  subCategory: string;
  industries: string[];
  capabilities: string[];
  operatingSystem: string;
  keywords: string[];
  highlights: string[];
  sameAs?: string[];
};

const projects: ProjectEntity[] = [
  {
    id: "plural-health",
    name: "Plural Health",
    description:
      "Healthcare software suite covering electronic health records, pharmacy operations, insurance, laboratory and clinical workflows.",
    image: "/neopharmacy.webp",
    url: "https://plural.health/",
    category: "HealthApplication",
    subCategory:
      "Electronic health records, pharmacy management and clinical operations software",
    industries: [
      "Digital health",
      "Healthcare technology",
      "Pharmacy operations",
      "Hospital operations",
    ],
    capabilities: [
      "Frontend engineering",
      "Design systems",
      "Offline-first architecture",
      "Accessible data-heavy workflows",
    ],
    operatingSystem: "Web, iOS and Android",
    keywords: [
      "healthcare software",
      "electronic health record",
      "pharmacy software",
      "offline-first application",
      "clinical workflow design",
    ],
    highlights: [
      "Role-based clinical dashboards and forms",
      "Offline-first pharmacy workflows with sync retries",
      "Reusable data tables, reports and UI systems",
    ],
    sameAs: [
      "https://plural.health/",
      "https://app.plural.health/signup",
      "https://neopharm.plural.health/signup",
    ],
  },
  {
    id: "betpikr",
    name: "Betpikr",
    description:
      "Responsive customer and back-office betting interfaces with realtime data, role-based administration and operational reporting.",
    image: "/betPikr.webp",
    url: "https://dev-frontend.betpikr.app/en",
    category: "BusinessApplication",
    subCategory:
      "Sports betting customer experience and realtime operations platform",
    industries: [
      "Sports technology",
      "Gaming technology",
      "Operations software",
      "Realtime web applications",
    ],
    capabilities: [
      "Frontend engineering",
      "Responsive interface design",
      "Realtime data presentation",
      "Role-based operations dashboards",
    ],
    operatingSystem: "Web",
    keywords: [
      "fintech frontend engineer",
      "realtime web application",
      "operations dashboard",
      "role-based administration",
      "responsive React interface",
    ],
    highlights: [
      "Customer journeys and operational tools",
      "Realtime data and reporting interfaces",
      "Reliable loading, validation and error states",
    ],
    sameAs: ["https://dev-frontend.betpikr.app/en"],
  },
  {
    id: "myneohealth-visilite",
    name: "myNeoHealth and VisiLite",
    description:
      "Mobile healthcare and inventory products for patient access, clinical teams and supply-chain operations.",
    image: "/website.webp",
    category: "HealthApplication",
    subCategory:
      "Mobile healthcare, patient engagement and inventory management software",
    industries: [
      "Digital health",
      "Mobile healthcare",
      "Supply chain technology",
      "Clinical operations",
    ],
    capabilities: [
      "React Native engineering",
      "Mobile product development",
      "Barcode and QR workflows",
      "Secure API integration",
    ],
    operatingSystem: "iOS and Android",
    keywords: [
      "React Native engineer",
      "mobile healthcare app",
      "inventory management software",
      "barcode scanning workflow",
      "secure API integration",
    ],
    highlights: [
      "Patient records, results, prescriptions and visits",
      "Clinical and administrative mobile workflows",
      "Shipment, expiry and barcode inventory operations",
    ],
    sameAs: [
      "https://apps.apple.com/ng/app/neoehr/id6473736118",
      "https://play.google.com/store/apps/details?id=com.plateaumed.myneo",
      "https://apps.apple.com/gb/app/visilite/id6465992591",
    ],
  },
];

export default function PortfolioStructuredData() {
  const siteUrl = getSiteUrlString();
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;
  const pageId = `${siteUrl}/#webpage`;
  const profileId = `${siteUrl}/#profile`;

  const projectEntities = projects.map((project) => ({
    "@type": ["SoftwareApplication", "CreativeWork"],
    "@id": `${siteUrl}/#project-${project.id}`,
    name: project.name,
    description: project.description,
    url: project.url || `${siteUrl}/#project-${project.id}`,
    image: `${siteUrl}${project.image}`,
    applicationCategory: project.category,
    applicationSubCategory: project.subCategory,
    genre: project.industries,
    about: project.industries.map((industry) => ({
      "@type": "Thing",
      name: industry,
    })),
    operatingSystem: project.operatingSystem,
    keywords: [...project.keywords, ...project.industries, ...project.capabilities],
    featureList: [...project.highlights, ...project.capabilities],
    creator: { "@id": personId },
    author: { "@id": personId },
    isPartOf: { "@id": pageId },
    ...(project.sameAs ? { sameAs: project.sameAs } : {}),
  }));

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: profileName,
        url: siteUrl,
        email: "mailto:rasheediskilu.dev@gmail.com",
        jobTitle: profileTitle,
        description: profileDescription,
        image: `${siteUrl}/og_thumbnail.webp`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lagos",
          addressCountry: "NG",
        },
        homeLocation: {
          "@type": "City",
          name: "Lagos",
          containedInPlace: {
            "@type": "Country",
            name: "Nigeria",
          },
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
        hasOccupation: {
          "@type": "Occupation",
          name: profileTitle,
          occupationLocation: {
            "@type": "City",
            name: "Lagos",
          },
          skills:
            "React, Next.js, TypeScript, React Native, frontend architecture, design systems, accessibility, offline-first applications and automated testing",
        },
        knowsAbout: [
          "React frontend development",
          "Next.js application development",
          "TypeScript",
          "React Native mobile development",
          "Frontend architecture",
          "Design systems",
          "Accessible user interfaces",
          "Offline-first web applications",
          "Healthcare software",
          "Fintech interfaces",
          "Digital health product development",
          "Pharmacy management software",
          "Hospital operations software",
          "Sports technology interfaces",
          "Realtime operations dashboards",
          "Mobile healthcare applications",
          "Inventory management interfaces",
          "Design systems engineering",
          "Web accessibility and performance",
          "Automated frontend testing",
        ],
        mainEntityOfPage: { "@id": profileId },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: `${profileName} - ${profileTitle}`,
        description:
          "Portfolio of a Lagos-based Frontend Engineer building production healthcare, fintech and operational products.",
        inLanguage: "en",
        publisher: { "@id": personId },
        about: { "@id": personId },
        keywords: [
          "Frontend Engineer Lagos",
          "React developer Nigeria",
          "Next.js developer",
          "TypeScript engineer",
          "React Native developer",
          "frontend architecture consultant",
          "healthcare software engineer",
          "digital health frontend engineer",
          "sports technology frontend engineer",
          "mobile healthcare app developer",
          "operations dashboard developer",
          "design systems engineer",
          "accessible frontend development",
          "remote frontend engineer",
        ],
      },
      {
        "@type": "ProfilePage",
        "@id": profileId,
        url: siteUrl,
        name: `${profileName} | ${profileTitle}`,
        description: profileDescription,
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
        dateModified: lastModified,
        hasPart: projectEntities.map((project) => ({ "@id": project["@id"] })),
      },
      {
        "@type": "WebPage",
        "@id": pageId,
        url: siteUrl,
        name: `${profileName} - Frontend Engineer Portfolio`,
        description: profileDescription,
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
        dateModified: lastModified,
        keywords: [
          "frontend engineer portfolio",
          "React portfolio",
          "Next.js portfolio",
          "healthcare product engineer",
          "fintech frontend engineer",
          "Lagos software engineer",
          "digital health developer",
          "sports technology developer",
          "mobile product engineer",
          "operations software frontend engineer",
          "accessible React developer",
        ],
        breadcrumb: { "@id": `${siteUrl}/#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#selected-work`,
        name: "Selected product work",
        description:
          "Healthcare, fintech and mobile product interfaces designed and engineered by Rasheed Iskilu.",
        numberOfItems: projectEntities.length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: projectEntities.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: project.name,
          url: project.url,
          item: { "@id": project["@id"] },
        })),
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#frontend-engineering-service`,
        name: "Frontend engineering and product interface development",
        serviceType: [
          "React frontend development",
          "Next.js application development",
          "TypeScript frontend architecture",
          "React Native mobile development",
          "Design systems and accessible UI",
          "Digital health product development",
          "Healthcare operations software interfaces",
          "Realtime sports technology interfaces",
          "Inventory and supply-chain workflow applications",
        ],
        description:
          "Frontend engineering for complex healthcare, fintech and operational products across web and mobile.",
        provider: { "@id": personId },
        areaServed: [
          { "@type": "City", name: "Lagos" },
          { "@type": "Country", name: "Nigeria" },
          { "@type": "Place", name: "Worldwide" },
        ],
        url: `${siteUrl}/#contact`,
      },
      ...projectEntities,
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
