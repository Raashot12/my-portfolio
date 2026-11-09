"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { Suspense } from "react";

const PortfolioPage = dynamic(() => import("./PortfolioPage"), {
  ssr: true,
  loading: () => null,
});

const ENGINE_FAIL_OPEN_MS = 5200;

export default function PortfolioBootLoader() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isReady, setIsReady] = useState(false);

  const startAmbientSound = useCallback((): Promise<boolean> => {
    const audio = audioRef.current;
    if (!audio) return Promise.resolve(false);
    if (!audio.paused) return Promise.resolve(true);
    audio.volume = 0.24;
    return audio.play().then(() => true).catch(() => false);
  }, []);

  const handleEngineReady = useCallback(() => setIsReady(true), []);

  useEffect(() => {
    const timer = window.setTimeout(handleEngineReady, ENGINE_FAIL_OPEN_MS);
    return () => window.clearTimeout(timer);
  }, [handleEngineReady]);

  useEffect(() => {
    if (!isReady) return;
    const eventTypes = ["scroll", "wheel", "touchstart", "pointerdown"];
    const handleInteraction = () => {
      void startAmbientSound().then((started) => {
        if (started) cleanup();
      });
    };
    const cleanup = () => eventTypes.forEach((type) => window.removeEventListener(type, handleInteraction));
    eventTypes.forEach((type) => window.addEventListener(type, handleInteraction, { passive: true }));
    void startAmbientSound().then((started) => { if (started) cleanup(); });
    return cleanup;
  }, [isReady, startAmbientSound]);

  useEffect(() => {
    const audio = audioRef.current;
    return () => { audio?.pause(); if (audio) audio.currentTime = 0; };
  }, []);

  return (
    <div className={`portfolio-boot-shell${isReady ? " is-ready" : ""}`}>
      <audio ref={audioRef} src="/news-news-ambient-upbeat.mp3" preload="none" loop aria-hidden="true" />
      <div
        className="portfolio-boot-loader"
        role="status"
        aria-live="polite"
        aria-hidden={isReady}
      >
        <span className="portfolio-boot-loader-dot" aria-hidden="true" />
        <span className="portfolio-boot-loader-label">Loading visual effects</span>
      </div>
      <div className="portfolio-boot-app">
        <Suspense fallback={null}>
          <PortfolioPage onEngineReady={handleEngineReady} />
        </Suspense>
      </div>
    </div>
  );
}
