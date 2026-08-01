export const heapLogic = {
  'heap': {
    title: 'Binary Heap & Priority Queue Operations',
    input: 'Min-Heap = [5, 10, 15, 20, 25], Insert 3',
    goal: 'Demonstrate binary heap parent-child relationships and Heapify Up / Heapify Down mechanics.',
    terms: {
      'Min-Heap Property': 'parent.val <= child.val for all nodes.',
      'Parent Index Formula': 'parent = floor((i - 1) / 2)',
      'Left Child Formula': 'left = 2 * i + 1',
      'Right Child Formula': 'right = 2 * i + 2'
    },
    array: [5, 10, 15, 20, 25],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Insert 3 at End of Heap (Index 5)',
        left: 0, right: 5,
        leftLabel: 'root 5', rightLabel: 'inserted 3',
        array: [5, 10, 15, 20, 25, 3],
        computation: 'heap[5] = 3, parent = floor((5-1)/2) = 2 (val 15)',
        comparison: '3 < 15 (VIOLATION ❌)',
        action: 'Insert at Leaf',
        desc: 'Insert element 3 at the end of the array (index 5). Compare with parent at index 2 (val 15).'
      },
      {
        stepNum: 2,
        title: 'Step 2: Heapify Up — Swap 3 and 15',
        left: 2, right: 5,
        leftLabel: 'parent 15', rightLabel: 'child 3',
        array: [5, 10, 3, 20, 25, 15],
        computation: 'Swap heap[5] and heap[2]',
        comparison: '3 < 15 (SWAPPED ✅)',
        action: 'Bubble Up Step 1',
        desc: 'Since 3 < 15, swap 3 and 15. Element 3 moves to index 2. Parent at index 0 is val 5.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Heapify Up — Swap 3 and Root (5)',
        left: 0, right: 2,
        leftLabel: 'root 5', rightLabel: 'child 3',
        array: [3, 10, 5, 20, 25, 15],
        computation: 'Swap heap[2] and heap[0]',
        comparison: '3 < 5 (SWAPPED ✅)',
        action: 'Bubble Up to Root',
        desc: 'Compare 3 with parent root 5. Since 3 < 5, swap 3 and 5. Element 3 becomes new Root!'
      },
      {
        stepNum: 4,
        title: 'Step 4: Min-Heap Property Restored 🎉',
        left: 0, right: 5,
        leftLabel: 'root 3', rightLabel: 'end',
        array: [3, 10, 5, 20, 25, 15],
        computation: 'Heap = [3, 10, 5, 20, 25, 15]',
        comparison: 'MIN-HEAP RESTORED IN O(log N) 🎉',
        action: 'Complete Heapify',
        isMatch: true,
        desc: 'Element 3 bubbled up to root. Min-Heap property restored in O(log N) logarithmic steps! 🎉'
      }
    ]
  },

  'min-heap': {
    title: 'Min-Heap Insertion & Heapify Up O(log N)',
    input: 'Min-Heap = [10, 25, 15, 40, 35], Insert 5',
    goal: 'Insert element at array end and bubble up until parent <= child.',
    terms: {
      'parent': 'floor((i - 1) / 2)',
      'heapifyUp': 'Swap child with parent while child.val < parent.val'
    },
    array: [10, 25, 15, 40, 35, 5],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Insert 5 at Index 5',
        left: 0, right: 5,
        leftLabel: 'root 10', rightLabel: 'new val 5',
        array: [10, 25, 15, 40, 35, 5],
        computation: 'heap[5] = 5, parent[2] = 15',
        comparison: '5 < 15 (SWAP NEEDED)',
        action: 'Insert at Array End',
        desc: 'Insert 5 at index 5. Compare with parent at index 2 (15).'
      },
      {
        stepNum: 2,
        title: 'Step 2: Heapify Up Step 1 — Swap 5 ↔ 15',
        left: 2, right: 5,
        leftLabel: 'index 2', rightLabel: 'index 5',
        array: [10, 25, 5, 40, 35, 15],
        computation: 'Swap 5 and 15',
        comparison: '5 < 15 (SWAPPED ✅)',
        action: 'Swap 5 ↔ 15',
        desc: 'Swap 5 and 15. Element 5 moves up to index 2. Parent at index 0 is 10.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Heapify Up Step 2 — Swap 5 ↔ 10 (Root)',
        left: 0, right: 2,
        leftLabel: 'root 10', rightLabel: 'child 5',
        array: [5, 25, 10, 40, 35, 15],
        computation: 'Swap 5 and 10',
        comparison: '5 < 10 (SWAPPED ✅)',
        action: 'Swap 5 ↔ 10',
        desc: 'Swap 5 and 10. Element 5 becomes the new minimum root of the heap.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Min-Heap Insertion Complete 🎉',
        left: 0, right: 5,
        leftLabel: 'new root 5', rightLabel: 'end',
        array: [5, 25, 10, 40, 35, 15],
        computation: 'Heap = [5, 25, 10, 40, 35, 15]',
        comparison: 'O(log N) LOGARITHMIC TIME 🎉',
        action: 'Return Min-Heap',
        isMatch: true,
        desc: 'Min-Heap insertion and bubble up complete in O(log N) time! 🎉'
      }
    ]
  },

  'max-heap': {
    title: 'Max-Heap Extraction & Heapify Down O(log N)',
    input: 'Max-Heap = [50, 30, 40, 10, 20], Extract Max',
    goal: 'Remove root (50), replace with last element (20), and bubble down to restore Max-Heap property.',
    terms: {
      'Max-Heap Property': 'parent.val >= child.val for all nodes.',
      'heapifyDown': 'Swap parent with largest child while parent.val < child.val'
    },
    array: [50, 30, 40, 10, 20],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Extract Max (50) & Replace Root with Last Element (20)',
        left: 0, right: 4,
        leftLabel: 'extracted 50', rightLabel: 'last val 20',
        array: [20, 30, 40, 10],
        computation: 'maxVal = 50, root = 20',
        comparison: '50 Extracted',
        action: 'Replace Root',
        desc: 'Extract root element 50. Move last element 20 to root (index 0).'
      },
      {
        stepNum: 2,
        title: 'Step 2: Heapify Down — Compare Root (20) with Children (30, 40)',
        left: 0, right: 2,
        leftLabel: 'root 20', rightLabel: 'max child 40',
        array: [20, 30, 40, 10],
        computation: 'Max Child = 40 (index 2). 20 < 40 (SWAP NEEDED)',
        comparison: '20 < 40 (VIOLATION ❌)',
        action: 'Swap 20 ↔ 40',
        desc: 'Compare root 20 with largest child 40. Swap 20 and 40.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Max-Heap Property Restored ➔ Heap = [40, 30, 20, 10] 🎉',
        left: 0, right: 3,
        leftLabel: 'root 40', rightLabel: 'leaf 10',
        array: [40, 30, 20, 10],
        computation: 'Heap = [40, 30, 20, 10]',
        comparison: 'MAX-HEAP RESTORED 🎉',
        action: 'Return Max-Heap',
        isMatch: true,
        desc: 'Max element 50 extracted. Max-Heap property restored in O(log N) steps! 🎉'
      }
    ]
  },

  'heap-sort': {
    title: 'Heap Sort Algorithm O(N log N)',
    input: 'Unsorted Array = [4, 10, 3, 5, 1]',
    goal: 'Build Max-Heap, repeatedly extract maximum to array end, and shrink heap size.',
    terms: {
      'In-Place Sorting': 'Uses O(1) auxiliary space by swapping max to end of array.',
      'Time Complexity': 'O(N log N) in best, average, and worst cases.'
    },
    array: [1, 3, 4, 5, 10],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Build Max-Heap from Array ➔ [10, 5, 3, 4, 1]',
        left: 0, right: 4,
        leftLabel: 'max 10', rightLabel: 'leaf 1',
        array: [10, 5, 3, 4, 1],
        computation: 'heapifyAll() in O(N) time',
        comparison: 'Max-Heap Built',
        action: 'Build Heap',
        desc: 'Transform unsorted array into a valid Max-Heap: [10, 5, 3, 4, 1].'
      },
      {
        stepNum: 2,
        title: 'Step 2: Swap Max (10) with Last Element (1) & Heapify Down',
        left: 0, right: 4,
        leftLabel: 'heap end', rightLabel: 'sorted 10',
        array: [5, 4, 3, 1, 10],
        computation: 'Swap heap[0] (10) ↔ heap[4] (1). Shrink heap size to 4.',
        comparison: '10 Sorted at End ✅',
        action: 'Extract Max 10',
        desc: 'Swap max element 10 to index 4. Heapify down remaining 4 elements to [5, 4, 3, 1].'
      },
      {
        stepNum: 3,
        title: 'Step 3: Repeat Extract Max for Remaining Elements',
        left: 0, right: 3,
        leftLabel: 'heap end', rightLabel: 'sorted 5',
        array: [4, 1, 3, 5, 10],
        computation: 'Swap 5 to index 3. Heapify down 4.',
        comparison: '5 Sorted at Index 3 ✅',
        action: 'Extract Max 5',
        desc: 'Swap max element 5 to index 3. Heapify down remaining elements.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Heap Sort Complete ➔ Sorted Array = [1, 3, 4, 5, 10] 🎉',
        left: 0, right: 4,
        leftLabel: 'start', rightLabel: 'end',
        array: [1, 3, 4, 5, 10],
        computation: 'Array = [1, 3, 4, 5, 10]',
        comparison: 'SORTED IN O(N log N) TIME 🎉',
        action: 'Return Sorted Array',
        isMatch: true,
        desc: 'Array fully sorted in-place using Heap Sort in O(N log N) time! 🎉'
      }
    ]
  }
};
