import { useState, useEffect, useMemo, useRef, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiNodedotjs,
  SiPython,
  SiCss,
  SiHtml5,
  SiMongodb,
  SiMysql,
  SiRedis,
  SiDocker,
  SiOpenai,
} from 'react-icons/si';
import { LuBinary, LuBoxes } from 'react-icons/lu';
import { TABS, STORAGE_KEY, TOTAL_QUESTIONS } from '../../data/interview-questions-data.js';
import '../../styles/sketch-visualizer.css';

/* ─── Accent colors per tab ─── */
const ACCENT = {
  js: '#f7df1e', react: '#61dafb', next: '#ffffff', angular: '#dd0031',
  nodejs: '#68a063', python: '#306998', ai: '#ff6b35', css: '#1572b6', html: '#e34f26',
  dsa: '#8b5cf6', mongodb: '#47a248', mysql: '#4479a1', redis: '#dc382d',
  docker: '#2496ed', oops: '#ec4899',
};

/* ─── Real Official Brand Icons per tab ─── */
const TECH_ICON_MAP = {
  js: { Icon: SiJavascript, color: '#F7DF1E' },
  react: { Icon: SiReact, color: '#61DAFB' },
  next: { Icon: SiNextdotjs, color: 'var(--sketch-text)' },
  angular: { Icon: SiAngular, color: '#DD0031' },
  nodejs: { Icon: SiNodedotjs, color: '#68A063' },
  python: { Icon: SiPython, color: '#3776AB' },
  ai: { Icon: SiOpenai, color: '#10A37F' },
  css: { Icon: SiCss, color: '#1572B6' },
  html: { Icon: SiHtml5, color: '#E34F26' },
  dsa: { Icon: LuBinary, color: '#A78BFA' },
  mongodb: { Icon: SiMongodb, color: '#47A248' },
  mysql: { Icon: SiMysql, color: '#4479A1' },
  redis: { Icon: SiRedis, color: '#DC382D' },
  docker: { Icon: SiDocker, color: '#2496ED' },
  oops: { Icon: LuBoxes, color: '#EC4899' },
};

function TechIcon({ id, size = 20, className = "" }) {
  const item = TECH_ICON_MAP[id];
  if (!item) return <span>📁</span>;
  const { Icon, color } = item;
  return <Icon size={size} className={`inline-block flex-shrink-0 ${className}`} style={{ color }} />;
}

function getInitialTab() {
  if (typeof window === 'undefined') return 'js';
  const tabParam = new URLSearchParams(window.location.search).get('tab');
  return TABS.some((t) => t.id === tabParam) ? tabParam : 'js';
}

export default function InterviewQuestionHub() {
  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [search, setSearch] = useState('');
  const [doneMap, setDoneMap] = useState({});
  const [mounted, setMounted] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showOverview, setShowOverview] = useState(true);
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [quizMode, setQuizMode] = useState(false);
  const [quizQueue, setQuizQueue] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const searchRef = useRef(null);
  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setDoneMap(JSON.parse(raw));
    } catch { /* ignore */ }
    setMounted(true);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const saveDone = (newMap) => {
    setDoneMap(newMap);
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newMap)); } catch { /* ignore */ }
  };

  const toggleDone = (id, e) => {
    e.stopPropagation();
    const next = { ...doneMap };
    if (next[id]) delete next[id];
    else next[id] = true;
    saveDone(next);
  };

  const toggleExpand = (id) => {
    setSelectedCard(selectedCard === id ? null : id);
  };

  const startQuiz = () => {
    if (!activeConfig) return;
    const incomplete = [];
    activeConfig.questions.forEach((q, i) => {
      const id = `${activeTab}-${i}`;
      if (!doneMap[id] && hasAnswer(q)) {
        incomplete.push({ q, index: i });
      }
    });
    // Shuffle
    for (let i = incomplete.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [incomplete[i], incomplete[j]] = [incomplete[j], incomplete[i]];
    }
    setQuizQueue(incomplete);
    setQuizIndex(0);
    setShowAnswer(false);
    setQuizFinished(false);
    setQuizMode(true);
  };

  const quizNext = (markDone) => {
    if (markDone && quizQueue[quizIndex]) {
      const item = quizQueue[quizIndex];
      const id = `${activeTab}-${item.index}`;
      const next = { ...doneMap, [id]: true };
      setDoneMap(next);
      try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
    }
    if (quizIndex + 1 >= quizQueue.length) {
      setQuizFinished(true);
    } else {
      setQuizIndex(i => i + 1);
      setShowAnswer(false);
    }
  };

  const exitQuiz = () => {
    setQuizMode(false);
    setQuizQueue([]);
    setQuizIndex(0);
    setShowAnswer(false);
    setQuizFinished(false);
  };

  const activeConfig = TABS.find(t => t.id === activeTab);
  const activeAccent = ACCENT[activeTab] || '#f7df1e';

  const progress = useMemo(() => {
    const out = {};
    TABS.forEach(tab => {
      let count = 0;
      tab.questions.forEach((_, i) => {
        if (doneMap[`${tab.id}-${i}`]) count++;
      });
      out[tab.id] = { count, total: tab.questions.length, pct: tab.questions.length > 0 ? (count / tab.questions.length * 100) : 0 };
    });
    return out;
  }, [doneMap]);

  const totalDone = useMemo(() =>
    Object.values(progress).reduce((s, p) => s + p.count, 0),
  [progress]);

  const filtered = useMemo(() => {
    if (!activeConfig) return [];
    let items = activeConfig.questions;
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(([text]) => text.toLowerCase().includes(q));
    }
    if (difficultyFilter !== 'all') {
      items = items.filter(([, d]) => d === difficultyFilter);
    }
    return items;
  }, [activeConfig, search, difficultyFilter]);

  const difficultyCounts = useMemo(() => {
    if (!activeConfig) return { easy: 0, med: 0, hard: 0 };
    const counts = { easy: 0, med: 0, hard: 0 };
    activeConfig.questions.forEach(([, d]) => {
      if (counts[d] !== undefined) counts[d]++;
    });
    return counts;
  }, [activeConfig]);

  const hasAnswer = (q) => q.length >= 3 && q[2] && q[2].trim().length > 0;

  const diffClass = (d) => {
    if (d === 'hard') return 'iq-diff iq-diff-hard';
    if (d === 'med') return 'iq-diff iq-diff-med';
    return 'iq-diff iq-diff-easy';
  };

  const diffLabel = (d) => {
    if (d === 'hard') return 'Hard';
    if (d === 'med') return 'Medium';
    return 'Easy';
  };

  /* ─── Format answer text with inline code & code block highlighting ─── */
  function formatAnswer(text) {
    if (!text) return null;
    const segments = text.split(/(```[\s\S]*?```)/g);
    return segments.flatMap((segment, i) => {
      if (segment.startsWith('```') && segment.endsWith('```')) {
        const code = segment.slice(3, -3).replace(/^[a-zA-Z]+\n/, '');
        return [<pre key={i} className="iq-code-block"><code>{code}</code></pre>];
      }
      if (!segment.trim()) return [];
      return segment.split(/\n\n+/).map((para, j) => {
        const inlineParts = para.split(/(`[^`]+`)/g);
        const formatted = inlineParts.map((part, k) => {
          if (part.startsWith('`') && part.endsWith('`')) {
            return <code key={k} className="iq-inline-code">{part.slice(1, -1)}</code>;
          }
          if (part.includes('\n')) {
            return part.split('\n').map((line, li) => (
              <Fragment key={li}>
                {li > 0 && <br />}
                {line}
              </Fragment>
            ));
          }
          return part;
        });
        return <p key={`${i}-${j}`} className="iq-answer-para">{formatted}</p>;
      });
    });
  }

  if (!mounted) return null;

  const pct = progress[activeTab];

  return (
    <div className="iq-root">
      <style>{`
        /* ═══ Base ═══ */
        .iq-root {
          --iq-bg: var(--sketch-bg);
          --iq-surface: var(--sketch-bg-dim);
          --iq-surface2: var(--sketch-bg);
          --iq-surface3: var(--sketch-bg-dim);
          --iq-border: var(--sketch-border);
          --iq-border-light: var(--sketch-border);
          --iq-text: var(--sketch-text);
          --iq-muted: var(--sketch-text-muted);
          --iq-radius: 16px;
          color: var(--sketch-text);
          font-family: 'Patrick Hand', cursive, sans-serif;
          min-height: 100vh;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 28px 60px;
          position: relative;
        }
        .iq-root * { box-sizing: border-box; }

        /* ═══ Scrollbar ═══ */
        .iq-root ::-webkit-scrollbar { width: 5px; height: 5px; }
        .iq-root ::-webkit-scrollbar-track { background: transparent; }
        .iq-root ::-webkit-scrollbar-thumb { background: var(--iq-border); border-radius: 8px; }
        .iq-root ::-webkit-scrollbar-thumb:hover { background: var(--iq-border-light); }

        /* ═══ Ambient Glow ═══ */
        .iq-ambient {
          position: fixed;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 500px;
          background: radial-gradient(ellipse, rgba(247,223,30,0.06) 0%, rgba(97,218,251,0.03) 40%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* ═══ Header ═══ */
        .iq-header {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 56px 24px 40px;
        }
        .iq-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--iq-muted);
          border: 1px solid var(--iq-border);
          padding: 5px 14px;
          border-radius: 999px;
          margin-bottom: 24px;
          background: var(--iq-surface);
        }
        .iq-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          animation: iq-pulse 2s ease-in-out infinite;
        }
        @keyframes iq-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .iq-title {
          font-family: 'Architects Daughter', cursive, sans-serif;
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 14px;
          color: var(--sketch-text);
        }
        .iq-subtitle {
          font-family: 'Patrick Hand', cursive, sans-serif;
          color: var(--sketch-text-muted);
          font-size: 1.2rem;
          max-width: 540px;
          margin: 0 auto 32px;
          line-height: 1.6;
        }



        /* ═══ Category Overview Grid ═══ */
        .iq-overview {
          position: relative;
          z-index: 1;
          margin-bottom: 28px;
          font-family: 'Patrick Hand', cursive, sans-serif;
        }
        .iq-overview-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: var(--sketch-text-muted);
          font-size: 1.1rem;
          font-family: 'Patrick Hand', cursive, sans-serif;
          font-weight: 700;
          cursor: pointer;
          padding: 8px 0;
          margin-bottom: 12px;
          transition: color 0.2s;
        }
        .iq-overview-toggle:hover { color: var(--sketch-text); }
        .iq-overview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
          gap: 12px;
        }
        .iq-ov-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
          background: var(--sketch-bg-dim);
          border: 2px solid var(--sketch-border);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .iq-ov-item:hover {
          border-color: var(--sketch-accent-orange);
          background: var(--sketch-bg-dim);
          transform: rotate(-1deg) scale(1.03);
          box-shadow: 0 4px 14px rgba(249, 115, 22, 0.2);
        }
        .iq-ov-item.active {
          border-color: var(--sketch-accent-orange);
          background: color-mix(in srgb, var(--sketch-accent-orange) 15%, var(--sketch-bg-dim));
          box-shadow: 0 4px 16px rgba(249, 115, 22, 0.25);
          transform: scale(1.02);
        }
        .iq-ov-icon { font-size: 1.3rem; flex-shrink: 0; }
        .iq-ov-info { flex: 1; min-width: 0; }
        .iq-ov-name {
          font-size: 0.95rem;
          font-family: 'Architects Daughter', cursive, sans-serif;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 3px;
          color: var(--sketch-text);
        }
        .iq-ov-bar {
          height: 5px;
          background: var(--sketch-bg);
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid var(--sketch-border);
        }
        .iq-ov-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.6s ease;
        }
        .iq-ov-pct {
          font-size: 0.75rem;
          font-family: 'JetBrains Mono', monospace;
          color: var(--sketch-text-muted);
          flex-shrink: 0;
          font-weight: 700;
        }

        /* ═══ Sticky Nav Tabs ═══ */
        .iq-nav-wrap {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--sketch-bg);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 2px solid var(--sketch-border);
          margin: 0 -28px 24px;
          padding: 8px 28px;
        }
        .iq-nav-tabs {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          scrollbar-width: none;
          padding: 6px 0;
        }
        .iq-nav-tabs::-webkit-scrollbar { display: none; }
        .iq-nav-tab {
          flex-shrink: 0;
          padding: 8px 18px;
          background: transparent;
          border: 2px solid transparent;
          border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
          color: var(--sketch-text-muted);
          font-family: 'Patrick Hand', cursive, sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
        }
        .iq-nav-tab:hover {
          color: var(--sketch-text);
          border-color: var(--sketch-border);
          transform: rotate(-1deg);
        }
        .iq-nav-tab.active {
          color: #ffffff !important;
          background: var(--sketch-accent-orange);
          border-color: #f59e0b;
          box-shadow: 0 4px 14px rgba(249, 115, 22, 0.3);
          transform: scale(1.04);
        }
        .iq-nav-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .iq-nav-progress {
          font-size: 0.75rem;
          font-family: 'JetBrains Mono', monospace;
          opacity: 0.8;
          margin-left: 2px;
        }

        /* ═══ Search ═══ */
        .iq-search-wrap {
          position: relative;
          z-index: 1;
          padding: 4px 0 12px;
          font-family: 'Patrick Hand', cursive, sans-serif;
        }
        .iq-search {
          width: 100%;
          background: var(--sketch-bg-dim);
          border: 2px solid var(--sketch-border);
          border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
          color: var(--sketch-text);
          font-family: 'Patrick Hand', cursive, sans-serif;
          font-size: 1.15rem;
          padding: 12px 44px 12px 48px;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
          box-sizing: border-box;
        }
        .iq-search:focus {
          border-color: var(--sketch-accent-orange);
          box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.2);
        }
        .iq-search::placeholder { color: var(--sketch-text-muted); }
        .iq-search-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--sketch-text-muted);
          pointer-events: none;
        }
        .iq-search-clear {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--sketch-text-muted);
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .iq-search-clear:hover { color: var(--sketch-text); }
        .iq-search-hint {
          position: absolute;
          right: 44px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.7rem;
          color: var(--sketch-accent-orange);
          background: var(--sketch-bg);
          padding: 2px 8px;
          border-radius: 6px;
          border: 1px solid var(--sketch-border);
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
        }

        /* ═══ Difficulty Filter Bar ═══ */
        .iq-filter-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 0 16px;
          flex-wrap: wrap;
          font-family: 'Patrick Hand', cursive, sans-serif;
        }
        .iq-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 16px;
          border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
          border: 2px solid var(--sketch-border);
          background: var(--sketch-bg-dim);
          color: var(--sketch-text-muted);
          font-family: 'Patrick Hand', cursive, sans-serif;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .iq-filter-btn:hover {
          border-color: var(--sketch-text);
          color: var(--sketch-text);
          transform: rotate(-1deg);
        }
        .iq-filter-btn.active-all {
          background: var(--sketch-text);
          color: var(--sketch-bg);
          border-color: var(--sketch-text);
        }
        .iq-filter-btn.active-easy {
          background: rgba(34,197,94,0.2);
          border-color: #22c55e;
          color: #22c55e;
        }
        .iq-filter-btn.active-med {
          background: rgba(251,146,60,0.2);
          border-color: #fb923c;
          color: #fb923c;
        }
        .iq-filter-btn.active-hard {
          background: rgba(239,68,68,0.2);
          border-color: #f87171;
          color: #f87171;
        }
        .iq-filter-count {
          font-size: 0.8rem;
          font-family: 'JetBrains Mono', monospace;
          opacity: 0.8;
          font-weight: 700;
        }
        .iq-practice-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
          border: 2px solid #f59e0b;
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
          font-family: 'Architects Daughter', cursive, sans-serif;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-left: auto;
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
        }
        .iq-practice-btn:hover {
          transform: scale(1.04) rotate(-1deg);
          background: #f59e0b;
          color: #000000;
        }

        /* ═══ Question Cards ═══ */
        .iq-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-family: 'Patrick Hand', cursive, sans-serif;
        }
        .iq-card {
          background: var(--sketch-bg-dim);
          border: 2px solid var(--sketch-border);
          border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        .iq-card:hover {
          background: var(--sketch-bg-dim);
          border-color: var(--sketch-accent-orange);
          transform: rotate(-0.5deg) translateY(-2px);
          box-shadow: 0 8px 24px rgba(249, 115, 22, 0.18);
        }
        .iq-card.done {
          opacity: 0.7;
          border-color: #22c55e;
          background: color-mix(in srgb, #22c55e 8%, var(--sketch-bg-dim));
        }
        .iq-card.expanded {
          border-color: var(--sketch-accent-orange);
          background: var(--sketch-bg-dim);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
        }
        .iq-card-row {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
        }
        .iq-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          font-weight: 700;
          min-width: 32px;
          color: var(--sketch-accent-orange);
          flex-shrink: 0;
        }
        .iq-card.done .iq-num { color: #22c55e; }
        .iq-text {
          font-family: 'Architects Daughter', cursive, sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--sketch-text);
          flex: 1;
          line-height: 1.4;
        }
        .iq-card.done .iq-text { text-decoration: line-through; text-decoration-color: rgba(34,197,94,0.5); }

        .iq-check {
          width: 26px; height: 26px;
          border: 2px solid var(--sketch-border);
          border-radius: 8px;
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
          cursor: pointer;
        }
        .iq-card:hover .iq-check { border-color: var(--sketch-accent-orange); }
        .iq-card.done .iq-check {
          background: #22c55e;
          border-color: #22c55e;
          box-shadow: 0 0 12px rgba(34,197,94,0.4);
        }
        .iq-check svg {
          opacity: 0;
          transition: opacity 0.2s;
        }
        .iq-card.done .iq-check svg { opacity: 1; }
        .iq-expand-icon {
          width: 24px; height: 24px;
          flex-shrink: 0;
          color: var(--sketch-text-muted);
          transition: transform 0.3s ease, color 0.2s;
          display: flex; align-items: center; justify-content: center;
        }
        .iq-card.expanded .iq-expand-icon { transform: rotate(180deg); color: var(--sketch-accent-orange); }

        /* ═══ Answer Panel ═══ */
        .iq-answer {
          overflow: hidden;
        }
        .iq-answer-inner {
          padding: 20px;
          border-top: 2px dashed var(--sketch-border);
          margin-top: 16px;
          background: var(--sketch-bg);
          border-radius: 16px;
          position: relative;
        }
        .iq-answer-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--sketch-accent-orange);
          margin-bottom: 14px;
          padding: 4px 12px;
          border-radius: 8px;
          background: rgba(249, 115, 22, 0.15);
          border: 1px solid rgba(249, 115, 22, 0.3);
          width: fit-content;
        }
        .iq-answer-label svg { width: 14px; height: 14px; }
        .iq-answer-text {
          color: var(--sketch-text);
          font-family: 'Patrick Hand', cursive, sans-serif;
        }
        .iq-answer-para {
          margin: 0 0 12px;
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--sketch-text);
        }
        .iq-answer-para:last-child {
          margin-bottom: 0;
        }
        .iq-inline-code {
          background: var(--sketch-bg-dim);
          color: var(--sketch-accent-orange);
          padding: 0.15em 0.5em;
          border-radius: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85em;
          font-weight: 700;
          border: 1px solid var(--sketch-border);
        }
        .iq-code-block {
          margin: 14px 0;
          padding: 16px;
          background: #121110;
          border: 2px solid var(--sketch-border);
          border-radius: 12px;
          overflow-x: auto;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          line-height: 1.65;
          color: #fde68a;
          white-space: pre;
          tab-size: 2;
        }
        .iq-code-block code {
          font-family: inherit;
          color: inherit;
          background: none;
          padding: 0;
          border: none;
        }
        .iq-no-answer {
          padding: 24px 20px;
          font-size: 1rem;
          color: var(--sketch-text-muted);
          font-style: italic;
          text-align: center;
          border-top: 2px dashed var(--sketch-border);
          margin-top: 14px;
        }

        .iq-diff {
          font-size: 0.75rem;
          padding: 4px 12px;
          border-radius: 999px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          flex-shrink: 0;
          text-transform: uppercase;
        }
        .iq-diff-hard  { background: rgba(244,63,94,0.2); color: #f43f5e; border: 1px solid rgba(244,63,94,0.4); }
        .iq-diff-med   { background: rgba(251,146,60,0.2); color: #fb923c; border: 1px solid rgba(251,146,60,0.4); }
        .iq-diff-easy  { background: rgba(34,197,94,0.2);  color: #22c55e; border: 1px solid rgba(34,197,94,0.4); }

        /* Hidden by search */
        .iq-card.hidden { display: none; }

        /* ═══ No Results ═══ */
        .iq-empty {
          text-align: center;
          padding: 64px 24px;
          color: var(--sketch-text-muted);
          font-family: 'Patrick Hand', cursive, sans-serif;
        }
        .iq-empty-icon { font-size: 3rem; margin-bottom: 12px; }
        .iq-empty-text { font-size: 1.5rem; font-family: 'Architects Daughter', cursive, sans-serif; margin-bottom: 6px; }
        .iq-empty-hint { font-size: 1.1rem; opacity: 0.8; }

        /* ═══ Responsive ═══ */
        @media (max-width: 768px) {
          .iq-root { padding: 0 16px 80px; }
          .iq-header { padding: 40px 16px 32px; }
          .iq-stats { gap: 24px; }
          .iq-stat + .iq-stat::before { left: -12px; height: 24px; }
          .iq-stat-num { font-size: 1.5rem; }
          .iq-overview-grid { grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); }
          .iq-nav-wrap { margin: 0 -16px; padding: 0 16px; }
          .iq-text { font-size: 0.82rem; }
          .iq-nav-tab { padding: 8px 12px; font-size: 0.75rem; }
          .iq-search-hint { display: none; }
          .iq-ov-item { padding: 8px 10px; }
        }
        @media (max-width: 480px) {
          .iq-stats { gap: 16px; flex-direction: column; align-items: center; }
          .iq-stat + .iq-stat::before { display: none; }
          .iq-overview-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      {/* Ambient glow */}
      <div className="iq-ambient" />

      {/* ═══ Hand-Drawn Hero Header Banner ═══ */}
      <motion.header
        className="sketch-border bg-[var(--sketch-bg-dim)] p-8 md:p-10 rounded-3xl mb-10 shadow-2xl relative overflow-hidden font-sketch border-2 border-[var(--sketch-border)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b-2 border-dashed border-[var(--sketch-border)]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-500 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {TOTAL_QUESTIONS} Questions · {TABS.length} Tech Stacks
            </div>
            <h1 className="text-4xl md:text-5xl font-header font-bold text-[var(--sketch-text)] leading-tight mb-3">
              🎯 Tech Interview Prep & Mastery Studio
            </h1>
            <p className="text-[var(--sketch-text-muted)] text-base md:text-lg max-w-2xl leading-relaxed font-sketch">
              Master 1,400+ high-frequency interview questions across 15 technologies with instant progress tracking, detailed explanations, and flashcard practice mode.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={startQuiz}
              className="sketch-button flex items-center gap-2 text-base font-bold bg-[var(--sketch-accent-orange)] text-white shadow-lg shadow-orange-500/30 scale-[1.03] hover:scale-[1.06]"
            >
              <span>⚡ Practice Flashcards</span>
            </button>
            <a
              href={`${base}visualizer`}
              className="sketch-button flex items-center gap-2 text-base font-bold"
            >
              <span>🎨 Visualizer Studio</span>
            </a>
          </div>
        </div>

        {/* Hero Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
          <div className="sketch-panel-box sketch-border p-4 text-center rounded-2xl bg-[var(--sketch-bg)]">
            <div className="text-3xl font-header font-bold text-amber-500">{totalDone}</div>
            <div className="text-xs font-mono text-[var(--sketch-text-muted)] uppercase tracking-wider mt-1">Questions Mastered</div>
          </div>
          <div className="sketch-panel-box sketch-border p-4 text-center rounded-2xl bg-[var(--sketch-bg)]">
            <div className="text-3xl font-header font-bold text-cyan-400">{TOTAL_QUESTIONS}</div>
            <div className="text-xs font-mono text-[var(--sketch-text-muted)] uppercase tracking-wider mt-1">Total Question Deck</div>
          </div>
          <div className="sketch-panel-box sketch-border p-4 text-center rounded-2xl bg-[var(--sketch-bg)]">
            <div className="text-3xl font-header font-bold text-emerald-400">
              {totalDone > 0 ? Math.round((totalDone / TOTAL_QUESTIONS) * 100) : 0}%
            </div>
            <div className="text-xs font-mono text-[var(--sketch-text-muted)] uppercase tracking-wider mt-1">Overall Mastery</div>
          </div>
          <div className="sketch-panel-box sketch-border p-4 text-center rounded-2xl bg-[var(--sketch-bg)]">
            <div className="text-3xl font-header font-bold text-purple-400">{TABS.length}</div>
            <div className="text-xs font-mono text-[var(--sketch-text-muted)] uppercase tracking-wider mt-1">Tech Topics</div>
          </div>
        </div>
      </motion.header>

      {/* ═══ Category Overview ═══ */}
      <motion.div
        className="iq-overview"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        <button className="iq-overview-toggle" onClick={() => setShowOverview(v => !v)}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            style={{ transform: `rotate(${showOverview ? 90 : 0}deg)`, transition: 'transform 0.2s' }}>
            <path d="m9 18 6-6-6-6" />
          </svg>
          Category Overview
        </button>
        <AnimatePresence>
          {showOverview && (
            <motion.div
              className="iq-overview-grid"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {TABS.map(tab => {
                const p = progress[tab.id];
                const isActive = activeTab === tab.id;
                return (
                  <motion.div
                    key={tab.id}
                    className={`iq-ov-item${isActive ? ' active' : ''}`}
                    style={{ '--iq-tab-accent': tab.accent }}
                    onClick={() => { setActiveTab(tab.id); setSearch(''); setDifficultyFilter('all'); setSelectedCard(null); }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <TechIcon id={tab.id} size={24} />
                    <div className="iq-ov-info">
                      <div className="iq-ov-name" style={{ color: isActive ? tab.accent : undefined }}>{tab.label}</div>
                      <div className="iq-ov-bar">
                        <div className="iq-ov-fill" style={{ width: `${p.pct}%`, background: tab.accent }} />
                      </div>
                    </div>
                    <span className="iq-ov-pct">{p.count}/{p.total}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ═══ Sticky Nav ═══ */}
      <div className="iq-nav-wrap">
        <motion.div
          className="iq-nav-tabs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {TABS.map(tab => {
            const p = progress[tab.id];
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`iq-nav-tab${isActive ? ' active' : ''}`}
                style={{ '--iq-tab-accent': tab.accent }}
                onClick={() => { setActiveTab(tab.id); setSearch(''); setDifficultyFilter('all'); setSelectedCard(null); }}
              >
                <TechIcon id={tab.id} size={18} />
                {tab.label}
                <span className="iq-nav-progress">{p.count}/{p.total}</span>
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* ═══ Search ═══ */}
      <motion.div
        className="iq-search-wrap"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <div style={{ position: 'relative' }}>
          <svg className="iq-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={searchRef}
            className="iq-search"
            style={{ '--iq-search-accent': activeAccent }}
            type="text"
            placeholder={`Search ${activeConfig?.label || ''} questions…`}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <span className="iq-search-hint">⌘K</span>
          {search && (
            <button className="iq-search-clear" onClick={() => setSearch('')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </motion.div>

      {/* ═══ Difficulty Filter ═══ */}
      <motion.div
        className="iq-filter-bar"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {[
          { id: 'all', label: 'All', activeClass: 'active-all' },
          { id: 'easy', label: 'Easy', activeClass: 'active-easy' },
          { id: 'med', label: 'Medium', activeClass: 'active-med' },
          { id: 'hard', label: 'Hard', activeClass: 'active-hard' },
        ].map(f => {
          const isActive = difficultyFilter === f.id;
          const count = f.id === 'all' ? activeConfig?.questions.length : difficultyCounts[f.id];
          return (
            <button
              key={f.id}
              className={`iq-filter-btn${isActive ? ' ' + f.activeClass : ''}`}
              onClick={() => setDifficultyFilter(f.id)}
            >
              {f.label}
              <span className="iq-filter-count">{count || 0}</span>
            </button>
          );
        })}
        <span className="iq-filter-spacer" />
        <button
          className={`iq-filter-clear${difficultyFilter !== 'all' ? ' visible' : ''}`}
          onClick={() => setDifficultyFilter('all')}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
          Clear
        </button>
        <button
          className="iq-practice-btn"
          style={{ '--iq-tab-accent': activeAccent }}
          onClick={startQuiz}
          title={`Practice ${activeConfig?.label || ''} questions you haven't completed`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          Practice
        </button>
      </motion.div>

      {/* ═══ Content ═══ */}
      {activeConfig && (
        <motion.div
          key={activeTab + search + difficultyFilter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Sketch Topic Banner */}
          <div className="sketch-border bg-[var(--sketch-bg-dim)] p-6 rounded-2xl mb-8 shadow-md font-sketch border-2 border-[var(--sketch-border)]">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[var(--sketch-bg)] border border-[var(--sketch-border)] shadow-inner flex items-center justify-center">
                  <TechIcon id={activeConfig.id} size={30} />
                </div>
                <div>
                  <h3 className="text-2xl font-header font-bold text-[var(--sketch-text)] flex items-center gap-2">
                    {activeConfig.label}
                    <span className="text-sm font-mono text-amber-500 font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30">
                      {filtered.length} {filtered.length === 1 ? 'Question' : 'Questions'}
                    </span>
                  </h3>
                  <p className="text-xs font-mono text-[var(--sketch-text-muted)] mt-0.5">
                    {pct.count} of {pct.total} Mastered · ({pct.pct.toFixed(0)}% Completion)
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-mono font-bold text-amber-500">{pct.pct.toFixed(0)}%</div>
                <div className="text-xs font-mono text-[var(--sketch-text-muted)]">Category Score</div>
              </div>
            </div>

            {/* Sketch Animated Bar */}
            <div className="w-full h-3 bg-[var(--sketch-bg)] rounded-full overflow-hidden border border-[var(--sketch-border)]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400"
                initial={{ width: 0 }}
                animate={{ width: `${pct.pct}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>

          <div className="iq-grid">
            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? filtered.map((q, i) => {
                const id = `${activeTab}-${i}`;
                const isDone = !!doneMap[id];
                const isExpanded = selectedCard === id;
                const qText = q[0];
                const d = q[1];
                const answer = q[2];
                const hasAns = hasAnswer(q);
                return (
                  <motion.div
                    key={id}
                    layout
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.25, delay: Math.min(i * 0.02, 0.4) }}
                    className={`iq-card${isDone ? ' done' : ''}${isExpanded ? ' expanded' : ''}`}
                    style={{ '--iq-card-accent': activeConfig.accent }}
                    onClick={() => toggleExpand(id)}
                    whileHover={{ scale: 1.003, x: 2 }}
                    whileTap={{ scale: 0.997 }}
                  >
                    <div className="iq-card-row">
                      <span className="iq-num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="iq-text">{qText}</span>
                      <span className={diffClass(d)}>{diffLabel(d)}</span>
                      <div className="iq-check" onClick={(e) => toggleDone(id, e)}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <div className="iq-expand-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          className="iq-answer"
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          {hasAns ? (
                            <div className="iq-answer-inner">
                              <div className="iq-answer-label">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="10" />
                                  <path d="M12 16v-4" /><path d="M12 8h.01" />
                                </svg>
                                Answer
                              </div>
                              <div className="iq-answer-text">{formatAnswer(answer)}</div>
                            </div>
                          ) : (
                            <div className="iq-no-answer">Answer not yet added</div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              }) : (
                <motion.div
                  className="iq-empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="iq-empty-icon">🔍</div>
                  <div className="iq-empty-text">No questions match your search</div>
                  <div className="iq-empty-hint">
                    {search && difficultyFilter !== 'all'
                      ? 'Try different keywords or a different difficulty'
                      : search
                        ? 'Try different keywords'
                        : difficultyFilter !== 'all'
                          ? 'Try selecting a different difficulty'
                          : 'Try browsing another category'
                    }
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
      {/* ═══ Quiz / Practice Mode Overlay ═══ */}
      {quizMode && (
        <motion.div
          className="iq-quiz-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ '--iq-tab-accent': activeAccent }}
        >
          {/* Quiz Header */}
          <div className="iq-quiz-header">
            <button className="iq-quiz-back" onClick={exitQuiz}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Browse
            </button>
            {!quizFinished ? (
              <div className="iq-quiz-progress-text">
                <span>{quizQueue.length - quizIndex}</span> of <span>{quizQueue.length}</span> remaining
              </div>
            ) : (
              <div className="iq-quiz-progress-text">Complete!</div>
            )}
            <div className="iq-quiz-tab-badge flex items-center gap-1.5">
              <TechIcon id={activeTab} size={18} /> {activeConfig?.label || ''}
            </div>
          </div>

          {/* Quiz Body */}
          <div className="iq-quiz-body">
            <AnimatePresence mode="wait">
              {quizFinished ? (
                <motion.div
                  key="done"
                  className="iq-quiz-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="iq-quiz-done">
                    <div className="iq-quiz-done-icon">🎉</div>
                    <div className="iq-quiz-done-title">Practice Complete!</div>
                    <div className="iq-quiz-done-sub">
                      You've reviewed all remaining {activeConfig?.label} questions.
                    </div>
                    <div className="iq-quiz-done-stats">
                      <div className="iq-quiz-done-stat">
                        <div className="iq-quiz-done-stat-num">{quizQueue.length}</div>
                        <div className="iq-quiz-done-stat-label">Reviewed</div>
                      </div>
                      <div className="iq-quiz-done-stat">
                        <div className="iq-quiz-done-stat-num">{pct.pct.toFixed(0)}%</div>
                        <div className="iq-quiz-done-stat-label">Progress</div>
                      </div>
                    </div>
                    <button
                      className="iq-quiz-btn iq-quiz-btn-primary"
                      onClick={exitQuiz}
                    >
                      Back to Browse
                    </button>
                  </div>
                </motion.div>
              ) : quizQueue.length === 0 ? (
                <motion.div
                  key="empty"
                  className="iq-quiz-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="iq-quiz-done">
                    <div className="iq-quiz-done-icon">✅</div>
                    <div className="iq-quiz-done-title">Nothing to Practice</div>
                    <div className="iq-quiz-done-sub">
                      You've completed all {activeConfig?.label} questions, or none have answers yet.
                    </div>
                    <button
                      className="iq-quiz-btn iq-quiz-btn-primary"
                      onClick={exitQuiz}
                    >
                      Back to Browse
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={quizIndex}
                  className="iq-quiz-card"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="iq-quiz-question-num">
                    Question <span>{quizIndex + 1}</span> of {quizQueue.length}
                  </div>
                  <div className="iq-quiz-question-text">
                    {quizQueue[quizIndex].q[0]}
                  </div>
                  <div className={`iq-quiz-diff ${diffClass(quizQueue[quizIndex].q[1])}`}>
                    {diffLabel(quizQueue[quizIndex].q[1])}
                  </div>

                  {/* Answer (conditionally shown) */}
                  <AnimatePresence>
                    {showAnswer && (
                      <motion.div
                        className="iq-quiz-answer-panel"
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 28 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="iq-quiz-answer-label">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" /><path d="M12 8h.01" />
                          </svg>
                          Answer
                        </div>
                        <div className="iq-answer-text">
                          {formatAnswer(quizQueue[quizIndex].q[2])}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Actions */}
                  <div className="iq-quiz-actions">
                    {!showAnswer ? (
                      <button
                        className="iq-quiz-btn iq-quiz-btn-primary"
                        onClick={() => setShowAnswer(true)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        Show Answer
                      </button>
                    ) : (
                      <>
                        <button
                          className="iq-quiz-btn iq-quiz-btn-success"
                          onClick={() => quizNext(true)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Got It
                        </button>
                        <button
                          className="iq-quiz-btn iq-quiz-btn-skip"
                          onClick={() => quizNext(false)}
                        >
                          Skip
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
      {/* Sketch Blackboard Footer */}
      <footer className="sketch-border bg-[var(--sketch-bg-dim)] p-8 md:p-10 rounded-2xl font-sketch shadow-xl mt-16">
        {/* Top Branding & Description */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[var(--sketch-border)]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🎯</span>
              <h3 className="text-2xl font-bold font-header text-[var(--sketch-text)]">
                Interview Questions Hub & Practice Studio
              </h3>
            </div>
            <p className="text-[var(--sketch-text-muted)] text-sm max-w-2xl leading-relaxed font-sketch">
              Over 1400+ high-frequency tech interview questions covering JavaScript, React, Next.js, Node.js, Python, DSA, Databases, Docker, and OOP with step-by-step solutions and progress tracking.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/prathameshp107/DSA-Notes-Problems"
              target="_blank"
              rel="noopener noreferrer"
              className="sketch-button flex items-center gap-2 text-sm font-bold bg-amber-500/20 border-amber-500"
            >
              <span>⭐ Star on GitHub</span>
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="sketch-button flex items-center gap-1.5 text-sm font-bold"
              title="Back to top"
            >
              <span>↑ Top</span>
            </button>
          </div>
        </div>

        {/* 4-Column Quick Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-b border-[var(--sketch-border)]">
          {/* Column 1: Frontend Stack */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <TechIcon id="react" size={18} /> Frontend Stack
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}interview-questions?tab=js`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-2">
                  <TechIcon id="js" size={15} /> JavaScript (200 Questions)
                </a>
              </li>
              <li>
                <a href={`${base}interview-questions?tab=react`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-2">
                  <TechIcon id="react" size={15} /> React (200 Questions)
                </a>
              </li>
              <li>
                <a href={`${base}interview-questions?tab=next`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-2">
                  <TechIcon id="next" size={15} /> Next.js (200 Questions)
                </a>
              </li>
              <li>
                <a href={`${base}interview-questions?tab=angular`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-2">
                  <TechIcon id="angular" size={15} /> Angular (200 Questions)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Backend & Languages */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <TechIcon id="python" size={18} /> Backend & Core
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}interview-questions?tab=nodejs`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-2">
                  <TechIcon id="nodejs" size={15} /> Node.js (200 Questions)
                </a>
              </li>
              <li>
                <a href={`${base}interview-questions?tab=python`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-2">
                  <TechIcon id="python" size={15} /> Python (200 Questions)
                </a>
              </li>
              <li>
                <a href={`${base}interview-questions?tab=dsa`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-2">
                  <TechIcon id="dsa" size={15} /> DSA Patterns (200 Questions)
                </a>
              </li>
              <li>
                <a href={`${base}interview-questions?tab=oops`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-2">
                  <TechIcon id="oops" size={15} /> OOP Design (200 Questions)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Databases & DevOps */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <TechIcon id="docker" size={18} /> DB & DevOps
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}interview-questions?tab=mongodb`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-2">
                  <TechIcon id="mongodb" size={15} /> MongoDB (200 Questions)
                </a>
              </li>
              <li>
                <a href={`${base}interview-questions?tab=mysql`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-2">
                  <TechIcon id="mysql" size={15} /> MySQL (200 Questions)
                </a>
              </li>
              <li>
                <a href={`${base}interview-questions?tab=redis`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-2">
                  <TechIcon id="redis" size={15} /> Redis (140+ Questions)
                </a>
              </li>
              <li>
                <a href={`${base}interview-questions?tab=docker`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-2">
                  <TechIcon id="docker" size={15} /> Docker (200 Questions)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Platform Navigation */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <span>🚀</span> Visualizers & Docs
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}visualizer`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Visualizer Studio
                </a>
              </li>
              <li>
                <a href={`${base}overview`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Docs & Practice Notes
                </a>
              </li>
              <li>
                <a href={base} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Home Page
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Design Bar */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[var(--sketch-text-muted)]">
          <div>
            © {new Date().getFullYear()} DSA & Tech Interview Studio · Hand-crafted Blackboard UI.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-500 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {TOTAL_QUESTIONS}+ Interview Questions Active
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
