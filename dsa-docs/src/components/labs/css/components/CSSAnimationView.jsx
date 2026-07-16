// ─── CSS — Animation Lab View Component ───

import { CodeBlock } from "../../shared/index.js";

export default function CSSAnimationView({
  animation,
  showSolution,
  onToggleSolution,
}) {
  return (
    <div className="jsl-content-inner">
      <div className="jsl-chapter-header">
        <span
          className="jsl-chapter-badge"
          style={{
            background: "rgba(236,72,153,0.11)",
            borderColor: "rgba(236,72,153,0.18)",
            color: "#ec4899",
          }}
        >
          ✨ Animation Lab
        </span>
        <h2 className="jsl-content-title">{animation.title}</h2>
      </div>

      <div className="jsl-section">
        <h3 className="jsl-section-title">Overview</h3>
        <p className="jsl-text">{animation.overview}</p>
      </div>

      {animation.task && (
        <div className="jsl-section jsl-task-section">
          <h3 className="jsl-section-title">Your Task</h3>
          <div className="jsl-task-text">
            {animation.task.split("\n").map((line, i) => {
              if (line.trim().startsWith("-") || line.trim().match(/^\d+\./)) {
                return (
                  <li key={i} className="jsl-task-item">
                    {line.replace(/^[\d.]*\s*/, "").replace(/^-/, "").trim()}
                  </li>
                );
              }
              return <p key={i}>{line}</p>;
            })}
          </div>
        </div>
      )}

      {showSolution && (
        <div className="jsl-solution-box">
          <h4>Complete Solution</h4>
          <CodeBlock code={animation.solution} />
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
