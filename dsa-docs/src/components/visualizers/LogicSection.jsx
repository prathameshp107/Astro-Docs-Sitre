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
};

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

  // Pick active track key based on topicId
  const activeTrackKey =
    topicId === 'two-pointers'
      ? twoPointerTrack
      : topicId === 'sliding-window'
      ? slidingWindowTrack
      : topicId === 'backtracking'
      ? backtrackingTrack
      : topicId === 'recursion'
      ? recursionTrack
      : topicId === 'arrays'
      ? arrayTrack
      : topicId === 'sorting'
      ? sortingTrack
      : topicId === 'searching'
      ? searchingTrack
      : topicId === 'linked-list'
      ? linkedListTrack
      : topicId === 'trees'
      ? treeTrack
      : topicId === 'graphs'
      ? graphTrack
      : topicId === 'stack'
      ? stackTrack
      : topicId === 'queue'
      ? queueTrack
      : topicId === 'heaps' || topicId === 'heap'
      ? heapTrack
      : topicId === 'dp'
      ? dpTrack
      : topicId === 'hash-table' || topicId === 'hash-tables'
      ? hashTableTrack
      : topicId;

  // Resolve track aliases for Array, Sorting, & Searching modules
  const resolvedTrackKey =
    activeTrackKey === 'insert' || activeTrackKey === 'insertion'
      ? 'insertion'
      : activeTrackKey === 'delete' || activeTrackKey === 'deletion'
      ? 'deletion'
      : activeTrackKey === 'search' || activeTrackKey === 'linear-search' || activeTrackKey === 'linear' || activeTrackKey === 'linear-scan'
      ? 'linear-search'
      : activeTrackKey === 'reverse' || activeTrackKey === 'reverse-array'
      ? 'reverse-array'
      : activeTrackKey === 'bubble' || activeTrackKey === 'bubble-sort'
      ? 'bubble-sort'
      : activeTrackKey === 'selection' || activeTrackKey === 'selection-sort'
      ? 'selection-sort'
      : activeTrackKey === 'insertion-sort'
      ? 'insertion-sort'
      : activeTrackKey === 'quick' || activeTrackKey === 'quick-sort'
      ? 'quick-sort'
      : activeTrackKey === 'merge' || activeTrackKey === 'merge-sort'
      ? 'merge-sort'
      : activeTrackKey;

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

  // Retrieve exact problem logic or generate dynamic fallback for topicId
  const problemData =
    SPECIFIC_PROBLEM_LOGIC[resolvedTrackKey] ||
    SPECIFIC_PROBLEM_LOGIC[activeTrackKey] ||
    SPECIFIC_PROBLEM_LOGIC[topicId] || {
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

                {st.grid ? (
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
                  <div className="flex items-start gap-3 md:gap-5 my-2 overflow-x-auto overflow-y-visible w-full justify-center pt-4 pb-16">
                    {stepArray.map((val, idx) => {
                      const isLeft = (st.left !== undefined && st.left === idx) || (st.front !== undefined && st.front === idx && st.front !== -1);
                      const isRight = (st.right !== undefined && st.right === idx) || (st.rear !== undefined && st.rear === idx && st.rear !== -1);
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

                      const leftLabel =
                        st.leftLabel ||
                        (isQueueTopic
                          ? 'front'
                          : resolvedTrackKey === 'bubble-sort'
                          ? 'j'
                          : resolvedTrackKey === 'selection-sort'
                          ? 'i'
                          : resolvedTrackKey === 'insertion-sort'
                          ? 'j'
                          : resolvedTrackKey === 'quick-sort'
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
                          : resolvedTrackKey === 'bubble-sort'
                          ? 'j+1'
                          : resolvedTrackKey === 'selection-sort'
                          ? 'min'
                          : resolvedTrackKey === 'insertion-sort'
                          ? 'i'
                          : resolvedTrackKey === 'quick-sort'
                          ? 'j'
                          : topicId === 'sorting'
                          ? 'j+1'
                          : 'R');

                      return (
                        <div key={idx} className="relative flex flex-col items-center">
                          <div
                            className={`sketch-card ${
                              st.isMatch && (isLeft || isRight || isMidPoint || isPivotPoint)
                                ? '!border-emerald-400 !bg-emerald-500/20 shadow-lg shadow-emerald-500/40 ring-2 ring-emerald-400 text-emerald-200'
                                : isPivotPoint && !isMidPoint
                                ? '!border-rose-400 !bg-rose-500/20 shadow-lg shadow-rose-500/40 ring-2 ring-rose-400'
                                : isJPoint && !isLeft && !isRight
                                ? '!border-cyan-400 !bg-cyan-500/10 ring-1 ring-cyan-400/60'
                                : isMidPoint
                                ? '!border-amber-400 !bg-amber-500/20 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400'
                                : inWindow
                                ? 'active-orange !border-amber-400 !bg-amber-500/20 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/60'
                                : ''
                            }`}
                          >
                            {val}
                            <div className="sketch-card-index">[{idx}]</div>
                          </div>

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
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
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
