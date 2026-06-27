import { useState, useEffect, useMemo } from 'react';
import { TABS, STORAGE_KEY, TOTAL_QUESTIONS } from '../../data/interview-questions-data.js';

export default function InterviewQuestionHub() {
  const [activeTab, setActiveTab] = useState('js');
  const [search, setSearch] = useState('');
  const [doneMap, setDoneMap] = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setDoneMap(JSON.parse(raw));
    } catch { /* ignore */ }
    setMounted(true);
  }, []);

  const saveDone = (newMap) => {
    setDoneMap(newMap);
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newMap)); } catch { /* ignore */ }
  };

  const toggleCard = (id) => {
    const next = { ...doneMap };
    if (next[id]) delete next[id];
    else next[id] = true;
    saveDone(next);
  };

  const activeConfig = TABS.find(t => t.id === activeTab);

  const progress = useMemo(() => {
    const out = {};
    TABS.forEach(tab => {
      let count = 0;
      tab.questions.forEach((_, i) => {
        if (doneMap[`${tab.id}-${i}`]) count++;
      });
      out[tab.id] = { count, total: tab.questions.length };
    });
    return out;
  }, [doneMap]);

  const filtered = useMemo(() => {
    if (!activeConfig) return [];
    if (!search.trim()) return activeConfig.questions;
    const q = search.toLowerCase();
    return activeConfig.questions.filter(([text]) => text.toLowerCase().includes(q));
  }, [activeConfig, search]);

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

  const pct = (c, t) => t > 0 ? (c / t * 100).toFixed(1) : 0;

  if (!mounted) return null;

  return (
    <div className="iq-root">
      {/* ── Styles ── */}
      <style>{`
        .iq-root {
          --iq-bg: #0d0f14;
          --iq-surface: #13161e;
          --iq-surface2: #1a1e29;
          --iq-border: #252a38;
          --iq-text: #e8eaf0;
          --iq-muted: #6b7280;
          --iq-radius: 10px;
          color: var(--iq-text);
          font-family: 'Inter', 'Space Grotesk', sans-serif;
          min-height: 100vh;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }

        /* Header */
        .iq-header {
          text-align: center;
          padding: 48px 24px 36px;
          border-bottom: 1px solid var(--iq-border);
          position: relative;
          overflow: hidden;
        }
        .iq-header::before {
          content: '';
          position: absolute;
          top: -80px; left: 50%; transform: translateX(-50%);
          width: 600px; height: 300px;
          background: radial-gradient(ellipse, rgba(247,223,30,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .iq-badge {
          display: inline-block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #f7df1e;
          border: 1px solid #3a3308;
          padding: 4px 12px;
          border-radius: 999px;
          margin-bottom: 20px;
        }
        .iq-title {
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 700;
          letter-spacing: -1px;
          line-height: 1.1;
          margin-bottom: 12px;
        }
        .iq-title .js-color { color: #f7df1e; }
        .iq-title .react-color { color: #61dafb; }
        .iq-title .next-color { color: #ffffff; }
        .iq-subtitle {
          color: var(--iq-muted);
          font-size: 0.95rem;
          max-width: 480px;
          margin: 0 auto 28px;
        }
        .iq-stats {
          display: flex;
          justify-content: center;
          gap: 32px;
          flex-wrap: wrap;
        }
        .iq-stat { text-align: center; }
        .iq-stat-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.8rem;
          font-weight: 700;
          line-height: 1;
        }
        .iq-stat-label { font-size: 0.72rem; color: var(--iq-muted); margin-top: 4px; }

        /* Nav tabs */
        .iq-nav-wrap {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(13,15,20,0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--iq-border);
        }
        .iq-nav-tabs {
          display: flex;
          max-width: 1100px;
          margin: 0 auto;
          gap: 1px;
          overflow-x: auto;
          scrollbar-width: thin;
          scrollbar-color: var(--iq-border) transparent;
          padding: 0 4px;
        }
        .iq-nav-tabs::-webkit-scrollbar { height: 4px; }
        .iq-nav-tabs::-webkit-scrollbar-thumb { background: var(--iq-border); border-radius: 4px; }
        .iq-nav-tab {
          flex-shrink: 0;
          padding: 14px 12px;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          color: var(--iq-muted);
          font-family: 'Inter', 'Space Grotesk', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
          letter-spacing: 0.3px;
          white-space: nowrap;
        }
        .iq-nav-tab:hover { color: var(--iq-text); }
        .iq-nav-tab.active { color: var(--iq-accent); border-color: var(--iq-accent); }
        .iq-dot {
          display: inline-block;
          width: 8px; height: 8px;
          border-radius: 50%;
          margin-right: 8px;
        }

        /* Search */
        .iq-search-wrap {
          padding: 24px 0 8px;
        }
        .iq-search {
          width: 100%;
          background: var(--iq-surface);
          border: 1px solid var(--iq-border);
          border-radius: var(--iq-radius);
          color: var(--iq-text);
          font-family: 'Inter', 'Space Grotesk', sans-serif;
          font-size: 0.9rem;
          padding: 12px 18px 12px 44px;
          outline: none;
          transition: border-color 0.2s;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.35-4.35'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: 14px center;
          box-sizing: border-box;
        }
        .iq-search:focus { border-color: #f7df1e; }
        .iq-search::placeholder { color: var(--iq-muted); }

        /* Section header */
        .iq-section-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 28px 0 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--iq-border);
        }
        .iq-section-icon {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.3rem;
          font-weight: 700;
          width: 48px; height: 48px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 12px;
          flex-shrink: 0;
        }
        .iq-section-title { font-size: 1.3rem; font-weight: 700; }
        .iq-section-count { font-size: 0.78rem; color: var(--iq-muted); margin-top: 2px; }

        /* Progress */
        .iq-progress-wrap { margin-bottom: 24px; }
        .iq-progress-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.78rem;
          color: var(--iq-muted);
          margin-bottom: 8px;
        }
        .iq-progress-bar {
          height: 6px;
          background: var(--iq-surface2);
          border-radius: 999px;
          overflow: hidden;
        }
        .iq-progress-fill {
          height: 100%;
          border-radius: 999px;
          transition: width 0.3s ease;
          width: 0%;
        }

        /* Question cards */
        .iq-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .iq-card {
          background: var(--iq-surface);
          border: 1px solid var(--iq-border);
          border-radius: var(--iq-radius);
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: border-color 0.15s, background 0.15s;
          cursor: pointer;
        }
        .iq-card:hover { background: var(--iq-surface2); }
        .iq-card.done { opacity: 0.45; }
        .iq-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 600;
          min-width: 28px;
          color: var(--iq-muted);
          flex-shrink: 0;
        }
        .iq-text {
          font-size: 0.9rem;
          font-weight: 500;
          flex: 1;
          line-height: 1.5;
        }
        .iq-check {
          width: 20px; height: 20px;
          border: 1.5px solid var(--iq-border);
          border-radius: 5px;
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s, border-color 0.15s;
        }
        .iq-card.done .iq-check { background: #22c55e; border-color: #22c55e; }
        .iq-check::after {
          content: '';
          display: none;
          width: 5px; height: 9px;
          border: 2px solid #000;
          border-top: none;
          border-left: none;
          transform: rotate(45deg);
        }
        .iq-card.done .iq-check::after { display: block; }

        .iq-diff {
          font-size: 0.62rem;
          padding: 2px 8px;
          border-radius: 999px;
          font-weight: 600;
          letter-spacing: 0.5px;
          flex-shrink: 0;
        }
        .iq-diff-hard  { background: rgba(239,68,68,0.15); color: #f87171; }
        .iq-diff-med   { background: rgba(251,146,60,0.15); color: #fb923c; }
        .iq-diff-easy  { background: rgba(34,197,94,0.15);  color: #4ade80; }

        /* Hidden by search */
        .iq-card.hidden { display: none; }

        /* No results */
        .iq-empty {
          text-align: center;
          padding: 48px 24px;
          color: var(--iq-muted);
          font-size: 0.9rem;
        }

        /* Responsive */
        @media (max-width: 600px) {
          .iq-root { padding: 0 16px 60px; }
          .iq-title { font-size: 1.5rem; }
          .iq-stats { gap: 16px; }
          .iq-text { font-size: 0.85rem; }
          .iq-nav-tab { font-size: 0.78rem; padding: 12px 8px; }
        }
      `}</style>

      {/* ── Header ── */}
      <header className="iq-header">
        <div className="iq-badge">{TOTAL_QUESTIONS} Questions · {TABS.length} Technologies</div>
        <h1 className="iq-title">
          Interview<br />
          <span style={{ color: '#f7df1e' }}>Questions</span> <span style={{ color: '#6b7280', fontWeight: 400, fontSize: '0.6em' }}>Hub</span>
        </h1>
        <p className="iq-subtitle">
          High-frequency, hard-hitting questions across all topics. Track what you've studied.
        </p>
      </header>

      {/* ── Nav tabs ── */}
      <div className="iq-nav-wrap">
        <div className="iq-nav-tabs">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`iq-nav-tab${activeTab === tab.id ? ' active' : ''}`}
              style={activeTab === tab.id ? { '--iq-accent': tab.accent } : {}}
              onClick={() => { setActiveTab(tab.id); setSearch(''); }}
            >
              <span className="iq-dot" style={{ background: tab.accent }}></span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Search ── */}
      <div className="iq-search-wrap">
        <input
          className="iq-search"
          type="text"
          placeholder="Search questions…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* ── Content ── */}
      {activeConfig && (
        <>
          <div className="iq-section-header">
            <div
              className="iq-section-icon"
              style={{ background: `${activeConfig.dim}`, color: activeConfig.accent }}
            >
              {{
                'js': 'JS',
                'react': '⚛',
                'next': 'N',
                'angular': 'A',
                'nodejs': '🟢',
                'python': 'Py',
                'css': '#',
                'html': '<>',
                'dsa': 'Σ',
                'mongodb': '🍃',
                'mysql': 'SQL',
                'redis': 'R',
                'docker': 'D',
                'oops': 'O',
              }[activeConfig.id] || '?'}
            </div>
            <div>
              <div className="iq-section-title">{activeConfig.label}</div>
              <div className="iq-section-count">100 most-asked interview questions</div>
            </div>
          </div>

          <div className="iq-progress-wrap">
            <div className="iq-progress-row">
              <span>Progress</span>
              <span>{progress[activeTab].count} / {progress[activeTab].total}</span>
            </div>
            <div className="iq-progress-bar">
              <div
                className="iq-progress-fill"
                style={{
                  width: `${pct(progress[activeTab].count, progress[activeTab].total)}%`,
                  background: activeConfig.accent
                }}
              />
            </div>
          </div>

          <div className="iq-grid">
            {filtered.length > 0 ? filtered.map(([q, d], i) => {
              const id = `${activeTab}-${i}`;
              const isDone = !!doneMap[id];
              return (
                <div
                  key={id}
                  className={`iq-card${isDone ? ' done' : ''}`}
                  onClick={() => toggleCard(id)}
                >
                  <span className="iq-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="iq-text">{q}</span>
                  <span className={diffClass(d)}>{diffLabel(d)}</span>
                  <div className="iq-check"></div>
                </div>
              );
            }) : (
              <div className="iq-empty">No questions match your search</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
