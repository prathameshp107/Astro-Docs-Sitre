// ─── HTML — Project View Component ───

import { CodeBlock } from "../../shared/index.js";

export default function HTMLProjectView({
  project,
  showSolution,
  onToggleSolution,
}) {
  return (
    <div className="jsl-content-inner">
      <div className="jsl-chapter-header">
        <span
          className="jsl-chapter-badge project"
          style={{
            background: "rgba(167,139,250,0.11)",
            borderColor: "rgba(167,139,250,0.18)",
            color: "#a78bfa",
          }}
        >
          📱 Project Lab
        </span>
        <h2 className="jsl-content-title">{project.title}</h2>
      </div>

      <div className="jsl-section">
        <h3 className="jsl-section-title">Overview</h3>
        <p className="jsl-text">{project.overview}</p>
        <p
          className="jsl-text"
          style={{ marginTop: "0.5rem", color: "#94a3b8" }}
        >
          <strong>Why?</strong> {project.why}
        </p>
      </div>

      <div className="jsl-section">
        <h3 className="jsl-section-title">Concepts Practiced</h3>
        <div className="jsl-tags">
          {project.concepts.map((c) => (
            <span key={c} className="jsl-tag">
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="jsl-section">
        <h3 className="jsl-section-title">Milestones</h3>
        <div className="jsl-milestones">
          {project.milestones.map((m, i) => (
            <div key={i} className="jsl-milestone">
              <div className="jsl-milestone-num">{i + 1}</div>
              <div>
                <strong>{m.title}</strong>
                <p>{m.task}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showSolution && (
        <div className="jsl-solution-box">
          <h4>Complete Solution</h4>
          <CodeBlock code={project.solution} />
        </div>
      )}

      <div className="jsl-content-actions">
        <button className="jsl-btn-ghost" onClick={onToggleSolution}>
          {showSolution ? "Hide Solution" : "🔍 Show Solution"}
        </button>
      </div>
    </div>
  );
}
