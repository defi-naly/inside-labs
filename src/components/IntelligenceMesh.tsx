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
      // Breathing scale
      const breath = 1 + Math.sin(t * 0.8) * 0.04;
      ref.current.scale.setScalar(breath);
    }
    if (glowRef.current) {
      const glowBreath = 0.12 + Math.sin(t * 0.8) * 0.04;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = glowBreath;
    }
  });

  return (
    <group ref={ref}>
      {/* Inner glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.35, 24, 24]} />
        <meshBasicMaterial color="#3dd8d5" transparent opacity={0.12} />
      </mesh>
      {/* Geodesic wireframe shell */}
      <mesh>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial wireframe color="#5eeae6" transparent opacity={0.45} />
      </mesh>
      {/* Secondary inner shell for depth */}
      <mesh>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshBasicMaterial wireframe color="#3dd8d5" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

/* ── Satellite node ── */
const Satellite = ({
  position,
  radius,
  depth,
}: {
  position: [number, number, number];
  radius: number;
  depth: number; // 0 = foreground, 1 = background
}) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += 0.3 * delta;
      ref.current.rotation.x += 0.15 * delta;
    }
  });

  const opacity = THREE.MathUtils.lerp(0.5, 0.12, depth);
  // Teal near center → coral far away
  const color = new THREE.Color().lerpColors(
    new THREE.Color("#5eeae6"),
    new THREE.Color("#e8927c"),
    depth
  );

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[radius, 8, 8]} />
      <meshBasicMaterial wireframe color={color} transparent opacity={opacity} />
    </mesh>
  );
};

/* ── Traveling particles along a connection ── */
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
    const dir = new Float32Array(count); // 1 = toward center, -1 = away
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
    const geo = ref.current.geometry;
    const posAttr = geo.attributes.position;

    for (let i = 0; i < count; i++) {
      let progress = (offsets[i] + t * speeds[i] * directions[i]) % 1;
      if (progress < 0) progress += 1;

      const x = from.x + (to.x - from.x) * progress;
      const y = from.y + (to.y - from.y) * progress;
      const z = from.z + (to.z - from.z) * progress;

      posAttr.setXYZ(i, x, y, z);
    }
    posAttr.needsUpdate = true;
  });

  const opacity = THREE.MathUtils.lerp(0.6, 0.1, depth);

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
        color="#5eeae6"
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

  // Purposeful satellite placements with hierarchy
  const satellites = useMemo(
    () => [
      // Foreground (large, bright)
      { pos: [4.5, 1.5, 2.5] as [number, number, number], radius: 0.45, depth: 0.1 },
      { pos: [-3.8, -1.0, 3.0] as [number, number, number], radius: 0.38, depth: 0.15 },
      // Mid-ground
      { pos: [2.5, -3.5, 1.0] as [number, number, number], radius: 0.3, depth: 0.4 },
      { pos: [-2.0, 3.2, -1.5] as [number, number, number], radius: 0.28, depth: 0.45 },
      { pos: [0.5, 4.0, 2.0] as [number, number, number], radius: 0.32, depth: 0.35 },
      // Background (small, faded)
      { pos: [-4.5, 0.5, -3.5] as [number, number, number], radius: 0.18, depth: 0.85 },
      { pos: [3.0, -2.0, -4.0] as [number, number, number], radius: 0.15, depth: 0.9 },
    ],
    []
  );

  // Gradient connection lines: teal center → coral at satellite
  const connectionLines = useMemo(() => {
    const center = new THREE.Vector3(0, 0, 0);
    const segments = 20;
    const positions: number[] = [];
    const colors: number[] = [];
    const teal = new THREE.Color("#5eeae6");
    const coral = new THREE.Color("#e8927c");

    for (const sat of satellites) {
      const target = new THREE.Vector3(...sat.pos);
      for (let s = 0; s < segments; s++) {
        const t1 = s / segments;
        const t2 = (s + 1) / segments;
        const p1 = center.clone().lerp(target, t1);
        const p2 = center.clone().lerp(target, t2);
        positions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);

        const c1 = teal.clone().lerp(coral, t1 * sat.depth);
        const c2 = teal.clone().lerp(coral, t2 * sat.depth);
        colors.push(c1.r, c1.g, c1.b, c2.r, c2.g, c2.b);
      }
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    const mat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
    });
    return new THREE.LineSegments(g, mat);
  }, [satellites]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.03) * 0.08;
    }
  });

  const origin = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  return (
    <group ref={groupRef}>
      <CoreGeodesic />
      <primitive object={connectionLines} />
      {satellites.map((sat, i) => (
        <Satellite key={i} position={sat.pos} radius={sat.radius} depth={sat.depth} />
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
