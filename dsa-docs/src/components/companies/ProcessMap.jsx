import { useState } from "react";

export default function ProcessMap({ rounds, companyId }) {
  const [activeRound, setActiveRound] = useState(0);

  if (!rounds || rounds.length === 0) return null;

  // Set company-specific colors
  const accentColor = companyId === "amazon" ? "#ff9900" : companyId === "google" ? "#4285f4" : "var(--accent)";

  return (
    <div className="process-map-container">
      {/* Desktop Layout: Sleek Horizontal Pipeline Grid */}
      <div className="process-map-desktop">
        <div className="pipeline-grid">
          {rounds.map((r, i) => {
            const isActive = i === activeRound;
            return (
              <button
                type="button"
                key={i}
                className={`pipeline-step-card ${isActive ? "active" : ""}`}
                style={{ 
                  borderColor: isActive ? accentColor : "var(--border)",
                  borderTopWidth: isActive ? "3px" : "1px",
                  borderTopColor: isActive ? accentColor : "var(--border)"
                }}
                onClick={() => setActiveRound(i)}
              >
                <div className="step-index-row">
                  <span className="step-num" style={{ color: isActive ? accentColor : "var(--text-muted)" }}>
                    Round 0{i + 1}
                  </span>
                  <span className="step-badge-duration">⏱️ {r.duration}</span>
                </div>
                <h4 className="step-title">{r.name}</h4>
              </button>
            );
          })}
        </div>

        {/* Highlighted Round Details Panel */}
        <div className="pipeline-details-panel" style={{ borderLeftColor: accentColor }}>
          <div className="panel-header">
            <h3>{rounds[activeRound].name}</h3>
            <span className="panel-badge" style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
              {rounds[activeRound].duration}
            </span>
          </div>

          <div className="panel-body">
            <div className="panel-col">
              <span className="panel-section-title">Format & What they test</span>
              <ul className="panel-checklist">
                {rounds[activeRound].tests.map((t, idx) => (
                  <li key={idx}>
                    <span className="chk-icon" style={{ color: accentColor }}>✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel-col tips-panel" style={{ backgroundColor: "var(--surface)" }}>
              <span className="panel-section-title">💡 Interview Strategy</span>
              <p className="panel-tips-text">{rounds[activeRound].tips}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout: Stacked Timeline */}
      <div className="process-map-mobile">
        {rounds.map((r, i) => (
          <div key={i} className="mobile-timeline-card" style={{ borderLeftColor: accentColor }}>
            <div className="mobile-timeline-header">
              <span className="mobile-step-tag">ROUND {i + 1}</span>
              <h4>{r.name}</h4>
              <span className="mobile-duration-badge">{r.duration}</span>
            </div>
            <div className="mobile-timeline-body">
              <div className="mobile-section-block">
                <strong>FORMAT</strong>
                <ul className="mobile-checklist">
                  {r.tests.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="mobile-tips-block">
                <strong>STRATEGY</strong>
                <p>{r.tips}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
