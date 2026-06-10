import { useState, useEffect, useCallback, useRef } from "react";

const labs = [
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
  },
  {
    id: "react",
    title: "React Practice Lab",
    icon: "⚛️",
    shortIcon: "RE",
    description:
      "Interactive React challenges covering hooks, state management, components, forms, context, and performance patterns.",
    status: "Coming Soon",
    statusColor: "#60a5fa",
    path: null,
    color: "#61dafb",
    features: [
      "Component Challenges",
      "Hooks Drills",
      "State Management",
      "Forms & Validation",
      "Performance Tuning",
    ],
  },
  {
    id: "dsa",
    title: "DSA Problem Lab",
    icon: "📊",
    shortIcon: "DS",
    description:
      "Solve Data Structures & Algorithms problems with real-time code execution, test case validation, and performance analysis.",
    status: "Coming Soon",
    statusColor: "#a78bfa",
    path: null,
    color: "#6366f1",
    features: [
      "Arrays & Strings",
      "Trees & Graphs",
      "Dynamic Programming",
      "Sorting & Searching",
      "Test Case Runner",
    ],
  },
  {
    id: "sql",
    title: "SQL Query Lab",
    icon: "🗄️",
    shortIcon: "SQ",
    description:
      "Write and execute SQL queries against sample databases. Practice joins, aggregations, subqueries, and query optimization.",
    status: "Coming Soon",
    statusColor: "#f59e0b",
    path: null,
    color: "#f59e0b",
    features: [
      "JOINs Practice",
      "Aggregations",
      "Subqueries & CTEs",
      "Indexing Challenges",
      "Query Optimization",
    ],
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
  const heroRef = useRef(null);
  const mouseGlowRef = useRef(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!mouseGlowRef.current || !heroRef.current) return;
    requestAnimationFrame(() => {
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      mouseGlowRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(59,130,246,0.15), transparent 60%)`;
    });
  }, []);

  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  return (
    <div className={`landing-page lab-hub-page ${loaded ? "loaded" : ""}`}>
      {/* ─── Floating Particles ─── */}
      <div className="particles" aria-hidden="true">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 8}s`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}
          />
        ))}
      </div>

      {/* ─── Nav ─── */}
      <nav className="landing-nav">
        <div className="nav-inner">
          <a href={base} className="nav-brand" style={{ textDecoration: "none" }}>
            <span className="brand-logo">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="8" fill="url(#lh-brand-grad)" />
                <text x="14" y="19" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">L</text>
                <defs>
                  <linearGradient id="lh-brand-grad" x1="0" y1="0" x2="28" y2="28">
                    <stop offset="0%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#f472b6" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="brand-text">Practice Labs</span>
          </a>
          <div className="nav-links">
            <a href={base} className="nav-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Home
            </a>
            <a href={`${base}overview`} className="nav-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
              </svg>
              Docs
            </a>
            <a href={`${base}playground`} className="nav-link nav-link-playground">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Playground
            </a>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="lab-hero" onMouseMove={handleMouseMove} ref={heroRef}>
        <div className="hero-bg" aria-hidden="true">
          <div className="grid-bg" />
          <div className="hero-glow" ref={mouseGlowRef} />
          <div className="hero-orbe orb-1" />
          <div className="hero-orbe orb-2" />
          <div className="hero-orbe orb-3" />
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Interactive Learning
          </div>

          <h1 className="hero-title">
            Practice Labs{" "}
            <span className="gradient-text lab-gradient">Code. Learn. Master.</span>
          </h1>

          <p className="hero-desc">
            Choose a lab below to start practicing. Each lab provides a curated set
            of challenges, exercises, and tools to help you master the topic.
          </p>
        </div>
      </section>

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
            Built with <strong>React</strong> + <strong>Astro</strong>
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

function LabCard({ lab, index, base }) {
  const [ref, inView] = useInView(0.1);
  const isReady = lab.path !== null;

  const handleClick = () => {
    if (isReady && lab.path) {
      window.location.href = `${base}practice/${lab.path}`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      ref={ref}
      className={`lab-card ${inView ? "in-view" : ""} ${isReady ? "ready" : "coming-soon"}`}
      style={inView ? { animationDelay: `${index * 0.1}s` } : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isReady ? 0 : -1}
      role="button"
      aria-label={isReady ? `Open ${lab.title}` : `${lab.title} — ${lab.status}`}
      aria-disabled={!isReady}
    >
      {/* Card background gradient */}
      <div className="lab-card-bg" aria-hidden="true">
        <div
          className="lab-card-orb"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${lab.color}22, transparent 60%)`,
          }}
        />
        <div
          className="lab-card-orb lab-card-orb-2"
          style={{
            background: `radial-gradient(circle at 80% 80%, ${lab.color}15, transparent 50%)`,
          }}
        />
      </div>

      {/* Status badge */}
      <div className="lab-card-status">
        <span
          className="lab-status-dot"
          style={{ background: lab.statusColor }}
        />
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

      {/* Content */}
      <h3 className="lab-card-title">{lab.title}</h3>
      <p className="lab-card-desc">{lab.description}</p>

      {/* Features */}
      <div className="lab-card-features">
        {lab.features.map((f) => (
          <span key={f} className="lab-feature-chip">
            {f}
          </span>
        ))}
      </div>

      {/* Action */}
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

      {/* Shine effect */}
      <div className="lab-card-shine" />
    </div>
  );
}
