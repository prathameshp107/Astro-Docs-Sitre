import { useState, useEffect, useMemo, useRef, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TABS, STORAGE_KEY, TOTAL_QUESTIONS } from '../../data/interview-questions-data.js';

/* ─── Accent colors per tab ─── */
const ACCENT = {
  js: '#f7df1e', react: '#61dafb', next: '#ffffff', angular: '#dd0031',
  nodejs: '#68a063', python: '#306998', ai: '#ff6b35', css: '#1572b6', html: '#e34f26',
  dsa: '#8b5cf6', mongodb: '#47a248', mysql: '#4479a1', redis: '#dc382d',
  docker: '#2496ed', oops: '#ec4899',
};

/* ─── Icons per tab ─── */
const ICON = {
  js: '🟨', react: '⚛️', next: '▲', angular: '🅰️',
  nodejs: '🟢', python: '🐍', ai: '🤖', css: '🎨', html: '🌐',
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
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [quizMode, setQuizMode] = useState(false);
  const [quizQueue, setQuizQueue] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
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

        /* ═══ Difficulty Filter Bar ═══ */
        .iq-filter-bar {
          display: flex;
          gap: 6px;
          padding: 10px 0 4px;
          flex-wrap: wrap;
        }
        .iq-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid var(--iq-border);
          background: var(--iq-surface);
          color: var(--iq-muted);
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          letter-spacing: 0.2px;
        }
        .iq-filter-btn:hover {
          border-color: var(--iq-border-light);
          color: var(--iq-text);
          background: var(--iq-surface2);
        }
        .iq-filter-btn.active-all {
          background: var(--iq-surface2);
          border-color: var(--iq-border-light);
          color: var(--iq-text);
        }
        .iq-filter-btn.active-easy {
          background: rgba(34,197,94,0.12);
          border-color: rgba(34,197,94,0.3);
          color: #4ade80;
        }
        .iq-filter-btn.active-med {
          background: rgba(251,146,60,0.12);
          border-color: rgba(251,146,60,0.3);
          color: #fb923c;
        }
        .iq-filter-btn.active-hard {
          background: rgba(239,68,68,0.12);
          border-color: rgba(239,68,68,0.3);
          color: #f87171;
        }
        .iq-filter-count {
          font-size: 0.6rem;
          font-family: var(--font-mono);
          opacity: 0.6;
          min-width: 16px;
          text-align: center;
        }
        .iq-filter-spacer {
          flex: 1;
        }
        .iq-filter-clear {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 6px 10px;
          border-radius: 6px;
          border: none;
          background: none;
          color: var(--iq-muted);
          font-family: var(--font-sans);
          font-size: 0.7rem;
          cursor: pointer;
          transition: color 0.2s;
          opacity: 0;
          pointer-events: none;
        }
        .iq-filter-clear.visible {
          opacity: 1;
          pointer-events: auto;
        }
        .iq-filter-clear:hover {
          color: var(--iq-text);
        }
        .iq-practice-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid var(--iq-border);
          background: var(--iq-surface);
          color: var(--iq-muted);
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          letter-spacing: 0.2px;
          margin-left: auto;
        }
        .iq-practice-btn:hover {
          border-color: var(--iq-tab-accent, var(--iq-border-light));
          color: var(--iq-tab-accent, var(--iq-text));
          background: color-mix(in srgb, var(--iq-tab-accent, transparent) 8%, var(--iq-surface2));
        }

        /* ═══ Quiz / Practice Mode ═══ */
        .iq-quiz-overlay {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: var(--iq-bg);
          display: flex;
          flex-direction: column;
          padding: 0;
          overflow-y: auto;
        }
        .iq-quiz-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 28px;
          border-bottom: 1px solid var(--iq-border);
          background: rgba(10,12,18,0.95);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .iq-quiz-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 8px;
          border: 1px solid var(--iq-border);
          background: var(--iq-surface);
          color: var(--iq-muted);
          font-family: var(--font-sans);
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .iq-quiz-back:hover {
          border-color: var(--iq-border-light);
          color: var(--iq-text);
        }
        .iq-quiz-progress-text {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--iq-muted);
          flex: 1;
          text-align: center;
        }
        .iq-quiz-progress-text span {
          color: var(--iq-text);
          font-weight: 700;
        }
        .iq-quiz-tab-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.72rem;
          font-weight: 600;
          background: color-mix(in srgb, var(--iq-tab-accent, #f7df1e) 12%, var(--iq-surface2));
          color: var(--iq-tab-accent, var(--iq-text));
          border: 1px solid color-mix(in srgb, var(--iq-tab-accent, #f7df1e) 20%, transparent);
        }
        .iq-quiz-body {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 28px;
        }
        .iq-quiz-card {
          width: 100%;
          max-width: 800px;
          background: var(--iq-surface);
          border: 1px solid var(--iq-border);
          border-radius: 16px;
          padding: 40px 44px;
          position: relative;
          overflow: hidden;
        }
        .iq-quiz-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--iq-tab-accent, var(--iq-border-light));
          opacity: 0.4;
        }
        .iq-quiz-question-num {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--iq-muted);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 8px;
        }
        .iq-quiz-question-num span {
          color: var(--iq-tab-accent, var(--iq-text));
        }
        .iq-quiz-question-text {
          font-size: 1.2rem;
          font-weight: 600;
          line-height: 1.6;
          margin-bottom: 20px;
          color: var(--iq-text);
        }
        .iq-quiz-diff {
          display: inline-flex;
          font-size: 0.6rem;
          padding: 4px 12px;
          border-radius: 999px;
          font-weight: 600;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          margin-bottom: 24px;
        }
        .iq-quiz-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 28px;
        }
        .iq-quiz-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 10px;
          border: 1px solid var(--iq-border);
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .iq-quiz-btn-primary {
          background: var(--iq-tab-accent, #f7df1e);
          color: #000;
          border-color: var(--iq-tab-accent, #f7df1e);
        }
        .iq-quiz-btn-primary:hover {
          filter: brightness(1.15);
          transform: translateY(-1px);
          box-shadow: 0 4px 16px color-mix(in srgb, var(--iq-tab-accent, #f7df1e) 25%, transparent);
        }
        .iq-quiz-btn-success {
          background: #22c55e;
          color: #000;
          border-color: #22c55e;
        }
        .iq-quiz-btn-success:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(34,197,94,0.25);
        }
        .iq-quiz-btn-skip {
          background: var(--iq-surface2);
          color: var(--iq-muted);
          border-color: var(--iq-border);
        }
        .iq-quiz-btn-skip:hover {
          border-color: var(--iq-border-light);
          color: var(--iq-text);
        }
        .iq-quiz-btn-ghost {
          background: transparent;
          color: var(--iq-muted);
          border-color: transparent;
          padding: 12px 16px;
        }
        .iq-quiz-btn-ghost:hover {
          color: var(--iq-text);
        }
        .iq-quiz-answer-panel {
          margin-top: 28px;
          padding: 20px 24px;
          background: color-mix(in srgb, var(--iq-bg) 60%, var(--iq-surface2));
          border-radius: 12px;
          border: 1px solid var(--iq-border);
          border-left: 3px solid var(--iq-tab-accent, var(--iq-border-light));
        }
        .iq-quiz-answer-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          color: var(--iq-tab-accent, var(--iq-text));
          margin-bottom: 12px;
          padding: 4px 10px;
          border-radius: 4px;
          background: color-mix(in srgb, var(--iq-tab-accent, transparent) 10%, transparent);
          border: 1px solid color-mix(in srgb, var(--iq-tab-accent, transparent) 15%, transparent);
          width: fit-content;
        }
        .iq-quiz-answer-label svg { width: 12px; height: 12px; }

        /* Quiz completion */
        .iq-quiz-done {
          text-align: center;
          padding: 60px 40px;
        }
        .iq-quiz-done-icon {
          font-size: 4rem;
          margin-bottom: 16px;
        }
        .iq-quiz-done-title {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #22c55e, #4ade80);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .iq-quiz-done-sub {
          color: var(--iq-muted);
          font-size: 1rem;
          margin-bottom: 32px;
        }
        .iq-quiz-done-stats {
          display: flex;
          justify-content: center;
          gap: 32px;
          margin-bottom: 32px;
        }
        .iq-quiz-done-stat {
          text-align: center;
        }
        .iq-quiz-done-stat-num {
          font-family: var(--font-mono);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--iq-text);
        }
        .iq-quiz-done-stat-label {
          font-size: 0.72rem;
          color: var(--iq-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 4px;
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
        .iq-section-count { font-size: 0.75rem; color: var(--iq-muted); margin-top: 2px; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
        .iq-section-count-sep { opacity: 0.4; }
        .iq-section-count-filtered {
          color: var(--iq-card-accent, var(--iq-muted));
          font-weight: 600;
          font-family: var(--font-mono);
          font-size: 0.65rem;
        }
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
          box-shadow: 0 0 40px color-mix(in srgb, var(--iq-card-accent, transparent) 6%, transparent),
                      0 8px 32px rgba(0,0,0,0.12);
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
          padding: 20px 20px 16px;
          border-top: 1px solid var(--iq-border);
          margin-top: 14px;
          background: color-mix(in srgb, var(--iq-bg) 60%, var(--iq-surface2));
          border-radius: 0 0 var(--iq-radius) var(--iq-radius);
          position: relative;
        }
        .iq-answer-inner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 16px;
          right: 16px;
          height: 1.5px;
          border-radius: 2px;
          background: var(--iq-card-accent, var(--iq-border-light));
          opacity: 0.3;
        }
        .iq-answer-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.58rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          color: var(--iq-card-accent, var(--iq-text));
          margin-bottom: 14px;
          padding: 4px 12px;
          border-radius: 4px;
          background: color-mix(in srgb, var(--iq-card-accent, transparent) 10%, transparent);
          border: 1px solid color-mix(in srgb, var(--iq-card-accent, transparent) 15%, transparent);
          width: fit-content;
        }
        .iq-answer-label svg { width: 12px; height: 12px; }
        .iq-answer-text {
          color: var(--iq-text);
        }
        .iq-answer-para {
          margin: 0 0 12px;
          font-size: 0.88rem;
          line-height: 1.8;
          color: var(--iq-text);
          opacity: 0.88;
        }
        .iq-answer-para:last-child {
          margin-bottom: 0;
        }
        .iq-inline-code {
          background: var(--iq-surface3);
          color: var(--iq-card-accent, var(--iq-text));
          padding: 0.15em 0.45em;
          border-radius: 4px;
          font-family: var(--font-mono);
          font-size: 0.82em;
          font-weight: 500;
          border: 1px solid color-mix(in srgb, var(--iq-card-accent, var(--iq-border)) 20%, transparent);
        }
        .iq-code-block {
          margin: 10px 0;
          padding: 14px 16px;
          background: var(--iq-surface3);
          border: 1px solid var(--iq-border);
          border-radius: 8px;
          overflow-x: auto;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          line-height: 1.65;
          color: var(--iq-text);
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
          font-size: 0.82rem;
          color: var(--iq-muted);
          font-style: italic;
          opacity: 0.5;
          text-align: center;
          border-top: 1px solid var(--iq-border);
          margin-top: 12px;
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
                  onClick={() => { setActiveTab(tab.id); setSearch(''); setDifficultyFilter('all'); setSelectedCard(null); }}
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
                    onClick={() => { setActiveTab(tab.id); setSearch(''); setDifficultyFilter('all'); setSelectedCard(null); }}
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
          <div className="iq-section-header">
            <div className="iq-section-icon">{ICON[activeConfig.id] || '?'}</div>
            <div className="iq-section-info">
              <div className="iq-section-title">{activeConfig.label}</div>
              <div className="iq-section-count">
                {activeConfig.questions.length} questions
                {(search.trim() || difficultyFilter !== 'all') && filtered.length < activeConfig.questions.length && (
                  <>
                    <span className="iq-section-count-sep">·</span>
                    <span className="iq-section-count-filtered" style={{ color: activeConfig.accent }}>
                      {filtered.length} shown
                    </span>
                  </>
                )}
              </div>
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
            <div className="iq-quiz-tab-badge">
              {ICON[activeTab] || '📁'} {activeConfig?.label || ''}
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
    </div>
  );
}
