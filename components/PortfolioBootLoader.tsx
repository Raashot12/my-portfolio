"use client";

import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";

import PortfolioPage from "./PortfolioPage";

const ENGINE_FAIL_OPEN_MS = 5200;

export default function PortfolioBootLoader() {
  const shellRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const readyRef = useRef(false);
  const [isReady, setIsReady] = useState(false);

  const startAmbientSound = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.paused) return;

    audio.volume = 0.24;
    void audio.play().catch(() => undefined);
  }, []);

  const handleEngineReady = useCallback(() => {
    if (readyRef.current) return;
    readyRef.current = true;
    setIsReady(true);
    startAmbientSound();
  }, [startAmbientSound]);

  useEffect(() => {
    if (!isReady) return;

    const handleFirstScroll = () => startAmbientSound();
    window.addEventListener("scroll", handleFirstScroll, {
      passive: true,
      once: true,
    });

    return () => window.removeEventListener("scroll", handleFirstScroll);
  }, [isReady, startAmbientSound]);

  useEffect(() => {
    const audio = audioRef.current;

    return () => {
      audio?.pause();
      if (audio) audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    const failOpenTimer = window.setTimeout(
      handleEngineReady,
      ENGINE_FAIL_OPEN_MS,
    );

    return () => window.clearTimeout(failOpenTimer);
  }, [handleEngineReady]);

  useEffect(() => {
    const root = shellRef.current;
    if (!root || isReady) return;

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [isReady]);

  useEffect(() => {
    if (!isReady) return;

    const loader = loaderRef.current;
    const app = appRef.current;
    if (!loader || !app) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const context = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(loader, { autoAlpha: 0 });
        gsap.set(app, { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(loader, {
          autoAlpha: 0,
          duration: 0.7,
          delay: 0.08,
        })
        .fromTo(
          app,
          { autoAlpha: 0, y: 14 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            clearProps: "transform",
          },
          0.2,
        );
    }, shellRef.current || undefined);

    return () => context.revert();
  }, [isReady]);

  return (
    <div
      ref={shellRef}
      className={`portfolio-boot-shell ${isReady ? "is-ready" : "is-loading"}`}
      aria-busy={!isReady}
    >
      <audio
        ref={audioRef}
        src="/news-news-ambient-upbeat.mp3"
        preload="auto"
        loop
        aria-hidden="true"
      />

      <div
        ref={appRef}
        className="portfolio-boot-app"
        aria-hidden={!isReady}
      >
        <PortfolioPage onEngineReady={handleEngineReady} />
      </div>

      <div
        ref={loaderRef}
        className="portfolio-boot-loader"
        role="status"
        aria-live="polite"
      >
        <div className="portfolio-boot-loader-content">
          <div className="portfolio-boot-loader-kicker">
            <span className="portfolio-boot-loader-dot" />
            <span>Rasheed Iskilu / Portfolio</span>
          </div>
          <p className="portfolio-boot-loader-title">Waking the workspace</p>
          <p className="portfolio-boot-loader-copy">
            Preparing the interface engine for your visit.
          </p>
          <div className="portfolio-boot-loader-track" aria-hidden="true">
            <span />
          </div>
          <div className="portfolio-boot-loader-meta">
            <span>WebGL / procedural scene</span>
            <span>Initializing</span>
          </div>
        </div>
      </div>

    </div>
  );
}
