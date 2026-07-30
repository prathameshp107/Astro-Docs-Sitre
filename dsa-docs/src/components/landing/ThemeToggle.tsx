import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="group relative flex h-9 w-16 items-center rounded-full border border-border bg-surface px-1 transition-colors hover:border-border-strong"
    >
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: dark ? "translateX(28px)" : "translateX(0)" }}
      >
        {dark ? (
          <Moon className="h-3.5 w-3.5" strokeWidth={1.75} />
        ) : (
          <Sun className="h-3.5 w-3.5" strokeWidth={1.75} />
        )}
      </span>
      <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-2.5 text-muted-foreground/50">
        <Sun className="h-3 w-3" strokeWidth={1.75} />
        <Moon className="h-3 w-3" strokeWidth={1.75} />
      </span>
    </button>
  );
}
