import { create } from 'zustand';

const SINGLY_TRAVERSAL_STEPS = [
  {
    activeLine: 1,
    curr: 0,
    nodes: [10, 20, 30, 40],
    state: { curr: 0, 'curr.val': 10, head: 0 },
    desc: 'Line 1: Initialize curr = head (node at index 0, val = 10).',
  },
  {
    activeLine: 2,
    curr: 0,
    nodes: [10, 20, 30, 40],
    state: { curr: 0, 'curr != null': '10 != null (TRUE ✅)' },
    desc: 'Line 2: Check while loop: curr (node 10) != null is TRUE. Enter loop.',
  },
  {
    activeLine: 3,
    curr: 0,
    nodes: [10, 20, 30, 40],
    state: { curr: 0, visitedVal: 10, visitedList: '[10]' },
    desc: 'Line 3: Process current node value = 10.',
  },
  {
    activeLine: 4,
    curr: 1,
    nodes: [10, 20, 30, 40],
    state: { curr: 1, 'curr.val': 20, 'curr.next': 'node 20' },
    desc: 'Line 4: Advance curr = curr.next to index 1 (node 20).',
  },
  {
    activeLine: 2,
    curr: 1,
    nodes: [10, 20, 30, 40],
    state: { curr: 1, 'curr != null': '20 != null (TRUE ✅)' },
    desc: 'Line 2: Check while loop: curr (node 20) != null is TRUE. Loop continues.',
  },
  {
    activeLine: 3,
    curr: 1,
    nodes: [10, 20, 30, 40],
    state: { curr: 1, visitedVal: 20, visitedList: '[10, 20]' },
    desc: 'Line 3: Process current node value = 20.',
  },
  {
    activeLine: 4,
    curr: 2,
    nodes: [10, 20, 30, 40],
    state: { curr: 2, 'curr.val': 30, 'curr.next': 'node 30' },
    desc: 'Line 4: Advance curr = curr.next to index 2 (node 30).',
  },
  {
    activeLine: 2,
    curr: 2,
    nodes: [10, 20, 30, 40],
    state: { curr: 2, 'curr != null': '30 != null (TRUE ✅)' },
    desc: 'Line 2: Check while loop: curr (node 30) != null is TRUE.',
  },
  {
    activeLine: 3,
    curr: 2,
    nodes: [10, 20, 30, 40],
    state: { curr: 2, visitedVal: 30, visitedList: '[10, 20, 30]' },
    desc: 'Line 3: Process current node value = 30.',
  },
  {
    activeLine: 4,
    curr: 3,
    nodes: [10, 20, 30, 40],
    state: { curr: 3, 'curr.val': 40, 'curr.next': 'node 40' },
    desc: 'Line 4: Advance curr = curr.next to index 3 (node 40).',
  },
  {
    activeLine: 2,
    curr: 3,
    nodes: [10, 20, 30, 40],
    state: { curr: 3, 'curr != null': '40 != null (TRUE ✅)' },
    desc: 'Line 2: Check while loop: curr (node 40) != null is TRUE.',
  },
  {
    activeLine: 3,
    curr: 3,
    nodes: [10, 20, 30, 40],
    state: { curr: 3, visitedVal: 40, visitedList: '[10, 20, 30, 40]' },
    desc: 'Line 3: Process current node value = 40.',
  },
  {
    activeLine: 4,
    curr: null,
    nodes: [10, 20, 30, 40],
    state: { curr: 'NULL', status: 'TRAVERSAL COMPLETE 🎉' },
    desc: 'Line 4: Advance curr = curr.next (NULL). Traversal complete! 🎉',
  },
];

const INSERT_HEAD_STEPS = [
  {
    activeLine: 1,
    head: 0,
    newNode: 5,
    nodes: [10, 20, 30],
    state: { newNodeVal: 5, headVal: 10 },
    desc: 'Line 1: Create newNode with val = 5.',
  },
  {
    activeLine: 2,
    head: 0,
    newNode: 5,
    nodes: [5, 10, 20, 30],
    state: { 'newNode.next': 'head (10)', link: '5 → 10' },
    desc: 'Line 2: Point newNode.next to current head node (10).',
  },
  {
    activeLine: 3,
    head: 0,
    newNode: null,
    nodes: [5, 10, 20, 30],
    state: { newHead: 5, result: '5 → 10 → 20 → 30 → NULL', status: 'INSERTED ✅' },
    desc: 'Line 3: Update head = newNode (5). Node 5 is now the new head of list! 🎉',
  },
];

const DELETE_NODE_STEPS = [
  {
    activeLine: 1,
    curr: 0,
    prev: null,
    nodes: [10, 20, 30, 40],
    state: { curr: 0, 'curr.val': 10, prev: 'NULL', target: 20 },
    desc: 'Line 1: Initialize curr = head (node 10) and prev = NULL. Target to delete = 20.',
  },
  {
    activeLine: 2,
    curr: 0,
    prev: null,
    nodes: [10, 20, 30, 40],
    state: { 'curr.val == target': '10 == 20 (FALSE ❌)' },
    desc: 'Line 2: Check condition: curr.val (10) == target (20)? FALSE. Advance pointers.',
  },
  {
    activeLine: 2,
    curr: 1,
    prev: 0,
    nodes: [10, 20, 30, 40],
    state: { prev: 0, 'prev.val': 10, curr: 1, 'curr.val': 20 },
    desc: 'Line 2: Advance prev = node(10) and curr = node(20).',
  },
  {
    activeLine: 2,
    curr: 1,
    prev: 0,
    nodes: [10, 20, 30, 40],
    state: { 'curr.val == target': '20 == 20 (TRUE ✅)' },
    desc: 'Line 2: Match found! Target node curr = 20 reached.',
  },
  {
    activeLine: 3,
    curr: 1,
    prev: 0,
    nodes: [10, 30, 40],
    state: { 'prev.next': 'curr.next (30)', unlinked: 'node 20', status: 'DELETED ✅' },
    desc: 'Line 3: Set prev.next = curr.next (bypass node 20). Node 20 deleted! 🎉',
  },
];

const REVERSE_LIST_STEPS = [
  {
    activeLine: 1,
    prev: null,
    curr: 0,
    next: null,
    nodes: [10, 20, 30, 40],
    state: { prev: 'NULL', curr: 0, 'curr.val': 10 },
    desc: 'Line 1: Initialize prev = NULL and curr = head (node 10).',
  },
  {
    activeLine: 2,
    prev: null,
    curr: 0,
    next: null,
    nodes: [10, 20, 30, 40],
    state: { curr: 0, 'curr != null': '10 != null (TRUE ✅)' },
    desc: 'Line 2: Check while loop: curr (node 10) != null is TRUE. Enter loop.',
  },
  {
    activeLine: 3,
    prev: null,
    curr: 0,
    next: 1,
    nodes: [10, 20, 30, 40],
    state: { next: 1, 'next.val': 20 },
    desc: 'Line 3: Save next = curr.next (node 20).',
  },
  {
    activeLine: 4,
    prev: null,
    curr: 0,
    next: 1,
    nodes: [10, 20, 30, 40],
    state: { 'curr.next': 'prev (NULL)', action: 'Point node 10 → NULL' },
    desc: 'Line 4: Reverse link! Set curr.next = prev (node 10 now points to NULL).',
  },
  {
    activeLine: 5,
    prev: 0,
    curr: 0,
    next: 1,
    nodes: [10, 20, 30, 40],
    state: { prev: 0, 'prev.val': 10 },
    desc: 'Line 5: Advance prev = curr (node 10).',
  },
  {
    activeLine: 6,
    prev: 0,
    curr: 1,
    next: 1,
    nodes: [10, 20, 30, 40],
    state: { curr: 1, 'curr.val': 20 },
    desc: 'Line 6: Advance curr = next (node 20).',
  },
  {
    activeLine: 2,
    prev: 0,
    curr: 1,
    next: 1,
    nodes: [10, 20, 30, 40],
    state: { curr: 1, 'curr != null': '20 != null (TRUE ✅)' },
    desc: 'Line 2: Check while loop: curr (node 20) != null is TRUE. Loop continues.',
  },
  {
    activeLine: 3,
    prev: 0,
    curr: 1,
    next: 2,
    nodes: [10, 20, 30, 40],
    state: { next: 2, 'next.val': 30 },
    desc: 'Line 3: Save next = curr.next (node 30).',
  },
  {
    activeLine: 4,
    prev: 0,
    curr: 1,
    next: 2,
    nodes: [10, 20, 30, 40],
    state: { 'curr.next': 'prev (10)', action: 'Point node 20 → 10' },
    desc: 'Line 4: Reverse link! Set curr.next = prev (node 20 now points to 10).',
  },
  {
    activeLine: 5,
    prev: 1,
    curr: 1,
    next: 2,
    nodes: [10, 20, 30, 40],
    state: { prev: 1, 'prev.val': 20 },
    desc: 'Line 5: Advance prev = curr (node 20).',
  },
  {
    activeLine: 6,
    prev: 1,
    curr: 2,
    next: 2,
    nodes: [10, 20, 30, 40],
    state: { curr: 2, 'curr.val': 30 },
    desc: 'Line 6: Advance curr = next (node 30).',
  },
  {
    activeLine: 2,
    prev: 1,
    curr: 2,
    next: 2,
    nodes: [10, 20, 30, 40],
    state: { curr: 2, 'curr != null': '30 != null (TRUE ✅)' },
    desc: 'Line 2: Check while loop: curr (node 30) != null is TRUE.',
  },
  {
    activeLine: 3,
    prev: 1,
    curr: 2,
    next: 3,
    nodes: [10, 20, 30, 40],
    state: { next: 3, 'next.val': 40 },
    desc: 'Line 3: Save next = curr.next (node 40).',
  },
  {
    activeLine: 4,
    prev: 1,
    curr: 2,
    next: 3,
    nodes: [10, 20, 30, 40],
    state: { 'curr.next': 'prev (20)', action: 'Point node 30 → 20' },
    desc: 'Line 4: Reverse link! Set curr.next = prev (node 30 now points to 20).',
  },
  {
    activeLine: 5,
    prev: 2,
    curr: 2,
    next: 3,
    nodes: [10, 20, 30, 40],
    state: { prev: 2, 'prev.val': 30 },
    desc: 'Line 5: Advance prev = curr (node 30).',
  },
  {
    activeLine: 6,
    prev: 2,
    curr: 3,
    next: 3,
    nodes: [10, 20, 30, 40],
    state: { curr: 3, 'curr.val': 40 },
    desc: 'Line 6: Advance curr = next (node 40).',
  },
  {
    activeLine: 2,
    prev: 2,
    curr: 3,
    next: 3,
    nodes: [10, 20, 30, 40],
    state: { curr: 3, 'curr != null': '40 != null (TRUE ✅)' },
    desc: 'Line 2: Check while loop: curr (node 40) != null is TRUE.',
  },
  {
    activeLine: 3,
    prev: 2,
    curr: 3,
    next: null,
    nodes: [10, 20, 30, 40],
    state: { next: 'NULL' },
    desc: 'Line 3: Save next = curr.next (NULL).',
  },
  {
    activeLine: 4,
    prev: 2,
    curr: 3,
    next: null,
    nodes: [10, 20, 30, 40],
    state: { 'curr.next': 'prev (30)', action: 'Point node 40 → 30' },
    desc: 'Line 4: Reverse link! Set curr.next = prev (node 40 now points to 30).',
  },
  {
    activeLine: 5,
    prev: 3,
    curr: 3,
    next: null,
    nodes: [10, 20, 30, 40],
    state: { prev: 3, 'prev.val': 40 },
    desc: 'Line 5: Advance prev = curr (node 40).',
  },
  {
    activeLine: 6,
    prev: 3,
    curr: null,
    next: null,
    nodes: [10, 20, 30, 40],
    state: { curr: 'NULL' },
    desc: 'Line 6: Advance curr = next (NULL).',
  },
  {
    activeLine: 2,
    prev: 3,
    curr: null,
    next: null,
    nodes: [10, 20, 30, 40],
    state: { 'curr != null': 'NULL != null (FALSE ❌)' },
    desc: 'Line 2: Check while loop: curr (NULL) != null is FALSE ❌. Loop terminates.',
  },
  {
    activeLine: 7,
    prev: 3,
    curr: null,
    next: null,
    nodes: [40, 30, 20, 10],
    state: { newHead: 40, result: '40 → 30 → 20 → 10 → NULL', status: 'REVERSED 🎉' },
    desc: 'Line 7: Return prev (node 40). List successfully reversed to 40 → 30 → 20 → 10 → NULL! 🎉',
  },
];

export const useLinkedListStore = create((set, get) => ({
  track: 'singly-ll',
  nodes: [10, 20, 30, 40],
  steps: SINGLY_TRAVERSAL_STEPS,
  currentStep: 0,
  isPlaying: false,
  speed: 1,
  practiceMode: false,
  userCode: `// Write your pseudocode or solution here\nfunction reverseList(head) {\n  let prev = null, curr = head;\n  while (curr) {\n    let next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}`,

  setTrack: (track) => {
    if (track === 'singly-ll') {
      set({ track: 'singly-ll', nodes: [10, 20, 30, 40], steps: SINGLY_TRAVERSAL_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'insert-head') {
      set({ track: 'insert-head', nodes: [10, 20, 30], steps: INSERT_HEAD_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'delete-node') {
      set({ track: 'delete-node', nodes: [10, 20, 30, 40], steps: DELETE_NODE_STEPS, currentStep: 0, isPlaying: false });
    } else if (track === 'reverse-ll') {
      set({ track: 'reverse-ll', nodes: [10, 20, 30, 40], steps: REVERSE_LIST_STEPS, currentStep: 0, isPlaying: false });
    }
  },

  setCurrentStep: (step) => {
    const { steps } = get();
    if (step >= 0 && step < steps.length) {
      const targetStep = steps[step];
      const newNodes = targetStep.nodes || get().nodes;
      set({ currentStep: step, nodes: newNodes });
    }
  },

  nextStep: () => {
    const { currentStep, steps } = get();
    if (currentStep < steps.length - 1) {
      const nextIndex = currentStep + 1;
      const targetStep = steps[nextIndex];
      const newNodes = targetStep.nodes || get().nodes;
      set({ currentStep: nextIndex, nodes: newNodes });
    } else {
      set({ isPlaying: false });
    }
  },

  prevStep: () => {
    const { currentStep, steps } = get();
    if (currentStep > 0) {
      const prevIndex = currentStep - 1;
      const targetStep = steps[prevIndex];
      const newNodes = targetStep.nodes || get().nodes;
      set({ currentStep: prevIndex, nodes: newNodes });
    }
  },

  restart: () => {
    const { steps } = get();
    const initialNodes = steps[0].nodes || get().nodes;
    set({ currentStep: 0, nodes: initialNodes, isPlaying: false });
  },

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSpeed: (s) => set({ speed: s }),
  togglePracticeMode: () => set((state) => ({ practiceMode: !state.practiceMode })),
  setUserCode: (code) => set({ userCode: code }),
}));
