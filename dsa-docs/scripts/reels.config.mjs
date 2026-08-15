/**
 * Reel catalogue + render settings.
 *
 * `track` values must match the keys each store's setTrack() accepts — they are
 * the same slugs the sidebar puts in ?track=. Add or reorder entries freely;
 * record-reel.mjs renders whatever is listed here.
 */

export const RENDER = {
  // Instagram Reels / TikTok / YouTube Shorts canvas.
  width: 1080,
  height: 1920,
  fps: 30,
  // Step duration follows caption length: a 20-word explanation needs longer on
  // screen than "i = 0". Budgeted at readingWordsPerSecond and clamped, so no
  // step flashes past unread and no short one drags.
  readingWordsPerSecond: 2.4,
  minStepSeconds: 2.2,
  maxStepSeconds: 5.5,
  // Added to every step on top of the reading time (glance + comprehension).
  stepPadSeconds: 0.7,
  // Extra hold on the first and last frame so the loop reads cleanly.
  holdFirst: 2.0,
  holdLast: 3.0,
  // Cap so a 40-step track doesn't blow past the 90s Reels limit.
  maxSteps: 22,
  // Hard budget. Reels rejects over 90s, so if reading time for all steps
  // exceeds this the per-step durations are scaled down to fit (never below
  // floorStepSeconds — past that the script drops steps instead).
  maxTotalSeconds: 84,
  floorStepSeconds: 1.6,
  // Warn when a reel exceeds this (Instagram Reels hard limit is 90s).
  warnOverSeconds: 88,
  // CRF 18 is visually lossless enough for flat UI; 23 halves the file size.
  crf: 20,
};

export const REELS = [
  { topic: 'sorting', track: 'bubble-sort', title: 'Bubble Sort', subtitle: 'O(n²) — adjacent swaps' },
  { topic: 'sorting', track: 'merge-sort', title: 'Merge Sort', subtitle: 'O(n log n) — divide & conquer' },
  { topic: 'sorting', track: 'quick-sort', title: 'Quick Sort', subtitle: 'O(n log n) — pivot partition' },
  { topic: 'sorting', track: 'insertion-sort', title: 'Insertion Sort', subtitle: 'O(n²) — best on nearly sorted' },
  { topic: 'searching', track: 'binary-search', title: 'Binary Search', subtitle: 'O(log n) — halve every step' },
  { topic: 'trees', track: 'inorder', title: 'BST In-Order Traversal', subtitle: 'Left → Node → Right = sorted' },
  { topic: 'graphs', track: 'bfs', title: 'Breadth-First Search', subtitle: 'O(V+E) — shortest path, unweighted' },
  { topic: 'graphs', track: 'dfs', title: 'Depth-First Search', subtitle: 'O(V+E) — go deep, then backtrack' },
  { topic: 'two-pointers', track: 'two-sum-ii', title: 'Two Pointers', subtitle: 'O(n) instead of O(n²)' },
  { topic: 'sliding-window', track: 'longest-substring', title: 'Sliding Window', subtitle: 'Expand right, shrink left' },
  { topic: 'stack', track: 'valid-parentheses', title: 'Balanced Parentheses', subtitle: 'Classic stack problem' },
  { topic: 'recursion', track: 'fibonacci', title: 'Recursion Call Stack', subtitle: 'Frames build, then unwind' },
  { topic: 'recursion', track: 'tower-of-hanoi', title: 'Towers of Hanoi', subtitle: 'Recursion that looks impossible' },
  { topic: 'dp', track: 'coin-change', title: 'Coin Change DP', subtitle: 'Fill the table, read the answer' },
  { topic: 'dp', track: 'knapsack', title: '0/1 Knapsack', subtitle: 'The DP everyone gets asked' },
  { topic: 'heaps', track: 'min-heap-insert', title: 'Heap Insert', subtitle: 'O(log n) — sift up' },
  { topic: 'linked-list', track: 'reverse-ll', title: 'Reverse a Linked List', subtitle: 'Three pointers, one pass' },
  { topic: 'graphs', track: 'dijkstra', title: "Dijkstra's Algorithm", subtitle: 'Shortest path, weighted' },
  { topic: 'two-pointers', track: 'three-sum', title: 'Three Sum', subtitle: 'Sort, then two pointers' },
];
