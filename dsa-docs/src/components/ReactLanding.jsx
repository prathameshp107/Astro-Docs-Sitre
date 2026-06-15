import { useState, useEffect, useRef, useCallback } from "react";
import ThemeToggle from "./mcq/ThemeToggle.jsx";

const topics = [
  "JavaScript", "React", "Angular", "Node.js", "MongoDB",
  "MySQL", "Docker", "DSA", "Python", "Redis",
];

const features = [
  {
    icon: "📝",
    title: "Structured Notes",
    desc: "Well-organized notes across JavaScript, React, Angular, DSA, databases, and more.",
    gradient: "from-blue-400",
  },
  {
    icon: "💻",
    title: "Code Playground",
    desc: "Write, run, and test JavaScript code right in your browser instantly.",
    gradient: "from-emerald-400",
  },
  {
    icon: "🎯",
    title: "Interview Prep",
    desc: "Curated interview questions and answers to ace your next tech interview.",
    gradient: "from-purple-400",
  },
  {
    icon: "📊",
    title: "DSA Problems",
    desc: "Data Structures & Algorithms with patterns, solutions, and visual explanations.",
    gradient: "from-cyan-400",
  },
];

const learningPaths = [
  {
    abbr: "JS",
    title: "JavaScript",
    desc: "Core fundamentals, async concepts, closures, event loop, and advanced patterns.",
    color: "#f7df1e",
    progress: 85,
    icon: "🟨",
  },
  {
    abbr: "RE",
    title: "React",
    desc: "Components, Hooks, State Management, Routing, Performance and Interview Prep.",
    color: "#61dafb",
    progress: 40,
    icon: "⚛️",
  },
  {
    abbr: "ND",
    title: "Node.js",
    desc: "Runtime architecture, Express, async patterns, databases, and production deployment.",
    color: "#339933",
    progress: 70,
    icon: "🟢",
  },
  {
    abbr: "DB",
    title: "MongoDB",
    desc: "Collections, aggregation, indexing and interview preparation.",
    color: "#47a248",
    progress: 90,
    icon: "🍃",
  },
  {
    abbr: "DSA",
    title: "Data Structures",
    desc: "Arrays, Trees, Graphs, Dynamic Programming and problem solving.",
    color: "#6366f1",
    progress: 30,
    icon: "📊",
  },
  {
    abbr: "PY",
    title: "Python",
    desc: "Syntax, OOP, modules, file handling, and interview preparation.",
    color: "#3776AB",
    progress: 60,
    icon: "🐍",
  },
];

const topicExplorer = [
  { name: "JavaScript", icon: "🟨", desc: "Closures, Promises, Event Loop, Prototypes & more", href: "docs/overview" },
  { name: "React", icon: "⚛️", desc: "Hooks, State, Components, Performance, Testing", href: "docs/overview" },
  { name: "Angular", icon: "🅰️", desc: "Components, Routing, Forms, RxJS, NgRx", href: "docs/overview" },
  { name: "Node.js", icon: "🟢", desc: "Express, Async, Architecture, Databases, Deployment", href: "docs/overview" },
  { name: "MongoDB", icon: "🍃", desc: "Aggregation, Indexing, Modeling, Replication", href: "docs/overview" },
  { name: "MySQL", icon: "🗄️", desc: "Queries, Joins, Indexing, Optimization, ACID", href: "docs/overview" },
  { name: "Docker", icon: "🐳", desc: "Containers, Images, Compose, Networking, Volumes", href: "docs/overview" },
  { name: "DSA", icon: "📊", desc: "Arrays, Trees, Graphs, DP, Recursion, Sorting", href: "docs/overview" },
  { name: "Python", icon: "🐍", desc: "Syntax, OOP, Modules, File Handling, Data Science", href: "docs/overview" },
  { name: "Redis", icon: "🔴", desc: "Caching, Pub/Sub, Data Types, Persistence, Clustering", href: "docs/overview" },
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

export default function ReactLanding() {
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const heroRef = useRef(null);
  const mouseGlowRef = useRef(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // Scroll-aware navbar and back-to-top
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 80);
      setShowBackToTop(scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  const base = import.meta.env.BASE_URL || "/";

  return (
    <div className={`landing-page ${loaded ? "loaded" : ""}`}>
      {/* ─── Floating Particles ─── */}
      <div className="particles" aria-hidden="true">
        {[...Array(20)].map((_, i) => (
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
      <nav className={`landing-nav ${scrolled ? "nav-scrolled" : ""}`}>
        <div className="nav-inner">
          <a href={base} className="nav-brand" style={{ textDecoration: "none" }}>
            <span className="brand-logo">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="8" fill="url(#brand-grad)" />
                <text x="14" y="19" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">D</text>
                <defs>
                  <linearGradient id="brand-grad" x1="0" y1="0" x2="28" y2="28">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#2dd4bf" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="brand-text">DSA & Dev Notes</span>
          </a>
          <div className="nav-links">
            <a href={`${base}visualizer`} className="nav-link nav-link-playground">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              DSA Visualizer
            </a>
            <a href={`${base}playground`} className="nav-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Practice Labs
            </a>
            <a href={`${base}mcq`} className="nav-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="8 12 11 15 16 9" />
              </svg>
              MCQ Hub
            </a>
            <a href={`${base}overview`} className="nav-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
              </svg>
              Docs
            </a>
            <ThemeToggle />
            <a
              href="https://github.com/prathameshp107/DSA-Notes-Problems"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link nav-link-icon"
              title="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section
        className="hero"
        onMouseMove={handleMouseMove}
        ref={heroRef}
      >
        <div className="hero-bg" aria-hidden="true">
          <div className="grid-bg" />
          <div
            className="hero-glow"
            ref={mouseGlowRef}
          />
          <div className="hero-orbe orb-1" />
          <div className="hero-orbe orb-2" />
          <div className="hero-orbe orb-3" />
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Your Complete Learning Hub
          </div>

          <h1 className="hero-title">
            Master Development{" "}
            <span className="gradient-text">Notes to Interviews</span>
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
            <a href={`${base}practice`} className="btn btn-secondary">
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
                style={{ animationDelay: `${0.8 + i * 0.06}s` }}
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Code Preview Mockup */}
        <div className="hero-code-preview" aria-hidden="true">
          <div className="code-window">
            <div className="code-window-header">
              <span className="code-dot code-dot-red" />
              <span className="code-dot code-dot-yellow" />
              <span className="code-dot code-dot-green" />
              <span className="code-window-title">example.js</span>
            </div>
            <div className="code-window-body">
              <pre><span className="kw">function</span> <span className="fn">fibonacci</span>(n) {"{"}
  <span className="kw">if</span> (n &lt;= 1) <span className="kw">return</span> n;
  <span className="kw">return</span> <span className="fn">fibonacci</span>(n-1) + <span className="fn">fibonacci</span>(n-2);
{"}"}

<span className="cm">// Try it yourself!</span>
<span className="fn">console</span>.<span className="fn">log</span>(<span className="fn">fibonacci</span>(<span className="num">10</span>));
<span className="cm">// → 55</span></pre>
            </div>
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
      {stats.map((s) => (
        <div key={s.label} className="stat-item">
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
            <div className="feature-icon-wrap">
              <span className="feature-icon">{f.icon}</span>
            </div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
            <div className="feature-shine" />
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
            <span className="topic-card-icon">{topic.icon}</span>
            <div className="topic-card-info">
              <h4>{topic.name}</h4>
              <p>{topic.desc}</p>
            </div>
            <svg className="topic-card-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            <div className="path-top">
              <span
                className="path-abbr"
                style={{ background: `${p.color}1a`, color: p.color, borderColor: `${p.color}33` }}
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
                <div className="path-progress-fill" style={{ width: `${p.progress}%`, background: p.color }} />
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
        <span className="section-tag">What&apos;s New</span>
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
      <div className="cta-card">
        <div className="cta-glow" aria-hidden="true" />
        <h2>Ready to Start Learning?</h2>
        <p>Dive into our comprehensive docs or try the interactive playground right now.</p>
        <div className="cta-actions">
          <a href={`${base}overview`} className="btn btn-primary btn-lg">
            Browse Docs
            <span className="btn-arrow">→</span>
          </a>
          <a href={`${base}practice`} className="btn btn-secondary btn-lg">
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
        <p>
          Built by <strong>Prathamesh Pawar</strong>
        </p>
        <div className="footer-links">
          <a href="https://github.com/prathameshp107/DSA-Notes-Problems" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={`${base}overview`}>Docs</a>
          <a href={`${base}practice`}>Practice Labs</a>
        </div>
      </div>
    </footer>
  );
}
