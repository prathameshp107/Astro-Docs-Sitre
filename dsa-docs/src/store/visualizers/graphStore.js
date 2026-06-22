import { create } from 'zustand';

export const useGraphStore = create((set, get) => ({
  graphType: 'undirected',
  nodes: [
    { id: '1', label: 'A' }, { id: '2', label: 'B' }, { id: '3', label: 'C' },
    { id: '4', label: 'D' }, { id: '5', label: 'E' }, { id: '6', label: 'F' },
  ],
  edges: [
    { source: '1', target: '2' }, { source: '1', target: '3' }, { source: '2', target: '4' },
    { source: '3', target: '5' }, { source: '4', target: '6' }, { source: '5', target: '6' },
    { source: '2', target: '3' },
  ],
  visited: [], queue: [], current: null, isTraversing: false,
  setGraphType: (type) => set({ graphType: type }),
  resetTraversal: () => set({ visited: [], queue: [], current: null, isTraversing: false }),
  bfs: () => {
    const { nodes, edges } = get();
    if (nodes.length === 0) return [];
    const adj = {};
    nodes.forEach(n => { adj[n.id] = []; });
    edges.forEach(e => { adj[e.source]?.push(e.target); adj[e.target]?.push(e.source); });
    const visited = new Set();
    const queue = [nodes[0].id];
    const order = [];
    visited.add(nodes[0].id);
    while (queue.length > 0) {
      const node = queue.shift();
      order.push(node);
      for (const neighbor of adj[node] || []) {
        if (!visited.has(neighbor)) { visited.add(neighbor); queue.push(neighbor); }
      }
    }
    return order;
  },
  dfs: () => {
    const { nodes, edges } = get();
    if (nodes.length === 0) return [];
    const adj = {};
    nodes.forEach(n => { adj[n.id] = []; });
    edges.forEach(e => { adj[e.source]?.push(e.target); adj[e.target]?.push(e.source); });
    const visited = new Set();
    const order = [];
    function dfsRec(node) {
      visited.add(node);
      order.push(node);
      for (const neighbor of adj[node] || []) { if (!visited.has(neighbor)) dfsRec(neighbor); }
    }
    dfsRec(nodes[0].id);
    return order;
  },
}));

// ─── Stack Store ───
