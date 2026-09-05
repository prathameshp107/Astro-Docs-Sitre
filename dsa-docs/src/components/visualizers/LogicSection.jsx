import { useState } from 'react';
import { useTwoPointersStore } from '../../store/visualizers/twoPointersStore';
import { useSlidingWindowStore } from '../../store/visualizers/slidingWindowStore';
import { useBacktrackingStore } from '../../store/visualizers/backtrackingStore';
import { useArrayStore } from '../../store/visualizers/arrayStore';
import { useSortingStore } from '../../store/visualizers/sortingStore';
import { useSearchingStore } from '../../store/visualizers/searchingStore';
import { useLinkedListStore } from '../../store/visualizers/linkedListStore';
import { useTreeStore } from '../../store/visualizers/treeStore';
import { useGraphStore } from '../../store/visualizers/graphStore';
import { useStackStore } from '../../store/visualizers/stackStore';
import { useQueueStore } from '../../store/visualizers/queueStore';
import { useHeapStore } from '../../store/visualizers/heapStore';
import { useRecursionStore } from '../../store/visualizers/recursionStore';
import { useDPStore } from '../../store/visualizers/dpStore';
import { useHashTableStore } from '../../store/visualizers/hashTableStore';
import { useTrieStore } from '../../store/visualizers/trieStore';

import { twoPointersLogic } from './logicData/twoPointersLogic';
import { slidingWindowLogic } from './logicData/slidingWindowLogic';
import { backtrackingLogic } from './logicData/backtrackingLogic';
import { arrayLogic } from './logicData/arrayLogic';
import { searchingLogic } from './logicData/searchingLogic';
import { sortingLogic } from './logicData/sortingLogic';
import { linkedListLogic } from './logicData/linkedListLogic';
import { treeLogic } from './logicData/treeLogic';
import { graphLogic } from './logicData/graphLogic';
import { stackLogic } from './logicData/stackLogic';
import { queueLogic } from './logicData/queueLogic';
import { heapLogic } from './logicData/heapLogic';
import { recursionLogic } from './logicData/recursionLogic';
import { dpLogic } from './logicData/dpLogic';
import { hashTableLogic } from './logicData/hashTableLogic';
import { trieLogic } from './logicData/trieLogic';

// ALL DSA TOPIC LOGIC CURATED EXPLICITLY WITH CHALKBOARD THEMED KEY TERMINOLOGY DEFINITIONS
const SPECIFIC_PROBLEM_LOGIC = {
  ...twoPointersLogic,
  ...slidingWindowLogic,
  ...backtrackingLogic,
  ...arrayLogic,
  ...searchingLogic,
  ...sortingLogic,
  ...linkedListLogic,
  ...treeLogic,
  ...graphLogic,
  ...stackLogic,
  ...queueLogic,
  ...heapLogic,
  ...recursionLogic,
  ...dpLogic,
  ...hashTableLogic,
  ...trieLogic,
};

// Grid cell states for the generic cellGrid renderer.
//
// Reused by any grid track — islands, Unique Paths, Rotting Oranges, Word
// Search — so states are named by role rather than by problem. A track only
// needs to emit { v, s } cells; unknown states fall back to the neutral style.
const CELL_STYLE = {
  water:   'border-[var(--sketch-border)] bg-[var(--sketch-bg-dim)] text-slate-600',
  land:    'border-emerald-500/50 bg-emerald-500/10 text-emerald-300',
  filling: 'border-amber-400 bg-amber-500/25 text-amber-200 font-bold',
  sunk:    'border-slate-700 bg-slate-800/40 text-slate-500',
  filled:  'border-sky-400/60 bg-sky-500/15 text-sky-200',
  target:  'border-rose-400 bg-rose-500/20 text-rose-200 font-bold',
};

// Trie Canvas Diagram Layout — computed rather than a fixed coordinate table
// like TREE_DIAGRAM_NODES, because the trie grows as words are inserted and the
// user can supply their own word list. Leaves pack left-to-right; each parent
// centres over its children, which is the same shape the tree diagram hardcodes.
const TRIE_NODE = 40;
const TRIE_GAP_X = 14;
const TRIE_GAP_Y = 58;

function layoutTrieNodes(nodes) {
  const kidsOf = new Map();
  for (const n of nodes) {
    if (!kidsOf.has(n.parentId)) kidsOf.set(n.parentId, []);
    kidsOf.get(n.parentId).push(n);
  }

  const pos = new Map();
  let cursor = 0;

  const place = (node) => {
    const kids = kidsOf.get(node.id) ?? [];
    let x;
    if (!kids.length) {
      x = cursor * (TRIE_NODE + TRIE_GAP_X);
      cursor += 1;
    } else {
      const xs = kids.map(place);
      x = (Math.min(...xs) + Math.max(...xs)) / 2;
    }
    pos.set(node.id, { x, y: node.depth * TRIE_GAP_Y });
    return x;
  };

  const root = nodes.find((n) => n.parentId === null);
  if (root) place(root);

  const xs = [...pos.values()].map((v) => v.x);
  const ys = [...pos.values()].map((v) => v.y);
  return {
    pos,
    width: (xs.length ? Math.max(...xs) : 0) + TRIE_NODE,
    height: (ys.length ? Math.max(...ys) : 0) + TRIE_NODE,
  };
}

// Tree Canvas Diagram Layout Coordinates
const TREE_DIAGRAM_NODES = [
  { id: 4, val: 4, x: 240, y: 35, role: 'ROOT' },
  { id: 2, val: 2, x: 130, y: 95 },
  { id: 6, val: 6, x: 350, y: 95 },
  { id: 1, val: 1, x: 75, y: 155, role: 'LEAF' },
  { id: 3, val: 3, x: 185, y: 155, role: 'LEAF' },
  { id: 5, val: 5, x: 295, y: 155, role: 'LEAF' },
  { id: 7, val: 7, x: 405, y: 155, role: 'LEAF' },
];

const TREE_DIAGRAM_EDGES = [
  { from: 4, to: 2 },
  { from: 4, to: 6 },
  { from: 2, to: 1 },
  { from: 2, to: 3 },
  { from: 6, to: 5 },
  { from: 6, to: 7 },
];

// Graph Canvas Diagram Layout Coordinates
const GRAPH_DIAGRAM_NODES = [
  { id: 0, label: '0', x: 240, y: 35 },
  { id: 1, label: '1', x: 120, y: 95 },
  { id: 2, label: '2', x: 360, y: 95 },
  { id: 3, label: '3', x: 120, y: 165 },
  { id: 4, label: '4', x: 360, y: 165 },
  { id: 5, label: '5', x: 240, y: 205 },
];

const GRAPH_DIAGRAM_EDGES = [
  { from: 0, to: 1, weight: 4 },
  { from: 0, to: 2, weight: 2 },
  { from: 1, to: 3, weight: 3 },
  { from: 1, to: 4, weight: 1 },
  { from: 2, to: 4, weight: 3 },
  { from: 3, to: 5, weight: 2 },
  { from: 4, to: 5, weight: 3 },
];

// Heap Tree Canvas Layout Coordinates (up to 7 nodes)
const HEAP_DIAGRAM_POSITIONS = [
  { id: 0, x: 240, y: 35 },
  { id: 1, x: 130, y: 95 },
  { id: 2, x: 350, y: 95 },
  { id: 3, x: 70, y: 155 },
  { id: 4, x: 190, y: 155 },
  { id: 5, x: 290, y: 155 },
  { id: 6, x: 410, y: 155 },
];

export default function LogicSection({ topicId }) {
  // Read active tracks from all stores
  const twoPointerTrack = useTwoPointersStore((s) => s.track);
  const slidingWindowTrack = useSlidingWindowStore((s) => s.track);
  const backtrackingTrack = useBacktrackingStore((s) => s.track);
  const arrayTrack = useArrayStore((s) => s.track);
  const sortingTrack = useSortingStore((s) => s.track);
  const searchingTrack = useSearchingStore((s) => s.track);
  const linkedListTrack = useLinkedListStore((s) => s.track);
  const treeTrack = useTreeStore((s) => s.track);
  const graphTrack = useGraphStore((s) => s.track);
  const stackTrack = useStackStore((s) => s.track);
  const queueTrack = useQueueStore((s) => s.track);
  const heapTrack = useHeapStore((s) => s.track);
  const recursionTrack = useRecursionStore((s) => s.track);
  const dpTrack = useDPStore((s) => s.track);
  const hashTableTrack = useHashTableStore((s) => s.track);
  const trieTrack = useTrieStore((s) => s.track);

  // Pick the active track for this topic.
  const activeTrack =
    topicId === 'trie' ? trieTrack
    : topicId === 'two-pointers' ? twoPointerTrack
    : topicId === 'sliding-window' ? slidingWindowTrack
    : topicId === 'backtracking' ? backtrackingTrack
    : topicId === 'recursion' ? recursionTrack
    : topicId === 'arrays' ? arrayTrack
    : topicId === 'sorting' ? sortingTrack
    : topicId === 'searching' ? searchingTrack
    : topicId === 'linked-list' ? linkedListTrack
    : topicId === 'trees' ? treeTrack
    : topicId === 'graphs' ? graphTrack
    : topicId === 'stack' ? stackTrack
    : topicId === 'queue' ? queueTrack
    : (topicId === 'heaps' || topicId === 'heap') ? heapTrack
    : topicId === 'dp' ? dpTrack
    : (topicId === 'hash-table' || topicId === 'hash-tables') ? hashTableTrack
    : null;

  // Every logicData key is namespaced `<topic>-<track>`, so resolution is one
  // deterministic join. This replaced a flat-merge lookup plus an alias table
  // that rewrote raw track names — a combination which silently resolved
  // arrays:search to SEARCHING's entry, recursion:subsets to BACKTRACKING's,
  // and sliding-window:intro to TWO-POINTERS' introduction. A namespaced miss
  // now falls back to the topic-level entry rather than another topic's.
  // Track keys use the sidebar's topic id verbatim ('heaps-min-heap-insert').
  // Only the topic-level fallback entry uses the legacy singular ('heap').
  const trackPrefix = topicId === 'hash-tables' ? 'hash-table' : topicId;
  const topicKey = topicId === 'heaps' ? 'heap' : topicId === 'hash-tables' ? 'hash-table' : topicId;
  const resolvedTrackKey = activeTrack ? `${trackPrefix}-${activeTrack}` : topicKey;

  const isTreeTopic =
    topicId === 'trees' ||
    resolvedTrackKey === 'inorder' ||
    resolvedTrackKey === 'preorder' ||
    resolvedTrackKey === 'postorder' ||
    resolvedTrackKey === 'bst-search' ||
    resolvedTrackKey === 'trees';

  const isGraphTopic =
    topicId === 'graphs' ||
    resolvedTrackKey === 'bfs' ||
    resolvedTrackKey === 'dfs' ||
    resolvedTrackKey === 'cycle-detection' ||
    resolvedTrackKey === 'dijkstra' ||
    resolvedTrackKey === 'graph';

  const isStackTopic =
    topicId === 'stack' ||
    resolvedTrackKey === 'push' ||
    resolvedTrackKey === 'pop' ||
    resolvedTrackKey === 'peek' ||
    resolvedTrackKey === 'valid-parentheses' ||
    resolvedTrackKey === 'min-stack' ||
    resolvedTrackKey === 'stack';

  const isQueueTopic =
    topicId === 'queue' ||
    resolvedTrackKey === 'enqueue' ||
    resolvedTrackKey === 'dequeue' ||
    resolvedTrackKey === 'circular-queue' ||
    resolvedTrackKey === 'queue';

  const isHeapTopic =
    topicId === 'heaps' ||
    topicId === 'heap' ||
    resolvedTrackKey === 'min-heap-insert' ||
    resolvedTrackKey === 'min-heap-extract' ||
    resolvedTrackKey === 'max-heapify' ||
    resolvedTrackKey === 'heap-sort' ||
    resolvedTrackKey === 'min-heap' ||
    resolvedTrackKey === 'max-heap' ||
    resolvedTrackKey === 'heap';

  const isRecursionTopic =
    topicId === 'recursion' ||
    resolvedTrackKey === 'factorial' ||
    resolvedTrackKey === 'fibonacci' ||
    resolvedTrackKey === 'tower-of-hanoi' ||
    resolvedTrackKey === 'subsets' ||
    resolvedTrackKey === 'recursion';

  const isDPTopic =
    topicId === 'dp' ||
    resolvedTrackKey === 'climbing-stairs' ||
    resolvedTrackKey === 'knapsack' ||
    resolvedTrackKey === 'lcs' ||
    resolvedTrackKey === 'coin-change' ||
    resolvedTrackKey === 'dp';

  const isHashTableTopic =
    topicId === 'hash-table' ||
    topicId === 'hash-tables' ||
    resolvedTrackKey === 'separate-chaining' ||
    resolvedTrackKey === 'linear-probing' ||
    resolvedTrackKey === 'two-sum-hash' ||
    resolvedTrackKey === 'group-anagrams' ||
    resolvedTrackKey === 'hash-table' ||
    resolvedTrackKey === 'hash-tables';


  // Retrieve exact problem logic or generate dynamic fallback for topicId
  const problemData =
    SPECIFIC_PROBLEM_LOGIC[resolvedTrackKey] ||
    SPECIFIC_PROBLEM_LOGIC[topicKey] || {
      title: `${topicId?.toUpperCase()} Algorithm Execution Logic`,
      input: `Topic Module: ${topicId}`,
      goal: `Step-by-step state transition breakdown for ${topicId}.`,
      terms: {
        'Variable / Pointer': 'Algorithm state variable used to traverse data.',
        'Target Goal': 'Desired computational outcome for this step.'
      },
      array: [1, 2, 3, 4, 5],
      steps: [
        {
          stepNum: 1,
          title: `Step 1: Initialize ${topicId} Execution`,
          left: 0,
          right: 4,
          array: [1, 2, 3, 4, 5],
          computation: `Process input for ${topicId}`,
          comparison: 'Valid State Transition',
          action: 'Execute Step',
          isMatch: true,
          desc: `Execute step-by-step logic and state manipulation for ${topicId}.`
        }
      ]
    };

  return (
    <div className="space-y-8 font-sketch">
      {/* Header & Problem Specification */}
      <div className="sketch-border bg-[var(--sketch-bg-dim)] p-6 rounded-2xl shadow-xl space-y-5">
        <div className="flex items-center gap-3 border-b border-[var(--sketch-border)] pb-4">
          <span className="text-3xl">🧠</span>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-header text-[var(--sketch-accent-orange)]">
              {problemData.title} — Step-by-Step Logic
            </h2>
            <p className="text-sm text-[var(--sketch-text-muted)] font-mono">
              Curated specifically for this active problem with exact state transitions & pointer diagrams
            </p>
          </div>
        </div>

        {/* Input & Goal Details */}
        <div className="grid md:grid-cols-2 gap-5 bg-[var(--sketch-bg)] p-5 rounded-xl border border-[var(--sketch-border)] shadow-md">
          <div>
            <span className="text-sm font-mono text-amber-400 font-extrabold uppercase tracking-wider block mb-1">EXACT PROBLEM INPUT:</span>
            <span className="font-mono text-base md:text-lg text-[var(--sketch-text)] font-extrabold">{problemData.input}</span>
          </div>
          <div>
            <span className="text-sm font-mono text-emerald-400 font-extrabold uppercase tracking-wider block mb-1">TARGET GOAL:</span>
            <span className="text-base md:text-lg text-[var(--sketch-text)] font-bold leading-relaxed">{problemData.goal}</span>
          </div>
        </div>

        {/* Chalkboard Styled Key Terminology & Variable Definitions */}
        {problemData.terms && (
          <div className="sketch-panel-box sketch-border p-6 rounded-2xl space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-xl md:text-2xl font-header font-extrabold text-[var(--sketch-accent-orange)] border-b border-[var(--sketch-border)] pb-3">
              <span className="text-2xl">🔑</span>
              <span>KEY TERMINOLOGY & POINTER DEFINITIONS</span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(problemData.terms).map(([term, def]) => (
                <div key={term} className="sketch-border bg-[var(--sketch-bg)] p-4 rounded-xl border border-[var(--sketch-border)] shadow-lg space-y-2.5 hover:border-amber-400/60 transition-all">
                  <div className="flex items-center gap-2">
                    <span className="sketch-badge font-mono text-sm md:text-base font-extrabold text-amber-300 bg-amber-500/20 border border-amber-400/50 px-3 py-1 rounded-lg shadow-sm">
                      {term}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-[var(--sketch-text)] font-semibold leading-relaxed font-sketch">
                    {def}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Step Cards */}
      <div className="space-y-6">
        <h3 className="text-2xl md:text-3xl font-bold font-header text-[var(--sketch-text)] flex items-center gap-2">
          <span>📸</span> Problem Step-by-Step Execution Breakdown
        </h3>

        {problemData.steps.map((st, stepIndex) => {
          const stepArray = st.array || problemData.array;

          // Tree diagram state deduction
          const activeNodeVal =
            st.activeNode ??
            (st.leftLabel ? parseInt(st.leftLabel.replace(/\D/g, '')) || null : null) ??
            (st.rightLabel ? parseInt(st.rightLabel.replace(/\D/g, '')) || null : null);

          const visitedMatch = st.computation?.match(/Visited.*\[([\d,\s]+)\]/) || st.desc?.match(/Visited.*\[([\d,\s]+)\]/);
          const visitedSequence = st.visited
            ? st.visited
            : visitedMatch
            ? visitedMatch[1].split(',').map((v) => parseInt(v.trim())).filter((n) => !isNaN(n))
            : [];

          const visitedNodesSet = new Set(visitedSequence);

          // Graph diagram state deduction
          const activeGraphNodeVal =
            st.currNode ??
            (st.leftLabel ? (st.leftLabel.includes('start') || st.leftLabel.includes('0') ? 0 : parseInt(st.leftLabel.replace(/\D/g, ''))) : null);

          const visitedGraphMatch = st.computation?.match(/Visited.*\[([\d,\s]+)\]/) || st.desc?.match(/Visited.*\[([\d,\s]+)\]/);
          const visitedGraphSequence = st.visited
            ? st.visited
            : visitedGraphMatch
            ? visitedGraphMatch[1].split(',').map((v) => parseInt(v.trim())).filter((n) => !isNaN(n))
            : [];

          const visitedGraphNodesSet = new Set(visitedGraphSequence);

          return (
            <div
              key={st.stepNum}
              className={`sketch-border bg-[var(--sketch-bg-dim)] p-6 rounded-2xl shadow-xl transition-all ${
                st.isMatch
                  ? 'border-2 border-emerald-400/80 bg-emerald-950/20 shadow-emerald-500/20'
                  : 'hover:border-amber-500/50'
              }`}
            >
              {/* Step Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-[var(--sketch-border)] pb-3">
                <div className="flex items-center gap-3">
                  <span className={`w-10 h-10 rounded-xl font-header font-extrabold text-xl flex items-center justify-center border shadow-sm ${
                    st.isMatch ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400' : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  }`}>
                    #{st.stepNum}
                  </span>
                  <h4 className="text-xl md:text-2xl font-bold font-header text-[var(--sketch-text)]">
                    {st.title}
                  </h4>
                </div>

                <span className={`px-3.5 py-1.5 rounded-full text-sm font-mono font-extrabold border ${
                  st.isMatch ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400' : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                }`}>
                  {st.action}
                </span>
              </div>

              {/* Visual State Diagram Render */}
              <div className="my-5 sketch-canvas-box sketch-border relative p-6 pt-8 pb-16 min-h-[260px] flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute top-3 left-4 text-xs font-mono text-[var(--sketch-text-muted)] font-bold">
                  Step Visual Canvas Diagram (State at Step #{st.stepNum})
                </div>

                {st.cellGrid ? (
                  /* Generic grid renderer — see CELL_STYLE. Keyed on cellGrid so
                     any grid-based track reuses it without a new branch. */
                  <div className="flex flex-col items-center w-full my-2">
                    <div className="inline-block sketch-border rounded-2xl p-3 bg-[var(--sketch-bg)]">
                      {st.cellGrid.map((row, r) => (
                        <div key={r} className="flex">
                          {row.map((cellObj, c) => {
                            const isCursor = st.cursor && st.cursor[0] === r && st.cursor[1] === c;
                            const tone = CELL_STYLE[cellObj.s] ?? CELL_STYLE.water;
                            return (
                              <div
                                key={`${r}-${c}`}
                                className={`w-14 h-14 md:w-16 md:h-16 m-0.5 rounded-xl border-2 flex items-center justify-center font-mono text-lg md:text-xl transition-all ${tone} ${
                                  isCursor ? 'ring-4 ring-amber-400/60 scale-105 z-10' : ''
                                }`}
                              >
                                {cellObj.v}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 w-full flex flex-wrap items-center justify-between gap-2 bg-[var(--sketch-bg)] px-4 py-2 rounded-xl border border-[var(--sketch-border)] font-mono text-xs shadow-md">
                      <div className="flex items-center gap-4">
                        {st.islands !== undefined && (
                          <span className="text-amber-400 font-bold">
                            islands: <span className="text-emerald-300">{st.islands}</span>
                          </span>
                        )}
                        {st.cursor && (
                          <span className="text-slate-400">
                            at ({st.cursor[0]}, {st.cursor[1]})
                          </span>
                        )}
                      </div>
                      <span className="text-slate-500">{st.comparison}</span>
                    </div>

                    <div className="flex items-center justify-center gap-4 mt-3 text-[11px] font-mono text-slate-400">
                      <span><span className="text-emerald-300">\u25A0</span> land</span>
                      <span><span className="text-amber-300">\u25A0</span> flooding</span>
                      <span><span className="text-slate-500">\u25A0</span> sunk / water</span>
                    </div>
                  </div>
                ) : st.nodes ? (
                  /* 0. Trie Canvas Diagram — mirrors the binary-tree branch
                     below: no tinted panel, dashed SVG edges that light amber
                     along the active path, and absolutely positioned nodes. */
                  (() => {
                    const { pos, width, height } = layoutTrieNodes(st.nodes);
                    const pathIds = new Set(st.pathIds || []);
                    const subtreeIds = new Set(st.subtreeIds || []);
                    return (
                      <div className="flex flex-col items-center w-full my-2">
                        {st.word ? (
                          <div className="flex items-center gap-1.5 mb-3">
                            {[...st.word].map((ch, i) => (
                              <span
                                key={i}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm border-2 transition-all ${
                                  i === st.charIndex
                                    ? '!border-amber-400 !bg-amber-500/30 text-amber-300 font-bold'
                                    : i < st.charIndex
                                    ? '!border-emerald-400/80 !bg-emerald-500/20 text-emerald-300'
                                    : 'border-[var(--sketch-border)] bg-[var(--sketch-bg-dim)] text-slate-400'
                                }`}
                              >
                                {ch}
                              </span>
                            ))}
                          </div>
                        ) : null}

                        <div className="relative my-1" style={{ width, height, minWidth: width }}>
                          <svg className="absolute inset-0 pointer-events-none" width={width} height={height}>
                            {st.nodes.map((n) => {
                              if (!n.parentId) return null;
                              const a = pos.get(n.parentId);
                              const b = pos.get(n.id);
                              if (!a || !b) return null;
                              const isEdgeActive = pathIds.has(n.id) && pathIds.has(n.parentId);
                              const isEdgeMatch = subtreeIds.has(n.id) && subtreeIds.has(n.parentId);
                              return (
                                <line
                                  key={`te-${n.id}`}
                                  x1={a.x + TRIE_NODE / 2}
                                  y1={a.y + TRIE_NODE - 2}
                                  x2={b.x + TRIE_NODE / 2}
                                  y2={b.y + 2}
                                  stroke={isEdgeMatch ? '#10b981' : isEdgeActive ? '#f59e0b' : 'var(--sketch-border)'}
                                  strokeWidth={isEdgeActive || isEdgeMatch ? '3' : '2'}
                                  strokeDasharray={isEdgeActive || isEdgeMatch ? 'none' : '3 3'}
                                />
                              );
                            })}
                          </svg>

                          {st.nodes.map((n) => {
                            const pt = pos.get(n.id);
                            if (!pt) return null;
                            const isActive = st.activeId === n.id;
                            const isCreated = st.createdId === n.id;
                            const inSubtree = subtreeIds.has(n.id);
                            const onPath = pathIds.has(n.id);

                            let tone = 'border-[var(--sketch-border)] bg-[var(--sketch-bg-dim)] text-slate-300';
                            if (inSubtree) tone = '!border-emerald-400/80 !bg-emerald-500/20 text-emerald-300';
                            else if (onPath) tone = '!border-amber-400/50 bg-[var(--sketch-bg-dim)] text-slate-200';
                            if (isCreated) tone = '!border-sky-400 !bg-sky-500/30 text-sky-300 ring-4 ring-sky-400/40 shadow-lg shadow-sky-500/40';
                            else if (isActive) tone = '!border-amber-400 !bg-amber-500/30 text-amber-300 ring-4 ring-amber-400/40 shadow-lg shadow-amber-500/40';

                            return (
                              <div
                                key={n.id}
                                style={{ left: `${pt.x}px`, top: `${pt.y}px`, width: TRIE_NODE, height: TRIE_NODE }}
                                className="absolute flex flex-col items-center"
                              >
                                <div
                                  className={`w-10 h-10 rounded-full flex items-center justify-center font-header font-extrabold text-base border-2 transition-all ${tone}`}
                                >
                                  {n.parentId === null ? <span className="text-[9px] font-mono">root</span> : n.char}
                                </div>
                                {n.isEnd ? (
                                  <span className="absolute -bottom-3.5 text-[8px] font-mono font-bold text-emerald-400">
                                    END
                                  </span>
                                ) : null}
                              </div>
                            );
                          })}
                        </div>

                        <div className="mt-4 w-full flex flex-wrap items-center justify-between gap-2 bg-[var(--sketch-bg)] px-4 py-2 rounded-xl border border-[var(--sketch-border)] font-mono text-xs shadow-md">
                          <div className="flex items-center gap-3">
                            <span className="text-amber-400 font-bold">Trie State:</span>
                            <span className="text-slate-400">{st.nodes.length} nodes</span>
                            <span className="text-emerald-300">
                              {st.nodes.filter((n) => n.isEnd).length} word{st.nodes.filter((n) => n.isEnd).length === 1 ? '' : 's'} stored
                            </span>
                          </div>
                          {st.missingChar ? (
                            <span className="text-rose-400">no child &apos;{st.missingChar}&apos; → dead end</span>
                          ) : (
                            <span className="text-slate-500">{st.comparison}</span>
                          )}
                        </div>
                      </div>
                    );
                  })()
                ) : st.grid ? (
                  /* 1. 4x4 Sudoku Grid Diagram */
                  <div className="grid grid-cols-4 gap-2.5 my-3 bg-slate-950/90 p-4 rounded-2xl border-2 border-[var(--sketch-border)] shadow-2xl">
                    {st.grid.map((rowArr, rIdx) =>
                      rowArr.map((num, cIdx) => {
                        const isCurrentCell = st.activeCell && st.activeCell[0] === rIdx && st.activeCell[1] === cIdx;
                        const isConflict = st.conflictCell && st.conflictCell[0] === rIdx && st.conflictCell[1] === cIdx;
                        return (
                          <div
                            key={`${rIdx}-${cIdx}`}
                            className={`w-12 h-12 md:w-16 md:h-16 rounded-xl flex flex-col items-center justify-center font-mono text-lg md:text-2xl font-bold border-2 relative transition-all ${
                              isConflict
                                ? 'border-rose-400 bg-rose-500/30 text-rose-300 shadow-lg shadow-rose-500/40 ring-2 ring-rose-400'
                                : isCurrentCell
                                ? 'border-amber-400 bg-amber-500/25 text-amber-300 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400'
                                : num !== 0
                                ? 'border-[var(--sketch-border)] bg-[var(--sketch-bg)] text-amber-400'
                                : 'border-dashed border-slate-700 text-slate-600 bg-[var(--sketch-bg-dim)]'
                            }`}
                          >
                            {num !== 0 ? num : ''}
                            <span className="text-[9px] text-slate-500 absolute bottom-1 right-1 font-mono">
                              {rIdx},{cIdx}
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>
                ) : st.board ? (
                  /* 2. 4x4 N-Queens Chessboard Diagram */
                  <div className="grid grid-cols-4 gap-2.5 my-3 bg-slate-950/90 p-4 rounded-2xl border-2 border-[var(--sketch-border)] shadow-2xl">
                    {st.board.map((rowArr, rIdx) =>
                      rowArr.map((cell, cIdx) => {
                        const isQueen = cell === 1;
                        const isConflict = st.conflictCell && st.conflictCell[0] === rIdx && st.conflictCell[1] === cIdx;
                        const isCurrentRowCol = st.left === rIdx && st.right === cIdx;
                        const isLightSquare = (rIdx + cIdx) % 2 === 0;

                        return (
                          <div
                            key={`${rIdx}-${cIdx}`}
                            className={`w-12 h-12 md:w-16 md:h-16 rounded-xl flex flex-col items-center justify-center font-mono text-xl md:text-2xl font-bold border-2 relative transition-all ${
                              isConflict
                                ? 'bg-rose-500/30 border-rose-400 text-rose-300 shadow-lg shadow-rose-500/40 ring-2 ring-rose-400'
                                : isQueen
                                ? 'bg-amber-500/30 border-amber-400 text-amber-300 shadow-lg shadow-amber-500/40 ring-2 ring-amber-400'
                                : isCurrentRowCol
                                ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
                                : isLightSquare
                                ? 'bg-[var(--sketch-bg)] border-[var(--sketch-border)] text-slate-400'
                                : 'bg-[var(--sketch-bg-dim)] border-[var(--sketch-border)] text-slate-500'
                            }`}
                          >
                            {isQueen ? '👑' : isConflict ? '❌' : ''}
                            <span className="text-[9px] text-slate-500 absolute bottom-1 right-1 font-mono">
                              {rIdx},{cIdx}
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>
                ) : st.subsets ? (
                  /* 3. Subsets Path & Power Set Diagram */
                  <div className="flex flex-col items-center gap-4 my-2">
                    <div className="sketch-border bg-[var(--sketch-bg)] p-4 rounded-2xl border border-[var(--sketch-border)] text-center shadow-lg">
                      <span className="text-xs text-[var(--sketch-text-muted)] block mb-1 font-mono font-bold">CURRENT SUBSET PATH:</span>
                      <span className="text-xl font-bold font-mono text-amber-400">
                        [{(st.currentSubset || []).join(', ')}]
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg">
                      <span className="text-xs font-mono text-[var(--sketch-text-muted)] w-full text-center font-bold">GENERATED SUBSETS IN POWER SET:</span>
                      {st.subsets.map((sub, idx) => (
                        <span key={idx} className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-xl text-xs font-mono font-bold">
                          [{sub.join(', ')}]
                        </span>
                      ))}
                    </div>
                  </div>
                ) : isTreeTopic ? (
                  /* 4. Binary Tree Canvas Diagram */
                  <div className="flex flex-col items-center w-full my-2">
                    <div className="relative w-full max-w-[480px] h-[210px] my-1">
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {TREE_DIAGRAM_EDGES.map((edge) => {
                          const parentNode = TREE_DIAGRAM_NODES.find((n) => n.id === edge.from);
                          const childNode = TREE_DIAGRAM_NODES.find((n) => n.id === edge.to);
                          if (!parentNode || !childNode) return null;

                          const isEdgeVisited = visitedNodesSet.has(edge.from) && visitedNodesSet.has(edge.to);
                          const isEdgeActive =
                            isEdgeVisited ||
                            activeNodeVal === edge.to ||
                            (activeNodeVal === edge.from && (st.desc?.includes(String(edge.to)) || st.action?.includes(String(edge.to))));

                          return (
                            <line
                              key={`${edge.from}-${edge.to}`}
                              x1={parentNode.x}
                              y1={parentNode.y + 18}
                              x2={childNode.x}
                              y2={childNode.y - 18}
                              stroke={isEdgeActive ? '#f59e0b' : 'var(--sketch-border)'}
                              strokeWidth={isEdgeActive ? '3' : '2'}
                              strokeDasharray={isEdgeActive ? 'none' : '3 3'}
                            />
                          );
                        })}
                      </svg>

                      {/* Tree Node Elements */}
                      {TREE_DIAGRAM_NODES.map((node) => {
                        const isActiveNode = activeNodeVal === node.id;
                        const isVisitedNode = visitedNodesSet.has(node.id);
                        const isMatchNode = st.isMatch && isActiveNode;

                        return (
                          <div
                            key={node.id}
                            style={{ left: `${node.x - 20}px`, top: `${node.y - 20}px` }}
                            className="absolute flex flex-col items-center"
                          >
                            {/* Active Pointer Badge above node */}
                            {isActiveNode && (
                              <div className="absolute -top-6 z-10 px-2 py-0.5 rounded-md bg-amber-500 text-black font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                                🔍 {st.leftLabel || `node ${node.val}`}
                              </div>
                            )}

                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center font-header font-extrabold text-base border-2 transition-all ${
                                isMatchNode
                                  ? '!border-emerald-400 !bg-emerald-500/30 text-emerald-300 ring-4 ring-emerald-400/40 shadow-lg shadow-emerald-500/40'
                                  : isActiveNode
                                  ? '!border-amber-400 !bg-amber-500/30 text-amber-300 ring-4 ring-amber-400/40 shadow-lg shadow-amber-500/40'
                                  : isVisitedNode
                                  ? '!border-emerald-400/80 !bg-emerald-500/20 text-emerald-300'
                                  : 'border-[var(--sketch-border)] bg-[var(--sketch-bg-dim)] text-slate-300'
                              }`}
                            >
                              {node.val}
                            </div>

                            {/* Role Tag */}
                            {node.id === 4 && (
                              <span className="absolute -bottom-4 text-[8px] font-mono font-bold text-amber-400">ROOT</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Visited Sequence Bar */}
                    <div className="mt-3 w-full flex flex-wrap items-center justify-between gap-2 bg-[var(--sketch-bg)] px-4 py-2 rounded-xl border border-[var(--sketch-border)] font-mono text-xs shadow-md">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 font-bold">Visited Traversal Output:</span>
                        <div className="flex items-center gap-1.5">
                          {visitedSequence.length > 0 ? (
                            visitedSequence.map((v, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs">
                                #{i + 1}: {v}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-500 text-xs italic">[ None visited yet ]</span>
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] text-[var(--sketch-text-muted)] font-mono">
                        Active Node: {activeNodeVal ? `Node ${activeNodeVal}` : 'None'}
                      </span>
                    </div>
                  </div>
                ) : isGraphTopic ? (
                  /* 5. 2D Graph Canvas Diagram */
                  <div className="flex flex-col items-center w-full my-2">
                    <div className="relative w-full max-w-[480px] h-[230px] my-1">
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {GRAPH_DIAGRAM_EDGES.map((edge) => {
                          const nodeA = GRAPH_DIAGRAM_NODES.find((n) => n.id === edge.from);
                          const nodeB = GRAPH_DIAGRAM_NODES.find((n) => n.id === edge.to);
                          if (!nodeA || !nodeB) return null;

                          const isEdgeActive =
                            st.activeEdge &&
                            ((st.activeEdge.from === edge.from && st.activeEdge.to === edge.to) ||
                              (st.activeEdge.from === edge.to && st.activeEdge.to === edge.from));

                          const isEdgeVisited = visitedGraphNodesSet.has(edge.from) && visitedGraphNodesSet.has(edge.to);

                          return (
                            <g key={`${edge.from}-${edge.to}`}>
                              <line
                                x1={nodeA.x}
                                y1={nodeA.y}
                                x2={nodeB.x}
                                y2={nodeB.y}
                                stroke={isEdgeActive ? '#f43f5e' : isEdgeVisited ? '#f59e0b' : 'var(--sketch-border)'}
                                strokeWidth={isEdgeActive ? '3.5' : isEdgeVisited ? '2.5' : '1.5'}
                                strokeDasharray={isEdgeActive ? 'none' : isEdgeVisited ? 'none' : '3 3'}
                              />
                              {resolvedTrackKey === 'dijkstra' && (
                                <text
                                  x={(nodeA.x + nodeB.x) / 2}
                                  y={(nodeA.y + nodeB.y) / 2 - 4}
                                  fill="#f59e0b"
                                  fontSize="10"
                                  fontFamily="monospace"
                                  fontWeight="bold"
                                  textAnchor="middle"
                                >
                                  w={edge.weight}
                                </text>
                              )}
                            </g>
                          );
                        })}
                      </svg>

                      {/* Graph Node Elements */}
                      {GRAPH_DIAGRAM_NODES.map((node) => {
                        const isActiveNode = activeGraphNodeVal === node.id;
                        const isVisitedNode = visitedGraphNodesSet.has(node.id);
                        const isCycleAlert = resolvedTrackKey === 'cycle-detection' && st.isMatch && isActiveNode;

                        return (
                          <div
                            key={node.id}
                            style={{ left: `${node.x - 18}px`, top: `${node.y - 18}px` }}
                            className="absolute flex flex-col items-center"
                          >
                            {/* Active Pointer Badge above node */}
                            {isActiveNode && (
                              <div className="absolute -top-6 z-10 px-2 py-0.5 rounded-md bg-amber-500 text-black font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                                🔍 {isCycleAlert ? '⚠️ Cycle!' : `Node ${node.id}`}
                              </div>
                            )}

                            <div
                              className={`w-9 h-9 rounded-full flex items-center justify-center font-header font-extrabold text-sm border-2 transition-all ${
                                isCycleAlert
                                  ? '!border-rose-400 !bg-rose-500/30 text-rose-300 ring-4 ring-rose-400/50 shadow-lg shadow-rose-500/50'
                                  : isActiveNode
                                  ? '!border-amber-400 !bg-amber-500/30 text-amber-300 ring-4 ring-amber-400/40 shadow-lg shadow-amber-500/40'
                                  : isVisitedNode
                                  ? '!border-emerald-400/80 !bg-emerald-500/20 text-emerald-300'
                                  : 'border-[var(--sketch-border)] bg-[var(--sketch-bg-dim)] text-slate-300'
                              }`}
                            >
                              {node.id}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Visited / Queue / Distance Status Bar */}
                    <div className="mt-3 w-full flex flex-wrap items-center justify-between gap-2 bg-[var(--sketch-bg)] px-4 py-2 rounded-xl border border-[var(--sketch-border)] font-mono text-xs shadow-md">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 font-bold">Traversal Order / Visited:</span>
                        <div className="flex items-center gap-1.5">
                          {visitedGraphSequence.length > 0 ? (
                            visitedGraphSequence.map((v, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs">
                                #{i + 1}: Node {v}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-500 text-xs italic">[ None visited ]</span>
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] text-[var(--sketch-text-muted)] font-mono">
                        Active Node: {activeGraphNodeVal !== null ? `Node ${activeGraphNodeVal}` : 'None'}
                      </span>
                    </div>
                  </div>
                ) : isHeapTopic ? (
                  /* 6. Real Binary Heap Tree Diagram */
                  <div className="flex flex-col items-center w-full my-2">
                    <div className="relative w-full max-w-[500px] h-[230px] my-1">
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {(st.heapArray || stepArray).map((_, idx) => {
                          if (idx === 0) return null;
                          const parentIdx = Math.floor((idx - 1) / 2);
                          const posNode = HEAP_DIAGRAM_POSITIONS[idx];
                          const posParent = HEAP_DIAGRAM_POSITIONS[parentIdx];
                          if (!posNode || !posParent) return null;

                          const isSwappingEdge =
                            st.swapNodes &&
                            ((st.swapNodes.parent === parentIdx && st.swapNodes.child === idx) ||
                              (st.swapNodes.parent === idx && st.swapNodes.child === parentIdx));

                          return (
                            <line
                              key={`edge-${idx}`}
                              x1={posParent.x}
                              y1={posParent.y}
                              x2={posNode.x}
                              y2={posNode.y}
                              stroke={isSwappingEdge ? '#f43f5e' : 'var(--sketch-border)'}
                              strokeWidth={isSwappingEdge ? '3.5' : '2'}
                              strokeDasharray={isSwappingEdge ? 'none' : '4 2'}
                            />
                          );
                        })}
                      </svg>

                      {/* Tree Node Circles */}
                      {(st.heapArray || stepArray).map((val, idx) => {
                        const pos = HEAP_DIAGRAM_POSITIONS[idx];
                        if (!pos) return null;

                        const isActive = st.currNode === idx;
                        const isSwapping =
                          st.swapNodes && (st.swapNodes.parent === idx || st.swapNodes.child === idx);

                        return (
                          <div
                            key={`node-${idx}`}
                            style={{ left: `${pos.x - 20}px`, top: `${pos.y - 20}px` }}
                            className="absolute flex flex-col items-center"
                          >
                            {/* Floating Action Badge */}
                            {isSwapping && (
                              <div className="absolute -top-6 z-20 px-2 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold shadow-lg shadow-rose-500/50 whitespace-nowrap">
                                🔄 Swap
                              </div>
                            )}

                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center font-header font-bold text-base border-2 transition-all relative ${
                                isSwapping
                                  ? '!border-rose-400 !bg-rose-500/30 text-rose-300 ring-4 ring-rose-400/50 shadow-rose-500/50'
                                  : isActive
                                  ? '!border-amber-400 !bg-amber-500/30 text-amber-300 ring-4 ring-amber-400/40 shadow-amber-500/50'
                                  : 'border-[var(--sketch-border)] bg-[var(--sketch-bg-dim)] text-[var(--sketch-text)]'
                              }`}
                            >
                              {String(val)}
                            </div>

                            {/* Node Index Tag */}
                            <span className="text-[10px] font-mono text-[var(--sketch-text-muted)] mt-0.5">[{idx}]</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Underlying Heap Array Memory Inspector */}
                    <div className="mt-3 w-full flex flex-wrap items-center justify-between gap-2 bg-[var(--sketch-bg)] px-4 py-2 rounded-xl border border-[var(--sketch-border)] font-mono text-xs shadow-md">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 font-bold">Heap Array:</span>
                        <div className="flex items-center gap-1.5 font-bold">
                          {(st.heapArray || stepArray).map((v, i) => (
                            <span
                              key={i}
                              className={`px-2 py-0.5 rounded-md text-xs border ${
                                st.currNode === i
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                                  : st.swapNodes && (st.swapNodes.parent === i || st.swapNodes.child === i)
                                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                                  : 'bg-white/5 text-[var(--sketch-text)] border-white/10'
                              }`}
                            >
                              {v}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] text-[var(--sketch-text-muted)] font-mono">
                        Active Node: {st.currNode !== undefined ? `Index ${st.currNode}` : 'None'}
                      </span>
                    </div>
                  </div>
                ) : isRecursionTopic ? (
                  /* 6. Real Call Stack / Tower of Hanoi / Subsets Diagram */
                  <div className="flex flex-col items-center w-full my-2">
                    {resolvedTrackKey === 'tower-of-hanoi' ? (
                      /* Tower of Hanoi Diagram */
                      <div className="w-full max-w-[500px] flex flex-col items-center gap-3">
                        {st.move?.disk && (
                          <div className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-mono font-bold text-xs shadow-md">
                            🔄 Move #{st.move.stepNum}: Disk {st.move.disk} ({st.move.from} ➔ {st.move.to})
                          </div>
                        )}
                        <div className="w-full flex items-end justify-between px-4 h-[210px] pb-2 bg-slate-950/80 rounded-2xl border border-white/10 p-3 shadow-2xl">
                          {[
                            { key: 'A', name: 'Peg A (Src)' },
                            { key: 'B', name: 'Peg B (Aux)' },
                            { key: 'C', name: 'Peg C (Dst)' },
                          ].map(({ key: pegKey, name }) => (
                            <div key={pegKey} className="relative flex flex-col items-center w-32">
                              {/* Rod */}
                              <div className="w-3 h-40 bg-gradient-to-b from-amber-400 via-amber-600 to-amber-700 rounded-t-md absolute bottom-0 z-0 border border-amber-300/30"></div>

                              {/* Stacked Disks */}
                              <div className="flex flex-col-reverse items-center gap-1.5 z-10 mb-1 w-full">
                                {st.pegs?.[pegKey]?.map((diskSize) => {
                                  const diskWidths = { 1: 'w-12', 2: 'w-20', 3: 'w-26' };
                                  const diskColors = {
                                    1: 'bg-emerald-500/30 border-emerald-400 text-emerald-300',
                                    2: 'bg-amber-500/30 border-amber-400 text-amber-300',
                                    3: 'bg-rose-500/30 border-rose-400 text-rose-300',
                                  };
                                  const isMoving = st.move?.disk === diskSize;

                                  return (
                                    <div
                                      key={`disk-${diskSize}`}
                                      className={`h-7 rounded-xl border-2 flex items-center justify-center font-header font-bold text-xs shadow-md ${
                                        diskWidths[diskSize]
                                      } ${diskColors[diskSize]} ${
                                        isMoving ? 'ring-4 ring-rose-400' : ''
                                      }`}
                                    >
                                      Disk {diskSize}
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Base Label */}
                              <div className="w-full h-4 bg-[var(--sketch-bg-dim)] border border-[var(--sketch-border)] rounded-md text-center text-[10px] font-mono font-bold text-amber-400">
                                {name}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Hanoi Status Bar */}
                        <div className="w-full flex items-center justify-between bg-[var(--sketch-bg)] px-4 py-2 rounded-xl border border-[var(--sketch-border)] font-mono text-xs shadow-md">
                          <span className="text-amber-400 font-bold">
                            Total Moves: {st.move?.stepNum || 0} / 7
                          </span>
                          <span className="text-emerald-400 font-bold">
                            Rule: $2^n - 1$ = 7 Optimal Moves
                          </span>
                        </div>
                      </div>
                    ) : resolvedTrackKey === 'subsets' ? (
                      /* Subsets Decision Tree & Grid Diagram */
                      <div className="w-full max-w-[500px] flex flex-col items-center gap-3">
                        <div className="w-full bg-slate-950/80 border-2 border-amber-500/40 rounded-2xl p-3 flex flex-col gap-2 shadow-2xl">
                          <div className="flex items-center justify-between text-xs font-mono text-[var(--sketch-text-muted)]">
                            <span className="text-amber-400 font-bold uppercase tracking-wider">
                              Decision Buffer Path:
                            </span>
                            <span>Idx: {st.currIdx !== undefined ? st.currIdx : 0} / 2</span>
                          </div>

                          <div className="flex items-center gap-2 min-h-[38px] bg-black/40 p-2 rounded-xl border border-white/10">
                            <span className="font-mono text-slate-500 text-sm font-bold">[</span>
                            {st.currPath && st.currPath.length > 0 ? (
                              st.currPath.map((val, idx) => (
                                <span
                                  key={idx}
                                  className="px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/50 font-header font-bold text-xs shadow-sm"
                                >
                                  {val}
                                </span>
                              ))
                            ) : (
                              <span className="text-slate-500 text-xs italic font-mono">
                                (empty path set [])
                              </span>
                            )}
                            <span className="font-mono text-slate-500 text-sm font-bold">]</span>
                          </div>
                        </div>

                        {/* Subsets Collection Grid */}
                        <div className="w-full bg-[var(--sketch-bg)] border border-[var(--sketch-border)] rounded-xl p-3 flex flex-col gap-2 font-mono text-xs shadow-md">
                          <div className="flex items-center justify-between text-[var(--sketch-text-muted)]">
                            <span className="text-emerald-400 font-bold">
                              Subsets Collected ({st.subsets ? st.subsets.length : 0} / 4):
                            </span>
                            <span className="text-[10px]">Total $2^N$ subsets</span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            {st.subsets?.map((sub, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs shadow-sm"
                              >
                                #{i + 1}: [{sub.join(', ')}]
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Call Stack LIFO Container (Factorial & Fibonacci) */
                      <div className="w-full max-w-[480px] my-1">
                        <div className="flex flex-col items-center">
                          <div className="w-80 border-b-4 border-x-4 border-amber-500/50 rounded-b-2xl bg-slate-950/80 p-4 min-h-[220px] flex flex-col items-center justify-start gap-2 shadow-2xl relative">
                            <span className="text-[10px] font-mono text-[var(--sketch-text-muted)] tracking-wider font-bold uppercase mb-1">
                              Execution Call Stack (LIFO)
                            </span>

                            {(st.callStack && st.callStack.length > 0
                              ? st.callStack
                              : [{ fn: `recurse(${st.n || 4})` }]
                            ).map((frame, idx) => {
                              const isTop = idx === 0;
                              return (
                                <div
                                  key={idx}
                                  className={`w-full py-2 px-3 rounded-xl border-2 flex items-center justify-between font-mono text-xs shadow-md relative transition-all ${
                                    isTop
                                      ? '!border-amber-400 !bg-amber-500/25 text-amber-300 ring-2 ring-amber-400/50 shadow-amber-500/40 font-bold'
                                      : 'border-white/10 bg-white/5 text-[var(--sketch-text)]'
                                  }`}
                                >
                                  <span className="text-[10px] text-[var(--sketch-text-muted)]">Frame #{st.callStack ? st.callStack.length - idx : 1}</span>
                                  <span className="text-sm font-bold">{frame.fn}</span>

                                  {frame.ret && (
                                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                                      ➔ {frame.ret}
                                    </span>
                                  )}

                                  {isTop && (
                                    <span className="absolute -right-14 text-amber-400 font-mono text-[10px] font-bold">
                                      ◀ TOP
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Stack Depth Inspector */}
                        <div className="mt-3 w-full flex flex-wrap items-center justify-between gap-2 bg-[var(--sketch-bg)] px-4 py-2 rounded-xl border border-[var(--sketch-border)] font-mono text-xs shadow-md">
                          <div className="flex items-center gap-2">
                            <span className="text-amber-400 font-bold">Call Stack Depth:</span>
                            <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold text-xs">
                              {st.callStack ? st.callStack.length : 1} Frame(s)
                            </span>
                          </div>
                          <span className="text-emerald-400 font-bold">
                            Phase: {st.state?.phase || (st.isMatch ? 'Complete 🎉' : 'Running')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : isDPTopic ? (
                  /* DP Memoization Table Diagram */
                  <div className="flex flex-col items-center w-full my-2">
                    {st.dp2D || (resolvedTrackKey === 'knapsack' || resolvedTrackKey === 'lcs') ? (
                      /* 2D DP Table Grid */
                      <div className="w-full max-w-[680px] my-1">
                        <div className="overflow-x-auto w-full flex justify-center py-2 px-1">
                          <table className="border-collapse font-mono text-xs text-center select-none">
                            <thead>
                              <tr>
                                <th className="p-2 border border-[var(--sketch-border)] text-[var(--sketch-text-muted)] font-bold">i / j</th>
                                {(st.dp2D || stepArray || [0,0,0,0,0,0]).length > 0 && (st.dp2D ? st.dp2D[0] : stepArray).map((_, c) => (
                                  <th key={c} className="p-2 border border-[var(--sketch-border)] text-amber-500 font-bold">{c}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {(st.dp2D || [stepArray]).map((row, r) => (
                                <tr key={r}>
                                  <td className="p-2 border border-[var(--sketch-border)] text-amber-500 font-bold">{r}</td>
                                  {(Array.isArray(row) ? row : [row]).map((val, c) => {
                                    const isActive = st.activeCell && st.activeCell.r === r && st.activeCell.c === c;
                                    const isDep = st.depCells?.some((d) => d.r === r && d.c === c);

                                    return (
                                      <td
                                        key={c}
                                        className={`p-2 min-w-[40px] md:min-w-[46px] border border-[var(--sketch-border)] font-bold transition-all ${
                                          isActive
                                            ? 'bg-amber-500/30 text-amber-500 border-amber-400 ring-2 ring-amber-400/50 shadow-lg'
                                            : isDep
                                            ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border-cyan-400'
                                            : 'bg-[var(--sketch-bg-dim)] text-[var(--sketch-text)]'
                                        }`}
                                      >
                                        {val !== null && val !== undefined ? val : '∅'}
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* DP 2D Status Bar */}
                        <div className="mt-3 w-full flex flex-wrap items-center justify-between gap-2 bg-[var(--sketch-bg)] px-4 py-2 rounded-xl border border-[var(--sketch-border)] font-mono text-xs shadow-md">
                          <div className="flex items-center gap-2">
                            <span className="text-amber-400 font-bold">Active Cell:</span>
                            <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold text-xs">
                              {st.activeCell ? `dp[${st.activeCell.r}][${st.activeCell.c}]` : 'None'}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Active</span>
                            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> Dependency</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* 1D DP Array Diagram */
                      <div className="w-full max-w-[760px] my-1">
                        <div className="flex items-stretch gap-1.5 md:gap-2 w-full pt-3 pb-8 px-2 overflow-x-auto justify-center">
                          {(st.dp1D || stepArray).map((val, idx) => {
                            const isActive = st.activeCell === idx;
                            const isDep = st.depCells?.includes(idx);

                            return (
                              <div key={idx} className="relative flex flex-col items-center flex-1 min-w-[38px] md:min-w-[46px]">
                                <div
                                  style={{
                                    transform: isActive ? 'scale(1.08) translateY(-4px)' : isDep ? 'scale(1.03)' : 'scale(1)',
                                    transition: 'transform 0.3s ease',
                                  }}
                                  className={`w-full h-14 md:h-16 rounded-xl border-2 flex flex-col items-center justify-center gap-0.5 ${
                                    isActive
                                      ? 'border-amber-400 bg-amber-500/25 text-amber-500 ring-2 ring-amber-400/50 shadow-lg shadow-amber-500/30 font-bold'
                                      : isDep
                                      ? 'border-cyan-400 bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 shadow-md shadow-cyan-500/20'
                                      : 'border-[var(--sketch-border)] bg-[var(--sketch-bg-dim)] text-[var(--sketch-text)]'
                                  }`}
                                >
                                  <span className="text-base md:text-lg font-bold font-header">{val !== null && val !== undefined ? val : '∅'}</span>
                                  <span className="text-[10px] font-mono text-[var(--sketch-text-muted)]">[{idx}]</span>
                                </div>

                                {isActive && (
                                  <div className="absolute -bottom-6 flex flex-col items-center text-amber-500 font-bold">
                                    <div className="text-[9px] font-mono">curr</div>
                                    <div className="text-[9px] leading-none">▲</div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* DP 1D Formula Bar */}
                        <div className="mt-2 w-full flex flex-wrap items-center justify-between gap-2 bg-[var(--sketch-bg)] px-4 py-2 rounded-xl border border-[var(--sketch-border)] font-mono text-xs shadow-md">
                          <div className="flex items-center gap-2">
                            <span className="text-amber-400 font-bold">Formula:</span>
                            <span className="text-[var(--sketch-text)] font-bold">
                              {st.state?.formula ||
                                st.state?.calculation ||
                                st.state?.tryCoin5 ||
                                (resolvedTrackKey === 'coin-change'
                                  ? 'dp[i] = min(dp[i], dp[i - coin] + 1)'
                                  : 'dp[i] = dp[i-1] + dp[i-2]')}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Active</span>
                            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> Dependency</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : isHashTableTopic ? (
                  /* Hash Table Bucket & Chain / Probing Diagram */
                  <div className="flex flex-col items-center w-full my-2">
                    {st.buckets || resolvedTrackKey === 'separate-chaining' || resolvedTrackKey === 'hash-table' || resolvedTrackKey === 'hash-tables' ? (
                      /* Separate Chaining Buckets Diagram */
                      <div className="w-full max-w-[520px] my-1 space-y-2">
                        {(st.buckets || Array(8).fill(null).map(() => [])).map((chain, bIdx) => {
                          const isActiveBucket = st.hashIdx === bIdx;

                          return (
                            <div key={bIdx} className="flex items-center gap-3 font-mono text-xs">
                              <div
                                className={`w-14 py-1.5 text-center rounded-lg border font-bold transition-all ${
                                  isActiveBucket
                                    ? 'border-amber-400 bg-amber-500/25 text-amber-500 ring-2 ring-amber-400/50 shadow-md'
                                    : 'border-[var(--sketch-border)] bg-[var(--sketch-bg-dim)] text-[var(--sketch-text-muted)]'
                                }`}
                              >
                                [{bIdx}]
                              </div>

                              <div className="flex-1 flex items-center gap-1.5 overflow-x-auto sketch-no-scrollbar min-h-[32px]">
                                {!chain || chain.length === 0 ? (
                                  <span className="text-[var(--sketch-text-muted)] text-[10px]">∅ Empty</span>
                                ) : (
                                  chain.map((node, nIdx) => (
                                    <div key={nIdx} className="flex items-center gap-1 shrink-0">
                                      <div className="px-2.5 py-1 rounded-lg border-2 border-emerald-500/40 bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-bold flex items-center gap-1 text-xs shadow-sm">
                                        <span>"{node.key}"</span>
                                        <span className="text-amber-500">:{node.val}</span>
                                      </div>
                                      {nIdx < chain.length - 1 && (
                                        <span className="text-amber-500 font-bold text-sm">→</span>
                                      )}
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          );
                        })}

                        {/* Chaining Status Bar */}
                        <div className="mt-3 w-full flex flex-wrap items-center justify-between gap-2 bg-[var(--sketch-bg)] px-4 py-2 rounded-xl border border-[var(--sketch-border)] font-mono text-xs shadow-md">
                          <div className="flex items-center gap-2">
                            <span className="text-amber-400 font-bold">Hash Index:</span>
                            <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                              {st.hashIdx !== null && st.hashIdx !== undefined ? `Bucket [${st.hashIdx}]` : 'None'}
                            </span>
                          </div>
                          {st.collision && (
                            <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 font-bold animate-pulse text-[10px]">
                              ⚠️ Collision!
                            </span>
                          )}
                        </div>
                      </div>
                    ) : st.openBuckets || resolvedTrackKey === 'linear-probing' ? (
                      /* Linear Probing Open Addressing 1D Array Cards Diagram (Clean Two-Pointers style) */
                      <div className="flex flex-col items-center w-full my-2">
                        <div className="flex items-start gap-3 md:gap-5 my-2 overflow-x-auto overflow-y-visible w-full justify-center pt-4 pb-16">
                          {(st.openBuckets || Array(8).fill(null)).map((val, sIdx) => {
                            const isHash = st.hashIdx === sIdx;
                            const isProbe = st.probeIdx === sIdx;
                            const isBothHashProbe = isHash && isProbe;
                            const isOccupied = val !== null && val !== undefined && val !== '';

                            return (
                              <div key={sIdx} className="relative flex flex-col items-center">
                                <div
                                  className={`sketch-card ${
                                    isBothHashProbe
                                      ? '!border-purple-400 !bg-purple-500/20 shadow-lg shadow-purple-500/40 ring-2 ring-purple-400 text-purple-200 font-bold'
                                      : st.collision && isHash
                                      ? '!border-rose-400 !bg-rose-500/20 shadow-lg shadow-rose-500/40 ring-2 ring-rose-400 text-rose-300 font-bold'
                                      : isHash
                                      ? '!border-amber-400 !bg-amber-500/20 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400 text-amber-300 font-bold'
                                      : isProbe
                                      ? '!border-cyan-400 !bg-cyan-500/20 shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-400 text-cyan-300 font-bold'
                                      : isOccupied
                                      ? 'active-orange !border-amber-400/80 !bg-amber-500/10 text-amber-200 font-bold'
                                      : ''
                                  }`}
                                >
                                  {isOccupied ? `"${val}"` : '∅'}
                                  <div className="sketch-card-index">[{sIdx}]</div>
                                </div>

                                {/* Chalkboard Pointer Badges (Clean Two-Pointers Style) */}
                                {isBothHashProbe ? (
                                  <div className="sketch-pointer text-purple-300 font-bold mt-2 flex flex-col items-center">
                                    <div className="font-bold">hash, probe</div>
                                    <div className="text-xs leading-none">▲</div>
                                  </div>
                                ) : isHash ? (
                                  <div className="sketch-pointer sketch-pointer-orange mt-2 flex flex-col items-center">
                                    <div className="font-bold">hash</div>
                                    <div className="text-xs leading-none">▲</div>
                                  </div>
                                ) : isProbe ? (
                                  <div className="sketch-pointer sketch-pointer-blue mt-2 flex flex-col items-center">
                                    <div className="font-bold">probe</div>
                                    <div className="text-xs leading-none">▲</div>
                                  </div>
                                ) : null}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : st.anagramGroups || resolvedTrackKey === 'group-anagrams' ? (
                      /* Anagram Groups Diagram */
                      <div className="w-full max-w-[480px] mx-auto bg-[var(--sketch-bg-dim)] border border-[var(--sketch-border)] p-4 rounded-2xl font-mono text-xs space-y-3 shadow-lg">
                        {/* Input Words List */}
                        <div className="flex items-center justify-between border-b border-[var(--sketch-border)] pb-2">
                          <span className="text-[var(--sketch-text-muted)] font-bold">Input Words:</span>
                          <div className="flex items-center gap-1.5">
                            {(st.words || ['eat', 'tea', 'tan', 'ate']).map((w, i) => (
                              <span
                                key={i}
                                className={`px-2 py-0.5 rounded-lg border text-xs font-bold ${
                                  st.currWord === w
                                    ? 'border-amber-400 bg-amber-500/25 text-amber-300 ring-1 ring-amber-400'
                                    : 'border-white/10 bg-white/5 text-[var(--sketch-text)]'
                                }`}
                              >
                                "{w}"
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="text-amber-500 font-bold flex justify-between items-center">
                          <span>Canonical Key Anagram Groups Map</span>
                          <span className="text-[10px] text-[var(--sketch-text-muted)]">
                            Size: {st.anagramGroups ? Object.keys(st.anagramGroups).length : 0}
                          </span>
                        </div>

                        {!st.anagramGroups || Object.keys(st.anagramGroups).length === 0 ? (
                          <div className="text-[var(--sketch-text-muted)] text-[11px] italic text-center py-3 bg-[var(--sketch-bg)] rounded-lg border border-dashed border-[var(--sketch-border)]">
                            (Empty Hash Map — No anagram groups formed yet)
                          </div>
                        ) : (
                          Object.entries(st.anagramGroups).map(([k, group]) => (
                            <div key={k} className="flex items-center justify-between bg-[var(--sketch-bg)] px-3.5 py-2 rounded-xl border border-[var(--sketch-border)] shadow-sm">
                              <span className="text-amber-400 font-bold flex items-center gap-1.5">
                                <span className="text-xs text-[var(--sketch-text-muted)]">Key:</span>
                                "{k}"
                              </span>
                              <span className="text-emerald-400 font-bold">
                                [{group.map((w) => `"${w}"`).join(', ')}]
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    ) : (
                      /* Hash Map State Diagram (Two Sum) */
                      <div className="w-full max-w-[440px] mx-auto space-y-3">
                        {/* Array with current pointer */}
                        <div className="flex items-center gap-2 justify-center">
                          {(st.numArray || [2, 7, 11, 15]).map((val, idx) => {
                            const isCurr = st.currIdx === idx;
                            const isMatch = st.state?.found && (idx === 0 || idx === st.currIdx);
                            return (
                              <div key={idx} className="relative flex flex-col items-center">
                                <div
                                  className={`w-14 h-14 rounded-xl border-2 flex flex-col items-center justify-center font-header font-bold ${
                                    isMatch
                                      ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-400/50 shadow-lg'
                                      : isCurr
                                      ? 'border-amber-400 bg-amber-500/25 text-amber-300 ring-2 ring-amber-400/50'
                                      : 'border-[var(--sketch-border)] bg-[var(--sketch-bg-dim)] text-[var(--sketch-text)]'
                                  }`}
                                >
                                  <span className="text-lg">{val}</span>
                                  <span className="text-[9px] font-mono text-[var(--sketch-text-muted)]">[{idx}]</span>
                                </div>
                                {isCurr && (
                                  <div className="absolute -bottom-5 text-amber-500 font-mono text-[9px] font-bold">
                                    curr ▲
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Map Contents */}
                        <div className="bg-[var(--sketch-bg-dim)] border border-[var(--sketch-border)] p-3 rounded-xl font-mono text-xs space-y-1.5 shadow-lg">
                          <div className="text-amber-500 font-bold border-b border-[var(--sketch-border)] pb-1 mb-1 flex justify-between">
                            <span>Hash Map (num → index)</span>
                            <span>Size: {st.mapState ? Object.keys(st.mapState).length : 0}</span>
                          </div>
                          {!st.mapState || Object.keys(st.mapState).length === 0 ? (
                            <span className="text-[var(--sketch-text-muted)] text-[10px] italic font-mono block text-center py-1">
                              (Empty Map — No entries stored)
                            </span>
                          ) : (
                            Object.entries(st.mapState).map(([k, v]) => (
                              <div key={k} className="flex justify-between items-center bg-[var(--sketch-bg)] px-3 py-1 rounded-lg border border-[var(--sketch-border)]">
                                <span className="text-emerald-600 dark:text-emerald-300 font-bold">Key: {k}</span>
                                <span className="text-amber-500 font-bold">→ Index: {v}</span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : isStackTopic ? (
                  /* 6. Real Vertical Stack Bucket Diagram */
                  <div className="flex flex-col items-center w-full my-2">
                    <div className="w-full max-w-[520px] my-1">
                      <div className="flex flex-col items-center">
                        {/* Vertical Stack Bucket Container */}
                        <div className="w-64 border-b-4 border-x-4 border-amber-500/50 rounded-b-2xl bg-slate-950/80 p-4 min-h-[230px] flex flex-col-reverse items-center gap-2.5 shadow-2xl">
                          {(st.stack && st.stack.length > 0 ? st.stack : []).map((val, idx) => {
                            const isTop = st.top === idx;
                            return (
                              <div
                                key={idx}
                                className={`w-full h-12 rounded-xl flex items-center justify-between px-4 font-header font-bold text-lg border-2 transition-all ${
                                  isTop
                                    ? '!border-amber-400 !bg-amber-500/25 text-amber-300 ring-2 ring-amber-400/50 shadow-lg shadow-amber-500/40'
                                    : 'border-white/20 bg-white/5 text-[var(--sketch-text)]'
                                }`}
                              >
                                <span className="text-xs font-mono text-[var(--sketch-text-muted)]">[{idx}]</span>
                                <span>{String(val)}</span>

                                {isTop && (
                                  <span className="text-xs font-mono font-bold text-amber-400">◀ TOP</span>
                                )}
                              </div>
                            );
                          })}

                          {(!st.stack || st.stack.length === 0) && (
                            <div className="my-auto text-sm font-mono text-[var(--sketch-text-muted)] italic text-center">
                              Stack is Empty (top = -1)
                            </div>
                          )}
                        </div>

                        {/* TOP Pointer Badge */}
                        {st.top !== undefined && st.top >= 0 && (
                          <div className="mt-3 px-3.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-300 font-mono text-xs md:text-sm font-bold shadow-md flex items-center gap-1.5">
                            <span>▲ TOP Pointer:</span>
                            <span className="text-white bg-amber-500/40 px-2 py-0.5 rounded">stack[{st.top}] = {st.stack && st.stack[st.top] !== undefined ? String(st.stack[st.top]) : ''}</span>
                          </div>
                        )}
                      </div>

                      {/* Stack Status Bar */}
                      <div className="mt-4 w-full flex flex-wrap items-center justify-between gap-2 bg-[var(--sketch-bg)] px-5 py-3 rounded-xl border border-[var(--sketch-border)] font-mono text-xs md:text-sm shadow-md">
                        <div className="flex items-center gap-2">
                          <span className="text-amber-400 font-bold">Stack Contents:</span>
                          <span className="text-[var(--sketch-text)] font-bold">
                            {(st.stack || []).length > 0 ? `[${(st.stack || []).join(', ')}]` : 'Empty'}
                          </span>
                        </div>
                        <span className="text-xs text-[var(--sketch-text-muted)] font-mono font-bold">
                          top: {st.top ?? -1} | size: {(st.stack || []).length} / 4
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* 7. 1D Array Cards Diagram (used for Two Pointers, Queue, Arrays, Sorting, Searching) */
                  (() => {
                    const isMoveZeroes = resolvedTrackKey === 'two-pointers-move-zeroes' || resolvedTrackKey === 'move-zeroes';
                    const isSortColors = resolvedTrackKey === 'two-pointers-sort-colors' || resolvedTrackKey === 'sort-colors';
                    const isBubbleSort = resolvedTrackKey === 'sorting-bubble-sort' || resolvedTrackKey === 'bubble-sort';
                    const isStockTrack = resolvedTrackKey === 'arrays-buy-sell-stock' || resolvedTrackKey === 'buy-sell-stock' || activeTrack === 'buy-sell-stock';
                    const isKadaneTrack = resolvedTrackKey === 'arrays-kadane' || resolvedTrackKey === 'kadane' || activeTrack === 'kadane';
                    const isProductTrack = resolvedTrackKey === 'arrays-product-except-self' || resolvedTrackKey === 'product-except-self' || activeTrack === 'product-except-self';
                    const isRotateTrack = resolvedTrackKey === 'arrays-rotate-array' || resolvedTrackKey === 'rotate-array' || activeTrack === 'rotate-array';
                    const isMajorityTrack = resolvedTrackKey === 'arrays-majority-element' || resolvedTrackKey === 'majority-element' || activeTrack === 'majority-element';
                    const isMergeTrack = resolvedTrackKey === 'arrays-merge-intervals' || resolvedTrackKey === 'merge-intervals' || activeTrack === 'merge-intervals';
                    const isMissingTrack = resolvedTrackKey === 'arrays-find-missing' || resolvedTrackKey === 'find-missing' || activeTrack === 'find-missing';

                    const swapFrom = st.swapFrom !== undefined ? st.swapFrom : null;
                    const swapTo = st.swapTo !== undefined ? st.swapTo : null;
                    const isStepSwapping = swapFrom !== null && swapTo !== null && swapFrom !== swapTo;

                    return (
                      <div className="flex flex-col items-center w-full my-2">
                        {/* Buy/Sell Stock Step HUD */}
                        {isStockTrack && (
                          <div className="w-full max-w-xl mx-auto mb-4 p-3 bg-[var(--sketch-bg)] border border-[var(--sketch-border)] rounded-xl shadow-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                            <div className="flex items-center gap-2">
                              <span className="text-sky-400 font-extrabold">minPrice (buy):</span>
                              <span className="px-2.5 py-1 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/40 font-extrabold text-sm">
                                ${st.minPrice !== undefined ? st.minPrice : (st.state?.minPrice ?? 7)}
                              </span>
                              <span className="text-[var(--sketch-text-muted)] text-[11px]">
                                (Day {st.buyIndex ?? 0})
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-amber-400 font-extrabold">profit today:</span>
                              <span className={`px-2.5 py-1 rounded-md font-extrabold text-sm border ${
                                (st.profit ?? st.state?.['profit today'] ?? 0) > 0
                                   ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                   : 'bg-slate-500/20 text-slate-300 border-slate-500/40'
                              }`}>
                                +${st.profit !== undefined ? st.profit : (st.state?.['profit today'] ?? 0)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-emerald-400 font-extrabold">maxProfit:</span>
                              <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-extrabold text-sm">
                                +${st.maxProfit !== undefined ? st.maxProfit : (st.state?.maxProfit ?? 0)}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Kadane Algorithm Step HUD */}
                        {isKadaneTrack && (
                          <div className="w-full max-w-xl mx-auto mb-4 p-3 bg-[var(--sketch-bg)] border border-[var(--sketch-border)] rounded-xl shadow-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                            <div className="flex items-center gap-2">
                              <span className="text-amber-400 font-extrabold">currentSum:</span>
                              <span className={`px-2.5 py-1 rounded-md font-extrabold text-sm border ${
                                (st.currentSum ?? 0) < 0
                                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              }`}>
                                {st.currentSum !== undefined ? st.currentSum : (st.state?.currentSum ?? 0)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-emerald-400 font-extrabold">maxSum:</span>
                              <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-extrabold text-sm">
                                {st.maxSum !== undefined ? st.maxSum : (st.state?.maxSum ?? 0)}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Product of Array Except Self Step HUD */}
                        {isProductTrack && (
                          <div className="w-full max-w-xl mx-auto mb-4 p-3 bg-[var(--sketch-bg)] border border-[var(--sketch-border)] rounded-xl shadow-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                            <div className="flex items-center gap-2">
                              <span className="text-amber-400 font-extrabold">Pass:</span>
                              <span className={`px-2.5 py-1 rounded-md font-extrabold text-xs border ${
                                st.pass === 'suffix' || st.pass === 'suffix_init'
                                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                                  : st.pass === 'complete' || st.isMatch
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                  : 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                              }`}>
                                {st.pass === 'suffix' || st.pass === 'suffix_init'
                                  ? '➡️ Pass 2: Suffix (Right ➔ Left)'
                                  : st.pass === 'complete' || st.isMatch
                                  ? '✅ Complete (No Division)'
                                  : '⬅️ Pass 1: Prefix (Left ➔ Right)'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sky-400 font-extrabold">prefixProd:</span>
                              <span className="px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold">
                                {st.prefixProd ?? 1}
                              </span>
                              <span className="text-purple-400 font-extrabold ml-2">suffix:</span>
                              <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
                                {st.suffixProd ?? 1}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Rotate Array by K Steps HUD */}
                        {isRotateTrack && (
                          <div className="w-full max-w-xl mx-auto mb-4 p-3 bg-[var(--sketch-bg)] border border-[var(--sketch-border)] rounded-xl shadow-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                            <div className="flex items-center gap-2">
                              <span className="text-amber-400 font-extrabold">Stage:</span>
                              <span className={`px-2.5 py-1 rounded-md font-extrabold text-xs border ${
                                st.stage === 1
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                  : st.stage === 2
                                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                                  : st.stage === 3
                                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              }`}>
                                {st.stage === 1
                                  ? '🔄 Stage 1: Reverse ALL [0..n-1]'
                                  : st.stage === 2
                                  ? '⏪ Stage 2: Reverse First K=3 [0..k-1]'
                                  : st.stage === 3
                                  ? '⏩ Stage 3: Reverse Rest [k..n-1]'
                                  : '🎉 Rotation Complete (k=3)'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-amber-400 font-extrabold">k:</span>
                              <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                                3 (k % 7 = 3)
                              </span>
                              {st.left !== null && st.left !== undefined && (
                                <span className="text-sky-300 font-bold ml-2">
                                  L={st.left}, R={st.right}
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Boyer-Moore Majority Element Step HUD */}
                        {isMajorityTrack && (
                          <div className="w-full max-w-xl mx-auto mb-4 p-3 bg-[var(--sketch-bg)] border border-[var(--sketch-border)] rounded-xl shadow-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                            <div className="flex items-center gap-2">
                              <span className="text-amber-400 font-extrabold">👑 Candidate:</span>
                              <span className={`px-2.5 py-1 rounded-md font-extrabold text-xs border ${
                                st.candidate !== null && st.candidate !== undefined
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                  : 'bg-slate-500/20 text-slate-300 border-slate-500/40'
                              }`}>
                                {st.candidate !== null && st.candidate !== undefined ? `Element ${st.candidate}` : 'None (Open)'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-emerald-400 font-extrabold">🗳️ Vote Count:</span>
                              <span className={`px-2.5 py-0.5 rounded-md font-extrabold text-xs border ${
                                (st.count ?? 0) > 0
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                  : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                              }`}>
                                {st.count ?? 0}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sky-400 font-extrabold">🎯 Threshold:</span>
                              <span className="px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold">
                                &gt; 3.5 (≥ 4 / 7)
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] font-bold">
                              <span className={`px-2 py-0.5 rounded-md border ${
                                st.decision === 'elect'
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                  : st.decision === 'cancel'
                                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                  : st.decision === 'inspect'
                                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              }`}>
                                {st.decision === 'elect'
                                  ? '👑 Elected (+1)'
                                  : st.decision === 'cancel'
                                  ? '⚡ Mismatch (-1 ➔ 0)'
                                  : st.decision === 'inspect'
                                  ? `🔍 Inspecting arr[${st.index}]`
                                  : '🏆 Winner: 3 (4/7)'}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Merge Intervals Step HUD */}
                        {isMergeTrack && (
                          <div className="w-full max-w-2xl mx-auto mb-4 p-3 bg-[var(--sketch-bg)] border border-[var(--sketch-border)] rounded-xl shadow-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                            <div className="flex items-center gap-2">
                              <span className="text-amber-400 font-extrabold">👑 Active [curr]:</span>
                              <span className={`px-2.5 py-1 rounded-md font-extrabold text-xs border ${
                                st.currentInterval
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                  : 'bg-slate-500/20 text-slate-300 border-slate-500/40'
                              }`}>
                                {st.currentInterval ? `[${st.currentInterval.join(', ')}]` : 'None'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sky-400 font-extrabold">🔍 Candidate [next]:</span>
                              <span className={`px-2.5 py-1 rounded-md font-extrabold text-xs border ${
                                st.nextInterval
                                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                                  : 'bg-slate-500/20 text-slate-300 border-slate-500/40'
                              }`}>
                                {st.nextInterval ? `[${st.nextInterval.join(', ')}]` : 'None'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-emerald-400 font-extrabold">📦 Merged List:</span>
                              <div className="flex items-center gap-1">
                                {st.mergedList && st.mergedList.length > 0 ? (
                                  st.mergedList.map((intv, k) => (
                                    <span key={k} className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs">
                                      [{intv.join(', ')}]
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-slate-500 text-xs italic">[ Empty ]</span>
                                )}
                              </div>
                            </div>
                            <div className="w-full flex items-center justify-between pt-1 border-t border-[var(--sketch-border)] text-[11px]">
                              <span className="text-[var(--sketch-text-muted)] font-bold">Action / Check:</span>
                              <span className={`px-2 py-0.5 rounded-md border font-bold ${
                                st.decision === 'compare_overlap' || st.decision === 'merge'
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                  : st.decision === 'compare_no_overlap'
                                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                  : st.decision === 'commit' || st.decision === 'push_final' || st.decision === 'complete'
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                  : 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                              }`}>
                                {st.state?.check || st.state?.formula || st.state?.action || st.comparison || 'Processing'}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Find Missing Number Step HUD */}
                        {isMissingTrack && (
                          <div className="w-full max-w-xl mx-auto mb-4 p-3 bg-[var(--sketch-bg)] border border-[var(--sketch-border)] rounded-xl shadow-md flex flex-col gap-2.5 text-xs font-mono">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="text-amber-400 font-extrabold">🧮 XOR Accumulator:</span>
                                <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 font-extrabold text-sm">
                                  {st.xorAcc !== undefined ? st.xorAcc : (st.state?.xorAcc ?? 0)}
                                </span>
                                <span className="px-2 py-0.5 rounded-md bg-slate-500/20 text-slate-300 border border-slate-500/40 text-[11px] font-bold">
                                  {st.binary || st.state?.binary || '000'}₂
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sky-400 font-extrabold">📏 Array Size (n):</span>
                                <span className="px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/40 font-extrabold text-xs">
                                  n = {st.n ?? 3} ([0..{st.n ?? 3}])
                                </span>
                              </div>
                            </div>

                            {st.cancelledPairs && st.cancelledPairs.length > 0 && (
                              <div className="flex items-center gap-2 pt-1 border-t border-[var(--sketch-border)]">
                                <span className="text-emerald-400 font-extrabold">⚡ Canceled Pairs (a ⊕ a = 0):</span>
                                <div className="flex flex-wrap items-center gap-1.5">
                                  {st.cancelledPairs.map((pair, k) => (
                                    <span key={k} className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-[11px]">
                                      {pair}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="w-full flex items-center justify-between pt-1 border-t border-[var(--sketch-border)] text-[11px]">
                              <span className="text-[var(--sketch-text-muted)] font-bold">Formula / Step:</span>
                              <span className={`px-2 py-0.5 rounded-md border font-bold ${
                                st.decision === 'cancel_pair' || st.decision === 'cancel_final' || st.decision === 'complete'
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                  : st.decision === 'xor_accumulate'
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                  : 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                              }`}>
                                {st.formula || st.state?.formula || st.state?.action || st.computation || 'XOR computation'}
                              </span>
                            </div>
                          </div>
                        )}

                        {isStepSwapping && (
                          <div className="mb-2 px-3.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-mono font-bold text-xs shadow-md flex items-center gap-2">
                            <span>🔄 Swapping indices [{swapFrom}] ↔ [{swapTo}]:</span>
                            <span className="text-white font-extrabold">{stepArray[swapFrom]}</span>
                            <span>↔</span>
                            <span className="text-white font-extrabold">{stepArray[swapTo]}</span>
                          </div>
                        )}

                        <div className="flex items-start gap-3 md:gap-5 my-2 overflow-x-auto overflow-y-visible w-full justify-center pt-4 pb-16">
                          {stepArray.map((val, idx) => {
                            const isIndex = st.index !== undefined && st.index !== null && st.index === idx;
                            const isLeft = (st.left !== undefined && st.left === idx) || (st.front !== undefined && st.front === idx && st.front !== -1) || (st.low !== undefined && st.low === idx);
                            const isRight = (st.right !== undefined && st.right === idx) || (st.rear !== undefined && st.rear === idx && st.rear !== -1) || (st.high !== undefined && st.high === idx);
                            const isMidPoint = st.mid !== undefined && st.mid !== null && st.mid === idx;
                            const isPivotPoint = st.pivot !== undefined && st.pivot !== null && st.pivot === idx;
                            const isJPoint = st.j !== undefined && st.j !== null && st.j === idx;
                            const isBoth = isLeft && isRight && !isMidPoint && !isPivotPoint;
                            const isBothLeftMid = isLeft && isMidPoint && !isRight;
                            const isBothMidRight = isMidPoint && isRight && !isLeft;
                            const isAllThree = isLeft && isMidPoint && isRight;
                            const isBothLeftPivot = isLeft && isPivotPoint && !isRight && !isMidPoint;
                            const isBothRightPivot = isRight && isPivotPoint && !isLeft && !isMidPoint;
                            const inWindow = st.left !== null && st.left !== undefined && st.right !== null && st.right !== undefined && idx >= st.left && idx <= st.right;

                            // Stock highlights
                            const isStockBuyDay = isStockTrack && st.buyIndex !== undefined && st.buyIndex === idx;
                            const isStockSellDay = isStockTrack && ((st.sellIndex !== undefined && st.sellIndex === idx) || (st.decision === 'peak_max' && st.index === idx));
                            const isStockMatch = isStockTrack && st.isMatch && (idx === st.buyIndex || idx === st.sellIndex);

                            // Kadane highlights
                            const isInKadaneWindow = isKadaneTrack && st.subStart !== undefined && idx >= st.subStart && idx <= st.subEnd;
                            const isKadaneBest = isKadaneTrack && st.maxStart !== undefined && idx >= st.maxStart && idx <= st.maxEnd && (st.decision === 'peak_max' || st.isMatch);

                            // Stock action badges
                            const isStockNewMin = isStockTrack && isIndex && st.decision === 'new_min';
                            const isStockNewMax = isStockTrack && isIndex && st.decision === 'new_max';
                            const isStockPeakMax = isStockTrack && isIndex && st.decision === 'peak_max';
                            const isStockHold = isStockTrack && isIndex && st.decision === 'hold';

                            // Kadane action badges
                            const isKadaneReset = isKadaneTrack && isIndex && (st.decision === 'reset_and_max' || st.decision === 'reset');
                            const isKadaneNewMax = isKadaneTrack && isIndex && (st.decision === 'peak_max' || st.decision === 'new_max');
                            const isKadaneExtend = isKadaneTrack && isIndex && st.decision === 'extend';

                            // Product action badges
                            const isProductPrefix = isProductTrack && isIndex && st.pass === 'prefix';
                            const isProductSuffix = isProductTrack && isIndex && st.pass === 'suffix';
                            const isProductDone = isProductTrack && (st.pass === 'complete' || st.isMatch);

                            // Rotate action badges & window
                            const isInRotateWindow = isRotateTrack && st.stageWindow && idx >= st.stageWindow[0] && idx <= st.stageWindow[1];
                            const isRotateSwapped = isRotateTrack && (idx === st.swapFrom || idx === st.swapTo) && st.decision === 'swapped';
                            const isRotateDone = isRotateTrack && (st.stage === 'complete' || st.isMatch);
                            const isRotateStage1Done = isRotateTrack && idx === 3 && st.decision === 'stage1_done';
                            const isRotateStage2Done = isRotateTrack && idx === 1 && st.decision === 'stage2_done';
                            const isRotateStage3Done = isRotateTrack && (idx === 4 || idx === 5) && st.decision === 'stage3_done';
                            const isRotateComplete = isRotateTrack && idx === 3 && (st.decision === 'complete' || st.isMatch);

                            // Majority action badges
                            const isMajorityElect = isMajorityTrack && isIndex && st.decision === 'elect';
                            const isMajorityCancel = isMajorityTrack && isIndex && st.decision === 'cancel';
                            const isMajorityInspect = isMajorityTrack && isIndex && st.decision === 'inspect';
                            const isMajorityDone = isMajorityTrack && (st.decision === 'complete' || st.isMatch);

                            // Merge intervals action badges
                            const isMergeOverlap = isMergeTrack && st.decision === 'compare_overlap' && idx === 2;
                            const isMergeMerged = isMergeTrack && st.decision === 'merge' && idx === 0;
                            const isMergeDisjoint = isMergeTrack && st.decision === 'compare_no_overlap' && (idx === 4 || idx === 6) && idx === st.index;
                            const isMergeCommitted = isMergeTrack && st.decision === 'commit' && (idx === 4 || idx === 6) && idx === st.index;
                            const isMergePushFinal = isMergeTrack && st.decision === 'push_final' && idx === 6;
                            const isMergeComplete = isMergeTrack && (st.decision === 'complete' || st.isMatch) && (idx === 0 || idx === 4 || idx === 6);

                            const isMergeCurrentCard = isMergeTrack && (
                              ((idx === 0 || idx === 1) && st.currentInterval?.[0] === 1) ||
                              ((idx === 4 || idx === 5) && st.currentInterval?.[0] === 8) ||
                              ((idx === 6 || idx === 7) && st.currentInterval?.[0] === 15)
                            );
                            const isMergeNextCard = isMergeTrack && (
                              ((idx === 2 || idx === 3) && st.nextInterval?.[0] === 2) ||
                              ((idx === 4 || idx === 5) && st.nextInterval?.[0] === 8) ||
                              ((idx === 6 || idx === 7) && st.nextInterval?.[0] === 15)
                            );

                            // Find missing action badges
                            const isMissingInspect = isMissingTrack && isIndex && st.decision === 'inspect';
                            const isMissingAccumulate = isMissingTrack && isIndex && st.decision === 'xor_accumulate';
                            const isMissingCancel = isMissingTrack && isIndex && st.decision === 'cancel_pair';
                            const isMissingFinalCancel = isMissingTrack && (st.decision === 'cancel_final' || st.action === 'cancel_final');
                            const isMissingDone = isMissingTrack && (st.decision === 'complete' || st.isMatch);

                            const isSwappingCard = isStepSwapping && (idx === swapFrom || idx === swapTo);

                            const leftLabel =
                              st.leftLabel ||
                              (isQueueTopic
                                ? 'front'
                                : isMoveZeroes || resolvedTrackKey === 'two-pointers-remove-duplicates'
                                ? 'slow'
                                : isSortColors
                                ? 'low'
                                : isBubbleSort
                                ? 'j'
                                : resolvedTrackKey === 'selection-sort' || resolvedTrackKey === 'sorting-selection-sort'
                                ? 'i'
                                : resolvedTrackKey === 'insertion-sort' || resolvedTrackKey === 'sorting-insertion-sort'
                                ? 'j'
                                : resolvedTrackKey === 'quick-sort' || resolvedTrackKey === 'sorting-quick-sort'
                                ? 'i'
                                : topicId === 'sorting'
                                ? 'j'
                                : 'L');

                            const midLabel = st.midLabel || 'mid';
                            const jLabel = st.jLabel || 'j';

                            const rightLabel =
                              st.rightLabel ||
                              (isQueueTopic
                                ? 'rear'
                                : isMoveZeroes || resolvedTrackKey === 'two-pointers-remove-duplicates'
                                ? 'fast'
                                : isSortColors
                                ? 'high'
                                : isBubbleSort
                                ? 'j+1'
                                : resolvedTrackKey === 'selection-sort' || resolvedTrackKey === 'sorting-selection-sort'
                                ? 'min'
                                : resolvedTrackKey === 'insertion-sort' || resolvedTrackKey === 'sorting-insertion-sort'
                                ? 'i'
                                : resolvedTrackKey === 'quick-sort' || resolvedTrackKey === 'sorting-quick-sort'
                                ? 'j'
                                : topicId === 'sorting'
                                ? 'j+1'
                                : 'R');

                            return (
                              <div key={idx} className="relative flex flex-col items-center">
                                {/* Floating Action Badges */}
                                {isSwappingCard && !isStockTrack && (
                                  <div className="absolute -top-3 z-20 px-2 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-bounce">
                                    🔄 Swap
                                  </div>
                                )}
                                {isRotateSwapped && (
                                  <div className="absolute -top-3 z-20 px-2 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                                    ✅ Swapped!
                                  </div>
                                )}
                                {isMajorityElect && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                                    👑 Elect {val}
                                  </div>
                                )}
                                {isMajorityCancel && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap">
                                    ⚡ Mismatch (-1)
                                  </div>
                                )}
                                {isMajorityInspect && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-sky-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap">
                                    🔍 Inspect
                                  </div>
                                )}
                                {isMajorityDone && val === 3 && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                                    🏆 Majority!
                                  </div>
                                )}
                                {isMergeOverlap && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                                    ⚡ 2 ≤ 3 (Overlap!)
                                  </div>
                                )}
                                {isMergeMerged && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                                    ✨ Merged ➔ [1, 6]
                                  </div>
                                )}
                                {isMergeDisjoint && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap">
                                    ⏹️ Gap / Disjoint
                                  </div>
                                )}
                                {isMergeCommitted && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap">
                                    📦 Committed
                                  </div>
                                )}
                                {isMergePushFinal && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                                    🏁 Final Push
                                  </div>
                                )}
                                {isMergeComplete && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-bounce">
                                    🏆 Merged List (3)
                                  </div>
                                )}
                                {isStockNewMin && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-sky-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap">
                                    🏷️ Buy @ ${val}
                                  </div>
                                )}
                                {isStockNewMax && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap">
                                    📈 Profit: +${st.profit}
                                  </div>
                                )}
                                {isStockPeakMax && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                                    🏆 Max Profit: +${st.maxProfit}!
                                  </div>
                                )}
                                {isStockHold && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-slate-600 text-slate-200 font-mono text-[10px] font-bold shadow-md whitespace-nowrap">
                                    📉 +${st.profit} (&lt; ${st.maxProfit})
                                  </div>
                                )}
                                {isKadaneReset && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap">
                                    🔄 Reset!
                                  </div>
                                )}
                                {isKadaneNewMax && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                                    🏆 Max: {st.maxSum}
                                  </div>
                                )}
                                {isKadaneExtend && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-sky-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap">
                                    ➕ Extend
                                  </div>
                                )}
                                {isProductPrefix && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-sky-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap">
                                    ⬅️ ans[{idx}] = {st.ansArray?.[idx]}
                                  </div>
                                )}
                                {isProductSuffix && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-purple-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                                    ✨ ans[{idx}] = {st.ansArray?.[idx]}
                                  </div>
                                )}
                                {isRotateStage1Done && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                                    ✅ Inverted [0..6]
                                  </div>
                                )}
                                {isRotateStage2Done && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-sky-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                                    ✨ Prefix [0..2] = [5,6,7]
                                  </div>
                                )}
                                {isRotateStage3Done && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-purple-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                                    ✨ Suffix [3..6] = [1,2,3,4]
                                  </div>
                                )}
                                {isRotateComplete && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                                    🏆 Rotated by k=3!
                                  </div>
                                )}
                                {isMissingInspect && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-sky-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap">
                                    🔍 arr[{idx}] = {val}
                                  </div>
                                )}
                                {isMissingAccumulate && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                                    🧮 xor = {st.xorAcc}
                                  </div>
                                )}
                                {isMissingCancel && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                                    ⚡ {val} ⊕ {val} = 0
                                  </div>
                                )}
                                {isMissingFinalCancel && idx === stepArray.length - 1 && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-indigo-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-pulse">
                                    ⚡ 3 ⊕ 3 = 0 (n={st.n ?? 3})
                                  </div>
                                )}
                                {isMissingDone && (
                                  <div className="absolute -top-3 z-20 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-bounce">
                                    🏆 Missing = {st.missing ?? 2}!
                                  </div>
                                )}

                                <div
                                  className={`sketch-card ${
                                    isStockMatch
                                      ? (idx === st.buyIndex
                                          ? '!border-sky-400 !bg-sky-500/25 shadow-lg shadow-sky-500/30 ring-2 ring-sky-400 text-sky-200 font-bold scale-105'
                                          : '!border-emerald-400 !bg-emerald-500/25 shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400 text-emerald-200 font-bold scale-105')
                                      : isKadaneBest
                                      ? '!border-emerald-400 !bg-emerald-500/25 shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400 text-emerald-200 font-bold'
                                      : isInKadaneWindow
                                      ? '!border-amber-400 !bg-amber-500/20 shadow-md ring-1 ring-amber-400/60 font-bold'
                                      : isProductSuffix
                                      ? '!border-purple-400 !bg-purple-500/25 ring-2 ring-purple-400 font-bold text-purple-200 scale-105 shadow-md shadow-purple-500/30'
                                      : isProductPrefix
                                      ? '!border-sky-400 !bg-sky-500/25 ring-2 ring-sky-400 font-bold text-sky-200 scale-105 shadow-md shadow-sky-500/30'
                                      : isProductDone
                                      ? '!border-emerald-400 !bg-emerald-500/20 ring-1 ring-emerald-400 text-emerald-300'
                                      : isRotateDone
                                      ? '!border-emerald-400 !bg-emerald-500/25 ring-2 ring-emerald-400 text-emerald-200 font-bold scale-105'
                                      : isMissingDone
                                      ? '!border-emerald-400 !bg-emerald-500/25 shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400 text-emerald-200 font-bold scale-105'
                                      : isMissingCancel
                                      ? '!border-emerald-400 !bg-emerald-500/25 shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400 text-emerald-200 font-bold scale-105'
                                      : isMissingAccumulate
                                      ? '!border-amber-400 !bg-amber-500/25 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400 text-amber-200 font-bold scale-105'
                                      : isMissingInspect
                                      ? '!border-sky-400 !bg-sky-500/20 ring-1 ring-sky-400/60 text-sky-200 font-bold'
                                      : isMajorityDone && val === 3
                                      ? '!border-emerald-400 !bg-emerald-500/25 shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400 text-emerald-200 font-bold scale-105'
                                      : isMajorityElect
                                      ? '!border-amber-400 !bg-amber-500/25 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400 text-amber-200 font-bold scale-105'
                                      : isMajorityCancel
                                      ? '!border-rose-400 !bg-rose-500/25 shadow-lg shadow-rose-500/30 ring-2 ring-rose-400 text-rose-200 font-bold scale-105'
                                      : isMajorityInspect
                                      ? '!border-sky-400 !bg-sky-500/20 ring-1 ring-sky-400/60 text-sky-200 font-bold'
                                      : isMergeTrack && (st.decision === 'complete' || st.isMatch)
                                      ? '!border-emerald-400 !bg-emerald-500/25 shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400 text-emerald-200 font-bold scale-105'
                                      : isMergeCurrentCard
                                      ? '!border-amber-400 !bg-amber-500/25 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400 text-amber-200 font-bold scale-105'
                                      : isMergeNextCard
                                      ? '!border-sky-400 !bg-sky-500/25 shadow-lg shadow-sky-500/30 ring-2 ring-sky-400 text-sky-200 font-bold scale-105'
                                      : isSwappingCard && isRotateTrack
                                      ? '!border-rose-400 !bg-rose-500/25 ring-2 ring-rose-400 text-rose-200 font-bold scale-105 shadow-md shadow-rose-500/30'
                                      : isRotateSwapped
                                      ? '!border-emerald-400 !bg-emerald-500/25 ring-2 ring-emerald-400 text-emerald-200 font-bold scale-105 shadow-md shadow-emerald-500/30'
                                      : isInRotateWindow && st.stage === 2
                                      ? '!border-sky-400/80 !bg-sky-500/15 ring-1 ring-sky-400/50'
                                      : isInRotateWindow && st.stage === 3
                                      ? '!border-purple-400/80 !bg-purple-500/15 ring-1 ring-purple-400/50'
                                      : isInRotateWindow && st.stage === 1
                                      ? '!border-amber-400/80 !bg-amber-500/15 ring-1 ring-amber-400/50'
                                      : isSwappingCard && !isStockTrack
                                      ? '!border-rose-400 !bg-rose-500/20 shadow-lg shadow-rose-500/40 ring-2 ring-rose-400 text-rose-200 font-bold scale-105'
                                      : st.isMatch && (isLeft || isRight || isMidPoint || isPivotPoint)
                                      ? '!border-emerald-400 !bg-emerald-500/20 shadow-lg shadow-emerald-500/40 ring-2 ring-emerald-400 text-emerald-200'
                                      : isPivotPoint && !isMidPoint
                                      ? '!border-rose-400 !bg-rose-500/20 shadow-lg shadow-rose-500/40 ring-2 ring-rose-400'
                                      : isJPoint && !isLeft && !isRight
                                      ? '!border-cyan-400 !bg-cyan-500/10 ring-1 ring-cyan-400/60'
                                      : isMidPoint
                                      ? '!border-amber-400 !bg-amber-500/20 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400'
                                      : isStockBuyDay && !isIndex
                                      ? '!border-sky-400 !bg-sky-500/20 shadow-md ring-1 ring-sky-400/60'
                                      : isStockSellDay && !isIndex
                                      ? '!border-emerald-400 !bg-emerald-500/20 shadow-md ring-1 ring-emerald-400/60'
                                      : isIndex
                                      ? 'active-orange !border-amber-400 !bg-amber-500/20 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/60 font-bold'
                                      : inWindow
                                      ? 'active-orange !border-amber-400 !bg-amber-500/20 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/60'
                                      : ''
                                  }`}
                                >
                                  {isStockTrack
                                    ? (val !== null ? `$${val}` : '∅')
                                    : (val !== null ? val : '∅')}
                                  <div className="sketch-card-index">
                                    {isStockTrack
                                      ? `Day ${idx}`
                                      : isMergeTrack
                                      ? `Intv ${Math.floor(idx / 2)} [${idx}]`
                                      : `[${idx}]`}
                                  </div>
                                </div>

                                {/* Stock Buy Marker Under Card */}
                                {isStockTrack && isStockBuyDay && !isIndex && (
                                  <div className="sketch-pointer text-sky-300 font-bold bg-sky-500/20 px-2 py-0.5 rounded-md border border-sky-400/40 shadow-sm mt-2 text-xs">
                                    <div>min buy</div>
                                    <div className="text-xs leading-none">▲</div>
                                  </div>
                                )}

                                {/* Chalkboard Pointer Badges */}
                                {isAllThree ? (
                                  <div className="sketch-pointer text-purple-300 font-bold bg-purple-500/20 px-2 py-0.5 rounded-md border border-purple-400/40 shadow-sm mt-2 text-xs">
                                    <div>{leftLabel}/{midLabel}/{rightLabel}</div>
                                    <div className="text-xs leading-none">▲</div>
                                  </div>
                                ) : isBothLeftMid ? (
                                  <div className="sketch-pointer text-purple-300 font-bold bg-purple-500/20 px-2 py-0.5 rounded-md border border-purple-400/40 shadow-sm mt-2 text-xs">
                                    <div>{leftLabel}, {midLabel}</div>
                                    <div className="text-xs leading-none">▲</div>
                                  </div>
                                ) : isBothMidRight ? (
                                  <div className="sketch-pointer text-purple-300 font-bold bg-purple-500/20 px-2 py-0.5 rounded-md border border-purple-400/40 shadow-sm mt-2 text-xs">
                                    <div>{midLabel}, {rightLabel}</div>
                                    <div className="text-xs leading-none">▲</div>
                                  </div>
                                ) : isBoth ? (
                                  <div className="sketch-pointer text-purple-300 font-bold bg-purple-500/20 px-2.5 py-1 rounded-md border border-purple-400/40 shadow-sm mt-2">
                                    <div className="text-sm font-bold">{leftLabel === rightLabel ? leftLabel : `${leftLabel}, ${rightLabel}`}</div>
                                    <div className="text-xs leading-none">▲</div>
                                  </div>
                                ) : isBothLeftPivot ? (
                                  <div className="sketch-pointer text-rose-300 font-bold bg-rose-500/20 px-2 py-0.5 rounded-md border border-rose-400/40 shadow-sm mt-2 text-xs">
                                    <div>{leftLabel}, pivot</div>
                                    <div className="text-xs leading-none">▲</div>
                                  </div>
                                ) : isBothRightPivot ? (
                                  <div className="sketch-pointer text-rose-300 font-bold bg-rose-500/20 px-2 py-0.5 rounded-md border border-rose-400/40 shadow-sm mt-2 text-xs">
                                    <div>{rightLabel}, pivot</div>
                                    <div className="text-xs leading-none">▲</div>
                                  </div>
                                ) : isMidPoint ? (
                                  <div className="sketch-pointer text-amber-400 font-bold mt-2">
                                    <div className="font-bold">{midLabel}</div>
                                    <div className="text-xs leading-none">▲</div>
                                  </div>
                                ) : isPivotPoint ? (
                                  <div className="sketch-pointer text-rose-400 font-bold mt-2">
                                    <div className="font-bold">pivot</div>
                                    <div className="text-xs leading-none">▲</div>
                                  </div>
                                ) : isJPoint ? (
                                  <div className="sketch-pointer text-cyan-400 font-bold mt-2">
                                    <div className="font-bold">{jLabel}</div>
                                    <div className="text-xs leading-none">▲</div>
                                  </div>
                                ) : isLeft ? (
                                  <div className="sketch-pointer sketch-pointer-orange mt-2">
                                    <div className="font-bold">{leftLabel}</div>
                                    <div className="text-xs leading-none">▲</div>
                                  </div>
                                ) : isRight ? (
                                  <div className="sketch-pointer sketch-pointer-blue mt-2">
                                    <div className="font-bold">{rightLabel}</div>
                                    <div className="text-xs leading-none">▲</div>
                                  </div>
                                ) : isIndex && !isLeft && !isRight ? (
                                  <div className="sketch-pointer sketch-pointer-orange mt-2">
                                    <div className="font-bold">{isStockTrack ? `Day ${idx}` : `i = ${idx}`}</div>
                                    <div className="text-xs leading-none">▲</div>
                                  </div>
                                ) : null}
                              </div>
                            );
                          })}
                        </div>

                        {/* Live Output Array for Product Except Self */}
                        {isProductTrack && (
                          <div className="w-full max-w-xl mx-auto flex flex-col items-center mt-1 mb-2 pt-3 pb-2 border-t border-[var(--sketch-border)]">
                            <div className="text-xs font-mono text-amber-400 font-bold mb-2 flex items-center gap-2">
                              <span>📤 Output Array: <code className="text-white">answer</code></span>
                              <span className="text-[10px] text-[var(--sketch-text-muted)] font-normal">(stores prefix × suffix at each position)</span>
                            </div>
                            <div className="flex items-center gap-2.5 sm:gap-4">
                              {(st.ansArray || [1, 1, 2, 6]).map((ansVal, aIdx) => {
                                const isCurrentAns = st.index === aIdx;
                                return (
                                  <div key={aIdx} className="flex flex-col items-center">
                                    <div className={`w-12 h-11 sm:w-14 sm:h-12 rounded-xl flex items-center justify-center font-mono font-extrabold text-sm sm:text-base border transition-all duration-300 ${
                                      isCurrentAns
                                        ? 'bg-amber-500/25 border-amber-400 text-amber-300 scale-110 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400'
                                        : st.isMatch || st.pass === 'complete'
                                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                                        : ansVal !== '?'
                                        ? 'bg-sky-500/15 border-sky-400/50 text-sky-200'
                                        : 'bg-white/5 border-dashed border-white/20 text-white/30'
                                    }`}>
                                      {ansVal}
                                    </div>
                                    <span className="text-[10px] font-mono text-[var(--sketch-text-muted)] mt-1">ans[{aIdx}]</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()
                )}
              </div>

              {/* Computation & Comparison Side-by-Side Boxes */}
              <div className="grid md:grid-cols-2 gap-4 mb-4 font-mono text-sm">
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 shadow-md">
                  <span className="text-slate-400 block mb-1 font-bold text-xs">COMPUTATION / STATE EVALUATION:</span>
                  <span className="text-amber-300 font-extrabold text-sm md:text-base">{st.computation}</span>
                </div>
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 shadow-md">
                  <span className="text-slate-400 block mb-1 font-bold text-xs">CONDITION COMPARISON:</span>
                  <span className={st.isMatch ? 'text-emerald-400 font-extrabold text-sm md:text-base' : 'text-cyan-300 font-extrabold text-sm md:text-base'}>
                    {st.comparison}
                  </span>
                </div>
              </div>

              {/* Detailed Step Rationale Explanation */}
              <p className="text-base md:text-lg text-[var(--sketch-text)] font-semibold leading-relaxed font-sketch">
                {st.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
