import { useEffect, useRef, useState } from "react";

/**
 * Scroll-driven scene staging.
 *
 * Returns a monotonically increasing stage index (0…count) derived from how far
 * the referenced element has travelled through the viewport, so a section can
 * choreograph its own beats as the reader scrolls into it.
 */
export function useScrollStage<T extends HTMLElement>(count: number) {
  const ref = useRef<T>(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setStage(count);
      return;
    }

    let frame = 0;
    const measure = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const span = rect.height * 0.75 + vh * 0.35;
      const p = (vh * 0.9 - rect.top) / span;
      const next = Math.max(0, Math.min(count, Math.round(p * count)));
      setStage((prev) => (next > prev ? next : prev));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count]);

  return { ref, stage };
}

/** Class helper: adds `on` once the scene has reached `at`. */
export const at = (stage: number, step: number, cls = "") =>
  `${cls} ${stage >= step ? "on" : ""}`.trim();
