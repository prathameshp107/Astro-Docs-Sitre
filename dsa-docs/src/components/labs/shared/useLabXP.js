import { useState, useEffect } from "react";

// Cross-lab XP, levels, and daily streak. Persisted in localStorage so it
// survives across labs and sessions (unlike per-lab sessionStorage progress).
const KEY = "lab-xp-v1";
const AWARD_EVENT = "lab-xp-award";

function readState() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && typeof s.xp === "number") return { awards: {}, days: {}, ...s };
  } catch {
    /* corrupt state — start fresh */
  }
  return { xp: 0, awards: {}, days: {} };
}

function localDayKey(d = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// Level n → n+1 costs 100 + (n-1)*50 XP
export function levelFromXP(xp) {
  let level = 1;
  let need = 100;
  let rem = xp;
  while (rem >= need) {
    rem -= need;
    level += 1;
    need = 100 + (level - 1) * 50;
  }
  return { level, into: rem, need, pct: Math.round((rem / need) * 100) };
}

export function getStreak(state = readState()) {
  const day = new Date();
  let streak = 0;
  // today counts if active; otherwise streak may still be alive from yesterday
  if (!state.days[localDayKey(day)]) day.setDate(day.getDate() - 1);
  while (state.days[localDayKey(day)]) {
    streak += 1;
    day.setDate(day.getDate() - 1);
  }
  return streak;
}

// Award XP once per unique id ("js:lesson:l3"). Returns the award detail,
// or null if this id was already rewarded.
export function awardXP(id, amount, label = "Completed") {
  if (typeof window === "undefined") return null;
  const state = readState();
  if (state.awards[id]) return null;

  const beforeLevel = levelFromXP(state.xp).level;
  state.awards[id] = Date.now();
  state.xp += amount;
  state.days[localDayKey()] = (state.days[localDayKey()] || 0) + amount;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage blocked — still emit the event for UI feedback */
  }

  const after = levelFromXP(state.xp);
  const detail = {
    id,
    amount,
    label,
    xp: state.xp,
    level: after.level,
    levelUp: after.level > beforeLevel,
    streak: getStreak(state),
  };
  window.dispatchEvent(new CustomEvent(AWARD_EVENT, { detail }));
  return detail;
}

export function onXPAward(handler) {
  window.addEventListener(AWARD_EVENT, handler);
  return () => window.removeEventListener(AWARD_EVENT, handler);
}

export default function useLabXP() {
  const [snap, setSnap] = useState({ xp: 0, level: 1, pct: 0, into: 0, need: 100, streak: 0 });

  useEffect(() => {
    const refresh = () => {
      const state = readState();
      const lv = levelFromXP(state.xp);
      setSnap({ xp: state.xp, ...lv, streak: getStreak(state) });
    };
    refresh();
    const off = onXPAward(refresh);
    window.addEventListener("storage", refresh);
    return () => {
      off();
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return snap;
}
