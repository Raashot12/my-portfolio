import * as THREE from "three";

export type EngineTier = "desktop" | "tablet" | "mobile";

export type EngineSignals = {
  pointer: THREE.Vector2;
  pointerWorld: THREE.Vector3;
  clickOriginWorld: THREE.Vector3;
  pointerInside: boolean;
  pointerSpeed: number;
  pointerImpulse: number;
  renderWave: number;
  renderEnergy: number;
  reveal: number;
  dashboardHover: number;
  hoverPulse: number;
  clickWave: number;
  clickEnergy: number;
  scroll: number;
  reducedMotion: boolean;
  active: boolean;
};

export type HeroEngineConfig = {
  tier: EngineTier;
  reducedMotion: boolean;
  active: boolean;
};

export function createEngineSignals(): EngineSignals {
  return {
    pointer: new THREE.Vector2(),
    pointerWorld: new THREE.Vector3(100, 100, 0),
    clickOriginWorld: new THREE.Vector3(100, 100, 0),
    pointerInside: false,
    pointerSpeed: 0,
    pointerImpulse: 0,
    renderWave: 0,
    renderEnergy: 0,
    reveal: 0,
    dashboardHover: 0,
    hoverPulse: 0,
    clickWave: 0,
    clickEnergy: 0,
    scroll: 0,
    reducedMotion: false,
    active: true,
  };
}
