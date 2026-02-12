import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const NetworkScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const shellRadius = 6;
  const nodeCount = 60;
  const nodeSize = 0.12;

  // All nodes exactly on the sphere surface — Fibonacci lattice
  const positions = useMemo<[number, number, number][]>(() => {
    const pts: [number, number, number][] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < nodeCount; i++) {
      const t = (i + 0.5) / nodeCount;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = goldenAngle * i;

      pts.push([
        shellRadius * Math.sin(inclination) * Math.cos(azimuth),
        shellRadius * Math.sin(inclination) * Math.sin(azimuth),
        shellRadius * Math.cos(inclination),
      ]);
    }
    return pts;
  }, []);

  // All-to-all connections as a single LineSegments object for performance
  const linesObj = useMemo(() => {
    const verts: number[] = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        verts.push(...positions[i], ...positions[j]);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    const mat = new THREE.LineBasicMaterial({
      color: "#999999",
      transparent: true,
      opacity: 0.035,
    });
    return new THREE.LineSegments(g, mat);
  }, [positions]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.06;
      groupRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.03) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <primitive object={linesObj} />

      {/* Nodes — identical size, on circumference */}
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[nodeSize, 12, 12]} />
          <meshBasicMaterial color="#666666" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
};

const IntelligenceMesh = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 16], fov: 50 }}
      style={{ touchAction: "none", background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
    >
      <NetworkScene />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
        maxPolarAngle={Math.PI * 0.75}
        minPolarAngle={Math.PI * 0.25}
      />
    </Canvas>
  );
};

export default IntelligenceMesh;