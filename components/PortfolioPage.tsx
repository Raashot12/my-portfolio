"use client";

// import Image from "next/image";
import TechStackMarquee from "./TechStackMarquee";
import SiteHeader from "./SiteHeader";
import PortfolioScrollAnimations from "./PortfolioScrollAnimations";
import Hero3DBackground from "./hero-engine/Hero3DBackground";
import ProjectMediaCarousel, {
  type ProjectCarouselSlide,
} from "./ProjectMediaCarousel";

const resumeHref = "/Rasheed_Iskilu_Frontend_Engineer_Resume.pdf";

const pluralHealthSlides: ProjectCarouselSlide[] = [
  {
    id: "neopharmacy",
    label: "NeoPharmacy / Login",
    note: "Offline-ready workflows",
    src: "/login.webp",
    alt: "NeoPharmacy Login page(pseduo)",
    width: 1672,
    height: 941,
    canvas: "pharmacy",
  },
  {
    id: "neopharmacy1",
    label: "NeoPharmacy / Outlet Selection",
    note: "Offline-ready workflows",
    src: "/selectoutlet.webp",
    alt: "NeoPharmacy outlet selection",
    width: 1672,
    height: 941,
    canvas: "pharmacy",
  },
  {
    id: "neopharmacy1",
    label: "NeoPharmacy / Point of sale",
    note: "Offline-ready workflows",
    src: "/pointofsale.webp",
    alt: "NeoPharmacy point-of-sale dashboard with product search, cart, and checkout controls",
    width: 1672,
    height: 941,
    canvas: "pharmacy",
  },
  {
    id: "neoehr",
    label: "NeoEHR / Clinical workspace",
    note: "Role-based care",
    src: "/neoehr.webp",
    alt: "NeoEHR clinical workspace for recording investigations, vital signs, diagnoses, and procedures",
    width: 1660,
    height: 947,
    canvas: "ehr",
  },
  {
    id: "plural-website",
    label: "Plural / Product website",
    note: "Product storytelling",
    src: "/website.webp",
    alt: "Plural Health website promoting NeoPharmacy Online with a payment checkout preview",
    width: 1902,
    height: 945,
    canvas: "website",
  },
];

const betpikrSlides: ProjectCarouselSlide[] = [
  {
    id: "betpikr-sportsbook",
    label: "Betpikr / Sportsbook",
    note: "Customer experience",
    src: "/betPikr.webp",
    alt: "Betpikr sportsbook interface showing promotions, sports navigation, boosted bets, and match odds",
    width: 5760,
    height: 4096,
    canvas: "sportsbook",
  },
  {
    id: "betpikr-backoffice",
    label: "Betpikr / Backoffice",
    note: "Operations + analytics",
    src: "/backoffice.webp",
    alt: "Betpikr Backoffice analytics dashboard with user, betting, revenue, KYC, and community metrics",
    width: 1265,
    height: 1243,
    canvas: "backoffice",
  },
];

const primaryProjects = [
  {
    number: "01",
    slug: "plural-health",
    eyebrow: "Healthcare product suite",
    title: "Plural Health",
    statement: "Making dense clinical operations feel clear.",
    description:
      "A connected suite for hospitals, pharmacies, insurers, laboratories and patients. I helped shape complex, role-based workflows into dependable web and mobile interfaces used across day-to-day healthcare operations.",
    role: "Frontend Engineer",
    scope: "Web + mobile",
    focus: "Architecture, UI systems, workflows",
    highlights: [
      "Built reusable dashboards, data tables, reports and multi-role clinical forms.",
      "Engineered offline-first pharmacy flows with IndexedDB, sync retries and conflict handling.",
      "Strengthened delivery with Jest, React Testing Library, Cypress and code review.",
    ],
    stack: ["Next.js", "TypeScript", "React Native", "Redux Toolkit", "Dexie"],
    tone: "violet",
    links: [
      { label: "Neo EHR", href: "https://app.plural.health/signup" },
      { label: "NeoPharmacy", href: "https://neopharm.plural.health/signup" },
      { label: "Plural Health", href: "https://plural.health/" },
    ],
  },
  {
    number: "02",
    slug: "betpikr",
    eyebrow: "Fintech operations",
    title: "Betpikr",
    statement: "One product language for customers and operators.",
    description:
      "Production betting interfaces spanning the customer experience and the back office. The work balances fast-moving real-time data with role-based administration, reporting and clear operational feedback.",
    role: "Frontend Engineer",
    scope: "Customer + back office",
    focus: "Realtime data, admin, reporting",
    highlights: [
      "Built responsive customer journeys and operational tools from shared patterns.",
      "Designed reliable loading, validation and error states for high-intent flows.",
      "Worked across product, design, backend and QA to resolve production issues.",
    ],
    stack: [
      "React",
      "TypeScript",
      "REST APIs",
      "Realtime data",
      "Responsive UI",
    ],
    tone: "gold",
    links: [
      { label: "View product", href: "https://dev-frontend.betpikr.app/en" },
    ],
  },
  {
    number: "03",
    slug: "myneohealth-visilite",
    eyebrow: "Mobile healthcare + inventory",
    title: "myNeoHealth & VisiLite",
    statement: "Critical workflows, designed to travel.",
    description:
      "Mobile products for patients, clinical teams and healthcare supply chains. From medical records and appointments to barcode-led stock operations, each flow is built for clarity in the moments that matter.",
    role: "React Native Engineer",
    scope: "iOS + Android",
    focus: "Secure API workflows, inventory",
    highlights: [
      "Contributed to patient access for records, results, prescriptions and visits.",
      "Shipped clinical and administrative workflows for hospital professionals.",
      "Built inventory flows for shipments, expiry monitoring and QR/barcode scanning.",
    ],
    stack: ["React Native", "Expo", "TypeScript", "REST APIs", "EAS"],
    tone: "sky",
    links: [
      {
        label: "NeoEHR",
        href: "https://apps.apple.com/ng/app/neoehr/id6473736118",
      },
      {
        label: "myNeoHealth",
        href: "https://play.google.com/store/apps/details?id=com.plateaumed.myneo",
      },
      {
        label: "VisiLite",
        href: "https://apps.apple.com/gb/app/visilite/id6465992591",
      },
    ],
  },
];

const experience = [
  {
    period: "May 2022 — May 2026",
    role: "Frontend Engineer",
    company: "Plural Health / Plateaumed Limited",
    location: "Lagos, Nigeria",
    summary:
      "Led frontend delivery across EHR, pharmacy, insurance, laboratory, billing, inventory and administration products; created shared UI patterns, resilient offline workflows and a stronger testing culture.",
  },
  {
    period: "2025",
    role: "Frontend Engineer · Contract",
    company: "HCSS Technology",
    location: "Remote",
    summary:
      "Built React Native inventory workflows and a Next.js administration experience for healthcare supply-chain operations, including bulk upload, validation and processing feedback.",
  },
  {
    period: "Dec 2020 — Apr 2022",
    role: "Frontend Engineer",
    company: "Canary Point Holding",
    location: "Remote",
    summary:
      "Delivered responsive React interfaces for fintech products, connecting critical onboarding, account and transaction journeys to Node.js APIs with dependable states and error handling.",
  },
  {
    period: "May 2020 — Nov 2020",
    role: "Frontend Developer Trainee",
    company: "Skillup Africa",
    location: "Remote",
    summary:
      "Built the foundation: responsive interfaces, reusable React components, API-connected workflows and collaborative product delivery.",
  },
];

const shippedWork = [
  {
    name: "Obafemi Hamzat",
    type: "Public platform",
    detail: "Responsive Next.js website and search optimisation.",
    href: "https://obafemihamzat.vercel.app/",
  },
  {
    name: "MCPLambda",
    type: "AI developer platform",
    detail: "Dashboards, deployment workflows, registry and analytics.",
    href: "https://mcplambda.io/",
  },
  {
    name: "Jetron Ticket",
    type: "Event technology",
    detail: "Discovery, organiser onboarding and ticket management.",
    href: "https://www.jetronticket.com/",
  },
  {
    name: "Homiverse",
    type: "PropTech",
    detail: "Verified property discovery and rental workflows.",
    href: "https://homiverse.ng/",
  },
];

const capabilities = [
  {
    number: "01",
    title: "Product frontend architecture",
    body: "Reusable component systems, design systems and state boundaries that help teams move quickly without making the product fragile.",
  },
  {
    number: "02",
    title: "Complex workflow design",
    body: "Role-based dashboards, transactional journeys, dense forms and data-heavy interfaces made understandable for real people.",
  },
  {
    number: "03",
    title: "Resilient web & mobile",
    body: "Responsive, offline-aware experiences with deliberate loading, empty, error, retry and synchronisation states.",
  },
  {
    number: "04",
    title: "Quality-led delivery",
    body: "Practical automated testing, accessibility, production debugging, thoughtful reviews and clear cross-functional communication.",
  },
];

function Arrow({ diagonal = true }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {diagonal ? (
        <>
          <path d="M7 17 17 7" />
          <path d="M7 7h10v10" />
        </>
      ) : (
        <>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </>
      )}
    </svg>
  );
}

function ProjectVisual({ projectIndex }: { projectIndex: number }) {
  if (projectIndex === 0) {
    return (
      <ProjectMediaCarousel
        ariaLabel="Plural Health product suite"
        slides={pluralHealthSlides}
        variant="plural"
      />
    );
  }

  if (projectIndex === 1) {
    return (
      <ProjectMediaCarousel
        ariaLabel="Betpikr customer and back-office products"
        slides={betpikrSlides}
        variant="betpikr"
      />
    );
  }

  return (
    <div
      className="project-visual mobile-visual"
      aria-label="Abstract representation of mobile healthcare and inventory workflows"
    >
      <div className="phone phone-left" aria-hidden="true">
        <div className="phone-speaker" />
        <div className="mobile-greeting">Good morning, Ada</div>
        <div className="health-card">
          <span>Next appointment</span>
          <strong>Today · 10:30</strong>
        </div>
        <div className="mobile-grid">
          <span>Records</span>
          <span>Results</span>
          <span>Visits</span>
          <span>Pharmacy</span>
        </div>
      </div>
      <div className="phone phone-right" aria-hidden="true">
        <div className="phone-speaker" />
        <div className="inventory-head">
          <span>Inventory</span>
          <b>+ Add</b>
        </div>
        <div className="scan-box">
          <i />
          <span>Scan product</span>
        </div>
        <div className="inventory-list">
          <span>
            <i className="green" />
            <b>In stock</b>
            <small>248</small>
          </span>
          <span>
            <i className="amber" />
            <b>Low stock</b>
            <small>18</small>
          </span>
          <span>
            <i className="red" />
            <b>Expiring</b>
            <small>06</small>
          </span>
        </div>
      </div>
      <span className="visual-note note-top">Secure patient access</span>
      <span className="visual-note note-bottom">Barcode inventory</span>
    </div>
  );
}

type PortfolioPageProps = {
  onEngineReady?: () => void;
};

export default function PortfolioPage({ onEngineReady }: PortfolioPageProps) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <SiteHeader />

      <PortfolioScrollAnimations>
        <section className="hero" id="home">
          <Hero3DBackground onReady={onEngineReady} />
          <div className="hero-orbit orbit-one" aria-hidden="true" />
          <div className="hero-orbit orbit-two" aria-hidden="true" />
          <div className="page-shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow">
                <span /> Frontend engineer · Lagos / global
              </p>
              <h1>Frontend engineer building products people trust.</h1>
              <p className="hero-intro">
                Five-plus years turning complex healthcare, fintech and
                operational workflows into fast, accessible web and mobile
                products.
              </p>
              <div className="hero-actions">
                <a className="button button-light" href="#work">
                  View selected work <Arrow diagonal={false} />
                </a>
                <a className="button button-ghost" href={resumeHref} download>
                  Download résumé <span aria-hidden="true">↓</span>
                </a>
              </div>
              <div className="availability">
                <span className="availability-dot" aria-hidden="true" />
                Available for frontend roles and product collaborations.
              </div>
            </div>

            {/* <div
              className="hero-stage"
              aria-label="Preview of Rasheed's product interface work"
            >
              <div className="hero-browser">
                <div className="window-bar" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <b>health-haven / analytics</b>
                </div>
                <div className="hero-image-wrap">
                  <Image
                    src="/neo-pharmacy.webp"
                    alt="Pharmacy analytics interface designed and built for Plural Health"
                    fill
                    sizes="(max-width: 900px) 92vw, 48vw"
                    className="hero-product-image"
                    priority
                  />
                </div>
              </div>
              <div
                className="floating-card floating-card-code"
                aria-hidden="true"
              >
                <span>Frontend system</span>
                <strong>Next.js · TypeScript</strong>
              </div>
              <div
                className="floating-card floating-card-quality"
                aria-hidden="true"
              >
                <span>Built for reality</span>
                <strong>Offline · tested · accessible</strong>
              </div>
            </div> */}
          </div>

          <div
            className="page-shell hero-proof"
            aria-label="Experience summary"
          >
            <div>
              <strong>5+</strong>
              <span>
                Years shipping
                <br />
                production software
              </span>
            </div>
            <div>
              <strong>4</strong>
              <span>
                Product domains
                <br />
                across real operations
              </span>
            </div>
            <div>
              <strong>2</strong>
              <span>
                Platforms
                <br />
                web + mobile
              </span>
            </div>
            <p>React · Next.js · TypeScript · React Native</p>
          </div>
        </section>

        <TechStackMarquee />

        <section className="about-section" id="about">
          <div className="page-shell">
            <div className="section-index">
              <span>01 / Profile</span>
              <span>Engineering with product judgement</span>
            </div>
            <div className="about-layout">
              <h2>
                Complex software.
                <br />
                <em>Clear decisions.</em>
              </h2>
              <div className="about-copy">
                <p className="lead-copy">
                  I work where product, design and engineering meet—turning
                  dense requirements into interfaces that feel obvious to use
                  and sane to maintain.
                </p>
                <p>
                  My strongest work lives in high-stakes products: clinical
                  systems, pharmacy operations, financial journeys and
                  supply-chain tools. I care about the details users notice and
                  the architecture teams inherit.
                </p>
                <a className="text-link" href="#experience">
                  See the experience behind the work <Arrow />
                </a>
              </div>
            </div>

            <div className="proof-grid">
              <article>
                <span className="proof-icon">CL</span>
                <h3>Clinical complexity</h3>
                <p>
                  EHR, pharmacy, laboratory, billing, inventory, ward and
                  reporting workflows.
                </p>
              </article>
              <article>
                <span className="proof-icon">OF</span>
                <h3>Offline resilience</h3>
                <p>
                  Local persistence, synchronisation, retries and conflict
                  handling for weak networks.
                </p>
              </article>
              <article>
                <span className="proof-icon">QA</span>
                <h3>Quality culture</h3>
                <p>
                  Automated testing, accessible UI, production debugging, review
                  and mentoring.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="page-shell">
            <div className="section-index section-index-dark">
              <span>02 / Selected work</span>
              <span>Production products, not concept pieces</span>
            </div>
            <div className="section-heading-row">
              <h2>
                Work that holds up
                <br />
                <em>in the real world.</em>
              </h2>
              <p>
                A focused selection showing systems thinking, product craft and
                implementation across web and mobile.
              </p>
            </div>

            <div className="projects-list">
              {primaryProjects.map((project, index) => (
                <article
                  className={`project-card project-${project.tone}`}
                  id={`project-${project.slug}`}
                  key={project.title}
                >
                  <ProjectVisual projectIndex={index} />
                  <div className="project-copy">
                    <div className="project-kicker">
                      <span>{project.number}</span>
                      <span>{project.eyebrow}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p className="project-statement">{project.statement}</p>
                    <p className="project-description">{project.description}</p>

                    <dl className="project-meta">
                      <div>
                        <dt>Role</dt>
                        <dd>{project.role}</dd>
                      </div>
                      <div>
                        <dt>Platform</dt>
                        <dd>{project.scope}</dd>
                      </div>
                      <div>
                        <dt>Focus</dt>
                        <dd>{project.focus}</dd>
                      </div>
                    </dl>

                    <ul className="project-highlights">
                      {project.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>

                    <div
                      className="stack-list"
                      aria-label={`${project.title} technology stack`}
                    >
                      {project.stack.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>

                    <div className="project-links">
                      <a href={`/work/${project.slug}`}>Read the {project.title} case study <Arrow /></a>
                      {project.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {link.label} <Arrow />
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="more-work">
              <div className="more-work-heading">
                <p className="eyebrow">More shipped work</p>
                <h3>Breadth, with the same attention to detail.</h3>
              </div>
              <div className="more-work-list">
                {shippedWork.map((item, index) => (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    key={item.name}
                  >
                    <span className="more-number">0{index + 1}</span>
                    <span>
                      <strong>{item.name}</strong>
                      <small>{item.type}</small>
                    </span>
                    <p>{item.detail}</p>
                    <span className="round-arrow">
                      <Arrow />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="experience-section" id="experience">
          <div className="page-shell">
            <div className="section-index">
              <span>03 / Experience</span>
              <span>From first component to product architecture</span>
            </div>
            <div className="experience-layout">
              <div className="experience-intro">
                <h2>
                  Five years of
                  <br />
                  <em>shipping forward.</em>
                </h2>
                <p>
                  I have grown through the full product cycle: learning the
                  craft, owning critical flows, shaping shared systems and
                  helping other engineers raise the bar.
                </p>
                <a className="button button-dark" href={resumeHref} download>
                  Download full résumé <span aria-hidden="true">↓</span>
                </a>
              </div>
              <div className="timeline">
                {experience.map((item) => (
                  <article key={`${item.company}-${item.period}`}>
                    <div className="timeline-marker" aria-hidden="true" />
                    <p className="timeline-period">{item.period}</p>
                    <h3>{item.role}</h3>
                    <p className="timeline-company">
                      {item.company} · {item.location}
                    </p>
                    <p className="timeline-summary">{item.summary}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="capabilities-section">
          <div className="page-shell">
            <div className="section-index section-index-dark">
              <span>04 / How I contribute</span>
              <span>Useful from discovery through production</span>
            </div>
            <div className="capabilities-layout">
              <div className="capabilities-title">
                <h2>
                  A Frontend partner,
                  <br />
                  <em>not just a pair of hands.</em>
                </h2>
                <p>
                  I bring technical depth, product thinking and calm execution
                  to teams building software people depend on.
                </p>
              </div>
              <div className="capability-list">
                {capabilities.map((item) => (
                  <article key={item.number}>
                    <span>{item.number}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="testimonial-section"
          aria-labelledby="testimonial-heading"
        >
          <div className="page-shell">
            <p className="eyebrow">Product feedback</p>
            <h2 id="testimonial-heading">
              The best interface is the one&nbsp;
              <em>people trust under pressure.</em>
            </h2>
            <div className="testimonial-grid">
              <blockquote>
                <p>
                  “NeoEHR meets all our clinical needs—outpatient, inpatient,
                  lab and pharmacy. It&apos;s user-friendly, efficient, and our
                  staff adapted quickly.”
                </p>
                <footer>
                  <strong>Tolulope Kolawole</strong>
                  <span>IT &amp; Administrative Manager</span>
                </footer>
              </blockquote>
              <blockquote>
                <p>
                  “We&apos;ve seen faster prescription dispensing and tighter
                  inventory control. It&apos;s improved accuracy and efficiency
                  across the board.”
                </p>
                <footer>
                  <strong>Pharm. Kish Ndungati</strong>
                  <span>Pharmacist</span>
                </footer>
              </blockquote>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="page-shell">
            <div className="section-index">
              <span>05 / Let&apos;s talk</span>
              <span>Full-time roles · contracts · product collaborations</span>
            </div>
            <div className="contact-main">
              <p className="eyebrow">Have a product problem worth solving?</p>
              <h2>
                Let&apos;s build the interface
                <br />
                your product <em>deserves.</em>
              </h2>
              <a
                className="contact-email"
                href="mailto:rasheediskilu.dev@gmail.com"
              >
                rasheediskilu.dev@gmail.com{" "}
                <span className="round-arrow">
                  <Arrow />
                </span>
              </a>
            </div>
            <div className="contact-footer">
              <p>Lagos, Nigeria · Working globally</p>
              <div>
                <a
                  href="https://www.linkedin.com/in/rasheed-dev/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn <Arrow />
                </a>
                <a
                  href="https://github.com/Raashot12"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub <Arrow />
                </a>
                <a href={resumeHref} download>
                  Résumé <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </PortfolioScrollAnimations>

      <footer className="site-footer">
        <a className="wordmark" href="#home">
          RI<span>.</span>
        </a>
        <p>© 2026 Rasheed Iskilu</p>
        <a href="#home">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </>
  );
}
