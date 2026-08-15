import { useState, useEffect } from 'react';
import { SkeletonHero, SkeletonGrid, SkeletonStats } from './Skeleton.jsx';
import DSATopicIcon from './visualizer-common/DSATopicIcon.jsx';

const DSA_TOPICS = [
  { id: 'two-pointers', icon: '👉👈', label: 'Two Pointers', desc: 'Opposite-ends & fast-slow pointer walks (Two Sum II, 3Sum, Container Water)', color: '#f59e0b', trackCount: 8 },
  { id: 'sliding-window', icon: '🪟', label: 'Sliding Window', desc: 'Contiguous subarray/substring window algorithms (Fixed K sum, Longest Substring, Min Subarray Sum)', color: '#10b981', trackCount: 5 },
  { id: 'backtracking', icon: '🧩', label: 'Backtracking', desc: 'State space tree search and constraint pruning (N-Queens, Sudoku Solver, Subsets)', color: '#ec4899', trackCount: 3 },
  { id: 'arrays', icon: '📋', label: 'Arrays', desc: 'Access, insertion, deletion, prefix sum, and array reversals', color: '#7c3aed', trackCount: 6 },
  { id: 'sorting', icon: '🔀', label: 'Sorting Algorithms', desc: 'Bubble, Selection, Insertion, Quick, and Merge Sort step-by-step', color: '#c026d3', trackCount: 5 },
  { id: 'trees', icon: '🌳', label: 'Trees & BST', desc: 'Binary search tree lookups, Inorder, Preorder, and Postorder traversals', color: '#10b981', trackCount: 4 },
  { id: 'graphs', icon: '📊', label: 'Graphs', desc: 'BFS level-order, DFS recursion, Cycle detection, and Dijkstra shortest path', color: '#f59e0b', trackCount: 4 },
  { id: 'linked-list', icon: '⛓️', label: 'Linked Lists', desc: 'Singly traversal, head insertion, deletion, and three-pointer reversal', color: '#ec4899', trackCount: 4 },
  { id: 'stack', icon: '📚', label: 'Stack (LIFO)', desc: 'Push, pop, peek operations, and Valid Parentheses matching', color: '#14b8a6', trackCount: 4 },
  { id: 'queue', icon: '🎯', label: 'Queue (FIFO)', desc: 'Enqueue, dequeue, circular queue modulo ring buffer', color: '#f97316', trackCount: 3 },
  { id: 'heaps', icon: '⛰️', label: 'Heaps (Priority Queue)', desc: 'Min-Heap insert bubble-up, extract min bubble-down, Max-Heapify, Heap Sort', color: '#8b5cf6', trackCount: 4 },
  { id: 'searching', icon: '🔍', label: 'Searching', desc: 'Sequential linear search and binary search halving', color: '#06b6d4', trackCount: 2 },
  { id: 'recursion', icon: '🔄', label: 'Recursion & Call Stack', desc: 'Call stack winding/unwinding (Factorial, Fibonacci, Tower of Hanoi, Subsets)', color: '#e11d48', trackCount: 4 },
  { id: 'dp', icon: '⚡', label: 'Dynamic Programming', desc: '1D & 2D memoization grids (Climbing Stairs, Knapsack, LCS, Coin Change)', color: '#3b82f6', trackCount: 4 },
  { id: 'hash-table', icon: '🔑', label: 'Hash Tables', desc: 'Separate chaining linked lists, open addressing linear probing, Two Sum, Anagrams', color: '#6366f1', trackCount: 4 },
];

export default function DSAVisualizerHub() {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false); // SSR-safe: effects do not run on the server, so an initial `true` made the server-rendered HTML a skeleton with no crawlable content.

  useEffect(() => {
    setLoaded(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

  if (loading) {
    return (
      <div className="sketch-container font-sketch">
        <SkeletonHero />
        <SkeletonGrid count={13} variant="topic-card" columns={3} cardHeight="90px" />
        <SkeletonStats count={4} />
      </div>
    );
  }

  const totalTracks = DSA_TOPICS.reduce((sum, t) => sum + t.trackCount, 0);

  return (
    <div className={`sketch-container font-sketch min-h-screen text-[var(--sketch-text)] ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
      {/* Sketch Blackboard Hero Header */}
      <section className="mb-10 text-center py-6 border-b border-[var(--sketch-border)] relative">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full sketch-border-soft text-amber-400 font-mono text-xs mb-3 bg-amber-500/10">
          <span>✏️</span> CHALKBOARD INTERACTIVE LEARNING PLATFORM
        </div>

        <h1 className="text-4xl md:text-6xl font-bold font-header tracking-tight text-[var(--sketch-text)] mb-4 leading-tight">
          Data Structures & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600">
            Algorithms Visualizers
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base md:text-lg text-[var(--sketch-text-muted)] font-sketch leading-relaxed mb-6">
          Step-by-step hand-drawn pattern animations. Inspect state variables, watch memory call stacks, trace pointers, and master coding interview concepts visually.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={`${base}visualizer/two-pointers`}
            className="sketch-button px-6 py-2.5 bg-amber-500/20 border-amber-500 text-amber-500 font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <span>▶</span> Launch Visualizers <span className="font-mono text-xs">→</span>
          </a>
          <a
            href={`${base}overview`}
            className="sketch-button px-6 py-2.5 flex items-center gap-2"
          >
            <span>📚</span> Explore DSA Notes
          </a>
        </div>
      </section>

      {/* Topics Sketch Grid Section */}
      <section className="mb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono uppercase text-[var(--sketch-accent-orange)] font-bold tracking-wider">
              SELECT VISUALIZER MODULE
            </span>
            <h2 className="text-3xl font-header font-bold text-[var(--sketch-text)] flex items-center gap-2 mt-1">
              Visualizer Categories
              <span className="text-xs px-3 py-0.5 rounded-full sketch-border-soft text-amber-500 font-mono">
                {DSA_TOPICS.length} Modules
              </span>
            </h2>
          </div>
          <p className="text-xs font-mono text-[var(--sketch-text-muted)]">
            Click any visualizer card below to step through animations
          </p>
        </div>

        {/* 13 Sketch Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DSA_TOPICS.map((topic) => (
            <a
              key={topic.id}
              href={`${base}visualizer/${topic.id}`}
              className="sketch-panel-box sketch-border group flex flex-col justify-between p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/10 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-[var(--sketch-bg)] border border-[var(--sketch-border)] group-hover:scale-110 transition-transform shadow-inner flex items-center justify-center">
                    <DSATopicIcon id={topic.id} size={28} />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border border-emerald-500/30 bg-emerald-500/10 text-emerald-500">
                    100% READY ({topic.trackCount} Tracks)
                  </span>
                </div>

                <h3 className="text-xl font-header font-bold text-[var(--sketch-text)] mb-2 group-hover:text-amber-500 transition-colors flex items-center justify-between">
                  <span>{topic.label}</span>
                  <span className="text-sm text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                    ➔
                  </span>
                </h3>

                <p className="text-xs font-sketch text-[var(--sketch-text-muted)] leading-relaxed">
                  {topic.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--sketch-border)] flex items-center justify-between text-[11px] font-mono text-[var(--sketch-text-muted)]">
                <span>Pattern Debugger</span>
                <span className="text-amber-500 font-bold group-hover:underline">Start Visualizing →</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Blackboard Platform Stats */}
      <section className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="sketch-panel-box sketch-border text-center p-4">
          <div className="text-3xl font-header font-bold text-amber-400 mb-1">{DSA_TOPICS.length}</div>
          <div className="text-xs font-mono text-[var(--sketch-text-muted)]">Active Modules</div>
        </div>
        <div className="sketch-panel-box sketch-border text-center p-4">
          <div className="text-3xl font-header font-bold text-emerald-400 mb-1">{totalTracks}+</div>
          <div className="text-xs font-mono text-[var(--sketch-text-muted)]">Problem Tracks</div>
        </div>
        <div className="sketch-panel-box sketch-border text-center p-4">
          <div className="text-3xl font-header font-bold text-purple-400 mb-1">100%</div>
          <div className="text-xs font-mono text-[var(--sketch-text-muted)]">Interactive Debugger</div>
        </div>
        <div className="sketch-panel-box sketch-border text-center p-4">
          <div className="text-3xl font-header font-bold text-cyan-400 mb-1">O(1) - O(V+E)</div>
          <div className="text-xs font-mono text-[var(--sketch-text-muted)]">Complexity Inspector</div>
        </div>
      </section>

      {/* Sketch Blackboard Footer */}
      <footer className="sketch-border bg-[var(--sketch-bg-dim)] p-8 md:p-10 rounded-2xl font-sketch shadow-xl mt-12">
        {/* Top Branding & Description */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[var(--sketch-border)]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🎨</span>
              <h3 className="text-2xl font-bold font-header text-[var(--sketch-text)]">
                DSA Chalkboard Visualizer Studio
              </h3>
            </div>
            <p className="text-[var(--sketch-text-muted)] text-sm max-w-2xl leading-relaxed">
              An interactive hand-drawn algorithm visualization platform designed to help developers master Data Structures & Algorithms step-by-step with state inspectors, pseudocode debuggers, and problem patterns.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/prathameshp107/DSA-Notes-Problems"
              target="_blank"
              rel="noopener noreferrer"
              className="sketch-button flex items-center gap-2 text-sm font-bold bg-amber-500/20 border-amber-500"
            >
              <span>⭐ Star on GitHub</span>
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="sketch-button flex items-center gap-1.5 text-sm font-bold"
              title="Back to top"
            >
              <span>↑ Top</span>
            </button>
          </div>
        </div>

        {/* 4-Column Quick Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-b border-[var(--sketch-border)]">
          {/* Column 1: Core Patterns */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <span>⚡</span> Linear Patterns
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}visualizer/arrays`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Arrays & Hashing
                </a>
              </li>
              <li>
                <a href={`${base}visualizer/two-pointers`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Two Pointers
                </a>
              </li>
              <li>
                <a href={`${base}visualizer/sorting`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Sorting Algorithms
                </a>
              </li>
              <li>
                <a href={`${base}visualizer/searching`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Binary Search
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Tree & Graph Data Structures */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <span>🌳</span> Trees & Graphs
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}visualizer/trees`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Binary Search Trees
                </a>
              </li>
              <li>
                <a href={`${base}visualizer/graphs`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Graph BFS & DFS
                </a>
              </li>
              <li>
                <a href={`${base}visualizer/heaps`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Heaps & Priority Queue
                </a>
              </li>
              <li>
                <a href={`${base}visualizer/linked-list`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Singly Linked Lists
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Advanced Optimization */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <span>🧩</span> Advanced Logic
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}visualizer/recursion`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Recursion & Call Stack
                </a>
              </li>
              <li>
                <a href={`${base}visualizer/dp`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Dynamic Programming
                </a>
              </li>
              <li>
                <a href={`${base}visualizer/stack`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> LIFO Stack
                </a>
              </li>
              <li>
                <a href={`${base}visualizer/hash-table`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Hash Tables & Maps
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Platform Resources */}
          <div>
            <h4 className="font-header font-bold text-base text-[var(--sketch-accent-orange)] mb-3 flex items-center gap-2">
              <span>🚀</span> Resources
            </h4>
            <ul className="space-y-2 text-sm text-[var(--sketch-text-muted)] font-sketch">
              <li>
                <a href={`${base}visualizer`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Visualizer Hub
                </a>
              </li>
              <li>
                <a href={`${base}overview`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Complete Notes & Docs
                </a>
              </li>
              <li>
                <a href={`${base}interview-questions`} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Interview Questions Hub
                </a>
              </li>
              <li>
                <a href={base} className="hover:text-[var(--sketch-text)] hover:underline flex items-center gap-1.5">
                  <span>•</span> Home Page
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Design Bar */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[var(--sketch-text-muted)]">
          <div>
            © {new Date().getFullYear()} DSA Visualizer Studio · Crafted with hand-drawn Blackboard aesthetics.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-500 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              All 14 Visualizers Live
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
