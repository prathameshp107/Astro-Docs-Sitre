/**
 * Per-topic reference content rendered below each algorithm visualizer.
 *
 * Why this file exists: the visualizer routes are the platform's most
 * differentiated pages, but they shipped 200-450 words each — and on four of
 * them the only substantive copy sat inside a `clip:rect(0,0,0,0)` /
 * `aria-hidden="true"` block, which is discounted by search engines and hidden
 * from screen readers. This content renders visibly, inside the visualizer's
 * scroll column, so it serves readers first and is crawlable as a side effect.
 *
 * Shape per topic:
 *   intro      — one or two plain-language paragraphs
 *   complexity — rows for the operations/algorithms table
 *   howTo      — ordered steps for driving the visualizer
 *   faqs       — question/answer pairs (also emitted as FAQPage JSON-LD)
 *   related    — internal links to sibling visualizers
 */

const V = (slug, label) => ({ href: `/visualizer/${slug}/`, label });

export const VISUALIZER_CONTENT = {
  trie: {
    heading: 'Tries and prefix search',
    intro: [
      'A trie stores strings by character instead of whole. Each edge carries one letter, so the path from the root to any node spells a prefix, and every word sharing that prefix shares those nodes. Watch the animation insert "car" after "cat" — the c and a are reused, and only the r is new.',
      'That structure is what makes lookup cost O(L) in the length of the query rather than the size of the dictionary, and it is why autocomplete is natural here: walk to the prefix node once, and every word beneath it is a match. A hash map would have to scan every key to answer the same question.',
    ],
    complexityHead: ['Operation', 'Time', 'Space', 'Notes'],
    complexity: [
      ['Insert word', 'O(L)', 'O(L)', 'L = word length; new nodes only where the branch is missing'],
      ['Search word', 'O(L)', 'O(1)', 'Returns the isEnd flag of the final node'],
      ['Starts with prefix', 'O(L)', 'O(1)', 'Same walk, without the isEnd check'],
      ['Collect prefix matches', 'O(L + k)', 'O(k)', 'k = total length of the matches returned'],
      ['Delete word', 'O(L)', 'O(1)', 'Unset isEnd, then prune childless nodes upward'],
    ],
    howTo: [
      'Pick a track: Insert to build the tree, Search to query it, or Prefix for autocomplete.',
      'Type your own words in the input and press Rebuild — the whole trace is regenerated.',
      'Step through insert and watch which characters create nodes and which reuse an existing branch.',
      'On Search, compare a word that exists against one that is only a prefix — the isEnd flag is the difference.',
    ],
    faqs: [
      {
        q: 'What is a trie and when should I use one?',
        a: 'A trie, or prefix tree, is a tree where each edge represents one character, so a root-to-node path spells a prefix. Use it when you need prefix queries — autocomplete, type-ahead, spell check, longest-prefix IP routing, or word games. For plain exact-match membership a hash set is usually smaller and faster.',
      },
      {
        q: 'Why does a trie need an isEnd flag?',
        a: 'Because reaching a node only proves that a path of characters exists, not that a word ends there. After inserting "cat", walking "ca" lands on a real node, but "ca" was never inserted. The isEnd boolean marks nodes where a complete word finishes, which is what lets search return false for a prefix while startsWith returns true.',
      },
      {
        q: 'What is the time complexity of a trie?',
        a: 'Insert, search and prefix checks are all O(L), where L is the length of the word or prefix — independent of how many words are stored. Collecting every match under a prefix costs O(L + k) for k characters of output. Space is O(total characters), reduced wherever words share prefixes.',
      },
      {
        q: 'Trie vs hash map — which is better?',
        a: 'A hash map gives O(1) average exact lookup and usually uses less memory, but it cannot answer prefix questions without scanning every key. A trie gives O(L) lookup regardless of dictionary size, natural prefix and autocomplete queries, sorted iteration, and shared storage for common prefixes — at the cost of pointer overhead and worse cache locality.',
      },
    ],
    interviewTip: 'When asked to implement an autocomplete or prefix dictionary, interviewers often look for two things beyond the basic trie: (1) memory optimization — a naive 26-pointer array per node wastes memory; mention that a hash map or ternary search tree saves space for sparse keys. (2) Returning the top-k most frequent suggestions — storing the top-k suggestions pre-computed directly on each prefix node turns an expensive O(k log k) subtree traversal into an immediate O(L) response.',
    related: [V('trees', 'Binary Tree Visualizer'), V('hash-table', 'Hash Table Visualizer'), V('backtracking', 'Backtracking Visualizer'), V('graphs', 'Graph Visualizer')],
  },

  sorting: {
    heading: 'Sorting algorithms, step by step',
    intro: [
      'Sorting is the first place most interviews go, because it exposes how you think about comparisons, swaps, and the cost of moving data. The visualizer above animates each comparison and swap so you can see why an O(n log n) algorithm pulls away from an O(n²) one as the array grows.',
      'Watch for the shape of the work: Bubble and Insertion Sort do local, neighbour-by-neighbour fixes; Merge and Quick Sort split the problem and combine results. That structural difference — not the code length — is what the complexity column is really measuring.',
    ],
    complexityHead: ['Algorithm', 'Best', 'Average', 'Worst', 'Space', 'Stable'],
    complexity: [
      ['Bubble Sort', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)', 'Yes'],
      ['Insertion Sort', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)', 'Yes'],
      ['Selection Sort', 'O(n²)', 'O(n²)', 'O(n²)', 'O(1)', 'No'],
      ['Merge Sort', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(n)', 'Yes'],
      ['Quick Sort', 'O(n log n)', 'O(n log n)', 'O(n²)', 'O(log n)', 'No'],
      ['Heap Sort', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(1)', 'No'],
    ],
    howTo: [
      'Pick an algorithm from the track selector to load its pseudocode.',
      'Step forward one operation at a time and watch the highlighted line move with the array state.',
      'Note which bars are being compared versus actually swapped — comparisons dominate the count.',
      'Re-run with a nearly-sorted array to see Insertion Sort collapse to O(n) while Selection Sort does not.',
    ],
    faqs: [
      {
        q: 'Which sorting algorithm is fastest?',
        a: 'For general-purpose arrays, Quick Sort is usually fastest in practice: it averages O(n log n) and its in-place partitioning is cache-friendly. That is why most standard libraries build on it — though real implementations switch to Insertion Sort for tiny sub-arrays and fall back to Heap Sort when recursion runs too deep, to avoid Quick Sort\'s O(n²) worst case.',
      },
      {
        q: 'What is the difference between Quick Sort and Merge Sort?',
        a: 'Quick Sort partitions around a pivot in place, so it needs only O(log n) stack space, but a poor pivot degrades it to O(n²) and it is not stable. Merge Sort guarantees O(n log n) in every case and is stable, at the cost of O(n) extra space for merging. Choose Merge Sort when stability matters or when sorting linked lists; choose Quick Sort for in-memory arrays.',
      },
      {
        q: 'What does it mean for a sorting algorithm to be stable?',
        a: 'A stable sort preserves the relative order of elements that compare equal. If you sort records by city and then by name, a stable sort keeps the city ordering intact within each name group. Merge Sort and Insertion Sort are stable; Quick Sort, Heap Sort, and Selection Sort are not, unless you add a tiebreaker.',
      },
      {
        q: 'Why is O(n log n) the lower bound for comparison sorting?',
        a: 'Any algorithm that only compares pairs of elements builds a decision tree whose leaves are the n! possible orderings. A binary tree with n! leaves has height at least log₂(n!), which is Θ(n log n). Counting Sort and Radix Sort beat this only because they read the values themselves rather than comparing pairs.',
      },
    ],
    interviewTip: 'In a live interview, when asked "implement merge sort", clarify whether in-place is required before coding — the interviewer may expect O(n) extra space (classic merge sort) or be testing if you know why in-place merge sort is rarely used in practice (O(n log² n) or complex pointer manipulation). Also mention Timsort: the real sorting algorithm in Python and Java, which is merge sort + insertion sort for small runs.',
    related: [V('searching', 'Binary Search Visualizer'), V('heaps', 'Heap Visualizer'), V('arrays', 'Array Visualizer'), V('two-pointers', 'Two Pointers Visualizer')],
  },

  searching: {
    heading: 'Searching algorithms, step by step',
    intro: [
      'Binary search is the highest-leverage pattern in interviews: it turns a linear scan into a logarithmic one, and the same halving idea generalises far beyond sorted arrays. The visualizer shows the low, high, and mid pointers converging so the invariant stays visible at every step.',
      'The hard part is never the idea — it is the boundary conditions. Watch how mid is computed and whether the search space shrinks on every iteration; those two details are where most buggy implementations go into infinite loops.',
    ],
    complexityHead: ['Algorithm', 'Best', 'Average', 'Worst', 'Space', 'Requires sorted input'],
    complexity: [
      ['Linear Search', 'O(1)', 'O(n)', 'O(n)', 'O(1)', 'No'],
      ['Binary Search', 'O(1)', 'O(log n)', 'O(log n)', 'O(1)', 'Yes'],
      ['Jump Search', 'O(1)', 'O(√n)', 'O(√n)', 'O(1)', 'Yes'],
      ['Exponential Search', 'O(1)', 'O(log n)', 'O(log n)', 'O(1)', 'Yes'],
    ],
    howTo: [
      'Choose a search track and a target value.',
      'Step through and watch the low/high window shrink after each comparison.',
      'Confirm the invariant: the target, if present, always lies inside the current window.',
      'Search for a value that is absent to see how the loop terminates when low passes high.',
    ],
    faqs: [
      {
        q: 'Why use low + (high - low) / 2 instead of (low + high) / 2?',
        a: 'In fixed-width integer languages such as Java, C++, or Go, low + high can overflow when both are near the maximum integer, producing a negative midpoint and an out-of-bounds access. Writing low + (high - low) / 2 computes the same midpoint without ever exceeding the larger operand. JavaScript numbers are doubles so it rarely bites there, but interviewers still look for it.',
      },
      {
        q: 'When can I use binary search on an unsorted array?',
        a: 'You cannot search unsorted values directly, but you can binary search any monotonic predicate. If some property is false, false, …, false, true, true, …, true across the search space, binary search finds the boundary. That is the basis of "binary search on the answer" problems like Koko Eating Bananas or minimum capacity to ship packages.',
      },
      {
        q: 'What is the time complexity of binary search?',
        a: 'O(log n) time and O(1) space when written iteratively. Each comparison discards half the remaining candidates, so an array of a million elements resolves in about 20 steps. A recursive implementation is also O(log n) time but uses O(log n) stack space.',
      },
    ],
    interviewTip: 'The most common binary search bug is an infinite loop — it happens when the search space stops shrinking. Check: (1) does every branch of the if/else move at least one pointer? (2) Is mid computed without overflow? In Java/C++ use low + (high - low) / 2. The hardest variant to get right is "leftmost index of target" — the correct template exits with low, not mid, and never short-circuits on a match.',
    related: [V('sorting', 'Sorting Visualizer'), V('arrays', 'Array Visualizer'), V('trees', 'Binary Tree Visualizer'), V('two-pointers', 'Two Pointers Visualizer')],
  },

  arrays: {
    heading: 'Arrays and contiguous memory',
    intro: [
      'Arrays store elements in one contiguous block, which is why indexing is O(1) — the address is just base + index × size — and why inserting in the middle is O(n), since everything after the insertion point has to shift.',
      'That trade-off drives a surprising number of interview answers. Reach for an array when you index often and mutate rarely; reach for a linked list or hash map when the reverse is true.',
    ],
    complexityHead: ['Operation', 'Time', 'Notes'],
    complexity: [
      ['Access by index', 'O(1)', 'Direct address arithmetic'],
      ['Search (unsorted)', 'O(n)', 'Must scan every element'],
      ['Search (sorted)', 'O(log n)', 'Binary search applies'],
      ['Insert / delete at end', 'O(1) amortised', 'Occasional resize copies n elements'],
      ['Insert / delete at start or middle', 'O(n)', 'Shifts all following elements'],
    ],
    howTo: [
      'Select an array operation track to load its pseudocode.',
      'Step through and watch which cells are read versus written.',
      'Note the shift cascade on a middle insert — that cascade is the O(n).',
      'Compare an append against a middle insert to feel the difference.',
    ],
    faqs: [
      {
        q: 'Why is array access O(1)?',
        a: 'Because elements sit in contiguous memory and every element has the same width, the address of index i is computed arithmetically as base + i × elementSize. No traversal is involved, so the cost does not grow with the array length.',
      },
      {
        q: 'What does amortised O(1) mean for a dynamic array push?',
        a: 'A dynamic array grows by doubling its capacity. Most pushes write into spare capacity in O(1); occasionally one push triggers an O(n) copy into a larger buffer. Spread across n pushes, the copies total O(n), so the average cost per push is constant — that average is what "amortised" describes.',
      },
      {
        q: 'When should I use an array instead of a linked list?',
        a: 'Use an array when you index randomly, iterate frequently, or care about cache locality — contiguous memory makes traversal dramatically faster in practice. Use a linked list when you insert and delete at known positions constantly and never need random access, since those operations are O(1) once you hold the node.',
      },
    ],
    interviewTip: 'When an interviewer says "you have an unsorted array of n integers" and asks for something in O(1) space — think arrays first. Two moves often trip candidates: (1) forgetting that deleting from the middle is O(n) due to the shift cascade (show you know this even if you use splice()), (2) off-by-one on insert — insert at index i means elements from i onward shift right, so you fill from the back. Always narrate the shift for your interviewer.',
    related: [V('two-pointers', 'Two Pointers Visualizer'), V('sliding-window', 'Sliding Window Visualizer'), V('sorting', 'Sorting Visualizer'), V('linked-list', 'Linked List Visualizer')],
  },

  'linked-list': {
    heading: 'Linked lists and pointer manipulation',
    intro: [
      'A linked list trades contiguous memory for pointer indirection: each node holds a value and a reference to the next node. Insertion and deletion become O(1) once you hold the right node, but reaching that node costs O(n) because there is no index arithmetic to shortcut the walk.',
      'Most linked-list interview questions are really pointer-ordering questions. The visualizer animates each reassignment so you can see exactly when a link is broken and when it is restored — the moment where reversal bugs and lost tails happen.',
    ],
    complexityHead: ['Operation', 'Singly linked', 'Doubly linked'],
    complexity: [
      ['Access by position', 'O(n)', 'O(n)'],
      ['Search by value', 'O(n)', 'O(n)'],
      ['Insert at head', 'O(1)', 'O(1)'],
      ['Insert at tail', 'O(n) without tail pointer', 'O(1) with tail pointer'],
      ['Delete a known node', 'O(n) — needs predecessor', 'O(1)'],
    ],
    howTo: [
      'Pick an operation such as insertion, deletion, or reversal.',
      'Step through and watch each next pointer get reassigned.',
      'Track the temporary variable that holds the rest of the list during a reversal.',
      'Notice how the head reference moves — losing it is the classic bug.',
    ],
    faqs: [
      {
        q: 'How do you reverse a linked list?',
        a: 'Walk the list with three references: previous (initially null), current (initially head), and next. On each iteration, save next = current.next, point current.next back at previous, then advance previous = current and current = next. When current becomes null, previous is the new head. It runs in O(n) time and O(1) space.',
      },
      {
        q: 'How do you detect a cycle in a linked list?',
        a: 'Use Floyd\'s tortoise-and-hare: advance a slow pointer one node and a fast pointer two nodes per step. If they ever meet, a cycle exists; if fast reaches null, the list is acyclic. To find the cycle\'s start, reset one pointer to the head and advance both one step at a time — they meet at the entry node. O(n) time, O(1) space.',
      },
      {
        q: 'Why use a dummy head node?',
        a: 'A dummy node placed before the real head removes the special case where you insert or delete at position zero. Every operation then has a predecessor to work with, so one code path handles the whole list. It is the standard trick for merge, partition, and remove-nth-from-end problems.',
      },
    ],
    interviewTip: 'The sentinel (dummy head) pattern is the number one tool for eliminating null checks in linked-list questions. When deleting or rearranging nodes, initializing `dummy.next = head` guarantees you never need a special `if (head == target)` branch. Always mention cycle detection (Floyd\'s algorithm) and note that finding the intersection of two lists can be done in O(1) space by aligning lengths or looping pointers across both heads.',
    related: [V('arrays', 'Array Visualizer'), V('stack', 'Stack Visualizer'), V('queue', 'Queue Visualizer'), V('two-pointers', 'Two Pointers Visualizer')],
  },

  stack: {
    heading: 'Stacks and last-in-first-out order',
    intro: [
      'A stack allows insertion and removal at one end only, which makes it the natural fit for anything that must unwind in reverse order: balanced brackets, undo history, expression evaluation, and the call stack itself.',
      'The monotonic stack is the interview-grade variant. By keeping the stack sorted as you push, you answer "next greater element" style questions in a single O(n) pass instead of the obvious O(n²) scan.',
    ],
    complexityHead: ['Operation', 'Time', 'Space'],
    complexity: [
      ['push', 'O(1)', 'O(1)'],
      ['pop', 'O(1)', 'O(1)'],
      ['peek / top', 'O(1)', 'O(1)'],
      ['search', 'O(n)', 'O(1)'],
      ['Total storage', '—', 'O(n)'],
    ],
    howTo: [
      'Choose a stack track such as balanced parentheses or a monotonic stack.',
      'Step through and watch elements enter and leave from the same end.',
      'For the monotonic track, note which elements get popped before a push and why.',
      'Compare the running stack height against the input length.',
    ],
    faqs: [
      {
        q: 'What is a monotonic stack and when do I use it?',
        a: 'A monotonic stack keeps its elements in strictly increasing or decreasing order by popping any element that would violate that order before pushing. It solves next-greater-element, daily-temperatures, largest-rectangle-in-histogram, and trapping-rain-water in O(n), because every element is pushed and popped at most once.',
      },
      {
        q: 'How do you validate balanced parentheses with a stack?',
        a: 'Scan the string once. Push every opening bracket. On a closing bracket, pop and check that the popped bracket is the matching opener — if the stack is empty or the types disagree, the string is invalid. After the scan, the string is balanced only if the stack is empty. O(n) time and O(n) space.',
      },
      {
        q: 'What is the difference between a stack and a queue?',
        a: 'A stack is last-in-first-out: the most recently added element leaves first, and both ends of the operation are the same. A queue is first-in-first-out: elements leave in arrival order, entering at the tail and leaving at the head. Stacks suit backtracking and depth-first traversal; queues suit scheduling and breadth-first traversal.',
      },
    ],
    interviewTip: 'Whenever a problem asks for "next greater element", "previous smaller element", or "largest rectangle in histogram", reach for a monotonic stack. The key insight to verbalize: every element is pushed once and popped at most once, making the overall time complexity strictly O(n) despite the nested while loop. Don\'t forget to clarify what happens when adjacent elements are equal (strictly greater vs. greater or equal).',
    related: [V('queue', 'Queue Visualizer'), V('recursion', 'Recursion Visualizer'), V('linked-list', 'Linked List Visualizer'), V('trees', 'Binary Tree Visualizer')],
  },

  queue: {
    heading: 'Queues and first-in-first-out order',
    intro: [
      'A queue admits elements at the tail and releases them from the head, preserving arrival order. That property is what makes breadth-first search explore a graph level by level rather than diving down one branch.',
      'The variants matter in interviews: a circular queue reuses a fixed buffer without shifting, a deque allows work at both ends, and a priority queue orders by value rather than arrival — which is a heap, not a queue, underneath.',
    ],
    complexityHead: ['Operation', 'Queue', 'Circular queue', 'Deque'],
    complexity: [
      ['enqueue', 'O(1)', 'O(1)', 'O(1) both ends'],
      ['dequeue', 'O(1)', 'O(1)', 'O(1) both ends'],
      ['peek front', 'O(1)', 'O(1)', 'O(1)'],
      ['search', 'O(n)', 'O(n)', 'O(n)'],
      ['Storage', 'O(n)', 'O(capacity)', 'O(n)'],
    ],
    howTo: [
      'Select a queue variant to load its pseudocode.',
      'Step through enqueue and dequeue and watch the head and tail indices move.',
      'On the circular track, watch the tail wrap around the fixed buffer.',
      'Note that the head index advancing is what makes dequeue O(1).',
    ],
    faqs: [
      {
        q: 'Why use a circular queue instead of a plain array queue?',
        a: 'In a plain array queue, dequeuing from index 0 shifts every remaining element left, costing O(n). A circular queue instead advances a head index and wraps it modulo the capacity, so both enqueue and dequeue stay O(1) and the freed slots at the front get reused instead of wasted.',
      },
      {
        q: 'How do you implement a queue using two stacks?',
        a: 'Keep an inbox and an outbox stack. Push every new element onto the inbox. To dequeue, pop from the outbox — and if the outbox is empty first, pour the entire inbox into it, which reverses the order into FIFO. Each element moves between stacks at most once, so dequeue is amortised O(1).',
      },
      {
        q: 'Where are queues used in algorithms?',
        a: 'Breadth-first search on graphs and trees, level-order tree traversal, topological sorting via Kahn\'s algorithm, sliding-window maximum via a deque, and task scheduling. Anywhere you must process items in the order they were discovered, a queue is the structure.',
      },
    ],
    interviewTip: 'In BFS questions, distinguish between using a plain queue (exploring node-by-node) and level-order traversal (capturing the size of the queue before the inner loop: `const levelSize = queue.length`). This snapshot prevents newly added neighbors from leaking into the current level. For sliding-window maximum in O(n), mention a monotonic double-ended queue (deque) storing indices rather than values.',
    related: [V('stack', 'Stack Visualizer'), V('graphs', 'Graph Visualizer'), V('trees', 'Binary Tree Visualizer'), V('heaps', 'Heap Visualizer')],
  },

  'hash-table': {
    heading: 'Hash tables and collision handling',
    intro: [
      'A hash table converts a key into an array index with a hash function, giving average O(1) lookup, insertion, and deletion. That single property is why hash maps appear in more interview solutions than any other structure — they turn nested scans into single passes.',
      'The interesting part is what happens when two keys land in the same bucket. The visualizer shows both strategies: separate chaining, which stores a list per bucket, and open addressing, which probes for the next free slot.',
    ],
    complexityHead: ['Operation', 'Average', 'Worst', 'Notes'],
    complexity: [
      ['Insert', 'O(1)', 'O(n)', 'Worst case when all keys collide'],
      ['Lookup', 'O(1)', 'O(n)', 'Degrades to a scan of one bucket'],
      ['Delete', 'O(1)', 'O(n)', 'Open addressing needs tombstones'],
      ['Resize / rehash', 'O(n)', 'O(n)', 'Triggered past the load factor'],
      ['Storage', 'O(n)', 'O(n)', '—'],
    ],
    howTo: [
      'Choose a collision strategy: separate chaining or linear probing.',
      'Insert keys and watch the hash function map each one to a bucket.',
      'Force a collision and follow how the strategy resolves it.',
      'Watch the load factor climb and trigger a resize.',
    ],
    faqs: [
      {
        q: 'What is a hash collision and how is it resolved?',
        a: 'A collision occurs when two distinct keys hash to the same bucket index. Separate chaining stores a linked list or tree per bucket and appends the new entry. Open addressing instead probes for another slot — linearly, quadratically, or by double hashing. Chaining degrades more gracefully under load; open addressing is more cache-friendly when the table is sparse.',
      },
      {
        q: 'Why is hash table lookup O(1) on average but O(n) in the worst case?',
        a: 'With a good hash function and a bounded load factor, keys spread evenly so each bucket holds a constant number of entries, making lookup constant time. If every key hashes to the same bucket — through a poor hash function or adversarial input — the table degenerates into a single list and lookup becomes a linear scan.',
      },
      {
        q: 'What is the load factor and why does it trigger a resize?',
        a: 'The load factor is the ratio of stored entries to buckets. As it rises, collisions become frequent and operations drift away from O(1). Most implementations resize — allocating a larger bucket array and rehashing every key — once the load factor passes a threshold, commonly 0.75.',
      },
    ],
    interviewTip: 'In interviews, when using a hash map for frequency counting or prefix sums, beware of worst-case O(n) degradation under hash collisions. In C++, mentioning that `std::unordered_map` can be hacked to O(n²) with anti-hash test cases and proposing a custom splitmix64 hasher demonstrates senior-level systems depth. For 2-Sum and Subarray Sum Equals K, highlight that a running prefix sum map solves the problem in a single O(n) pass.',
    related: [V('arrays', 'Array Visualizer'), V('two-pointers', 'Two Pointers Visualizer'), V('sliding-window', 'Sliding Window Visualizer'), V('trees', 'Binary Tree Visualizer')],
  },

  heaps: {
    heading: 'Heaps and priority queues',
    intro: [
      'A binary heap is a complete binary tree stored in a flat array, maintaining one rule: every parent compares favourably to its children. That single invariant gives O(1) access to the minimum or maximum and O(log n) insertion and removal.',
      'Because the tree is complete, the array layout needs no pointers — children of index i live at 2i+1 and 2i+2. The visualizer shows both views at once so the sift-up and sift-down paths are visible in the tree and in the array.',
    ],
    complexityHead: ['Operation', 'Time', 'Notes'],
    complexity: [
      ['peek min / max', 'O(1)', 'Always the root, index 0'],
      ['insert', 'O(log n)', 'Sift up along one root path'],
      ['extract min / max', 'O(log n)', 'Swap root with last, then sift down'],
      ['build heap from array', 'O(n)', 'Bottom-up heapify, not O(n log n)'],
      ['search arbitrary value', 'O(n)', 'Heaps are only partially ordered'],
    ],
    howTo: [
      'Choose a min-heap or max-heap track.',
      'Insert a value and follow the sift-up path to its final position.',
      'Extract the root and watch the last element move up then sift down.',
      'Compare the tree diagram against the array indices at every step.',
    ],
    faqs: [
      {
        q: 'What is the difference between a heap and a binary search tree?',
        a: 'A heap enforces order only between parent and child, so the minimum or maximum is at the root but siblings are unordered — finding an arbitrary value costs O(n). A binary search tree enforces a full left-less-than-node-less-than-right ordering, giving O(log n) search and sorted in-order traversal, but no O(1) access to the extreme value.',
      },
      {
        q: 'Why is building a heap O(n) and not O(n log n)?',
        a: 'Bottom-up heapify sifts down from the last internal node upward. Most nodes sit near the bottom and sift down only a level or two; only the root can travel the full height. Summing the work across all levels gives a geometric series that converges to O(n), even though each individual sift-down is O(log n) in the worst case.',
      },
      {
        q: 'How do I find the k largest elements efficiently?',
        a: 'Maintain a min-heap of size k. Push each element, and whenever the heap exceeds k, pop the smallest. Every element costs at most O(log k), so the total is O(n log k) time and O(k) space — considerably better than sorting the whole array when k is small.',
      },
    ],
    interviewTip: 'In top-K problems, candidates often reflexively reach for a max-heap to find top-K elements — but maintaining a MIN-heap of size K is far superior, keeping space to O(K) and time to O(n log K). When asked about heap creation, always explain why `buildHeap` (heapify) is O(n) using the geometric series summation across levels rather than O(n log n). Interviewers specifically test this theoretical distinction.',
    related: [V('trees', 'Binary Tree Visualizer'), V('sorting', 'Sorting Visualizer'), V('queue', 'Queue Visualizer'), V('graphs', 'Graph Visualizer')],
  },

  trees: {
    heading: 'Binary trees and traversal orders',
    intro: [
      'A binary search tree keeps every left subtree below its node and every right subtree above it. That invariant makes search, insertion, and deletion O(log n) on a balanced tree — and O(n) on a degenerate one, which is precisely why balanced variants such as AVL and red-black trees exist.',
      'Traversal order is the other half of tree interviews. In-order visits a BST in sorted order, pre-order copies structure, post-order frees children before parents, and level-order explores breadth-first with a queue.',
    ],
    complexityHead: ['Operation', 'Balanced', 'Worst (skewed)', 'Space'],
    complexity: [
      ['Search', 'O(log n)', 'O(n)', 'O(h) recursion'],
      ['Insert', 'O(log n)', 'O(n)', 'O(h) recursion'],
      ['Delete', 'O(log n)', 'O(n)', 'O(h) recursion'],
      ['In-order traversal', 'O(n)', 'O(n)', 'O(h)'],
      ['Level-order traversal', 'O(n)', 'O(n)', 'O(w) queue width'],
    ],
    howTo: [
      'Insert several values and watch the comparison path from the root.',
      'Run each traversal and compare the emitted order.',
      'Confirm that in-order on a BST produces a sorted sequence.',
      'Insert already-sorted values to build a skewed tree and see O(n) appear.',
    ],
    faqs: [
      {
        q: 'What is the difference between in-order, pre-order, and post-order traversal?',
        a: 'They differ in when the node is visited relative to its subtrees. In-order visits left, node, right — on a BST this yields sorted output. Pre-order visits node, left, right, which is useful for serialising or copying a tree because the root arrives first. Post-order visits left, right, node, which suits deleting or evaluating expression trees since children resolve before their parent.',
      },
      {
        q: 'How do you check if a binary tree is a valid BST?',
        a: 'Comparing each node against only its immediate children is the classic wrong answer — it accepts trees that violate the invariant deeper down. Instead recurse carrying a permitted (min, max) range: the left child inherits (min, node.value) and the right child inherits (node.value, max). Any node outside its range invalidates the tree. O(n) time, O(h) space.',
      },
      {
        q: 'Why do balanced trees matter?',
        a: 'A BST\'s operations cost O(h), where h is the height. A balanced tree keeps h at Θ(log n), but inserting sorted data into a plain BST produces a linked list with h = n, degrading every operation to O(n). AVL and red-black trees restore balance through rotations on insert and delete, guaranteeing logarithmic height.',
      },
    ],
    interviewTip: 'For binary tree recursion, always decide upfront whether the problem needs bottom-up (post-order: compute left, compute right, then combine — e.g. diameter, max path sum) or top-down (pre-order: pass parameters down — e.g. path sum target). For BST questions, remind the interviewer that an in-order traversal yields strictly ascending values, which turns problems like "find K-th smallest element" or "validate BST" into linear or early-exit scans.',
    related: [V('graphs', 'Graph Visualizer'), V('heaps', 'Heap Visualizer'), V('recursion', 'Recursion Visualizer'), V('searching', 'Binary Search Visualizer')],
  },

  graphs: {
    heading: 'Graph traversal and shortest paths',
    intro: [
      'Graphs generalise trees by dropping the single-parent restriction, so traversal has to track visited nodes or risk looping forever. BFS explores in expanding rings from the source; DFS commits to one path until it dead-ends and then backtracks.',
      'That difference decides which to reach for. BFS finds the fewest-edges path on an unweighted graph; DFS suits cycle detection, topological ordering, and connected components. Dijkstra extends BFS with a priority queue to handle non-negative edge weights.',
    ],
    complexityHead: ['Algorithm', 'Time', 'Space', 'Use case'],
    complexity: [
      ['BFS', 'O(V + E)', 'O(V)', 'Shortest path, unweighted'],
      ['DFS', 'O(V + E)', 'O(V)', 'Cycles, components, topological sort'],
      ["Dijkstra", 'O((V + E) log V)', 'O(V)', 'Shortest path, non-negative weights'],
      ['Bellman-Ford', 'O(V × E)', 'O(V)', 'Handles negative edges'],
      ['Topological sort', 'O(V + E)', 'O(V)', 'Dependency ordering, DAGs only'],
    ],
    howTo: [
      'Pick a traversal and a starting node.',
      'Step through and watch the frontier — a queue for BFS, a stack or recursion for DFS.',
      'Follow the visited set and see why revisiting is skipped.',
      'On Dijkstra, watch tentative distances get relaxed as shorter paths appear.',
    ],
    faqs: [
      {
        q: 'When should I use BFS instead of DFS?',
        a: 'Use BFS when you need the shortest path in an unweighted graph or the minimum number of steps, because it reaches every node by the fewest edges first. Use DFS for cycle detection, topological sorting, connected components, and exhaustive path exploration. BFS uses memory proportional to the widest level; DFS uses memory proportional to the deepest path.',
      },
      {
        q: 'How does Dijkstra\'s algorithm work?',
        a: 'Start every node at infinite distance except the source at zero. Repeatedly extract the unvisited node with the smallest tentative distance from a priority queue, then relax each outgoing edge — if travelling through the current node reaches a neighbour more cheaply, update that neighbour. Once a node is extracted its distance is final. With a binary heap this runs in O((V + E) log V).',
      },
      {
        q: 'Why does Dijkstra fail on negative edge weights?',
        a: 'Dijkstra assumes that once it extracts the closest unvisited node, no cheaper route to it can appear later. A negative edge breaks that assumption, since a longer-looking detour can become cheaper further along. Bellman-Ford handles negative weights by relaxing every edge V-1 times, at O(V × E), and can also report negative cycles.',
      },
      {
        q: 'How do you detect a cycle in a graph?',
        a: 'In an undirected graph, run DFS and report a cycle if you reach a visited node that is not the immediate parent. In a directed graph, track nodes on the current recursion stack — an edge back to a node still on the stack is a back edge and proves a cycle. Alternatively, run Kahn\'s topological sort: if it emits fewer than V nodes, a cycle exists.',
      },
    ],
    interviewTip: 'Always clarify if the graph is directed, undirected, cyclic, or disconnected. For BFS/DFS on grids, the most common bug is marking a cell as visited when dequeuing rather than when ENQUEUING — enqueuing without marking immediately leads to duplicate entries and exponential memory explosion. For topological sort, proactively compare Kahn\'s BFS algorithm (in-degree array) with DFS (post-order reverse + cycle stack).',
    related: [V('trees', 'Binary Tree Visualizer'), V('queue', 'Queue Visualizer'), V('backtracking', 'Backtracking Visualizer'), V('heaps', 'Heap Visualizer')],
  },

  recursion: {
    heading: 'Recursion and the call stack',
    intro: [
      'Recursion solves a problem by expressing it in terms of smaller instances of itself. Every recursive function needs two things: a base case that stops the descent, and a recursive case that provably moves toward it.',
      'The visualizer draws the call stack as frames pile up and unwind, which is the mental model that makes recursion click — each frame holds its own local state, and the return value flows back up through the parents that are waiting.',
    ],
    complexityHead: ['Pattern', 'Time', 'Space', 'Example'],
    complexity: [
      ['Linear recursion', 'O(n)', 'O(n) stack', 'Factorial, list length'],
      ['Binary recursion', 'O(2ⁿ)', 'O(n) stack', 'Naive Fibonacci'],
      ['Divide and conquer', 'O(n log n)', 'O(log n) stack', 'Merge Sort'],
      ['Memoised recursion', 'O(n)', 'O(n) table + stack', 'Top-down DP'],
      ['Tail recursion', 'O(n)', 'O(1) if optimised', 'Accumulator style'],
    ],
    howTo: [
      'Choose a recursive problem such as factorial, Fibonacci, or Towers of Hanoi.',
      'Step forward and watch new frames stack on each call.',
      'Reach the base case and watch values return back up the stack.',
      'On naive Fibonacci, spot the repeated subtrees that memoisation eliminates.',
    ],
    faqs: [
      {
        q: 'What causes a stack overflow in recursion?',
        a: 'Each call reserves a stack frame for its parameters, locals, and return address. If the base case is missing, unreachable, or the recursion simply goes deeper than the stack allows — often a few thousand frames — the stack runs out of space and the program crashes. Fix it by ensuring the base case is reachable, or convert the recursion to an explicit loop with your own stack.',
      },
      {
        q: 'What is the difference between recursion and iteration?',
        a: 'Both repeat work, but recursion delegates state to the call stack while iteration keeps state in explicit variables. Recursion expresses tree- and graph-shaped problems far more naturally; iteration avoids per-call overhead and stack-depth limits. Any recursion can be rewritten iteratively with an explicit stack, though clarity often suffers.',
      },
      {
        q: 'What is tail recursion?',
        a: 'A call is tail recursive when the recursive call is the very last operation, with nothing left to compute after it returns. Because the parent frame has no remaining work, a compiler can reuse it instead of allocating a new one, reducing stack usage to O(1). Scheme and Scala guarantee this optimisation; JavaScript engines and CPython generally do not.',
      },
    ],
    interviewTip: 'Before writing any recursive function, explicitly state your base case, your recursive step, and your termination guarantee. Interviewers scrutinize the call stack: always calculate space complexity including the recursion depth (e.g. O(h) for tree height, O(n) for skewed tree). When optimizing recursion, know when to transition to memoization (top-down) or iteration with an explicit stack to prevent stack overflow on large inputs.',
    related: [V('backtracking', 'Backtracking Visualizer'), V('dp', 'Dynamic Programming Visualizer'), V('trees', 'Binary Tree Visualizer'), V('stack', 'Stack Visualizer')],
  },

  backtracking: {
    heading: 'Backtracking and constraint search',
    intro: [
      'Backtracking explores a decision tree depth-first, abandoning a branch the moment it cannot lead to a valid solution. The undo step — restoring state after exploring a choice — is what separates it from plain recursion.',
      'Pruning is where the performance comes from. N-Queens, Sudoku, and permutation problems are all exponential in the worst case, but a good validity check discards enormous subtrees before they are ever expanded.',
    ],
    complexityHead: ['Problem', 'Time', 'Space', 'Notes'],
    complexity: [
      ['Subsets', 'O(2ⁿ × n)', 'O(n)', 'Every element in or out'],
      ['Permutations', 'O(n! × n)', 'O(n)', 'All orderings'],
      ['Combinations (n choose k)', 'O(C(n,k) × k)', 'O(k)', 'Pruned by index'],
      ['N-Queens', 'O(n!)', 'O(n²)', 'Heavily pruned in practice'],
      ['Sudoku solver', 'O(9^cells)', 'O(1)', 'Constraint propagation prunes hard'],
    ],
    howTo: [
      'Pick a backtracking problem to load its decision tree.',
      'Step forward and watch each choice push deeper into the tree.',
      'Watch a constraint fail and the algorithm undo that choice.',
      'Note the pruned subtrees that are never explored.',
    ],
    faqs: [
      {
        q: 'What is the difference between backtracking and brute force?',
        a: 'Brute force generates every candidate and tests each at the end. Backtracking tests partial candidates as it builds them and abandons a branch as soon as it becomes invalid, so entire subtrees are never generated. Both are exponential in the worst case, but backtracking is dramatically faster whenever constraints prune early.',
      },
      {
        q: 'What is the standard backtracking template?',
        a: 'Three steps inside a recursive function: if the current state is a complete solution, record it and return; otherwise, for each candidate choice, apply the choice, recurse, then undo the choice. That final undo — restoring the state you mutated — is the "backtrack" and is the step most often forgotten.',
      },
      {
        q: 'How do I avoid duplicate results when the input has repeats?',
        a: 'Sort the input first, then within each recursion level skip a candidate if it equals the previous one and that previous one was not itself chosen at this level. This ensures duplicates are only ever used in one canonical order, which removes repeated subsets and permutations without a post-hoc deduplication pass.',
      },
    ],
    interviewTip: 'The golden rule of backtracking: choose, explore, and UNCHOOSE. Always highlight where the undo step occurs. To prevent duplicate subsets or permutations when inputs contain duplicate values, sort the input upfront and prune with `if (i > start && nums[i] === nums[i - 1]) continue;`. Mentioning this pruning strategy upfront signals mastery of combinatorial search templates.',
    related: [V('recursion', 'Recursion Visualizer'), V('dp', 'Dynamic Programming Visualizer'), V('graphs', 'Graph Visualizer'), V('trees', 'Binary Tree Visualizer')],
  },

  dp: {
    heading: 'Dynamic programming, memoisation and tabulation',
    intro: [
      'Dynamic programming applies when a problem has optimal substructure — the best answer is built from best answers to subproblems — and overlapping subproblems, meaning the same subproblem recurs many times. Caching those repeats collapses exponential recursion to polynomial time.',
      'Top-down memoisation adds a cache to the natural recursion; bottom-up tabulation fills a table in dependency order and avoids the call stack entirely. The visualizer shows the table filling cell by cell, with each cell\'s dependencies highlighted.',
    ],
    complexityHead: ['Problem', 'Time', 'Space', 'Space-optimised'],
    complexity: [
      ['Fibonacci', 'O(n)', 'O(n)', 'O(1) with two variables'],
      ['Climbing stairs', 'O(n)', 'O(n)', 'O(1)'],
      ['0/1 Knapsack', 'O(n × W)', 'O(n × W)', 'O(W) with a rolling row'],
      ['Longest common subsequence', 'O(n × m)', 'O(n × m)', 'O(min(n, m))'],
      ['Coin change', 'O(n × amount)', 'O(amount)', 'O(amount)'],
    ],
    howTo: [
      'Choose a DP problem to load its recurrence and table.',
      'Step through and watch each cell computed from its dependencies.',
      'Follow the highlighted dependency arrows to see the recurrence applied.',
      'Trace back from the final cell to reconstruct the chosen solution.',
    ],
    faqs: [
      {
        q: 'What is the difference between memoisation and tabulation?',
        a: 'Memoisation is top-down: you write the natural recursion and cache each result so repeated subproblems return instantly. Tabulation is bottom-up: you iterate subproblems in dependency order and fill a table, no recursion involved. Memoisation only computes the subproblems actually reached; tabulation avoids stack-depth limits and is usually easier to space-optimise.',
      },
      {
        q: 'How do I recognise a dynamic programming problem?',
        a: 'Look for two signals together. Optimal substructure: the answer decomposes into answers of smaller instances. Overlapping subproblems: a plain recursion would recompute the same inputs repeatedly. Problems asking for a count of ways, a minimum or maximum over choices, or whether a target is reachable are usually DP. If subproblems never repeat, divide and conquer is the better fit.',
      },
      {
        q: 'How do I reduce the space used by a DP table?',
        a: 'Check which previous rows or columns the recurrence actually reads. If each cell depends only on the row above, keep two rows and swap them, or iterate a single row backwards — that turns O(n × W) into O(W). Knapsack, LCS, and edit distance all admit this optimisation, at the cost of losing the full table needed to reconstruct the solution path.',
      },
    ],
    interviewTip: 'Structure your DP response in 4 clear steps: (1) define the state `dp[i][j]`, (2) write the base cases, (3) state the transition recurrence, and (4) identify the order of computation. Always finish by analyzing if space can be compressed — e.g. if `dp[i]` only depends on `dp[i-1]`, explain how a 2D matrix collapses into two rows or a single 1D array traversed backwards (like in 0/1 Knapsack).',
    related: [V('recursion', 'Recursion Visualizer'), V('backtracking', 'Backtracking Visualizer'), V('arrays', 'Array Visualizer'), V('graphs', 'Graph Visualizer')],
  },

  'two-pointers': {
    heading: 'The two pointers pattern',
    intro: [
      'Two pointers replaces a nested loop with a single coordinated pass. Two indices move through the data under a rule — converging from both ends, or advancing at different speeds — turning an O(n²) scan into O(n).',
      'The pattern requires structure to exploit, usually sortedness. On a sorted array, comparing the sum at both ends tells you unambiguously which pointer to move, so no candidate is ever missed.',
    ],
    complexityHead: ['Variant', 'Time', 'Space', 'Typical problem'],
    complexity: [
      ['Converging pointers', 'O(n)', 'O(1)', 'Two Sum II, valid palindrome'],
      ['Fast and slow', 'O(n)', 'O(1)', 'Cycle detection, middle of list'],
      ['Same-direction', 'O(n)', 'O(1)', 'Remove duplicates, move zeroes'],
      ['Two arrays', 'O(n + m)', 'O(1)', 'Merge sorted arrays'],
      ['Three pointers', 'O(n²)', 'O(1)', 'Three Sum after sorting'],
    ],
    howTo: [
      'Pick a two-pointer problem to load its array and pointers.',
      'Step through and watch which pointer moves after each comparison.',
      'Confirm why moving the other pointer could not produce a better answer.',
      'Track the total number of steps — each pointer crosses the array once.',
    ],
    faqs: [
      {
        q: 'When can I use the two pointers technique?',
        a: 'When the data has structure that tells you unambiguously which pointer to advance — most often a sorted array, a palindrome check from both ends, or a linked list where relative speed matters. If moving a pointer could discard a valid answer, the pattern does not apply and you likely need a hash map or sliding window instead.',
      },
      {
        q: 'How does two pointers solve Two Sum on a sorted array?',
        a: 'Place one pointer at each end and compare their sum to the target. If the sum is too small, advance the left pointer, since only a larger value can help. If it is too large, retreat the right pointer. Each step eliminates one candidate permanently, so the pair is found in O(n) time and O(1) space — no hash map required.',
      },
      {
        q: 'What is the fast and slow pointer variant?',
        a: 'Two pointers advance through the same sequence at different rates, typically one step versus two. If a cycle exists the fast pointer laps the slow one and they meet; if not, fast reaches the end first. The same idea locates the middle of a linked list in one pass, since the slow pointer is halfway when the fast pointer finishes.',
      },
    ],
    interviewTip: 'Two-pointer problems often hide a sorting prerequisite: "find two numbers that sum to target" only works with converging pointers if the array is sorted. Always ask if the input is sorted before assuming two pointers will work. For unsorted input, a hash set is O(n) and avoids the O(n log n) sort. Interviewers award extra points when you proactively mention both approaches and explain the trade-off.',
    related: [V('sliding-window', 'Sliding Window Visualizer'), V('arrays', 'Array Visualizer'), V('linked-list', 'Linked List Visualizer'), V('searching', 'Binary Search Visualizer')],
  },

  'sliding-window': {
    heading: 'The sliding window pattern',
    intro: [
      'A sliding window maintains a contiguous range over an array or string and updates an aggregate incrementally as the range moves, instead of recomputing it from scratch. That incremental update is what converts an O(n × k) recomputation into O(n).',
      'Fixed windows advance both boundaries in lockstep. Variable windows expand the right edge until a constraint breaks, then contract the left edge until it holds again — which is how "longest substring with…" problems are solved in one pass.',
    ],
    complexityHead: ['Variant', 'Time', 'Space', 'Typical problem'],
    complexity: [
      ['Fixed-size window', 'O(n)', 'O(1)', 'Max sum of k consecutive elements'],
      ['Variable-size window', 'O(n)', 'O(k)', 'Longest substring without repeats'],
      ['Window with hash map', 'O(n)', 'O(k)', 'Minimum window substring'],
      ['Window with deque', 'O(n)', 'O(k)', 'Sliding window maximum'],
      ['Naive recomputation', 'O(n × k)', 'O(1)', 'The baseline this replaces'],
    ],
    howTo: [
      'Choose a fixed or variable window problem.',
      'Step through and watch the right edge expand the window.',
      'Watch the left edge contract when the constraint is violated.',
      'Note that the aggregate updates incrementally rather than being recomputed.',
    ],
    faqs: [
      {
        q: 'What is the difference between fixed and variable sliding windows?',
        a: 'A fixed window keeps a constant size: both edges advance together, one element enters and one leaves per step. A variable window changes size to satisfy a constraint — the right edge expands greedily, and the left edge contracts only when the window becomes invalid. Fixed windows suit "every k consecutive elements" questions; variable windows suit longest-or-shortest-satisfying questions.',
      },
      {
        q: 'Why is a sliding window O(n) if there are two nested loops?',
        a: 'Because the inner loop does not restart. The left pointer only ever moves forward, and across the entire run it advances at most n times in total. Each element enters the window once and leaves at most once, so the combined work is O(2n) = O(n) despite the nested structure in the code.',
      },
      {
        q: 'When should I use a sliding window instead of two pointers?',
        a: 'Use a sliding window when the answer is about a contiguous subarray or substring and you are tracking an aggregate over that range — a sum, a character count, a distinct-element count. Use two pointers when you are comparing or pairing individual elements, typically converging from both ends of sorted data.',
      },
    ],
    interviewTip: 'The single most common sliding window mistake in interviews is resetting the aggregate on shrink rather than incrementally updating it. When the left pointer moves right, subtract the element leaving rather than recomputing the sum or hash map from scratch. Also: if an interviewer asks for the "minimum window substring", immediately say you will use a hash map to track character counts — this tells them you know the O(n) path without being asked.',
    related: [V('two-pointers', 'Two Pointers Visualizer'), V('hash-table', 'Hash Table Visualizer'), V('arrays', 'Array Visualizer'), V('queue', 'Queue Visualizer')],
  },
};

export function getVisualizerContent(topicId) {
  return VISUALIZER_CONTENT[topicId] ?? null;
}

/** FAQPage JSON-LD for a topic, or null when the topic has no entry. */
export function getVisualizerFaqSchema(topicId, pageUrl) {
  const content = VISUALIZER_CONTENT[topicId];
  if (!content?.faqs?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: content.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
