import { buildLevelOrderSteps, buildInvertSteps } from '../../../store/visualizers/treeStore.js';
export const treeLogic = {
  'trees-level-order': {
    title: 'Trees — Level Order Traversal (BFS)',
    input: 'tree = [4, 2, 6, 1, 3, 5, 7]',
    goal: 'Emit nodes level by level using a queue, completing each level before descending.',
    terms: {
      'Level order': 'Breadth-first traversal — every node of a level is visited before any node of the next.',
      'Queue': 'FIFO ordering is what produces level-by-level output. A stack in its place gives depth-first instead.',
      'Frontier': 'The set of nodes discovered but not yet visited — the queue contents at any moment.',
    },
    array: [],
    steps: buildLevelOrderSteps().map((x, i) => ({ ...x, stepNum: i + 1, array: [] })),
  },

  'trees-invert': {
    title: 'Trees — Invert Binary Tree',
    input: 'tree = [4, 2, 6, 1, 3, 5, 7]',
    goal: 'Mirror the tree by swapping the children of every node, recursing to the leaves.',
    terms: {
      'Mirror': 'Every node exchanges its left and right child, so the whole tree is reflected.',
      'Base case': 'A leaf (or null) has nothing to swap, which is where the recursion stops.',
      'O(n) / O(h)': 'Each node is visited once; the stack holds at most the height of the tree.',
    },
    array: [],
    steps: buildInvertSteps().map((x, i) => ({ ...x, stepNum: i + 1, array: [] })),
  },

  'trees': {
    title: 'Binary Tree & BST Operations',
    input: 'Binary Search Tree = Root 4 [Left: 2 (1, 3), Right: 6 (5, 7)]',
    goal: 'Demonstrate tree traversals (Inorder, Preorder, Postorder) and logarithmic BST search.',
    terms: {
      'Root Node': 'Topmost node of the tree (value 4). Entry point for recursive traversals.',
      'Left Subtree': 'All nodes to the left of current node (strictly smaller values in a BST).',
      'Right Subtree': 'All nodes to the right of current node (strictly larger values in a BST).',
      'Call Stack': 'Execution stack frames holding active node state during recursion.',
      'Visited Array': 'Sequential order of node values recorded upon visiting.'
    },
    array: [4, 2, 6, 1, 3, 5, 7],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Start Traversal — Inspect Root Node 4',
        left: 0, right: 0,
        leftLabel: 'root 4', rightLabel: 'root 4',
        array: [4, 2, 6, 1, 3, 5, 7],
        computation: 'Call traversal starting at Root (4)',
        comparison: '4 != null (TRUE ✅)',
        action: 'Recurse Left Subtree',
        desc: 'Start at root node 4. Push frame onto recursion stack. Inspect left pointer leading to child node 2.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Traverse Left Subtree (Nodes 2, 1, 3)',
        left: 1, right: 4,
        leftLabel: 'leaf 1', rightLabel: 'leaf 3',
        array: [1, 2, 3, 4, 5, 6, 7],
        computation: 'Visited Left Subtree ➔ [1, 2, 3]',
        comparison: 'Left Subtree Fully Traversed',
        action: 'Backtrack to Root 4',
        desc: 'Recurse down to leftmost leaf node 1, visit 1, backtrack to parent node 2, then visit node 3.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Process Root Node 4 & Recurse Right Subtree',
        left: 0, right: 0,
        leftLabel: 'root 4', rightLabel: 'root 4',
        array: [1, 2, 3, 4, 5, 6, 7],
        computation: 'Visited = [1, 2, 3, 4]',
        comparison: 'Root Node Processed',
        action: 'Recurse Right Subtree',
        desc: 'With left subtree complete, process root node 4. Then recurse into right child node 6.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Traverse Right Subtree (Nodes 5, 6, 7) ➔ Traversal Complete 🎉',
        left: 4, right: 6,
        leftLabel: 'leaf 5', rightLabel: 'leaf 7',
        array: [1, 2, 3, 4, 5, 6, 7],
        computation: 'Visited = [1, 2, 3, 4, 5, 6, 7]',
        comparison: 'ALL NODES VISITED 🎉',
        action: 'Return Sequence',
        isMatch: true,
        desc: 'Visit nodes 5, 6, and 7 in order. Inorder traversal on a BST yields sorted array [1, 2, 3, 4, 5, 6, 7]! 🎉'
      }
    ]
  },

  'trees-inorder': {
    title: 'Inorder Traversal (Left ➔ Root ➔ Right) O(N)',
    input: 'Binary Search Tree Root = 4',
    goal: 'Recursively traverse left subtree, visit current node, then traverse right subtree (yields sorted BST sequence).',
    terms: {
      'Inorder Rule': 'Left Child ➔ Current Node ➔ Right Child.',
      'BST Inorder Property': 'Inorder traversal on a Binary Search Tree produces values in strictly ascending sorted order.',
      'Call Stack': 'Execution frames managing active node calls during depth-first recursion.'
    },
    array: [1, 2, 3, 4, 5, 6, 7],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Call inorder(4) — Inspect Root Node 4',
        left: 0, right: 0,
        leftLabel: 'root 4', rightLabel: 'root 4',
        array: [4, 2, 6, 1, 3, 5, 7],
        computation: 'Stack: [inorder(4)] | Active Node: 4',
        comparison: '4 != null (TRUE ✅)',
        action: 'Recurse Left (Node 2)',
        desc: 'Line 1: Call inorder(4). Check condition node (4) != null (TRUE). Recurse left: call inorder(node.left) for node 2.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Recurse Left — Call inorder(2)',
        left: 1, right: 1,
        leftLabel: 'node 2', rightLabel: 'node 2',
        array: [4, 2, 6, 1, 3, 5, 7],
        computation: 'Stack: [inorder(4), inorder(2)] | Depth = 2',
        comparison: '2 != null (TRUE ✅)',
        action: 'Recurse Left (Node 1)',
        desc: 'Line 2: Recurse left: call inorder(node.left) for node 2. Push inorder(2) onto call stack.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Inside inorder(2) — Check Condition 2 != null',
        left: 1, right: 1,
        leftLabel: 'node 2', rightLabel: 'node 2',
        array: [4, 2, 6, 1, 3, 5, 7],
        computation: 'Stack: [inorder(4), inorder(2)]',
        comparison: '2 != null (TRUE ✅)',
        action: 'Recurse Left (Node 1)',
        desc: 'Line 1: Inside inorder(2). Check condition: node (2) != null is TRUE.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Recurse Left — Call inorder(1)',
        left: 3, right: 3,
        leftLabel: 'leaf 1', rightLabel: 'leaf 1',
        array: [4, 2, 6, 1, 3, 5, 7],
        computation: 'Stack: [inorder(4), inorder(2), inorder(1)] | Depth = 3',
        comparison: '1 != null (TRUE ✅)',
        action: 'Inspect Leaf 1',
        desc: 'Line 2: Recurse left: call inorder(node.left) for node 1. Push inorder(1) onto call stack.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Inside inorder(1) — Check Condition 1 != null',
        left: 3, right: 3,
        leftLabel: 'leaf 1', rightLabel: 'leaf 1',
        array: [4, 2, 6, 1, 3, 5, 7],
        computation: 'Stack: [inorder(4), inorder(2), inorder(1)]',
        comparison: '1 != null (TRUE ✅)',
        action: 'Visit Node 1',
        desc: 'Line 1: Inside inorder(1). Check condition: node (1) != null is TRUE.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Visit Node 1! ➔ Visited = [1]',
        left: 3, right: 3,
        leftLabel: 'visited 1', rightLabel: 'visited 1',
        array: [1, 2, 3, 4, 5, 6, 7],
        computation: 'Visited.push(1) ➔ Visited List: [1]',
        comparison: 'Node 1 Visited ✅',
        action: 'Recurse Right (NULL)',
        desc: 'Line 3: Visit node 1! Add 1 to visited sequence. Node 1 is the first visited node.'
      },
      {
        stepNum: 7,
        title: 'Step 7: Right of 1 is NULL ➔ Pop Stack Frame inorder(1)',
        left: 3, right: 3,
        leftLabel: 'leaf 1', rightLabel: 'leaf 1',
        array: [1, 2, 3, 4, 5, 6, 7],
        computation: 'Stack: [inorder(4), inorder(2)] | Pop inorder(1)',
        comparison: 'Node 1 Frame Finished',
        action: 'Backtrack to Node 2',
        desc: 'Line 4: Recurse right of 1 (NULL). Pop stack frame inorder(1) and return control to parent node 2.'
      },
      {
        stepNum: 8,
        title: 'Step 8: Visit Node 2! ➔ Visited = [1, 2]',
        left: 1, right: 1,
        leftLabel: 'visited 2', rightLabel: 'visited 2',
        array: [1, 2, 3, 4, 5, 6, 7],
        computation: 'Visited.push(2) ➔ Visited List: [1, 2]',
        comparison: 'Node 2 Visited ✅',
        action: 'Recurse Right (Node 3)',
        desc: 'Line 3: Return to node 2. Visit node 2! Add 2 to visited sequence.'
      },
      {
        stepNum: 9,
        title: 'Step 9: Recurse Right of Node 2 — Call inorder(3)',
        left: 4, right: 4,
        leftLabel: 'leaf 3', rightLabel: 'leaf 3',
        array: [1, 2, 3, 4, 5, 6, 7],
        computation: 'Stack: [inorder(4), inorder(3)]',
        comparison: '3 != null (TRUE ✅)',
        action: 'Visit Node 3',
        desc: 'Line 4: Recurse right: call inorder(node.right) for node 3.'
      },
      {
        stepNum: 10,
        title: 'Step 10: Visit Node 3! ➔ Visited = [1, 2, 3]',
        left: 4, right: 4,
        leftLabel: 'visited 3', rightLabel: 'visited 3',
        array: [1, 2, 3, 4, 5, 6, 7],
        computation: 'Visited.push(3) ➔ Visited List: [1, 2, 3]',
        comparison: 'Left Subtree Done ✅',
        action: 'Pop Frame inorder(3)',
        desc: 'Line 3: Visit node 3! Add 3 to visited sequence. Left subtree of root 4 fully processed!'
      },
      {
        stepNum: 11,
        title: 'Step 11: Left Subtree Finished ➔ Pop Frame inorder(3)',
        left: 4, right: 4,
        leftLabel: 'leaf 3', rightLabel: 'leaf 3',
        array: [1, 2, 3, 4, 5, 6, 7],
        computation: 'Stack: [inorder(4)] | Pop inorder(3)',
        comparison: 'Control Returned to Root 4',
        action: 'Backtrack to Root 4',
        desc: 'Line 4: Left subtree of 4 fully processed. Pop stack frame inorder(3) and return to root node 4.'
      },
      {
        stepNum: 12,
        title: 'Step 12: Visit Root Node 4! ➔ Visited = [1, 2, 3, 4]',
        left: 0, right: 0,
        leftLabel: 'root 4', rightLabel: 'root 4',
        array: [1, 2, 3, 4, 5, 6, 7],
        computation: 'Visited.push(4) ➔ Visited List: [1, 2, 3, 4]',
        comparison: 'Root 4 Visited ✅',
        action: 'Recurse Right (Node 6)',
        desc: 'Line 3: Return to root node 4. Visit node 4! Add 4 to visited sequence.'
      },
      {
        stepNum: 13,
        title: 'Step 13: Recurse Right — Call inorder(6)',
        left: 2, right: 2,
        leftLabel: 'node 6', rightLabel: 'node 6',
        array: [1, 2, 3, 4, 5, 6, 7],
        computation: 'Stack: [inorder(6)]',
        comparison: '6 != null (TRUE ✅)',
        action: 'Recurse Left (Node 5)',
        desc: 'Line 4: Recurse right: call inorder(node.right) for node 6.'
      },
      {
        stepNum: 14,
        title: 'Step 14: Recurse Left of Node 6 — Call inorder(5)',
        left: 5, right: 5,
        leftLabel: 'leaf 5', rightLabel: 'leaf 5',
        array: [1, 2, 3, 4, 5, 6, 7],
        computation: 'Stack: [inorder(6), inorder(5)]',
        comparison: '5 != null (TRUE ✅)',
        action: 'Visit Node 5',
        desc: 'Line 2: Recurse left: call inorder(node.left) for node 5.'
      },
      {
        stepNum: 15,
        title: 'Step 15: Visit Node 5! ➔ Visited = [1, 2, 3, 4, 5]',
        left: 5, right: 5,
        leftLabel: 'visited 5', rightLabel: 'visited 5',
        array: [1, 2, 3, 4, 5, 6, 7],
        computation: 'Visited.push(5) ➔ Visited List: [1, 2, 3, 4, 5]',
        comparison: 'Node 5 Visited ✅',
        action: 'Backtrack to Node 6',
        desc: 'Line 3: Visit node 5! Add 5 to visited sequence.'
      },
      {
        stepNum: 16,
        title: 'Step 16: Visit Node 6! ➔ Visited = [1, 2, 3, 4, 5, 6]',
        left: 2, right: 2,
        leftLabel: 'visited 6', rightLabel: 'visited 6',
        array: [1, 2, 3, 4, 5, 6, 7],
        computation: 'Visited.push(6) ➔ Visited List: [1, 2, 3, 4, 5, 6]',
        comparison: 'Node 6 Visited ✅',
        action: 'Recurse Right (Node 7)',
        desc: 'Line 3: Return to node 6. Visit node 6! Add 6 to visited sequence.'
      },
      {
        stepNum: 17,
        title: 'Step 17: Recurse Right of Node 6 — Call inorder(7)',
        left: 6, right: 6,
        leftLabel: 'leaf 7', rightLabel: 'leaf 7',
        array: [1, 2, 3, 4, 5, 6, 7],
        computation: 'Stack: [inorder(7)]',
        comparison: '7 != null (TRUE ✅)',
        action: 'Visit Node 7',
        desc: 'Line 4: Recurse right: call inorder(node.right) for node 7.'
      },
      {
        stepNum: 18,
        title: 'Step 18: Visit Node 7! ➔ Inorder Traversal Complete [1, 2, 3, 4, 5, 6, 7] 🎉',
        left: 6, right: 6,
        leftLabel: 'visited 7', rightLabel: 'visited 7',
        array: [1, 2, 3, 4, 5, 6, 7],
        computation: 'Visited = [1, 2, 3, 4, 5, 6, 7] | Stack Empty',
        comparison: 'INORDER TRAVERSAL COMPLETE 🎉',
        action: 'Return Sorted Array',
        isMatch: true,
        desc: 'Line 3: Visit node 7! Inorder traversal complete: [1, 2, 3, 4, 5, 6, 7]! 🎉'
      }
    ]
  },

  'trees-preorder': {
    title: 'Preorder Traversal (Root ➔ Left ➔ Right) O(N)',
    input: 'Binary Search Tree Root = 4',
    goal: 'Visit root node immediately before children, then recursively traverse left and right subtrees (used for tree copying & serialization).',
    terms: {
      'Preorder Rule': 'Current Node ➔ Left Child ➔ Right Child.',
      'Use Case': 'Creating a clone/copy of a binary tree or generating prefix expression trees.'
    },
    array: [4, 2, 1, 3, 6, 5, 7],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Call preorder(4) — Inspect Root Node 4',
        left: 0, right: 0,
        leftLabel: 'root 4', rightLabel: 'root 4',
        array: [4, 2, 1, 3, 6, 5, 7],
        computation: 'Stack: [preorder(4)] | Active Node: 4',
        comparison: '4 != null (TRUE ✅)',
        action: 'Visit Root Node 4 First',
        desc: 'Line 1: Call preorder(4). Node 4 is not NULL.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Visit Root Node 4 FIRST! ➔ Visited = [4]',
        left: 0, right: 0,
        leftLabel: 'visited 4', rightLabel: 'visited 4',
        array: [4, 2, 1, 3, 6, 5, 7],
        computation: 'Visited.push(4) ➔ Visited List: [4]',
        comparison: 'Root Visited First ✅',
        action: 'Recurse Left (Node 2)',
        desc: 'Line 2: Visit root node 4 FIRST! Add 4 to visited list.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Recurse Left — Call preorder(2)',
        left: 1, right: 1,
        leftLabel: 'node 2', rightLabel: 'node 2',
        array: [4, 2, 1, 3, 6, 5, 7],
        computation: 'Stack: [preorder(4), preorder(2)]',
        comparison: '2 != null (TRUE ✅)',
        action: 'Visit Node 2 First',
        desc: 'Line 3: Recurse left: call preorder(node.left) for node 2.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Visit Node 2! ➔ Visited = [4, 2]',
        left: 1, right: 1,
        leftLabel: 'visited 2', rightLabel: 'visited 2',
        array: [4, 2, 1, 3, 6, 5, 7],
        computation: 'Visited.push(2) ➔ Visited List: [4, 2]',
        comparison: 'Node 2 Visited ✅',
        action: 'Recurse Left (Node 1)',
        desc: 'Line 2: Visit node 2! Add 2 to visited list.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Recurse Left — Call preorder(1)',
        left: 2, right: 2,
        leftLabel: 'leaf 1', rightLabel: 'leaf 1',
        array: [4, 2, 1, 3, 6, 5, 7],
        computation: 'Stack: [preorder(4), preorder(2), preorder(1)]',
        comparison: '1 != null (TRUE ✅)',
        action: 'Visit Leaf 1',
        desc: 'Line 3: Recurse left: call preorder(node.left) for node 1.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Visit Node 1! ➔ Visited = [4, 2, 1]',
        left: 2, right: 2,
        leftLabel: 'visited 1', rightLabel: 'visited 1',
        array: [4, 2, 1, 3, 6, 5, 7],
        computation: 'Visited.push(1) ➔ Visited List: [4, 2, 1]',
        comparison: 'Leaf 1 Visited ✅',
        action: 'Recurse Right (Node 3)',
        desc: 'Line 2: Visit node 1! Add 1 to visited list.'
      },
      {
        stepNum: 7,
        title: 'Step 7: Recurse Right of Node 2 — Call preorder(3)',
        left: 3, right: 3,
        leftLabel: 'leaf 3', rightLabel: 'leaf 3',
        array: [4, 2, 1, 3, 6, 5, 7],
        computation: 'Stack: [preorder(4), preorder(3)]',
        comparison: '3 != null (TRUE ✅)',
        action: 'Visit Node 3',
        desc: 'Line 4: Recurse right: call preorder(node.right) for node 3.'
      },
      {
        stepNum: 8,
        title: 'Step 8: Visit Node 3! ➔ Visited = [4, 2, 1, 3]',
        left: 3, right: 3,
        leftLabel: 'visited 3', rightLabel: 'visited 3',
        array: [4, 2, 1, 3, 6, 5, 7],
        computation: 'Visited.push(3) ➔ Visited List: [4, 2, 1, 3]',
        comparison: 'Left Subtree Done ✅',
        action: 'Recurse Right Subtree (Node 6)',
        desc: 'Line 2: Visit node 3! Add 3 to visited list.'
      },
      {
        stepNum: 9,
        title: 'Step 9: Recurse Right of Root 4 — Call preorder(6)',
        left: 4, right: 4,
        leftLabel: 'node 6', rightLabel: 'node 6',
        array: [4, 2, 1, 3, 6, 5, 7],
        computation: 'Stack: [preorder(6)]',
        comparison: '6 != null (TRUE ✅)',
        action: 'Visit Node 6 First',
        desc: 'Line 4: Recurse right: call preorder(node.right) for node 6.'
      },
      {
        stepNum: 10,
        title: 'Step 10: Visit Node 6! ➔ Visited = [4, 2, 1, 3, 6]',
        left: 4, right: 4,
        leftLabel: 'visited 6', rightLabel: 'visited 6',
        array: [4, 2, 1, 3, 6, 5, 7],
        computation: 'Visited.push(6) ➔ Visited List: [4, 2, 1, 3, 6]',
        comparison: 'Node 6 Visited ✅',
        action: 'Recurse Left (Node 5)',
        desc: 'Line 2: Visit node 6! Add 6 to visited list.'
      },
      {
        stepNum: 11,
        title: 'Step 11: Recurse Left of Node 6 — Call preorder(5)',
        left: 5, right: 5,
        leftLabel: 'leaf 5', rightLabel: 'leaf 5',
        array: [4, 2, 1, 3, 6, 5, 7],
        computation: 'Stack: [preorder(6), preorder(5)]',
        comparison: '5 != null (TRUE ✅)',
        action: 'Visit Node 5',
        desc: 'Line 3: Recurse left: call preorder(node.left) for node 5.'
      },
      {
        stepNum: 12,
        title: 'Step 12: Visit Node 5! ➔ Visited = [4, 2, 1, 3, 6, 5]',
        left: 5, right: 5,
        leftLabel: 'visited 5', rightLabel: 'visited 5',
        array: [4, 2, 1, 3, 6, 5, 7],
        computation: 'Visited.push(5) ➔ Visited List: [4, 2, 1, 3, 6, 5]',
        comparison: 'Node 5 Visited ✅',
        action: 'Recurse Right (Node 7)',
        desc: 'Line 2: Visit node 5! Add 5 to visited list.'
      },
      {
        stepNum: 13,
        title: 'Step 13: Recurse Right of Node 6 — Call preorder(7)',
        left: 6, right: 6,
        leftLabel: 'leaf 7', rightLabel: 'leaf 7',
        array: [4, 2, 1, 3, 6, 5, 7],
        computation: 'Stack: [preorder(7)]',
        comparison: '7 != null (TRUE ✅)',
        action: 'Visit Node 7',
        desc: 'Line 4: Recurse right: call preorder(node.right) for node 7.'
      },
      {
        stepNum: 14,
        title: 'Step 14: Visit Node 7! ➔ Preorder Traversal Complete [4, 2, 1, 3, 6, 5, 7] 🎉',
        left: 6, right: 6,
        leftLabel: 'visited 7', rightLabel: 'visited 7',
        array: [4, 2, 1, 3, 6, 5, 7],
        computation: 'Visited = [4, 2, 1, 3, 6, 5, 7] | Stack Empty',
        comparison: 'PREORDER TRAVERSAL COMPLETE 🎉',
        action: 'Return Preorder Sequence',
        isMatch: true,
        desc: 'Line 2: Visit node 7! Preorder traversal complete: [4, 2, 1, 3, 6, 5, 7]! 🎉'
      }
    ]
  },

  'trees-postorder': {
    title: 'Postorder Traversal (Left ➔ Right ➔ Root) O(N)',
    input: 'Binary Search Tree Root = 4',
    goal: 'Traverse left and right subtrees before visiting the parent node (used for tree deletion & bottom-up calculations).',
    terms: {
      'Postorder Rule': 'Left Child ➔ Right Child ➔ Current Node.',
      'Use Case': 'Deleting nodes bottom-up without losing child pointers, or calculating subtree heights/diameters.'
    },
    array: [1, 3, 2, 5, 7, 6, 4],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Call postorder(4) — Start at Root Node 4',
        left: 0, right: 0,
        leftLabel: 'root 4', rightLabel: 'root 4',
        array: [1, 3, 2, 5, 7, 6, 4],
        computation: 'Stack: [postorder(4)] | Active Node: 4',
        comparison: '4 != null (TRUE ✅)',
        action: 'Recurse Left (Node 2)',
        desc: 'Line 1: Call postorder(4). Start at root 4.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Recurse Left — Call postorder(2)',
        left: 2, right: 2,
        leftLabel: 'node 2', rightLabel: 'node 2',
        array: [1, 3, 2, 5, 7, 6, 4],
        computation: 'Stack: [postorder(4), postorder(2)]',
        comparison: '2 != null (TRUE ✅)',
        action: 'Recurse Left (Node 1)',
        desc: 'Line 2: Recurse left: call postorder(node.left) for node 2.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Recurse Left — Call postorder(1)',
        left: 0, right: 0,
        leftLabel: 'leaf 1', rightLabel: 'leaf 1',
        array: [1, 3, 2, 5, 7, 6, 4],
        computation: 'Stack: [postorder(4), postorder(2), postorder(1)]',
        comparison: '1 != null (TRUE ✅)',
        action: 'Inspect Leaf Node 1',
        desc: 'Line 2: Recurse left: call postorder(node.left) for node 1.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Leaf Node 1 Reached! ➔ Visit Node 1 [1]',
        left: 0, right: 0,
        leftLabel: 'visited 1', rightLabel: 'visited 1',
        array: [1, 3, 2, 5, 7, 6, 4],
        computation: 'Visited.push(1) ➔ Visited List: [1]',
        comparison: 'Leaf Node 1 Processed ✅',
        action: 'Backtrack & Recurse Right (3)',
        desc: 'Line 4: Leaf node 1 reached! Visit node 1.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Recurse Right of Node 2 — Call postorder(3)',
        left: 1, right: 1,
        leftLabel: 'leaf 3', rightLabel: 'leaf 3',
        array: [1, 3, 2, 5, 7, 6, 4],
        computation: 'Stack: [postorder(4), postorder(3)]',
        comparison: '3 != null (TRUE ✅)',
        action: 'Inspect Leaf Node 3',
        desc: 'Line 3: Recurse right: call postorder(node.right) for node 3.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Leaf Node 3 Reached! ➔ Visit Node 3 [1, 3]',
        left: 1, right: 1,
        leftLabel: 'visited 3', rightLabel: 'visited 3',
        array: [1, 3, 2, 5, 7, 6, 4],
        computation: 'Visited.push(3) ➔ Visited List: [1, 3]',
        comparison: 'Leaf Node 3 Processed ✅',
        action: 'Backtrack to Parent 2',
        desc: 'Line 4: Leaf node 3 reached! Visit node 3.'
      },
      {
        stepNum: 7,
        title: 'Step 7: Both Children of Node 2 Processed! ➔ Visit Parent Node 2 [1, 3, 2]',
        left: 2, right: 2,
        leftLabel: 'visited 2', rightLabel: 'visited 2',
        array: [1, 3, 2, 5, 7, 6, 4],
        computation: 'Visited.push(2) ➔ Visited List: [1, 3, 2]',
        comparison: 'Left Subtree Done ✅',
        action: 'Recurse Right Subtree (6)',
        desc: 'Line 4: Both children of 2 processed. Visit parent node 2!'
      },
      {
        stepNum: 8,
        title: 'Step 8: Recurse Right of Root 4 — Call postorder(6)',
        left: 5, right: 5,
        leftLabel: 'node 6', rightLabel: 'node 6',
        array: [1, 3, 2, 5, 7, 6, 4],
        computation: 'Stack: [postorder(6)]',
        comparison: '6 != null (TRUE ✅)',
        action: 'Recurse Left (Node 5)',
        desc: 'Line 3: Recurse right: call postorder(node.right) for node 6.'
      },
      {
        stepNum: 9,
        title: 'Step 9: Recurse Left of Node 6 — Call postorder(5)',
        left: 3, right: 3,
        leftLabel: 'leaf 5', rightLabel: 'leaf 5',
        array: [1, 3, 2, 5, 7, 6, 4],
        computation: 'Stack: [postorder(6), postorder(5)]',
        comparison: '5 != null (TRUE ✅)',
        action: 'Inspect Leaf Node 5',
        desc: 'Line 2: Recurse left: call postorder(node.left) for node 5.'
      },
      {
        stepNum: 10,
        title: 'Step 10: Leaf Node 5 Reached! ➔ Visit Node 5 [1, 3, 2, 5]',
        left: 3, right: 3,
        leftLabel: 'visited 5', rightLabel: 'visited 5',
        array: [1, 3, 2, 5, 7, 6, 4],
        computation: 'Visited.push(5) ➔ Visited List: [1, 3, 2, 5]',
        comparison: 'Leaf Node 5 Processed ✅',
        action: 'Recurse Right (7)',
        desc: 'Line 4: Leaf node 5 reached! Visit node 5.'
      },
      {
        stepNum: 11,
        title: 'Step 11: Recurse Right of Node 6 — Call postorder(7)',
        left: 4, right: 4,
        leftLabel: 'leaf 7', rightLabel: 'leaf 7',
        array: [1, 3, 2, 5, 7, 6, 4],
        computation: 'Stack: [postorder(6), postorder(7)]',
        comparison: '7 != null (TRUE ✅)',
        action: 'Inspect Leaf Node 7',
        desc: 'Line 3: Recurse right: call postorder(node.right) for node 7.'
      },
      {
        stepNum: 12,
        title: 'Step 12: Leaf Node 7 Reached! ➔ Visit Node 7 [1, 3, 2, 5, 7]',
        left: 4, right: 4,
        leftLabel: 'visited 7', rightLabel: 'visited 7',
        array: [1, 3, 2, 5, 7, 6, 4],
        computation: 'Visited.push(7) ➔ Visited List: [1, 3, 2, 5, 7]',
        comparison: 'Leaf Node 7 Processed ✅',
        action: 'Backtrack to Parent 6',
        desc: 'Line 4: Leaf node 7 reached! Visit node 7.'
      },
      {
        stepNum: 13,
        title: 'Step 13: Both Children of Node 6 Processed! ➔ Visit Parent Node 6 [1, 3, 2, 5, 7, 6]',
        left: 5, right: 5,
        leftLabel: 'visited 6', rightLabel: 'visited 6',
        array: [1, 3, 2, 5, 7, 6, 4],
        computation: 'Visited.push(6) ➔ Visited List: [1, 3, 2, 5, 7, 6]',
        comparison: 'Right Subtree Done ✅',
        action: 'Backtrack to Root 4',
        desc: 'Line 4: Both children of 6 processed. Visit node 6!'
      },
      {
        stepNum: 14,
        title: 'Step 14: Visit Root Node 4 LAST! ➔ Postorder Complete [1, 3, 2, 5, 7, 6, 4] 🎉',
        left: 6, right: 6,
        leftLabel: 'visited 4', rightLabel: 'visited 4',
        array: [1, 3, 2, 5, 7, 6, 4],
        computation: 'Visited.push(4) ➔ Result: [1, 3, 2, 5, 7, 6, 4]',
        comparison: 'POSTORDER TRAVERSAL COMPLETE 🎉',
        action: 'Return Postorder Sequence',
        isMatch: true,
        desc: 'Line 4: Visit root node 4 LAST! Postorder traversal complete: [1, 3, 2, 5, 7, 6, 4]! 🎉'
      }
    ]
  },

  'trees-bst-search': {
    title: 'BST Search O(log N)',
    input: 'Binary Search Tree Root = 4, Target = 5',
    goal: 'Exploit binary search tree ordering property (left < node < right) to search in logarithmic time.',
    terms: {
      'Target': 'The search value (5).',
      'BST Property': 'For any node, all left descendants < node.val and all right descendants > node.val.',
      'Search Space Halving': 'At each step, eliminate half of the remaining tree nodes.'
    },
    array: [4, 6, 5],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Start BST Search at Root Node 4 for Target 5',
        left: 0, right: 0,
        leftLabel: 'root 4', rightLabel: 'root 4',
        array: [4, 6, 5],
        computation: 'Stack: [search(4, 5)] | target = 5, currNode = 4',
        comparison: 'Node 4 != null',
        action: 'Compare Target with Root',
        desc: 'Line 1: Start BST search at root node 4 for target 5.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Compare Target 5 with Node 4 — 5 < 4 (FALSE ❌)',
        left: 0, right: 0,
        leftLabel: 'curr 4', rightLabel: 'curr 4',
        array: [4, 6, 5],
        computation: 'target = 5, currNode = 4',
        comparison: '5 < 4 (FALSE ❌)',
        action: 'Eliminate Left Subtree',
        desc: 'Line 2: Check condition: target 5 < 4? FALSE.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Target 5 > 4 ➔ Recurse Right to Node 6',
        left: 1, right: 1,
        leftLabel: 'node 6', rightLabel: 'node 6',
        array: [4, 6, 5],
        computation: 'Stack: [search(6, 5)] | currNode = 6',
        comparison: 'Search Right Subtree',
        action: 'Move to Right Child 6',
        desc: 'Line 3: Target 5 > 4 → Recurse right to node 6.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Inside search(6) — Check Node 6 vs Target 5',
        left: 1, right: 1,
        leftLabel: 'curr 6', rightLabel: 'curr 6',
        array: [4, 6, 5],
        computation: 'Stack: [search(6, 5)] | node.val = 6',
        comparison: '6 == 5 (FALSE ❌)',
        action: 'Compare Target with 6',
        desc: 'Line 1: Inside search(6). Check if node == null or node.val == 5? FALSE.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Compare Target 5 with Node 6 — 5 < 6 (TRUE ✅)',
        left: 1, right: 1,
        leftLabel: 'curr 6', rightLabel: 'curr 6',
        array: [4, 6, 5],
        computation: 'target = 5, currNode = 6',
        comparison: '5 < 6 (TRUE ✅)',
        action: 'Recurse Left to Node 5',
        desc: 'Line 2: Check condition: target 5 < 6? TRUE ✅.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Recurse Left from Node 6 ➔ Move to Node 5',
        left: 2, right: 2,
        leftLabel: 'node 5', rightLabel: 'node 5',
        array: [4, 6, 5],
        computation: 'Stack: [search(5, 5)] | currNode = 5',
        comparison: 'Search Left Subtree of 6',
        action: 'Move to Left Child 5',
        desc: 'Line 2: Recurse left from 6 to node 5.'
      },
      {
        stepNum: 7,
        title: 'Step 7: Node 5 Matched! ➔ 5 == 5 (TARGET FOUND! 🎉)',
        left: 2, right: 2,
        leftLabel: 'target 5', rightLabel: 'target 5',
        array: [4, 6, 5],
        computation: 'node.val (5) == target (5)',
        comparison: '5 == 5 (TRUE ✅)',
        action: 'Return Node 5',
        isMatch: true,
        desc: 'Line 1: node.val == target (5 == 5). Target node 5 found in O(log n) time! 🎉'
      }
    ]
  }
};
