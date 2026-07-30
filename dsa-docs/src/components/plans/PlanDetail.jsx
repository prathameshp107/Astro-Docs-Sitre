import { useState } from "react";
import { usePlanStore } from "../../store/planStore.js";
import { useJudgeStore } from "../../store/judgeStore.js";
import PlanDayItem from "./PlanDayItem.jsx";
import ContinueBanner from "./ContinueBanner.jsx";
import '../../styles/sketch-visualizer.css';

function DifficultyBadge({ difficulty }) {
  return (
    <span className="sketch-border-soft px-3 py-1 text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border-amber-500/30 rounded-full uppercase">
      {difficulty}
    </span>
  );
}

function ProgressBar({ percent }) {
  return (
    <div className="space-y-1.5 font-sketch">
      <div className="flex justify-between text-xs font-mono text-[var(--sketch-text-muted)]">
        <span>Progress</span>
        <span className="font-bold text-amber-500">{percent}% complete</span>
      </div>
      <div className="w-full h-3 rounded-full bg-[var(--sketch-bg)] border border-[var(--sketch-border)] overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
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
    <div className={`sketch-border rounded-2xl transition-all duration-300 border-2 border-[var(--sketch-border)] bg-[var(--sketch-bg-dim)] overflow-hidden ${isComplete ? "border-emerald-500/50" : ""}`}>
      <button
        className="w-full p-4 md:p-5 flex items-center justify-between gap-4 text-left font-sketch cursor-pointer hover:bg-[var(--sketch-bg)] transition-colors"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <span className="sketch-border-soft px-3 py-1 text-xs font-mono font-bold bg-amber-500/20 text-amber-400 border-amber-500/40 rounded-full">
            Day {day.day}
          </span>
          <span className="font-header font-bold text-xl text-[var(--sketch-text)]">{day.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${isComplete ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" : "bg-[var(--sketch-bg)] text-[var(--sketch-text-muted)] border border-[var(--sketch-border)]"}`}>
            {isComplete ? "✓ Done" : `${doneCount}/${day.items.length}`}
          </span>
          <svg
            className={`w-5 h-5 text-[var(--sketch-text-muted)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {open && (
        <div className="p-4 md:p-5 pt-0 border-t border-[var(--sketch-border)] space-y-2">
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
    <div className="plan-detail-container font-sketch max-w-6xl mx-auto px-4 py-8">
      {/* Back link */}
      <a href={`${base}plans`} className="sketch-button inline-flex items-center gap-2 text-xs font-bold text-[var(--sketch-text-muted)] hover:text-amber-500 mb-6">
        ← All Plans
      </a>

      {/* Hero */}
      <div className="sketch-border bg-[var(--sketch-bg-dim)] p-8 md:p-10 rounded-3xl mb-10 border-2 border-[var(--sketch-border)] shadow-2xl relative font-sketch">
        <h1 className="font-header font-bold text-4xl md:text-5xl text-[var(--sketch-text)] mb-3">{plan.title}</h1>
        <p className="text-[var(--sketch-text-muted)] text-base md:text-lg max-w-2xl leading-relaxed mb-6 font-sketch">{plan.tagline}</p>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--sketch-text-muted)] mb-6">
          <DifficultyBadge difficulty={plan.difficulty} />
          <span className="flex items-center gap-1">📅 {plan.durationDays} days</span>
          <span className="flex items-center gap-1">⏱️ {plan.hoursPerDay} hr/day</span>
          <span className="flex items-center gap-1">📋 {totalItems} tasks</span>
          {projDate && (
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              🏁 Finish by ~{projDate.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
            </span>
          )}
        </div>

        {/* Progress bar (only if started) */}
        {isStarted && (
          <div className="mt-6 pt-6 border-t border-[var(--sketch-border)]">
            <ProgressBar percent={pct} />
            <div className="mt-4 flex justify-end">
              {confirmReset ? (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-rose-400">
                    ⚠️ Reset progress and start over?
                  </span>
                  <button className="sketch-button text-xs font-bold text-rose-400 border-rose-500/50 bg-rose-500/10 py-1.5 px-3" onClick={handleReset}>
                    Yes, Reset
                  </button>
                  <button className="sketch-button text-xs font-bold py-1.5 px-3" onClick={() => setConfirmReset(false)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button className="sketch-button text-xs font-bold text-rose-400 border-rose-500/40 hover:bg-rose-500/10 py-1.5 px-3" onClick={() => setConfirmReset(true)}>
                  🔄 Reset Progress
                </button>
              )}
            </div>
          </div>
        )}

        {/* Start button */}
        {!isStarted && (
          <button className="sketch-button font-header font-bold text-base text-amber-500 border-amber-500/60 bg-amber-500/10 hover:bg-amber-500/20 px-8 py-3 rounded-xl shadow-lg mt-4" onClick={handleStart}>
            Start This Plan →
          </button>
        )}
      </div>

      {/* Continue banner */}
      {isStarted && allPlans && (
        <div className="mb-8">
          <ContinueBanner plans={allPlans} />
        </div>
      )}

      {/* Day accordion list */}
      <div className="space-y-4 mb-16">
        {plan.days.map((day) => (
          <DayAccordion
            key={day.day}
            plan={plan}
            day={day}
            defaultOpen={isStarted && day.day === curDay}
          />
        ))}
      </div>

      {/* Sketch Blackboard Footer */}
      <footer className="sketch-border bg-[var(--sketch-bg-dim)] p-8 md:p-10 rounded-2xl font-sketch shadow-xl mt-16 max-w-6xl mx-auto mb-10">
        {/* Top Branding & Description */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[var(--sketch-border)]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🚀</span>
              <h3 className="text-2xl font-bold font-header text-[var(--sketch-text)]">
                {plan.title} Plan Studio
              </h3>
            </div>
            <p className="text-[var(--sketch-text-muted)] text-sm max-w-2xl leading-relaxed font-sketch">
              Structured {plan.durationDays}-day learning path with daily checklists, DSA problems, and topic reviews.
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
                <a href={`${base}plans`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> All Study Plans
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
            © {new Date().getFullYear()} {plan.title} Plan · Hand-crafted Blackboard UI.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-500 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {totalItems} Total Tasks Included
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
