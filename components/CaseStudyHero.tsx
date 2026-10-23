"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { CaseStudy } from "@/lib/case-studies";

export default function CaseStudyHero({ study }: { study: CaseStudy }) {
  const reduceMotion = useReducedMotion();
  const projectLink = study.links[0];
  const heroStyle = {
    "--case-study-surface": study.hero.surface,
    "--case-study-ink": study.hero.ink,
    "--case-study-accent": study.hero.accent,
  } as CSSProperties;

  return (
    <motion.section
      className={`case-study-hero case-study-hero--${study.slug}`}
      aria-labelledby="case-study-title"
      style={heroStyle}
      initial={reduceMotion ? false : { opacity: 1, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.56, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="case-study-hero-copy">
        <h1 id="case-study-title">{study.title}</h1>
        <p className="case-study-hero-focus">{study.focus}</p>
        <p className="case-study-hero-description">{study.description}</p>

        <dl className="case-study-hero-meta">
          <div>
            <dt>Role</dt>
            <dd>{study.role}</dd>
          </div>
          <div>
            <dt>Platform</dt>
            <dd>{study.platform}</dd>
          </div>
        </dl>

        <div className="case-study-hero-actions">
          {projectLink ? (
            <a
              className="case-study-action-primary"
              href={projectLink.href}
              target="_blank"
              rel="noreferrer"
            >
              {projectLink.label}
              <ArrowUpRight aria-hidden="true" size={17} />
            </a>
          ) : null}
          <a className="case-study-action-secondary" href="#case-study-details">
            Read the case study
            <ArrowDown aria-hidden="true" size={16} />
          </a>
        </div>
      </div>

      <motion.a
        className="case-study-preview"
        href={projectLink?.href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${study.title} in a new tab`}
        whileHover={reduceMotion ? undefined : { y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="case-study-preview-media">
          <Image
            src={study.hero.image}
            alt={study.hero.imageAlt}
            fill
            priority
            sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 620px"
          />
        </div>
        <div className="case-study-preview-caption">
          <span>{study.hero.caption}</span>
          <span className="case-study-preview-link">
            Open project <ArrowUpRight aria-hidden="true" size={15} />
          </span>
        </div>
      </motion.a>
    </motion.section>
  );
}
