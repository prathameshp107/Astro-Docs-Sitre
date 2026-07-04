import { useState } from "react";
import { usePlanStore } from "../../store/planStore.js";
import { useJudgeStore } from "../../store/judgeStore.js";
import PlanDayItem from "./PlanDayItem.jsx";
import ContinueBanner from "./ContinueBanner.jsx";

function DifficultyBadge({ difficulty }) {
  return (
    <span className={`plan-diff-badge plan-diff-${difficulty}`}>
      {difficulty}
    </span>
  );
}

function ProgressBar({ percent }) {
  return (
    <div className="plan-detail-progress-bar-wrap">
      <div className="plan-detail-progress-label">
        <span>Progress</span>
        <span>{percent}% complete</span>
      </div>
      <div className="plan-detail-progress-bar">
        <div
          className="plan-detail-progress-fill"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}

function DayAccordion({ plan, day, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const { progress } = usePlanStore();
  const solved = useJudgeStore((s) => s.solved);

  const prog = progress[plan.id];
  const doneCount = day.items.filter((item, i) => {
    const key = `${day.day}:${i}`;
    const manualDone = !!prog?.done?.[key];
    const autoDone = item.type === "problem" && solved[item.ref] === "accepted";
    return manualDone || autoDone;
  }).length;

  const isComplete = doneCount === day.items.length;

  return (
    <div className={`plan-day-card ${isComplete ? "plan-day-complete" : ""}`}>
      <button
        className="plan-day-header"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="plan-day-num">Day {day.day}</span>
        <span className="plan-day-title-text">{day.title}</span>
        <span className="plan-day-progress-pill">
          {isComplete ? "✓ Done" : `${doneCount}/${day.items.length}`}
        </span>
        <svg
          className={`plan-day-chevron ${open ? "open" : ""}`}
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="plan-day-items">
          {day.items.map((item, i) => (
            <PlanDayItem
              key={`${day.day}:${i}`}
              planId={plan.id}
              day={day}
              itemIndex={i}
              item={item}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function PlanDetail({ plan, allPlans }) {
  const { active, progress, startPlan, resetPlan, percentComplete, currentDay } = usePlanStore();
  const [confirmReset, setConfirmReset] = useState(false);
  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  const isStarted = active.includes(plan.id);
  const totalItems = plan.days.reduce((s, d) => s + d.items.length, 0);
  const pct = isStarted ? percentComplete(plan.id, totalItems) : 0;
  const curDay = isStarted ? currentDay(plan.id, plan.days) : 1;

  const projDate = usePlanStore.getState().projectedFinish(plan.id, plan.durationDays);

  function handleStart() {
    startPlan(plan.id);
  }

  function handleReset() {
    resetPlan(plan.id);
    setConfirmReset(false);
  }

  return (
    <div className="plan-detail-wrap">
      {/* Back link */}
      <a href={`${base}plans`} className="plan-detail-back">
        ← All Plans
      </a>

      {/* Hero */}
      <div className="plan-detail-hero">
        <h1 className="plan-detail-title">{plan.title}</h1>
        <p className="plan-detail-tagline">{plan.tagline}</p>

        <div className="plan-detail-meta">
          <span className={`plan-diff-badge plan-diff-${plan.difficulty}`}>
            {plan.difficulty}
          </span>
          <span className="plan-meta-item">📅 {plan.durationDays} days</span>
          <span className="plan-meta-item">⏱️ {plan.hoursPerDay} hr/day</span>
          <span className="plan-meta-item">📋 {totalItems} tasks</span>
          {projDate && (
            <span className="plan-meta-item">
              🏁 Finish by ~{projDate.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
            </span>
          )}
        </div>

        {/* Progress bar (only if started) */}
        {isStarted && (
          <div className="plan-detail-progress-container" style={{ marginTop: 20 }}>
            <ProgressBar percent={pct} />
            <div className="plan-detail-reset-row" style={{ marginTop: 12, display: "flex", justifyContent: "flex-end" }}>
              {confirmReset ? (
                <div className="plan-detail-reset-confirm-box" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span className="plan-reset-warning-text" style={{ fontSize: "var(--fs-xs)", color: "#f87171" }}>
                    ⚠️ Reset progress and start over?
                  </span>
                  <button className="plan-btn-reset-confirm" onClick={handleReset}>
                    Yes, Reset
                  </button>
                  <button className="plan-btn-reset-cancel" onClick={() => setConfirmReset(false)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button className="plan-btn-reset-trigger-text" onClick={() => setConfirmReset(true)}>
                  🔄 Reset Progress
                </button>
              )}
            </div>
          </div>
        )}

        {/* Start button */}
        {!isStarted && (
          <button className="plan-btn-start" onClick={handleStart} style={{ marginTop: 12 }}>
            Start This Plan →
          </button>
        )}
      </div>

      {/* Continue banner */}
      {isStarted && allPlans && (
        <ContinueBanner plans={allPlans} />
      )}

      {/* Day accordion list */}
      <div className="plan-days-list">
        {plan.days.map((day) => (
          <DayAccordion
            key={day.day}
            plan={plan}
            day={day}
            defaultOpen={isStarted && day.day === curDay}
          />
        ))}
      </div>
    </div>
  );
}
