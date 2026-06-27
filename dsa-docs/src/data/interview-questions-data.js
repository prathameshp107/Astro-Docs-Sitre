// ─── Barrel export — re-exports from per-technology files ──────────────
import { JS_QUESTIONS } from './interview-questions/js.js';
import { REACT_QUESTIONS } from './interview-questions/react.js';
import { NEXT_QUESTIONS } from './interview-questions/next.js';

export { JS_QUESTIONS, REACT_QUESTIONS, NEXT_QUESTIONS };

export const TABS = [
  { id: "js", label: "JavaScript", accent: "#f7df1e", dim: "#3a3308", questions: JS_QUESTIONS },
  { id: "react", label: "React", accent: "#61dafb", dim: "#0b2f3a", questions: REACT_QUESTIONS },
  { id: "next", label: "Next.js", accent: "#ffffff", dim: "#1e2030", questions: NEXT_QUESTIONS },
];

export const STORAGE_KEY = "fiq_done";
