"use client";

import dynamic from "next/dynamic";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  createEngineSignals,
  type EngineTier,
  type HeroEngineConfig,
} from "./engine-types";

const Hero3DCanvas = dynamic(() => import("./Hero3DCanvas"), {
  ssr: false,
  loading: () => null,
});

const interactiveSelector =
  "a, button, nav, summary, input, textarea, select, [role='button'], .hero-stage, .hero-copy, .hero-proof";

function readConfig(): Omit<HeroEngineConfig, "active"> {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const width = window.innerWidth;
  const tier: EngineTier =
    width <= 700 ? "mobile" : width <= 1100 ? "tablet" : "desktop";

  return { tier, reducedMotion };
}

export default function Hero3DBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const signals = useMemo(createEngineSignals, []);
  const [config, setConfig] = useState<HeroEngineConfig>({
    tier: "desktop",
    reducedMotion: false,
    active: true,
  });

  useEffect(() => {
    const root = rootRef.current;
    const hero = root?.closest<HTMLElement>(".hero");
    if (!root || !hero) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarseQuery = window.matchMedia("(pointer: coarse)");
    let inView = true;
    let pageVisible = !document.hidden;
    let resizeFrame = 0;
    let pointerFrame = 0;
    let scrollFrame = 0;
    let previousX = window.innerWidth * 0.5;
    let previousY = window.innerHeight * 0.5;
    let previousTime = performance.now();
    let lastImpulseTime = 0;

    const browser = hero.querySelector<HTMLElement>(".hero-browser");
    const stage = hero.querySelector<HTMLElement>(".hero-stage");
    const gsapContext = gsap.context(() => {
      if (browser) {
        gsap.set(browser, {
          transformPerspective: 1400,
          transformOrigin: "50% 56%",
          rotationZ: 1.8,
          force3D: true,
        });
      }
    }, hero);

    const rotateXTo = browser
      ? gsap.quickTo(browser, "rotationX", {
          duration: 0.72,
          ease: "power3.out",
        })
      : null;
    const rotateYTo = browser
      ? gsap.quickTo(browser, "rotationY", {
          duration: 0.72,
          ease: "power3.out",
        })
      : null;
    const rotateZTo = browser
      ? gsap.quickTo(browser, "rotationZ", {
          duration: 0.72,
          ease: "power3.out",
        })
      : null;
    const liftTo = browser
      ? gsap.quickTo(browser, "y", {
          duration: 0.72,
          ease: "power3.out",
        })
      : null;

    const applyRuntimeConfig = () => {
      const next = readConfig();
      const active = inView && pageVisible;
      signals.reducedMotion = next.reducedMotion;
      signals.active = active;
      setConfig({ ...next, active });

      if (next.reducedMotion || coarseQuery.matches) {
        signals.pointerInside = false;
        signals.pointer.set(0, 0);
        signals.pointerWorld.set(100, 100, 0);
        signals.dashboardHover = 0;
        rotateXTo?.(0);
        rotateYTo?.(0);
        rotateZTo?.(1.8);
        liftTo?.(0);
      }
    };

    const updateScroll = () => {
      const rect = hero.getBoundingClientRect();
      const distance = Math.max(1, rect.height);
      signals.scroll = Math.min(1, Math.max(0, -rect.top / distance));
      scrollFrame = 0;
    };

    const handleScroll = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScroll);
    };

    const handleResize = () => {
      if (resizeFrame) return;
      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = 0;
        applyRuntimeConfig();
        updateScroll();
      });
    };

    const handleVisibility = () => {
      pageVisible = !document.hidden;
      applyRuntimeConfig();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (motionQuery.matches || coarseQuery.matches) return;
      const rect = hero.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      signals.pointerInside = inside;
      if (!inside) return;

      const now = performance.now();
      const elapsed = Math.max(16, now - previousTime);
      const travel = Math.hypot(
        event.clientX - previousX,
        event.clientY - previousY,
      );
      const speed = travel / elapsed;
      previousX = event.clientX;
      previousY = event.clientY;
      previousTime = now;

      signals.pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1,
      );
      signals.pointerSpeed = Math.min(2.5, speed);

      if (speed > 1.08 && now - lastImpulseTime > 900) {
        lastImpulseTime = now;
        signals.pointerImpulse = 1;
        gsap.to(signals, {
          pointerImpulse: 0,
          duration: 1.25,
          ease: "power3.out",
          overwrite: "auto",
        });
      }

      if (!pointerFrame) {
        pointerFrame = window.requestAnimationFrame(() => {
          pointerFrame = 0;
          if (!browser || !stage) return;

          const dashboardRect = browser.getBoundingClientRect();
          const nearDashboard =
            event.clientX >= dashboardRect.left - 48 &&
            event.clientX <= dashboardRect.right + 48 &&
            event.clientY >= dashboardRect.top - 48 &&
            event.clientY <= dashboardRect.bottom + 48;

          if (nearDashboard && signals.dashboardHover < 0.5) {
            signals.hoverPulse = 1;
            gsap.to(signals, {
              hoverPulse: 0,
              duration: 1.4,
              ease: "power3.out",
              overwrite: "auto",
            });
          }

          gsap.to(signals, {
            dashboardHover: nearDashboard ? 1 : 0,
            duration: nearDashboard ? 0.42 : 0.72,
            ease: "power3.out",
            overwrite: "auto",
          });
          hero.dataset.engineDashboardHover = nearDashboard ? "true" : "false";

          const localX =
            ((event.clientX - dashboardRect.left) / dashboardRect.width) * 2 - 1;
          const localY =
            ((event.clientY - dashboardRect.top) / dashboardRect.height) * 2 - 1;

          rotateXTo?.(inside ? Math.max(-1.5, Math.min(1.5, -localY * 1.5)) : 0);
          rotateYTo?.(inside ? Math.max(-2, Math.min(2, localX * 2)) : 0);
          rotateZTo?.(nearDashboard ? 0.9 : 1.8);
          liftTo?.(nearDashboard ? -4 : 0);
        });
      }
    };

    const handlePointerLeave = () => {
      signals.pointerInside = false;
      signals.pointer.set(0, 0);
      signals.pointerWorld.set(100, 100, 0);
      gsap.to(signals, {
        dashboardHover: 0,
        duration: 0.72,
        ease: "power3.out",
        overwrite: "auto",
      });
      delete hero.dataset.engineDashboardHover;
      rotateXTo?.(0);
      rotateYTo?.(0);
      rotateZTo?.(1.8);
      liftTo?.(0);
    };

    const handleBackgroundClick = (event: MouseEvent) => {
      if (
        motionQuery.matches ||
        coarseQuery.matches ||
        !hero.contains(event.target as Node) ||
        (event.target as Element).closest?.(interactiveSelector)
      ) {
        return;
      }

      signals.clickOriginWorld.copy(signals.pointerWorld);
      signals.clickWave = 0;
      signals.clickEnergy = 1;
      gsap.killTweensOf(signals, "clickWave,clickEnergy");
      gsap.timeline().to(signals, {
        clickWave: 1,
        clickEnergy: 0,
        duration: 1.35,
        ease: "power2.out",
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        applyRuntimeConfig();
      },
      { rootMargin: "180px 0px", threshold: 0.01 },
    );
    observer.observe(hero);

    const entrance = gsap.timeline();
    if (motionQuery.matches) {
      signals.reveal = 1;
    } else {
      entrance.to(signals, {
        reveal: 1,
        duration: 1.9,
        delay: 0.28,
        ease: "power3.out",
      });
    }

    let renderTimer = 0;
    let renderTimeline: gsap.core.Timeline | null = null;
    const runRenderWave = () => {
      if (!signals.reducedMotion && signals.active) {
        renderTimeline = gsap
          .timeline({
            onComplete: () => {
              signals.renderWave = 0;
              scheduleRenderWave();
            },
          })
          .set(signals, { renderWave: 0, renderEnergy: 0.12 })
          .to(signals, {
            renderEnergy: 1,
            duration: 0.48,
            ease: "power2.out",
          })
          .to(
            signals,
            {
              renderWave: 1,
              duration: 2.4,
              ease: "sine.inOut",
            },
            0.12,
          )
          .to(
            signals,
            {
              renderEnergy: 0,
              duration: 1.15,
              ease: "power2.in",
            },
            1.58,
          );
      } else if (!signals.reducedMotion) {
        scheduleRenderWave();
      }
    };
    const scheduleRenderWave = (first = false) => {
      window.clearTimeout(renderTimer);
      const delay = first ? 1650 : 8000 + Math.random() * 6000;
      renderTimer = window.setTimeout(runRenderWave, delay);
    };
    if (!motionQuery.matches) scheduleRenderWave(true);

    const handleMotionPreferenceChange = () => {
      applyRuntimeConfig();
      if (motionQuery.matches) {
        entrance.kill();
        renderTimeline?.kill();
        window.clearTimeout(renderTimer);
        gsap.killTweensOf(signals);
        signals.reveal = 1;
        signals.renderWave = 0;
        signals.renderEnergy = 0;
        signals.pointerImpulse = 0;
        signals.hoverPulse = 0;
        signals.clickEnergy = 0;
      } else {
        signals.reveal = 1;
        scheduleRenderWave(true);
      }
    };

    applyRuntimeConfig();
    updateScroll();
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("click", handleBackgroundClick);
    document.addEventListener("visibilitychange", handleVisibility);
    motionQuery.addEventListener("change", handleMotionPreferenceChange);
    coarseQuery.addEventListener("change", applyRuntimeConfig);

    return () => {
      observer.disconnect();
      entrance.kill();
      renderTimeline?.kill();
      window.clearTimeout(renderTimer);
      window.cancelAnimationFrame(resizeFrame);
      window.cancelAnimationFrame(pointerFrame);
      window.cancelAnimationFrame(scrollFrame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("click", handleBackgroundClick);
      document.removeEventListener("visibilitychange", handleVisibility);
      motionQuery.removeEventListener("change", handleMotionPreferenceChange);
      coarseQuery.removeEventListener("change", applyRuntimeConfig);
      gsap.killTweensOf(signals);
      if (browser) gsap.set(browser, { clearProps: "transform" });
      delete hero.dataset.engineDashboardHover;
      gsapContext.revert();
    };
  }, [signals]);

  return (
    <div className="hero-engine" ref={rootRef} aria-hidden="true">
      <div className="hero-engine-canvas">
        <Hero3DCanvas signals={signals} {...config} />
      </div>
      <div className="hero-engine-legibility" />
    </div>
  );
}
