"use client";

import { useFrame, useThree } from "@react-three/fiber";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import * as THREE from "three";

import type { EngineSignals, EngineTier } from "./engine-types";

const BLUE = new THREE.Color("#8eb7ff");
const WHITE = new THREE.Color("#fffdf7");
const LIME = new THREE.Color("#d9ff66");
const CYAN = new THREE.Color("#a8e8ff");
const Z_PLANE = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

type SceneProps = {
  signals: EngineSignals;
  tier: EngineTier;
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothRange(start: number, end: number, value: number) {
  const normalized = clamp01((value - start) / Math.max(0.0001, end - start));
  return normalized * normalized * (3 - 2 * normalized);
}

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function CameraRig({ signals }: { signals: EngineSignals }) {
  const { camera, invalidate } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const lookTarget = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    invalidate();
  }, [invalidate, signals.active, signals.reducedMotion]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const still = signals.reducedMotion;
    const targetX = still ? 0 : signals.pointer.x * 0.2;
    const targetY = still ? 0 : signals.pointer.y * 0.13 - signals.scroll * 0.12;
    const targetZ = 12 + signals.scroll * 1.25;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 3.2, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 3.2, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 3, dt);
    lookTarget.set(0, -signals.scroll * 0.18, 0);
    camera.lookAt(lookTarget);

    if (!still && signals.pointerInside) {
      raycaster.setFromCamera(signals.pointer, camera);
      raycaster.ray.intersectPlane(Z_PLANE, signals.pointerWorld);
    } else if (!signals.pointerInside) {
      signals.pointerWorld.set(100, 100, 0);
    }

    if (!still) {
      signals.pointerSpeed = THREE.MathUtils.damp(
        signals.pointerSpeed,
        0,
        4.2,
        dt,
      );
    }

    state.gl.toneMappingExposure = THREE.MathUtils.damp(
      state.gl.toneMappingExposure,
      1.08 + signals.renderEnergy * 0.035,
      2.2,
      dt,
    );
  });

  return null;
}

function SceneLighting({ signals }: { signals: EngineSignals }) {
  const blueLight = useRef<THREE.PointLight>(null);
  const limeLight = useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    if (!blueLight.current || !limeLight.current) return;
    const dt = Math.min(delta, 0.05);
    blueLight.current.intensity = THREE.MathUtils.damp(
      blueLight.current.intensity,
      8.5 + signals.renderEnergy * 4 + signals.dashboardHover * 1.5,
      2.8,
      dt,
    );
    limeLight.current.intensity = THREE.MathUtils.damp(
      limeLight.current.intensity,
      1.1 + signals.renderEnergy * 1.8 + signals.hoverPulse * 1.4,
      3,
      dt,
    );
  });

  return (
    <>
      <hemisphereLight args={["#b9d8ff", "#10154f", 0.72]} />
      <ambientLight color="#5277ea" intensity={0.42} />
      <directionalLight color="#dce9ff" intensity={1.1} position={[4, 6, 8]} />
      <pointLight
        ref={blueLight}
        color="#6fa8ff"
        intensity={8.5}
        distance={12}
        decay={2}
        position={[3.4, 1.2, 3.5]}
      />
      <pointLight
        ref={limeLight}
        color="#d9ff66"
        intensity={1.1}
        distance={7}
        decay={2}
        position={[5.2, -1.4, 2.2]}
      />
      <rectAreaLight
        color="#d7e8ff"
        intensity={2.2}
        width={4}
        height={2.4}
        position={[4, 2.2, 4]}
        rotation={[-0.3, 0.35, 0]}
      />
    </>
  );
}

function createArcGeometry(
  radius: number,
  start: number,
  end: number,
  tube: number,
  depth = 0,
) {
  const points: THREE.Vector3[] = [];
  const segments = 72;
  for (let index = 0; index <= segments; index += 1) {
    const progress = index / segments;
    const angle = THREE.MathUtils.lerp(start, end, progress);
    points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        Math.sin(progress * Math.PI) * depth,
      ),
    );
  }
  return new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(points),
    96,
    tube,
    6,
    false,
  );
}

type ArcProps = {
  signals: EngineSignals;
  radius: number;
  start: number;
  end: number;
  tube: number;
  rotation: [number, number, number];
  speed: number;
  color: string;
  opacity: number;
  revealStart: number;
  depth?: number;
};

function LuminousArc({
  signals,
  radius,
  start,
  end,
  tube,
  rotation,
  speed,
  color,
  opacity,
  revealStart,
  depth,
}: ArcProps) {
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.MeshBasicMaterial>(null);
  const geometry = useMemo(
    () => createArcGeometry(radius, start, end, tube, depth),
    [depth, end, radius, start, tube],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    if (!group.current || !material.current) return;
    if (!signals.reducedMotion) {
      group.current.rotation.z += delta * speed;
    }
    const reveal = smoothRange(revealStart, revealStart + 0.36, signals.reveal);
    material.current.opacity =
      opacity * reveal *
      (1 + signals.renderEnergy * 0.45 + signals.dashboardHover * 0.16);
  });

  return (
    <group ref={group} rotation={rotation}>
      <mesh geometry={geometry}>
        <meshBasicMaterial
          ref={material}
          color={color}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function GlassArc({ signals, tier }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.MeshPhysicalMaterial>(null);
  const geometry = useMemo(
    () =>
      createArcGeometry(
        tier === "mobile" ? 2.45 : 3.7,
        -0.25,
        Math.PI * 1.22,
        tier === "mobile" ? 0.045 : 0.065,
        0.22,
      ),
    [tier],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    if (!group.current || !material.current) return;
    if (!signals.reducedMotion) group.current.rotation.z -= delta * 0.012;
    material.current.opacity =
      0.2 * smoothRange(0.18, 0.62, signals.reveal) *
      (1 + signals.renderEnergy * 0.35 + signals.dashboardHover * 0.16);
  });

  return (
    <group ref={group} rotation={[0.94, -0.24, 0.42]}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          ref={material}
          color="#a8c7ff"
          emissive="#1b3d9f"
          emissiveIntensity={0.25}
          transparent
          opacity={0}
          transmission={0.62}
          roughness={0.16}
          metalness={0.08}
          thickness={0.7}
          ior={1.22}
          clearcoat={0.55}
          clearcoatRoughness={0.24}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function SegmentedTrack({ signals, tier }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.InstancedMesh>(null);
  const count = tier === "desktop" ? 34 : tier === "tablet" ? 24 : 14;
  const radius = tier === "mobile" ? 2.05 : 3.08;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useLayoutEffect(() => {
    if (!mesh.current) return;
    for (let index = 0; index < count; index += 1) {
      const angle = 0.22 + (index / Math.max(1, count - 1)) * Math.PI * 1.68;
      const gap = index % 7 === 0 ? 0.45 : 1;
      dummy.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
      dummy.rotation.set(0, 0, angle + Math.PI / 2);
      dummy.scale.set(gap, 1, 1);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(index, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [count, dummy, radius]);

  useFrame((_, delta) => {
    if (!group.current) return;
    if (!signals.reducedMotion) group.current.rotation.z += delta * 0.0075;
    group.current.scale.setScalar(smoothRange(0.2, 0.65, signals.reveal));
  });

  return (
    <group ref={group} rotation={[-0.56, 0.5, -0.34]}>
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <boxGeometry args={[0.24, 0.028, 0.034]} />
        <meshStandardMaterial
          color="#b8cdfa"
          emissive="#244ec3"
          emissiveIntensity={0.28}
          roughness={0.28}
          metalness={0.72}
          transparent
          opacity={0.72}
        />
      </instancedMesh>
    </group>
  );
}

function OrbitalRings({ signals, tier }: SceneProps) {
  const desktopOnly = tier !== "mobile";

  return (
    <group>
      <GlassArc signals={signals} tier={tier} />
      <LuminousArc
        signals={signals}
        radius={tier === "mobile" ? 2.25 : 3.42}
        start={0.28}
        end={Math.PI * 1.52}
        tube={0.018}
        rotation={[0.18, 0.72, -0.22]}
        speed={0.018}
        color="#bcd4ff"
        opacity={0.45}
        revealStart={0.18}
        depth={0.08}
      />
      {desktopOnly && (
        <>
          <LuminousArc
            signals={signals}
            radius={4.35}
            start={-0.52}
            end={Math.PI * 1.16}
            tube={0.012}
            rotation={[1.18, -0.18, 0.55]}
            speed={-0.009}
            color="#729cff"
            opacity={0.28}
            revealStart={0.28}
            depth={0.14}
          />
          <LuminousArc
            signals={signals}
            radius={2.55}
            start={0.9}
            end={Math.PI * 2.05}
            tube={0.022}
            rotation={[-0.72, 0.16, -0.52]}
            speed={0.013}
            color="#d9ff66"
            opacity={0.18}
            revealStart={0.38}
            depth={0.1}
          />
          <LuminousArc
            signals={signals}
            radius={5.2}
            start={-0.18}
            end={Math.PI * 0.78}
            tube={0.008}
            rotation={[0.52, -0.75, 0.18]}
            speed={-0.005}
            color="#dce9ff"
            opacity={0.22}
            revealStart={0.26}
            depth={0.2}
          />
        </>
      )}
      <SegmentedTrack signals={signals} tier={tier} />
    </group>
  );
}

type NodeSeed = {
  base: THREE.Vector3;
  floatPhase: number;
  importance: number;
};

type ConnectionSeed = {
  from: number;
  to: number;
  lift: number;
};

function ArchitectureNetwork({ signals, tier }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const nodesMesh = useRef<THREE.InstancedMesh>(null);
  const nodesMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const linesMaterial = useRef<THREE.LineBasicMaterial>(null);
  const count = tier === "desktop" ? 42 : tier === "tablet" ? 28 : 16;
  const curveSegments = 9;
  const data = useMemo(() => {
    const random = seededRandom(8024 + count);
    const nodes: NodeSeed[] = [];
    for (let index = 0; index < count; index += 1) {
      const progress = index / Math.max(1, count - 1);
      const angle = progress * Math.PI * 4.25 + random() * 0.55;
      const radius = 0.75 + progress * 2.7 + random() * 0.42;
      nodes.push({
        base: new THREE.Vector3(
          Math.cos(angle) * radius * 1.12 + 0.42,
          Math.sin(angle) * radius * 0.69,
          (random() - 0.5) * 2.5 - progress * 0.35,
        ),
        floatPhase: random() * Math.PI * 2,
        importance: random(),
      });
    }

    const connections: ConnectionSeed[] = [];
    const connectionCount = Math.floor(count * 0.92);
    for (let index = 0; index < connectionCount; index += 1) {
      const jump = 1 + Math.floor(random() * Math.min(5, count - 1));
      connections.push({
        from: index % count,
        to: (index + jump) % count,
        lift: (random() - 0.5) * 0.9,
      });
    }
    return { nodes, connections };
  }, [count]);
  const current = useMemo(
    () => data.nodes.map((node) => node.base.clone()),
    [data.nodes],
  );
  const lineArray = useMemo(
    () => new Float32Array(data.connections.length * curveSegments * 2 * 3),
    [data.connections.length],
  );
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const attribute = new THREE.BufferAttribute(lineArray, 3);
    attribute.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute("position", attribute);
    return geometry;
  }, [lineArray]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const localPointer = useMemo(() => new THREE.Vector3(), []);
  const localClick = useMemo(() => new THREE.Vector3(), []);
  const midpoint = useMemo(() => new THREE.Vector3(), []);
  const color = useMemo(() => new THREE.Color(), []);
  const accentColor = useMemo(() => new THREE.Color(), []);

  useEffect(() => () => lineGeometry.dispose(), [lineGeometry]);

  useFrame((state, delta) => {
    const network = group.current;
    const mesh = nodesMesh.current;
    if (!network || !mesh || !nodesMaterial.current || !linesMaterial.current) {
      return;
    }

    network.worldToLocal(localPointer.copy(signals.pointerWorld));
    network.worldToLocal(localClick.copy(signals.clickOriginWorld));
    const elapsed = signals.reducedMotion ? 0.75 : state.clock.elapsedTime;
    const reveal = smoothRange(0.34, 0.83, signals.reveal);

    for (let index = 0; index < count; index += 1) {
      const seed = data.nodes[index];
      const point = current[index].copy(seed.base);
      if (!signals.reducedMotion) {
        point.y += Math.sin(elapsed * 0.38 + seed.floatPhase) * 0.035;
        point.x += Math.cos(elapsed * 0.24 + seed.floatPhase) * 0.018;
      }

      const dx = point.x - localPointer.x;
      const dy = point.y - localPointer.y;
      const pointerDistance = Math.max(0.001, Math.hypot(dx, dy));
      const pointerInfluence =
        signals.pointerInside && !signals.reducedMotion
          ? clamp01(1 - pointerDistance / 1.8)
          : 0;
      if (pointerInfluence > 0) {
        const gravity = pointerInfluence * pointerInfluence;
        point.x += ((-dy / pointerDistance) * 0.075 + (-dx / pointerDistance) * 0.025) * gravity;
        point.y += ((dx / pointerDistance) * 0.075 + (-dy / pointerDistance) * 0.025) * gravity;
        point.z += gravity * 0.055;
      }

      const phase = index / Math.max(1, count - 1);
      const renderActivation =
        Math.exp(-Math.pow((phase - signals.renderWave) * 13, 2)) *
        signals.renderEnergy;
      const impulseActivation =
        pointerInfluence * signals.pointerImpulse * 0.85;
      const clickDistance = point.distanceTo(localClick);
      const clickRadius = signals.clickWave * 5.2;
      const clickActivation =
        Math.exp(-Math.pow((clickDistance - clickRadius) * 3.2, 2)) *
        signals.clickEnergy;
      const activation = clamp01(
        renderActivation + impulseActivation + clickActivation + signals.hoverPulse * (1 - phase) * 0.28,
      );
      const nodeReveal = smoothRange(
        0.28 + phase * 0.18,
        0.66 + phase * 0.16,
        signals.reveal,
      );
      const scale =
        nodeReveal *
        (0.72 + seed.importance * 0.56 + activation * 1.55 + pointerInfluence * 0.18);

      dummy.position.copy(point);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);

      color.copy(BLUE).lerp(WHITE, activation * 0.82);
      accentColor.copy(color).lerp(LIME, renderActivation * 0.34 + clickActivation * 0.12);
      mesh.setColorAt(index, accentColor);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    nodesMaterial.current.opacity =
      reveal * (0.62 + signals.renderEnergy * 0.22 + signals.dashboardHover * 0.08);

    let cursor = 0;
    for (const connection of data.connections) {
      const from = current[connection.from];
      const to = current[connection.to];
      midpoint.copy(from).add(to).multiplyScalar(0.5);
      midpoint.z += connection.lift;

      const pointerDistance = Math.max(
        0.001,
        Math.hypot(midpoint.x - localPointer.x, midpoint.y - localPointer.y),
      );
      const bend =
        signals.pointerInside && !signals.reducedMotion
          ? clamp01(1 - pointerDistance / 2.15) * 0.16
          : 0;
      midpoint.x += (midpoint.x - localPointer.x) * bend;
      midpoint.y += (midpoint.y - localPointer.y) * bend;
      midpoint.z += bend * 0.55;

      for (let segment = 0; segment < curveSegments; segment += 1) {
        const t0 = segment / curveSegments;
        const t1 = (segment + 1) / curveSegments;
        for (const t of [t0, t1]) {
          const inverse = 1 - t;
          lineArray[cursor] =
            inverse * inverse * from.x + 2 * inverse * t * midpoint.x + t * t * to.x;
          lineArray[cursor + 1] =
            inverse * inverse * from.y + 2 * inverse * t * midpoint.y + t * t * to.y;
          lineArray[cursor + 2] =
            inverse * inverse * from.z + 2 * inverse * t * midpoint.z + t * t * to.z;
          cursor += 3;
        }
      }
    }
    (lineGeometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
    linesMaterial.current.opacity =
      reveal *
      (0.12 + signals.renderEnergy * 0.15 + signals.dashboardHover * 0.045);
  });

  return (
    <group ref={group}>
      <instancedMesh
        ref={nodesMesh}
        args={[undefined, undefined, count]}
        frustumCulled={false}
      >
        <sphereGeometry args={[0.075, 8, 8]} />
        <meshBasicMaterial
          ref={nodesMaterial}
          color="white"
          vertexColors
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.NormalBlending}
          toneMapped={false}
        />
      </instancedMesh>
      <lineSegments geometry={lineGeometry} frustumCulled={false}>
        <lineBasicMaterial
          ref={linesMaterial}
          color="#b6d0ff"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.NormalBlending}
          toneMapped={false}
        />
      </lineSegments>
    </group>
  );
}

type ParticleSeed = {
  curve: number;
  offset: number;
  speed: number;
  size: number;
};

function buildParticleCurves() {
  const point = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
  return [
    new THREE.CatmullRomCurve3([
      point(-5.8, -1.4, -2.6),
      point(-3.3, -1.65, -1.8),
      point(-1.2, -0.7, -0.5),
      point(0.25, 0.05, 0.5),
    ]),
    new THREE.CatmullRomCurve3([
      point(4.5, 2.5, -1.8),
      point(3.2, 1.25, -0.4),
      point(1.5, 0.25, 0.3),
      point(0.25, 0.05, 0.65),
    ]),
    new THREE.CatmullRomCurve3([
      point(4.4, -2.7, -0.8),
      point(3.1, -1.5, 0.2),
      point(1.6, -0.6, 0.6),
      point(0.25, 0.05, 0.75),
    ]),
    new THREE.CatmullRomCurve3(
      [
        point(-0.8, 1.2, -0.5),
        point(1.6, 2.15, -0.15),
        point(3.25, 0.7, 0.2),
        point(1.9, -1.35, 0.1),
        point(-0.5, -1.05, -0.3),
      ],
      true,
    ),
    new THREE.CatmullRomCurve3([
      point(-1.5, 3.2, -2.1),
      point(-0.4, 1.9, -0.8),
      point(0.1, 0.8, 0.05),
      point(0.25, 0.05, 0.8),
    ]),
  ];
}

function DataParticleSystem({ signals, tier }: SceneProps) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const material = useRef<THREE.MeshBasicMaterial>(null);
  const count = tier === "desktop" ? 88 : tier === "tablet" ? 52 : 26;
  const curves = useMemo(buildParticleCurves, []);
  const particles = useMemo(() => {
    const random = seededRandom(1831 + count);
    return Array.from({ length: count }, (_, index): ParticleSeed => ({
      curve: index % curves.length,
      offset: random(),
      speed: 0.018 + random() * 0.027,
      size: 0.48 + random() * 1.15,
    }));
  }, [count, curves.length]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const position = useMemo(() => new THREE.Vector3(), []);
  const tangent = useMemo(() => new THREE.Vector3(), []);
  const lookTarget = useMemo(() => new THREE.Vector3(), []);
  const localPointer = useMemo(() => new THREE.Vector3(), []);
  const group = useRef<THREE.Group>(null);
  const color = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    if (!mesh.current || !material.current || !group.current) return;
    group.current.worldToLocal(localPointer.copy(signals.pointerWorld));
    const elapsed = signals.reducedMotion ? 0 : state.clock.elapsedTime;
    const reveal = smoothRange(0.62, 1, signals.reveal);
    const acceleration = 1 + signals.renderEnergy * 2.1 + signals.dashboardHover * 0.28;

    particles.forEach((particle, index) => {
      const curve = curves[particle.curve];
      const travel = signals.reducedMotion
        ? particle.offset
        : (particle.offset + elapsed * particle.speed * acceleration) % 1;
      curve.getPointAt(travel, position);
      curve.getTangentAt(travel, tangent);

      if (!signals.reducedMotion && signals.pointerInside) {
        const distance = position.distanceTo(localPointer);
        const influence = clamp01(1 - distance / 1.7);
        position.x += (localPointer.x - position.x) * influence * 0.038;
        position.y += (localPointer.y - position.y) * influence * 0.038;
        position.z += influence * 0.08;
      }

      dummy.position.copy(position);
      lookTarget.copy(position).add(tangent);
      dummy.lookAt(lookTarget);
      const pulse =
        Math.exp(-Math.pow((travel - signals.renderWave) * 9, 2)) *
        signals.renderEnergy;
      dummy.scale.set(
        0.032 * particle.size * (1 + pulse),
        0.032 * particle.size * (1 + pulse),
        0.11 * particle.size * (1 + signals.renderEnergy * 0.45),
      );
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(index, dummy.matrix);
      color.copy(index % 11 === 0 ? LIME : index % 4 === 0 ? CYAN : WHITE);
      color.lerp(WHITE, pulse * 0.7);
      mesh.current?.setColorAt(index, color);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    material.current.opacity = reveal * (0.38 + signals.renderEnergy * 0.34);
  });

  return (
    <group ref={group}>
      <instancedMesh
        ref={mesh}
        args={[undefined, undefined, count]}
        frustumCulled={false}
      >
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          ref={material}
          color="white"
          vertexColors
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </instancedMesh>
    </group>
  );
}

const RIBBON_VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uMotion;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 transformed = position;
    transformed.z += sin(uv.x * 13.0 + uTime * 0.32) * 0.035 * uMotion;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`;

const RIBBON_FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform float uReveal;
  uniform float uWave;
  uniform float uEnergy;
  varying vec2 vUv;

  void main() {
    float edge = smoothstep(0.0, 0.22, vUv.y) * smoothstep(1.0, 0.78, vUv.y);
    float fiber = 1.0 - smoothstep(0.015, 0.08, min(vUv.y, 1.0 - vUv.y));
    float cadence = pow(max(0.0, sin((vUv.x * 6.0 - uTime * 0.2) * 6.28318)), 20.0);
    float renderPulse = exp(-pow((vUv.x - uWave) * 9.0, 2.0)) * uEnergy;
    vec3 blue = vec3(0.28, 0.52, 1.0);
    vec3 cyan = vec3(0.62, 0.9, 1.0);
    vec3 lime = vec3(0.85, 1.0, 0.4);
    vec3 color = mix(blue, cyan, cadence * 0.55);
    color = mix(color, lime, renderPulse * 0.18);
    float alpha = ((0.052 + cadence * 0.075 + renderPulse * 0.21) * edge + fiber * 0.055) * uReveal;
    gl_FragColor = vec4(color, alpha);
  }
`;

function createRibbonGeometry(tier: EngineTier) {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(tier === "mobile" ? -4.5 : -10, -1.55, -3.4),
    new THREE.Vector3(-5.8, -2.1, -2.8),
    new THREE.Vector3(-2.8, -0.75, -2.2),
    new THREE.Vector3(0.2, -0.18, -1.7),
    new THREE.Vector3(2.8, 1.35, -2.2),
    new THREE.Vector3(6.2, 1.1, -3.1),
  ]);
  const segments = tier === "mobile" ? 54 : 86;
  const positions = new Float32Array((segments + 1) * 2 * 3);
  const uvs = new Float32Array((segments + 1) * 2 * 2);
  const indices: number[] = [];
  const point = new THREE.Vector3();
  const tangent = new THREE.Vector3();
  const side = new THREE.Vector3();
  const cameraAxis = new THREE.Vector3(0, 0, 1);

  for (let index = 0; index <= segments; index += 1) {
    const progress = index / segments;
    curve.getPointAt(progress, point);
    curve.getTangentAt(progress, tangent);
    side.crossVectors(tangent, cameraAxis).normalize();
    const width = (tier === "mobile" ? 0.22 : 0.36) * (0.82 + Math.sin(progress * Math.PI) * 0.38);
    const left = point.clone().addScaledVector(side, width);
    const right = point.clone().addScaledVector(side, -width);
    positions.set(left.toArray(), index * 6);
    positions.set(right.toArray(), index * 6 + 3);
    uvs.set([progress, 0, progress, 1], index * 4);
    if (index < segments) {
      const offset = index * 2;
      indices.push(offset, offset + 1, offset + 2, offset + 1, offset + 3, offset + 2);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function DigitalRibbon({ signals, tier }: SceneProps) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const geometry = useMemo(() => createRibbonGeometry(tier), [tier]);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uReveal: { value: 0 },
      uWave: { value: 0 },
      uEnergy: { value: 0 },
      uMotion: { value: 1 },
    }),
    [],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state) => {
    if (!material.current) return;
    uniforms.uTime.value = signals.reducedMotion ? 2.2 : state.clock.elapsedTime;
    uniforms.uReveal.value = smoothRange(0.44, 0.92, signals.reveal);
    uniforms.uWave.value = signals.renderWave;
    uniforms.uEnergy.value = signals.renderEnergy + signals.hoverPulse * 0.18;
    uniforms.uMotion.value = signals.reducedMotion ? 0 : 1;
  });

  return (
    <mesh geometry={geometry} renderOrder={-1}>
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={RIBBON_VERTEX}
        fragmentShader={RIBBON_FRAGMENT}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  );
}

type FragmentSeed = {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
  phase: number;
};

function GlassFragments({ signals, tier }: SceneProps) {
  const glass = useRef<THREE.InstancedMesh>(null);
  const wire = useRef<THREE.InstancedMesh>(null);
  const group = useRef<THREE.Group>(null);
  const count = tier === "desktop" ? 7 : tier === "tablet" ? 4 : 2;
  const fragments = useMemo(() => {
    const random = seededRandom(919 + count);
    const anchors = [
      [3.3, 1.85, 1.1],
      [2.65, -2.1, 0.8],
      [-2.1, 2.25, -0.6],
      [4.55, 0.05, -1.1],
      [-1.65, -2.5, 0.5],
      [1.2, 2.9, -1.6],
      [5.15, -1.6, 0.3],
    ];
    return Array.from({ length: count }, (_, index): FragmentSeed => ({
      position: new THREE.Vector3(...(anchors[index] as [number, number, number])),
      rotation: new THREE.Euler(
        (random() - 0.5) * 0.7,
        (random() - 0.5) * 0.9,
        (random() - 0.5) * 0.6,
      ),
      scale: new THREE.Vector3(
        0.62 + random() * 0.72,
        0.55 + random() * 0.62,
        1,
      ),
      phase: random() * Math.PI * 2,
    }));
  }, [count]);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!glass.current || !wire.current || !group.current) return;
    const time = signals.reducedMotion ? 0 : state.clock.elapsedTime;
    const reveal = smoothRange(0.46, 0.94, signals.reveal);

    fragments.forEach((fragment, index) => {
      dummy.position.copy(fragment.position);
      if (!signals.reducedMotion) {
        dummy.position.y += Math.sin(time * 0.24 + fragment.phase) * 0.055;
      }
      dummy.rotation.copy(fragment.rotation);
      dummy.rotation.x += signals.pointer.y * 0.035 * (index % 2 ? -1 : 1);
      dummy.rotation.y += signals.pointer.x * 0.05 * (index % 2 ? 1 : -1);
      dummy.scale.copy(fragment.scale).multiplyScalar(reveal);
      dummy.updateMatrix();
      glass.current?.setMatrixAt(index, dummy.matrix);
      wire.current?.setMatrixAt(index, dummy.matrix);
    });
    glass.current.instanceMatrix.needsUpdate = true;
    wire.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <instancedMesh ref={glass} args={[undefined, undefined, count]}>
        <boxGeometry args={[1, 0.62, 0.028]} />
        <meshPhysicalMaterial
          color="#9ebfff"
          emissive="#1f45ad"
          emissiveIntensity={0.2}
          transparent
          opacity={0.2}
          transmission={0.56}
          ior={1.18}
          thickness={0.38}
          roughness={0.2}
          metalness={0.08}
          clearcoat={0.65}
          clearcoatRoughness={0.22}
          depthWrite={false}
        />
      </instancedMesh>
      <instancedMesh ref={wire} args={[undefined, undefined, count]}>
        <boxGeometry args={[1.015, 0.635, 0.03]} />
        <meshBasicMaterial
          color="#d9e7ff"
          wireframe
          transparent
          opacity={0.11}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </instancedMesh>
    </group>
  );
}

function InterfaceGlyphs({ signals, tier }: SceneProps) {
  const material = useRef<THREE.LineBasicMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const geometry = useMemo(() => {
    const segments = [
      -2.9, 1.15, 0, -1.85, 1.15, 0,
      -2.9, 1.15, 0, -2.9, 1.8, 0,
      -2.9, 1.8, 0, -2.25, 1.8, 0,
      3.15, -1.05, 0, 4.05, -1.05, 0,
      4.05, -1.05, 0, 4.05, -0.38, 0,
      3.48, -0.82, 0, 3.7, -0.58, 0,
      3.7, -0.58, 0, 3.9, -0.9, 0,
      1.9, 2.18, 0, 2.18, 2.18, 0,
      2.31, 2.18, 0, 2.62, 2.18, 0,
      2.75, 2.18, 0, 3.06, 2.18, 0,
    ];
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(segments, 3),
    );
    return geometry;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    if (!group.current || !material.current) return;
    if (!signals.reducedMotion) group.current.rotation.z += delta * 0.002;
    material.current.opacity =
      smoothRange(0.42, 0.86, signals.reveal) *
      (0.17 + signals.renderEnergy * 0.16);
  });

  if (tier === "mobile") return null;

  return (
    <group ref={group} position={[0, 0, 0.45]}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial
          ref={material}
          color="#d7e7ff"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </lineSegments>
    </group>
  );
}

function ComputationalSphere({ signals, tier }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const pointsMaterial = useRef<THREE.PointsMaterial>(null);
  const wireMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const radius = tier === "mobile" ? 2.1 : 3.1;
  const pointGeometry = useMemo(() => {
    const random = seededRandom(441);
    const values: number[] = [];
    const total = tier === "mobile" ? 90 : 180;
    for (let index = 0; index < total; index += 1) {
      if (random() < 0.38) continue;
      const y = 1 - (index / Math.max(1, total - 1)) * 2;
      const ringRadius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = Math.PI * (3 - Math.sqrt(5)) * index;
      values.push(
        Math.cos(theta) * ringRadius * radius,
        y * radius,
        Math.sin(theta) * ringRadius * radius,
      );
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(values, 3),
    );
    return geometry;
  }, [radius, tier]);

  useEffect(() => () => pointGeometry.dispose(), [pointGeometry]);

  useFrame((_, delta) => {
    if (!group.current || !pointsMaterial.current || !wireMaterial.current) return;
    if (!signals.reducedMotion) {
      group.current.rotation.y += delta * 0.012;
      group.current.rotation.x += delta * 0.0025;
    }
    const reveal = smoothRange(0.28, 0.74, signals.reveal);
    pointsMaterial.current.opacity = reveal * 0.12;
    wireMaterial.current.opacity = reveal * 0.022;
  });

  return (
    <group
      ref={group}
      position={
        tier === "mobile" ? [-3.4, -4.25, -4.8] : [-8.2, -3.65, -5.4]
      }
      rotation={[0.32, -0.4, 0.18]}
    >
      <points geometry={pointGeometry}>
        <pointsMaterial
          ref={pointsMaterial}
          color="#b8d1ff"
          size={tier === "mobile" ? 0.035 : 0.045}
          sizeAttenuation
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>
      <mesh>
        <sphereGeometry args={[radius, 18, 12]} />
        <meshBasicMaterial
          ref={wireMaterial}
          color="#83a9ff"
          wireframe
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

const GRID_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const GRID_FRAGMENT = /* glsl */ `
  uniform float uReveal;
  varying vec2 vUv;
  void main() {
    vec2 frequency = vec2(30.0, 18.0);
    vec2 cell = abs(fract(vUv * frequency) - 0.5);
    float line = max(smoothstep(0.47, 0.5, cell.x), smoothstep(0.47, 0.5, cell.y));
    float edge = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.72, vUv.x)
      * smoothstep(0.0, 0.14, vUv.y) * smoothstep(1.0, 0.82, vUv.y);
    gl_FragColor = vec4(vec3(0.42, 0.61, 1.0), line * edge * 0.075 * uReveal);
  }
`;

function BackgroundGrid({ signals, tier }: SceneProps) {
  const uniforms = useMemo(() => ({ uReveal: { value: 0 } }), []);
  useFrame(() => {
    uniforms.uReveal.value = smoothRange(0.08, 0.5, signals.reveal);
  });

  return (
    <mesh
      position={tier === "mobile" ? [0, -1.3, -6.5] : [1.4, -0.8, -7.2]}
      rotation={[0.08, -0.1, 0.02]}
      scale={tier === "mobile" ? [0.58, 0.78, 1] : [1, 1, 1]}
    >
      <planeGeometry args={[18, 11, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={GRID_VERTEX}
        fragmentShader={GRID_FRAGMENT}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  );
}

function ForegroundAccents({ signals, tier }: SceneProps) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const count = tier === "desktop" ? 10 : tier === "tablet" ? 6 : 3;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(() => {
    const random = seededRandom(216 + count);
    return Array.from({ length: count }, () => ({
      x: (random() - 0.34) * 10,
      y: (random() - 0.5) * 6.6,
      z: 2.5 + random() * 3,
      size: 0.35 + random() * 0.9,
    }));
  }, [count]);

  useFrame(() => {
    if (!mesh.current) return;
    const reveal = smoothRange(0.68, 1, signals.reveal);
    seeds.forEach((seed, index) => {
      dummy.position.set(
        seed.x + signals.pointer.x * 0.16,
        seed.y + signals.pointer.y * 0.12,
        seed.z + signals.scroll * 2.8,
      );
      dummy.scale.setScalar(seed.size * reveal * 0.045);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(index, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial
        color="#dbe9ff"
        transparent
        opacity={0.22}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

function EngineLayers({ signals, tier }: SceneProps) {
  const far = useRef<THREE.Group>(null);
  const middle = useRef<THREE.Group>(null);
  const near = useRef<THREE.Group>(null);
  const layout =
    tier === "desktop"
      ? { position: [3.35, 0.15, 0] as const, scale: 1 }
      : tier === "tablet"
        ? { position: [1.75, -0.65, 0] as const, scale: 0.84 }
        : { position: [0, -1.75, 0] as const, scale: 0.62 };

  useFrame((_, delta) => {
    if (!far.current || !middle.current || !near.current) return;
    const dt = Math.min(delta, 0.05);
    const pointerX = signals.reducedMotion ? 0 : signals.pointer.x;
    const pointerY = signals.reducedMotion ? 0 : signals.pointer.y;

    far.current.position.x = THREE.MathUtils.damp(
      far.current.position.x,
      pointerX * 0.045,
      2,
      dt,
    );
    far.current.position.y = THREE.MathUtils.damp(
      far.current.position.y,
      pointerY * 0.03,
      2,
      dt,
    );
    far.current.position.z = THREE.MathUtils.damp(
      far.current.position.z,
      -signals.scroll * 0.6,
      2,
      dt,
    );

    middle.current.position.x = THREE.MathUtils.damp(
      middle.current.position.x,
      pointerX * 0.12,
      2.5,
      dt,
    );
    middle.current.position.y = THREE.MathUtils.damp(
      middle.current.position.y,
      pointerY * 0.075,
      2.5,
      dt,
    );
    middle.current.position.z = THREE.MathUtils.damp(
      middle.current.position.z,
      signals.scroll * 0.42,
      2.4,
      dt,
    );

    near.current.position.x = THREE.MathUtils.damp(
      near.current.position.x,
      pointerX * 0.22,
      3,
      dt,
    );
    near.current.position.y = THREE.MathUtils.damp(
      near.current.position.y,
      pointerY * 0.14,
      3,
      dt,
    );
    near.current.position.z = THREE.MathUtils.damp(
      near.current.position.z,
      signals.scroll * 1.05,
      2.6,
      dt,
    );
  });

  return (
    <group position={layout.position} scale={layout.scale}>
      <group ref={far}>
        <BackgroundGrid signals={signals} tier={tier} />
        <ComputationalSphere signals={signals} tier={tier} />
      </group>
      <group ref={middle}>
        <DigitalRibbon signals={signals} tier={tier} />
        <OrbitalRings signals={signals} tier={tier} />
        <ArchitectureNetwork signals={signals} tier={tier} />
      </group>
      <group ref={near}>
        <DataParticleSystem signals={signals} tier={tier} />
        <GlassFragments signals={signals} tier={tier} />
        <InterfaceGlyphs signals={signals} tier={tier} />
        <ForegroundAccents signals={signals} tier={tier} />
      </group>
    </group>
  );
}

export function InterfaceEngineScene({ signals, tier }: SceneProps) {
  return (
    <>
      <CameraRig signals={signals} />
      <SceneLighting signals={signals} />
      <EngineLayers signals={signals} tier={tier} />
    </>
  );
}
