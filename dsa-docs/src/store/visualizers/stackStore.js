import { create } from 'zustand';

const PUSH_STEPS = [
  {
    activeLine: 1,
    top: -1,
    stack: [],
    state: { top: -1, 'top == max_size - 1': 'FALSE ❌', itemToPush: 10 },
    desc: 'Line 1: Check overflow: top (-1) == max_size - 1 (4) is FALSE. Room available.',
  },
  {
    activeLine: 2,
    top: 0,
    stack: [10],
    state: { top: 0, 'stack[0]': 10 },
    desc: 'Line 2: Increment top = top + 1 = 0.',
  },
  {
    activeLine: 3,
    top: 0,
    stack: [10],
    state: { 'stack[0]': 10, status: 'PUSHED 10 ✅' },
    desc: 'Line 3: Place stack[0] = 10. Element 10 pushed onto Stack!',
  },
  {
    activeLine: 2,
    top: 1,
    stack: [10, 20],
    state: { top: 1, 'stack[1]': 20 },
    desc: 'Line 2: Increment top = 1. Push element 20 onto Stack.',
  },
  {
    activeLine: 2,
    top: 2,
    stack: [10, 20, 30],
    state: { top: 2, 'stack[2]': 30 },
    desc: 'Line 2: Increment top = 2. Push element 30 onto Stack.',
  },
  {
    activeLine: 2,
    top: 3,
    stack: [10, 20, 30, 40],
    state: { top: 3, 'stack[3]': 40, status: 'STACK FULL 🎉' },
    desc: 'Line 2 & 3: Increment top = 3. Push element 40 onto Stack! Top is now 40. 🎉',
  },
];

const POP_STEPS = [
  {
    activeLine: 1,
    top: 3,
    stack: [10, 20, 30, 40],
    state: { top: 3, 'top == -1': 'FALSE ❌' },
    desc: 'Line 1: Check underflow: top (3) == -1 is FALSE. Stack contains 4 elements.',
  },
  {
    activeLine: 2,
    top: 3,
    stack: [10, 20, 30, 40],
    state: { poppedVal: 40, top: 3 },
    desc: 'Line 2: Store popped element val = stack[top] (40).',
  },
  {
    activeLine: 3,
    top: 2,
    stack: [10, 20, 30],
    state: { top: 2, poppedVal: 40 },
    desc: 'Line 3: Decrement top = top - 1 = 2. Element 40 removed from Stack.',
  },
  {
    activeLine: 4,
    top: 2,
    stack: [10, 20, 30],
    state: { returnedVal: 40, top: 2, status: 'POPPED 40 ✅' },
    desc: 'Line 4: Return popped value = 40. Top element is now 30! 🎉',
  },
];

const PEEK_STEPS = [
  {
    activeLine: 1,
    top: 3,
    stack: [10, 20, 30, 40],
    state: { top: 3, 'top == -1': 'FALSE ❌' },
    desc: 'Line 1: Check underflow: top (3) == -1 is FALSE.',
  },
  {
    activeLine: 2,
    top: 3,
    stack: [10, 20, 30, 40],
    state: { peekedVal: 40, top: 3, status: 'PEEK SUCCESS ✅' },
    desc: 'Line 2: Return stack[top] (40) without removing it. O(1) top lookup complete! 🎉',
  },
];

const VALID_PARENTHESES_STEPS = [
  {
    activeLine: 1,
    top: -1,
    stack: [],
    inputStr: '{[()]}',
    state: { char: '{', action: 'push {' },
    desc: 'Char "{": Open bracket → Push "{" onto Stack.',
  },
  {
    activeLine: 1,
    top: 0,
    stack: ['{'],
    inputStr: '{[()]}',
    state: { char: '[', action: 'push [' },
    desc: 'Char "[": Open bracket → Push "[" onto Stack.',
  },
  {
    activeLine: 1,
    top: 1,
    stack: ['{', '['],
    inputStr: '{[()]}',
    state: { char: '(', action: 'push (' },
    desc: 'Char "(": Open bracket → Push "(" onto Stack.',
  },
  {
    activeLine: 2,
    top: 2,
    stack: ['{', '[', '('],
    inputStr: '{[()]}',
    state: { char: ')', top: '(', match: '")" matches "("' },
    desc: 'Char ")": Closing bracket → Matches top "("! Pop "(" from Stack.',
  },
  {
    activeLine: 2,
    top: 1,
    stack: ['{', '['],
    inputStr: '{[()]}',
    state: { char: ']', top: '[', match: '"]" matches "["' },
    desc: 'Char "]": Closing bracket → Matches top "["! Pop "[" from Stack.',
  },
  {
    activeLine: 2,
    top: 0,
    stack: ['{'],
    inputStr: '{[()]}',
    state: { char: '}', top: '{', match: '"}" matches "{"' },
    desc: 'Char "}": Closing bracket → Matches top "{"! Pop "{" from Stack.',
  },
  {
    activeLine: 3,
    top: -1,
    stack: [],
    inputStr: '{[()]}',
    state: { 'stack.isEmpty': 'TRUE ✅', result: 'true', status: 'VALID PARENTHESES 🎉' },
    desc: 'End of string reached. Stack is empty → Return true (Valid Parentheses)! 🎉',
  },
];

export const useStackStore = create((set, get) => ({
  track: 'push',
  stack: [],
  steps: PUSH_STEPS,
  currentStep: 0,
  isPlaying: false,
  speed: 1,
  practiceMode: false,
  userCode: `// Write your pseudocode or solution here\nclass Stack {\n  constructor() {\n    this.items = [];\n  }\n  push(element) {\n    this.items.push(element);\n  }\n  pop() {\n    return this.items.pop();\n  }\n}`,

  setTrack: (track) => {
    if (track === 'push') {
      set({ track: 'push', stack: [], steps: PUSH_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'pop') {
      set({ track: 'pop', stack: [10, 20, 30, 40], steps: POP_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'peek') {
      set({ track: 'peek', stack: [10, 20, 30, 40], steps: PEEK_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'valid-parentheses') {
      set({ track: 'valid-parentheses', stack: [], steps: VALID_PARENTHESES_STEPS, currentStep: 0, isPlaying: false });
    }
  },

  setCurrentStep: (step) => {
    const { steps } = get();
    if (step >= 0 && step < steps.length) {
      const targetStep = steps[step];
      const newStack = targetStep.stack || get().stack;
      set({ currentStep: step, stack: newStack });
    }
  },

  nextStep: () => {
    const { currentStep, steps } = get();
    if (currentStep < steps.length - 1) {
      const nextIndex = currentStep + 1;
      const targetStep = steps[nextIndex];
      const newStack = targetStep.stack || get().stack;
      set({ currentStep: nextIndex, stack: newStack });
    } else {
      set({ isPlaying: false });
    }
  },

  prevStep: () => {
    const { currentStep, steps } = get();
    if (currentStep > 0) {
      const prevIndex = currentStep - 1;
      const targetStep = steps[prevIndex];
      const newStack = targetStep.stack || get().stack;
      set({ currentStep: prevIndex, stack: newStack });
    }
  },

  restart: () => {
    const { steps } = get();
    const initialStack = steps[0].stack || [];
    set({ currentStep: 0, stack: initialStack, isPlaying: false });
  },

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSpeed: (s) => set({ speed: s }),
  togglePracticeMode: () => set((state) => ({ practiceMode: !state.practiceMode })),
  setUserCode: (code) => set({ userCode: code }),
}));
