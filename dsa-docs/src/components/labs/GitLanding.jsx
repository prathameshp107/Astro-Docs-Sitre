import { useState, useEffect } from "react";
import Skeleton, { SkeletonHero, SkeletonStats, SkeletonGrid } from "../Skeleton.jsx";

const sections = [
  {
    icon: "📚",
    title: "Learn Git",
    desc: "30 guided lessons from fundamentals to advanced Git. Learn branching, merging, rebasing, and GitHub workflows through interactive missions.",
    color: "#f59e0b",
  },
  {
    icon: "🎮",
    title: "Git Playground",
    desc: "Interactive terminal with visual commit graph. Run real git commands and see branches, commits, and merges visualized in real-time.",
    color: "#a78bfa",
  },
  {
    icon: "⚔️",
    title: "Merge Conflict Arena",
    desc: "Practice resolving merge conflicts from easy to nightmare mode. Build confidence handling real-world conflict scenarios.",
    color: "#ef4444",
  },
  {
    icon: "🏆",
    title: "Branching Challenges",
    desc: "Mission-based challenges covering branching, rebasing, cherry-picking, and recovery. Boss battles at the end of each module.",
    color: "#34d399",
  },
  {
    icon: "👥",
    title: "Team Collaboration",
    desc: "Simulate real team workflows. Handle PRs, code reviews, hotfixes, and release management in a multi-developer environment.",
    color: "#60a5fa",
  },
  {
    icon: "🎯",
    title: "Interview Preparation",
    desc: "5 topic areas covering merge vs rebase, reset vs revert, cherry-pick, git internals, and branching strategies with practical questions.",
    color: "#fcd34d",
  },
];

const roadmap = [
  {
    icon: "🌱",
    title: "Beginner",
    items: ["What is Git?", "Git Init & Add", "Git Commit", "Git Status & Log", ".gitignore"],
    color: "#22c55e",
  },
  {
    icon: "🚀",
    title: "Intermediate",
    items: ["Branching & Merging", "Rebasing", "Cherry-Pick", "Stash & Reset", "Revert & Tag"],
    color: "#f59e0b",
  },
  {
    icon: "💎",
    title: "Advanced",
    items: ["Merge Conflicts", "Interactive Rebase", "Bisect & Reflog", "GitHub Actions", "Team Workflows"],
    color: "#ef4444",
  },
];

export default function GitLanding() {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false); // SSR-safe: effects do not run on the server, so an initial `true` made the server-rendered HTML a skeleton with no crawlable content.

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
        <SkeletonGrid count={6} variant="card" columns={3} cardHeight="200px" />
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
            Interactive Version Control Learning
          </div>
          <h1 className="hero-title" style={{ maxWidth: "800px", margin: "0 auto" }}>
            Master Git & GitHub Through{" "}
            <span className="hero-highlight">
              <span className="highlight-text" style={{ background: "linear-gradient(135deg, #f59e0b, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Interactive Simulations
              </span>
            </span>
          </h1>
          <p className="hero-desc" style={{ maxWidth: "650px", margin: "1rem auto 2rem" }}>
            Learn Branching. Resolve Conflicts. Collaborate Like Real Teams. Become Git Confident.
          </p>
          <div className="hero-actions" style={{ justifyContent: "center" }}>
            <a href={`${base}labs/git-lab`} className="btn btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "0.35rem" }}>
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Start Learning
            </a>
            <a href={`${base}labs/git-lab`} className="btn btn-secondary">
              Launch Playground
            </a>
            <a href={`${base}labs/git-lab`} className="btn btn-ghost">
              View Roadmap
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="lab-stats-bar" style={{ maxWidth: "750px", margin: "0 auto 2.5rem" }}>
        <div className="lab-stat-item">
          <span className="lab-stat-value">30</span>
          <span className="lab-stat-label">Lessons</span>
        </div>
        <div className="lab-stat-divider" />
        <div className="lab-stat-item">
          <span className="lab-stat-value">3</span>
          <span className="lab-stat-label">Boss Battles</span>
        </div>
        <div className="lab-stat-divider" />
        <div className="lab-stat-item">
          <span className="lab-stat-value">4</span>
          <span className="lab-stat-label">Conflict Levels</span>
        </div>
        <div className="lab-stat-divider" />
        <div className="lab-stat-item">
          <span className="lab-stat-value">40+</span>
          <span className="lab-stat-label">Interview Q</span>
        </div>
      </section>

      {/* Section Cards */}
      <section className="lab-cards-section" style={{ maxWidth: "1000px", margin: "0 auto 3rem", padding: "0 1.5rem" }}>
        <div className="lab-cards-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {sections.map((sec, i) => (
            <SectionCard key={sec.title} icon={sec.icon} title={sec.title} desc={sec.desc} color={sec.color} href={`${base}labs/git-lab`} />
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section style={{ maxWidth: "800px", margin: "0 auto 4rem", padding: "0 1.5rem" }}>
        <div className="section-header">
          <span className="section-tag">Learning Path</span>
          <h2 style={{ color: "#f8fafc", fontSize: "1.6rem", marginBottom: "0.5rem" }}>Git Learning Roadmap</h2>
          <p>Follow the path from complete beginner to Git master.</p>
        </div>
        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          {roadmap.map((level) => (
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
