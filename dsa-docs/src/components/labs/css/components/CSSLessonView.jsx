// ─── CSS — Lesson View Component ───

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { renderFormattedText, CodeBlock } from "../../shared/index.js";

export default function CSSLessonView({
  lesson,
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
}) {
  const levelColor =
    lesson.level === "Beginner"
      ? "#22c55e"
      : lesson.level === "Intermediate"
        ? "#f59e0b"
        : "#ef4444";

  return (
    <div className="jsl-content-inner">
      <div className="jsl-chapter-header">
        <span
          className="jsl-chapter-badge"
          style={{
            background: "rgba(96,165,250,0.11)",
            borderColor: "rgba(96,165,250,0.18)",
            color: "#60a5fa",
          }}
        >
          Chapter {lesson.chapter}
        </span>
        <h2 className="jsl-content-title">{lesson.title}</h2>
        <div className="jsl-chapter-meta">
          <span
            className="jsl-diff-badge"
            style={{
              color: levelColor,
              borderColor: `${levelColor}33`,
              background: `${levelColor}15`,
            }}
          >
            {lesson.level}
          </span>
          <div className="jsl-tags">
            {lesson.tags.map((t) => (
              <span key={t} className="jsl-tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="jsl-section">
        <h3 className="jsl-section-title">Concept</h3>
        <div className="jsl-concept-text">
          {renderFormattedText(lesson.conceptExplanation)}
        </div>
      </div>

      <div className="jsl-section jsl-rules-section">
        <h3 className="jsl-section-title">Key Rules</h3>
        <ul className="jsl-rules-list">
          {lesson.keyRules.map((rule, i) => (
            <li key={i} className="jsl-rule-item">
              {rule}
            </li>
          ))}
        </ul>
      </div>

      <div className="jsl-section jsl-task-section">
        <h3 className="jsl-section-title">Your Task</h3>
        <div className="jsl-task-text">
          {renderFormattedText(lesson.task)}
        </div>
      </div>

      {showHint && (
        <div className="jsl-hint-box">
          <strong>💡 Hint:</strong> {lesson.hint}
        </div>
      )}

      {showSolution && (
        <div className="jsl-solution-box">
          <h4>Solution</h4>
          <CodeBlock code={lesson.solutionCode} />
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
          {isDone ? "✓ Completed" : "Mark Complete"}
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
