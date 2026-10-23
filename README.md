# Rasheed Iskilu — Developer Portfolio

The portfolio of **Rasheed Iskilu**, a full-stack developer with a frontend focus. I build clear, responsive product experiences and work across the systems behind them, from React interfaces to APIs and persistent data.

My background includes healthcare software, mobile workflows, event platforms, and operational tools. The case studies show the product context, my role, technical decisions, and the parts I shipped.

**Portfolio:** [rashdevsolution.vercel.app](https://rashdevsolution.vercel.app/) · **LinkedIn:** [rasheed-dev](https://www.linkedin.com/in/rasheed-dev/) · **GitHub:** [Raashot12](https://github.com/Raashot12)

## Selected case studies

- **[LIV DOT — event operations and ticketing](https://livdot-lemon.vercel.app/)** — Frontend-led full-stack work across host operations, event discovery, ticket selection, and checkout. Built with Next.js, TypeScript, NestJS, and PostgreSQL. [Source](https://github.com/Raashot12/Livdot)
- **[User Management Platform](https://user-management-platform-jade.vercel.app/)** — A React client connected to a NestJS API, with transaction-safe PostgreSQL persistence and documented REST endpoints. [API docs](https://user-management-platform-t3dj.onrender.com/api/docs#/users/UsersController_findAll) · [Source](https://github.com/Raashot12/user-management-platform)
- **[Plural Health](https://plural.health/)** — Frontend engineering for healthcare, EHR, and pharmacy workflows across web and mobile products.
- **[Betpikr](https://dev-frontend.betpikr.app/en)** — Responsive customer and operations interfaces for sports and gaming products.
- **Mobile healthcare and inventory** — React Native workflows for patient access, clinical operations, and inventory management.

Visit the portfolio’s [work section](https://rashdevsolution.vercel.app/#projects) for the full case studies and project details.

## Technologies

### Product development

React · Next.js · TypeScript · React Native · Node.js · NestJS · REST APIs · PostgreSQL · Redux Toolkit · TanStack Query

### Portfolio site

Next.js 14 · React 18 · TypeScript · Tailwind CSS · Framer Motion · GSAP · Three.js · Sentry

## Run locally

### Requirements

- Node.js 22 or newer
- npm 10 or newer

```bash
npm install
```

Create a `.env.local` file from `.env.example` and set the public URL used for metadata, canonical links, and the sitemap:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run lint` | Run Next.js linting |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build locally |
| `npm run deploy` | Deploy to Vercel production |

Set `NEXT_PUBLIC_SITE_URL` to the deployed portfolio’s public origin before creating a production build or deploying.

## Project structure

```text
app/                  Next.js routes, metadata, and global styles
components/           Portfolio sections and reusable UI
data/                 Portfolio projects, experience, and testimonials
lib/case-studies.ts   Case-study content and project details
public/                Images, icons, and other static assets
```

## Contact

For product, frontend, or full-stack opportunities, connect on [LinkedIn](https://www.linkedin.com/in/rasheed-dev/) or explore my work on [GitHub](https://github.com/Raashot12).
