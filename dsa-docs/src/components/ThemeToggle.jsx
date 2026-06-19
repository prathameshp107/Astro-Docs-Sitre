import { useState, useEffect, useCallback } from 'react';

/**
 * Global theme manager — reads/writes `data-theme` on <html> and localStorage.
 * Import and call `initTheme()` once per page to prevent flash.
 */
export function initTheme() {
  const stored = localStorage.getItem('starlight-theme');
  const html = document.documentElement;
  if (stored === 'light' || stored === 'dark') {
    html.setAttribute('data-theme', stored);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    localStorage.setItem('starlight-theme', prefersDark ? 'dark' : 'light');
  }
}

export function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') !== 'light';
  const next = isDark ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('starlight-theme', next);
}

export function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || 'dark';
}

export default function ThemeToggle({ className = '', size = 16, showLabel = false }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(getCurrentTheme() !== 'light');
  }, []);

  const toggle = useCallback(() => {
    toggleTheme();
    setIsDark(getCurrentTheme() !== 'light');
  }, []);

  // Listen for theme changes from other sources (e.g. Sidebar.astro)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(getCurrentTheme() !== 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return (
    <button
      onClick={toggle}
      className={className}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label="Toggle theme"
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.5rem', borderRadius: '10px', border: 'none', background: 'transparent', cursor: 'pointer', color: 'inherit', transition: 'all 0.2s ease', flexShrink: 0 }}
    >
      {isDark ? (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
      {showLabel && <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{isDark ? 'Light' : 'Dark'}</span>}
    </button>
  );
}
