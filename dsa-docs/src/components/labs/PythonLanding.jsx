import { useState, useEffect } from "react";
import Skeleton, { SkeletonHero, SkeletonStats, SkeletonGrid } from "../Skeleton.jsx";


const sections = [
  {
    icon: "📚",
    title: "Learn Python",
    desc: "20 guided lessons from basics to async Python. Interactive examples, tasks, and automated tests.",
    color: "#3776AB",
  },
  {
    icon: "⚡",
    title: "Code Challenges",
    desc: "10 coding challenges from FizzBuzz to Log Analyzer. Test your skills with automated validation.",
    color: "#f59e0b",
  },
  {
    icon: "🛠️",
    title: "Projects Lab",
    desc: "8 real-world projects: Todo CLI, Expense Manager, Password Manager, Weather App, AI Assistant, and more.",
    color: "#22c55e",
  },
  {
    icon: "🐛",
    title: "Debug Challenges",
    desc: "10 debugging exercises. Fix common Python bugs: mutable defaults, scope issues, recursion limits.",
    color: "#ef4444",
  },
];

const roadmapLevels = [
  {
    icon: "🐍",
    title: "Beginner",
    items: ["Variables & Types", "Operators", "Conditionals", "Loops", "Functions", "Lists & Dictionaries"],
    color: "#22c55e",
  },
  {
    icon: "⚙️",
    title: "Intermediate",
    items: ["Comprehensions", "File Handling", "Exception Handling", "Modules", "OOP", "Inheritance"],
    color: "#f59e0b",
  },
  {
    icon: "🚀",
    title: "Advanced",
    items: ["Generators", "Decorators", "Context Managers", "Async Python", "Advanced OOP", "Design Patterns"],
    color: "#ef4444",
  },
];

export default function PythonLanding() {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoaded(true);
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  if (loading) {
    return (
      <div className="landing-page loaded">
        <SkeletonHero />
        <SkeletonStats count={4} />
        <SkeletonGrid count={4} variant="card" columns={2} cardHeight="200px" />
        <SkeletonGrid count={3} variant="card" columns={3} cardHeight="180px" />
      </div>
    );
  }

  return (
    <div className={`landing-page ${loaded ? "loaded" : ""}`}>
      {/* Hero */}
      <section className="hero" style={{ paddingBottom: "2rem" }}>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Interactive Python Learning
          </div>
          <h1 className="hero-title" style={{ maxWidth: "700px", margin: "0 auto" }}>
            Master Python Through{" "}
            <span className="hero-highlight">
              <span className="highlight-text" style={{ background: "linear-gradient(135deg, #3776AB, #FFD43B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Interactive Learning
              </span>
            </span>
          </h1>
          <p className="hero-desc" style={{ maxWidth: "600px", margin: "1rem auto 2rem" }}>
            Write Code. Build Projects. Solve Challenges. Prepare For Interviews.
          </p>
          <div className="hero-actions" style={{ justifyContent: "center" }}>
            <a href={`${base}labs/python-lab`} className="btn btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "0.35rem" }}>
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Start Learning
            </a>
            <a href={`${base}labs/python-lab`} className="btn btn-secondary">
              Practice Python
            </a>
            <a href={`${base}labs/python-lab`} className="btn btn-ghost">
              Python Roadmap
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="lab-stats-bar" style={{ maxWidth: "700px", margin: "0 auto 2.5rem" }}>
        <div className="lab-stat-item">
          <span className="lab-stat-value">20</span>
          <span className="lab-stat-label">Lessons</span>
        </div>
        <div className="lab-stat-divider" />
        <div className="lab-stat-item">
          <span className="lab-stat-value">10</span>
          <span className="lab-stat-label">Challenges</span>
        </div>
        <div className="lab-stat-divider" />
        <div className="lab-stat-item">
          <span className="lab-stat-value">8</span>
          <span className="lab-stat-label">Projects</span>
        </div>
        <div className="lab-stat-divider" />
        <div className="lab-stat-item">
          <span className="lab-stat-value">10</span>
          <span className="lab-stat-label">Debug Challenges</span>
        </div>
      </section>

      {/* Section Cards */}
      <section className="lab-cards-section" style={{ maxWidth: "900px", margin: "0 auto 3rem", padding: "0 1.5rem" }}>
        <div className="lab-cards-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {sections.map((sec, i) => (
            <SectionCard key={sec.title} icon={sec.icon} title={sec.title} desc={sec.desc} color={sec.color} href={`${base}labs/python-lab`} />
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section style={{ maxWidth: "800px", margin: "0 auto 4rem", padding: "0 1.5rem" }}>
        <div className="section-header">
          <span className="section-tag">Learning Path</span>
          <h2 style={{ color: "#f8fafc", fontSize: "1.6rem", marginBottom: "0.5rem" }}>Python Learning Roadmap</h2>
          <p>Follow the path from beginner to advanced Python developer.</p>
        </div>
        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          {roadmapLevels.map((level) => (
            <RoadmapCard key={level.title} icon={level.icon} title={level.title} items={level.items} color={level.color} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <p>Built by <strong>Prathamesh Pawar</strong></p>
          <div className="footer-links">
            <a href="https://github.com/prathameshp107/DSA-Notes-Problems" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={base}>Home</a>
            <a href={`${base}labs`}>Practice Labs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionCard({ icon, title, desc, color, href }) {
  const handleClick = () => { window.location.href = href; };
  return (
    <div className="lab-card ready" onClick={handleClick} onKeyDown={(e) => { if (e.key === "Enter") handleClick(); }} tabIndex={0} role="button" style={{ cursor: "pointer", minHeight: "200px" }}>
      <div className="lab-card-icon" style={{ background: `${color}15`, borderColor: `${color}30`, color, width: 48, height: 48, marginBottom: "0.75rem" }}>
        <span style={{ fontSize: "1.3rem" }}>{icon}</span>
      </div>
      <h3 className="lab-card-title" style={{ marginBottom: "0.4rem" }}>{title}</h3>
      <p className="lab-card-desc" style={{ fontSize: "0.85rem" }}>{desc}</p>
      <div className="lab-card-action">
        <span className="lab-action-btn">
          Explore
          <svg className="lab-action-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </div>
  );
}

function RoadmapCard({ icon, title, items, color }) {
  return (
    <div className="jsl-section jsl-rules-section" style={{ padding: "1rem", background: "rgba(15,23,42,0.35)" }}>
      <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{icon}</div>
      <h3 style={{ color, fontSize: "0.9rem", fontWeight: 800, marginBottom: "0.6rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>{title}</h3>
      <ul className="jsl-rules-list" style={{ margin: 0, paddingLeft: "1rem" }}>
        {items.map((item) => (
          <li key={item} className="jsl-rule-item" style={{ fontSize: "0.8rem", padding: "0.12rem 0" }}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
