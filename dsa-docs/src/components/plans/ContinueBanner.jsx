import { usePlanStore } from "../../store/planStore.js";

/**
 * ContinueBanner — shows the user's active plan and the next day to work on.
 * Self-hides when there are no active plans.
 */
export default function ContinueBanner({ plans }) {
  const { active, progress, currentDay } = usePlanStore();
  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

  // Find the first active plan that has a plans array entry
  const activePlanId = active[0];
  if (!activePlanId || !plans) return null;

  const plan = plans.find((p) => p.id === activePlanId);
  if (!plan) return null;

  const dayNum = currentDay(activePlanId, plan.days);
  const day = plan.days.find((d) => d.day === dayNum) || plan.days[plan.days.length - 1];
  const planUrl = `${base}plans/${plan.id}`;

  return (
    <div className="plan-continue-banner" role="complementary" aria-label="Continue your study plan">
      <span className="plan-continue-icon" aria-hidden="true">🎯</span>
      <div className="plan-continue-text">
        <p className="plan-continue-label">Continue learning</p>
        <p className="plan-continue-title">
          {plan.title} —{" "}
          <span className="plan-continue-day">Day {dayNum}: {day?.title}</span>
        </p>
      </div>
      <a href={planUrl} className="plan-continue-link">
        Continue →
      </a>
    </div>
  );
}
