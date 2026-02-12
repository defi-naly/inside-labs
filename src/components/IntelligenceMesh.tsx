import { useRef, useEffect, useCallback } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

const IntelligenceMesh = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  const createSpherePoints = useCallback((count: number, radius: number): Point3D[] => {
    const points: Point3D[] = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < count; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      points.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
      });
    }
    return points;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    const points = createSpherePoints(200, 1);
    const connectionDistance = 0.55;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const project = (p: Point3D, w: number, h: number): { x: number; y: number; scale: number } => {
      const perspective = 3;
      const scale = perspective / (perspective + p.z);
      return {
        x: w / 2 + p.x * scale * w * 0.35,
        y: h / 2 + p.y * scale * h * 0.35,
        scale,
      };
    };

    const rotateY = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return { x: p.x * cos - p.z * sin, y: p.y, z: p.x * sin + p.z * cos };
    };

    const rotateX = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return { x: p.x, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos };
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      time += 0.003;

      const mouseInfluenceX = (mouseRef.current.x - 0.5) * 0.3;
      const mouseInfluenceY = (mouseRef.current.y - 0.5) * 0.3;

      // Rotate and breathe
      const transformedPoints = points.map((p) => {
        // Organic breathing
        const breathe = 1 + Math.sin(time * 2 + p.x * 3 + p.y * 2) * 0.04;
        let tp = { x: p.x * breathe, y: p.y * breathe, z: p.z * breathe };
        tp = rotateY(tp, time + mouseInfluenceX);
        tp = rotateX(tp, Math.sin(time * 0.5) * 0.2 + mouseInfluenceY);
        return tp;
      });

      const projected = transformedPoints.map((p) => project(p, w, h));

      // Draw connections
      for (let i = 0; i < transformedPoints.length; i++) {
        for (let j = i + 1; j < transformedPoints.length; j++) {
          const dx = transformedPoints[i].x - transformedPoints[j].x;
          const dy = transformedPoints[i].y - transformedPoints[j].y;
          const dz = transformedPoints[i].z - transformedPoints[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.15;
            const avgZ = (transformedPoints[i].z + transformedPoints[j].z) / 2;
            const depthFade = Math.max(0, (avgZ + 1.5) / 3);

            // Red tint for some connections based on position
            const redInfluence = Math.abs(Math.sin(i * 0.1 + time));
            const r = Math.round(120 + redInfluence * 100);
            const g = Math.round(120 - redInfluence * 40);
            const b = Math.round(120 - redInfluence * 40);

            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * depthFade})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw points
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const tp = transformedPoints[i];
        const depthFade = Math.max(0, (tp.z + 1.5) / 3);
        const size = p.scale * 1.8;

        // Some nodes glow red
        const pulse = Math.sin(time * 3 + i * 0.5) * 0.5 + 0.5;
        const isHighlight = i % 12 === 0;

        if (isHighlight) {
          // Red glow nodes
          ctx.fillStyle = `rgba(225, 29, 72, ${0.6 * depthFade * pulse})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(225, 29, 72, ${0.9 * depthFade})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 1.2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const opacity = 0.3 * depthFade + 0.05;
          ctx.fillStyle = `rgba(150, 150, 150, ${opacity})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 0.6, 0, Math.PI * 2);
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
  }, [createSpherePoints]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ touchAction: "none" }}
    />
  );
};

export default IntelligenceMesh;