import { useState, useMemo } from "react";
import ThemeToggle from "../ThemeToggle.jsx";
import { DSA_PROBLEMS, DSA_TOPICS, DIFFICULTY, getTopicsWithCounts } from "../../data/dsa-problems.js";

function ProblemRow({ problem, index, base }) {
  const diff = DIFFICULTY[problem.difficulty] || DIFFICULTY.Easy;

  return (
    <a
      href={`${base}dsa/problems/${problem.id}`}
      className="dsa-problem-row"
      style={{ animationDelay: `${index * 0.03}s` }}
    >
      <div className="dsa-problem-status">
        <span className="dsa-problem-status-dot" />
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
  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

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

  const solvedCount = 0; // Will be implemented with progress tracking

  return (
    <div className="dsa-platform">
      {/* Top Navigation */}
      <div className="dsa-topbar">
        <div className="dsa-topbar-left">
          <a href={`${base}practice`} className="dsa-top-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Labs
          </a>
          <div className="dsa-top-brand">
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="#6366f1" />
              <text x="14" y="19" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">DS</text>
            </svg>
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
                    style={{ width: `${Math.min(100, (solvedCount / Math.max(1, topic.count)) * 100)}%`, background: topic.color }}
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
                <ProblemRow key={problem.id} problem={problem} index={i} base={base} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
