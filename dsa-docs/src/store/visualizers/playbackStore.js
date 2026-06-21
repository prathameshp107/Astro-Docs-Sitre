import { create } from 'zustand';

export const usePlaybackStore = create((set, get) => ({
  isPlaying: false,
  currentStep: 0,
  totalSteps: 0,
  speed: 500,
  animationQueue: [],
  isAnimating: false,
  setTotalSteps: (n) => set({ totalSteps: n, currentStep: 0 }),
  setSpeed: (speed) => set({ speed }),
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  nextStep: () => {
    const s = get();
    if (s.currentStep < s.totalSteps - 1) set({ currentStep: s.currentStep + 1 });
    else set({ isPlaying: false });
  },
  prevStep: () => { const s = get(); if (s.currentStep > 0) set({ currentStep: s.currentStep - 1 }); },
  restart: () => set({ currentStep: 0, isPlaying: false }),
  setAnimationQueue: (queue) => set({ animationQueue: queue, totalSteps: queue.length, currentStep: 0 }),
  stepForward: () => { const s = get(); if (s.currentStep < s.animationQueue.length) set({ currentStep: s.currentStep + 1 }); },
}));

// ─── Array Store ───
