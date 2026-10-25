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
  // Step duration capped at max 2.0s per user specification:
  readingWordsPerSecond: 4.0,
  minStepSeconds: 1.0,
  maxStepSeconds: 2.0,
  stepPadSeconds: 0.3,
  // Opening/closing pause (also capped within the 2.0s max limit)
  holdFirst: 0.5,
  holdLast: 0.5,
  // Cap so a 40-step track doesn't blow past the Reels limit.
  maxSteps: 22,
  maxTotalSeconds: 60,
  floorStepSeconds: 0.8,
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
  { topic: 'graphs', track: 'bfs', cx: 'Time: O(V + E) · Space: O(V)', title: 'Breadth-First Search', subtitle: 'O(V+E) — shortest path, unweighted' },
  { topic: 'graphs', track: 'dfs', cx: 'Time: O(V + E) · Space: O(V)', title: 'Depth-First Search', subtitle: 'O(V+E) — go deep, then backtrack' },
  { topic: 'two-pointers', track: 'two-sum-ii', cx: 'Time: O(n) · Space: O(1) — vs O(n²) brute force', title: 'Two Pointers', subtitle: 'O(n) instead of O(n²)' },
  { topic: 'sliding-window', track: 'longest-substring', cx: 'Time: O(n) · Space: O(k) distinct chars', title: 'Sliding Window', subtitle: 'Expand right, shrink left' },
  { topic: 'stack', track: 'valid-parentheses', cx: 'Time: O(n) · Space: O(n)', title: 'Balanced Parentheses', subtitle: 'Classic stack problem' },
  { topic: 'recursion', track: 'fibonacci', cx: 'Naive: O(2ⁿ) · Memoised: O(n) · Space: O(n) stack', title: 'Recursion Call Stack', subtitle: 'Frames build, then unwind' },
  { topic: 'recursion', track: 'tower-of-hanoi', cx: 'Time: O(2ⁿ) · Space: O(n) stack', title: 'Towers of Hanoi', subtitle: 'Recursion that looks impossible' },
  { topic: 'dp', track: 'coin-change', title: 'Coin Change DP', subtitle: 'Fill the table, read the answer' },
  { topic: 'dp', track: 'knapsack', title: '0/1 Knapsack', subtitle: 'The DP everyone gets asked' },
  { topic: 'heaps', track: 'min-heap-insert', cx: 'Time: O(log n) · Space: O(1)', title: 'Heap Insert', subtitle: 'O(log n) — sift up' },
  { topic: 'linked-list', track: 'reverse-ll', cx: 'Time: O(n) · Space: O(1)', title: 'Reverse a Linked List', subtitle: 'Three pointers, one pass' },
  { topic: 'graphs', track: 'dijkstra', title: "Dijkstra's Algorithm", subtitle: 'Shortest path, weighted' },
  { topic: 'trie', track: 'insert', cx: 'Time: O(L) per word · Space: O(total characters)', title: 'Trie / Prefix Tree', subtitle: 'Shared prefixes stored once' },
  { topic: 'trie', track: 'prefix', cx: 'Time: O(L + k) · Space: O(k) for k matches', title: 'Trie Autocomplete', subtitle: 'How search suggestions work' },
  { topic: 'two-pointers', track: 'three-sum', title: 'Three Sum', subtitle: 'Sort, then two pointers' },

  // ── Auto-added to cover every visualizer track ──────────────────────────
  // Titles and subtitles are the sidebar's own label/subtitle text, so the
  // wording matches the site. Add a `cx` to any of these if the caption
  // generator cannot match a complexity row (check with:
  //   node scripts/reel-captions.mjs <topic>:<track> --stdout)
  { topic: 'trie', track: 'search', cx: 'Time: O(L) · Space: O(1)', title: 'Search a Word', subtitle: 'Walk chars \u00B7 isEnd decides the answer' },
  { topic: 'two-pointers', track: 'valid-palindrome', cx: 'Time: O(n) · Space: O(1)', title: 'Valid Palindrome', subtitle: 'Converging pointers · character match' },
  { topic: 'two-pointers', track: 'container-water', cx: 'Time: O(n) · Space: O(1)', title: 'Container With Most Water', subtitle: 'Greedy area expansion · O(n)' },
  { topic: 'two-pointers', track: 'move-zeroes', cx: 'Time: O(n) · Space: O(1) in-place', title: 'Move Zeroes', subtitle: 'Fast & slow pointers in-place swap' },
  { topic: 'two-pointers', track: 'remove-duplicates', cx: 'Time: O(n) · Space: O(1) in-place', title: 'Remove Duplicates', subtitle: 'In-place array overwrite · O(n)' },
  { topic: 'two-pointers', track: 'sort-colors', cx: 'Time: O(n) one pass · Space: O(1)', title: 'Sort Colors', subtitle: 'Dutch National Flag 3-pointer partition' },
  { topic: 'sliding-window', track: 'max-sum-subarray', cx: 'Time: O(n) · Space: O(1)', title: 'Max Sum Subarray K', subtitle: 'Fixed window size K max sum' },
  { topic: 'sliding-window', track: 'min-subarray-sum', cx: 'Time: O(n) · Space: O(1)', title: 'Min Subarray Sum', subtitle: 'Dynamic window target sum shrink' },
  { topic: 'sliding-window', track: 'fruit-into-baskets', cx: 'Time: O(n) · Space: O(1) — at most 3 keys', title: 'Fruit Into Baskets', subtitle: 'Max 2 distinct character types' },
  { topic: 'backtracking', track: 'n-queens', title: 'N-Queens Problem', subtitle: '4x4 Chessboard non-attacking placement' },
  { topic: 'backtracking', track: 'sudoku', title: 'Sudoku Solver', subtitle: '4x4 Mini Sudoku constraint solver' },
  { topic: 'backtracking', track: 'subsets', title: 'Subsets (Power Set)', subtitle: 'Include / Exclude decision tree' },
  { topic: 'arrays', track: 'access', title: 'Access by Index', subtitle: 'Direct memory offset lookup · O(1)' },
  { topic: 'arrays', track: 'insert', title: 'Insertion at Index', subtitle: 'Right shift elements · O(n)' },
  { topic: 'arrays', track: 'delete', title: 'Deletion by Index', subtitle: 'Left shift elements · O(n)' },
  { topic: 'arrays', track: 'search', cx: 'Time: O(n) · Space: O(1) — unsorted, nothing to skip', title: 'Linear Search', subtitle: 'Iterative index scan · O(n)' },
  { topic: 'arrays', track: 'reverse', cx: 'Time: O(n) · Space: O(1) in-place', title: 'Reverse Array', subtitle: 'In-place two pointers swap · O(n)' },
  { topic: 'arrays', track: 'prefix-sum', cx: 'Build: O(n) · Query: O(1) · Space: O(n)', title: 'Prefix Sum Array', subtitle: 'Cumulative sum precomputation' },
  { topic: 'sorting', track: 'selection-sort', title: 'Selection Sort', subtitle: 'Minimum element selection · O(n²)' },
  { topic: 'searching', track: 'linear-search', title: 'Linear Search', subtitle: 'Sequential index scan · O(n)' },
  { topic: 'linked-list', track: 'singly-ll', cx: 'Traverse: O(n) · Space: O(1)', title: 'Singly Traversal', subtitle: 'Sequential pointer traversal · O(n)' },
  { topic: 'linked-list', track: 'insert-head', title: 'Insertion at Head', subtitle: 'New head pointer update · O(1)' },
  { topic: 'linked-list', track: 'delete-node', title: 'Deletion by Value', subtitle: 'Previous node pointer bypass · O(n)' },
  { topic: 'trees', track: 'preorder', cx: 'Time: O(n) · Space: O(h)', title: 'Preorder Traversal', subtitle: 'Root → Left → Right · O(n)' },
  { topic: 'trees', track: 'postorder', cx: 'Time: O(n) · Space: O(h)', title: 'Postorder Traversal', subtitle: 'Left → Right → Root · O(n)' },
  { topic: 'trees', track: 'bst-search', cx: 'Balanced: O(log n) · Skewed: O(n) · Space: O(h)', title: 'BST Search', subtitle: 'Subtree halving lookup · O(log n)' },
  { topic: 'graphs', track: 'cycle-detection', cx: 'Time: O(V + E) · Space: O(V)', title: 'Cycle Detection', subtitle: 'Undirected back-edge scan' },
  { topic: 'stack', track: 'push', title: 'Push Operation', subtitle: 'Top element insertion · O(1)' },
  { topic: 'stack', track: 'pop', title: 'Pop Operation', subtitle: 'Top element removal · O(1)' },
  { topic: 'stack', track: 'peek', title: 'Peek / Top', subtitle: 'Top element inspection · O(1)' },
  { topic: 'queue', track: 'enqueue', title: 'Enqueue Operation', subtitle: 'Rear element insertion · O(1)' },
  { topic: 'queue', track: 'dequeue', title: 'Dequeue Operation', subtitle: 'Front element removal · O(1)' },
  { topic: 'queue', track: 'circular-queue', cx: 'enqueue/dequeue: O(1) · Space: O(capacity)', title: 'Circular Queue', subtitle: 'Modulo ring buffer reuse' },
  { topic: 'heaps', track: 'min-heap-extract', title: 'Extract Minimum', subtitle: 'Bubble-down removal · O(log n)' },
  { topic: 'heaps', track: 'max-heapify', cx: 'Sift down: O(log n) · Build heap: O(n)', title: 'Max-Heapify', subtitle: 'Parent >= children heap property' },
  { topic: 'heaps', track: 'heap-sort', cx: 'Time: O(n log n) · Space: O(1) in-place', title: 'Heap Sort', subtitle: 'In-place sorting · O(n log n)' },
  { topic: 'recursion', track: 'factorial', cx: 'Time: O(n) · Space: O(n) stack', title: 'Factorial n!', subtitle: 'Linear stack winding & unwinding' },
  { topic: 'recursion', track: 'subsets', cx: 'Time: O(2ⁿ × n) · Space: O(n) stack', title: 'Subsets / Backtracking', subtitle: 'Tree exploration & decision tree' },
  { topic: 'dp', track: 'climbing-stairs', title: 'Climbing Stairs', subtitle: '1D DP memoization array' },
  { topic: 'dp', track: 'lcs', title: 'LCS Subsequence', subtitle: '2D grid character matching' },
  { topic: 'hash-table', track: 'separate-chaining', cx: 'Avg: O(1) · Worst: O(n) · Space: O(n)', title: 'Separate Chaining', subtitle: 'Collision resolution linked lists' },
  { topic: 'hash-table', track: 'linear-probing', cx: 'Avg: O(1) · Worst: O(n) · Space: O(n)', title: 'Open Addressing', subtitle: 'Linear probing slot search' },
  { topic: 'hash-table', track: 'two-sum-hash', title: 'Two Sum Hash Map', subtitle: 'Complement index lookup · O(1)' },
  { topic: 'hash-table', track: 'group-anagrams', cx: 'Time: O(n × k log k) · Space: O(n × k)', title: 'Group Anagrams', subtitle: 'Canonical key grouping' },
  // ── Two Pointers (Recently added tracks) ──────────────────────────────────
  { topic: 'two-pointers', track: 'trap-rain-water', cx: 'Time: O(n) · Space: O(1)', title: 'Trapping Rain Water', subtitle: 'Two-pointer water height tracking · Hard' },
  { topic: 'two-pointers', track: 'four-sum', cx: 'Time: O(n³) · Space: O(1)', title: '4Sum Problem', subtitle: 'Quadruplets summing to target · O(n³)' },
  { topic: 'two-pointers', track: 'square-sorted', cx: 'Time: O(n) · Space: O(n)', title: 'Squares of Sorted Array', subtitle: 'Both-ends pointer merge · O(n)' },
  { topic: 'two-pointers', track: 'floyd-cycle', cx: 'Time: O(n) · Space: O(1)', title: "Floyd's Cycle Detection", subtitle: 'Fast & slow pointer cycle finding' },
  // ── Arrays (Recently added tracks) ────────────────────────────────────────
  { topic: 'arrays', track: 'kadane', cx: 'Time: O(n) · Space: O(1)', title: "Kadane's Algorithm", subtitle: 'Max subarray sum · O(n) DP' },
  { topic: 'arrays', track: 'buy-sell-stock', cx: 'Time: O(n) · Space: O(1)', title: 'Best Time to Buy & Sell Stock', subtitle: 'Min price tracking · greedy O(n)' },
  { topic: 'arrays', track: 'product-except-self', cx: 'Time: O(n) · Space: O(1) auxiliary', title: 'Product of Array Except Self', subtitle: 'Prefix × suffix · no division' },
  { topic: 'arrays', track: 'rotate-array', cx: 'Time: O(n) · Space: O(1) in-place', title: 'Rotate Array by K', subtitle: 'Triple reverse trick · O(n)' },
  { topic: 'arrays', track: 'majority-element', cx: 'Time: O(n) · Space: O(1)', title: 'Majority Element', subtitle: 'Boyer-Moore voting algorithm · O(n)' },
  { topic: 'arrays', track: 'merge-intervals', cx: 'Time: O(n log n) · Space: O(n)', title: 'Merge Intervals', subtitle: 'Sort + expand overlap · O(n log n)' },
  { topic: 'arrays', track: 'find-missing', cx: 'Time: O(n) · Space: O(1)', title: 'Find Missing Number', subtitle: 'XOR cancellation trick · O(n)' },
  // ── Trees (Recently added tracks) ─────────────────────────────────────────
  { topic: 'trees', track: 'level-order', cx: 'Time: O(n) · Space: O(n)', title: 'Level Order Traversal', subtitle: 'Queue BFS · level by level output' },
  { topic: 'trees', track: 'invert', cx: 'Time: O(n) · Space: O(h)', title: 'Invert Binary Tree', subtitle: 'Swap children · mirror the tree' },
  // ── Graphs (Recently added tracks) ────────────────────────────────────────
  { topic: 'graphs', track: 'number-of-islands', cx: 'Time: O(M × N) · Space: O(M × N)', title: 'Number of Islands', subtitle: 'Grid flood fill · count connected land' },
  // ── DP (Recently added tracks) ────────────────────────────────────────────
  { topic: 'dp', track: 'unique-paths', cx: 'Time: O(m × n) · Space: O(m × n)', title: 'Unique Paths', subtitle: 'Grid DP · paths from above + left' },
];
