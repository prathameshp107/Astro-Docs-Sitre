import { create } from 'zustand';

let llIdCounter = 0;

export const useLinkedListStore = create((set, get) => ({
  nodes: [],
  edges: [],
  highlighted: null,
  listType: 'singly',

  setListType: (type) => {
    set({ listType: type });
    get().initialize();
  },

  initialize: () => {
    llIdCounter = 0;
    const values = [10, 20, 30, 40, 50];
    const nodes = values.map((v) => ({ id: String(++llIdCounter), value: v }));
    const edges = nodes.slice(0, -1).map((n, i) => ({ from: n.id, to: nodes[i + 1].id }));
    set({ nodes, edges, highlighted: null });
  },

  insertHead: (value) => {
    const { nodes, edges } = get();
    const newNode = { id: String(++llIdCounter), value };
    const newEdges = [...edges];
    if (nodes.length > 0) newEdges.unshift({ from: newNode.id, to: nodes[0].id });
    set({ nodes: [newNode, ...nodes], edges: newEdges, highlighted: newNode.id });
    setTimeout(() => set({ highlighted: null }), 700);
  },

  insertTail: (value) => {
    const { nodes, edges } = get();
    const newNode = { id: String(++llIdCounter), value };
    const newEdges = [...edges];
    if (nodes.length > 0) newEdges.push({ from: nodes[nodes.length - 1].id, to: newNode.id });
    set({ nodes: [...nodes, newNode], edges: newEdges, highlighted: newNode.id });
    setTimeout(() => set({ highlighted: null }), 700);
  },

  deleteHead: () => {
    const { nodes, edges } = get();
    if (nodes.length === 0) return;
    const newNodes = nodes.slice(1);
    const newEdges = edges.slice(1);
    set({ nodes: newNodes, edges: newEdges, highlighted: null });
  },

  deleteTail: () => {
    const { nodes, edges } = get();
    if (nodes.length === 0) return;
    set({ nodes: nodes.slice(0, -1), edges: edges.slice(0, -1), highlighted: null });
  },

  reverse: () => {
    const { nodes } = get();
    if (nodes.length <= 1) return;
    const reversedNodes = [...nodes].reverse();
    const newEdges = reversedNodes.slice(0, -1).map((n, i) => ({ from: n.id, to: reversedNodes[i + 1].id }));
    set({ nodes: reversedNodes, edges: newEdges, highlighted: null });
  },

  deleteValue: (value) => {
    const { nodes, edges } = get();
    const idx = nodes.findIndex(n => n.value === value);
    if (idx === -1) return;
    const newNodes = nodes.filter((_, i) => i !== idx);
    const newEdges = [];
    if (idx > 0 && idx < nodes.length - 1) {
      newEdges.push({ from: nodes[idx - 1].id, to: nodes[idx + 1]?.id || '' });
    }
    edges.forEach((e, i) => {
      if (i !== idx && idx < nodes.length - 1 && !(i === idx - 1)) newEdges.push(e);
    });
    set({ nodes: newNodes, edges: newEdges.filter(e => e.to), highlighted: null });
  },
}));

