import { create } from 'zustand';

const SEPARATE_CHAINING_STEPS = [
  {
    activeLine: 1,
    buckets: Array(8).fill(null).map(() => []),
    activeKey: 'apple',
    activeVal: 10,
    hashIdx: 3,
    state: { key: '"apple"', hash: 'hash("apple") % 8 = 3', bucket: 3 },
    desc: 'Line 1: Compute hash("apple") = (97+112+112+108+101) % 8 = 3. Bucket 3 is empty.',
  },
  {
    activeLine: 2,
    buckets: [
      [],
      [],
      [],
      [{ key: 'apple', val: 10 }],
      [],
      [],
      [],
      [],
    ],
    activeKey: 'apple',
    activeVal: 10,
    hashIdx: 3,
    state: { inserted: '"apple": 10', bucket: 3 },
    desc: 'Line 2: Insert node {"apple": 10} into Bucket 3.',
  },
  {
    activeLine: 1,
    buckets: [
      [],
      [],
      [],
      [{ key: 'apple', val: 10 }],
      [],
      [],
      [],
      [],
    ],
    activeKey: 'banana',
    activeVal: 20,
    hashIdx: 5,
    state: { key: '"banana"', hash: 'hash("banana") % 8 = 5', bucket: 5 },
    desc: 'Line 1: Compute hash("banana") = 5. Bucket 5 is empty.',
  },
  {
    activeLine: 2,
    buckets: [
      [],
      [],
      [],
      [{ key: 'apple', val: 10 }],
      [],
      [{ key: 'banana', val: 20 }],
      [],
      [],
    ],
    activeKey: 'banana',
    activeVal: 20,
    hashIdx: 5,
    state: { inserted: '"banana": 20', bucket: 5 },
    desc: 'Line 2: Insert node {"banana": 20} into Bucket 5.',
  },
  {
    activeLine: 1,
    buckets: [
      [],
      [],
      [],
      [{ key: 'apple', val: 10 }],
      [],
      [{ key: 'banana', val: 20 }],
      [],
      [],
    ],
    activeKey: 'cherry',
    activeVal: 30,
    hashIdx: 3,
    collision: true,
    state: { key: '"cherry"', hash: 'hash("cherry") % 8 = 3', collision: '⚠️ COLLISION AT BUCKET 3!' },
    desc: 'Line 1: Compute hash("cherry") = 3. Bucket 3 already contains "apple" → COLLISION DETECTED! ⚠️',
  },
  {
    activeLine: 2,
    buckets: [
      [],
      [],
      [],
      [
        { key: 'apple', val: 10 },
        { key: 'cherry', val: 30 },
      ],
      [],
      [{ key: 'banana', val: 20 }],
      [],
      [],
    ],
    activeKey: 'cherry',
    activeVal: 30,
    hashIdx: 3,
    state: { chained: '"apple" ➔ "cherry": 30', bucket: 3, status: 'CHAINING COMPLETE 🎉' },
    desc: 'Line 2: Append {"cherry": 30} to Bucket 3 linked list chain: "apple" ➔ "cherry". 🎉',
  },
];

const LINEAR_PROBING_STEPS = [
  {
    activeLine: 1,
    openBuckets: Array(8).fill(null),
    activeKey: 'keyA',
    hashIdx: 2,
    state: { key: '"keyA"', hashIdx: 2 },
    desc: 'Line 1: Compute hash("keyA") % 8 = 2. Slot 2 is empty.',
  },
  {
    activeLine: 2,
    openBuckets: [null, null, 'keyA', null, null, null, null, null],
    activeKey: 'keyA',
    hashIdx: 2,
    state: { insertedAt: 2 },
    desc: 'Line 2: Place "keyA" directly into slot 2.',
  },
  {
    activeLine: 1,
    openBuckets: [null, null, 'keyA', null, null, null, null, null],
    activeKey: 'keyB',
    hashIdx: 2,
    probeIdx: 2,
    collision: true,
    state: { key: '"keyB"', initialHash: 2, collision: '⚠️ SLOT 2 OCCUPIED!' },
    desc: 'Line 1: Compute hash("keyB") % 8 = 2. Slot 2 occupied by "keyA" → COLLISION! ⚠️',
  },
  {
    activeLine: 2,
    openBuckets: [null, null, 'keyA', 'keyB', null, null, null, null],
    activeKey: 'keyB',
    hashIdx: 3,
    probeIdx: 3,
    state: { probedTo: 3, insertedAt: 3, status: 'LINEAR PROBING SUCCESS 🎉' },
    desc: 'Line 2: Linear probe to next slot (2 + 1) % 8 = 3. Slot 3 is empty → Insert "keyB"! 🎉',
  },
];

const TWO_SUM_STEPS = [
  {
    activeLine: 1,
    numArray: [2, 7, 11, 15],
    target: 9,
    currIdx: 0,
    mapState: {},
    state: { num: 2, comp: '9 - 2 = 7', map: '{}' },
    desc: 'Line 1: Process nums[0] = 2. Complement = 9 - 2 = 7. Look up 7 in Map: NOT FOUND.',
  },
  {
    activeLine: 2,
    numArray: [2, 7, 11, 15],
    target: 9,
    currIdx: 0,
    mapState: { 2: 0 },
    state: { action: 'Store {2: 0} in Map' },
    desc: 'Line 2: Store {2: 0} in Hash Map for future complement match.',
  },
  {
    activeLine: 1,
    numArray: [2, 7, 11, 15],
    target: 9,
    currIdx: 1,
    mapState: { 2: 0 },
    state: { num: 7, comp: '9 - 7 = 2', foundInMap: '2 → index 0! 🎯' },
    desc: 'Line 1: Process nums[1] = 7. Complement = 9 - 7 = 2. Look up 2 in Map: FOUND at index 0! 🎯',
  },
  {
    activeLine: 3,
    numArray: [2, 7, 11, 15],
    target: 9,
    currIdx: 1,
    mapState: { 2: 0 },
    state: { solution: '[0, 1]', values: 'nums[0] + nums[1] = 2 + 7 = 9', status: 'TWO SUM COMPLETE 🎉' },
    desc: 'Line 3: Match found! Return pair indices [0, 1] (2 + 7 = 9). 🎉',
  },
];

const GROUP_ANAGRAMS_STEPS = [
  {
    activeLine: 1,
    words: ['eat', 'tea', 'tan', 'ate'],
    currWord: 'eat',
    sortedKey: 'aet',
    anagramGroups: { aet: ['eat'] },
    state: { word: '"eat"', sortedKey: '"aet"', group: '["eat"]' },
    desc: 'Line 1: Word "eat" → sorted key "aet". Create new group: ["eat"].',
  },
  {
    activeLine: 1,
    words: ['eat', 'tea', 'tan', 'ate'],
    currWord: 'tea',
    sortedKey: 'aet',
    anagramGroups: { aet: ['eat', 'tea'] },
    state: { word: '"tea"', sortedKey: '"aet"', group: '["eat", "tea"]' },
    desc: 'Line 1: Word "tea" → sorted key "aet". Append to existing group: ["eat", "tea"].',
  },
  {
    activeLine: 1,
    words: ['eat', 'tea', 'tan', 'ate'],
    currWord: 'tan',
    sortedKey: 'ant',
    anagramGroups: { aet: ['eat', 'tea'], ant: ['tan'] },
    state: { word: '"tan"', sortedKey: '"ant"', group: '["tan"]' },
    desc: 'Line 1: Word "tan" → sorted key "ant". Create new group: ["tan"].',
  },
  {
    activeLine: 2,
    words: ['eat', 'tea', 'tan', 'ate'],
    currWord: 'ate',
    sortedKey: 'aet',
    anagramGroups: { aet: ['eat', 'tea', 'ate'], ant: ['tan'] },
    state: { result: '[["eat", "tea", "ate"], ["tan"]]', status: 'GROUP ANAGRAMS COMPLETE 🎉' },
    desc: 'Line 2: Word "ate" → sorted key "aet". Append to "aet" group: [["eat", "tea", "ate"], ["tan"]]! 🎉',
  },
];

export const useHashTableStore = create((set, get) => ({
  track: 'separate-chaining',
  steps: SEPARATE_CHAINING_STEPS,
  currentStep: 0,
  isPlaying: false,
  speed: 1,
  practiceMode: false,
  userCode: `// Write your pseudocode or solution here\nclass HashTable {\n  constructor(size = 8) {\n    this.buckets = new Array(size).fill(null).map(() => []);\n  }\n  hash(key) {\n    let sum = 0;\n    for (let c of key) sum += c.charCodeAt(0);\n    return sum % this.buckets.length;\n  }\n  set(key, val) {\n    const idx = this.hash(key);\n    this.buckets[idx].push({ key, val });\n  }\n}`,

  setTrack: (track) => {
    if (track === 'separate-chaining') {
      set({ track: 'separate-chaining', steps: SEPARATE_CHAINING_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'linear-probing') {
      set({ track: 'linear-probing', steps: LINEAR_PROBING_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'two-sum-hash') {
      set({ track: 'two-sum-hash', steps: TWO_SUM_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'group-anagrams') {
      set({ track: 'group-anagrams', steps: GROUP_ANAGRAMS_STEPS, currentStep: 0, isPlaying: false });
    }
  },

  setCurrentStep: (step) => {
    const { steps } = get();
    if (step >= 0 && step < steps.length) {
      set({ currentStep: step });
    }
  },

  nextStep: () => {
    const { currentStep, steps } = get();
    if (currentStep < steps.length - 1) {
      set({ currentStep: currentStep + 1 });
    } else {
      set({ isPlaying: false });
    }
  },

  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 0) {
      set({ currentStep: currentStep - 1 });
    }
  },

  restart: () => {
    set({ currentStep: 0, isPlaying: false });
  },

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSpeed: (s) => set({ speed: s }),
  togglePracticeMode: () => set((state) => ({ practiceMode: !state.practiceMode })),
  setUserCode: (code) => set({ userCode: code }),
}));
