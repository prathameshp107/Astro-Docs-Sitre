import { useJudgeStore } from "../../store/judgeStore.js";
import { usePlanStore } from "../../store/planStore.js";
import { PROBLEM_DOC_MAP } from "../../data/plans/problem-doc-map.js";

const TYPE_ICON = {
  note: "📖",
  visualizer: "🎬",
  problem: "⚡",
  mcq: "📝",
  lab: "🧪",
};

export default function PlanDayItem({ planId, day, itemIndex, item }) {
  const { markDone, markUndone, progress } = usePlanStore();
  const solved = useJudgeStore((s) => s.solved);

  const key = `${day.day}:${itemIndex}`;
  const prog = progress[planId];
  const isDone = !!prog?.done?.[key];

  // Auto-complete: problems auto-check when judge marks them AC
  const isAutoDone = item.type === "problem" && solved[item.ref] === "accepted";

  const checked = isDone || isAutoDone;

  function handleToggle() {
    if (isAutoDone) return; // can't uncheck auto-done
    if (isDone) {
      markUndone(planId, key);
    } else {
      markDone(planId, key);
    }
  }

  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  // Build the href — problem type links to /dsa/problems/ref, others use ref directly
  let href = item.ref;
  let docUrl = null;

  if (item.type === "problem") {
    href = `${base}dsa/problems/${item.ref}`;
    const mappedDoc = PROBLEM_DOC_MAP[item.ref];
    if (mappedDoc) {
      docUrl = `${base}${mappedDoc.replace(/^\//, "")}`;
    }
  }

  return (
    <div className="plan-item-row">
      {/* Checkbox */}
      <button
        className={`plan-item-check ${checked ? (isAutoDone ? "auto-done" : "done") : ""}`}
        onClick={handleToggle}
        title={isAutoDone ? "Auto-completed when you solved this problem ✓" : checked ? "Mark incomplete" : "Mark complete"}
        aria-label={checked ? "Completed" : "Mark as done"}
      />

      {/* Type icon */}
      <span className="plan-item-icon" aria-hidden="true">
        {TYPE_ICON[item.type] || "📄"}
      </span>

      {/* Content */}
      <div className="plan-item-content">
        <div className="plan-item-title-group">
          {docUrl && (
            <a
              href={docUrl}
              className="plan-item-doc-btn"
              title="Read detailed explanation & Mermaid diagram"
            >
              📖 Read Doc
            </a>
          )}
          <a
            href={href}
            className={`plan-item-label ${checked ? "done-text" : ""}`}
          >
            {item.label}
          </a>
        </div>
        <div className="plan-item-meta">
          {item.minutes} min
          {isAutoDone && (
            <span style={{ marginLeft: 6, color: "var(--accent)", fontWeight: "var(--fw-semibold)" }}>
              · auto-completed ✓
            </span>
          )}
        </div>
      </div>

      {/* Type badge */}
      <span className={`plan-item-type-badge plan-type-${item.type}`}>
        {item.type}
      </span>
    </div>
  );
}
