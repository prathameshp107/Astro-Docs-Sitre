// ─── CSS — Component Lab View Component ───

import { CodeBlock } from "../../shared/index.js";

export default function CSSComponentView({
  component,
  showSolution,
  onToggleSolution,
}) {
  return (
    <div className="jsl-content-inner">
      <div className="jsl-chapter-header">
        <span
          className="jsl-chapter-badge"
          style={{
            background: "rgba(245,158,11,0.11)",
            borderColor: "rgba(245,158,11,0.18)",
            color: "#f59e0b",
          }}
        >
          🎨 Component Lab
        </span>
        <h2 className="jsl-content-title">{component.title}</h2>
      </div>

      <div className="jsl-section">
        <h3 className="jsl-section-title">Overview</h3>
        <p className="jsl-text">{component.overview}</p>
      </div>

      {component.features && component.features.length > 0 && (
        <div className="jsl-section">
          <h3 className="jsl-section-title">Features</h3>
          <ul className="jsl-rules-list">
            {component.features.map((feat, i) => (
              <li key={i} className="jsl-rule-item">
                {feat}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showSolution && (
        <div className="jsl-solution-box">
          <h4>Complete Solution</h4>
          <CodeBlock code={component.solution} />
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
