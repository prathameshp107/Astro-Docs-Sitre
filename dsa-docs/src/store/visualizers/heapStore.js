import { create } from 'zustand';

const MIN_HEAP_INSERT_STEPS = [
  {
    activeLine: 1,
    currNode: 5,
    swapNodes: null,
    heapArray: [10, 25, 15, 40, 35, 5],
    state: { insertedVal: 5, targetIndex: 5, status: 'Insert at Bottom-Left' },
    desc: 'Line 1: Insert new element 5 at the end of the heap array (index 5). Element 5 is placed as the left child of node 15.',
  },
  {
    activeLine: 2,
    currNode: 5,
    swapNodes: null,
    heapArray: [10, 25, 15, 40, 35, 5],
    state: { currIndex: 5, parentIndex: 2, 'heap[5]': 5, 'heap[2]': 15 },
    desc: 'Line 2: Compute parent index: parent = ⌊(5-1)/2⌋ = 2. Compare child (5) with parent 15 at index 2.',
  },
  {
    activeLine: 3,
    currNode: 5,
    swapNodes: { parent: 2, child: 5 },
    heapArray: [10, 25, 15, 40, 35, 5],
    state: { 'heap[5] (5) < heap[2] (15)': 'TRUE ✅', action: 'Swap 5 ↔ 15' },
    desc: 'Line 3: Min-Heap property check: 5 < 15 is TRUE ✅. Swap element 5 with parent 15! Node 5 bubbles up to index 2.',
  },
  {
    activeLine: 4,
    currNode: 2,
    swapNodes: null,
    heapArray: [10, 25, 5, 40, 35, 15],
    state: { currIndex: 2, parentIndex: 0, 'heap[2]': 5, 'heap[0]': 10 },
    desc: 'Line 4: Update i = 2. Compute next parent index: parent = ⌊(2-1)/2⌋ = 0. Compare node 5 at index 2 with root element 10 at index 0.',
  },
  {
    activeLine: 2,
    currNode: 2,
    swapNodes: { parent: 0, child: 2 },
    heapArray: [10, 25, 5, 40, 35, 15],
    state: { 'heap[2] (5) < heap[0] (10)': 'TRUE ✅', action: 'Bubble Up to Root' },
    desc: 'Line 2: Min-Heap property check: child (5) < root parent (10) is TRUE ✅. Swap element 5 with root element 10!',
  },
  {
    activeLine: 3,
    currNode: 0,
    swapNodes: null,
    heapArray: [5, 25, 10, 40, 35, 15],
    state: { rootIndex: 0, rootVal: 5, previousRoot: 10 },
    desc: 'Line 3: Swap 5 and 10. Element 5 moves up to index 0 and becomes the new Root of the Min-Heap!',
  },
  {
    activeLine: 4,
    currNode: 0,
    swapNodes: null,
    heapArray: [5, 25, 10, 40, 35, 15],
    state: { i: 0, 'i > 0': 'FALSE ❌', status: 'MIN-HEAPIFY COMPLETE 🎉' },
    desc: 'Line 4: i = 0 reaches Root (i > 0 is FALSE). Insertion complete! Min-Heap invariant parent <= child satisfied across all nodes in O(log N) time! 🎉',
  },
];

const EXTRACT_MIN_STEPS = [
  {
    activeLine: 1,
    currNode: 0,
    swapNodes: null,
    heapArray: [5, 25, 10, 40, 35, 15],
    state: { rootVal: 5, minVal: 5, action: 'Save Min Value' },
    desc: 'Line 1: Save minimum element minVal = heap[0] = 5. This is the minimum value in the entire Min-Heap.',
  },
  {
    activeLine: 2,
    currNode: 5,
    swapNodes: { parent: 0, child: 5 },
    heapArray: [5, 25, 10, 40, 35, 15],
    state: { lastIndex: 5, lastVal: 15, action: 'Prepare Last Element' },
    desc: 'Line 2: Retrieve the last leaf element 15 at index 5 and shrink the heap array size from 6 to 5.',
  },
  {
    activeLine: 2,
    currNode: 0,
    swapNodes: null,
    heapArray: [15, 25, 10, 40, 35],
    state: { newRoot: 15, heapSize: 5, action: 'Root Replaced' },
    desc: 'Line 2: Overwrite root heap[0] with 15. The heap array is now [15, 25, 10, 40, 35], but 15 violates the Min-Heap property.',
  },
  {
    activeLine: 3,
    currNode: 0,
    swapNodes: null,
    heapArray: [15, 25, 10, 40, 35],
    state: { nodeVal: 15, leftChild: 25, rightChild: 10, leftIdx: 1, rightIdx: 2 },
    desc: 'Line 3: Heapify Down from root index 0: calculate left child = 2(0)+1 = 1 (val 25) and right child = 2(0)+2 = 2 (val 10).',
  },
  {
    activeLine: 3,
    currNode: 0,
    swapNodes: { parent: 0, child: 2 },
    heapArray: [15, 25, 10, 40, 35],
    state: { smallestChild: 10, smallestIdx: 2, '15 > 10': 'TRUE ✅' },
    desc: 'Line 3: Compare node 15 with children 25 and 10. The smallest child is 10 at index 2. Since 15 > 10, Min-Heap property is violated.',
  },
  {
    activeLine: 3,
    currNode: 2,
    swapNodes: null,
    heapArray: [10, 25, 15, 40, 35],
    state: { newRoot: 10, movedNode: 15, newIndex: 2 },
    desc: 'Line 3: Swap root 15 with smallest child 10. Node 10 becomes the new Root! Node 15 moves down to index 2.',
  },
  {
    activeLine: 4,
    currNode: 0,
    swapNodes: null,
    heapArray: [10, 25, 15, 40, 35],
    state: { returnedMin: 5, heapSize: 5, status: 'EXTRACT-MIN COMPLETE 🎉' },
    desc: 'Line 4: Node 15 has no children that violate Min-Heap (15 <= ∞). Return extracted minimum 5! Heapify Down complete in O(log N) time! 🎉',
  },
];

const MAX_HEAPIFY_STEPS = [
  {
    activeLine: 1,
    currNode: 0,
    swapNodes: null,
    heapArray: [4, 10, 3, 5, 1],
    state: { node: 0, nodeVal: 4, leftIdx: 1, leftVal: 10, rightIdx: 2, rightVal: 3 },
    desc: 'Line 1: Inspect root node index 0 (val 4). Calculate left child index 1 (val 10) and right child index 2 (val 3).',
  },
  {
    activeLine: 1,
    currNode: 0,
    swapNodes: { parent: 0, child: 1 },
    heapArray: [4, 10, 3, 5, 1],
    state: { largestIdx: 1, largestVal: 10, '10 > 4': 'TRUE ✅' },
    desc: 'Line 1: Evaluate argmax(4, 10, 3). The largest element is left child 10 at index 1. Since 10 > 4, Max-Heap property is violated.',
  },
  {
    activeLine: 3,
    currNode: 1,
    swapNodes: null,
    heapArray: [10, 4, 3, 5, 1],
    state: { newRoot: 10, movedNode: 4, newIndex: 1 },
    desc: 'Line 3: Swap root 4 with largest child 10. Node 10 becomes the new Root! Node 4 moves down to index 1.',
  },
  {
    activeLine: 4,
    currNode: 1,
    swapNodes: null,
    heapArray: [10, 4, 3, 5, 1],
    state: { node: 1, nodeVal: 4, leftIdx: 3, leftVal: 5, rightIdx: 4, rightVal: 1 },
    desc: 'Line 4: Recurse heapifyDown at index 1 (val 4). Calculate left child index 3 (val 5) and right child index 4 (val 1).',
  },
  {
    activeLine: 3,
    currNode: 3,
    swapNodes: { parent: 1, child: 3 },
    heapArray: [10, 4, 3, 5, 1],
    state: { largestIdx: 3, largestVal: 5, '5 > 4': 'TRUE ✅', action: 'Swap 4 ↔ 5' },
    desc: 'Line 3: Compare 4 with left child 5 and right child 1. Largest is 5 at index 3. Swap 4 and 5!',
  },
  {
    activeLine: 4,
    currNode: 3,
    swapNodes: null,
    heapArray: [10, 5, 3, 4, 1],
    state: { heapArray: '[10, 5, 3, 4, 1]', status: 'MAX-HEAPIFY COMPLETE 🎉' },
    desc: 'Line 4: Node 4 is now a leaf node at index 3. Max-Heap property parent >= child is satisfied across all nodes in O(log N) time! 🎉',
  },
];

const HEAP_SORT_STEPS = [
  {
    activeLine: 1,
    currNode: 0,
    swapNodes: null,
    heapArray: [10, 5, 3, 4, 1],
    state: { step: 'Build Max-Heap', rootMax: 10, heap: '[10, 5, 3, 4, 1]' },
    desc: 'Line 1: Build Max-Heap in O(N) time. The largest element 10 is placed at root index 0: [10, 5, 3, 4, 1].',
  },
  {
    activeLine: 3,
    currNode: 0,
    swapNodes: { parent: 0, child: 4 },
    heapArray: [10, 5, 3, 4, 1],
    state: { extractMax: 10, targetPos: 4, lastVal: 1 },
    desc: 'Line 3: Swap root max element 10 with last element 1 at index 4. Element 10 is now locked in its final sorted position at the end of the array.',
  },
  {
    activeLine: 4,
    currNode: 0,
    swapNodes: { parent: 0, child: 1 },
    heapArray: [1, 5, 3, 4, 10],
    state: { heapSize: 4, rootVal: 1, maxChild: 5, action: 'Swap 1 ↔ 5' },
    desc: 'Line 4: Shrink heap size to 4. Heapify Down from root (1): compare 1 with children 5 and 3. Swap 1 with 5.',
  },
  {
    activeLine: 3,
    currNode: 0,
    swapNodes: { parent: 0, child: 3 },
    heapArray: [5, 4, 3, 1, 10],
    state: { extractMax: 5, targetPos: 3, lastVal: 1 },
    desc: 'Line 3: Root 5 is the maximum of the remaining 4 elements. Swap 5 with element 1 at index 3. Element 5 is locked into position 3.',
  },
  {
    activeLine: 4,
    currNode: 0,
    swapNodes: { parent: 0, child: 1 },
    heapArray: [1, 4, 3, 5, 10],
    state: { heapSize: 3, rootVal: 1, maxChild: 4, action: 'Swap 1 ↔ 4' },
    desc: 'Line 4: Shrink heap size to 3. Heapify Down from root (1): swap 1 with 4. Node 4 bubbles up to root.',
  },
  {
    activeLine: 4,
    currNode: 0,
    swapNodes: null,
    heapArray: [1, 3, 4, 5, 10],
    state: { sortedArray: '[1, 3, 4, 5, 10]', status: 'HEAP SORT COMPLETE 🎉' },
    desc: 'Line 4: Repeat extract max and heapify for all remaining elements. Array is completely sorted in-place in O(N log N) time! 🎉',
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
