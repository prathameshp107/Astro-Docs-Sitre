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
import { useTrieStore } from '../../store/visualizers/trieStore';

import { TOPIC_TRACKS } from '../../data/visualizers/tracks.js';

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
  const activeTrieTrack = useTrieStore((s) => s.track);
  const setTrieTrack = useTrieStore((s) => s.setTrack);

  const [expandedTopics, setExpandedTopics] = useState({ trie: true, 'two-pointers': true, 'sliding-window': true, backtracking: true, arrays: true, sorting: true, searching: true, 'linked-list': true, trees: true, graphs: true, stack: true, queue: true, heaps: true, recursion: true, dp: true, 'hash-table': true });

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

    if (activeTopicId === 'trie') setTrieTrack(initialTrack);
    else if (activeTopicId === 'two-pointers') setTwoPointerTrack(initialTrack);
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
      activeTopicId === 'trie' ? activeTrieTrack :
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
      /* Below md the sidebar floats over the canvas instead of taking a
         flex column from it — on a 375px screen it otherwise left ~119px
         for the animation. Above md it behaves exactly as before. */
      className="max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-40 max-md:shadow-2xl w-64 md:w-72 shrink-0 h-full overflow-y-auto border-r border-[var(--sketch-border)] bg-[var(--sketch-bg-dim)] px-4 py-6 flex flex-col font-sketch select-none text-[var(--sketch-text)] transition-all duration-300"
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
                    const isTrieTopic = topicId === 'trie';

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
                        : isTrieTopic
                        ? activeTrieTrack === item.id
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
                        if (isTrieTopic) setTrieTrack(item.id);
                      }
                    };

                    return (
                      <li key={item.id} ref={isSelected ? selectedItemRef : null}>
                        {isTwoPointerTopic || isSlidingWindowTopic || isBacktrackingTopic || isArrayTopic || isSortingTopic || isSearchingTopic || isLinkedListTopic || isTreeTopic || isGraphTopic || isStackTopic || isQueueTopic || isHeapTopic || isRecursionTopic || isDPTopic || isHashTableTopic || isTrieTopic ? (
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

