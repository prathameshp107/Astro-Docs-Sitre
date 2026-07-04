import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePlanStore = create(
  persist(
    (set, get) => ({
      // plan IDs the user has started
      active: [],
      // progress keyed by plan ID
      progress: {},

      startPlan: (planId) =>
        set((state) => {
          if (state.active.includes(planId)) return state;
          return {
            active: [...state.active, planId],
            progress: {
              ...state.progress,
              [planId]: {
                startedAt: Date.now(),
                done: {},
                lastTouched: Date.now(),
              },
            },
          };
        }),

      resetPlan: (planId) =>
        set((state) => {
          const active = state.active.filter((id) => id !== planId);
          const progress = { ...state.progress };
          delete progress[planId];
          return { active, progress };
        }),

      markDone: (planId, key) =>
        set((state) => {
          const prev = state.progress[planId] || { startedAt: Date.now(), done: {}, lastTouched: Date.now() };
          return {
            progress: {
              ...state.progress,
              [planId]: {
                ...prev,
                done: { ...prev.done, [key]: true },
                lastTouched: Date.now(),
              },
            },
          };
        }),

      markUndone: (planId, key) =>
        set((state) => {
          const prev = state.progress[planId];
          if (!prev) return state;
          const done = { ...prev.done };
          delete done[key];
          return {
            progress: {
              ...state.progress,
              [planId]: { ...prev, done, lastTouched: Date.now() },
            },
          };
        }),

      // Derived helpers — not stored, computed on the fly
      percentComplete: (planId, totalItems) => {
        const prog = get().progress[planId];
        if (!prog || totalItems === 0) return 0;
        const doneCount = Object.keys(prog.done).length;
        return Math.round((doneCount / totalItems) * 100);
      },

      currentDay: (planId, days) => {
        const prog = get().progress[planId];
        if (!prog) return 1;
        for (const day of days) {
          const allDone = day.items.every((_, i) => prog.done[`${day.day}:${i}`]);
          if (!allDone) return day.day;
        }
        return days.length;
      },

      projectedFinish: (planId, totalDays) => {
        const prog = get().progress[planId];
        if (!prog) return null;
        const elapsed = Math.max(1, Math.round((Date.now() - prog.startedAt) / 86400000));
        const daysCompleted = Object.keys(prog.done).reduce((acc, k) => {
          const day = parseInt(k.split(":")[0]);
          acc.add(day);
          return acc;
        }, new Set()).size;
        if (daysCompleted === 0) return null;
        const pace = elapsed / daysCompleted;
        const remaining = totalDays - daysCompleted;
        const msLeft = remaining * pace * 86400000;
        return new Date(Date.now() + msLeft);
      },
    }),
    {
      name: "dsa-plan-store",
      partialize: (state) => ({
        active: state.active,
        progress: state.progress,
      }),
    }
  )
);
