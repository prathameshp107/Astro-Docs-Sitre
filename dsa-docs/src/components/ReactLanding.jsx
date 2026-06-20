import { useState, useEffect, useRef, useCallback } from "react";
import Skeleton, { SkeletonHero, SkeletonStats, SkeletonGrid } from "./Skeleton.jsx";


const topics = [
  "JavaScript", "React", "Angular", "Node.js", "MongoDB",
  "MySQL", "Docker", "DSA", "Python", "Redis",
];

const features = [
  {
    icon: "📝",
    title: "Structured Notes",
    desc: "Well-organized notes across JavaScript, React, Angular, DSA, databases, and more.",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    icon: "💻",
    title: "Code Playground",
    desc: "Write, run, and test JavaScript code right in your browser instantly.",
    gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
  },
  {
    icon: "🎯",
    title: "Interview Prep",
    desc: "Curated interview questions and answers to ace your next tech interview.",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    icon: "📊"  ,
    title: "DSA Visualizer",
    desc: "Interactive visualizations for algorithms, data structures, and problem-solving patterns.",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
];

const learningPaths = [
  {
    abbr: "JS",
    title: "JavaScript",
    desc: "Core fundamentals, async concepts, closures, event loop, and advanced patterns.",
    color: "#f7df1e",
    gradient: "linear-gradient(135deg, rgba(247,223,30,0.15) 0%, rgba(247,223,30,0.05) 100%)",
    progress: 85,
    icon: "🟨",
  },
  {
    abbr: "RE",
    title: "React",
    desc: "Components, Hooks, State Management, Routing, Performance and Interview Prep.",
    color: "#61dafb",
    gradient: "linear-gradient(135deg, rgba(97,218,251,0.15) 0%, rgba(97,218,251,0.05) 100%)",
    progress: 40,
    icon: "⚛️",
  },
  {
    abbr: "ND",
    title: "Node.js",
    desc: "Runtime architecture, Express, async patterns, databases, and production deployment.",
    color: "#339933",
    gradient: "linear-gradient(135deg, rgba(51,153,51,0.15) 0%, rgba(51,153,51,0.05) 100%)",
    progress: 70,
    icon: "🟢",
  },
  {
    abbr: "DB",
    title: "MongoDB",
    desc: "Collections, aggregation, indexing and interview preparation.",
    color: "#47a248",
    gradient: "linear-gradient(135deg, rgba(71,162,72,0.15) 0%, rgba(71,162,72,0.05) 100%)",
    progress: 90,
    icon: "🍃",
  },
  {
    abbr: "DSA",
    title: "Data Structures",
    desc: "Arrays, Trees, Graphs, Dynamic Programming and problem solving.",
    color: "#6366f1",
    gradient: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.05) 100%)",
    progress: 30,
    icon: "📊",
  },
  {
    abbr: "PY",
    title: "Python",
    desc: "Syntax, OOP, modules, file handling, and interview preparation.",
    color: "#3776AB",
    gradient: "linear-gradient(135deg, rgba(55,118,171,0.15) 0%, rgba(55,118,171,0.05) 100%)",
    progress: 60,
    icon: "🐍",
  },
];

const topicExplorer = [
  { name: "JavaScript", icon: "🟨", desc: "Closures, Promises, Event Loop, Prototypes & more", href: "docs/overview", color: "#f7df1e" },
  { name: "React", icon: "⚛️", desc: "Hooks, State, Components, Performance, Testing", href: "docs/overview", color: "#61dafb" },
  { name: "Angular", icon: "🅰️", desc: "Components, Routing, Forms, RxJS, NgRx", href: "docs/overview", color: "#dd0031" },
  { name: "Node.js", icon: "🟢", desc: "Express, Async, Architecture, Databases, Deployment", href: "docs/overview", color: "#339933" },
  { name: "MongoDB", icon: "🍃", desc: "Aggregation, Indexing, Modeling, Replication", href: "docs/overview", color: "#47a248" },
  { name: "MySQL", icon: "🗄️", desc: "Queries, Joins, Indexing, Optimization, ACID", href: "docs/overview", color: "#00758f" },
  { name: "Docker", icon: "🐳", desc: "Containers, Images, Compose, Networking, Volumes", href: "docs/overview", color: "#2496ed" },
  { name: "DSA", icon: "📊", desc: "Arrays, Trees, Graphs, DP, Recursion, Sorting", href: "docs/overview", color: "#6366f1" },
  { name: "Python", icon: "🐍", desc: "Syntax, OOP, Modules, File Handling, Data Science", href: "docs/overview", color: "#3776AB" },
  { name: "Redis", icon: "🔴", desc: "Caching, Pub/Sub, Data Types, Persistence, Clustering", href: "docs/overview", color: "#dc382d" },
];

const recentUpdates = [
  { date: "2026-06", title: "Redis Complete Notes", tag: "New", type: "new" },
  { date: "2026-05", title: "JavaScript Interview Guide (200+ Qs)", tag: "Updated", type: "update" },
  { date: "2026-05", title: "React Hooks Deep Dive", tag: "New", type: "new" },
  { date: "2026-04", title: "Node.js Production Architecture", tag: "New", type: "new" },
  { date: "2026-04", title: "MongoDB Aggregation Pipeline Guide", tag: "Updated", type: "update" },
  { date: "2026-03", title: "Docker Compose & Multi-Stage Builds", tag: "New", type: "new" },
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

function AnimatedCounter({ end, suffix = "" }) {
  const [ref, inView] = useInView(0.5);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.max(1, Math.floor(end / 60));
    const interval = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, duration / 60);
    return () => clearInterval(interval);
  }, [inView, end]);

  return (
    <span ref={ref} className="stat-value">
      {count}{suffix}
    </span>
  );
}

function FloatingOrb({ size, gradient, top, left, delay = 0, duration = 20 }) {
  return (
    <div
      className="floating-orb"
      style={{
        width: size,
        height: size,
        background: gradient,
        top,
        left,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  );
}

export default function ReactLanding() {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const base = import.meta.env.BASE_URL || "/";

  if (loading) {
    return (
      <div className="landing-page loaded">
        <SkeletonHero />
        <SkeletonStats count={4} />
        <SkeletonGrid count={4} variant="card" columns={4} cardHeight="200px" />
        <SkeletonGrid count={6} variant="topic-card" columns={2} cardHeight="60px" />
        <SkeletonGrid count={3} variant="card" columns={3} cardHeight="240px" />
      </div>
    );
  }

  return (
    <div className={`landing-page ${loaded ? "loaded" : ""}`}>
      {/* ─── Hero ─── */}
      <section className="hero">
        <div className="hero-bg">
          <FloatingOrb size="400px" gradient="radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)" top="-100px" left="-100px" delay={0} duration={25} />
          <FloatingOrb size="350px" gradient="radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)" top="50%" right="-150px" delay={5} duration={30} />
          <FloatingOrb size="300px" gradient="radial-gradient(circle, rgba(79,172,254,0.2) 0%, transparent 70%)" bottom="-50px" left="30%" delay={10} duration={22} />
          <div className="hero-grid" />
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            <span className="badge-pulse" />
            Your Complete Learning Hub
          </div>

          <h1 className="hero-title">
            Master Development{" "}
            <span className="hero-highlight">
              <span className="highlight-text">Notes to Interviews</span>
              <svg className="highlight-underline" viewBox="0 0 200 12" fill="none">
                <path d="M2 10C50 2 150 2 198 10" stroke="url(#underlineGrad)" strokeWidth="3" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="underlineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          <p className="hero-desc">
            A comprehensive knowledge base spanning DSA, JavaScript, React,
            Angular, Node.js, MongoDB, MySQL, Docker, Python, Redis, and
            interview preparation — all organized and ready to learn.
          </p>

          <div className="hero-actions">
            <a href={`${base}overview`} className="btn btn-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                <line x1="8" y1="7" x2="16" y2="7" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
              Explore Docs
              <span className="btn-arrow">→</span>
            </a>
            <a href={`${base}labs`} className="btn btn-secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Practice Labs
            </a>
            <a href="https://github.com/prathameshp107/DSA-Notes-Problems" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Star on GitHub
            </a>
          </div>

          <div className="topic-pills">
            {topics.map((topic, i) => (
              <span
                key={topic}
                className="pill"
                style={{ animationDelay: `${0.6 + i * 0.06}s` }}
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <StatsSection />

      {/* ─── Features ─── */}
      <FeaturesSection />

      {/* ─── Topics Explorer ─── */}
      <TopicsExplorerSection base={base} />

      {/* ─── Learning Paths ─── */}
      <PathsSection base={base} />

      {/* ─── Latest Updates ─── */}
      <UpdatesSection />

      {/* ─── CTA ─── */}
      <CTASection base={base} />

      {/* ─── Footer ─── */}
      <Footer base={base} />

      {/* ─── Back to Top ─── */}
      <button
        className={`back-to-top ${showBackToTop ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </div>
  );
}

function StatsSection() {
  const [ref, inView] = useInView(0.3);
  const stats = [
    { value: 1000, suffix: "+", label: "Notes Pages" },
    { value: 500, suffix: "+", label: "Practice Problems" },
    { value: 200, suffix: "+", label: "Interview Q&A" },
    { value: 10, suffix: "+", label: "Learning Tracks" },
  ];

  return (
    <section ref={ref} className={`stats-section ${inView ? "in-view" : ""}`}>
      {stats.map((s, i) => (
        <div key={s.label} className="stat-item" style={inView ? { animationDelay: `${i * 0.1}s` } : undefined}>
          <div className="stat-glow" />
          {inView ? (
            <AnimatedCounter end={s.value} suffix={s.suffix} />
          ) : (
            <span className="stat-value">0{s.suffix}</span>
          )}
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </section>
  );
}

function FeaturesSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section ref={ref} className="features-section">
      <div className="section-header">
        <span className="section-tag">Features</span>
        <h2>Everything You Need to Succeed</h2>
        <p>From structured notes to interactive coding — master development at your own pace.</p>
      </div>
      <div className="features-grid">
        {features.map((f, i) => (
          <div
            key={f.title}
            className={`feature-card ${inView ? "in-view" : ""}`}
            style={inView ? { animationDelay: `${i * 0.12}s` } : undefined}
          >
            <div className="feature-card-glow" style={{ background: f.gradient }} />
            <div className="feature-icon-wrap" style={{ background: `${f.gradient}20` }}>
              <span className="feature-icon">{f.icon}</span>
            </div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TopicsExplorerSection({ base }) {
  const [ref, inView] = useInView(0.1);

  return (
    <section ref={ref} className="topics-section">
      <div className="section-header">
        <span className="section-tag">Topics Covered</span>
        <h2>Explore All Topics</h2>
        <p>Dive deep into any topic with structured notes, examples, and interview prep.</p>
      </div>
      <div className="topics-grid">
        {topicExplorer.map((topic, i) => (
          <a
            key={topic.name}
            href={`${base}${topic.href}`}
            className={`topic-card ${inView ? "in-view" : ""}`}
            style={inView ? { animationDelay: `${i * 0.06}s` } : undefined}
          >
            <span className="topic-card-icon" style={{ background: `${topic.color}15`, borderColor: `${topic.color}30` }}>
              {topic.icon}
            </span>
            <div className="topic-card-info">
              <h4>{topic.name}</h4>
              <p>{topic.desc}</p>
            </div>
            <svg className="topic-card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        ))}
      </div>
    </section>
  );
}

function PathsSection({ base }) {
  const [ref, inView] = useInView(0.1);

  return (
    <section ref={ref} className="paths-section">
      <div className="section-header">
        <span className="section-tag">Learning Paths</span>
        <h2>Structured Learning Journeys</h2>
        <p>Follow guided paths from beginner to interview-ready across all topics.</p>
      </div>
      <div className="paths-grid">
        {learningPaths.map((p, i) => (
          <a
            key={p.title}
            href={`${base}overview`}
            className={`path-card ${inView ? "in-view" : ""}`}
            style={inView ? { animationDelay: `${i * 0.08}s` } : undefined}
          >
            <div className="path-glow" style={{ background: p.gradient }} />
            <div className="path-top">
              <span
                className="path-abbr"
                style={{ background: `${p.color}15`, color: p.color, borderColor: `${p.color}40` }}
              >
                {p.icon}
              </span>
              <svg className="path-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="path-progress">
              <div className="path-progress-bar">
                <div className="path-progress-fill" style={{ width: `${p.progress}%`, background: `linear-gradient(90deg, ${p.color}, ${p.color}99)` }} />
              </div>
              <span className="path-progress-label">{p.progress}%</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function UpdatesSection() {
  const [ref, inView] = useInView(0.2);

  return (
    <section ref={ref} className={`updates-section ${inView ? "in-view" : ""}`}>
      <div className="section-header">
        <span className="section-tag">What's New</span>
        <h2>Latest Updates</h2>
        <p>Fresh content added regularly to keep your learning journey on track.</p>
      </div>
      <div className="updates-timeline">
        {recentUpdates.map((item, i) => (
          <div
            key={item.title}
            className={`update-item ${inView ? "in-view" : ""}`}
            style={inView ? { animationDelay: `${i * 0.08}s` } : undefined}
          >
            <div className="update-dot">
              <div className={`update-dot-inner ${item.type}`} />
            </div>
            <div className="update-content">
              <span className={`update-tag ${item.type}`}>{item.tag}</span>
              <span className="update-title">{item.title}</span>
              <span className="update-date">{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection({ base }) {
  const [ref, inView] = useInView(0.3);
  return (
    <section ref={ref} className={`cta-section ${inView ? "in-view" : ""}`}>
      <div className="cta-bg">
        <div className="cta-orb cta-orb-1" />
        <div className="cta-orb cta-orb-2" />
      </div>
      <div className="cta-card">
        <h2>Ready to Start Learning?</h2>
        <p>Dive into our comprehensive docs or try the interactive playground right now.</p>
        <div className="cta-actions">
          <a href={`${base}overview`} className="btn btn-primary btn-lg">
            Browse Docs
            <span className="btn-arrow">→</span>
          </a>
          <a href={`${base}labs`} className="btn btn-secondary btn-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Practice Labs
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer({ base }) {
  return (
    <footer className="landing-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <defs>
              <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <rect width="32" height="32" rx="10" fill="url(#footerLogoGrad)" />
            <text x="16" y="21" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="Inter">D</text>
          </svg>
          <p>
            Built by <strong>Prathamesh Pawar</strong>
          </p>
        </div>
        <div className="footer-links">
          <a href="https://github.com/prathameshp107/DSA-Notes-Problems" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={`${base}overview`}>Docs</a>
          <a href={`${base}labs`}>Practice Labs</a>
        </div>
      </div>
    </footer>
  );
}