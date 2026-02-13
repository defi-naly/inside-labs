import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const ShimmerCard = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/40 transition-all duration-500",
        isHovered && "border-primary/30 shadow-2xl shadow-primary/10 -translate-y-1",
        onClick && "cursor-pointer",
        className
      )}
      style={{
        background: "linear-gradient(165deg, hsl(230 15% 7%) 0%, hsl(230 20% 4%) 100%)",
      }}
    >
      {/* Moving shimmer spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, hsl(355 85% 50% / 0.12), transparent 60%)`,
        }}
      />

      {/* Continuous shimmer sweep */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, hsl(355 85% 60% / 0.06) 45%, hsl(0 0% 100% / 0.04) 50%, hsl(355 85% 60% / 0.06) 55%, transparent 60%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 4s ease-in-out infinite",
        }}
      />

      {/* Border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0.3,
          background: `conic-gradient(from 180deg at ${mousePos.x}% ${mousePos.y}%, hsl(355 85% 50% / 0.15), transparent 30%, hsl(355 85% 50% / 0.08), transparent 60%)`,
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ShimmerCard;
