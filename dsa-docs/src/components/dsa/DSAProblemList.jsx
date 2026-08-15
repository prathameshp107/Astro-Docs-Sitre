import { useState, useMemo, useEffect } from "react";
import ThemeToggle from "../ThemeToggle.jsx";
import Skeleton from "../Skeleton.jsx";
import { DiDatabase } from "react-icons/di";
import { DSA_PROBLEMS, DSA_TOPICS, DIFFICULTY, getTopicsWithCounts } from "../../data/dsa-problems.js";
import { CompanyIcon } from "../companies/CompanyIcons.jsx";
import { FiArrowLeft } from "react-icons/fi";


const SOLVED_KEY = "dsa-solved-v1";

function readSolved() {
  try {
    return JSON.parse(localStorage.getItem(SOLVED_KEY)) || [];
  } catch {
    return [];
  }
}

function ProblemRow({ problem, index, base, solved }) {
  return (
    <a
      href={`${base}dsa/problems/${problem.id}`}
      className="dsa-problem-row"
      style={{ animationDelay: `${index * 0.02}s` }}
    >
      <div className="dsa-col-status dsa-problem-status" title={solved ? "Solved" : "Unsolved"}>
        <span className={`dsa-problem-status-dot ${solved ? "solved" : ""}`} />
      </div>
      <span className="dsa-col-num dsa-problem-num">{problem.number}.</span>
      <span className="dsa-col-name dsa-problem-name">{problem.title}</span>
      <div className="dsa-col-diff flex items-center justify-center">
        <span className={`dsa-problem-diff ${problem.difficulty.toLowerCase()}`}>
          {problem.difficulty}
        </span>
      </div>
      <div className="dsa-col-topics dsa-problem-topics">
        {problem.topics.slice(0, 2).map(t => {
          const topic = DSA_TOPICS.find(tp => tp.id === t);
          return topic ? (
            <span key={t} className="dsa-problem-topic-tag">{topic.label}</span>
          ) : null;
        })}
      </div>
      <div className="dsa-col-companies dsa-problem-companies">
        {problem.companies && problem.companies.length > 0 ? (
          <>
            {problem.companies.slice(0, 5).map(c => (
              <span key={c} className="dsa-company-icon-badge" title={`Asked in ${c}`}>
                <CompanyIcon companyId={c} size={15} />
              </span>
            ))}
            {problem.companies.length > 5 && (
              <span className="dsa-company-tag-more" title={`+${problem.companies.length - 5} more: ${problem.companies.slice(5).join(', ')}`}>
                +{problem.companies.length - 5}
              </span>
            )}
          </>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        )}
      </div>
      <span className="dsa-col-acceptance dsa-problem-acceptance">{problem.acceptance}%</span>
      <span className="dsa-col-xp dsa-problem-xp">+{problem.xp} XP</span>
    </a>
  );
}

export default function DSAProblemList() {
  const [activeTopic, setActiveTopic] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState(null);
  const [companyFilter, setCompanyFilter] = useState(null);
  const [loading, setLoading] = useState(false); // SSR-safe: effects do not run on the server, so an initial `true` made the server-rendered HTML a skeleton with no crawlable content.
  const [solvedIds, setSolvedIds] = useState([]);
  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    setSolvedIds(readSolved());
    return () => clearTimeout(timer);
  }, []);

  const topicsWithCounts = useMemo(() => getTopicsWithCounts(), []);

  const ALL_COMPANIES = useMemo(() => {
    const set = new Set();
    for (const p of DSA_PROBLEMS) {
      if (Array.isArray(p.companies)) {
        for (const c of p.companies) set.add(c);
      }
    }
    return Array.from(set).sort();
  }, []);

  const filteredProblems = useMemo(() => {
    let problems = DSA_PROBLEMS;

    if (activeTopic !== "all") {
      problems = problems.filter(p => p.topics.includes(activeTopic));
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      problems = problems.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.topics.some(t => t.includes(q)) ||
        (p.companies && p.companies.some(c => c.toLowerCase().includes(q)))
      );
    }

    if (difficultyFilter) {
      problems = problems.filter(p => p.difficulty === difficultyFilter);
    }

    if (companyFilter) {
      problems = problems.filter(p => p.companies && p.companies.includes(companyFilter));
    }

    return problems;
  }, [activeTopic, searchQuery, difficultyFilter, companyFilter]);

  const solvedSet = useMemo(() => new Set(solvedIds), [solvedIds]);
  const solvedCount = useMemo(
    () => filteredProblems.filter(p => solvedSet.has(p.id)).length,
    [filteredProblems, solvedSet]
  );
  const solvedByTopic = useMemo(() => {
    const counts = {};
    for (const p of DSA_PROBLEMS) {
      if (!solvedSet.has(p.id)) continue;
      for (const t of p.topics) counts[t] = (counts[t] || 0) + 1;
    }
    return counts;
  }, [solvedSet]);

  if (loading) {
    return (
      <div className="dsa-platform">
        <div className="dsa-topbar">
          <div className="dsa-topbar-left">
            <Skeleton variant="text" width="80px" height="16px" />
          </div>
          <div className="dsa-topbar-right">
            <Skeleton variant="text" width="60px" height="16px" />
          </div>
        </div>
        <div className="dsa-problems-page">
          <div className="skeleton-dsa-sidebar" style={{ width: '280px' }}>
            <div style={{ padding: '12px' }}>
              <Skeleton variant="text" width="100px" height="14px" style={{ marginBottom: '12px' }} />
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0' }}>
                  <Skeleton variant="avatar" size="16px" />
                  <Skeleton variant="text" width="60%" height="12px" />
                  <Skeleton variant="badge" width="24px" height="12px" style={{ marginLeft: 'auto' }} />
                </div>
              ))}
            </div>
          </div>
          <div className="dsa-problems-main">
            <div className="dsa-problems-toolbar">
              <Skeleton variant="text" width="260px" height="30px" borderRadius="6px" />
            </div>
            <div className="skeleton-dsa-list">
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="skeleton-dsa-row">
                  <Skeleton variant="avatar" size="8px" />
                  <Skeleton variant="text" width="30px" height="12px" />
                  <Skeleton variant="text" width="50%" height="14px" />
                  <Skeleton variant="badge" width="50px" height="18px" style={{ marginLeft: 'auto' }} />
                  <Skeleton variant="badge" width="40px" height="12px" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dsa-platform">
      {/* Sub Navigation Bar */}
      <div className="dsa-topbar">
        <div className="dsa-topbar-left">
          <a href={`${base}labs`} className="dsa-top-back">
            <FiArrowLeft size={15} />
            <span>Labs</span>
          </a>
          <div className="dsa-top-brand">
            <DiDatabase size={18} color="#6366f1" />
            <span className="dsa-top-title">Problem List</span>
          </div>
        </div>
        <div className="dsa-topbar-center">
          <div className="flex items-center gap-2">
            <span className="dsa-top-progress-text">
              {solvedCount} of {filteredProblems.length} solved
            </span>
            <div className="dsa-top-progress-bar">
              <div
                className="dsa-top-progress-fill"
                style={{ width: `${filteredProblems.length > 0 ? (solvedCount / filteredProblems.length) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="dsa-problems-page">
        {/* Topic Sidebar */}
        <div className="dsa-problems-sidebar">
          <div className="dsa-ps-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
            <h3>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
              </svg>
              DSA Roadmap
            </h3>
            <a
              href={`${base}dsa/patterns`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#a5b4fc',
                background: 'rgba(99, 102, 241, 0.12)',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                borderRadius: '6px',
                padding: '4px 8px',
                textDecoration: 'none',
                marginTop: '4px',
              }}
            >
              ⚡ Patterns Cheatsheet
            </a>
          </div>

          {/* All Problems */}
          <div className="dsa-ps-topic-group">
            <button
              className={`dsa-ps-topic-header ${activeTopic === "all" ? "active" : ""}`}
              onClick={() => setActiveTopic("all")}
            >
              <span className="dsa-ps-topic-icon">📋</span>
              <span className="dsa-ps-topic-label">All Problems</span>
              <span className="dsa-ps-topic-count">{DSA_PROBLEMS.length}</span>
            </button>
          </div>

          {/* Topic groups */}
          {topicsWithCounts.filter(t => t.count > 0).map(topic => (
            <div key={topic.id} className="dsa-ps-topic-group">
              <button
                className={`dsa-ps-topic-header ${activeTopic === topic.id ? "active" : ""}`}
                onClick={() => setActiveTopic(topic.id)}
              >
                <span className="dsa-ps-topic-icon">{topic.icon}</span>
                <span className="dsa-ps-topic-label">{topic.label}</span>
                <span className="dsa-ps-topic-count">{topic.count}</span>
              </button>
              {activeTopic === topic.id && (
                <div className="dsa-ps-topic-bar">
                  <div
                    className="dsa-ps-topic-fill"
                    style={{ width: `${Math.min(100, ((solvedByTopic[topic.id] || 0) / Math.max(1, topic.count)) * 100)}%`, background: topic.color }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main Problems Area */}
        <div className="dsa-problems-main">
          {/* Search & Filter Toolbar */}
          <div className="dsa-problems-toolbar">
            <div className="dsa-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search by title, topic, or company (e.g. Amazon)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Company Filter Dropdown */}
              <div className="dsa-company-select-box">
                <select
                  value={companyFilter || ''}
                  onChange={(e) => setCompanyFilter(e.target.value || null)}
                  className="dsa-company-select"
                >
                  <option value="">All Companies</option>
                  {ALL_COMPANIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filters */}
              {["Easy", "Medium", "Hard"].map(diff => (
                <button
                  key={diff}
                  className={`dsa-filter-btn ${difficultyFilter === diff ? "active" : ""}`}
                  onClick={() => setDifficultyFilter(difficultyFilter === diff ? null : diff)}
                >
                  {diff}
                </button>
              ))}
              {(difficultyFilter || companyFilter || searchQuery) && (
                <button
                  className="dsa-btn-secondary"
                  style={{ padding: "0.3rem 0.5rem", fontSize: "0.7rem" }}
                  onClick={() => { setDifficultyFilter(null); setCompanyFilter(null); setSearchQuery(""); }}
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Table Header Row */}
          <div className="dsa-problem-table-head">
            <span className="dsa-col-status">Status</span>
            <span className="dsa-col-num">#</span>
            <span className="dsa-col-name">Title</span>
            <span className="dsa-col-diff text-center">Difficulty</span>
            <span className="dsa-col-topics">Topics</span>
            <span className="dsa-col-companies">Asked In</span>
            <span className="dsa-col-acceptance text-right">Acceptance</span>
            <span className="dsa-col-xp text-right">Reward</span>
          </div>

          {/* Problem Rows List */}
          <div className="dsa-problems-list">
            {filteredProblems.length === 0 ? (
              <div className="dsa-empty">
                <h2>No problems found</h2>
                <p>Try adjusting your search, topic, or company filter criteria.</p>
              </div>
            ) : (
              filteredProblems.map((problem, i) => (
                <ProblemRow key={problem.id} problem={problem} index={i} base={base} solved={solvedSet.has(problem.id)} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
