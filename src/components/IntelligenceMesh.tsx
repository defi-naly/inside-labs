import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Central geodesic — wireframe only ── */
const CoreGeodesic = () => {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.12;
      ref.current.rotation.x = Math.sin(t * 0.08) * 0.15;
      const breath = 1 + Math.sin(t * 0.8) * 0.02;
      ref.current.scale.setScalar(breath);
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial wireframe color="#ffffff" transparent opacity={0.7} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshBasicMaterial wireframe color="#f0f0f5" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

/* ── Helper: compute current satellite position (must match useFrame logic) ── */
const getSatPosition = (
  base: THREE.Vector3,
  orbitSpeed: number,
  orbitPhase: number,
  time: number
): THREE.Vector3 => {
  const angle = time * orbitSpeed + orbitPhase;
  const orbRadius = 0.3;
  return new THREE.Vector3(
    base.x + Math.sin(angle) * orbRadius,
    base.y + Math.cos(angle * 0.7) * orbRadius * 0.5,
    base.z + Math.cos(angle) * orbRadius
  );
};

/* ── Satellite node ── */
const Satellite = ({
  basePosition,
  radius,
  depth,
  orbitSpeed,
  orbitPhase,
}: {
  basePosition: [number, number, number];
  radius: number;
  depth: number;
  orbitSpeed: number;
  orbitPhase: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const baseVec = useMemo(() => new THREE.Vector3(...basePosition), [basePosition]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y += 0.3 * 0.016;
      ref.current.rotation.x += 0.15 * 0.016;
    }
    if (groupRef.current) {
      const pos = getSatPosition(baseVec, orbitSpeed, orbitPhase, t);
      groupRef.current.position.copy(pos);
    }
  });

  const opacity = 0.2;

  return (
    <group ref={groupRef}>
      <mesh ref={ref}>
        <sphereGeometry args={[radius, 8, 8]} />
        <meshBasicMaterial wireframe color="#f0f0f5" transparent opacity={opacity} />
      </mesh>
    </group>
  );
};

/* ── Dynamic lines that follow satellites ── */
const DynamicLines = ({
  satellites,
  neighbors,
}: {
  satellites: { pos: [number, number, number]; depth: number; orbitSpeed: number; orbitPhase: number }[];
  neighbors: [number, number][];
}) => {
  const radialRef = useRef<THREE.LineSegments>(null);
  const interRef = useRef<THREE.LineSegments>(null);

  const baseVecs = useMemo(
    () => satellites.map((s) => new THREE.Vector3(...s.pos)),
    [satellites]
  );

  // Radial lines: center → each satellite
  const { radialGeo, radialMat } = useMemo(() => {
    const count = satellites.length;
    const positions = new Float32Array(count * 6);
    const colors = new Float32Array(count * 6);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const m = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.25 });
    return { radialGeo: g, radialMat: m };
  }, [satellites.length]);

  // Inter-satellite lines
  const { interGeo, interMat } = useMemo(() => {
    const positions = new Float32Array(neighbors.length * 6);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const m = new THREE.LineBasicMaterial({ color: "#f0f0f5", transparent: true, opacity: 0.2 });
    return { interGeo: g, interMat: m };
  }, [neighbors.length]);

  const red = useMemo(() => new THREE.Color("#e63946"), []);
  const white = useMemo(() => new THREE.Color("#f0f0f5"), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Update radial lines
    const rPos = radialGeo.attributes.position as THREE.BufferAttribute;
    const rCol = radialGeo.attributes.color as THREE.BufferAttribute;
    for (let i = 0; i < satellites.length; i++) {
      const sat = satellites[i];
      const current = getSatPosition(baseVecs[i], sat.orbitSpeed, sat.orbitPhase, t);
      // From center
      rPos.setXYZ(i * 2, 0, 0, 0);
      rCol.setXYZ(i * 2, red.r, red.g, red.b);
      // To satellite center
      rPos.setXYZ(i * 2 + 1, current.x, current.y, current.z);
      rCol.setXYZ(i * 2 + 1, white.r, white.g, white.b);
    }
    rPos.needsUpdate = true;
    rCol.needsUpdate = true;

    // Update inter-satellite lines
    const iPos = interGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < neighbors.length; i++) {
      const [a, b] = neighbors[i];
      const posA = getSatPosition(baseVecs[a], satellites[a].orbitSpeed, satellites[a].orbitPhase, t);
      const posB = getSatPosition(baseVecs[b], satellites[b].orbitSpeed, satellites[b].orbitPhase, t);
      iPos.setXYZ(i * 2, posA.x, posA.y, posA.z);
      iPos.setXYZ(i * 2 + 1, posB.x, posB.y, posB.z);
    }
    iPos.needsUpdate = true;
  });

  return (
    <>
      <lineSegments ref={radialRef} geometry={radialGeo} material={radialMat} />
      <lineSegments ref={interRef} geometry={interGeo} material={interMat} />
    </>
  );
};

/* ── Dynamic particles that follow satellites ── */
const DynamicParticles = ({
  satellites,
  neighbors,
}: {
  satellites: { pos: [number, number, number]; depth: number; orbitSpeed: number; orbitPhase: number }[];
  neighbors: [number, number][];
}) => {
  const radialRef = useRef<THREE.Points>(null);
  const interRef = useRef<THREE.Points>(null);
  const baseVecs = useMemo(() => satellites.map((s) => new THREE.Vector3(...s.pos)), [satellites]);

  // Radial particles: 2 per satellite
  const radialCount = satellites.length * 2;
  const { rPositions, rOffsets, rSpeeds, rDirs, rSatIdx } = useMemo(() => {
    const pos = new Float32Array(radialCount * 3);
    const off = new Float32Array(radialCount);
    const spd = new Float32Array(radialCount);
    const dir = new Float32Array(radialCount);
    const idx = new Uint8Array(radialCount);
    for (let i = 0; i < radialCount; i++) {
      off[i] = Math.random();
      spd[i] = 0.04 + Math.random() * 0.06;
      dir[i] = i % 2 === 0 ? 1 : -1;
      idx[i] = Math.floor(i / 2);
    }
    return { rPositions: pos, rOffsets: off, rSpeeds: spd, rDirs: dir, rSatIdx: idx };
  }, [radialCount]);

  // Inter particles: 1 per neighbor edge
  const interCount = neighbors.length;
  const { iPositions, iOffsets, iSpeeds, iDirs } = useMemo(() => {
    const pos = new Float32Array(interCount * 3);
    const off = new Float32Array(interCount);
    const spd = new Float32Array(interCount);
    const dir = new Float32Array(interCount);
    for (let i = 0; i < interCount; i++) {
      off[i] = Math.random();
      spd[i] = 0.03 + Math.random() * 0.05;
      dir[i] = Math.random() > 0.5 ? 1 : -1;
    }
    return { iPositions: pos, iOffsets: off, iSpeeds: spd, iDirs: dir };
  }, [interCount]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Radial particles
    if (radialRef.current) {
      const posAttr = radialRef.current.geometry.attributes.position;
      for (let i = 0; i < radialCount; i++) {
        let progress = (rOffsets[i] + t * rSpeeds[i] * rDirs[i]) % 1;
        if (progress < 0) progress += 1;
        const si = rSatIdx[i];
        const target = getSatPosition(baseVecs[si], satellites[si].orbitSpeed, satellites[si].orbitPhase, t);
        posAttr.setXYZ(i, target.x * progress, target.y * progress, target.z * progress);
      }
      posAttr.needsUpdate = true;
    }

    // Inter particles
    if (interRef.current) {
      const posAttr = interRef.current.geometry.attributes.position;
      for (let i = 0; i < interCount; i++) {
        let progress = (iOffsets[i] + t * iSpeeds[i] * iDirs[i]) % 1;
        if (progress < 0) progress += 1;
        const [a, b] = neighbors[i];
        const posA = getSatPosition(baseVecs[a], satellites[a].orbitSpeed, satellites[a].orbitPhase, t);
        const posB = getSatPosition(baseVecs[b], satellites[b].orbitSpeed, satellites[b].orbitPhase, t);
        posAttr.setXYZ(
          i,
          posA.x + (posB.x - posA.x) * progress,
          posA.y + (posB.y - posA.y) * progress,
          posA.z + (posB.z - posA.z) * progress
        );
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <>
      <points ref={radialRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[rPositions, 3]} count={radialCount} />
        </bufferGeometry>
        <pointsMaterial color="#e63946" size={0.06} transparent opacity={0.45} sizeAttenuation />
      </points>
      <points ref={interRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[iPositions, 3]} count={interCount} />
        </bufferGeometry>
        <pointsMaterial color="#e63946" size={0.05} transparent opacity={0.3} sizeAttenuation />
      </points>
    </>
  );
};

/* ── Main scene ── */
const NetworkScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  const satellites = useMemo(() => {
    const sats: { pos: [number, number, number]; radius: number; depth: number; orbitSpeed: number; orbitPhase: number }[] = [];
    const count = 20;
    const shellRadius = 4.8;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const t = (i + 0.5) / count;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = goldenAngle * i;

      const x = shellRadius * Math.sin(inclination) * Math.cos(azimuth);
      const y = shellRadius * Math.sin(inclination) * Math.sin(azimuth);
      const z = shellRadius * Math.cos(inclination);

      const depthVal = (z + shellRadius) / (2 * shellRadius);
      sats.push({
        pos: [x, y, z],
        radius: 0.22,
        depth: depthVal * 0.8 + 0.1,
        orbitSpeed: 0.05 + (i % 5) * 0.015,
        orbitPhase: azimuth,
      });
    }
    return sats;
  }, []);

  // Find 3 nearest neighbors for each satellite → inter-satellite edges
  const neighbors = useMemo(() => {
    const edges = new Set<string>();
    const result: [number, number][] = [];
    for (let i = 0; i < satellites.length; i++) {
      const dists: { idx: number; dist: number }[] = [];
      for (let j = 0; j < satellites.length; j++) {
        if (i === j) continue;
        const dx = satellites[i].pos[0] - satellites[j].pos[0];
        const dy = satellites[i].pos[1] - satellites[j].pos[1];
        const dz = satellites[i].pos[2] - satellites[j].pos[2];
        dists.push({ idx: j, dist: Math.sqrt(dx * dx + dy * dy + dz * dz) });
      }
      dists.sort((a, b) => a.dist - b.dist);
      for (let k = 0; k < 5; k++) {
        const a = Math.min(i, dists[k].idx);
        const b = Math.max(i, dists[k].idx);
        const key = `${a}-${b}`;
        if (!edges.has(key)) {
          edges.add(key);
          result.push([a, b]);
        }
      }
    }
    return result;
  }, [satellites]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.03) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <CoreGeodesic />
      <DynamicLines satellites={satellites} neighbors={neighbors} />
      <DynamicParticles satellites={satellites} neighbors={neighbors} />
      {satellites.map((sat, i) => (
        <Satellite
          key={i}
          basePosition={sat.pos}
          radius={sat.radius}
          depth={sat.depth}
          orbitSpeed={sat.orbitSpeed}
          orbitPhase={sat.orbitPhase}
        />
      ))}
    </group>
  );
};

const IntelligenceMesh = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        style={{ touchAction: "none", background: "transparent", width: "100%", height: "100%" }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <NetworkScene />
      </Canvas>
    </div>
  );
};

export default IntelligenceMesh;
