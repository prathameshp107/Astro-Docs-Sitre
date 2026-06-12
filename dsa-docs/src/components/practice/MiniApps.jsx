import { useState } from "react";
import { MINI_APPS } from "../../data/questions.js";

export default function MiniApps({ onSelectCode }) {
  const [selected, setSelected] = useState(null);
  const [showSolution, setShowSolution] = useState(false);

  const handleSelect = (app) => {
    setSelected(app);
    setShowSolution(false);
    if (onSelectCode) onSelectCode(app.starterCode);
  };

  return (
    <div className="prac-miniapps">
      {selected ? (
        <div className="prac-app-detail">
          <button className="prac-back-btn" onClick={() => setSelected(null)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back
          </button>
          <div className="prac-app-header">
            <h3>{selected.title}</h3>
            <span className="prac-diff-badge" style={{ background: "#22c55e22", color: "#22c55e", border: "1px solid #22c55e44" }}>{selected.difficulty}</span>
          </div>
          <div className="prac-app-section">
            <h4>Requirements</h4>
            <ul className="prac-req-list">
              {selected.requirements.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
          <div className="prac-app-section">
            <h4>Starter Code</h4>
            <pre className="prac-code-block"><code>{selected.starterCode}</code></pre>
          </div>
          <div className="prac-app-actions">
            <button className="prac-try-btn" onClick={() => { if (onSelectCode) onSelectCode(selected.starterCode); }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Build in Playground
            </button>
            <button className="prac-reveal-btn" onClick={() => setShowSolution(!showSolution)}>
              {showSolution ? "Hide Solution" : "📖 View Solution"}
            </button>
          </div>
          {showSolution && (
            <div className="prac-solution">
              <div className="prac-answer-section">
                <h4>Solution</h4>
                <pre className="prac-code-block fixed"><code>{selected.solution}</code></pre>
              </div>
              <div className="prac-answer-section">
                <h4>Explanation</h4>
                <p>{selected.explanation}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <p className="prac-section-desc">Build real-world mini applications from scratch. Each challenge includes requirements and starter code.</p>
          <div className="prac-app-grid">
            {MINI_APPS.map((app) => (
              <div key={app.id} className="prac-app-card" onClick={() => handleSelect(app)}>
                <div className="prac-app-card-top">
                  <span className="prac-app-icon">
                    {app.title === "Counter" ? "🔢" : app.title === "Todo List" ? "📋" : app.title === "Search Filter" ? "🔍" : "🧮"}
                  </span>
                  <span className="prac-diff-badge-sm" style={{ color: app.difficulty === "Beginner" ? "#22c55e" : "#f59e0b" }}>{app.difficulty}</span>
                </div>
                <h4>{app.title}</h4>
                <ul className="prac-req-preview">
                  {app.requirements.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
