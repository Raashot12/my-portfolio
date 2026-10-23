import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { FaDatabase, FaNetworkWired } from "react-icons/fa";
import {
  SiCypress,
  SiDocker,
  SiExpo,
  SiGit,
  SiGraphql,
  SiJavascript,
  SiJest,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiReactquery,
  SiRedux,
  SiSwagger,
  SiTailwindcss,
  SiTestinglibrary,
  SiTypescript,
  SiVite,
  SiVitest,
  SiZod,
} from "react-icons/si";

type Technology = {
  name: string;
  icon: IconType;
  color: string;
};

const technologies: Technology[] = [
  { name: "React", icon: SiReact, color: "#087EA4" },
  { name: "Next.js", icon: SiNextdotjs, color: "#141416" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#C99A00" },
  { name: "React Native", icon: SiReact, color: "#087EA4" },
  { name: "Expo", icon: SiExpo, color: "#000020" },
  { name: "Vite", icon: SiVite, color: "#646CFF" },
  { name: "Redux Toolkit + RTK Query", icon: SiRedux, color: "#764ABC" },
  { name: "TanStack Query", icon: SiReactquery, color: "#EF4444" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#0891B2" },
  { name: "GraphQL", icon: SiGraphql, color: "#D71C8B" },
  { name: "Node.js", icon: SiNodedotjs, color: "#539E43" },
  { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
  { name: "TypeORM", icon: FaDatabase, color: "#E06B3C" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "REST APIs", icon: FaNetworkWired, color: "#3155DF" },
  { name: "OpenAPI / Swagger", icon: SiSwagger, color: "#85EA2D" },
  { name: "Zod", icon: SiZod, color: "#3E67B1" },
  { name: "Jest", icon: SiJest, color: "#99425B" },
  { name: "Vitest", icon: SiVitest, color: "#6E9F18" },
  { name: "Testing Library", icon: SiTestinglibrary, color: "#E33332" },
  { name: "Cypress", icon: SiCypress, color: "#147D64" },
  { name: "Git", icon: SiGit, color: "#F05032" },
];

function TechnologyGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className="tech-stack-group" aria-hidden={duplicate ? "true" : undefined}>
      {technologies.map(({ name, icon: Icon, color }) => (
        <li className="tech-stack-item" key={name} style={{ "--technology-color": color } as CSSProperties}>
          <Icon className="tech-stack-icon" aria-hidden="true" focusable="false" />
          <span>{name}</span>
        </li>
      ))}
    </ul>
  );
}

export default function TechStackMarquee() {
  return (
    <section className="tech-marquee" aria-labelledby="technology-stack-heading">
      <div className="page-shell tech-marquee-heading">
        <h2 id="technology-stack-heading">Technologies I ship with</h2>
        <p>Frontend depth, API integration, and database-backed delivery.</p>
      </div>
      <div className="tech-marquee-window">
        <div className="tech-marquee-track">
          <TechnologyGroup />
          <TechnologyGroup duplicate />
        </div>
      </div>
    </section>
  );
}
