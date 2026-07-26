import { create } from 'zustand';

const ENQUEUE_STEPS = [
  {
    activeLine: 1,
    front: -1,
    rear: -1,
    queue: [null, null, null, null],
    state: { front: -1, rear: -1, 'rear == max_size - 1': 'FALSE ❌', itemToEnqueue: 10 },
    desc: 'Line 1: Check overflow: rear (-1) == max_size - 1 (4) is FALSE. Space available in Queue.',
  },
  {
    activeLine: 2,
    front: 0,
    rear: 0,
    queue: [10, null, null, null],
    state: { front: 0, rear: 0, 'queue[0]': 10 },
    desc: 'Line 2 & 3: Enqueue first element 10 → Set front = 0, rear = 0.',
  },
  {
    activeLine: 4,
    front: 0,
    rear: 0,
    queue: [10, null, null, null],
    state: { 'queue[0]': 10, status: 'ENQUEUED 10 ✅' },
    desc: 'Line 4: Place queue[rear] = 10. Element 10 added at index 0!',
  },
  {
    activeLine: 3,
    front: 0,
    rear: 1,
    queue: [10, 20, null, null],
    state: { front: 0, rear: 1, 'queue[1]': 20 },
    desc: 'Line 3: Increment rear = 1. Enqueue element 20 at index 1.',
  },
  {
    activeLine: 3,
    front: 0,
    rear: 2,
    queue: [10, 20, 30, null],
    state: { front: 0, rear: 2, 'queue[2]': 30 },
    desc: 'Line 3: Increment rear = 2. Enqueue element 30 at index 2.',
  },
  {
    activeLine: 4,
    front: 0,
    rear: 3,
    queue: [10, 20, 30, 40],
    state: { front: 0, rear: 3, 'queue[3]': 40, status: 'ENQUEUED ALL 🎉' },
    desc: 'Line 4: Increment rear = 3. Enqueue element 40. Queue now holds [10, 20, 30, 40]! 🎉',
  },
];

const DEQUEUE_STEPS = [
  {
    activeLine: 1,
    front: 0,
    rear: 3,
    queue: [10, 20, 30, 40],
    state: { front: 0, rear: 3, 'front == -1': 'FALSE ❌' },
    desc: 'Line 1: Check underflow: front (0) == -1 is FALSE. Queue is not empty.',
  },
  {
    activeLine: 2,
    front: 0,
    rear: 3,
    queue: [10, 20, 30, 40],
    state: { dequeuedVal: 10, front: 0 },
    desc: 'Line 2: Read val = queue[front] (10).',
  },
  {
    activeLine: 3,
    front: 1,
    rear: 3,
    queue: [20, 30, 40],
    state: { front: 1, rear: 3, dequeuedVal: 10 },
    desc: 'Line 3: Increment front = front + 1 = 1. Element 10 dequeued from Queue.',
  },
  {
    activeLine: 4,
    front: 1,
    rear: 3,
    queue: [20, 30, 40],
    state: { returnedVal: 10, newFront: 20, status: 'DEQUEUED 10 ✅' },
    desc: 'Line 4: Return dequeued value = 10. Front of queue is now 20! 🎉',
  },
];

const CIRCULAR_QUEUE_STEPS = [
  {
    activeLine: 1,
    front: 0,
    rear: 3,
    queue: [10, 20, 30, 40, null],
    state: { front: 0, rear: 3, capacity: 5 },
    desc: 'Line 1: Circular Queue initialization. Front at 0 (10), Rear at 3 (40).',
  },
  {
    activeLine: 2,
    front: 0,
    rear: 4,
    queue: [10, 20, 30, 40, 50],
    state: { rear: 4, 'rear = (3 + 1) % 5': 4 },
    desc: 'Line 2: Enqueue 50: rear = (3 + 1) % 5 = 4. Queue is now full.',
  },
  {
    activeLine: 3,
    front: 1,
    rear: 4,
    queue: [20, 30, 40, 50],
    state: { front: 1, 'front = (0 + 1) % 5': 1, dequeued: 10 },
    desc: 'Line 3: Dequeue 10: front = (0 + 1) % 5 = 1. Index 0 is now freed!',
  },
  {
    activeLine: 4,
    front: 1,
    rear: 0,
    queue: [60, 20, 30, 40, 50],
    state: { rear: 0, 'rear = (4 + 1) % 5': 0, enqueued: 60, status: 'WRAPPED AROUND 🎉' },
    desc: 'Line 4: Enqueue 60: rear wraps around to index 0: rear = (4 + 1) % 5 = 0! 🎉',
  },
];

export const useQueueStore = create((set, get) => ({
  track: 'enqueue',
  queue: [null, null, null, null],
  steps: ENQUEUE_STEPS,
  currentStep: 0,
  isPlaying: false,
  speed: 1,
  practiceMode: false,
  userCode: `// Write your pseudocode or solution here\nclass Queue {\n  constructor() {\n    this.items = [];\n  }\n  enqueue(element) {\n    this.items.push(element);\n  }\n  dequeue() {\n    return this.items.shift();\n  }\n}`,

  setTrack: (track) => {
    if (track === 'enqueue') {
      set({ track: 'enqueue', queue: [null, null, null, null], steps: ENQUEUE_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'dequeue') {
      set({ track: 'dequeue', queue: [10, 20, 30, 40], steps: DEQUEUE_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'circular-queue') {
      set({ track: 'circular-queue', queue: [10, 20, 30, 40], steps: CIRCULAR_QUEUE_STEPS, currentStep: 0, isPlaying: false });
    }
  },

  setCurrentStep: (step) => {
    const { steps } = get();
    if (step >= 0 && step < steps.length) {
      const targetStep = steps[step];
      const newQueue = targetStep.queue || get().queue;
      set({ currentStep: step, queue: newQueue });
    }
  },

  nextStep: () => {
    const { currentStep, steps } = get();
    if (currentStep < steps.length - 1) {
      const nextIndex = currentStep + 1;
      const targetStep = steps[nextIndex];
      const newQueue = targetStep.queue || get().queue;
      set({ currentStep: nextIndex, queue: newQueue });
    } else {
      set({ isPlaying: false });
    }
  },

  prevStep: () => {
    const { currentStep, steps } = get();
    if (currentStep > 0) {
      const prevIndex = currentStep - 1;
      const targetStep = steps[prevIndex];
      const newQueue = targetStep.queue || get().queue;
      set({ currentStep: prevIndex, queue: newQueue });
    }
  },

  restart: () => {
    const { steps } = get();
    const initialQueue = steps[0].queue || [];
    set({ currentStep: 0, queue: initialQueue, isPlaying: false });
  },

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSpeed: (s) => set({ speed: s }),
  togglePracticeMode: () => set((state) => ({ practiceMode: !state.practiceMode })),
  setUserCode: (code) => set({ userCode: code }),
}));
