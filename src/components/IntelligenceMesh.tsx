import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Central geodesic "brain" ── */
const CoreGeodesic = () => {
  const ref = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.12;
      ref.current.rotation.x = Math.sin(t * 0.08) * 0.15;
      const breath = 1 + Math.sin(t * 0.8) * 0.02;
      ref.current.scale.setScalar(breath);
    }
    if (glowRef.current) {
      const glowBreath = 0.1 + Math.sin(t * 0.8) * 0.05;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = glowBreath;
    }
  });

  return (
    <group ref={ref}>
      {/* Red inner glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.35, 24, 24]} />
        <meshBasicMaterial color="#e63946" transparent opacity={0.1} />
      </mesh>
      {/* Outer wireframe — white/light */}
      <mesh>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial wireframe color="#f0f0f5" transparent opacity={0.4} />
      </mesh>
      {/* Inner wireframe */}
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
      // Slow orbital drift
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

/* ── Flowing particles ── */
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
      spd[i] = 0.15 + Math.random() * 0.25;
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

  const opacity = THREE.MathUtils.lerp(0.7, 0.15, depth);

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
        size={0.07}
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

  const satellites = useMemo(
    () => [
      { pos: [4.5, 1.5, 2.5] as [number, number, number], radius: 0.45, depth: 0.1, orbitSpeed: 0.15, orbitPhase: 0 },
      { pos: [-3.8, -1.0, 3.0] as [number, number, number], radius: 0.38, depth: 0.15, orbitSpeed: 0.12, orbitPhase: 1.2 },
      { pos: [2.5, -3.5, 1.0] as [number, number, number], radius: 0.3, depth: 0.4, orbitSpeed: 0.1, orbitPhase: 2.4 },
      { pos: [-2.0, 3.2, -1.5] as [number, number, number], radius: 0.28, depth: 0.45, orbitSpeed: 0.13, orbitPhase: 3.6 },
      { pos: [0.5, 4.0, 2.0] as [number, number, number], radius: 0.32, depth: 0.35, orbitSpeed: 0.11, orbitPhase: 4.8 },
      { pos: [-4.5, 0.5, -3.5] as [number, number, number], radius: 0.18, depth: 0.85, orbitSpeed: 0.08, orbitPhase: 5.5 },
      { pos: [3.0, -2.0, -4.0] as [number, number, number], radius: 0.15, depth: 0.9, orbitSpeed: 0.09, orbitPhase: 6.0 },
    ],
    []
  );

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
      opacity: 0.35,
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
          count={sat.depth < 0.5 ? 8 : 4}
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
