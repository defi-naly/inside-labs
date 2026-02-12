import { useRef, useEffect, useCallback } from "react";

interface Node {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  cluster: number;
}

const IntelligenceMesh = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  const createNetwork = useCallback((): Node[] => {
    const nodes: Node[] = [];
    // Create clusters spread across a wide field
    const clusterCenters = [
      { x: -2.5, y: -0.8, z: 0 },
      { x: -1.2, y: 0.6, z: -0.5 },
      { x: 0, y: -0.3, z: 0.3 },
      { x: 0.8, y: 0.8, z: -0.3 },
      { x: 1.8, y: -0.5, z: 0.2 },
      { x: 2.8, y: 0.3, z: -0.4 },
      { x: -0.5, y: -1.2, z: 0.5 },
      { x: 1.2, y: -1.0, z: -0.2 },
      { x: -1.8, y: 0.0, z: 0.4 },
      { x: 2.2, y: 1.0, z: 0.1 },
      { x: -0.8, y: 1.2, z: -0.6 },
      { x: 0.5, y: 0.0, z: -0.8 },
      { x: -2.0, y: -1.5, z: 0.2 },
      { x: 3.2, y: -0.2, z: -0.1 },
      { x: -3.0, y: 0.5, z: 0.3 },
    ];

    clusterCenters.forEach((center, ci) => {
      const count = 15 + Math.floor(Math.random() * 20);
      for (let i = 0; i < count; i++) {
        const spread = 0.5 + Math.random() * 0.4;
        nodes.push({
          x: center.x + (Math.random() - 0.5) * spread,
          y: center.y + (Math.random() - 0.5) * spread,
          z: center.z + (Math.random() - 0.5) * spread,
          vx: (Math.random() - 0.5) * 0.002,
          vy: (Math.random() - 0.5) * 0.002,
          vz: (Math.random() - 0.5) * 0.001,
          cluster: ci,
        });
      }
    });

    // Scatter bridge nodes between clusters
    for (let i = 0; i < 60; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * 7,
        y: (Math.random() - 0.5) * 3.5,
        z: (Math.random() - 0.5) * 1.5,
        vx: (Math.random() - 0.5) * 0.003,
        vy: (Math.random() - 0.5) * 0.003,
        vz: (Math.random() - 0.5) * 0.001,
        cluster: -1,
      });
    }

    return nodes;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    const nodes = createNetwork();
    const connectionDist = 0.7;
    const longConnectionDist = 1.4;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const project = (
      x: number,
      y: number,
      z: number,
      w: number,
      h: number
    ) => {
      const perspective = 4;
      const scale = perspective / (perspective + z);
      return {
        x: w / 2 + x * scale * w * 0.12,
        y: h / 2 + y * scale * h * 0.2,
        scale,
      };
    };

    // Data pulse particles traveling along connections
    const pulses: { fromIdx: number; toIdx: number; t: number; speed: number }[] = [];

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      time += 0.004;

      const mx = (mouseRef.current.x - 0.5) * 0.4;
      const my = (mouseRef.current.y - 0.5) * 0.15;

      // Update node positions with gentle drift
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;
        // Subtle breathing
        node.x += Math.sin(time + node.y * 2) * 0.0008;
        node.y += Math.cos(time * 0.7 + node.x * 1.5) * 0.0008;

        // Soft bounds
        if (Math.abs(node.x) > 4) node.vx *= -0.5;
        if (Math.abs(node.y) > 2.5) node.vy *= -0.5;
        if (Math.abs(node.z) > 1.2) node.vz *= -0.5;
      }

      // Project with slight rotation from mouse
      const projected = nodes.map((n) => {
        const cosY = Math.cos(mx);
        const sinY = Math.sin(mx);
        const rx = n.x * cosY - n.z * sinY;
        const rz = n.x * sinY + n.z * cosY;
        const cosX = Math.cos(my);
        const sinX = Math.sin(my);
        const ry = n.y * cosX - rz * sinX;
        const rz2 = n.y * sinX + rz * cosX;
        return { ...project(rx, ry, rz2, w, h), z: rz2 };
      });

      // Spawn random data pulses
      if (Math.random() < 0.08 && pulses.length < 30) {
        const fromIdx = Math.floor(Math.random() * nodes.length);
        // Find a nearby node
        let bestIdx = -1;
        let bestDist = Infinity;
        for (let j = 0; j < nodes.length; j++) {
          if (j === fromIdx) continue;
          const dx = nodes[fromIdx].x - nodes[j].x;
          const dy = nodes[fromIdx].y - nodes[j].y;
          const dz = nodes[fromIdx].z - nodes[j].z;
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d < longConnectionDist && d < bestDist) {
            bestDist = d;
            bestIdx = j;
          }
        }
        if (bestIdx >= 0) {
          pulses.push({
            fromIdx,
            toIdx: bestIdx,
            t: 0,
            speed: 0.01 + Math.random() * 0.02,
          });
        }
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dz = nodes[i].z - nodes[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          const isShort = dist < connectionDist;
          const isLong =
            dist < longConnectionDist &&
            dist >= connectionDist &&
            (nodes[i].cluster !== nodes[j].cluster || nodes[i].cluster === -1);

          if (isShort || isLong) {
            const maxD = isShort ? connectionDist : longConnectionDist;
            const baseOpacity = isShort ? 0.12 : 0.04;
            const opacity = (1 - dist / maxD) * baseOpacity;
            const avgZ = (projected[i].z + projected[j].z) / 2;
            const depthFade = Math.max(0.1, (avgZ + 2) / 4);

            if (isLong) {
              // Long-range connections — red tinted
              ctx.strokeStyle = `rgba(225, 29, 72, ${opacity * depthFade})`;
              ctx.lineWidth = 0.3;
              ctx.setLineDash([2, 4]);
            } else {
              ctx.strokeStyle = `rgba(160, 160, 160, ${opacity * depthFade})`;
              ctx.lineWidth = 0.5;
              ctx.setLineDash([]);
            }

            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      }

      // Draw pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.t += pulse.speed;
        if (pulse.t > 1) {
          pulses.splice(p, 1);
          continue;
        }
        const a = projected[pulse.fromIdx];
        const b = projected[pulse.toIdx];
        const px = a.x + (b.x - a.x) * pulse.t;
        const py = a.y + (b.y - a.y) * pulse.t;
        const glow = Math.sin(pulse.t * Math.PI);

        ctx.fillStyle = `rgba(225, 29, 72, ${0.8 * glow})`;
        ctx.beginPath();
        ctx.arc(px, py, 2.5 * glow, 0, Math.PI * 2);
        ctx.fill();

        // Trail
        ctx.fillStyle = `rgba(225, 29, 72, ${0.2 * glow})`;
        ctx.beginPath();
        ctx.arc(px, py, 6 * glow, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const depthFade = Math.max(0.1, (p.z + 2) / 4);
        const size = p.scale * 1.5;
        const isHub = nodes[i].cluster >= 0 && i % 18 === 0;
        const isBridge = nodes[i].cluster === -1;

        if (isHub) {
          // Hub nodes — larger, red glow
          const pulse = Math.sin(time * 2.5 + i) * 0.4 + 0.6;
          ctx.fillStyle = `rgba(225, 29, 72, ${0.12 * depthFade * pulse})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 8, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(225, 29, 72, ${0.7 * depthFade})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 1.8, 0, Math.PI * 2);
          ctx.fill();

          // Ring
          ctx.strokeStyle = `rgba(225, 29, 72, ${0.2 * depthFade})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 4 + Math.sin(time * 3 + i) * 2, 0, Math.PI * 2);
          ctx.stroke();
        } else if (isBridge) {
          // Bridge nodes — subtle
          ctx.fillStyle = `rgba(180, 180, 180, ${0.25 * depthFade})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Cluster nodes
          ctx.fillStyle = `rgba(140, 140, 140, ${0.3 * depthFade})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [createNetwork]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ touchAction: "none" }}
    />
  );
};

export default IntelligenceMesh;