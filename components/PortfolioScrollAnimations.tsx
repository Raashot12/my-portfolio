"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type PortfolioScrollAnimationsProps = {
  children: ReactNode;
};

export default function PortfolioScrollAnimations({
  children,
}: PortfolioScrollAnimationsProps) {
  const scopeRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scopeRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const getAll = (selector: string) =>
          gsap.utils.toArray<HTMLElement>(selector, root);

        const hero = root.querySelector<HTMLElement>(".hero");
        const heroStage = root.querySelector<HTMLElement>(".hero-stage");
        const heroOrbits = getAll(".hero-orbit");

        if (hero && heroStage) {
          gsap.to(heroStage, {
            yPercent: -7,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }

        if (hero && heroOrbits.length) {
          gsap.to(heroOrbits, {
            y: 120,
            rotation: 18,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        getAll(
          [
            ".section-index",
            ".about-layout h2",
            ".about-copy",
            ".section-heading-row h2",
            ".section-heading-row > p",
            ".more-work-heading",
            ".experience-intro",
            ".capabilities-title",
            ".testimonial-section > .page-shell > .eyebrow",
            ".testimonial-section h2",
            ".contact-main",
            ".contact-email",
            ".contact-footer",
          ].join(", "),
        ).forEach((element, index) => {
          gsap.from(element, {
            autoAlpha: 0,
            y: 34,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
              refreshPriority: index,
            },
          });
        });

        const cardTargets = getAll(
          [
            ".proof-grid article",
            ".more-work-list > a",
            ".timeline article",
            ".capability-list article",
            ".testimonial-grid blockquote",
          ].join(", "),
        );

        if (cardTargets.length) {
          gsap.set(cardTargets, { autoAlpha: 0, y: 38, scale: 0.985 });

          ScrollTrigger.batch(cardTargets, {
            start: "top 86%",
            end: "bottom 12%",
            interval: 0.08,
            batchMax: 4,
            onEnter: (batch) => {
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.72,
                ease: "power3.out",
                stagger: 0.08,
                overwrite: true,
              });
            },
            onEnterBack: (batch) => {
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: "power2.out",
                stagger: 0.04,
                overwrite: true,
              });
            },
            onLeaveBack: (batch) => {
              gsap.to(batch, {
                autoAlpha: 0,
                y: 32,
                scale: 0.985,
                duration: 0.35,
                ease: "power2.out",
                overwrite: true,
              });
            },
          });
        }

        getAll(".project-card").forEach((card) => {
          const visual = card.querySelector<HTMLElement>(".project-visual");
          const copy = card.querySelector<HTMLElement>(".project-copy");
          const details = gsap.utils.toArray<HTMLElement>(
            ".project-highlights li, .stack-list span, .project-links a",
            card,
          );

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 76%",
              end: "bottom 24%",
              toggleActions: "play none none reverse",
            },
          });

          if (visual) {
            timeline.from(visual, {
              autoAlpha: 0,
              x: -44,
              scale: 0.985,
              duration: 0.88,
              ease: "power3.out",
            });
          }

          if (copy) {
            timeline.from(
              copy,
              {
                autoAlpha: 0,
                x: 38,
                duration: 0.74,
                ease: "power3.out",
              },
              visual ? "-=0.62" : 0,
            );
          }

          if (details.length) {
            timeline.from(
              details,
              {
                autoAlpha: 0,
                y: 16,
                duration: 0.42,
                ease: "power2.out",
                stagger: 0.04,
              },
              "-=0.34",
            );
          }
        });

        let isActive = true;
        const refresh = () => {
          if (isActive) ScrollTrigger.refresh();
        };

        window.addEventListener("load", refresh);
        document.fonts?.ready.then(refresh).catch(() => undefined);

        return () => {
          isActive = false;
          window.removeEventListener("load", refresh);
        };
      });

      return () => mm.revert();
    },
    { scope: scopeRef },
  );

  return (
    <main id="main-content" ref={scopeRef}>
      {children}
    </main>
  );
}
