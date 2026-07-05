// ─── SM-2 Spaced Repetition Scheduler ───
// state: { reps: number, intervalDays: number, ease: number, dueTs: number, lapses: number }
// grade: 0 = Again, 1 = Hard, 2 = Good, 3 = Easy

const MIN_MS = 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

export function schedule(card, grade, now = Date.now()) {
  const currentCard = card || {
    reps: 0,
    intervalDays: 0,
    ease: 2.5,
    dueTs: now,
    lapses: 0
  };

  // 1. "Again" (Incorrect grade)
  if (grade === 0) {
    const lapses = currentCard.lapses + 1;
    const ease = Math.max(1.3, currentCard.ease - 0.2);
    return {
      reps: 0,
      intervalDays: 0,
      ease,
      lapses,
      dueTs: now + 10 * MIN_MS // schedule review in 10 minutes
    };
  }

  // 2. Correct grades (Hard, Good, Easy)
  // Shift ease: Hard (-0.15), Good (0), Easy (+0.15)
  const easeAdjustment = [0, -0.15, 0, 0.15][grade] || 0;
  const ease = Math.max(1.3, Math.min(2.8, currentCard.ease + easeAdjustment));

  let intervalDays = 1;
  if (currentCard.reps === 0) {
    intervalDays = 1;
  } else if (currentCard.reps === 1) {
    intervalDays = grade === 3 ? 4 : 3;
  } else {
    const scale = grade === 1 ? 0.8 : grade === 3 ? 1.3 : 1;
    intervalDays = Math.round(currentCard.intervalDays * ease * scale);
  }

  // Bound interval safety (at least 1 day)
  intervalDays = Math.max(1, intervalDays);

  return {
    reps: currentCard.reps + 1,
    intervalDays,
    ease,
    lapses: currentCard.lapses,
    dueTs: now + intervalDays * DAY_MS
  };
}
