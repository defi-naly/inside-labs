import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface SphereNode {
  position: [number, number, number];
  radius: number;
  rotationSpeed: [number, number];
}

const WireSphere = ({ position, radius, rotationSpeed }: SphereNode) => {
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
      <meshBasicMaterial wireframe color="#888888" transparent opacity={0.18} />
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
      color: "#aaaaaa",
      transparent: true,
      opacity: 0.06,
    });
    return new THREE.Line(g, mat);
  }, [start, end]);

  return <primitive object={lineObj} />;
};

const NetworkScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Generate ~60 spheres arranged on a large spherical shell
  const spheres = useMemo<SphereNode[]>(() => {
    const nodes: SphereNode[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const count = 55;
    const shellRadius = 6;

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = goldenAngle * i;

      const r = shellRadius + (Math.random() - 0.5) * 2;
      const x = r * Math.sin(inclination) * Math.cos(azimuth);
      const y = r * Math.sin(inclination) * Math.sin(azimuth);
      const z = r * Math.cos(inclination);

      const radius = 0.25 + Math.random() * 0.55;
      nodes.push({
        position: [x, y, z],
        radius,
        rotationSpeed: [
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2,
        ],
      });
    }
    return nodes;
  }, []);

  const connections = useMemo(() => {
    const lines: {
      start: [number, number, number];
      end: [number, number, number];
    }[] = [];
    const maxDist = 5;

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
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.04;
      groupRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.025) * 0.08;
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
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI * 0.75}
        minPolarAngle={Math.PI * 0.25}
      />
    </Canvas>
  );
};

export default IntelligenceMesh;