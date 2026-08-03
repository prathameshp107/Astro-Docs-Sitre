import { useState, useEffect, useRef } from 'react';
import DSATopicIcon from '../visualizer-common/DSATopicIcon.jsx';
import { useTwoPointersStore } from '../../store/visualizers/twoPointersStore';
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
import { useSlidingWindowStore } from '../../store/visualizers/slidingWindowStore';
import { useBacktrackingStore } from '../../store/visualizers/backtrackingStore';

const TOPIC_TRACKS = {
  'two-pointers': {
    title: 'Two Pointers',
    icon: '👉👈',
    items: [
      { id: 'intro', label: '1. Introduction', subtitle: 'Opposite-ends two pointers walk' },
      { id: 'two-sum-ii', label: '2. Two Sum II', subtitle: 'Sorted input · target sum search' },
      { id: 'valid-palindrome', label: '3. Valid Palindrome', subtitle: 'Converging pointers · character match' },
      { id: 'three-sum', label: '4. 3Sum', subtitle: 'Triplets summing to zero · O(n²)' },
      { id: 'container-water', label: '5. Container With Most Water', subtitle: 'Greedy area expansion · O(n)' },
      { id: 'move-zeroes', label: '6. Move Zeroes', subtitle: 'Fast & slow pointers in-place swap' },
      { id: 'remove-duplicates', label: '7. Remove Duplicates', subtitle: 'In-place array overwrite · O(n)' },
      { id: 'sort-colors', label: '8. Sort Colors', subtitle: 'Dutch National Flag 3-pointer partition' },
    ],
  },
  'sliding-window': {
    title: 'Sliding Window',
    icon: '🪟',
    items: [
      { id: 'intro', label: '1. Introduction', subtitle: 'Fixed window slide concept (K=3)' },
      { id: 'max-sum-subarray', label: '2. Max Sum Subarray K', subtitle: 'Fixed window size K max sum' },
      { id: 'longest-substring', label: '3. Longest Substring', subtitle: 'Non-repeating chars dynamic window' },
      { id: 'min-subarray-sum', label: '4. Min Subarray Sum', subtitle: 'Dynamic window target sum shrink' },
      { id: 'fruit-into-baskets', label: '5. Fruit Into Baskets', subtitle: 'Max 2 distinct character types' },
    ],
  },
  'backtracking': {
    title: 'Backtracking',
    icon: '🧩',
    items: [
      { id: 'n-queens', label: '1. N-Queens Problem', subtitle: '4x4 Chessboard non-attacking placement' },
      { id: 'sudoku', label: '2. Sudoku Solver', subtitle: '4x4 Mini Sudoku constraint solver' },
      { id: 'subsets', label: '3. Subsets (Power Set)', subtitle: 'Include / Exclude decision tree' },
    ],
  },
  arrays: {
    title: 'Arrays',
    icon: '📋',
    items: [
      { id: 'access', label: '1. Access by Index', subtitle: 'Direct memory offset lookup · O(1)' },
      { id: 'insert', label: '2. Insertion at Index', subtitle: 'Right shift elements · O(n)' },
      { id: 'delete', label: '3. Deletion by Index', subtitle: 'Left shift elements · O(n)' },
      { id: 'search', label: '4. Linear Search', subtitle: 'Iterative index scan · O(n)' },
      { id: 'reverse', label: '5. Reverse Array', subtitle: 'In-place two pointers swap · O(n)' },
      { id: 'prefix-sum', label: '6. Prefix Sum Array', subtitle: 'Cumulative sum precomputation' },
    ],
  },
  sorting: {
    title: 'Sorting Algorithms',
    icon: '🔀',
    items: [
      { id: 'bubble-sort', label: '1. Bubble Sort', subtitle: 'Adjacent element swaps · O(n²)' },
      { id: 'selection-sort', label: '2. Selection Sort', subtitle: 'Minimum element selection · O(n²)' },
      { id: 'insertion-sort', label: '3. Insertion Sort', subtitle: 'Subarray insertion shift · O(n²)' },
      { id: 'quick-sort', label: '4. Quick Sort', subtitle: 'Pivot partitioning · O(n log n)' },
      { id: 'merge-sort', label: '5. Merge Sort', subtitle: 'Divide & conquer merge · O(n log n)' },
    ],
  },
  searching: {
    title: 'Searching Algorithms',
    icon: '🔍',
    items: [
      { id: 'linear-search', label: '1. Linear Search', subtitle: 'Sequential index scan · O(n)' },
      { id: 'binary-search', label: '2. Binary Search', subtitle: 'Divide & conquer halving · O(log n)' },
    ],
  },
  'linked-list': {
    title: 'Linked List',
    icon: '⛓️',
    items: [
      { id: 'singly-ll', label: '1. Singly Traversal', subtitle: 'Sequential pointer traversal · O(n)' },
      { id: 'insert-head', label: '2. Insertion at Head', subtitle: 'New head pointer update · O(1)' },
      { id: 'delete-node', label: '3. Deletion by Value', subtitle: 'Previous node pointer bypass · O(n)' },
      { id: 'reverse-ll', label: '4. Reverse Linked List', subtitle: 'Three-pointer link reversal · O(n)' },
    ],
  },
  trees: {
    title: 'Trees',
    icon: '🌳',
    items: [
      { id: 'inorder', label: '1. Inorder Traversal', subtitle: 'Left → Root → Right · O(n)' },
      { id: 'preorder', label: '2. Preorder Traversal', subtitle: 'Root → Left → Right · O(n)' },
      { id: 'postorder', label: '3. Postorder Traversal', subtitle: 'Left → Right → Root · O(n)' },
      { id: 'bst-search', label: '4. BST Search', subtitle: 'Subtree halving lookup · O(log n)' },
    ],
  },
  graphs: {
    title: 'Graphs',
    icon: '📊',
    items: [
      { id: 'bfs', label: '1. BFS Traversal', subtitle: 'Queue level-order search · O(V + E)' },
      { id: 'dfs', label: '2. DFS Traversal', subtitle: 'Recursion stack deep search · O(V + E)' },
      { id: 'cycle-detection', label: '3. Cycle Detection', subtitle: 'Undirected back-edge scan' },
      { id: 'dijkstra', label: '4. Dijkstra Shortest Path', subtitle: 'Greedy min-distance relaxation' },
    ],
  },
  stack: {
    title: 'Stack (LIFO)',
    icon: '📚',
    items: [
      { id: 'push', label: '1. Push Operation', subtitle: 'Top element insertion · O(1)' },
      { id: 'pop', label: '2. Pop Operation', subtitle: 'Top element removal · O(1)' },
      { id: 'peek', label: '3. Peek / Top', subtitle: 'Top element inspection · O(1)' },
      { id: 'valid-parentheses', label: '4. Valid Parentheses', subtitle: 'Bracket matching using stack' },
    ],
  },
  queue: {
    title: 'Queue (FIFO)',
    icon: '🚶‍♂️🚶‍♀️',
    items: [
      { id: 'enqueue', label: '1. Enqueue Operation', subtitle: 'Rear element insertion · O(1)' },
      { id: 'dequeue', label: '2. Dequeue Operation', subtitle: 'Front element removal · O(1)' },
      { id: 'circular-queue', label: '3. Circular Queue', subtitle: 'Modulo ring buffer reuse' },
    ],
  },
  heaps: {
    title: 'Heaps (Priority Queue)',
    icon: '⛰️',
    items: [
      { id: 'min-heap-insert', label: '1. Min-Heap Insert', subtitle: 'Bubble-up insertion · O(log n)' },
      { id: 'min-heap-extract', label: '2. Extract Minimum', subtitle: 'Bubble-down removal · O(log n)' },
      { id: 'max-heapify', label: '3. Max-Heapify', subtitle: 'Parent >= children heap property' },
      { id: 'heap-sort', label: '4. Heap Sort', subtitle: 'In-place sorting · O(n log n)' },
    ],
  },
  recursion: {
    title: 'Recursion & Call Stack',
    icon: '🔄',
    items: [
      { id: 'factorial', label: '1. Factorial n!', subtitle: 'Linear stack winding & unwinding' },
      { id: 'fibonacci', label: '2. Fibonacci Sequence', subtitle: 'Tree recursion & overlapping calls' },
      { id: 'tower-of-hanoi', label: '3. Tower of Hanoi', subtitle: 'Divide & conquer disk transfers' },
      { id: 'subsets', label: '4. Subsets / Backtracking', subtitle: 'Tree exploration & decision tree' },
    ],
  },
  dp: {
    title: 'Dynamic Programming',
    icon: '⚡',
    items: [
      { id: 'climbing-stairs', label: '1. Climbing Stairs', subtitle: '1D DP memoization array' },
      { id: 'knapsack', label: '2. 0/1 Knapsack', subtitle: '2D DP table grid optimization' },
      { id: 'lcs', label: '3. LCS Subsequence', subtitle: '2D grid character matching' },
      { id: 'coin-change', label: '4. Coin Change', subtitle: '1D minimum coins memoization' },
    ],
  },
  'hash-table': {
    title: 'Hash Tables',
    icon: '🔑',
    items: [
      { id: 'separate-chaining', label: '1. Separate Chaining', subtitle: 'Collision resolution linked lists' },
      { id: 'linear-probing', label: '2. Open Addressing', subtitle: 'Linear probing slot search' },
      { id: 'two-sum-hash', label: '3. Two Sum Hash Map', subtitle: 'Complement index lookup · O(1)' },
      { id: 'group-anagrams', label: '4. Group Anagrams', subtitle: 'Canonical key grouping' },
    ],
  },
};

export default function VisualizerSidebar({ activeTopicId, currentBase, isOpen = true, onToggle }) {
  const sidebarRef = useRef(null);
  const selectedItemRef = useRef(null);

  const { track: activeTwoPointerTrack, setTrack: setTwoPointerTrack } = useTwoPointersStore();
  const { track: activeArrayTrack, setTrack: setArrayTrack } = useArrayStore();
  const { track: activeSortingTrack, setTrack: setSortingTrack } = useSortingStore();
  const { track: activeSearchingTrack, setTrack: setSearchingTrack } = useSearchingStore();
  const { track: activeLinkedListTrack, setTrack: setLinkedListTrack } = useLinkedListStore();
  const { track: activeTreeTrack, setTrack: setTreeTrack } = useTreeStore();
  const { track: activeGraphTrack, setTrack: setGraphTrack } = useGraphStore();
  const { track: activeStackTrack, setTrack: setStackTrack } = useStackStore();
  const { track: activeQueueTrack, setTrack: setQueueTrack } = useQueueStore();
  const { track: activeHeapTrack, setTrack: setHeapTrack } = useHeapStore();
  const { track: activeRecursionTrack, setTrack: setRecursionTrack } = useRecursionStore();
  const { track: activeDPTrack, setTrack: setDPTrack } = useDPStore();
  const { track: activeHashTableTrack, setTrack: setHashTableTrack } = useHashTableStore();
  const { track: activeSlidingWindowTrack, setTrack: setSlidingWindowTrack } = useSlidingWindowStore();
  const { track: activeBacktrackingTrack, setTrack: setBacktrackingTrack } = useBacktrackingStore();
  const [expandedTopics, setExpandedTopics] = useState({ 'two-pointers': true, 'sliding-window': true, backtracking: true, arrays: true, sorting: true, searching: true, 'linked-list': true, trees: true, graphs: true, stack: true, queue: true, heaps: true, recursion: true, dp: true, 'hash-table': true });

  // Save scroll position on user scroll
  const handleScroll = (e) => {
    sessionStorage.setItem('dsa_sidebar_scroll', e.currentTarget.scrollTop);
  };

  // Restore scroll position on mount and auto scroll selected item into view
  useEffect(() => {
    if (sidebarRef.current) {
      const savedScroll = sessionStorage.getItem('dsa_sidebar_scroll');
      if (savedScroll !== null) {
        sidebarRef.current.scrollTop = Number(savedScroll);
      }
    }

    const timer = setTimeout(() => {
      if (selectedItemRef.current) {
        selectedItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [activeTopicId, activeTwoPointerTrack, activeArrayTrack, activeSortingTrack, activeSearchingTrack, activeLinkedListTrack, activeTreeTrack, activeGraphTrack, activeStackTrack, activeQueueTrack, activeHeapTrack, activeRecursionTrack, activeDPTrack, activeHashTableTrack]);

  // 1. Initial Load: Parse URL Query Params (?track=... or ?problem=...)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const initialTrack = params.get('track') || params.get('problem');
    if (!initialTrack) return;

    if (activeTopicId === 'two-pointers') setTwoPointerTrack(initialTrack);
    else if (activeTopicId === 'sliding-window') setSlidingWindowTrack(initialTrack);
    else if (activeTopicId === 'backtracking') setBacktrackingTrack(initialTrack);
    else if (activeTopicId === 'arrays') setArrayTrack(initialTrack);
    else if (activeTopicId === 'sorting') setSortingTrack(initialTrack);
    else if (activeTopicId === 'searching') setSearchingTrack(initialTrack);
    else if (activeTopicId === 'linked-list') setLinkedListTrack(initialTrack);
    else if (activeTopicId === 'trees') setTreeTrack(initialTrack);
    else if (activeTopicId === 'graphs') setGraphTrack(initialTrack);
    else if (activeTopicId === 'stack') setStackTrack(initialTrack);
    else if (activeTopicId === 'queue') setQueueTrack(initialTrack);
    else if (activeTopicId === 'heaps' || activeTopicId === 'heap') setHeapTrack(initialTrack);
    else if (activeTopicId === 'recursion') setRecursionTrack(initialTrack);
    else if (activeTopicId === 'dp') setDPTrack(initialTrack);
    else if (activeTopicId === 'hash-table' || activeTopicId === 'hash-tables') setHashTableTrack(initialTrack);
  }, [activeTopicId]);

  // 2. Reactive Sync: Keep URL Query Param (?track=...) in sync with Active Store Track
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const currentTrack =
      activeTopicId === 'two-pointers' ? activeTwoPointerTrack :
      activeTopicId === 'sliding-window' ? activeSlidingWindowTrack :
      activeTopicId === 'backtracking' ? activeBacktrackingTrack :
      activeTopicId === 'arrays' ? activeArrayTrack :
      activeTopicId === 'sorting' ? activeSortingTrack :
      activeTopicId === 'searching' ? activeSearchingTrack :
      activeTopicId === 'linked-list' ? activeLinkedListTrack :
      activeTopicId === 'trees' ? activeTreeTrack :
      activeTopicId === 'graphs' ? activeGraphTrack :
      activeTopicId === 'stack' ? activeStackTrack :
      activeTopicId === 'queue' ? activeQueueTrack :
      (activeTopicId === 'heaps' || activeTopicId === 'heap') ? activeHeapTrack :
      activeTopicId === 'recursion' ? activeRecursionTrack :
      activeTopicId === 'dp' ? activeDPTrack :
      (activeTopicId === 'hash-table' || activeTopicId === 'hash-tables') ? activeHashTableTrack : null;

    if (currentTrack) {
      const url = new URL(window.location.href);
      if (url.searchParams.get('track') !== currentTrack) {
        url.searchParams.set('track', currentTrack);
        window.history.replaceState({}, '', url.toString());
      }
    }
  }, [
    activeTopicId, activeTwoPointerTrack, activeArrayTrack, activeSortingTrack,
    activeSearchingTrack, activeLinkedListTrack, activeTreeTrack, activeGraphTrack,
    activeStackTrack, activeQueueTrack, activeHeapTrack, activeRecursionTrack,
    activeDPTrack, activeHashTableTrack, activeSlidingWindowTrack, activeBacktrackingTrack
  ]);

  const toggleTopic = (id) => {
    setExpandedTopics((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!isOpen) return null;

  return (
    <aside
      ref={sidebarRef}
      onScroll={handleScroll}
      className="w-64 md:w-72 shrink-0 h-full overflow-y-auto border-r border-[var(--sketch-border)] bg-[var(--sketch-bg-dim)] px-4 py-6 flex flex-col font-sketch select-none text-[var(--sketch-text)] transition-all duration-300"
    >
      {/* Brand Header */}
      <div className="mb-6">
        <a href={`${currentBase}visualizer`} className="block font-header text-3xl text-[var(--sketch-text)] hover:text-amber-500 transition-colors">
          DSA <span className="text-amber-500">Visual</span>
        </a>
        <p className="font-sketch text-xs text-[var(--sketch-text-muted)] mt-1">
          step-by-step pattern animations
        </p>
      </div>

      {/* Topics & Tracks Nav */}
      <nav className="space-y-4 flex-1">
        {Object.entries(TOPIC_TRACKS).map(([topicId, topicData]) => {
          const isCurrentTopic = activeTopicId === topicId || (activeTopicId === 'hash-tables' && topicId === 'hash-table');
          const isExpanded = expandedTopics[topicId] || isCurrentTopic;

          return (
            <div key={topicId} className="space-y-1">
              {/* Topic Header Toggle */}
              <button
                onClick={() => toggleTopic(topicId)}
                className="w-full flex items-center justify-between text-left font-header text-lg text-[var(--sketch-text)] hover:text-amber-500 py-1 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <DSATopicIcon id={topicId} size={18} />
                  <span className={isCurrentTopic ? 'text-amber-500 font-bold' : ''}>{topicData.title}</span>
                </span>
                <span className="text-xs text-[var(--sketch-text-muted)]">{isExpanded ? '▼' : '▶'}</span>
              </button>

              {/* Problem Track Items */}
              {isExpanded && (
                <ul className="pl-4 space-y-1 border-l-2 border-[var(--sketch-border)] ml-2">
                  {topicData.items.map((item) => {
                    const isTwoPointerTopic = topicId === 'two-pointers';
                    const isSlidingWindowTopic = topicId === 'sliding-window';
                    const isBacktrackingTopic = topicId === 'backtracking';
                    const isArrayTopic = topicId === 'arrays';
                    const isSortingTopic = topicId === 'sorting';
                    const isSearchingTopic = topicId === 'searching';
                    const isLinkedListTopic = topicId === 'linked-list';
                    const isTreeTopic = topicId === 'trees';
                    const isGraphTopic = topicId === 'graphs';
                    const isStackTopic = topicId === 'stack';
                    const isQueueTopic = topicId === 'queue';
                    const isHeapTopic = topicId === 'heaps';
                    const isRecursionTopic = topicId === 'recursion';
                    const isDPTopic = topicId === 'dp';
                    const isHashTableTopic = topicId === 'hash-table';

                    const isSelected =
                      isCurrentTopic &&
                      (isTwoPointerTopic
                        ? activeTwoPointerTrack === item.id
                        : isSlidingWindowTopic
                        ? activeSlidingWindowTrack === item.id
                        : isBacktrackingTopic
                        ? activeBacktrackingTrack === item.id
                        : isArrayTopic
                        ? activeArrayTrack === item.id
                        : isSortingTopic
                        ? activeSortingTrack === item.id
                        : isSearchingTopic
                        ? activeSearchingTrack === item.id
                        : isLinkedListTopic
                        ? activeLinkedListTrack === item.id
                        : isTreeTopic
                        ? activeTreeTrack === item.id
                        : isGraphTopic
                        ? activeGraphTrack === item.id
                        : isStackTopic
                        ? activeStackTrack === item.id
                        : isQueueTopic
                        ? activeQueueTrack === item.id
                        : isHeapTopic
                        ? activeHeapTrack === item.id
                        : isRecursionTopic
                        ? activeRecursionTrack === item.id
                        : isDPTopic
                        ? activeDPTrack === item.id
                        : isHashTableTopic
                        ? activeHashTableTrack === item.id
                        : true);

                    const handleClick = () => {
                      if (sidebarRef.current) {
                        sessionStorage.setItem('dsa_sidebar_scroll', sidebarRef.current.scrollTop);
                      }
                      if (!isCurrentTopic) {
                        window.location.href = `${currentBase}visualizer/${topicId}?track=${item.id}`;
                      } else {
                        if (isTwoPointerTopic) setTwoPointerTrack(item.id);
                        if (isSlidingWindowTopic) setSlidingWindowTrack(item.id);
                        if (isBacktrackingTopic) setBacktrackingTrack(item.id);
                        if (isArrayTopic) setArrayTrack(item.id);
                        if (isSortingTopic) setSortingTrack(item.id);
                        if (isSearchingTopic) setSearchingTrack(item.id);
                        if (isLinkedListTopic) setLinkedListTrack(item.id);
                        if (isTreeTopic) setTreeTrack(item.id);
                        if (isGraphTopic) setGraphTrack(item.id);
                        if (isStackTopic) setStackTrack(item.id);
                        if (isQueueTopic) setQueueTrack(item.id);
                        if (isHeapTopic) setHeapTrack(item.id);
                        if (isRecursionTopic) setRecursionTrack(item.id);
                        if (isDPTopic) setDPTrack(item.id);
                        if (isHashTableTopic) setHashTableTrack(item.id);
                      }
                    };

                    return (
                      <li key={item.id} ref={isSelected ? selectedItemRef : null}>
                        {isTwoPointerTopic || isSlidingWindowTopic || isBacktrackingTopic || isArrayTopic || isSortingTopic || isSearchingTopic || isLinkedListTopic || isTreeTopic || isGraphTopic || isStackTopic || isQueueTopic || isHeapTopic || isRecursionTopic || isDPTopic || isHashTableTopic ? (
                          <button
                            onClick={handleClick}
                            className={`w-full text-left block px-3 py-1.5 rounded-lg transition-all ${
                              isSelected
                                ? 'bg-amber-500/20 text-amber-500 font-bold border border-amber-500/40 shadow-sm'
                                : 'text-[var(--sketch-text-muted)] hover:text-[var(--sketch-text)] hover:bg-[var(--sketch-text)]/10'
                            }`}
                          >
                            <div className="text-sm leading-snug">{item.label}</div>
                            {item.subtitle && (
                              <div className="text-[10px] text-[var(--sketch-text-muted)] font-sans leading-tight mt-0.5 opacity-80">
                                {item.subtitle}
                              </div>
                            )}
                          </button>
                        ) : (
                          <a
                            href={`${currentBase}visualizer/${topicId}`}
                            onClick={() => {
                              if (sidebarRef.current) {
                                sessionStorage.setItem('dsa_sidebar_scroll', sidebarRef.current.scrollTop);
                              }
                            }}
                            className={`block px-3 py-1.5 rounded-lg transition-all ${
                              isSelected
                                ? 'bg-amber-500/20 text-amber-500 font-bold border border-amber-500/40'
                                : 'text-[var(--sketch-text-muted)] hover:text-[var(--sketch-text)] hover:bg-[var(--sketch-text)]/10'
                            }`}
                          >
                            <div className="text-sm leading-snug">{item.label}</div>
                            {item.subtitle && (
                              <div className="text-[10px] text-[var(--sketch-text-muted)] font-sans leading-tight mt-0.5 opacity-80">
                                {item.subtitle}
                              </div>
                            )}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>

      {/* Sidebar Bottom Footer Info & Spacing */}
      <div className="mt-8 pt-4 pb-16 border-t border-[var(--sketch-border)] text-center text-[11px] font-mono text-[var(--sketch-text-muted)] shrink-0">
        <p className="font-bold text-[var(--sketch-text)]">DSA Visualizer Hub</p>
        <p className="mt-0.5 opacity-80">13 Active Modules · 48+ Tracks</p>
      </div>
    </aside>
  );
}
