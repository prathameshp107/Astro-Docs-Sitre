import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TABS, STORAGE_KEY, TOTAL_QUESTIONS } from '../../data/interview-questions-data.js';

/* ─── Accent colors per tab ─── */
const ACCENT = {
  js: '#f7df1e', react: '#61dafb', next: '#ffffff', angular: '#dd0031',
  nodejs: '#68a063', python: '#306998', css: '#1572b6', html: '#e34f26',
  dsa: '#8b5cf6', mongodb: '#47a248', mysql: '#4479a1', redis: '#dc382d',
  docker: '#2496ed', oops: '#ec4899',
};

/* ─── Icons per tab ─── */
const ICON = {
  js: '🟨', react: '⚛️', next: '▲', angular: '🅰️',
  nodejs: '🟢', python: '🐍', css: '🎨', html: '🌐',
  dsa: '📊', mongodb: '🍃', mysql: '🐬', redis: '🔴',
  docker: '🐳', oops: '🧩',
};

export default function InterviewQuestionHub() {
  const [activeTab, setActiveTab] = useState('js');
  const [search, setSearch] = useState('');
  const [doneMap, setDoneMap] = useState({});
  const [mounted, setMounted] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showOverview, setShowOverview] = useState(true);
  const searchRef = useRef(null);

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
    if (!search.trim()) return activeConfig.questions;
    const q = search.toLowerCase();
    return activeConfig.questions.filter(([text]) => text.toLowerCase().includes(q));
  }, [activeConfig, search]);

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

  if (!mounted) return null;

  const pct = progress[activeTab];

  return (
    <div className="iq-root">
      <style>{`
        /* ═══ Base ═══ */
        .iq-root {
          --iq-bg: #0a0c12;
          --iq-surface: #11141e;
          --iq-surface2: #181c2a;
          --iq-surface3: #1f2435;
          --iq-border: #232838;
          --iq-border-light: #2a3042;
          --iq-text: #e4e7ef;
          --iq-muted: #6b7290;
          --iq-radius: 12px;
          color: var(--iq-text);
          font-family: var(--font-sans);
          min-height: 100vh;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 28px 100px;
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
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -1.5px;
          line-height: 1.1;
          margin-bottom: 14px;
          background: linear-gradient(135deg, #f7df1e 0%, #61dafb 50%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .iq-subtitle {
          color: var(--iq-muted);
          font-size: 1rem;
          max-width: 520px;
          margin: 0 auto 32px;
          line-height: 1.6;
        }

        /* ═══ Stats Row ═══ */
        .iq-stats {
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
        }
        .iq-stat {
          text-align: center;
          position: relative;
        }
        .iq-stat + .iq-stat::before {
          content: '';
          position: absolute;
          left: -20px;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 32px;
          background: var(--iq-border);
        }
        .iq-stat-num {
          font-family: var(--font-mono);
          font-size: 2rem;
          font-weight: 700;
          line-height: 1;
          background: linear-gradient(135deg, #f7df1e, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .iq-stat-label {
          font-size: 0.72rem;
          color: var(--iq-muted);
          margin-top: 4px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        /* ═══ Category Overview ═══ */
        .iq-overview {
          position: relative;
          z-index: 1;
          margin-bottom: 28px;
        }
        .iq-overview-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: var(--iq-muted);
          font-size: 0.78rem;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          padding: 8px 0;
          margin-bottom: 12px;
          transition: color 0.2s;
        }
        .iq-overview-toggle:hover { color: var(--iq-text); }
        .iq-overview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 8px;
        }
        .iq-ov-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          background: var(--iq-surface);
          border: 1px solid var(--iq-border);
          cursor: pointer;
          transition: all 0.2s;
        }
        .iq-ov-item:hover {
          border-color: var(--iq-border-light);
          background: var(--iq-surface2);
          transform: translateY(-1px);
        }
        .iq-ov-item.active {
          border-color: var(--iq-tab-accent, var(--iq-border-light));
          box-shadow: 0 0 20px color-mix(in srgb, var(--iq-tab-accent, transparent) 8%, transparent);
        }
        .iq-ov-icon { font-size: 1rem; flex-shrink: 0; }
        .iq-ov-info { flex: 1; min-width: 0; }
        .iq-ov-name {
          font-size: 0.7rem;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 3px;
        }
        .iq-ov-bar {
          height: 3px;
          background: var(--iq-border);
          border-radius: 4px;
          overflow: hidden;
        }
        .iq-ov-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.6s ease;
        }
        .iq-ov-pct {
          font-size: 0.6rem;
          font-family: 'JetBrains Mono', monospace;
          color: var(--iq-muted);
          flex-shrink: 0;
        }

        /* ═══ Nav Tabs ═══ */
        .iq-nav-wrap {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(10,12,18,0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--iq-border);
          margin: 0 -28px;
          padding: 0 28px;
        }
        .iq-nav-tabs {
          display: flex;
          gap: 2px;
          overflow-x: auto;
          scrollbar-width: none;
          padding: 6px 0;
        }
        .iq-nav-tabs::-webkit-scrollbar { display: none; }
        .iq-nav-tab {
          flex-shrink: 0;
          padding: 10px 16px;
          background: none;
          border: none;
          border-radius: 8px;
          color: var(--iq-muted);
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
        }
        .iq-nav-tab:hover {
          color: var(--iq-text);
          background: var(--iq-surface);
        }
        .iq-nav-tab.active {
          color: var(--iq-tab-accent, var(--iq-text));
          background: color-mix(in srgb, var(--iq-tab-accent, transparent) 10%, var(--iq-surface2));
        }
        .iq-nav-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .iq-nav-progress {
          font-size: 0.6rem;
          font-family: 'JetBrains Mono', monospace;
          opacity: 0.5;
          margin-left: 2px;
        }
        .iq-nav-indicator {
          position: absolute;
          bottom: -1px;
          left: 0; right: 0;
          height: 2px;
          border-radius: 2px;
        }

        /* ═══ Search ═══ */
        .iq-search-wrap {
          position: relative;
          z-index: 1;
          padding: 20px 0 4px;
        }
        .iq-search {
          width: 100%;
          background: var(--iq-surface);
          border: 1px solid var(--iq-border);
          border-radius: var(--iq-radius);
          color: var(--iq-text);
          font-family: var(--font-sans);
          font-size: 0.9rem;
          padding: 12px 44px 12px 46px;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
          box-sizing: border-box;
        }
        .iq-search:focus {
          border-color: var(--iq-search-accent, #f7df1e);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--iq-search-accent, #f7df1e) 12%, transparent);
        }
        .iq-search::placeholder { color: var(--iq-muted); }
        .iq-search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--iq-muted);
          pointer-events: none;
        }
        .iq-search-clear {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--iq-muted);
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .iq-search-clear:hover { color: var(--iq-text); }
        .iq-search-hint {
          position: absolute;
          right: 40px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.6rem;
          color: var(--iq-muted);
          background: var(--iq-surface2);
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid var(--iq-border);
          letter-spacing: 0.5px;
          font-family: 'JetBrains Mono', monospace;
          opacity: 0.6;
        }

        /* ═══ Section Header ═══ */
        .iq-section-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 24px 0 16px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--iq-border);
        }
        .iq-section-icon {
          font-family: var(--font-mono);
          font-size: 1.3rem;
          font-weight: 700;
          width: 48px; height: 48px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 14px;
          flex-shrink: 0;
          border: 1px solid var(--iq-border-light);
          background: var(--iq-surface);
        }
        .iq-section-info { flex: 1; }
        .iq-section-title { font-size: 1.15rem; font-weight: 700; }
        .iq-section-count { font-size: 0.75rem; color: var(--iq-muted); margin-top: 2px; }
        .iq-section-pct {
          font-size: 0.85rem;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
          text-align: right;
        }

        /* ═══ Progress Bar ═══ */
        .iq-progress-wrap { margin-bottom: 24px; }
        .iq-progress-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--iq-muted);
          margin-bottom: 8px;
        }
        .iq-progress-bar {
          height: 5px;
          background: var(--iq-surface3);
          border-radius: 999px;
          overflow: hidden;
          position: relative;
        }
        .iq-progress-fill {
          height: 100%;
          border-radius: 999px;
          transition: width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
        }
        .iq-progress-fill::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          animation: iq-shimmer 2.5s ease-in-out infinite;
        }
        @keyframes iq-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* ═══ Question Cards ═══ */
        .iq-grid {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .iq-card {
          background: var(--iq-surface);
          border: 1px solid var(--iq-border);
          border-radius: var(--iq-radius);
          padding: 14px 18px;
          display: flex;
          flex-direction: column;
          transition: border-color 0.2s, background 0.2s;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .iq-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--iq-card-accent, transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .iq-card:hover {
          background: var(--iq-surface2);
          border-color: var(--iq-border-light);
        }
        .iq-card:hover::before { opacity: 1; }
        .iq-card.done {
          opacity: 0.5;
          border-color: transparent;
        }
        .iq-card.done::before {
          opacity: 1;
          background: #22c55e;
        }
        .iq-card.expanded {
          border-color: var(--iq-card-accent, var(--iq-border-light));
          background: var(--iq-surface2);
        }
        .iq-card-row {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
        }
        .iq-num {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 600;
          min-width: 26px;
          color: var(--iq-muted);
          flex-shrink: 0;
          opacity: 0.6;
        }
        .iq-card.done .iq-num { color: #22c55e; opacity: 1; }
        .iq-text {
          font-size: 0.88rem;
          font-weight: 500;
          flex: 1;
          line-height: 1.5;
        }
        .iq-card.done .iq-text { text-decoration: line-through; text-decoration-color: rgba(34,197,94,0.3); }

        .iq-check {
          width: 22px; height: 22px;
          border: 1.5px solid var(--iq-border);
          border-radius: 6px;
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
          position: relative;
        }
        .iq-card:hover .iq-check { border-color: var(--iq-border-light); }
        .iq-card.done .iq-check {
          background: var(--green-500);
          border-color: var(--green-500);
          box-shadow: 0 0 12px rgba(34,197,94,0.3);
        }
        .iq-check svg {
          opacity: 0;
          transition: opacity 0.2s;
        }
        .iq-card.done .iq-check svg { opacity: 1; }
        .iq-expand-icon {
          width: 18px; height: 18px;
          flex-shrink: 0;
          color: var(--iq-muted);
          transition: transform 0.3s ease, color 0.2s;
          display: flex; align-items: center; justify-content: center;
        }
        .iq-card.expanded .iq-expand-icon { transform: rotate(180deg); color: var(--iq-card-accent, var(--iq-text)); }

        /* ═══ Answer Panel ═══ */
        .iq-answer {
          overflow: hidden;
        }
        .iq-answer-inner {
          padding: 16px 0 4px 40px;
          border-top: 1px solid var(--iq-border);
          margin-top: 12px;
          font-size: 0.85rem;
          line-height: 1.7;
          color: var(--iq-muted);
        }
        .iq-answer-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--iq-card-accent, var(--iq-text));
          margin-bottom: 10px;
        }
        .iq-answer-label svg { width: 14px; height: 14px; }
        .iq-answer-text {
          color: var(--iq-text);
          opacity: 0.85;
        }
        .iq-no-answer {
          padding: 10px 0 2px 40px;
          font-size: 0.78rem;
          color: var(--iq-muted);
          font-style: italic;
          opacity: 0.5;
        }

        .iq-diff {
          font-size: 0.6rem;
          padding: 3px 10px;
          border-radius: 999px;
          font-weight: 600;
          letter-spacing: 0.3px;
          flex-shrink: 0;
          text-transform: uppercase;
        }
        .iq-diff-hard  { background: color-mix(in srgb, var(--red-500) 15%, transparent); color: var(--red-400); }
        .iq-diff-med   { background: rgba(251,146,60,0.15); color: #fb923c; }
        .iq-diff-easy  { background: rgba(34,197,94,0.15);  color: #4ade80; }

        /* Hidden by search */
        .iq-card.hidden { display: none; }

        /* ═══ No Results ═══ */
        .iq-empty {
          text-align: center;
          padding: 64px 24px;
          color: var(--iq-muted);
        }
        .iq-empty-icon { font-size: 2.5rem; margin-bottom: 12px; }
        .iq-empty-text { font-size: 0.9rem; margin-bottom: 4px; }
        .iq-empty-hint { font-size: 0.78rem; opacity: 0.6; }

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

      {/* ═══ Header ═══ */}
      <motion.header
        className="iq-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="iq-badge">
          <span className="iq-badge-dot" />
          {TOTAL_QUESTIONS} Questions · {TABS.length} Technologies
        </div>
        <h1 className="iq-title">Interview Questions Hub</h1>
        <p className="iq-subtitle">
          High-frequency, hard-hitting questions across all topics. Track what you've studied.
        </p>
        <div className="iq-stats">
          <div className="iq-stat">
            <div className="iq-stat-num">{totalDone}</div>
            <div className="iq-stat-label">Completed</div>
          </div>
          <div className="iq-stat">
            <div className="iq-stat-num">{TOTAL_QUESTIONS}</div>
            <div className="iq-stat-label">Total Questions</div>
          </div>
          <div className="iq-stat">
            <div className="iq-stat-num">{totalDone > 0 ? Math.round(totalDone / TOTAL_QUESTIONS * 100) : 0}%</div>
            <div className="iq-stat-label">Overall Progress</div>
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
                  onClick={() => { setActiveTab(tab.id); setSearch(''); setSelectedCard(null); }}
                  whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="iq-ov-icon">{ICON[tab.id] || '📁'}</span>
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
                key={tab.id}                    className={`iq-nav-tab${isActive ? ' active' : ''}`}
                    style={{ '--iq-tab-accent': tab.accent }}
                    onClick={() => { setActiveTab(tab.id); setSearch(''); setSelectedCard(null); }}
                  >
                    <span className="iq-nav-dot" style={{ background: tab.accent }} />
                {tab.label}
                <span className="iq-nav-progress">{p.count}/{p.total}</span>
                {isActive && (
                  <motion.div
                    className="iq-nav-indicator"
                    layoutId="nav-indicator"
                    style={{ background: tab.accent }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
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

      {/* ═══ Content ═══ */}
      {activeConfig && (
        <motion.div
          key={activeTab + search}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="iq-section-header">
            <div className="iq-section-icon">{ICON[activeConfig.id] || '?'}</div>
            <div className="iq-section-info">
              <div className="iq-section-title">{activeConfig.label}</div>
              <div className="iq-section-count">100 most-asked interview questions</div>
            </div>
            <div className="iq-section-pct" style={{ color: activeConfig.accent }}>
              {pct.pct.toFixed(0)}%
            </div>
          </div>

          <div className="iq-progress-wrap">
            <div className="iq-progress-row">
              <span>Progress</span>
              <span>{pct.count} / {pct.total}</span>
            </div>
            <div className="iq-progress-bar">
              <motion.div
                className="iq-progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${pct.pct}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ background: `linear-gradient(90deg, ${activeConfig.accent}, ${activeConfig.accent}cc)` }}
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
                              <div className="iq-answer-text">{answer}</div>
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
                  <div className="iq-empty-hint">Try different keywords or browse another category</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </div>
  );
}
