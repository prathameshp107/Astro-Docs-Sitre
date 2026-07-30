import { useState, useEffect, useCallback } from 'react';
import { Sun, Moon } from 'lucide-react';

/**
 * Global theme manager — reads/writes `data-theme` and `dark` class on <html> and localStorage.
 * Import and call `initTheme()` once per page to prevent flash.
 */
export function initTheme() {
  const stored = localStorage.getItem('starlight-theme') || localStorage.getItem('ipd-theme');
  const html = document.documentElement;
  if (stored === 'light' || stored === 'dark') {
    html.setAttribute('data-theme', stored);
    html.classList.toggle('dark', stored === 'dark');
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const mode = prefersDark ? 'dark' : 'light';
    html.setAttribute('data-theme', mode);
    html.classList.toggle('dark', prefersDark);
    localStorage.setItem('starlight-theme', mode);
    localStorage.setItem('ipd-theme', mode);
  }
}

export function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark') || html.getAttribute('data-theme') !== 'light';
  const next = isDark ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  html.classList.toggle('dark', next === 'dark');
  localStorage.setItem('starlight-theme', next);
  localStorage.setItem('ipd-theme', next);
}

export function getCurrentTheme() {
  const html = document.documentElement;
  return html.classList.contains('dark') || html.getAttribute('data-theme') !== 'light' ? 'dark' : 'light';
}

export default function ThemeToggle({ className = '' }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(getCurrentTheme() === 'dark');

    const observer = new MutationObserver(() => {
      setIsDark(getCurrentTheme() === 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    return () => observer.disconnect();
  }, []);

  const toggle = useCallback(() => {
    toggleTheme();
    setIsDark(getCurrentTheme() === 'dark');
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`group relative flex h-8 w-14 shrink-0 items-center rounded-full border border-border bg-muted/60 p-0.5 transition-colors hover:border-border-strong hover:bg-muted ${className}`}
    >
      <span
        className="flex h-6.5 w-6.5 items-center justify-center rounded-full border border-border/80 bg-background text-foreground shadow-sm transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: isDark ? 'translateX(22px)' : 'translateX(0)' }}
      >
        {isDark ? (
          <Moon className="h-3 w-3 text-indigo-400" strokeWidth={2} />
        ) : (
          <Sun className="h-3 w-3 text-amber-500" strokeWidth={2} />
        )}
      </span>
      <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 text-muted-foreground/40">
        <Sun className="h-3 w-3" strokeWidth={2} />
        <Moon className="h-3 w-3" strokeWidth={2} />
      </span>
    </button>
  );
}
