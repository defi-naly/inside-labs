import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const CoreShape = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += 0.05 * delta;
      ref.current.rotation.y += 0.08 * delta;
      ref.current.rotation.z += 0.03 * delta;
    }
  });

  return (
    <mesh ref={ref}>
      <dodecahedronGeometry args={[1.8, 0]} />
      <meshBasicMaterial wireframe color="#999999" transparent opacity={0.3} />
    </mesh>
  );
};

const WireNode = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Mesh>(null);
  const speed = useMemo(
    () => [(Math.random() - 0.5) * 0.15, (Math.random() - 0.5) * 0.15],
    []
  );

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += speed[0] * delta;
      ref.current.rotation.y += speed[1] * delta;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.55, 10, 10]} />
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

  // Connect only nearest neighbors — lines stay on surface
  const linesObj = useMemo(() => {
    const verts: number[] = [];
    const maxNeighbors = 5;

    for (let i = 0; i < positions.length; i++) {
      // Calculate distances to all other nodes
      const distances: { idx: number; dist: number }[] = [];
      for (let j = 0; j < positions.length; j++) {
        if (i === j) continue;
        const dx = positions[i][0] - positions[j][0];
        const dy = positions[i][1] - positions[j][1];
        const dz = positions[i][2] - positions[j][2];
        distances.push({ idx: j, dist: Math.sqrt(dx * dx + dy * dy + dz * dz) });
      }
      // Sort and pick nearest neighbors
      distances.sort((a, b) => a.dist - b.dist);
      const neighbors = distances.slice(0, maxNeighbors);

      for (const n of neighbors) {
        // Only add if i < n.idx to avoid duplicates
        if (i < n.idx) {
          // Create arc points along the sphere surface between the two nodes
          const arcSegments = 12;
          const from = new THREE.Vector3(...positions[i]);
          const to = new THREE.Vector3(...positions[n.idx]);

          for (let s = 0; s < arcSegments; s++) {
            const t1 = s / arcSegments;
            const t2 = (s + 1) / arcSegments;

            // Slerp for great circle arc on sphere surface
            const p1 = new THREE.Vector3().copy(from).lerp(to, t1).normalize().multiplyScalar(shellRadius);
            const p2 = new THREE.Vector3().copy(from).lerp(to, t2).normalize().multiplyScalar(shellRadius);

            verts.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
          }
        }
      }
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    const mat = new THREE.LineBasicMaterial({
      color: "#999999",
      transparent: true,
      opacity: 0.15,
    });
    return new THREE.LineSegments(g, mat);
  }, [positions]);

  const radialLinesObj = useMemo(() => {
    const verts: number[] = [];
    for (const pos of positions) {
      verts.push(0, 0, 0, pos[0], pos[1], pos[2]);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    const mat = new THREE.LineBasicMaterial({
      color: "#999999",
      transparent: true,
      opacity: 0.06,
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
      <CoreShape />
      <primitive object={radialLinesObj} />
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