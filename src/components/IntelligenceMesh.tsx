import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Central geodesic — wireframe only, no fill ── */
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
      {/* Outer wireframe */}
      <mesh>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial wireframe color="#f0f0f5" transparent opacity={0.4} />
      </mesh>
      {/* Inner wireframe for depth */}
      <mesh>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshBasicMaterial wireframe color="#f0f0f5" transparent opacity={0.15} />
      </mesh>
    </group>
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
      const angle = t * orbitSpeed + orbitPhase;
      const orbRadius = 0.3;
      groupRef.current.position.set(
        baseVec.x + Math.sin(angle) * orbRadius,
        baseVec.y + Math.cos(angle * 0.7) * orbRadius * 0.5,
        baseVec.z + Math.cos(angle) * orbRadius
      );
    }
  });

  const opacity = THREE.MathUtils.lerp(0.5, 0.1, depth);

  return (
    <group ref={groupRef}>
      <mesh ref={ref}>
        <sphereGeometry args={[radius, 8, 8]} />
        <meshBasicMaterial wireframe color="#f0f0f5" transparent opacity={opacity} />
      </mesh>
    </group>
  );
};

/* ── Flowing particles — fewer, slower ── */
const FlowingParticles = ({
  from,
  to,
  count,
  depth,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  count: number;
  depth: number;
}) => {
  const ref = useRef<THREE.Points>(null);

  const { positions, offsets, speeds, directions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const off = new Float32Array(count);
    const spd = new Float32Array(count);
    const dir = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      off[i] = Math.random();
      spd[i] = 0.06 + Math.random() * 0.1;
      dir[i] = Math.random() > 0.4 ? 1 : -1;
    }
    return { positions: pos, offsets: off, speeds: spd, directions: dir };
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const posAttr = ref.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      let progress = (offsets[i] + t * speeds[i] * directions[i]) % 1;
      if (progress < 0) progress += 1;
      posAttr.setXYZ(
        i,
        from.x + (to.x - from.x) * progress,
        from.y + (to.y - from.y) * progress,
        from.z + (to.z - from.z) * progress
      );
    }
    posAttr.needsUpdate = true;
  });

  const opacity = THREE.MathUtils.lerp(0.5, 0.1, depth);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#e63946"
        size={0.06}
        transparent
        opacity={opacity}
        sizeAttenuation
      />
    </points>
  );
};

/* ── Main scene ── */
const NetworkScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  // More satellites arranged in a circular topology
  const satellites = useMemo(() => {
    const sats: { pos: [number, number, number]; radius: number; depth: number; orbitSpeed: number; orbitPhase: number }[] = [];
    const count = 12;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const ringRadius = 4.5 + (i % 3) * 0.6; // slight variation
      const y = (Math.sin(angle * 2) * 1.2); // vertical spread
      const z = Math.cos(angle) * ringRadius * 0.4; // depth variation
      const x = Math.sin(angle) * ringRadius;
      const isForeground = Math.abs(z) < 2;
      sats.push({
        pos: [x, y, z],
        radius: 0.15 + (i % 4) * 0.08, // varied sizes
        depth: isForeground ? 0.1 + (i % 3) * 0.15 : 0.6 + (i % 3) * 0.12,
        orbitSpeed: 0.06 + (i % 5) * 0.02,
        orbitPhase: angle,
      });
    }
    return sats;
  }, []);

  // Gradient lines: red center → white at satellites
  const connectionLines = useMemo(() => {
    const center = new THREE.Vector3(0, 0, 0);
    const segments = 20;
    const positions: number[] = [];
    const colors: number[] = [];
    const red = new THREE.Color("#e63946");
    const white = new THREE.Color("#f0f0f5");

    for (const sat of satellites) {
      const target = new THREE.Vector3(...sat.pos);
      for (let s = 0; s < segments; s++) {
        const t1 = s / segments;
        const t2 = (s + 1) / segments;
        const p1 = center.clone().lerp(target, t1);
        const p2 = center.clone().lerp(target, t2);
        positions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);

        const c1 = red.clone().lerp(white, t1);
        const c2 = red.clone().lerp(white, t2);
        colors.push(c1.r, c1.g, c1.b, c2.r, c2.g, c2.b);
      }
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    const mat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.25,
    });
    return new THREE.LineSegments(g, mat);
  }, [satellites]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.03) * 0.08;
    }
  });

  const origin = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  return (
    <group ref={groupRef}>
      <CoreGeodesic />
      <primitive object={connectionLines} />
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
      {satellites.map((sat, i) => (
        <FlowingParticles
          key={`p-${i}`}
          from={origin}
          to={new THREE.Vector3(...sat.pos)}
          count={sat.depth < 0.5 ? 3 : 2}
          depth={sat.depth}
        />
      ))}
    </group>
  );
};

const IntelligenceMesh = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 50 }}
      style={{ touchAction: "none", background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
    >
      <NetworkScene />
    </Canvas>
  );
};

export default IntelligenceMesh;
