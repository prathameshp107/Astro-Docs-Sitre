// ─── React — Bug View Component ───

import { FiBook, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { CodeBlock } from "../../shared/index.js";

export default function ReactBugView({
  bug,
  showHint,
  showSolution,
  onToggleHint,
  onToggleSolution,
  onMarkDone,
  isDone,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) {
  return (
    <div className="jsl-content-inner">
      <div className="jsl-chapter-header">
        <span className="jsl-chapter-badge bug">🐛 Debug Challenge</span>
        <h2 className="jsl-content-title">{bug.title}</h2>
      </div>

      <div className="jsl-section jsl-section-problem">
        <h3 className="jsl-section-title">
          <FiBook size={16} /> Problem
        </h3>
        <p className="jsl-text">{bug.problem}</p>
      </div>

      <div className="jsl-section jsl-section-goal">
        <h3 className="jsl-section-title">
          <FiBook size={16} /> Learning Goal
        </h3>
        <p className="jsl-text">{bug.learningGoal}</p>
      </div>

      <div className="jsl-section jsl-section-result">
        <h3 className="jsl-section-title">
          <FiBook size={16} /> Expected Result
        </h3>
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
          {isDone ? "✓ Fixed" : "Mark Fixed"}
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
