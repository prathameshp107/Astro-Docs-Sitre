import { useState, useEffect, useCallback } from 'react';
import { FiSun, FiMoon } from "react-icons/fi";

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
        <FiSun size={size} />
      ) : (
        <FiMoon size={size} />
      )}
      {showLabel && <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{isDark ? 'Light' : 'Dark'}</span>}
    </button>
  );
}
