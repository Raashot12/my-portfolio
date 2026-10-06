"use client";

import { AdaptiveDpr, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import { InterfaceEngineScene } from "./InterfaceEngineScene";
import type { EngineSignals, HeroEngineConfig } from "./engine-types";

type Hero3DCanvasProps = HeroEngineConfig & {
  signals: EngineSignals;
  onReady?: () => void;
};

export default function Hero3DCanvas({
  signals,
  tier,
  reducedMotion,
  active,
  onReady,
}: Hero3DCanvasProps) {
  const readyRef = useRef(false);

  useEffect(() => {
    signals.reducedMotion = reducedMotion;
    signals.active = active;
  }, [active, reducedMotion, signals]);

  const maxDpr = tier === "mobile" ? 1.2 : tier === "tablet" ? 1.4 : 1.65;

  return (
    <Canvas
      aria-hidden="true"
      tabIndex={-1}
      dpr={[1, maxDpr]}
      frameloop={reducedMotion ? "demand" : active ? "always" : "never"}
      camera={{ position: [0, 0, 12], fov: 43, near: 0.1, far: 52 }}
      gl={{
        alpha: true,
        antialias: tier !== "mobile",
        depth: true,
        stencil: false,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false,
      }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.08;
        gl.setClearColor(0x000000, 0);

        if (!readyRef.current) {
          readyRef.current = true;
          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => onReady?.());
          });
        }
      }}
      resize={{ debounce: { resize: 100, scroll: 0 } }}
      fallback={null}
    >
      <InterfaceEngineScene signals={signals} tier={tier} />
      <AdaptiveDpr />
      <Preload all />
    </Canvas>
  );
}
