import { create } from 'zustand';

export const useTreeStore = create((set, get) => ({
  nodes: [
    { id: '1', value: 50, x: 400, y: 40 },
    { id: '2', value: 30, x: 200, y: 120 },
    { id: '3', value: 70, x: 600, y: 120 },
    { id: '4', value: 20, x: 100, y: 200 },
    { id: '5', value: 40, x: 300, y: 200 },
    { id: '6', value: 60, x: 500, y: 200 },
    { id: '7', value: 80, x: 700, y: 200 },
  ],
  edges: [
    { from: '1', to: '2' }, { from: '1', to: '3' }, { from: '2', to: '4' },
    { from: '2', to: '5' }, { from: '3', to: '6' }, { from: '3', to: '7' },
  ],
  highlighted: [], traversalPath: [], traversalType: 'inorder',
  setTraversalType: (type) => set({ traversalType: type }),
  reset: () => set({ highlighted: [], traversalPath: [] }),
  generateBST: () => {
    const values = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45, 55, 65, 75, 90];
    const TREE_WIDTH = 600; // total horizontal space
    const LEFT_MARGIN = 80;
    const LEVEL_HEIGHT = 80;
    const TOP_OFFSET = 40;

    const nodes = values.map((v, i) => {
      const depth = Math.floor(Math.log2(i + 1));
      const nodesInLevel = Math.pow(2, depth);
      const indexInLevel = i - nodesInLevel + 1;
      const spacing = TREE_WIDTH / nodesInLevel;
      const x = LEFT_MARGIN + (indexInLevel + 0.5) * spacing;
      const y = depth * LEVEL_HEIGHT + TOP_OFFSET;
      return { id: String(i + 1), value: v, x: Math.round(x), y };
    });
    const edges = [];
    for (let i = 1; i < values.length; i++) {
      edges.push({ from: String(Math.floor((i - 1) / 2) + 1), to: String(i + 1) });
    }
    set({ nodes, edges, highlighted: [], traversalPath: [] });
  },
  traverse: (type) => {
    const { nodes, edges } = get();
    if (nodes.length === 0) return [];
    const childrenMap = {};
    nodes.forEach(n => { childrenMap[n.id] = []; });
    edges.forEach(e => childrenMap[e.from].push(e.to));
    const order = [];
    const root = nodes[0].id;
    if (type === 'levelorder') {
      const queue = [root];
      while (queue.length > 0) {
        const nodeId = queue.shift();
        order.push(nodeId);
        for (const child of childrenMap[nodeId] || []) queue.push(child);
      }
    } else {
      function dfs(nodeId) {
        const [left, right] = childrenMap[nodeId] || [];
        if (type === 'preorder') order.push(nodeId);
        if (left) dfs(left);
        if (type === 'inorder') order.push(nodeId);
        if (right) dfs(right);
        if (type === 'postorder') order.push(nodeId);
      }
      dfs(root);
    }
    set({ traversalPath: order, traversalType: type, highlighted: [] });
    return order;
  },
}));

// ─── Graph Store ───
