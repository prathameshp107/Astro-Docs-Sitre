/**
 * Quick Knowledge Check Quizzes for DSA Visualizer Pages.
 * 2 curated high-yield interview questions per topic for active recall,
 * boosting dwell time and guiding users into the full MCQ quiz hub.
 */

export const VISUALIZER_QUIZZES = {
  sorting: [
    {
      question: 'Which comparison sorting algorithm guarantees O(n log n) worst-case time complexity AND preserves relative order of equal elements (stable)?',
      options: ['Quick Sort', 'Merge Sort', 'Heap Sort', 'Selection Sort'],
      correctIndex: 1,
      explanation: 'Merge Sort is both O(n log n) in all cases (worst, average, best) and stable. Quick Sort and Heap Sort are not stable by default, and Quick Sort degrades to O(n²) in the worst case.',
    },
    {
      question: 'What is the theoretical lower bound for any comparison-based sorting algorithm on n items?',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
      correctIndex: 1,
      explanation: 'Any comparison sort corresponds to a decision tree with n! leaves. The height is at least log₂(n!) = Θ(n log n). Only non-comparison sorts (Counting, Radix) can beat this.',
    },
  ],

  searching: [
    {
      question: 'In binary search implementations, why is `mid = low + (high - low) / 2` preferred over `(low + high) / 2`?',
      options: [
        'It executes faster on modern CPU architectures',
        'It avoids integer overflow when low + high exceeds the maximum integer value',
        'It handles floating point arrays automatically',
        'It avoids division by zero errors',
      ],
      correctIndex: 1,
      explanation: 'In languages with fixed 32-bit signed integers (Java, C++, C#), `low + high` can exceed 2,147,483,647 and overflow into negative numbers, causing array index out-of-bounds exceptions.',
    },
    {
      question: 'What is the maximum number of comparisons needed to find or confirm absence of an element in a sorted array of 1,024 elements using Binary Search?',
      options: ['1,024', '512', '10', '11'],
      correctIndex: 3,
      explanation: 'Each step halves the search space. ⌊log₂(1024)⌋ + 1 = 10 + 1 = 11 comparisons maximum to either find the target or prove it is absent.',
    },
  ],

  trees: [
    {
      question: 'Which depth-first traversal of a Binary Search Tree (BST) yields keys in strictly ascending sorted order?',
      options: ['Pre-order (Root, Left, Right)', 'In-order (Left, Root, Right)', 'Post-order (Left, Right, Root)', 'Level-order (BFS Breadth-First)'],
      correctIndex: 1,
      explanation: 'In a BST, all left subtree values < root < all right subtree values. Processing Left, then Root, then Right (In-order) naturally outputs the elements in ascending order.',
    },
    {
      question: 'If you insert elements [1, 2, 3, 4, 5] in sorted order into an un-balanced BST, what is the search time complexity?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correctIndex: 2,
      explanation: 'Inserting sorted keys produces a degenerate (skewed) tree that resembles a singly linked list. The height becomes n, degrading search to linear O(n) time.',
    },
  ],

  graphs: [
    {
      question: 'Which graph traversal algorithm guarantees finding the shortest path (fewest edges) between two vertices in an UNWEIGHTED graph?',
      options: ['Depth-First Search (DFS)', 'Breadth-First Search (BFS)', 'Dijkstra Algorithm', 'Bellman-Ford Algorithm'],
      correctIndex: 1,
      explanation: 'BFS explores nodes in order of their hop distance from the start node level-by-level, ensuring the first time a destination is reached is via the minimum number of edges.',
    },
    {
      question: "Why does Dijkstra's algorithm fail to find the shortest path on graphs containing negative edge weights?",
      options: [
        'It enters an infinite loop immediately',
        'It uses a min-heap which cannot store negative numbers',
        'Greedy property assumes finalized visited nodes can never be reached through a shorter detour later',
        'Adjacency lists cannot store negative weights',
      ],
      correctIndex: 2,
      explanation: 'Dijkstra assumes that extracting the smallest tentative distance permanently finalizes that node. A negative edge encountered later could make a longer path cheaper, invalidating that guarantee. Use Bellman-Ford instead.',
    },
  ],

  dp: [
    {
      question: 'What are the two foundational properties a problem must possess to be solvable with Dynamic Programming?',
      options: [
        'Greedy choice property and sorted input',
        'Optimal substructure and overlapping subproblems',
        'Divide-and-conquer and non-overlapping subproblems',
        'Linear time bounds and constant space requirements',
      ],
      correctIndex: 1,
      explanation: 'Optimal substructure means the optimal solution is built from optimal solutions to subproblems. Overlapping subproblems means the same subproblem recurs multiple times, making caching (memoization/tabulation) valuable.',
    },
    {
      question: 'In the 1D space-optimized 0/1 Knapsack solution, why MUST capacity w be iterated backwards (from W down to weight)?',
      options: [
        'To speed up CPU cache line loading',
        'To prevent taking the same item multiple times in the same pass',
        'To sort item values in descending order',
        'Because the base case starts at W',
      ],
      correctIndex: 1,
      explanation: 'Iterating backwards ensures that `dp[w - weight]` references the state from the PREVIOUS item pass. Forward iteration would use the updated state from the current item, accidentally solving Unbounded Knapsack.',
    },
  ],

  trie: [
    {
      question: 'What is the time complexity to search for a word of length L in a Trie containing N words?',
      options: ['O(N × L)', 'O(log N)', 'O(L)', 'O(N)'],
      correctIndex: 2,
      explanation: 'Each character in the word traverses exactly one edge. Searching takes O(L) time, strictly proportional to word length and completely independent of the total dictionary size N.',
    },
    {
      question: 'Why does each Trie node maintain an `isEnd` (or `isWord`) boolean flag?',
      options: [
        'To count how many children the node has',
        'To indicate whether this node completes a valid word versus being just a prefix',
        'To mark the node for garbage collection',
        'To store the ASCII value of the character',
      ],
      correctIndex: 1,
      explanation: 'Without `isEnd`, searching for "cat" in a Trie containing "caterpillar" would return true even if "cat" was never inserted. The flag marks where complete words terminate.',
    },
  ],

  arrays: [
    {
      question: 'What is the time complexity of deleting an element at index i from the middle of a dynamic array of size n?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
      correctIndex: 2,
      explanation: 'Because array elements occupy contiguous memory, deleting at index i requires shifting all remaining n - i - 1 elements left by one position, costing O(n) operations.',
    },
    {
      question: 'Which technique allows answering arbitrary subarray sum queries (from index L to R) in O(1) time after O(n) preprocessing?',
      options: ['Two Pointers', 'Prefix Sum Array', 'Sliding Window', 'Kadane Algorithm'],
      correctIndex: 1,
      explanation: 'A Prefix Sum array precomputes `P[i] = sum(0..i)`. Any range sum from L to R is computed in O(1) as `P[R] - P[L - 1]` (or `P[R]` if L = 0).',
    },
  ],

  'linked-list': [
    {
      question: 'What is the primary architectural purpose of using a Dummy Head (Sentinel) node in linked list algorithms?',
      options: [
        'To reduce memory allocation overhead',
        'To eliminate special case checks when inserting or deleting at the list head',
        'To enable random O(1) index access',
        'To make the linked list bidirectionally traversable',
      ],
      correctIndex: 1,
      explanation: 'A dummy node ensures the operation always has a predecessor node (`prev.next = curr.next`), completely eliminating `if (head == null)` and `if (curr == head)` edge case branches.',
    },
    {
      question: "In Floyd's Cycle Detection (Tortoise and Hare), what are the speeds of the slow and fast pointers?",
      options: [
        'Slow moves 1 step; Fast moves 2 steps per iteration',
        'Slow moves 1 step; Fast moves 3 steps per iteration',
        'Slow stays at head; Fast moves to tail',
        'Both move 1 step in opposite directions',
      ],
      correctIndex: 0,
      explanation: 'Slow moves 1 step and Fast moves 2 steps. The relative distance decreases by 1 node per iteration, guaranteeing they meet inside any cycle in O(n) time and O(1) space.',
    },
  ],

  stack: [
    {
      question: 'Which data structure pattern is optimal for answering "Next Greater Element" queries in a single O(n) pass?',
      options: ['Monotonic Stack', 'Min-Heap', 'Binary Search Tree', 'Circular Queue'],
      correctIndex: 0,
      explanation: 'A monotonic decreasing stack maintains elements in sorted order. Popping elements smaller than the current element yields their next greater value in O(n) amortized time.',
    },
    {
      question: 'Why is a monotonic stack algorithm overall O(n) time despite containing an inner `while` loop that pops elements?',
      options: [
        'Because the while loop only runs once total',
        'Because each element is pushed at most once and popped at most once across the entire algorithm',
        'Because stack peek is O(1)',
        'Because arrays have constant cache lines',
      ],
      correctIndex: 1,
      explanation: 'Aggregate analysis: with n elements, there are at most n pushes and at most n pops total throughout the entire execution, guaranteeing strict O(n) total operations.',
    },
  ],

  queue: [
    {
      question: 'Why is a Circular Queue more memory-efficient than a naive array-based queue?',
      options: [
        'It compresses integers automatically',
        'It reuses vacated slots at the front via modulo arithmetic without shifting elements in O(n)',
        'It dynamically doubles capacity in O(1)',
        'It operates without pointer indirection',
      ],
      correctIndex: 1,
      explanation: 'A naive array queue either wastes space at the front as elements are dequeued or shifts elements left costing O(n). A circular queue wraps `tail = (tail + 1) % capacity` in O(1).',
    },
    {
      question: 'To implement a FIFO Queue using two LIFO Stacks (Inbox and Outbox), what is the amortized cost of dequeue?',
      options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'],
      correctIndex: 1,
      explanation: 'When Outbox is empty, elements from Inbox are transferred to Outbox (reversing order). Since each element moves between stacks at most once, dequeue is amortized O(1).',
    },
  ],

  heaps: [
    {
      question: 'What is the time complexity of building a binary heap from an unsorted array of n elements using bottom-up heapify (`buildHeap`)?',
      options: ['O(n log n)', 'O(n)', 'O(log n)', 'O(n²)'],
      correctIndex: 1,
      explanation: 'Bottom-up heapify sifts down from leaves upward. Most nodes are near the bottom and sift down only 1 or 2 levels. Summing the geometric series yields O(n), not O(n log n).',
    },
    {
      question: 'To find the Top K largest elements from an unsorted stream of n numbers, which data structure provides optimal O(n log k) time and O(k) space?',
      options: ['A Max-Heap of size n', 'A Min-Heap of size k', 'A Sorted Array of size k', 'A Balanced BST of size n'],
      correctIndex: 1,
      explanation: 'Maintain a Min-Heap of size k. For each incoming number, push it and pop the minimum if size > k. The root is always the k-th largest, keeping memory to O(k).',
    },
  ],

  'hash-table': [
    {
      question: 'What is the theoretical worst-case time complexity of hash table lookup when all keys hash to the exact same bucket?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correctIndex: 2,
      explanation: 'If all keys collide in a single bucket, the bucket structure (e.g. linked list in separate chaining) must be linearly traversed, degrading lookup to O(n).',
    },
    {
      question: 'What is the purpose of the Load Factor threshold (commonly 0.75) in hash table implementations?',
      options: [
        'It restricts the maximum memory the JVM or V8 can allocate',
        'It triggers automatic resizing and rehashing before collisions degrade average lookup away from O(1)',
        'It specifies the probability of duplicate keys',
        'It determines the number of hash functions used',
      ],
      correctIndex: 1,
      explanation: 'Load factor = (items / buckets). When it exceeds ~0.75, collision frequency increases noticeably. Doubling bucket capacity and rehashing preserves average O(1) performance.',
    },
  ],

  'two-pointers': [
    {
      question: 'What condition is strictly REQUIRED before you can apply converging two pointers (from both ends) to solve the Two Sum problem in O(n) time?',
      options: [
        'The array must contain only positive integers',
        'The array must be sorted in ascending or descending order',
        'The array size must be an even number',
        'The array must have no duplicate values',
      ],
      correctIndex: 1,
      explanation: 'Converging pointers work because sortedness guarantees whether moving left or right increases or decreases the sum. Without sorted input, a hash map O(n) is required.',
    },
    {
      question: 'How many passes through the array does the Dutch National Flag 3-pointer algorithm (low, mid, high) require to sort [0, 1, 2] in place?',
      options: ['Exactly 1 pass', '2 passes', 'log n passes', '3 passes'],
      correctIndex: 0,
      explanation: 'The algorithm partitions the array into three zones (zeros, ones, twos) in a single pass: low, mid, and high pointers swap elements in strictly O(n) time and O(1) space.',
    },
  ],

  'sliding-window': [
    {
      question: 'What is the key optimization that makes Sliding Window faster than a naive nested loop for subarray problems?',
      options: [
        'It sorts the array in place first',
        'It maintains running aggregates incrementally by adding the entering element and subtracting the exiting element in O(1)',
        'It uses multi-threading to check subarrays concurrently',
        'It skips elements greater than the window size',
      ],
      correctIndex: 1,
      explanation: 'Instead of re-summing or rescanning k elements (O(k)) at every position, Sliding Window updates the running state in O(1): `sum += arr[right] - arr[left]`.',
    },
    {
      question: 'For "Longest Substring Without Repeating Characters", how does the sliding window adjust when a duplicate character is encountered?',
      options: [
        'Reset left pointer back to 0',
        'Advance the left pointer past the previous index of that duplicate character',
        'Break the loop and return the current length',
        'Restart the search from the next character',
      ],
      correctIndex: 1,
      explanation: 'Using a hash map of last-seen character indices, the left pointer jumps directly to `max(left, lastSeen[char] + 1)`, preserving O(n) single-pass runtime.',
    },
  ],

  backtracking: [
    {
      question: 'What essential step distinguishes Backtracking from standard Depth-First Search (DFS)?',
      options: [
        'Backtracking only works on binary trees',
        'The explicit Undo / Unchoose step that reverts the state before exploring alternative decision branches',
        'Backtracking never uses recursion',
        'Backtracking requires extra O(n²) memory',
      ],
      correctIndex: 1,
      explanation: 'Backtracking explores candidates depth-first and explicitly mutates state on the way down, then UNDOES the mutation when returning so sibling choices start with clean state.',
    },
    {
      question: 'When generating permutations or subsets from an input containing duplicate numbers, how do you prevent duplicate results?',
      options: [
        'Sort the input first and skip `if (i > start && nums[i] === nums[i - 1]) continue;`',
        'Use an array instead of a linked list',
        'Double the recursion depth limit',
        'Filter the final output array using a hash set at the end',
      ],
      correctIndex: 0,
      explanation: 'Sorting the input clusters identical values together. Skipping adjacent duplicates within the same decision level prunes redundant decision branches at generation time without O(n!) waste.',
    },
  ],

  recursion: [
    {
      question: 'What error occurs when a recursive function fails to hit a valid base case or recurses beyond the memory limit?',
      options: ['Heap Overflow', 'Stack Overflow (Maximum call stack size exceeded)', 'Memory Leak warning', 'Null Pointer Exception'],
      correctIndex: 1,
      explanation: 'Each recursive call allocates a stack frame storing arguments, local variables, and return address. Without a base case, frames accumulate until call stack memory is exhausted.',
    },
    {
      question: 'What is Tail Call Optimization (TCO) in recursive programming?',
      options: [
        'A technique to execute the base case first',
        'Reusing the current stack frame when the recursive call is the very last operation, reducing stack space to O(1)',
        'Converting recursion to tree traversal',
        'Automatically memoizing function arguments',
      ],
      correctIndex: 1,
      explanation: 'If a function has nothing left to do after calling itself, a supporting compiler or engine can replace the current stack frame rather than creating a new one, avoiding stack overflow.',
    },
  ],
};

export function getVisualizerQuiz(topicId) {
  const normalized = topicId === 'heaps' ? 'heaps' : topicId === 'heap' ? 'heaps' : topicId;
  return VISUALIZER_QUIZZES[normalized] || null;
}
