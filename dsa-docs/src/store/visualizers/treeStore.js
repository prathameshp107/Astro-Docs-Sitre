import { create } from 'zustand';

const INORDER_STEPS = [
  {
    activeLine: 1,
    activeNode: 4,
    visited: [],
    stack: ['inorder(4)'],
    state: { node: 4, action: 'check null', condition: '4 != null (TRUE ✅)' },
    desc: 'Line 1: Call inorder(4). Check condition: node (4) != null is TRUE.',
  },
  {
    activeLine: 2,
    activeNode: 2,
    visited: [],
    stack: ['inorder(4)', 'inorder(2)'],
    state: { node: 2, action: 'recurse left', stackDepth: 2 },
    desc: 'Line 2: Recurse left: call inorder(node.left) for node 2.',
  },
  {
    activeLine: 1,
    activeNode: 2,
    visited: [],
    stack: ['inorder(4)', 'inorder(2)'],
    state: { node: 2, condition: '2 != null (TRUE ✅)' },
    desc: 'Line 1: Inside inorder(2). Check condition: node (2) != null is TRUE.',
  },
  {
    activeLine: 2,
    activeNode: 1,
    visited: [],
    stack: ['inorder(4)', 'inorder(2)', 'inorder(1)'],
    state: { node: 1, action: 'recurse left', stackDepth: 3 },
    desc: 'Line 2: Recurse left: call inorder(node.left) for node 1.',
  },
  {
    activeLine: 1,
    activeNode: 1,
    visited: [],
    stack: ['inorder(4)', 'inorder(2)', 'inorder(1)'],
    state: { node: 1, condition: '1 != null (TRUE ✅)' },
    desc: 'Line 1: Inside inorder(1). Check condition: node (1) != null is TRUE.',
  },
  {
    activeLine: 3,
    activeNode: 1,
    visited: [1],
    stack: ['inorder(4)', 'inorder(2)', 'inorder(1)'],
    state: { node: 1, visitedVal: 1, visitedList: '[1]' },
    desc: 'Line 3: Visit node 1! Add 1 to visited sequence.',
  },
  {
    activeLine: 4,
    activeNode: 1,
    visited: [1],
    stack: ['inorder(4)', 'inorder(2)'],
    state: { node: 1, action: 'right is NULL, pop frame' },
    desc: 'Line 4: Recurse right of 1 (NULL). Pop stack frame inorder(1).',
  },
  {
    activeLine: 3,
    activeNode: 2,
    visited: [1, 2],
    stack: ['inorder(4)', 'inorder(2)'],
    state: { node: 2, visitedVal: 2, visitedList: '[1, 2]' },
    desc: 'Line 3: Return to node 2. Visit node 2! Add 2 to visited sequence.',
  },
  {
    activeLine: 4,
    activeNode: 3,
    visited: [1, 2],
    stack: ['inorder(4)', 'inorder(3)'],
    state: { node: 3, action: 'recurse right to 3' },
    desc: 'Line 4: Recurse right: call inorder(node.right) for node 3.',
  },
  {
    activeLine: 3,
    activeNode: 3,
    visited: [1, 2, 3],
    stack: ['inorder(4)', 'inorder(3)'],
    state: { node: 3, visitedVal: 3, visitedList: '[1, 2, 3]' },
    desc: 'Line 3: Visit node 3! Add 3 to visited sequence.',
  },
  {
    activeLine: 4,
    activeNode: 3,
    visited: [1, 2, 3],
    stack: ['inorder(4)'],
    state: { node: 3, action: 'pop frame inorder(3)' },
    desc: 'Line 4: Left subtree of 4 fully processed. Pop stack frame.',
  },
  {
    activeLine: 3,
    activeNode: 4,
    visited: [1, 2, 3, 4],
    stack: ['inorder(4)'],
    state: { node: 4, visitedVal: 4, visitedList: '[1, 2, 3, 4]' },
    desc: 'Line 3: Return to root node 4. Visit node 4! Add 4 to visited sequence.',
  },
  {
    activeLine: 4,
    activeNode: 6,
    visited: [1, 2, 3, 4],
    stack: ['inorder(6)'],
    state: { node: 6, action: 'recurse right to 6' },
    desc: 'Line 4: Recurse right: call inorder(node.right) for node 6.',
  },
  {
    activeLine: 2,
    activeNode: 5,
    visited: [1, 2, 3, 4],
    stack: ['inorder(6)', 'inorder(5)'],
    state: { node: 5, action: 'recurse left to 5' },
    desc: 'Line 2: Recurse left: call inorder(node.left) for node 5.',
  },
  {
    activeLine: 3,
    activeNode: 5,
    visited: [1, 2, 3, 4, 5],
    stack: ['inorder(6)', 'inorder(5)'],
    state: { node: 5, visitedVal: 5, visitedList: '[1, 2, 3, 4, 5]' },
    desc: 'Line 3: Visit node 5! Add 5 to visited sequence.',
  },
  {
    activeLine: 3,
    activeNode: 6,
    visited: [1, 2, 3, 4, 5, 6],
    stack: ['inorder(6)'],
    state: { node: 6, visitedVal: 6, visitedList: '[1, 2, 3, 4, 5, 6]' },
    desc: 'Line 3: Return to node 6. Visit node 6! Add 6 to visited sequence.',
  },
  {
    activeLine: 4,
    activeNode: 7,
    visited: [1, 2, 3, 4, 5, 6],
    stack: ['inorder(7)'],
    state: { node: 7, action: 'recurse right to 7' },
    desc: 'Line 4: Recurse right: call inorder(node.right) for node 7.',
  },
  {
    activeLine: 3,
    activeNode: 7,
    visited: [1, 2, 3, 4, 5, 6, 7],
    stack: [],
    state: { node: 7, visitedVal: 7, result: '[1, 2, 3, 4, 5, 6, 7]', status: 'COMPLETE 🎉' },
    desc: 'Line 3: Visit node 7! Inorder traversal complete: [1, 2, 3, 4, 5, 6, 7]! 🎉',
  },
];

const PREORDER_STEPS = [
  {
    activeLine: 1,
    activeNode: 4,
    visited: [],
    stack: ['preorder(4)'],
    state: { node: 4, action: 'check null', condition: '4 != null (TRUE ✅)' },
    desc: 'Line 1: Call preorder(4). Node 4 is not NULL.',
  },
  {
    activeLine: 2,
    activeNode: 4,
    visited: [4],
    stack: ['preorder(4)'],
    state: { node: 4, visitedVal: 4, visitedList: '[4]' },
    desc: 'Line 2: Visit root node 4 FIRST! Add 4 to visited list.',
  },
  {
    activeLine: 3,
    activeNode: 2,
    visited: [4],
    stack: ['preorder(4)', 'preorder(2)'],
    state: { node: 2, action: 'recurse left to 2' },
    desc: 'Line 3: Recurse left: call preorder(node.left) for node 2.',
  },
  {
    activeLine: 2,
    activeNode: 2,
    visited: [4, 2],
    stack: ['preorder(4)', 'preorder(2)'],
    state: { node: 2, visitedVal: 2, visitedList: '[4, 2]' },
    desc: 'Line 2: Visit node 2! Add 2 to visited list.',
  },
  {
    activeLine: 3,
    activeNode: 1,
    visited: [4, 2],
    stack: ['preorder(4)', 'preorder(2)', 'preorder(1)'],
    state: { node: 1, action: 'recurse left to 1' },
    desc: 'Line 3: Recurse left: call preorder(node.left) for node 1.',
  },
  {
    activeLine: 2,
    activeNode: 1,
    visited: [4, 2, 1],
    stack: ['preorder(4)', 'preorder(2)', 'preorder(1)'],
    state: { node: 1, visitedVal: 1, visitedList: '[4, 2, 1]' },
    desc: 'Line 2: Visit node 1! Add 1 to visited list.',
  },
  {
    activeLine: 4,
    activeNode: 3,
    visited: [4, 2, 1],
    stack: ['preorder(4)', 'preorder(3)'],
    state: { node: 3, action: 'recurse right to 3' },
    desc: 'Line 4: Recurse right: call preorder(node.right) for node 3.',
  },
  {
    activeLine: 2,
    activeNode: 3,
    visited: [4, 2, 1, 3],
    stack: ['preorder(4)', 'preorder(3)'],
    state: { node: 3, visitedVal: 3, visitedList: '[4, 2, 1, 3]' },
    desc: 'Line 2: Visit node 3! Add 3 to visited list.',
  },
  {
    activeLine: 4,
    activeNode: 6,
    visited: [4, 2, 1, 3],
    stack: ['preorder(6)'],
    state: { node: 6, action: 'recurse right to 6' },
    desc: 'Line 4: Recurse right: call preorder(node.right) for node 6.',
  },
  {
    activeLine: 2,
    activeNode: 6,
    visited: [4, 2, 1, 3, 6],
    stack: ['preorder(6)'],
    state: { node: 6, visitedVal: 6, visitedList: '[4, 2, 1, 3, 6]' },
    desc: 'Line 2: Visit node 6! Add 6 to visited list.',
  },
  {
    activeLine: 3,
    activeNode: 5,
    visited: [4, 2, 1, 3, 6],
    stack: ['preorder(6)', 'preorder(5)'],
    state: { node: 5, action: 'recurse left to 5' },
    desc: 'Line 3: Recurse left: call preorder(node.left) for node 5.',
  },
  {
    activeLine: 2,
    activeNode: 5,
    visited: [4, 2, 1, 3, 6, 5],
    stack: ['preorder(6)', 'preorder(5)'],
    state: { node: 5, visitedVal: 5, visitedList: '[4, 2, 1, 3, 6, 5]' },
    desc: 'Line 2: Visit node 5! Add 5 to visited list.',
  },
  {
    activeLine: 4,
    activeNode: 7,
    visited: [4, 2, 1, 3, 6, 5],
    stack: ['preorder(7)'],
    state: { node: 7, action: 'recurse right to 7' },
    desc: 'Line 4: Recurse right: call preorder(node.right) for node 7.',
  },
  {
    activeLine: 2,
    activeNode: 7,
    visited: [4, 2, 1, 3, 6, 5, 7],
    stack: [],
    state: { node: 7, visitedVal: 7, result: '[4, 2, 1, 3, 6, 5, 7]', status: 'COMPLETE 🎉' },
    desc: 'Line 2: Visit node 7! Preorder traversal complete: [4, 2, 1, 3, 6, 5, 7]! 🎉',
  },
];

const POSTORDER_STEPS = [
  {
    activeLine: 1,
    activeNode: 4,
    visited: [],
    stack: ['postorder(4)'],
    state: { node: 4, action: 'start at root (4)' },
    desc: 'Line 1: Call postorder(4).',
  },
  {
    activeLine: 2,
    activeNode: 2,
    visited: [],
    stack: ['postorder(4)', 'postorder(2)'],
    state: { node: 2, action: 'recurse left to 2' },
    desc: 'Line 2: Recurse left: call postorder(node.left) for node 2.',
  },
  {
    activeLine: 2,
    activeNode: 1,
    visited: [],
    stack: ['postorder(4)', 'postorder(2)', 'postorder(1)'],
    state: { node: 1, action: 'recurse left to 1' },
    desc: 'Line 2: Recurse left: call postorder(node.left) for node 1.',
  },
  {
    activeLine: 4,
    activeNode: 1,
    visited: [1],
    stack: ['postorder(4)', 'postorder(2)', 'postorder(1)'],
    state: { node: 1, visitedVal: 1, visitedList: '[1]' },
    desc: 'Line 4: Leaf node 1 reached! Visit node 1.',
  },
  {
    activeLine: 3,
    activeNode: 3,
    visited: [1],
    stack: ['postorder(4)', 'postorder(3)'],
    state: { node: 3, action: 'recurse right to 3' },
    desc: 'Line 3: Recurse right: call postorder(node.right) for node 3.',
  },
  {
    activeLine: 4,
    activeNode: 3,
    visited: [1, 3],
    stack: ['postorder(4)', 'postorder(3)'],
    state: { node: 3, visitedVal: 3, visitedList: '[1, 3]' },
    desc: 'Line 4: Leaf node 3 reached! Visit node 3.',
  },
  {
    activeLine: 4,
    activeNode: 2,
    visited: [1, 3, 2],
    stack: ['postorder(4)'],
    state: { node: 2, visitedVal: 2, visitedList: '[1, 3, 2]' },
    desc: 'Line 4: Both children of 2 processed. Visit parent node 2!',
  },
  {
    activeLine: 3,
    activeNode: 6,
    visited: [1, 3, 2],
    stack: ['postorder(6)'],
    state: { node: 6, action: 'recurse right to 6' },
    desc: 'Line 3: Recurse right: call postorder(node.right) for node 6.',
  },
  {
    activeLine: 2,
    activeNode: 5,
    visited: [1, 3, 2],
    stack: ['postorder(6)', 'postorder(5)'],
    state: { node: 5, action: 'recurse left to 5' },
    desc: 'Line 2: Recurse left: call postorder(node.left) for node 5.',
  },
  {
    activeLine: 4,
    activeNode: 5,
    visited: [1, 3, 2, 5],
    stack: ['postorder(6)'],
    state: { node: 5, visitedVal: 5, visitedList: '[1, 3, 2, 5]' },
    desc: 'Line 4: Leaf node 5 reached! Visit node 5.',
  },
  {
    activeLine: 3,
    activeNode: 7,
    visited: [1, 3, 2, 5],
    stack: ['postorder(6)', 'postorder(7)'],
    state: { node: 7, action: 'recurse right to 7' },
    desc: 'Line 3: Recurse right: call postorder(node.right) for node 7.',
  },
  {
    activeLine: 4,
    activeNode: 7,
    visited: [1, 3, 2, 5, 7],
    stack: ['postorder(6)'],
    state: { node: 7, visitedVal: 7, visitedList: '[1, 3, 2, 5, 7]' },
    desc: 'Line 4: Leaf node 7 reached! Visit node 7.',
  },
  {
    activeLine: 4,
    activeNode: 6,
    visited: [1, 3, 2, 5, 7, 6],
    stack: ['postorder(4)'],
    state: { node: 6, visitedVal: 6, visitedList: '[1, 3, 2, 5, 7, 6]' },
    desc: 'Line 4: Both children of 6 processed. Visit node 6!',
  },
  {
    activeLine: 4,
    activeNode: 4,
    visited: [1, 3, 2, 5, 7, 6, 4],
    stack: [],
    state: { node: 4, visitedVal: 4, result: '[1, 3, 2, 5, 7, 6, 4]', status: 'COMPLETE 🎉' },
    desc: 'Line 4: Visit root node 4 LAST! Postorder traversal complete: [1, 3, 2, 5, 7, 6, 4]! 🎉',
  },
];

const BST_SEARCH_STEPS = [
  {
    activeLine: 1,
    activeNode: 4,
    visited: [4],
    stack: ['search(4, 5)'],
    state: { target: 5, currNode: 4, 'node.val': 4 },
    desc: 'Line 1: Start BST search at root node 4 for target 5.',
  },
  {
    activeLine: 2,
    activeNode: 4,
    visited: [4],
    stack: ['search(4, 5)'],
    state: { target: 5, currNode: 4, condition: '5 < 4 (FALSE ❌)' },
    desc: 'Line 2: Check condition: target 5 < 4? FALSE.',
  },
  {
    activeLine: 3,
    activeNode: 6,
    visited: [4, 6],
    stack: ['search(6, 5)'],
    state: { target: 5, currNode: 6, action: 'search right subtree node 6' },
    desc: 'Line 3: Target 5 > 4 → Recurse right to node 6.',
  },
  {
    activeLine: 1,
    activeNode: 6,
    visited: [4, 6],
    stack: ['search(6, 5)'],
    state: { target: 5, currNode: 6, 'node.val': 6 },
    desc: 'Line 1: Inside search(6). Check if node == null or node.val == 5? FALSE.',
  },
  {
    activeLine: 2,
    activeNode: 6,
    visited: [4, 6],
    stack: ['search(6, 5)'],
    state: { target: 5, currNode: 6, condition: '5 < 6 (TRUE ✅)' },
    desc: 'Line 2: Check condition: target 5 < 6? TRUE ✅.',
  },
  {
    activeLine: 2,
    activeNode: 5,
    visited: [4, 6, 5],
    stack: ['search(5, 5)'],
    state: { target: 5, currNode: 5, action: 'search left subtree node 5' },
    desc: 'Line 2: Recurse left from 6 to node 5.',
  },
  {
    activeLine: 1,
    activeNode: 5,
    visited: [4, 6, 5],
    stack: [],
    state: { target: 5, currNode: 5, condition: '5 == 5 (TRUE ✅)', status: 'TARGET FOUND 🎉' },
    desc: 'Line 1: node.val == target (5 == 5). Target node 5 found in O(log n) time! 🎉',
  },
];

export const useTreeStore = create((set, get) => ({
  track: 'inorder',
  steps: INORDER_STEPS,
  currentStep: 0,
  isPlaying: false,
  speed: 1,
  practiceMode: false,
  userCode: `// Write your pseudocode or solution here\nfunction inorder(root) {\n  if (!root) return;\n  inorder(root.left);\n  console.log(root.val);\n  inorder(root.right);\n}`,

  setTrack: (track) => {
    if (track === 'inorder') {
      set({ track: 'inorder', steps: INORDER_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'preorder') {
      set({ track: 'preorder', steps: PREORDER_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'postorder') {
      set({ track: 'postorder', steps: POSTORDER_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'bst-search') {
      set({ track: 'bst-search', steps: BST_SEARCH_STEPS, currentStep: 0, isPlaying: false });
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
