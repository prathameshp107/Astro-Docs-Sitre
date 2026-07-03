import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_SUBMISSIONS_PER_PROBLEM = 50;

export const useJudgeStore = create(
  persist(
    (set, get) => ({
      solved: {},
      drafts: {},
      submissions: {},

      setDraft: (problemId, lang, code) =>
        set((state) => ({
          drafts: {
            ...state.drafts,
            [problemId]: { ...state.drafts[problemId], [lang]: code },
          },
        })),

      getDraft: (problemId, lang, fallback) => {
        const draft = get().drafts[problemId];
        return draft && typeof draft[lang] === "string" ? draft[lang] : fallback;
      },

      recordSubmission: (problemId, entry) =>
        set((state) => {
          const prevList = state.submissions[problemId] || [];
          const nextList = [entry, ...prevList].slice(0, MAX_SUBMISSIONS_PER_PROBLEM);
          const prevStatus = state.solved[problemId];
          const nextStatus =
            entry.verdict === "accepted" ? "accepted" : prevStatus === "accepted" ? "accepted" : "attempted";

          return {
            submissions: { ...state.submissions, [problemId]: nextList },
            solved: { ...state.solved, [problemId]: nextStatus },
          };
        }),

      getSubmissions: (problemId) => get().submissions[problemId] || [],
    }),
    {
      name: "dsa-judge-store",
      partialize: (state) => ({
        solved: state.solved,
        drafts: state.drafts,
        submissions: state.submissions,
      }),
    }
  )
);
