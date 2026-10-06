import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  SiCss3,
  SiCypress,
  SiExpo,
  SiGit,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiNextdotjs,
  SiReact,
  SiReactquery,
  SiRedux,
  SiTailwindcss,
  SiTestinglibrary,
  SiTypescript,
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
  { name: "Redux Toolkit", icon: SiRedux, color: "#764ABC" },
  { name: "TanStack Query", icon: SiReactquery, color: "#EF4444" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#0891B2" },
  { name: "GraphQL", icon: SiGraphql, color: "#D71C8B" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: SiCss3, color: "#1572B6" },
  { name: "Jest", icon: SiJest, color: "#99425B" },
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
        <p>Production-tested across web and mobile.</p>
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
