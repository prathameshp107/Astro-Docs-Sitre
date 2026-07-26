import { create } from 'zustand';

const MIN_HEAP_INSERT_STEPS = [
  {
    activeLine: 1,
    currNode: 5,
    swapNodes: null,
    heapArray: [10, 25, 15, 40, 35, 5],
    state: { insertedVal: 5, targetIndex: 5, parentIndex: 2, 'heap[parent]': 15 },
    desc: 'Line 1: Insert new element 5 at the end of the heap array (index 5).',
  },
  {
    activeLine: 2,
    currNode: 5,
    swapNodes: { parent: 2, child: 5 },
    heapArray: [10, 25, 15, 40, 35, 5],
    state: { 'heap[5] (5) < heap[2] (15)': 'TRUE ✅', action: 'Heapify Up Swap 5 ↔ 15' },
    desc: 'Line 2: Check Min-Heap property: child (5) < parent (15)? TRUE ✅ → Swap 5 and 15!',
  },
  {
    activeLine: 3,
    currNode: 2,
    swapNodes: null,
    heapArray: [10, 25, 5, 40, 35, 15],
    state: { currIndex: 2, parentIndex: 0, 'heap[0]': 10 },
    desc: 'Line 3: Move node 5 up to index 2. Compare with parent at index 0 (10).',
  },
  {
    activeLine: 2,
    currNode: 2,
    swapNodes: { parent: 0, child: 2 },
    heapArray: [10, 25, 5, 40, 35, 15],
    state: { 'heap[2] (5) < heap[0] (10)': 'TRUE ✅', action: 'Heapify Up Swap 5 ↔ 10' },
    desc: 'Line 2: Check Min-Heap property: child (5) < parent (10)? TRUE ✅ → Swap 5 and 10!',
  },
  {
    activeLine: 4,
    currNode: 0,
    swapNodes: null,
    heapArray: [5, 25, 10, 40, 35, 15],
    state: { rootIndex: 0, rootVal: 5, status: 'MIN-HEAPIFY COMPLETE 🎉' },
    desc: 'Line 4: Node 5 bubbled up to Root (index 0). Min-Heap property restored! 🎉',
  },
];

const EXTRACT_MIN_STEPS = [
  {
    activeLine: 1,
    currNode: 0,
    swapNodes: null,
    heapArray: [5, 25, 10, 40, 35, 15],
    state: { rootVal: 5, 'minVal': 5 },
    desc: 'Line 1: Extract minimum value = heap[0] (5).',
  },
  {
    activeLine: 2,
    currNode: 0,
    swapNodes: { parent: 0, child: 5 },
    heapArray: [15, 25, 10, 40, 35],
    state: { action: 'Replace root with last element (15)', size: 5 },
    desc: 'Line 2: Replace root with last element (15) and shrink heap size to 5.',
  },
  {
    activeLine: 3,
    currNode: 0,
    swapNodes: { parent: 0, child: 2 },
    heapArray: [15, 25, 10, 40, 35],
    state: { leftChild: 25, rightChild: 10, smallest: 2 },
    desc: 'Line 3: Heapify Down: compare root 15 with children 25 and 10. Smallest child is 10 (index 2).',
  },
  {
    activeLine: 4,
    currNode: 2,
    swapNodes: null,
    heapArray: [10, 25, 15, 40, 35],
    state: { rootVal: 10, extractedMin: 5, status: 'EXTRACT-MIN COMPLETE 🎉' },
    desc: 'Line 4: Swap 15 with 10. Min-Heap property satisfied! Extracted value = 5. 🎉',
  },
];

const MAX_HEAPIFY_STEPS = [
  {
    activeLine: 1,
    currNode: 0,
    swapNodes: null,
    heapArray: [4, 10, 3, 5, 1],
    state: { rootVal: 4, leftChild: 10, rightChild: 3 },
    desc: 'Line 1: Inspect root node 4. Left child = 10, Right child = 3.',
  },
  {
    activeLine: 2,
    currNode: 0,
    swapNodes: { parent: 0, child: 1 },
    heapArray: [4, 10, 3, 5, 1],
    state: { largest: 1, 'heap[1] (10) > heap[0] (4)': 'TRUE ✅' },
    desc: 'Line 2: Largest among root and children is left child 10. Swap 4 and 10.',
  },
  {
    activeLine: 3,
    currNode: 1,
    swapNodes: null,
    heapArray: [10, 4, 3, 5, 1],
    state: { currIndex: 1, leftChild: 5, rightChild: 1 },
    desc: 'Line 3: Heapify Down at index 1: node 4. Left child = 5, Right child = 1.',
  },
  {
    activeLine: 4,
    currNode: 1,
    swapNodes: { parent: 1, child: 3 },
    heapArray: [10, 5, 3, 4, 1],
    state: { maxHeap: '[10, 5, 3, 4, 1]', status: 'MAX-HEAPIFY COMPLETE 🎉' },
    desc: 'Line 4: Swap 4 and 5. Max-Heap property satisfied across all nodes! 🎉',
  },
];

const HEAP_SORT_STEPS = [
  {
    activeLine: 1,
    currNode: 0,
    swapNodes: null,
    heapArray: [10, 5, 3, 4, 1],
    state: { step: 'Build Max-Heap', heap: '[10, 5, 3, 4, 1]' },
    desc: 'Line 1: Initial Max-Heap constructed: root is maximum element (10).',
  },
  {
    activeLine: 2,
    currNode: 0,
    swapNodes: { parent: 0, child: 4 },
    heapArray: [1, 5, 3, 4, 10],
    state: { action: 'Swap root 10 to end index 4', sortedSuffix: '[10]' },
    desc: 'Line 2: Swap max element 10 with last element 1. Place 10 in sorted position.',
  },
  {
    activeLine: 3,
    currNode: 0,
    swapNodes: { parent: 0, child: 1 },
    heapArray: [5, 4, 3, 1, 10],
    state: { action: 'Heapify sub-tree (size 4)', newMax: 5 },
    desc: 'Line 3: Heapify Down remaining size 4: node 5 bubbles up to root.',
  },
  {
    activeLine: 4,
    currNode: 0,
    swapNodes: null,
    heapArray: [1, 3, 4, 5, 10],
    state: { sortedArray: '[1, 3, 4, 5, 10]', status: 'HEAP SORT COMPLETE 🎉' },
    desc: 'Line 4: Repeatedly extract max and heapify. Array fully sorted in O(n log n) time! 🎉',
  },
];

export const useHeapStore = create((set, get) => ({
  track: 'min-heap-insert',
  steps: MIN_HEAP_INSERT_STEPS,
  currentStep: 0,
  isPlaying: false,
  speed: 1,
  practiceMode: false,
  userCode: `// Write your pseudocode or solution here\nfunction heapifyUp(heap, i) {\n  let parent = Math.floor((i - 1) / 2);\n  while (i > 0 && heap[i] < heap[parent]) {\n    [heap[i], heap[parent]] = [heap[parent], heap[i]];\n    i = parent;\n    parent = Math.floor((i - 1) / 2);\n  }\n}`,

  setTrack: (track) => {
    if (track === 'min-heap-insert') {
      set({ track: 'min-heap-insert', steps: MIN_HEAP_INSERT_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'min-heap-extract') {
      set({ track: 'min-heap-extract', steps: EXTRACT_MIN_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'max-heapify') {
      set({ track: 'max-heapify', steps: MAX_HEAPIFY_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'heap-sort') {
      set({ track: 'heap-sort', steps: HEAP_SORT_STEPS, currentStep: 0, isPlaying: false });
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
