// ─── JS — Bug View Component ───

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { CodeBlock } from "../../shared/index.js";

export default function JSBugView({
  bug,
  showHint,
  showSolution,
  onToggleHint,
  onToggleSolution,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  onMarkDone,
  isDone,
  testResults,
  currentTests,
  onRunTests,
}) {
  return (
    <div className="jsl-content-inner">
      <div className="jsl-chapter-header">
        <span className="jsl-chapter-badge bug">🐛 Debug Challenge</span>
        <h2 className="jsl-content-title">{bug.title}</h2>
      </div>

      <div className="jsl-section">
        <h3 className="jsl-section-title">Problem</h3>
        <p className="jsl-text">{bug.problem}</p>
      </div>

      <div className="jsl-section">
        <h3 className="jsl-section-title">Learning Goal</h3>
        <p className="jsl-text">{bug.learningGoal}</p>
      </div>

      <div className="jsl-section">
        <h3 className="jsl-section-title">Expected Result</h3>
        <p className="jsl-text">{bug.expectedResult}</p>
      </div>

      {showHint && (
        <div className="jsl-hint-box">
          <strong>💡 Hint:</strong> {bug.hint}
        </div>
      )}

      {showSolution && (
        <div className="jsl-solution-box">
          <h4>Solution</h4>
          <CodeBlock code={bug.solution} />
        </div>
      )}

      <div className="jsl-content-actions">
        <button className="jsl-btn-ghost" onClick={onToggleHint}>
          {showHint ? "Hide Hint" : "💡 Show Hint"}
        </button>
        <button className="jsl-btn-ghost" onClick={onToggleSolution}>
          {showSolution ? "Hide Solution" : "🔍 Show Solution"}
        </button>
        <button
          className={`jsl-btn-mark ${isDone ? "done" : ""}`}
          onClick={onMarkDone}
        >
          {isDone ? "✓ Fixed" : "Mark as Fixed"}
        </button>
      </div>

      <div className="jsl-content-nav">
        <button
          className={`jsl-nav-btn ${!hasPrev ? "disabled" : ""}`}
          onClick={onPrev}
          disabled={!hasPrev}
        >
          <FiChevronLeft size={14} />
          Previous
        </button>
        <button
          className={`jsl-nav-btn ${!hasNext ? "disabled" : ""}`}
          onClick={onNext}
          disabled={!hasNext}
        >
          Next
          <FiChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
