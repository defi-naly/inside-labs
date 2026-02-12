import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const WireNode = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Mesh>(null);
  const speed = useMemo(() => [(Math.random() - 0.5) * 0.15, (Math.random() - 0.5) * 0.15], []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += speed[0] * delta;
      ref.current.rotation.y += speed[1] * delta;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[0.55, 1]} />
      <meshBasicMaterial wireframe color="#888888" transparent opacity={0.22} />
    </mesh>
  );
};

const NetworkScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const shellRadius = 6;
  const nodeCount = 30;

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
      opacity: 0.045,
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
      <primitive object={linesObj} />
      {positions.map((pos, i) => (
        <WireNode key={i} position={pos} />
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