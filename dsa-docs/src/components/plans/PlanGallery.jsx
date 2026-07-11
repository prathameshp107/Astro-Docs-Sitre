import { useState } from "react";
import { usePlanStore } from "../../store/planStore.js";

/** Emoji icon map per plan id or difficulty */
const PLAN_ICONS = {
  "blind-75-guided":    "⚡",
  "30-day-dsa":         "🚀",
  "frontend-21":        "🎯",
  "js-mastery":         "✨",
  "last-minute":        "🔥",
  "sql-in-7-days":      "🗄️",
  "patterns-mastery":   "⭐",
  "arrays-basics":     "📦",
  "strings-basics":    "📝",
};
const DIFF_ICONS = { beginner: "🌱", intermediate: "⚡", advanced: "🔥" };

function getIcon(plan) {
  return PLAN_ICONS[plan.id] || DIFF_ICONS[plan.difficulty] || "📚";
}

/** Circular SVG progress ring with gradient */
function ProgressRing({ percent, size = 52, strokeWidth = 3 }) {
  const r = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percent / 100) * circumference;
  const uid = `ring-${Math.random().toString(36).slice(2)}`;

  return (
    <svg width={size} height={size} className="plan-ring">
      <defs>
        <linearGradient id={uid} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#c026d3" />
        </linearGradient>
      </defs>
      <circle className="plan-ring-bg" cx={size / 2} cy={size / 2} r={r} strokeWidth={strokeWidth} />
      <circle
        className="plan-ring-fill"
        cx={size / 2}
        cy={size / 2}
        r={r}
        strokeWidth={strokeWidth}
        stroke={`url(#${uid})`}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
      {percent > 0 && (
        <text
          className="plan-ring-label"
          x={size / 2}
          y={size / 2}
          transform={`rotate(90, ${size / 2}, ${size / 2})`}
        >
          {percent}%
        </text>
      )}
    </svg>
  );
}

function DifficultyBadge({ difficulty }) {
  return (
    <span className={`plan-diff-badge plan-diff-${difficulty}`}>
      {difficulty}
    </span>
  );
}

function countTotalItems(plan) {
  return plan.days.reduce((sum, d) => sum + d.items.length, 0);
}

export default function PlanGallery({ plans }) {
  const { active, progress, startPlan, resetPlan, percentComplete } = usePlanStore();
  const [confirmResetId, setConfirmResetId] = useState(null);
  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  return (
    <div className="plan-gallery">
      {plans.map((plan, idx) => {
        const isStarted = active.includes(plan.id);
        const totalItems = countTotalItems(plan);
        const pct = isStarted ? percentComplete(plan.id, totalItems) : 0;
        const planUrl = `${base}plans/${plan.id}`;
        const icon = getIcon(plan);

        return (
          <div
            key={plan.id}
            className="plan-card"
            style={{ animationDelay: `${idx * 0.06}s` }}
          >
            {/* Icon + progress ring row */}
            <div className="plan-card-icon-wrap">
              <div className="plan-card-emoji">{icon}</div>
              {isStarted && (
                <div className="plan-ring-wrap" aria-label={`${pct}% complete`}>
                  <ProgressRing percent={pct} size={52} />
                </div>
              )}
            </div>

            {/* Title + tagline */}
            <div className="plan-card-top">
              <div className="plan-card-title-group">
                <h2 className="plan-card-title">{plan.title}</h2>
                <p className="plan-card-tagline">{plan.tagline}</p>
              </div>
            </div>

            {/* Stats row */}
            <div className="plan-card-stats">
              <DifficultyBadge difficulty={plan.difficulty} />
              <span className="plan-stat">
                <span className="plan-stat-icon">📅</span>
                {plan.durationDays} days
              </span>
              <span className="plan-stat">
                <span className="plan-stat-icon">⏱️</span>
                {plan.hoursPerDay} hr/day
              </span>
              <span className="plan-stat">
                <span className="plan-stat-icon">📋</span>
                {totalItems} tasks
              </span>
            </div>

            {/* Hero topics */}
            {plan.heroTopics?.length > 0 && (
              <div className="plan-card-topics">
                {plan.heroTopics.map((t) => (
                  <span key={t} className="plan-topic-tag">{t}</span>
                ))}
              </div>
            )}

            {/* CTA footer */}
            <div className="plan-card-cta">
              {isStarted ? (
                <>
                  {confirmResetId === plan.id ? (
                    <div className="plan-card-reset-confirm">
                      <button
                        className="plan-btn-reset-confirm"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          resetPlan(plan.id);
                          setConfirmResetId(null);
                        }}
                      >
                        Yes, Reset
                      </button>
                      <button
                        className="plan-btn-reset-cancel"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setConfirmResetId(null);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        className="plan-btn-reset-trigger"
                        title="Reset plan progress"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setConfirmResetId(plan.id);
                        }}
                      >
                        🔄 Reset
                      </button>
                      <div style={{ flex: 1 }} />
                      <span className="plan-pct-label">{pct}% complete</span>
                      <a href={planUrl} className="plan-btn-continue">
                        Continue →
                      </a>
                    </>
                  )}
                </>
              ) : (
                <>
                  <a href={planUrl} className="plan-card-view-link">
                    View plan ↗
                  </a>
                  <button
                    className="plan-btn-start"
                    onClick={() => {
                      startPlan(plan.id);
                      window.location.href = planUrl;
                    }}
                  >
                    Start Plan →
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
