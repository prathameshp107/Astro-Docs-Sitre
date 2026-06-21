import { create } from 'zustand';

export const useProgressStore = create((set, get) => ({
  completedTopics: [],
  quizScores: {},
  practiceSolved: 0,
  streak: 0,
  lastActive: null,

  loadProgress: () => {
    try {
      const saved = localStorage.getItem('dsa-progress');
      if (saved) set(JSON.parse(saved));
    } catch {}
  },

  markTopicCompleted: (topicId) => {
    const state = get();
    const updated = [...new Set([...state.completedTopics, topicId])];
    const next = { ...state, completedTopics: updated };
    set(next);
    localStorage.setItem('dsa-progress', JSON.stringify(next));
  },

  updateQuizScore: (topicId, score) => {
    const state = get();
    const quizScores = { ...state.quizScores, [topicId]: score };
    const next = { ...state, quizScores };
    set(next);
    localStorage.setItem('dsa-progress', JSON.stringify(next));
  },

  incrementPractice: () => {
    const state = get();
    const streak = calculateStreak(state);
    const next = { ...state, practiceSolved: state.practiceSolved + 1, streak, lastActive: Date.now() };
    set(next);
    localStorage.setItem('dsa-progress', JSON.stringify(next));
  },

  getCompletionPercent: () => {
    const state = get();
    return Math.round((state.completedTopics.length / 12) * 100);
  },
}));

function calculateStreak(state) {
  const now = Date.now();
  const day = 86400000;
  if (!state.lastActive) return 1;
  const diff = now - state.lastActive;
  if (diff < day * 2) return state.streak + (diff > day ? 1 : 0);
  return 1;
}

// ─── Playback Store ───
