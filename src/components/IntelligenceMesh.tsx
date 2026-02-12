import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface SphereNode {
  position: [number, number, number];
  radius: number;
  rotationSpeed: [number, number];
}

const WireSphere = ({
  position,
  radius,
  rotationSpeed,
}: SphereNode) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += rotationSpeed[0] * delta;
      ref.current.rotation.y += rotationSpeed[1] * delta;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[radius, 2]} />
      <meshBasicMaterial
        wireframe
        color="#999999"
        transparent
        opacity={0.25}
      />
    </mesh>
  );
};

const ConnectionLine = ({
  start,
  end,
}: {
  start: [number, number, number];
  end: [number, number, number];
}) => {
  const lineObj = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.Float32BufferAttribute([...start, ...end], 3)
    );
    const mat = new THREE.LineBasicMaterial({
      color: "#bbbbbb",
      transparent: true,
      opacity: 0.08,
    });
    return new THREE.Line(g, mat);
  }, [start, end]);

  return <primitive object={lineObj} />;
};

// Red accent pulse sphere
const PulseSphere = ({
  position,
  radius,
}: {
  position: [number, number, number];
  radius: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      const scale = 1 + Math.sin(t * 2 + position[0]) * 0.15;
      ref.current.scale.setScalar(scale);
      (ref.current.material as THREE.MeshBasicMaterial).opacity =
        0.08 + Math.sin(t * 1.5 + position[1]) * 0.04;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[radius * 0.3, 8, 8]} />
      <meshBasicMaterial color="#e11d48" transparent opacity={0.1} />
    </mesh>
  );
};

const NetworkScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Generate sphere positions in a cluster arrangement
  const spheres = useMemo<SphereNode[]>(() => {
    const nodes: SphereNode[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    // Arrange ~30 spheres in a roughly spherical cluster
    const count = 28;
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = goldenAngle * i;

      const clusterRadius = 3.5 + (Math.random() - 0.5) * 1.5;
      const x =
        clusterRadius * Math.sin(inclination) * Math.cos(azimuth) +
        (Math.random() - 0.5) * 0.8;
      const y =
        clusterRadius * Math.sin(inclination) * Math.sin(azimuth) +
        (Math.random() - 0.5) * 0.8;
      const z =
        clusterRadius * Math.cos(inclination) + (Math.random() - 0.5) * 0.8;

      const radius = 0.5 + Math.random() * 0.7;
      nodes.push({
        position: [x, y, z],
        radius,
        rotationSpeed: [
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3,
        ],
      });
    }
    return nodes;
  }, []);

  // Generate connections between nearby spheres
  const connections = useMemo(() => {
    const lines: { start: [number, number, number]; end: [number, number, number] }[] = [];
    const maxDist = 3.5;

    for (let i = 0; i < spheres.length; i++) {
      for (let j = i + 1; j < spheres.length; j++) {
        const dx = spheres[i].position[0] - spheres[j].position[0];
        const dy = spheres[i].position[1] - spheres[j].position[1];
        const dz = spheres[i].position[2] - spheres[j].position[2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDist) {
          lines.push({
            start: spheres[i].position,
            end: spheres[j].position,
          });
        }
      }
    }
    return lines;
  }, [spheres]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.03) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {spheres.map((s, i) => (
        <WireSphere key={i} {...s} />
      ))}
      {connections.map((c, i) => (
        <ConnectionLine key={`c-${i}`} {...c} />
      ))}
      {/* Red accent on some hub nodes */}
      {spheres
        .filter((_, i) => i % 5 === 0)
        .map((s, i) => (
          <PulseSphere key={`p-${i}`} position={s.position} radius={s.radius} />
        ))}
    </group>
  );
};

const IntelligenceMesh = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      style={{ touchAction: "none" }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["hsl(0, 0%, 100%)"]} />
      <ambientLight intensity={0.5} />
      <NetworkScene />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI * 0.7}
        minPolarAngle={Math.PI * 0.3}
      />
    </Canvas>
  );
};

export default IntelligenceMesh;