export type CaseStudyHeroArt = {
  image: string;
  imageAlt: string;
  caption: string;
  surface: string;
  ink: string;
  accent: string;
};
export type CaseStudy = {
  slug: string; title: string; focus: string; categories: string[]; description: string;
  role: string; platform: string; technologies: string[];
  overview: string[]; challenge?: string[]; approach?: string[];
  contributions: string[]; outcome: string;
  links: { label: string; href: string }[];
  hero: CaseStudyHeroArt;
};
const caseStudyContent: Omit<CaseStudy, "hero">[] = [
  { slug: "plural-health", title: "Frontend engineering for Plural Health", focus: "Healthcare software · EHR · Pharmacy operations", categories: ["Digital health", "Healthcare technology", "Electronic health records", "Pharmacy operations", "Offline-first applications"], description: "How I helped build role-based healthcare workflows and offline-ready pharmacy tools for Plural Health with Next.js, TypeScript, and React Native.", role: "Frontend Engineer", platform: "Web and mobile", technologies: ["Next.js", "TypeScript", "React Native", "Redux Toolkit", "Dexie", "Jest", "Cypress"], overview: ["Plural Health brings together electronic health records, pharmacy, insurance, laboratory, billing, inventory, and administrative workflows. I worked on frontend delivery across this product suite, where different clinical and operations roles needed clear interfaces for day-to-day work.", "The work involved turning dense requirements and API data into reusable screens, forms, tables, reports, and role-based dashboards that teams could maintain across multiple products."], contributions: ["Built shared dashboards, data tables, reports, and multi-role clinical forms.", "Engineered offline-first pharmacy flows with IndexedDB, sync retries, and conflict handling for unreliable connections.", "Supported delivery with Jest, React Testing Library, Cypress, and code review."], outcome: "The result was a more consistent frontend foundation for complex healthcare operations, including pharmacy workflows designed to keep working through connectivity interruptions.", links: [{ label: "Visit Plural Health", href: "https://plural.health/" }, { label: "Explore NeoPharmacy", href: "https://neopharm.plural.health/signup" }] },
  { slug: "betpikr", title: "Customer and operations interfaces for Betpikr", focus: "Real-time product interfaces · Operations", categories: ["Sports technology", "Gaming technology", "Realtime web applications", "Operations dashboards", "Responsive product interfaces"], description: "Frontend case study on responsive customer journeys and back-office tools for Betpikr, built with React and TypeScript.", role: "Frontend Engineer", platform: "Customer web app and back office", technologies: ["React", "TypeScript", "REST APIs", "Responsive UI", "Real-time data"], overview: ["Betpikr combines a customer-facing betting experience with back-office tools for operators. Those surfaces serve different needs, but both depend on clear feedback as data changes and users move through important tasks.", "I worked on responsive journeys and operational interfaces, shaping shared patterns for live data, administration, and reporting."], contributions: ["Built responsive customer journeys and operational tools from reusable interface patterns.", "Designed loading, validation, and error states for high-intent flows.", "Worked with product, design, backend, and QA to resolve production issues."], outcome: "The work gave customers and operators clearer, more consistent ways to use the product across different screen sizes and workflows.", links: [{ label: "View Betpikr", href: "https://dev-frontend.betpikr.app/en" }] },
  { slug: "myneohealth-visilite", title: "Mobile healthcare and inventory workflows", focus: "React Native · Healthcare · Supply chain", categories: ["Mobile healthcare", "Digital health", "Supply chain technology", "Inventory management", "Barcode and QR workflows"], description: "A mobile product case study covering patient access, clinical workflows, and barcode-led inventory operations for myNeoHealth and VisiLite.", role: "React Native Engineer", platform: "iOS and Android", technologies: ["React Native", "Expo", "TypeScript", "REST APIs", "EAS"], overview: ["myNeoHealth and VisiLite support different parts of healthcare work on mobile: patient access to records and visits, clinical and administrative tasks, and inventory operations for supply chains.", "I contributed to mobile workflows that needed to make important information easy to find and operational tasks practical on the move."], contributions: ["Contributed to patient access for records, results, prescriptions, and visits.", "Shipped clinical and administrative workflows for hospital professionals.", "Built inventory flows for shipments, expiry monitoring, and QR or barcode scanning."], outcome: "The mobile work brought patient, clinical, and inventory tasks into focused flows designed for phone and tablet use.", links: [{ label: "NeoEHR on the App Store", href: "https://apps.apple.com/ng/app/neoehr/id6473736118" }, { label: "myNeoHealth on Google Play", href: "https://play.google.com/store/apps/details?id=com.plateaumed.myneo" }, { label: "VisiLite on the App Store", href: "https://apps.apple.com/gb/app/visilite/id6465992591" }] },
  {
    slug: "user-management-platform",
    title: "A full-stack user management platform",
    focus: "Full-stack product · User administration · REST API",
    categories: ["Full-stack development", "User management", "REST APIs", "PostgreSQL"],
    description:
      "A React and Vite client connected to a NestJS API for managing user profiles and related records with PostgreSQL transactions.",
    role: "Full-stack Developer",
    platform: "React web app + NestJS API",
    technologies: [
      "React",
      "Vite",
      "TypeScript",
      "Redux Toolkit",
      "RTK Query",
      "NestJS",
      "TypeORM",
      "PostgreSQL",
      "Docker Compose",
      "REST API",
      "Swagger / OpenAPI",
    ],
    challenge: [
      "A user record spans profile, contact, address, and academic history. Saving each piece independently can leave partial records and force the client to coordinate several requests.",
    ],
    overview: [
      "The project pairs a React and Vite web app with a NestJS API and PostgreSQL database. Its current connected slice includes a user list and an endpoint that accepts the related records together.",
    ],
    approach: [
      "I modeled related records as one user aggregate and implemented a versioned REST endpoint that writes the aggregate in a single PostgreSQL transaction.",
      "TypeORM migrations keep schema changes explicit, with automatic schema synchronization disabled. The web client connects to the API through Redux Toolkit and RTK Query, and Swagger documents the API surface.",
    ],
    contributions: [
      "Defined the user aggregate entities, DTOs, and migration for profile and related records.",
      "Built REST endpoints with transaction-safe aggregate creation and API documentation.",
      "Connected the React and Vite app shell to the API and user list with RTK Query.",
    ],
    outcome:
      "The current slice connects the React client to documented NestJS endpoints and transaction-safe PostgreSQL persistence. The live app and API docs let visitors explore both sides of the product.",
    links: [
      { label: "Open the live app", href: "https://user-management-platform-jade.vercel.app/" },
      {
        label: "Explore the API docs",
        href: "https://user-management-platform-t3dj.onrender.com/api/docs#/users/UsersController_findAll",
      },
      { label: "View the GitHub repository", href: "https://github.com/Raashot12/user-management-platform" },
    ],
  },
  {
    slug: "livdot",
    title: "A full-stack platform for live events",
    focus: "Live events · Operations · Ticketing",
    categories: ["Event technology", "Frontend architecture", "Ticketing", "Operations software"],
    description:
      "A frontend-led event experience built with Next.js, backed by NestJS and PostgreSQL for event data and lifecycle rules.",
    role: "Frontend-led Full-stack Engineer",
    platform: "Next.js web app + NestJS API",
    technologies: [
      "Next.js App Router",
      "React",
      "TypeScript",
      "TanStack Query",
      "Tailwind CSS",
      "shadcn/ui",
      "Radix UI",
      "Zod",
      "NestJS",
      "TypeORM",
      "PostgreSQL",
      "REST API",
      "MSW",
      "Vitest",
      "React Testing Library",
      "Playwright",
      "Docker Compose",
    ],
    challenge: [
      "Hosts and ticket buyers move through different parts of the same event lifecycle. Readiness checks, live-state transitions, ticket inventory, and checkout need to stay understandable while preventing invalid state changes.",
    ],
    overview: [
      "LIV DOT brings host operations and the public ticket-buying journey into one event platform. Hosts can create events, manage crew and streaming readiness, and move events through lifecycle states; guests can discover events and select tickets.",
    ],
    approach: [
      "I kept readiness and lifecycle rules in a pure domain core, with application use cases depending on an event-repository port. The HTTP adapter and UI can change without moving those policies into components.",
      "The Next.js UI uses TanStack Query behind an event-repository port. NestJS endpoints persist event data through TypeORM migrations to PostgreSQL, and lifecycle updates use an atomic expected-version check so stale clients receive a conflict response.",
      "An MSW adapter supports local exploration with controlled latency and failure scenarios, keeping loading, validation, and error states reproducible.",
    ],
    contributions: [
      "Built a six-step event-creation flow with an optional section-based seat-map builder and preview.",
      "Implemented host workflows for event details, readiness, crew and streaming, live control, replay, ticketing, and order management.",
      "Built the guest discovery, event details, seat-selection, multi-event basket, and checkout experience.",
      "Implemented NestJS event endpoints and PostgreSQL persistence, with version-checked state transitions and migration-managed schema.",
      "Added deterministic scenarios for readiness blockers, invalid transitions, network failures, and stale-version conflicts.",
    ],
    outcome:
      "The result is a full-stack event operations product with a frontend-led host and guest experience, an event API, and persistent PostgreSQL records. The public demo is explorable with seeded events; account preview remains browser-local and checkout is simulated, with no production identity or payment provider connected.",
    links: [
      { label: "Open the LIV DOT demo", href: "https://livdot-lemon.vercel.app/" },
      { label: "View the GitHub repository", href: "https://github.com/Raashot12/Livdot" },
    ],
  },
];
const caseStudyHeroArt: Record<string, CaseStudyHeroArt> = {
  "plural-health": {
    image: "/plural-health.png",
    imageAlt: "Plural Health homepage introducing its healthcare product suite.",
    caption: "Healthcare product suite",
    surface: "#edf2fb",
    ink: "#101a45",
    accent: "#2725b8",
  },
  betpikr: {
    image: "/case-studies/betpikr-live-hero.png",
    imageAlt: "Betpikr sports and gaming experience with live categories and promotions.",
    caption: "Customer sports and gaming experience",
    surface: "#10120d",
    ink: "#f4f7ed",
    accent: "#c3f84a",
  },
  "myneohealth-visilite": {
    image: "/neo-pharmacy.webp",
    imageAlt: "Pharmacy operations dashboard showing stock and sales workflows.",
    caption: "Healthcare and pharmacy operations",
    surface: "#eff2fc",
    ink: "#111a46",
    accent: "#3e37be",
  },
  "user-management-platform": {
    image: "/case-studies/people-add-dialog.png",
    imageAlt: "Blank four-step profile form from the live user management app.",
    caption: "Guided profile workflow",
    surface: "#edf4ef",
    ink: "#17372d",
    accent: "#22654d",
  },
  livdot: {
    image: "/case-studies/livdot-live-hero.png",
    imageAlt: "LIV DOT event discovery page with a search bar and upcoming events.",
    caption: "Guest event discovery",
    surface: "#081a36",
    ink: "#eff7ff",
    accent: "#12c9e3",
  },
};
export const caseStudies: CaseStudy[] = caseStudyContent.map((study) => ({
  ...study,
  hero: caseStudyHeroArt[study.slug],
}));
export function getCaseStudy(slug: string) { return caseStudies.find((study) => study.slug === slug); }
