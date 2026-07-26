import { useState } from "react";
import { usePlanStore } from "../../store/planStore.js";
import { CategoryIcon } from "../mcq/CategoryIcons.jsx";
import '../../styles/sketch-visualizer.css';

/** Map plan ID → CategoryIcon ID */
const PLAN_CATEGORY_MAP = {
  "blind-75-guided":    "algorithms",
  "30-day-dsa":         "data-structures",
  "frontend-21":        "react",
  "js-mastery":         "javascript",
  "last-minute":        "algorithms",
  "sql-in-7-days":      "sql",
  "patterns-mastery":   "system-design",
  "arrays-basics":     "data-structures",
  "strings-basics":    "typescript",
};

function PlanIcon({ planId, size = 32 }) {
  const catId = PLAN_CATEGORY_MAP[planId] || "data-structures";
  return (
    <div className="w-12 h-12 rounded-xl bg-[var(--sketch-bg)] border border-[var(--sketch-border)] flex items-center justify-center p-2.5 shadow-inner transition-transform group-hover:scale-110">
      <CategoryIcon categoryId={catId} size={size} />
    </div>
  );
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
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <circle className="plan-ring-bg" cx={size / 2} cy={size / 2} r={r} strokeWidth={strokeWidth} stroke="var(--sketch-border)" fill="none" />
      <circle
        className="plan-ring-fill"
        cx={size / 2}
        cy={size / 2}
        r={r}
        strokeWidth={strokeWidth}
        stroke={`url(#${uid})`}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        fill="none"
      />
      {percent > 0 && (
        <text
          className="plan-ring-label"
          x={size / 2}
          y={size / 2}
          transform={`rotate(90, ${size / 2}, ${size / 2})`}
          fill="var(--sketch-text)"
          fontSize="11"
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {percent}%
        </text>
      )}
    </svg>
  );
}

function DifficultyBadge({ difficulty }) {
  return (
    <span className="sketch-border-soft px-3 py-1 text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border-amber-500/30 rounded-full uppercase">
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
    <div className="plan-gallery-container font-sketch max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {plans.map((plan) => {
          const isStarted = active.includes(plan.id);
          const totalItems = countTotalItems(plan);
          const pct = isStarted ? percentComplete(plan.id, totalItems) : 0;
          const planUrl = `${base}plans/${plan.id}`;

          return (
            <div
              key={plan.id}
              className="sketch-panel-box sketch-border group flex flex-col justify-between p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500 hover:shadow-xl bg-[var(--sketch-bg-dim)] cursor-pointer"
            >
              <div>
                {/* Icon + progress ring row */}
                <div className="flex items-center justify-between mb-4">
                  <PlanIcon planId={plan.id} size={28} />
                  {isStarted && (
                    <div className="plan-ring-wrap" aria-label={`${pct}% complete`}>
                      <ProgressRing percent={pct} size={52} />
                    </div>
                  )}
                </div>

                {/* Title + tagline */}
                <h2 className="font-header font-bold text-2xl text-[var(--sketch-text)] group-hover:text-amber-500 transition-colors mb-2">
                  {plan.title}
                </h2>
                <p className="text-[var(--sketch-text-muted)] text-sm leading-relaxed mb-4 font-sketch">
                  {plan.tagline}
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-mono text-[var(--sketch-text-muted)]">
                  <DifficultyBadge difficulty={plan.difficulty} />
                  <span className="flex items-center gap-1">📅 {plan.durationDays} days</span>
                  <span className="flex items-center gap-1">⏱️ {plan.hoursPerDay} hr/day</span>
                  <span className="flex items-center gap-1">📋 {totalItems} tasks</span>
                </div>

                {/* Hero topics */}
                {plan.heroTopics?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {plan.heroTopics.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--sketch-bg)] border border-[var(--sketch-border)] text-[var(--sketch-text-muted)]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA footer */}
              <div className="pt-4 border-t border-[var(--sketch-border)]">
                {isStarted ? (
                  <>
                    {confirmResetId === plan.id ? (
                      <div className="flex items-center gap-2">
                        <button
                          className="sketch-button flex-1 text-xs font-bold text-rose-400 border-rose-500/50 bg-rose-500/10 py-2"
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
                          className="sketch-button flex-1 text-xs font-bold py-2"
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
                      <div className="flex items-center justify-between gap-3">
                        <button
                          className="sketch-button text-xs font-bold py-2 px-3 text-rose-400 border-rose-500/40 hover:bg-rose-500/10"
                          title="Reset plan progress"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setConfirmResetId(plan.id);
                          }}
                        >
                          🔄 Reset
                        </button>
                        <span className="text-xs font-mono font-bold text-amber-500">{pct}% complete</span>
                        <a href={planUrl} className="sketch-button font-header font-bold text-xs text-amber-500 border-amber-500/60 bg-amber-500/10 hover:bg-amber-500/20 py-2 px-4">
                          Continue →
                        </a>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    <a href={planUrl} className="sketch-button text-xs font-bold py-2 px-3">
                      View plan ↗
                    </a>
                    <button
                      className="sketch-button font-header font-bold text-xs text-amber-500 border-amber-500/60 bg-amber-500/10 hover:bg-amber-500/20 py-2 px-4 shadow-md"
                      onClick={() => {
                        startPlan(plan.id);
                        window.location.href = planUrl;
                      }}
                    >
                      Start Plan →
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sketch Blackboard Footer */}
      <footer className="sketch-border bg-[var(--sketch-bg-dim)] p-8 md:p-10 rounded-2xl font-sketch shadow-xl mt-16 max-w-6xl mx-auto mb-10">
        {/* Top Branding & Description */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[var(--sketch-border)]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🚀</span>
              <h3 className="text-2xl font-bold font-header text-[var(--sketch-text)]">
                Structured Learning Plans
              </h3>
            </div>
            <p className="text-[var(--sketch-text-muted)] text-sm max-w-2xl leading-relaxed font-sketch">
              Day-by-day study schedules for DSA, Frontend, SQL, and System Design with progress tracking and task checklists.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/prathameshp107/DSA-Notes-Problems"
              target="_blank"
              rel="noopener noreferrer"
              className="sketch-button flex items-center gap-2 text-sm font-bold bg-amber-500/20 border-amber-500"
            >
              <span>⭐ Star on GitHub</span>
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="sketch-button flex items-center gap-1.5 text-sm font-bold"
              title="Back to top"
            >
              <span>↑ Top</span>
            </button>
          </div>
        </div>

        {/* 4-Column Quick Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-b border-[var(--sketch-border)]">
          {/* Column 1: Featured Plans */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <span>🎯</span> Popular Plans
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}plans/blind-75-guided`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Blind 75 Guided
                </a>
              </li>
              <li>
                <a href={`${base}plans/30-day-dsa`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> 30-Day DSA Mastery
                </a>
              </li>
              <li>
                <a href={`${base}plans/frontend-21`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Frontend 21-Day Prep
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Interview Prep */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <span>💡</span> Interview Prep
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}companies`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Company Tracks
                </a>
              </li>
              <li>
                <a href={`${base}interview-questions`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Interview Questions
                </a>
              </li>
              <li>
                <a href={`${base}labs`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Practice Labs Hub
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Design & DSA */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <span>📐</span> Design & DSA
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}system-design`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> System Design Hub
                </a>
              </li>
              <li>
                <a href={`${base}visualizer`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Visualizer Studio
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Quizzes */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <span>❓</span> MCQ Quizzes
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}mcq`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> All MCQ Categories
                </a>
              </li>
              <li>
                <a href={`${base}mcq/javascript`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> JavaScript MCQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Design Bar */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[var(--sketch-text-muted)]">
          <div>
            © {new Date().getFullYear()} Study Plans Studio · Hand-crafted Blackboard UI.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-500 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {plans.length} Learning Paths Available
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
