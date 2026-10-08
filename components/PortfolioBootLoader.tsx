"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PortfolioPage from "./PortfolioPage";

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
    <>
      <audio ref={audioRef} src="/news-news-ambient-upbeat.mp3" preload="none" loop aria-hidden="true" />
      <PortfolioPage onEngineReady={handleEngineReady} />
    </>
  );
}
