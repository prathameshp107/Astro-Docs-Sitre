import { useEffect } from 'react';

import { useArrayStore } from '../../store/visualizers/arrayStore';
import { useBacktrackingStore } from '../../store/visualizers/backtrackingStore';
import { useDPStore } from '../../store/visualizers/dpStore';
import { useGraphStore } from '../../store/visualizers/graphStore';
import { useHashTableStore } from '../../store/visualizers/hashTableStore';
import { useHeapStore } from '../../store/visualizers/heapStore';
import { useLinkedListStore } from '../../store/visualizers/linkedListStore';
import { useQueueStore } from '../../store/visualizers/queueStore';
import { useRecursionStore } from '../../store/visualizers/recursionStore';
import { useSearchingStore } from '../../store/visualizers/searchingStore';
import { useSlidingWindowStore } from '../../store/visualizers/slidingWindowStore';
import { useSortingStore } from '../../store/visualizers/sortingStore';
import { useStackStore } from '../../store/visualizers/stackStore';
import { useTreeStore } from '../../store/visualizers/treeStore';
import { useTrieStore } from '../../store/visualizers/trieStore';
import { useTwoPointersStore } from '../../store/visualizers/twoPointersStore';

/**
 * Recording bridge for the reel generator (scripts/record-reel.mjs).
 *
 * Mounts only when the URL carries `?record=1`, and exposes the active topic's
 * zustand store on `window.__viz` so an automation driver can advance the
 * animation one deterministic step at a time and screenshot each frame.
 *
 * Driving the store beats clicking the DOM controls: no animation timing races,
 * no dependence on button markup, and the frame count is known up front.
 *
 * Renders nothing and does nothing without the flag, so normal visitors and the
 * production build are unaffected.
 */

const STORES = {
  arrays: useArrayStore,
  backtracking: useBacktrackingStore,
  dp: useDPStore,
  graphs: useGraphStore,
  'hash-table': useHashTableStore,
  'hash-tables': useHashTableStore,
  heap: useHeapStore,
  heaps: useHeapStore,
  'linked-list': useLinkedListStore,
  queue: useQueueStore,
  recursion: useRecursionStore,
  searching: useSearchingStore,
  'sliding-window': useSlidingWindowStore,
  sorting: useSortingStore,
  stack: useStackStore,
  trees: useTreeStore,
  trie: useTrieStore,
  'two-pointers': useTwoPointersStore,
};

export default function RecorderBridge({ topicId }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (new URLSearchParams(window.location.search).get('record') !== '1') return;

    const store = STORES[topicId];
    if (!store) {
      window.__vizError = `no store registered for topic "${topicId}"`;
      return;
    }

    window.__viz = {
      topicId,
      /** Total frames in the current track. */
      total: () => store.getState().steps?.length ?? 0,
      /** Current frame index. */
      current: () => store.getState().currentStep ?? 0,
      /** Jump to a frame. Pauses playback so the driver owns the clock. */
      setStep: (i) => {
        const { steps } = store.getState();
        const clamped = Math.max(0, Math.min(i, (steps?.length ?? 1) - 1));
        store.setState({ currentStep: clamped, isPlaying: false });
        return clamped;
      },
      /** Switch algorithm track, when the store supports it. */
      setTrack: (t) => {
        const fn = store.getState().setTrack;
        if (typeof fn === 'function') fn(t);
        store.setState({ isPlaying: false });
        return store.getState().track ?? null;
      },
      /** Caption text for the current frame, when the step carries one. */
      describe: () => {
        const { steps, currentStep } = store.getState();
        const s = steps?.[currentStep];
        return s?.desc ?? s?.description ?? s?.title ?? '';
      },
      /** Signals the page is driveable. */
      ready: true,
    };

    // Never let an autoplay timer fight the driver for the current frame.
    store.setState({ isPlaying: false });

    return () => {
      delete window.__viz;
    };
  }, [topicId]);

  return null;
}
