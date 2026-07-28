import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Layered product composition.
 *
 * A device shot sits at the back; UI fragments float above it at different
 * depths. The stack tilts subtly toward the pointer so the layers separate,
 * and each layer lifts into place on a stagger once the stack is in view.
 */
export function Stack({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLive(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLive(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ perspective: "1400px" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setTilt({
          x: ((e.clientY - r.top) / r.height - 0.5) * -6,
          y: ((e.clientX - r.left) / r.width - 0.5) * 8,
        });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div
        data-live={live ? "on" : "off"}
        className="group/stack relative transition-transform duration-500 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * One floating fragment in a `Stack`. `depth` pushes it toward the reader,
 * `at` positions it, `delay` staggers the entrance.
 */
export function Layer({
  children,
  at,
  depth = 40,
  delay = 0,
  from = "up",
  className = "",
  width,
}: {
  children: ReactNode;
  at: CSSProperties;
  depth?: number;
  delay?: number;
  from?: "up" | "left" | "right";
  className?: string;
  width?: string;
}) {
  const offset =
    from === "left" ? "-28px, 14px" : from === "right" ? "28px, 14px" : "0px, 26px";

  return (
    <div
      className={`layer-in absolute z-10 ${className}`}
      style={{
        ...at,
        width,
        ["--layer-depth" as string]: `${depth}px`,
        ["--layer-offset" as string]: offset,
        transitionDelay: `${delay}ms`,
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="rounded-xl border border-border bg-card shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur-[2px]">
        {children}
      </div>
    </div>
  );
}

/** Small labelled header used inside floating layers. */
export function LayerHead({ children, dot }: { children: ReactNode; dot?: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-border px-3.5 py-2">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: dot ?? "var(--color-accent)" }}
        aria-hidden="true"
      />
      <span className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
        {children}
      </span>
    </div>
  );
}
