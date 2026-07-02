import { useState, useEffect, useRef } from "react";
import Skeleton, { SkeletonHero, SkeletonStats, SkeletonLabCard } from "../Skeleton.jsx";


const labs = [
  {
    id: "html",
    title: "HTML Labs",
    icon: "🔶",
    shortIcon: "HT",
    description:
      "Master HTML through interactive learning. 16 guided lessons, 10 coding challenges, 6 real-world projects, HTML playground with live preview, and interview preparation.",
    status: "Ready",
    statusColor: "#22c55e",
    path: "/labs/html",
    color: "#fb923c",
    features: [
      "Live HTML Preview",
      "16 Interactive Lessons",
      "10 Code Challenges",
      "6 Real-World Projects",
      "50+ Interview Questions",
      "HTML Playground",
    ],
    challengeCount: 32,
    difficulty: "Beginner to Advanced",
  },
  {
    id: "css",
    title: "CSS Labs",
    icon: "🎨",
    shortIcon: "CS",
    description:
      "Master CSS through interactive learning. 20 guided lessons, 10 coding challenges, 10 reusable components, 6 animations, and an interactive playground.",
    status: "Ready",
    statusColor: "#22c55e",
    path: "/labs/css",
    color: "#60a5fa",
    features: [
      "20 Interactive Lessons",
      "Live CSS Preview",
      "10 Code Challenges",
      "10 UI Components Lab",
      "6 Animation Projects",
      "50+ Interview Questions",
    ],
    challengeCount: 46,
    difficulty: "Beginner to Advanced",
  },
  {
    id: "js",
    title: "JS Interview Lab",
    icon: "🟨",
    shortIcon: "JS",
    description:
      "Practice JavaScript with a full-featured code playground, snippet output questions, fix-the-bug challenges, mini app projects, and timed interview mode.",
    status: "Ready",
    statusColor: "#22c55e",
    path: "js-lab",
    color: "#f7df1e",
    features: [
      "Monaco Code Editor",
      "100+ Snippet Questions",
      "20+ Bug Challenges",
      "Timed Interview Mode",
      "Mini App Projects",
    ],
    challengeCount: 150,
    difficulty: "Beginner to Advanced",
  },
  {
    id: "react",
    title: "React Practice Lab",
    icon: "⚛️",
    shortIcon: "RE",
    description:
      "Interactive React challenges covering hooks, state management, components, forms, context, and performance patterns.",
    status: "Ready",
    statusColor: "#22c55e",
    path: "react-lab",
    color: "#61dafb",
    features: [
      "Component Challenges",
      "Hooks Drills",
      "State Management",
      "Forms & Validation",
      "Performance Tuning",
    ],
    challengeCount: 80,
    difficulty: "Intermediate",
  },
  {
    id: "dsa",
    title: "DSA Problem Lab",
    icon: "📊",
    shortIcon: "DS",
    description:
      "Solve Data Structures & Algorithms problems with real-time code execution, test case validation, and performance analysis.",
    status: "Ready",
    statusColor: "#22c55e",
    path: "/dsa/problems",
    color: "#6366f1",
    features: [
      "Arrays & Strings",
      "Trees & Graphs",
      "Dynamic Programming",
      "Sorting & Searching",
      "Test Case Runner",
    ],
    challengeCount: 20,
    difficulty: "Beginner to Advanced",
  },
  {
    id: "sql",
    title: "SQL Query Lab",
    icon: "🗄️",
    shortIcon: "SQ",
    description:
      "Write and execute SQL queries against sample databases. Practice joins, aggregations, subqueries, and query optimization.",
    status: "Ready",
    statusColor: "#22c55e",
    path: "/labs/mysql",
    color: "#f59e0b",
    features: [
      "JOINs Practice",
      "Aggregations",
      "Subqueries & CTEs",
      "Indexing Challenges",
      "Query Optimization",
    ],
    challengeCount: 100,
    difficulty: "Intermediate",
  },
  {
    id: "python",
    title: "Python Labs",
    icon: "🐍",
    shortIcon: "PY",
    description:
      "Master Python from beginner to advanced. 20 guided lessons, 10 coding challenges, 8 real-world projects, and 10 debugging exercises.",
    status: "Ready",
    statusColor: "#22c55e",
    path: "/labs/python",
    color: "#3776AB",
    features: [
      "20 Guided Lessons",
      "10 Code Challenges",
      "8 Projects (Todo, Weather, AI)",
      "10 Debug Challenges",
      "Monaco Editor + Pyodide",
    ],
    challengeCount: 48,
    difficulty: "Beginner to Advanced",
  },
  {
    id: "mongodb",
    title: "MongoDB Lab",
    icon: "🍃",
    shortIcon: "MO",
    description:
      "Learn MongoDB with guided lessons, interactive queries, aggregation pipeline builder, and real-time document exploration. Master NoSQL the right way.",
    status: "Ready",
    statusColor: "#22c55e",
    path: "/labs/mongodb",
    color: "#13aa52",
    features: [
      "16 Guided Lessons",
      "Query Playground",
      "Aggregation Pipeline Builder",
      "Collections Explorer",
      "8+ Query Challenges",
    ],
    challengeCount: 30,
    difficulty: "Beginner to Advanced",
  },
  {
    id: "git",
    title: "Git & GitHub Labs",
    icon: "🔄",
    shortIcon: "GI",
    description:
      "Master Git and GitHub through interactive visual simulations. Learn branching, merging, rebasing, merge conflicts, and team collaboration workflows.",
    status: "Ready",
    statusColor: "#22c55e",
    path: "/labs/git",
    color: "#f59e0b",
    features: [
      "30 Interactive Lessons",
      "Visual Commit Graph",
      "Git CLI Terminal Simulator",
      "Merge Conflict Arena",
      "Team Collaboration Simulator",
      "Boss Battles & Achievements",
    ],
    challengeCount: 50,
    difficulty: "Beginner to Advanced",
  },
  {
    id: "tailwind",
    title: "Tailwind CSS Playground",
    icon: "🌊",
    shortIcon: "TW",
    description:
      "Master Tailwind CSS through interactive learning. 50+ guided lessons across 20 chapters covering utility classes, flexbox, grid, responsive design, dark mode, animations, and components.",
    status: "Ready",
    statusColor: "#22c55e",
    path: "/labs/tailwind-lab",
    color: "#38bdf8",
    features: [
      "50+ Interactive Lessons",
      "20 Chapters of Content",
      "Live HTML Preview",
      "Tailwind CDN Support",
      "Responsive Preview Modes",
      "Automated Tests",
    ],
    challengeCount: 50,
    difficulty: "Beginner to Advanced",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

export default function LabHub() {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showQuickStart, setShowQuickStart] = useState(true);

  useEffect(() => {
    const visited = sessionStorage.getItem("labhub-visited");
    if (visited) {
      setShowQuickStart(false);
    }
  }, []);

  useEffect(() => {
    setLoaded(true);
    const timer = setTimeout(() => setLoading(false), 350);
    sessionStorage.setItem("labhub-visited", "true");
    return () => clearTimeout(timer);
  }, []);

  const dismissQuickStart = () => {
    setShowQuickStart(false);
  };

  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  const totalChallenges = labs.reduce((sum, l) => sum + l.challengeCount, 0);
  const readyLabs = labs.filter((l) => l.status === "Ready").length;
  const totalLabs = labs.length;

  if (loading) {
    return (
      <div className="landing-page lab-hub-page loaded">
        <SkeletonHero />
        <SkeletonStats count={4} />
        <div className="lab-cards-grid" style={{ padding: '0 16px' }}>
          {Array.from({ length: 6 }, (_, i) => (
            <SkeletonLabCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`landing-page lab-hub-page ${loaded ? "loaded" : ""}`}>
      {/* ─── Hero ─── */}
      <section className="lab-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Interactive Learning
          </div>

          <h1 className="hero-title">
            Practice Labs{" "}
            <span className="hero-highlight">Code. Learn. Master.</span>
          </h1>

          <p className="hero-desc">
            Choose a lab below to start practicing. Each lab provides a curated set
            of challenges, exercises, and tools to help you master the topic.
          </p>
        </div>
      </section>

      {/* ─── Lab Stats Bar ─── */}
      <section className="lab-stats-bar">
        <div className="lab-stat-item">
          <span className="lab-stat-value">{totalLabs}</span>
          <span className="lab-stat-label">Total Labs</span>
        </div>
        <div className="lab-stat-divider" />
        <div className="lab-stat-item">
          <span className="lab-stat-value">{readyLabs}</span>
          <span className="lab-stat-label">Active</span>
        </div>
        <div className="lab-stat-divider" />
        <div className="lab-stat-item">
          <span className="lab-stat-value">{totalChallenges}+</span>
          <span className="lab-stat-label">Challenges</span>
        </div>
        <div className="lab-stat-divider" />
        <div className="lab-stat-item">
          <span className="lab-stat-value">{labs.filter(l => l.status === "Coming Soon").length}</span>
          <span className="lab-stat-label">Coming Soon</span>
        </div>
      </section>

      {/* ─── Quick Start Guide ─── */}
      {showQuickStart && (
        <section className="quick-start-section">
          <button className="quick-start-close" onClick={dismissQuickStart} aria-label="Dismiss">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="quick-start-content">
            <div className="quick-start-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <div className="quick-start-text">
              <strong>Getting Started</strong>
              <p>Pick a lab, write code, run tests, and track your progress. Ready labs are fully interactive — just click &ldquo;Open Lab&rdquo; to begin.</p>
            </div>
          </div>
        </section>
      )}

      {/* ─── Lab Cards ─── */}
      <section className="lab-cards-section">
        <div className="lab-cards-grid">
          {labs.map((lab, i) => (
            <LabCard key={lab.id} lab={lab} index={i} base={base} />
          ))}
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <p>
            Built by <strong>Prathamesh Pawar</strong>
          </p>
          <div className="footer-links">
            <a href="https://github.com/prathameshp107/DSA-Notes-Problems" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={`${base}overview`}>Docs</a>
            <a href={base}>Home</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const difficultyColors = {
  "Beginner to Advanced": "#22c55e",
  "Intermediate": "#f59e0b",
  "All Levels": "#3b82f6",
};

function LabCard({ lab, index, base }) {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  const isReady = lab.path !== null;

  const handleClick = () => {
    if (isReady && lab.path) {
      if (lab.path.startsWith("/")) {
        window.location.href = `${base}${lab.path.slice(1)}`;
      } else {
        window.location.href = `${base}labs/${lab.path}`;
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const diffColor = difficultyColors[lab.difficulty] || "#64748b";

  return (
    <div
      ref={ref}
      className={`lab-card ${inView ? "in-view" : ""} ${isReady ? "ready" : "coming-soon"}`}
      style={inView ? { animationDelay: `${index * 0.1}s` } : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={isReady ? 0 : -1}
      role="button"
      aria-label={isReady ? `Open ${lab.title}` : `${lab.title} — ${lab.status}`}
      aria-disabled={!isReady}
    >
      {/* Status badge */}
      <div className="lab-card-status">
        <span className="lab-status-dot" style={{ background: lab.statusColor }} />
        <span className="lab-status-text" style={{ color: lab.statusColor }}>
          {lab.status}
        </span>
      </div>

      {/* Icon */}
      <div
        className="lab-card-icon"
        style={{
          background: `${lab.color}15`,
          borderColor: `${lab.color}30`,
          color: lab.color,
        }}
      >
        <span className="lab-icon-text">{lab.shortIcon}</span>
      </div>

      <h3 className="lab-card-title">{lab.title}</h3>
      <p className="lab-card-desc">{lab.description}</p>

      <div className="lab-card-meta">
        <span
          className="lab-diff-badge"
          style={{
            background: `${diffColor}12`,
            color: diffColor,
            borderColor: `${diffColor}25`,
          }}
        >
          {lab.difficulty}
        </span>
        <span className="lab-challenge-count">
          {lab.challengeCount} challenges
        </span>
      </div>

      <div className="lab-card-features">
        {lab.features.slice(0, hovered ? lab.features.length : 3).map((f) => (
          <span key={f} className="lab-feature-chip">
            {f}
          </span>
        ))}
        {!hovered && lab.features.length > 3 && (
          <span className="lab-feature-chip lab-feature-more">
            +{lab.features.length - 3} more
          </span>
        )}
      </div>

      <div className="lab-card-action">
        {isReady ? (
          <span className="lab-action-btn">
            Open Lab
            <svg className="lab-action-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        ) : (
          <span className="lab-action-soon">Coming Soon</span>
        )}
      </div>
    </div>
  );
}
