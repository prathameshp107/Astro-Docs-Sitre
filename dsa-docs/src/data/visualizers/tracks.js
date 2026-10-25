export const TOPIC_TRACKS = {
  trie: {
    title: 'Trie (Prefix Tree)',
    icon: '\u{1F333}',
    items: [
      { id: 'insert', label: '1. Insert Words', subtitle: 'Build the tree \u00B7 shared prefixes reused' },
      { id: 'search', label: '2. Search a Word', subtitle: 'Walk chars \u00B7 isEnd decides the answer' },
      { id: 'prefix', label: '3. Prefix / Autocomplete', subtitle: 'Collect every word under a prefix' },
    ],
  },
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
      { id: 'trap-rain-water', label: '9. Trapping Rain Water', subtitle: 'Two-pointer water height tracking · Hard' },
      { id: 'four-sum', label: '10. 4Sum', subtitle: 'Quadruplets summing to target · O(n³)' },
      { id: 'square-sorted', label: '11. Squares of Sorted Array', subtitle: 'Both-ends pointer merge · O(n)' },
      { id: 'floyd-cycle', label: '12. Floyd\'s Cycle Detection', subtitle: 'Fast & slow pointer cycle finding' },
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
      { id: 'kadane', label: '7. Kadane\'s Algorithm', subtitle: 'Max subarray sum · O(n) DP' },
      { id: 'buy-sell-stock', label: '8. Buy & Sell Stock', subtitle: 'Min price tracking · greedy O(n)' },
      { id: 'product-except-self', label: '9. Product Except Self', subtitle: 'Prefix × suffix · no division' },
      { id: 'rotate-array', label: '10. Rotate Array by K', subtitle: 'Triple reverse trick · O(n)' },
      { id: 'majority-element', label: '11. Majority Element', subtitle: 'Boyer-Moore voting · O(n) O(1)' },
      { id: 'merge-intervals', label: '12. Merge Intervals', subtitle: 'Sort + expand overlap · O(n log n)' },
      { id: 'find-missing', label: '13. Find Missing Number', subtitle: 'XOR cancellation trick · O(n)' },
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
      { id: 'level-order', label: '5. Level Order (BFS)', subtitle: 'Queue · level by level output' },
      { id: 'invert', label: '6. Invert Binary Tree', subtitle: 'Swap children · mirror the tree' },
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
      { id: 'number-of-islands', label: '5. Number of Islands', subtitle: 'Grid flood fill · count connected land' },
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
      { id: 'unique-paths', label: '5. Unique Paths', subtitle: 'Grid DP · above + left' },
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


