// ─── HTML — Interview View Component ───

import { useState } from "react";

export default function HTMLInterviewView({ topic, onMarkDone, isDone }) {
  const [expandedQ, setExpandedQ] = useState(null);

  return (
    <div className="jsl-content-inner">
      <div className="jsl-chapter-header">
        <span
          className="jsl-chapter-badge"
          style={{
            background: "rgba(252,211,77,0.11)",
            borderColor: "rgba(252,211,77,0.18)",
            color: "#fcd34d",
          }}
        >
          🎯 Interview Prep
        </span>
        <h2 className="jsl-content-title">{topic.title}</h2>
        <p className="jsl-text" style={{ marginTop: "0.5rem" }}>
          {topic.questions.length} questions to help you prepare for your
          frontend interview.
        </p>
      </div>

      <div className="jsl-section">
        <h3 className="jsl-section-title">Practice Questions</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {topic.questions.map((q, i) => (
            <div
              key={i}
              className={`jsl-interview-q ${expandedQ === i ? "expanded" : ""}`}
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                border: "1px solid var(--jsl-border2)",
                background:
                  expandedQ === i
                    ? "rgba(252,211,77,0.05)"
                    : "rgba(255,255,255,0.035)",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onClick={() => setExpandedQ(expandedQ === i ? null : i)}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: "rgba(252,211,77,0.12)",
                    color: "#fcd34d",
                    fontSize: "0.75rem",
                    fontWeight: 900,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
                <span
                  className="jsl-text"
                  style={{ fontSize: "0.88rem", flex: 1 }}
                >
                  {q}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{
                    flexShrink: 0,
                    color: "#64748b",
                    transition: "transform 0.2s ease",
                    transform:
                      expandedQ === i ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {expandedQ === i && (
                <div
                  style={{
                    marginTop: "0.75rem",
                    paddingTop: "0.75rem",
                    borderTop: "1px solid var(--jsl-border2)",
                  }}
                >
                  <p
                    className="jsl-text"
                    style={{ fontSize: "0.84rem", color: "#94a3b8" }}
                  >
                    Think through your answer. Consider:
                  </p>
                  <ul
                    style={{
                      color: "#94a3b8",
                      fontSize: "0.82rem",
                      margin: "0.3rem 0",
                      paddingLeft: "1.2rem",
                    }}
                  >
                    <li>Explain the concept clearly</li>
                    <li>Provide a practical example</li>
                    <li>Mention best practices and trade-offs</li>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="jsl-content-actions">
        <button
          className={`jsl-btn-mark ${isDone ? "done" : ""}`}
          onClick={onMarkDone}
        >
          {isDone ? "✓ Reviewed" : "Mark as Reviewed"}
        </button>
      </div>
    </div>
  );
}
