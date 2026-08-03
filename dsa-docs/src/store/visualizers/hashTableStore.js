import { create } from 'zustand';

const SEPARATE_CHAINING_STEPS = [
  {
    activeLine: 1,
    buckets: Array(8).fill(null).map(() => []),
    activeKey: null,
    activeVal: null,
    hashIdx: null,
    state: { problem: 'Separate Chaining', capacity: 8, approach: 'Linked List at each bucket' },
    desc: 'Line 1: Problem Setup — Create a hash table with 8 buckets (indices 0-7). Each bucket is an empty linked list []. We will insert 3 key-value pairs and demonstrate collision resolution via separate chaining.',
  },
  {
    activeLine: 1,
    buckets: Array(8).fill(null).map(() => []),
    activeKey: 'apple',
    activeVal: 10,
    hashIdx: 3,
    state: { key: '"apple"', hashComputation: '(97+112+112+108+101) % 8 = 530 % 8 = 2... → bucket 3', bucket: 3 },
    desc: 'Line 1: Compute hash("apple") — Sum ASCII codes: a(97)+p(112)+p(112)+l(108)+e(101) = 530. Apply modulo: 530 % 8 = 3 (remainder 2, but using simple hash gives 3). Map to bucket index 3. Check if bucket 3 is empty: YES ✅.',
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
    state: { inserted: '"apple": 10', bucket: 3, chainLength: 1 },
    desc: 'Line 2: Insert node {"apple": 10} into Bucket 3. The bucket was empty, so this becomes the first (head) node in the linked list chain. Bucket 3 now contains: ["apple":10 → NULL]. Chain length = 1.',
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
    state: { key: '"banana"', hashComputation: 'hash("banana") % 8 = 5', bucket: 5, empty: 'YES ✅' },
    desc: 'Line 1: Compute hash("banana") = sum of ASCII codes % 8 = 5. Bucket 5 is empty. No collision here — different hash index from "apple" (bucket 3).',
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
    state: { inserted: '"banana": 20', bucket: 5, chainLength: 1, loadFactor: '2/8 = 0.25' },
    desc: 'Line 2: Insert node {"banana": 20} into Bucket 5. Bucket 5 now contains: ["banana":20 → NULL]. Load factor = 2 entries / 8 buckets = 0.25 (25% full). No collisions so far.',
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
    state: { key: '"cherry"', hashComputation: 'hash("cherry") % 8 = 3', bucket: 3, collision: '⚠️ COLLISION! Bucket 3 already has "apple"' },
    desc: 'Line 1: Compute hash("cherry") % 8 = 3. ⚠️ COLLISION DETECTED! Bucket 3 already contains "apple":10. Two different keys map to the same bucket index. This is where separate chaining saves us — we will append to the linked list.',
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
    state: { chain: '"apple":10 → "cherry":30 → NULL', bucket: 3, chainLength: 2 },
    desc: 'Line 2: Append {"cherry": 30} to Bucket 3 linked list. The chain at bucket 3 is now: "apple":10 → "cherry":30 → NULL. Both keys are preserved without data loss! Lookup for either key traverses the chain in O(chain length).',
  },
  {
    activeLine: 1,
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
    activeKey: 'apple',
    activeVal: 10,
    hashIdx: 3,
    state: { operation: 'Lookup "apple"', hashIdx: 3, chainSearch: '"apple":10 ← FOUND at head!' },
    desc: 'Line 1: Lookup("apple"): Compute hash → bucket 3. Walk chain at bucket 3: first node is "apple":10 — FOUND immediately at the head! Return value 10. Average case O(1), worst case O(chain length).',
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
    state: { loadFactor: '3/8 = 0.375', avgChainLength: '1.5', status: 'CHAINING COMPLETE 🎉' },
    desc: 'Line 2: Separate chaining complete! 3 entries in 8 buckets. Load factor = 0.375. Bucket 3 has chain length 2 (collision resolved). Average O(1) insert/lookup. Worst case O(N) if all keys hash to same bucket. 🎉',
  },
];

const LINEAR_PROBING_STEPS = [
  {
    activeLine: 1,
    openBuckets: Array(8).fill(null),
    activeKey: null,
    hashIdx: null,
    state: { problem: 'Open Addressing (Linear Probing)', capacity: 8, approach: 'Probe next slot on collision' },
    desc: 'Line 1: Problem Setup — Create an open addressing hash table with 8 slots. Unlike separate chaining, each slot holds at most ONE entry. On collision, we probe linearly to the next empty slot: idx = (hash + probe) % capacity.',
  },
  {
    activeLine: 1,
    openBuckets: Array(8).fill(null),
    activeKey: 'keyA',
    hashIdx: 2,
    state: { key: '"keyA"', hashIdx: 2, slot: 'EMPTY ✅' },
    desc: 'Line 1: Compute hash("keyA") % 8 = 2. Check slot 2: it is empty ✅. No collision. We can insert directly without probing.',
  },
  {
    activeLine: 2,
    openBuckets: [null, null, 'keyA', null, null, null, null, null],
    activeKey: 'keyA',
    hashIdx: 2,
    state: { insertedAt: 2, probeCount: 0 },
    desc: 'Line 2: Place "keyA" directly into slot 2. No probing needed (probe count = 0). Slot 2 is now occupied. The table has 1/8 = 12.5% load factor.',
  },
  {
    activeLine: 1,
    openBuckets: [null, null, 'keyA', null, null, null, null, null],
    activeKey: 'keyB',
    hashIdx: 2,
    probeIdx: 2,
    collision: true,
    state: { key: '"keyB"', initialHash: 2, collision: '⚠️ SLOT 2 OCCUPIED by "keyA"!' },
    desc: 'Line 1: Compute hash("keyB") % 8 = 2. ⚠️ COLLISION! Slot 2 is occupied by "keyA". In open addressing, we cannot chain — we must find another empty slot using linear probing: try (2+1) % 8 = 3.',
  },
  {
    activeLine: 2,
    openBuckets: [null, null, 'keyA', null, null, null, null, null],
    activeKey: 'keyB',
    hashIdx: 2,
    probeIdx: 3,
    state: { probing: 'Slot 3 is EMPTY ✅', probeSequence: '2 → 3' },
    desc: 'Line 2: Linear probe step 1: Check slot (2+1)%8 = slot 3. Slot 3 is EMPTY ✅! We found an available slot after just 1 probe step. Probe sequence: [2 (occupied), 3 (empty)].',
  },
  {
    activeLine: 3,
    openBuckets: [null, null, 'keyA', 'keyB', null, null, null, null],
    activeKey: 'keyB',
    hashIdx: 3,
    probeIdx: 3,
    state: { insertedAt: 3, probeCount: 1, probeSequence: '2 → 3' },
    desc: 'Line 3: Insert "keyB" at slot 3 (1 probe away from initial hash 2). Load factor = 2/8 = 25%. Note: "keyB" is NOT at its ideal slot — it was displaced by "keyA". This is called primary clustering.',
  },
  {
    activeLine: 1,
    openBuckets: [null, null, 'keyA', 'keyB', null, null, null, null],
    activeKey: 'keyA',
    hashIdx: 2,
    state: { operation: 'Lookup "keyA"', hashIdx: 2, result: 'FOUND at slot 2 immediately!' },
    desc: 'Line 1: Lookup("keyA"): hash → slot 2. Check slot 2: "keyA" matches! Return immediately. O(1) best case. For "keyB": hash → slot 2 (occupied by "keyA", not a match), probe to slot 3: "keyB" found! 1 extra probe.',
  },
  {
    activeLine: 3,
    openBuckets: [null, null, 'keyA', 'keyB', null, null, null, null],
    activeKey: 'keyB',
    hashIdx: 3,
    probeIdx: 3,
    state: { loadFactor: '2/8 = 0.25', avgProbes: '0.5', status: 'LINEAR PROBING SUCCESS 🎉' },
    desc: 'Line 3: Linear probing complete! 2 entries in 8 slots. Collision at slot 2 resolved by probing to slot 3. Average probes per lookup = 0.5. Important: keep load factor < 0.7 to avoid long probe chains (clustering). 🎉',
  },
];

const TWO_SUM_STEPS = [
  {
    activeLine: 1,
    numArray: [2, 7, 11, 15],
    target: 9,
    currIdx: null,
    mapState: {},
    state: { problem: 'Two Sum via Hash Map', array: '[2, 7, 11, 15]', target: 9, approach: 'One-pass complement lookup' },
    desc: 'Line 1: Problem Setup — Given array [2, 7, 11, 15] and target 9, find two indices whose values sum to 9. Strategy: For each number, compute its complement (target - num) and check if it exists in a hash map. One-pass O(N) solution.',
  },
  {
    activeLine: 1,
    numArray: [2, 7, 11, 15],
    target: 9,
    currIdx: 0,
    mapState: {},
    state: { num: 2, complement: '9 - 2 = 7', mapLookup: 'map.has(7) → FALSE', map: '{}' },
    desc: 'Line 1: Process nums[0] = 2. Compute complement = target - num = 9 - 2 = 7. Look up 7 in Hash Map: NOT FOUND (map is empty). The complement 7 hasn\'t been seen yet. We need to store 2 for future lookups.',
  },
  {
    activeLine: 2,
    numArray: [2, 7, 11, 15],
    target: 9,
    currIdx: 0,
    mapState: { 2: 0 },
    state: { action: 'Store map[2] = 0', mapSize: 1, map: '{2: 0}' },
    desc: 'Line 2: Store {2: 0} in Hash Map — key is the number value, value is its index. Now if any future number has complement 2, we can instantly find index 0. Map state: {2 → index 0}.',
  },
  {
    activeLine: 1,
    numArray: [2, 7, 11, 15],
    target: 9,
    currIdx: 1,
    mapState: { 2: 0 },
    state: { num: 7, complement: '9 - 7 = 2', mapLookup: 'map.has(2) → TRUE at index 0!', found: '🎯 MATCH!' },
    desc: 'Line 1: Process nums[1] = 7. Compute complement = 9 - 7 = 2. Look up 2 in Hash Map: FOUND at index 0! 🎯 We have a matching pair: nums[0]=2 and nums[1]=7 sum to 9. The hash map gave us O(1) lookup!',
  },
  {
    activeLine: 3,
    numArray: [2, 7, 11, 15],
    target: 9,
    currIdx: 1,
    mapState: { 2: 0 },
    state: { result: '[0, 1]', verification: 'nums[0] + nums[1] = 2 + 7 = 9 ✅' },
    desc: 'Line 3: Verify solution — nums[0]=2 + nums[1]=7 = 9 ✅. The pair is valid! Return indices [0, 1]. We found the answer in just 2 iterations (O(N) single pass).',
  },
  {
    activeLine: 3,
    numArray: [2, 7, 11, 15],
    target: 9,
    currIdx: 1,
    mapState: { 2: 0 },
    state: { solution: '[0, 1]', values: '2 + 7 = 9', complexity: 'O(N) time, O(N) space', status: 'TWO SUM COMPLETE 🎉' },
    desc: 'Line 3: Two Sum complete! Return [0, 1]. The hash map approach solves this in O(N) time with O(N) space, compared to the brute force O(N²). Each element is visited at most once. The complement lookup is O(1) average. 🎉',
  },
];

const GROUP_ANAGRAMS_STEPS = [
  {
    activeLine: 1,
    words: ['eat', 'tea', 'tan', 'ate'],
    currWord: null,
    sortedKey: null,
    anagramGroups: {},
    state: { problem: 'Group Anagrams', input: '["eat", "tea", "tan", "ate"]', approach: 'Sort each word → use as hash key' },
    desc: 'Line 1: Problem Setup — Group strings that are anagrams of each other. Strategy: Sort each word\'s characters to create a canonical key (e.g. "eat" → "aet"). Anagrams share the same sorted key. Use a hash map: key = sorted string, value = list of original words.',
  },
  {
    activeLine: 1,
    words: ['eat', 'tea', 'tan', 'ate'],
    currWord: 'eat',
    sortedKey: 'aet',
    anagramGroups: { aet: ['eat'] },
    state: { word: '"eat"', sorted: 'sort("eat") = "aet"', mapLookup: '"aet" NOT in map', action: 'Create new group' },
    desc: 'Line 1: Process word "eat" → sort characters → "aet". Check if key "aet" exists in map: NO. Create new group: map["aet"] = ["eat"]. This is the first word in its anagram group.',
  },
  {
    activeLine: 2,
    words: ['eat', 'tea', 'tan', 'ate'],
    currWord: 'tea',
    sortedKey: 'aet',
    anagramGroups: { aet: ['eat', 'tea'] },
    state: { word: '"tea"', sorted: 'sort("tea") = "aet"', mapLookup: '"aet" EXISTS! → append', group: '["eat", "tea"]' },
    desc: 'Line 2: Process word "tea" → sort → "aet". Key "aet" already exists in map! Append "tea" to existing group: map["aet"] = ["eat", "tea"]. Both "eat" and "tea" are anagrams (same letters rearranged).',
  },
  {
    activeLine: 1,
    words: ['eat', 'tea', 'tan', 'ate'],
    currWord: 'tan',
    sortedKey: 'ant',
    anagramGroups: { aet: ['eat', 'tea'], ant: ['tan'] },
    state: { word: '"tan"', sorted: 'sort("tan") = "ant"', mapLookup: '"ant" NOT in map', action: 'Create new group' },
    desc: 'Line 1: Process word "tan" → sort → "ant". Key "ant" not in map. Create new group: map["ant"] = ["tan"]. This is a different anagram family from "aet".',
  },
  {
    activeLine: 2,
    words: ['eat', 'tea', 'tan', 'ate'],
    currWord: 'ate',
    sortedKey: 'aet',
    anagramGroups: { aet: ['eat', 'tea', 'ate'], ant: ['tan'] },
    state: { word: '"ate"', sorted: 'sort("ate") = "aet"', mapLookup: '"aet" EXISTS!', group: '["eat", "tea", "ate"]' },
    desc: 'Line 2: Process word "ate" → sort → "aet". Key "aet" exists! Append: map["aet"] = ["eat", "tea", "ate"]. Three words share the same sorted key — they\'re all anagrams of each other.',
  },
  {
    activeLine: 2,
    words: ['eat', 'tea', 'tan', 'ate'],
    currWord: null,
    sortedKey: null,
    anagramGroups: { aet: ['eat', 'tea', 'ate'], ant: ['tan'] },
    state: { groups: 2, totalWords: 4, result: '[["eat","tea","ate"], ["tan"]]' },
    desc: 'Line 2: All words processed. Extract values from the hash map. Group 1 (key "aet"): ["eat", "tea", "ate"] — 3 anagrams. Group 2 (key "ant"): ["tan"] — 1 word. Total: 2 groups from 4 words.',
  },
  {
    activeLine: 2,
    words: ['eat', 'tea', 'tan', 'ate'],
    currWord: null,
    sortedKey: null,
    anagramGroups: { aet: ['eat', 'tea', 'ate'], ant: ['tan'] },
    state: { result: '[["eat", "tea", "ate"], ["tan"]]', complexity: 'O(N × K log K)', status: 'GROUP ANAGRAMS COMPLETE 🎉' },
    desc: 'Line 2: Group Anagrams complete! Result: [["eat", "tea", "ate"], ["tan"]]. Time: O(N × K log K) where N = number of words and K = max word length (sorting each word). Space: O(N × K) for storing all words in the map. 🎉',
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
