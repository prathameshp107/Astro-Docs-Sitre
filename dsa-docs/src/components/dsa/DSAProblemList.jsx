import { useState, useMemo, useEffect } from "react";
import ThemeToggle from "../ThemeToggle.jsx";
import Skeleton from "../Skeleton.jsx";
import { DiDatabase } from "react-icons/di";
import { DSA_PROBLEMS, DSA_TOPICS, DIFFICULTY, getTopicsWithCounts } from "../../data/dsa-problems.js";
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
  const diff = DIFFICULTY[problem.difficulty] || DIFFICULTY.Easy;

  return (
    <a
      href={`${base}dsa/problems/${problem.id}`}
      className="dsa-problem-row"
      style={{ animationDelay: `${index * 0.03}s` }}
    >
      <div className="dsa-problem-status" title={solved ? "Solved" : "Unsolved"}>
        <span className={`dsa-problem-status-dot ${solved ? "solved" : ""}`} />
      </div>
      <span className="dsa-problem-num">{problem.number}.</span>
      <span className="dsa-problem-name">{problem.title}</span>
      <span className={`dsa-problem-diff ${problem.difficulty.toLowerCase()}`}>
        {problem.difficulty}
      </span>
      <div className="dsa-problem-topics">
        {problem.topics.slice(0, 2).map(t => {
          const topic = DSA_TOPICS.find(tp => tp.id === t);
          return topic ? (
            <span key={t} className="dsa-problem-topic-tag">{topic.label}</span>
          ) : null;
        })}
      </div>
      <span className="dsa-problem-acceptance">{problem.acceptance}%</span>
      <span className="dsa-problem-xp">+{problem.xp} XP</span>
    </a>
  );
}

export default function DSAProblemList() {
  const [activeTopic, setActiveTopic] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [solvedIds, setSolvedIds] = useState([]);
  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    setSolvedIds(readSolved());
    return () => clearTimeout(timer);
  }, []);

  const topicsWithCounts = useMemo(() => getTopicsWithCounts(), []);

  const filteredProblems = useMemo(() => {
    let problems = DSA_PROBLEMS;

    if (activeTopic !== "all") {
      problems = problems.filter(p => p.topics.includes(activeTopic));
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      problems = problems.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.topics.some(t => t.includes(q))
      );
    }

    if (difficultyFilter) {
      problems = problems.filter(p => p.difficulty === difficultyFilter);
    }

    return problems;
  }, [activeTopic, searchQuery, difficultyFilter]);

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
            <ThemeToggle />
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
      {/* Top Navigation */}
      <div className="dsa-topbar">
        <div className="dsa-topbar-left">
          <a href={`${base}labs`} className="dsa-top-back">
            <FiArrowLeft size={16} />
            Labs
          </a>
          <div className="dsa-top-brand">
            <DiDatabase size={20} color="#6366f1" />
            <span className="dsa-top-title">Problem List</span>
          </div>
        </div>
        <div className="dsa-topbar-center">
          <span className="dsa-top-progress-text">
            {solvedCount}/{filteredProblems.length} solved
          </span>
        </div>
        <div className="dsa-topbar-right">
          <ThemeToggle />
        </div>
      </div>

      {/* Main Layout */}
      <div className="dsa-problems-page">
        {/* Sidebar */}
        <div className="dsa-problems-sidebar">
          <div className="dsa-ps-header">
            <h3>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
              </svg>
              DSA Roadmap
            </h3>
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

        {/* Problems List */}
        <div className="dsa-problems-main">
          {/* Toolbar */}
          <div className="dsa-problems-toolbar">
            <div className="dsa-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {["Easy", "Medium", "Hard"].map(diff => (
              <button
                key={diff}
                className={`dsa-filter-btn ${difficultyFilter === diff ? "active" : ""}`}
                onClick={() => setDifficultyFilter(difficultyFilter === diff ? null : diff)}
              >
                {diff}
              </button>
            ))}
            {difficultyFilter && (
              <button className="dsa-btn-secondary" style={{ padding: "0.35rem 0.55rem", fontSize: "0.72rem" }} onClick={() => setDifficultyFilter(null)}>
                Clear
              </button>
            )}
          </div>

          {/* Problem Rows */}
          <div className="dsa-problems-list">
            {filteredProblems.length === 0 ? (
              <div className="dsa-empty">
                <h2>No problems found</h2>
                <p>Try adjusting your search or filter criteria.</p>
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
