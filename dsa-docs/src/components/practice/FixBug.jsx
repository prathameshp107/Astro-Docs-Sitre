import { useState } from "react";
import { BUG_CHALLENGES } from "../../data/questions.js";

const DIFFS = ["Beginner", "Intermediate", "Advanced"];

export default function FixBug({ onSelectCode }) {
  const [diff, setDiff] = useState("all");
  const [selected, setSelected] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem("prac-bugs-completed") || "[]"); }
    catch { return []; }
  });

  const filtered = diff === "all" ? BUG_CHALLENGES : BUG_CHALLENGES.filter((b) => b.difficulty === diff);

  const handleSelect = (bug) => {
    setSelected(bug);
    setShowSolution(false);
    setShowHint(false);
    if (onSelectCode) onSelectCode(bug.brokenCode);
  };

  const toggleComplete = (id) => {
    const next = completed.includes(id) ? completed.filter((c) => c !== id) : [...completed, id];
    setCompleted(next);
    sessionStorage.setItem("prac-bugs-completed", JSON.stringify(next));
  };

  return (
    <div className="prac-bugs">
      <div className="prac-filters">
        {["all", ...DIFFS].map((d) => (
          <button key={d} className={`prac-filter-chip ${diff === d ? "active" : ""}`} onClick={() => setDiff(d)}>
            {d === "all" ? "All" : d}
          </button>
        ))}
        <span className="prac-result-count">{filtered.length} challenges</span>
      </div>

      {selected ? (
        <div className="prac-bug-detail">
          <button className="prac-back-btn" onClick={() => setSelected(null)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back
          </button>
          <div className="prac-bug-header">
            <h3>{selected.title}</h3>
            <div className="prac-bug-meta">
              <span className="prac-diff-badge" style={{ background: "#ef444422", color: "#ef4444", border: "1px solid #ef444444" }}>{selected.difficulty}</span>
              <span className="prac-topic-badge">{selected.topic}</span>
            </div>
          </div>

          <div className="prac-bug-section">
            <h4>Broken Code</h4>
            <pre className="prac-code-block broken"><code>{selected.brokenCode}</code></pre>
          </div>

          <div className="prac-bug-section">
            <h4>Expected vs Actual</h4>
            <div className="prac-compare">
              <div><span className="prac-label expect">Expected:</span><pre>{selected.expectedOutput}</pre></div>
              <div><span className="prac-label actual">Actual:</span><pre>{selected.actualOutput}</pre></div>
            </div>
          </div>

          <div className="prac-bug-actions">
            {!showHint && <button className="prac-hint-btn" onClick={() => setShowHint(true)}>💡 Get Hint</button>}
            <button className="prac-reveal-btn" onClick={() => setShowSolution(!showSolution)}>
              {showSolution ? "Hide Solution" : "🔍 Reveal Solution"}
            </button>
            <button className="prac-try-btn" onClick={() => { if (onSelectCode) onSelectCode(selected.brokenCode); }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Debug in Playground
            </button>
          </div>

          {showHint && (
            <div className="prac-hint-box">
              <strong>💡 Hint:</strong> {selected.hint}
            </div>
          )}

          {showSolution && (
            <div className="prac-solution">
              <div className="prac-answer-section">
                <h4>What's the Bug?</h4>
                <p>{selected.explanation}</p>
              </div>
              <div className="prac-answer-section">
                <h4>Fix Approach</h4>
                <p>{selected.fixApproach}</p>
              </div>
              <div className="prac-answer-section">
                <h4>Fixed Code</h4>
                <pre className="prac-code-block fixed"><code>{selected.fixedCode}</code></pre>
              </div>
              <button className={`prac-complete-btn ${completed.includes(selected.id) ? "done" : ""}`} onClick={() => toggleComplete(selected.id)}>
                {completed.includes(selected.id) ? "✓ Mastered" : "Mark as Mastered"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="prac-bug-list">
          {filtered.map((bug) => (
            <div key={bug.id} className={`prac-bug-card ${completed.includes(bug.id) ? "done" : ""}`} onClick={() => handleSelect(bug)}>
              <div className="prac-bug-card-header">
                <span className="prac-bug-icon">🐛</span>
                <div>
                  <h4>{bug.title}</h4>
                  <span className="prac-topic-sm">{bug.topic}</span>
                </div>
                {completed.includes(bug.id) && <span className="prac-check">✓</span>}
              </div>
              <pre className="prac-bug-preview"><code>{bug.brokenCode}</code></pre>
              <div className="prac-bug-card-footer">
                <span className="prac-diff-badge-sm" style={{ color: "#ef4444" }}>{bug.difficulty}</span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="prac-empty">No challenges match this difficulty</div>}
        </div>
      )}
    </div>
  );
}
