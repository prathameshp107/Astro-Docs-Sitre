// ─── CSS — Challenge View Component ───

import { CodeBlock } from "../../shared/index.js";

export default function CSSChallengeView({
  challenge,
  showHint,
  showSolution,
  onToggleHint,
  onToggleSolution,
}) {
  const diffColor =
    challenge.difficulty === "Easy"
      ? "#22c55e"
      : challenge.difficulty === "Medium"
        ? "#f59e0b"
        : "#ef4444";

  return (
    <div className="jsl-content-inner">
      <div className="jsl-chapter-header">
        <span
          className="jsl-chapter-badge"
          style={{
            background: "rgba(52,211,153,0.11)",
            borderColor: "rgba(52,211,153,0.18)",
            color: "#34d399",
          }}
        >
          🏆 CSS Challenge
        </span>
        <h2 className="jsl-content-title">{challenge.title}</h2>
        <div className="jsl-chapter-meta">
          <span
            className="jsl-diff-badge"
            style={{
              color: diffColor,
              borderColor: `${diffColor}33`,
              background: `${diffColor}15`,
            }}
          >
            {challenge.difficulty}
          </span>
          <div className="jsl-tags">
            {challenge.tags.map((t) => (
              <span key={t} className="jsl-tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="jsl-section jsl-section-problem">
        <h3 className="jsl-section-title">Problem</h3>
        <p className="jsl-text">{challenge.problem}</p>
      </div>

      {challenge.validation && (
        <div className="jsl-section jsl-section-result">
          <h3 className="jsl-section-title">Validation Criteria</h3>
          <pre
            className="jsl-code-block"
            style={{ fontSize: "0.78rem", whiteSpace: "pre-wrap" }}
          >
            {challenge.validation}
          </pre>
        </div>
      )}

      {showHint && (
        <div className="jsl-hint-box">
          <strong>💡 Hint:</strong> {challenge.hint}
        </div>
      )}

      {showSolution && (
        <div className="jsl-solution-box">
          <h4>Solution</h4>
          <CodeBlock code={challenge.solution} />
        </div>
      )}

      <div className="jsl-content-actions">
        <button className="jsl-btn-ghost" onClick={onToggleHint}>
          {showHint ? "Hide Hint" : "💡 Show Hint"}
        </button>
        <button className="jsl-btn-ghost" onClick={onToggleSolution}>
          {showSolution ? "Hide Solution" : "🔍 Show Solution"}
        </button>
      </div>
    </div>
  );
}
