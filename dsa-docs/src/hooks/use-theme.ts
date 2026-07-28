import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

const KEY = "ipd-theme";
const STARLIGHT_KEY = "starlight-theme";

/** Dark-first theme controller with a premium cross-fade between palettes. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  const syncThemeState = useCallback(() => {
    const root = document.documentElement;
    const stored = (localStorage.getItem(STARLIGHT_KEY) || localStorage.getItem(KEY)) as Theme | null;
    const currentAttr = root.getAttribute("data-theme") as Theme | null;
    const isDarkClass = root.classList.contains("dark");
    
    let current: Theme = "dark";
    if (currentAttr === "light" || currentAttr === "dark") {
      current = currentAttr;
    } else if (stored === "light" || stored === "dark") {
      current = stored;
    } else if (!isDarkClass) {
      current = "light";
    }

    setTheme(current);
  }, []);

  useEffect(() => {
    syncThemeState();

    const observer = new MutationObserver(() => {
      syncThemeState();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });

    return () => observer.disconnect();
  }, [syncThemeState]);

  const apply = useCallback((next: Theme) => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    root.classList.toggle("dark", next === "dark");
    root.setAttribute("data-theme", next);
    localStorage.setItem(KEY, next);
    localStorage.setItem(STARLIGHT_KEY, next);
    setTheme(next);
    window.setTimeout(() => root.classList.remove("theme-transition"), 520);
  }, []);

  const toggle = useCallback(() => {
    const root = document.documentElement;
    const currentIsDark = root.classList.contains("dark") || root.getAttribute("data-theme") !== "light";
    apply(currentIsDark ? "light" : "dark");
  }, [apply]);

  return { theme, setTheme: apply, toggle };
}

/** Tracks pointer position inside an element and exposes it as --mx / --my. */
export function spotlightHandlers() {
  return {
    onMouseMove: (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    },
  };
}
