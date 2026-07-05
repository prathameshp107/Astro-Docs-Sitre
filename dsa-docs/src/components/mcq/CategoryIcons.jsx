/**
 * Real brand/technology SVG icons for MCQ Hub categories.
 * Uses react-icons/si (Simple Icons) — all official brand logos.
 * For categories without a Simple Icon, falls back to a clean custom SVG.
 */

import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiAngular,
  SiPython,
  SiHtml5,
  SiCss,
  SiMysql,
  SiMongodb,
  SiGit,
} from 'react-icons/si';

// Custom SVGs for categories without Simple Icons
function SystemDesignIcon({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="6" height="6" rx="1.5"/>
      <rect x="16" y="3" width="6" height="6" rx="1.5"/>
      <rect x="9" y="15" width="6" height="6" rx="1.5"/>
      <path d="M5 9v3M19 9v3M5 12h14M12 15v-3"/>
    </svg>
  );
}

function DataStructuresIcon({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2.5"/>
      <circle cx="5" cy="17" r="2.5"/>
      <circle cx="19" cy="17" r="2.5"/>
      <path d="M12 7.5v3M10.1 9.4 6.4 15M13.9 9.4l3.7 5.6"/>
    </svg>
  );
}

function AlgorithmsIcon({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  );
}

function OOPIcon({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="5" rx="2"/>
      <rect x="3" y="10" width="8" height="11" rx="2"/>
      <rect x="13" y="10" width="8" height="5" rx="2"/>
      <rect x="13" y="17" width="8" height="4" rx="2"/>
    </svg>
  );
}

// Map category ID → { Component, color }
export const CATEGORY_ICONS = {
  javascript:       { Component: SiJavascript,       color: '#f7df1e' },
  typescript:       { Component: SiTypescript,       color: '#3178c6' },
  react:            { Component: SiReact,            color: '#61dafb' },
  nodejs:           { Component: SiNodedotjs,        color: '#339933' },
  angular:          { Component: SiAngular,          color: '#dd0031' },
  python:           { Component: SiPython,           color: '#3776AB' },
  html:             { Component: SiHtml5,            color: '#e34f26' },
  css:              { Component: SiCss,              color: '#1572b6' },
  sql:              { Component: SiMysql,            color: '#f59e0b' },
  mongodb:          { Component: SiMongodb,          color: '#47a248' },
  git:              { Component: SiGit,              color: '#f05032' },
  'system-design':  { Component: SystemDesignIcon,   color: '#a78bfa' },
  'data-structures':{ Component: DataStructuresIcon, color: '#6366f1' },
  algorithms:       { Component: AlgorithmsIcon,     color: '#ec4899' },
  oops:             { Component: OOPIcon,            color: '#a855f7' },
};

/**
 * Renders the real brand icon for a given category ID.
 * Falls back to emoji if no icon is registered.
 */
export function CategoryIcon({ categoryId, size = 22, className = '' }) {
  const entry = CATEGORY_ICONS[categoryId];
  if (!entry) return null;
  const { Component, color } = entry;
  return (
    <Component
      size={size}
      style={{ color, flexShrink: 0 }}
      className={className}
      aria-hidden="true"
    />
  );
}
