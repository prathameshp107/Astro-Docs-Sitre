import { useEffect, useRef, useState } from "react";

/**
 * Pinned scene driver.
 *
 * Attach `ref` to a tall wrapper whose child is `position: sticky`. As the
 * reader scrolls through the wrapper, `progress` runs 0 → 1 and `stage`
 * advances 1 → count, so a section can play a sequence of beats in place
 * instead of just sliding past.
 */
export function useScrollScene<T extends HTMLElement>(count: number) {
  const ref = useRef<T>(null);
  const [stage, setStage] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setStage(count);
      setProgress(1);
      return;
    }

    let frame = 0;
    const measure = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const p = Math.max(0, Math.min(1, -rect.top / travel));
      setProgress(p);
      const next = Math.max(1, Math.min(count, Math.floor(p * (count + 0.35)) + 1));
      setStage(next);
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

  return { ref, stage, progress };
}
