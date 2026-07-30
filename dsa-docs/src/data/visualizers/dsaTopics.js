export const DSA_TOPICS = {
  'two-pointers': {
    title: 'Two Pointers',
    icon: '👉👈',
    description: 'An algorithmic pattern where two pointers iterate across a data structure together to solve search and window subproblems.',
    overview: {
      what: 'The Two Pointers pattern involves iterating two pointers over a sequence (such as an array or linked list) simultaneously to reduce time complexity from O(n²) to O(n).',
      why: 'Opposite-ends pointers or fast/slow pointers allow searching sorted arrays or detecting cycles in linear time with O(1) extra space.',
      examples: ['Two Sum II on sorted array', 'Valid Palindrome checking', '3Sum & 4Sum problems', 'Container With Most Water', 'Trapping Rain Water'],
      advantages: ['Reduces O(n²) nested loops to O(n) linear scans', 'O(1) auxiliary space (in-place operation)', 'Intuitive geometric/converging logic', 'Foundation for Sliding Window technique'],
      disadvantages: ['Requires array to be sorted for opposite-ends variant', 'Does not work directly on non-sequential data structures', 'Careful edge case handling required for index boundary checks'],
    },
    complexity: [
      { operation: 'Two Sum II (Sorted)', time: 'O(n)', space: 'O(1)' },
      { operation: 'Valid Palindrome', time: 'O(n)', space: 'O(1)' },
      { operation: '3Sum', time: 'O(n²)', space: 'O(1)' },
      { operation: 'Container With Most Water', time: 'O(n)', space: 'O(1)' },
      { operation: 'Remove Duplicates', time: 'O(n)', space: 'O(1)' },
    ],
    code: {
      javascript: `// Two Sum II - Opposite Ends Two Pointers in JavaScript
function twoSumII(numbers, target) {
  let left = 0, right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    if (sum < target) left++;
    else right--;
  }
  return [];
}`,
      typescript: `function twoSumII(numbers: number[], target: number): number[] {
  let left = 0, right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    if (sum < target) left++;
    else right--;
  }
  return [];
}`,
      python: `# Two Sum II in Python
def two_sum_ii(numbers: list[int], target: int) -> list[int]:
    left, right = 0, len(numbers) - 1
    while left < right:
        s = numbers[left] + numbers[right]
        if s == target:
            return [left + 1, right + 1]
        elif s < target:
            left += 1
        else:
            right -= 1
    return []`,
      java: `public int[] twoSum(int[] numbers, int target) {
    int left = 0, right = numbers.length - 1;
    while (left < right) {
        int sum = numbers[left] + numbers[right];
        if (sum == target) return new int[]{left + 1, right + 1};
        if (sum < target) left++;
        else right--;
    }
    return new int[0];
}`,
      cpp: `vector<int> twoSum(vector<int>& numbers, int target) {
    int left = 0, right = numbers.size() - 1;
    while (left < right) {
        int sum = numbers[left] + numbers[right];
        if (sum == target) return {left + 1, right + 1};
        if (sum < target) left++;
        else right--;
    }
    return {};
}`,
    },
    interviewQuestions: [
      { question: 'Two Sum II - Input Array Is Sorted', difficulty: 'Medium', hint: 'If sum < target, increment left; if sum > target, decrement right.' },
      { question: 'Valid Palindrome', difficulty: 'Easy', hint: 'Compare left and right characters while skipping non-alphanumeric characters.' },
      { question: 'Container With Most Water', difficulty: 'Medium', hint: 'Width decreases every step, so move the shorter line inward to attempt finding a higher line.' },
    ],
  },
  arrays: {
    title: 'Arrays',
    icon: '\u{1F4CB}',
    description: 'An array is a linear data structure that stores elements in contiguous memory locations.',
    overview: {
      what: 'An array is a collection of items stored at contiguous memory locations. The idea is to store multiple items of the same type together.',
      why: 'Arrays provide O(1) random access to elements using index, making them incredibly fast for read operations.',
      examples: ['Storing a list of student grades', 'Maintaining a collection of sensor readings', 'Implementing game boards (grids as 2D arrays)', 'Buffer storage in streaming applications'],
      advantages: ['O(1) time access to any element via index', 'Cache-friendly memory layout (contiguous)', 'Simple and widely understood', 'Foundation for other data structures'],
      disadvantages: ['Fixed size (static arrays) - cannot grow dynamically', 'O(n) insertion and deletion in the middle', 'Wasted space if underutilized', 'Expensive to resize (copy entire array)'],
    },
    complexity: [
      { operation: 'Access (by index)', time: 'O(1)', space: 'O(1)' },
      { operation: 'Search (unsorted)', time: 'O(n)', space: 'O(1)' },
      { operation: 'Insert (at end)', time: 'O(1)*', space: 'O(1)' },
      { operation: 'Insert (at index)', time: 'O(n)', space: 'O(1)' },
      { operation: 'Delete (at index)', time: 'O(n)', space: 'O(1)' },
      { operation: 'Traverse', time: 'O(n)', space: 'O(1)' },
    ],
    code: {
      javascript: `// Array operations in JavaScript\nconst arr = [1, 2, 3, 4, 5];\narr.push(6);           // O(1) - insert at end\narr.splice(2, 0, 99);  // O(n) - insert at index\narr.splice(2, 1);      // O(n) - delete at index\nconsole.log(arr[0]);   // O(1) - access\nconst idx = arr.indexOf(4); // O(n) - search\nfor (const item of arr) { console.log(item); } // O(n) - traverse`,
      typescript: `// Array operations in TypeScript\nconst arr: number[] = [1, 2, 3, 4, 5];\narr.push(6);\narr.splice(2, 0, 99);\narr.splice(2, 1);\nconst first: number = arr[0];`,
      python: `# Array operations in Python\narr = [1, 2, 3, 4, 5]\narr.append(6)           # O(1)\narr.insert(2, 99)       # O(n)\narr.pop(2)              # O(n)\nfirst = arr[0]          # O(1)\nindex = arr.index(4)    # O(n)`,
      java: `// Array operations in Java\nint[] arr = {1, 2, 3, 4, 5};\n// Arrays have fixed size; use ArrayList for dynamic\nimport java.util.ArrayList;\nArrayList<Integer> list = new ArrayList<>();\nlist.add(6);\nlist.add(2, 99);\nlist.remove(2);\nint first = list.get(0);`,
      cpp: `// Array operations in C++\n#include <vector>\nstd::vector<int> arr = {1, 2, 3, 4, 5};\narr.push_back(6);\narr.insert(arr.begin() + 2, 99);\narr.erase(arr.begin() + 2);\nint first = arr[0];`,
    },
    interviewQuestions: [
      { question: 'Find the maximum subarray sum (Kadane Algorithm)', difficulty: 'Medium', hint: 'Track current sum and max sum, reset if current goes negative' },
      { question: 'Two Sum - find two numbers that add to a target', difficulty: 'Easy', hint: 'Use a hash map to store complements' },
      { question: 'Move all zeros to the end while maintaining relative order', difficulty: 'Easy', hint: 'Use two-pointer technique' },
    ],
  },
  sorting: {
    title: 'Sorting Algorithms',
    icon: '\u{1F500}',
    description: 'Sorting algorithms arrange elements in a specific order with different time/space trade-offs.',
    overview: {
      what: 'Sorting is the process of arranging data in a specific order. It is a fundamental operation in computer science.',
      why: 'Sorting enables efficient searching (binary search), data organization, and is a building block for complex algorithms.',
      examples: ['Organizing a list of names alphabetically', 'Ranking search results by relevance', 'Sorting financial transactions by date', 'Preprocessing data for merge operations'],
      advantages: ['Enables binary search (O(log n))', 'Simplifies data analysis and visualization', 'Required for many algorithms (e.g., finding median)', 'Improves cache performance in some cases'],
      disadvantages: ['Can be expensive for large datasets', 'Some algorithms use extra memory', 'Not all sorts are stable', 'No single best algorithm for all cases'],
    },
    complexity: [
      { operation: 'Bubble Sort', time: 'O(n\u00B2)', space: 'O(1)' },
      { operation: 'Selection Sort', time: 'O(n\u00B2)', space: 'O(1)' },
      { operation: 'Insertion Sort', time: 'O(n\u00B2)', space: 'O(1)' },
      { operation: 'Merge Sort', time: 'O(n log n)', space: 'O(n)' },
      { operation: 'Quick Sort', time: 'O(n log n)*', space: 'O(log n)' },
      { operation: 'Heap Sort', time: 'O(n log n)', space: 'O(1)' },
    ],
    code: {
      javascript: `function bubbleSort(arr) {\n  const n = arr.length;\n  for (let i = 0; i < n - 1; i++) {\n    for (let j = 0; j < n - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n    }\n  }\n  return arr;\n}\nfunction quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[arr.length - 1];\n  const left = arr.filter(x => x < pivot);\n  const right = arr.filter(x => x > pivot);\n  return [...quickSort(left), ...arr.filter(x => x === pivot), ...quickSort(right)];\n}`,
      typescript: `function bubbleSort(arr: number[]): number[] {\n  const n = arr.length;\n  for (let i = 0; i < n - 1; i++) {\n    for (let j = 0; j < n - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n    }\n  }\n  return arr;\n}`,
      python: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n - 1):\n        for j in range(n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n    return arr`,
      java: `public static void bubbleSort(int[] arr) {\n    int n = arr.length;\n    for (int i = 0; i < n - 1; i++) {\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                int temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n            }\n        }\n    }\n}`,
      cpp: `void bubbleSort(std::vector<int>& arr) {\n    int n = arr.size();\n    for (int i = 0; i < n - 1; i++) {\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) std::swap(arr[j], arr[j + 1]);\n        }\n    }\n}`,
    },
    interviewQuestions: [
      { question: 'Implement merge sort', difficulty: 'Medium', hint: 'Divide array in half, recursively sort each half, merge results' },
      { question: 'Find kth smallest element in an array', difficulty: 'Medium', hint: 'Use QuickSelect (partition-based) for O(n) average' },
      { question: 'Sort an array of 0s, 1s, and 2s (Dutch National Flag)', difficulty: 'Medium', hint: 'Use three pointers - low, mid, high' },
    ],
  },
  trees: {
    title: 'Trees',
    icon: '\u{1F333}',
    description: 'A tree is a hierarchical data structure with a root node and subtrees of children nodes.',
    overview: {
      what: 'A tree is a non-linear data structure with a root node and subtrees of children. Each node has at most one parent (except root).',
      why: 'Trees model hierarchical relationships efficiently. BSTs provide O(log n) search, insert, and delete operations.',
      examples: ['File system directory structure', 'DOM (Document Object Model) in browsers', 'Organization charts', 'Routing tables in networks'],
      advantages: ['Hierarchical data representation', 'Fast search, insert, delete in balanced BSTs', 'Natural fit for recursive algorithms', 'Used in databases (B-trees, B+ trees)'],
      disadvantages: ['Complex implementation compared to arrays/lists', 'Tree can become unbalanced (skewed)', 'Requires more memory per node (pointers)', 'Traversal can be complex'],
    },
    complexity: [
      { operation: 'Search (BST)', time: 'O(log n)*', space: 'O(log n)' },
      { operation: 'Insert (BST)', time: 'O(log n)*', space: 'O(log n)' },
      { operation: 'Delete (BST)', time: 'O(log n)*', space: 'O(log n)' },
      { operation: 'Inorder Traversal', time: 'O(n)', space: 'O(n)' },
      { operation: 'Preorder Traversal', time: 'O(n)', space: 'O(n)' },
      { operation: 'Postorder Traversal', time: 'O(n)', space: 'O(n)' },
      { operation: 'Level Order Traversal', time: 'O(n)', space: 'O(n)' },
    ],
    code: {
      javascript: `class TreeNode {\n  constructor(value) { this.value = value; this.left = null; this.right = null; }\n}\nclass BST {\n  constructor() { this.root = null; }\n  insert(value) {\n    if (!this.root) { this.root = new TreeNode(value); return; }\n    let curr = this.root;\n    while (true) {\n      if (value < curr.value) {\n        if (!curr.left) { curr.left = new TreeNode(value); return; }\n        curr = curr.left;\n      } else {\n        if (!curr.right) { curr.right = new TreeNode(value); return; }\n        curr = curr.right;\n      }\n    }\n  }\n  inorder(node = this.root, res = []) {\n    if (!node) return res;\n    this.inorder(node.left, res);\n    res.push(node.value);\n    this.inorder(node.right, res);\n    return res;\n  }\n}`,
      typescript: `class TreeNode<T> {\n  constructor(public value: T, public left: TreeNode<T> | null = null, public right: TreeNode<T> | null = null) {}\n}`,
      python: `class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None`,
      java: `class TreeNode {\n    int value;\n    TreeNode left, right;\n    TreeNode(int value) { this.value = value; }\n}`,
      cpp: `struct TreeNode {\n    int value;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(int v) : value(v), left(nullptr), right(nullptr) {}\n};`,
    },
    interviewQuestions: [
      { question: 'Find the maximum depth/height of a binary tree', difficulty: 'Easy', hint: 'Recursively find max of left and right subtrees' },
      { question: 'Check if a binary tree is a valid BST', difficulty: 'Medium', hint: 'Pass min/max range to each node' },
      { question: 'Find the lowest common ancestor (LCA) of two nodes', difficulty: 'Medium', hint: 'If both are on one side, go that way; otherwise current is LCA' },
    ],
  },
  graphs: {
    title: 'Graphs',
    icon: '\u{1F4CA}',
    description: 'A graph consists of vertices (nodes) and edges connecting them, modeling relationships and networks.',
    overview: {
      what: 'A graph G = (V, E) consists of vertices V and edges E connecting pairs of vertices. Graphs can be directed or undirected.',
      why: 'Graphs naturally model relationships and connections between entities, essential for network analysis and pathfinding.',
      examples: ['Social networks (friendship connections)', 'GPS navigation and shortest path routing', 'Web page linking (PageRank)', 'Dependency graphs in build systems'],
      advantages: ['Models complex relationships naturally', 'Flexible representation of networks', 'Powerful algorithms for connectivity and paths', 'Used in machine learning (knowledge graphs)'],
      disadvantages: ['Memory-intensive for dense graphs', 'Complex implementation', 'Some problems are NP-hard on graphs', 'Traversal can explore many paths'],
    },
    complexity: [
      { operation: 'Add Vertex', time: 'O(1)', space: 'O(1)' },
      { operation: 'Add Edge', time: 'O(1)', space: 'O(1)' },
      { operation: 'Remove Vertex', time: 'O(V + E)', space: 'O(1)' },
      { operation: 'BFS', time: 'O(V + E)', space: 'O(V)' },
      { operation: 'DFS', time: 'O(V + E)', space: 'O(V)' },
      { operation: 'Dijkstra', time: 'O((V + E) log V)', space: 'O(V)' },
    ],
    code: {
      javascript: `class Graph {\n  constructor() { this.adjList = {}; }\n  addVertex(v) { if (!this.adjList[v]) this.adjList[v] = []; }\n  addEdge(v1, v2) { this.adjList[v1].push(v2); this.adjList[v2].push(v1); }\n  bfs(start) {\n    const visited = new Set([start]), queue = [start], result = [];\n    while (queue.length) {\n      const v = queue.shift(); result.push(v);\n      for (const n of this.adjList[v]) if (!visited.has(n)) { visited.add(n); queue.push(n); }\n    }\n    return result;\n  }\n}`,
      typescript: `interface Neighbor { node: string; weight: number; }\nclass Graph {\n  adjList: Record<string, Neighbor[]> = {};\n  bfs(start: string): string[] {\n    const visited = new Set([start]), queue = [start], result: string[] = [];\n    while (queue.length) {\n      const v = queue.shift()!; result.push(v);\n      for (const { node } of this.adjList[v]) if (!visited.has(node)) { visited.add(node); queue.push(node); }\n    }\n    return result;\n  }\n}`,
      python: `from collections import deque\nclass Graph:\n    def __init__(self): self.adj = {}\n    def add_edge(self, v1, v2):\n        self.adj.setdefault(v1, []).append(v2)\n        self.adj.setdefault(v2, []).append(v1)\n    def bfs(self, start):\n        visited, queue, result = {start}, deque([start]), []\n        while queue:\n            v = queue.popleft()\n            result.append(v)\n            for n in self.adj[v]:\n                if n not in visited: visited.add(n); queue.append(n)\n        return result`,
      java: `import java.util.*;\nclass Graph {\n    Map<String, List<String>> adj = new HashMap<>();\n    void addEdge(String v1, String v2) {\n        adj.computeIfAbsent(v1, k -> new ArrayList<>()).add(v2);\n        adj.computeIfAbsent(v2, k -> new ArrayList<>()).add(v1);\n    }\n    List<String> bfs(String start) {\n        Set<String> visited = new HashSet<>(Set.of(start));\n        Queue<String> q = new LinkedList<>(List.of(start));\n        List<String> result = new ArrayList<>();\n        while (!q.isEmpty()) {\n            String v = q.poll(); result.add(v);\n            for (String n : adj.get(v)) if (!visited.contains(n)) { visited.add(n); q.add(n); }\n        }\n        return result;\n    }\n}`,
      cpp: `#include <vector>\n#include <queue>\n#include <unordered_map>\n#include <unordered_set>\nusing namespace std;\nclass Graph {\n    unordered_map<string, vector<string>> adj;\npublic:\n    void addEdge(const string& v1, const string& v2) { adj[v1].push_back(v2); adj[v2].push_back(v1); }\n    vector<string> bfs(const string& start) {\n        unordered_set<string> visited{start};\n        queue<string> q{{start}};\n        vector<string> result;\n        while (!q.empty()) {\n            auto v = q.front(); q.pop(); result.push_back(v);\n            for (auto& n : adj[v]) if (!visited.count(n)) { visited.insert(n); q.push(n); }\n        }\n        return result;\n    }\n};`,
    },
    interviewQuestions: [
      { question: 'Detect a cycle in an undirected graph', difficulty: 'Medium', hint: 'Use DFS with a parent parameter' },
      { question: 'Find the shortest path between two nodes (BFS)', difficulty: 'Easy', hint: 'BFS finds shortest path in unweighted graphs' },
      { question: 'Clone a graph', difficulty: 'Medium', hint: 'Use DFS with a hash map to track cloned nodes' },
    ],
  },
  stack: {
    title: 'Stack',
    icon: '\u{1F4DA}',
    description: 'A stack is a linear data structure that follows the LIFO (Last In, First Out) principle.',
    overview: {
      what: 'A stack is an abstract data type with two main operations: push (add to top) and pop (remove from top). It follows LIFO order.',
      why: 'Stacks are essential for managing function calls, undo operations, expression evaluation, and backtracking algorithms.',
      examples: ['Browser back/forward navigation', 'Undo/Redo in text editors', 'Function call stack in programming languages', 'Expression evaluation and syntax parsing'],
      advantages: ['Simple and intuitive LIFO operations', 'O(1) push and pop operations', 'Ideal for nested structures and recursion simulation', 'Efficient memory usage with dynamic resizing'],
      disadvantages: ['Limited access - only top element accessible', 'No random access to middle elements', 'Can overflow if size limit is exceeded', 'Not suitable for FIFO operations'],
    },
    complexity: [
      { operation: 'Push', time: 'O(1)*', space: 'O(1)' },
      { operation: 'Pop', time: 'O(1)', space: 'O(1)' },
      { operation: 'Peek', time: 'O(1)', space: 'O(1)' },
      { operation: 'IsEmpty', time: 'O(1)', space: 'O(1)' },
      { operation: 'Size', time: 'O(1)', space: 'O(1)' },
    ],
    code: {
      javascript: `// Stack implementation in JavaScript\nclass Stack {\n  constructor() { this.items = []; }\n  push(item) { this.items.push(item); }  // O(1)\n  pop() { return this.items.pop(); }      // O(1)\n  peek() { return this.items[this.items.length - 1]; }  // O(1)\n  isEmpty() { return this.items.length === 0; }\n  size() { return this.items.length; }\n}\n// Example: browser history\nconst history = new Stack();\nhistory.push('page1.com');\nhistory.push('page2.com');\nconsole.log(history.pop()); // 'page2.com'\nconsole.log(history.peek()); // 'page1.com'`,
      typescript: `class Stack<T> {\n  private items: T[] = [];\n  push(item: T): void { this.items.push(item); }\n  pop(): T | undefined { return this.items.pop(); }\n  peek(): T | undefined { return this.items[this.items.length - 1]; }\n  isEmpty(): boolean { return this.items.length === 0; }\n}`,
      python: `class Stack:\n    def __init__(self):\n        self.items = []\n    def push(self, item):\n        self.items.append(item)  # O(1)\n    def pop(self):\n        return self.items.pop()  # O(1)\n    def peek(self):\n        return self.items[-1]    # O(1)\n    def is_empty(self):\n        return len(self.items) == 0`,
      java: `import java.util.Stack;\n// Java has built-in Stack class\nStack<Integer> stack = new Stack<>();\nstack.push(10);    // push\nint top = stack.pop();  // pop\nint peek = stack.peek(); // peek\nboolean empty = stack.isEmpty();`,
      cpp: `#include <stack>\nstd::stack<int> s;\ns.push(10);     // push\nint top = s.top();    // peek\ns.pop();              // pop\nbool empty = s.empty();`,
    },
    interviewQuestions: [
      { question: 'Implement a stack using two queues', difficulty: 'Medium', hint: 'One queue for actual data, another for reversing during pop' },
      { question: 'Valid parentheses matching', difficulty: 'Easy', hint: 'Push opening brackets, pop and match on closing brackets' },
      { question: 'Implement a MinStack that returns minimum in O(1)', difficulty: 'Medium', hint: 'Maintain a second stack tracking the current minimum' },
    ],
  },
  queue: {
    title: 'Queue',
    icon: '\u{1F3AF}',
    description: 'A queue is a linear data structure that follows the FIFO (First In, First Out) principle.',
    overview: {
      what: 'A queue processes elements in the order they arrive. The first element added is the first one to be removed (FIFO).',
      why: 'Queues are essential for managing tasks in order, breadth-first search, and asynchronous data processing.',
      examples: ['Printer job queue', 'Customer service ticketing system', 'Message queues in distributed systems', 'BFS graph traversal'],
      advantages: ['Simple FIFO ordering', 'O(1) enqueue and dequeue operations', 'Fair scheduling of tasks', 'Essential for BFS and level-order traversals'],
      disadvantages: ['No random access', 'Only front and rear accessible', 'Simple queue can waste space (fixed array)', 'Not suitable for priority-based processing'],
    },
    complexity: [
      { operation: 'Enqueue', time: 'O(1)*', space: 'O(1)' },
      { operation: 'Dequeue', time: 'O(1)', space: 'O(1)' },
      { operation: 'Peek (Front)', time: 'O(1)', space: 'O(1)' },
      { operation: 'IsEmpty', time: 'O(1)', space: 'O(1)' },
      { operation: 'Size', time: 'O(1)', space: 'O(1)' },
    ],
    code: {
      javascript: `// Queue implementation in JavaScript\nclass Queue {\n  constructor() {\n    this.items = {};\n    this.front = 0;\n    this.rear = 0;\n  }\n  enqueue(item) {\n    this.items[this.rear] = item;\n    this.rear++;\n  }  // O(1)\n  dequeue() {\n    if (this.isEmpty()) return null;\n    const item = this.items[this.front];\n    delete this.items[this.front];\n    this.front++;\n    return item;\n  }  // O(1)\n  peek() { return this.items[this.front]; }\n  isEmpty() { return this.front === this.rear; }\n  size() { return this.rear - this.front; }\n}`,
      typescript: `class Queue<T> {\n  private items: Record<number, T> = {};\n  private front = 0;\n  private rear = 0;\n  enqueue(item: T): void { this.items[this.rear] = item; this.rear++; }\n  dequeue(): T | null {\n    if (this.isEmpty()) return null;\n    const item = this.items[this.front];\n    delete this.items[this.front];\n    this.front++;\n    return item;\n  }\n  peek(): T | undefined { return this.items[this.front]; }\n  isEmpty(): boolean { return this.front === this.rear; }\n}`,
      python: `from collections import deque\n# Python's deque is efficient for queue operations\nqueue = deque()\nqueue.append(1)     # enqueue - O(1)\nqueue.append(2)\nfirst = queue.popleft()  # dequeue - O(1)\nfront = queue[0]         # peek - O(1)`,
      java: `import java.util.LinkedList;\nimport java.util.Queue;\nQueue<Integer> queue = new LinkedList<>();\nqueue.offer(10);      // enqueue\nint front = queue.poll();    // dequeue\nint peek = queue.peek();     // peek\nboolean empty = queue.isEmpty();`,
      cpp: `#include <queue>\nstd::queue<int> q;\nq.push(10);         // enqueue\nint front = q.front();     // peek\nq.pop();                   // dequeue\nbool empty = q.empty();`,
    },
    interviewQuestions: [
      { question: 'Implement a queue using two stacks', difficulty: 'Medium', hint: 'Use one stack for enqueue, another for dequeue (reverse on need)' },
      { question: 'Design a circular queue', difficulty: 'Medium', hint: 'Use fixed-size array with front/rear pointers wrapping around' },
      { question: 'Generate binary numbers from 1 to N using a queue', difficulty: 'Medium', hint: 'Enqueue "1", repeatedly dequeue and append "0" and "1"' },
    ],
  },
  'linked-list': {
    title: 'Linked List',
    icon: '\u{26D3}\uFE0F',
    description: 'A linked list is a linear data structure where elements are stored in nodes connected by pointers.',
    overview: {
      what: 'A linked list consists of nodes where each node contains data and a pointer to the next node (and previous for doubly linked).',
      why: 'Linked lists provide O(1) insertions/deletions at known positions and dynamic memory allocation without resizing.',
      examples: ['Image viewer (previous/next navigation)', 'Music playlist with next/previous tracks', 'Undo functionality with revision history', 'Adjacency lists in graph representations'],
      advantages: ['Dynamic size - grows and shrinks at runtime', 'O(1) insertion/deletion at head or tail', 'Memory-efficient for non-contiguous storage', 'Easy to implement other data structures on top'],
      disadvantages: ['O(n) access time (must traverse from head)', 'Extra memory for pointers', 'Not cache-friendly (non-contiguous memory)', 'Reverse traversal requires doubly linked list'],
    },
    complexity: [
      { operation: 'Access (by index)', time: 'O(n)', space: 'O(1)' },
      { operation: 'Search', time: 'O(n)', space: 'O(1)' },
      { operation: 'Insert (at head)', time: 'O(1)', space: 'O(1)' },
      { operation: 'Insert (at tail)', time: 'O(1)', space: 'O(1)' },
      { operation: 'Delete (head)', time: 'O(1)', space: 'O(1)' },
      { operation: 'Delete (by value)', time: 'O(n)', space: 'O(1)' },
    ],
    code: {
      javascript: `// Singly Linked List in JavaScript\nclass ListNode {\n  constructor(value) { this.value = value; this.next = null; }\n}\nclass LinkedList {\n  constructor() { this.head = null; this.tail = null; this.size = 0; }\n  insertHead(value) {\n    const node = new ListNode(value);\n    if (!this.head) { this.head = node; this.tail = node; }\n    else { node.next = this.head; this.head = node; }\n    this.size++;\n  }  // O(1)\n  insertTail(value) {\n    const node = new ListNode(value);\n    if (!this.tail) { this.head = node; this.tail = node; }\n    else { this.tail.next = node; this.tail = node; }\n    this.size++;\n  }  // O(1)\n  delete(value) {\n    if (!this.head) return false;\n    if (this.head.value === value) { this.head = this.head.next; this.size--; return true; }\n    let curr = this.head;\n    while (curr.next && curr.next.value !== value) curr = curr.next;\n    if (curr.next) { curr.next = curr.next.next; if (!curr.next) this.tail = curr; this.size--; return true; }\n    return false;\n  }\n  reverse() {\n    let prev = null, curr = this.head;\n    this.tail = this.head;\n    while (curr) { const next = curr.next; curr.next = prev; prev = curr; curr = next; }\n    this.head = prev;\n  }\n}`,
      typescript: `class ListNode<T> {\n  constructor(public value: T, public next: ListNode<T> | null = null) {}\n}\nclass LinkedList<T> {\n  head: ListNode<T> | null = null;\n  tail: ListNode<T> | null = null;\n  insertHead(value: T): void {\n    const node = new ListNode(value);\n    if (!this.head) { this.head = node; this.tail = node; }\n    else { node.next = this.head; this.head = node; }\n  }\n}`,
      python: `class ListNode:\n    def __init__(self, value):\n        self.value = value\n        self.next = None\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n        self.tail = None\n    def insert_head(self, value):\n        node = ListNode(value)\n        node.next = self.head\n        self.head = node\n        if not self.tail: self.tail = node`,
      java: `class ListNode {\n    int value;\n    ListNode next;\n    ListNode(int v) { this.value = v; }\n}\nclass LinkedList {\n    ListNode head, tail;\n    void insertHead(int value) {\n        ListNode node = new ListNode(value);\n        if (head == null) { head = node; tail = node; }\n        else { node.next = head; head = node; }\n    }\n}`,
      cpp: `struct ListNode {\n    int value;\n    ListNode* next;\n    ListNode(int v) : value(v), next(nullptr) {}\n};\nclass LinkedList {\npublic:\n    ListNode* head = nullptr;\n    ListNode* tail = nullptr;\n    void insertHead(int value) {\n        auto node = new ListNode(value);\n        if (!head) { head = node; tail = node; }\n        else { node->next = head; head = node; }\n    }\n};`,
    },
    interviewQuestions: [
      { question: 'Detect a cycle in a linked list (Floyd algorithm)', difficulty: 'Medium', hint: 'Use slow and fast pointer - if they meet, there is a cycle' },
      { question: 'Find the middle of a linked list', difficulty: 'Easy', hint: 'Use slow and fast pointer - fast moves 2x, slow moves 1x' },
      { question: 'Merge two sorted linked lists', difficulty: 'Easy', hint: 'Use a dummy node and compare values, advancing the smaller one' },
    ],
  },
  heap: {
    title: 'Heap',
    icon: '\u{26F0}\uFE0F',
    description: 'A heap is a complete binary tree that satisfies the heap property - parent is either >= (max-heap) or <= (min-heap) children.',
    overview: {
      what: 'A heap is a specialized tree-based data structure that satisfies the heap invariant: in a max-heap, parent >= children; in a min-heap, parent <= children.',
      why: 'Heaps provide O(log n) insertion and extraction of the min/max element, making them ideal for priority queues and sorting.',
      examples: ['Priority queues in operating systems', 'Dijkstra shortest path algorithm', 'Heap Sort (O(n log n))', 'Median maintenance in streaming data'],
      advantages: ['O(log n) insert and extract operations', 'O(1) access to min/max element', 'Guaranteed balanced (complete binary tree)', 'Memory-efficient (array representation)'],
      disadvantages: ['O(n) search for arbitrary element', 'Not suitable for all data structure needs', 'Limited to priority queue operations', 'No support for FIFO or LIFO ordering'],
    },
    complexity: [
      { operation: 'Insert', time: 'O(log n)', space: 'O(1)' },
      { operation: 'Extract Min/Max', time: 'O(log n)', space: 'O(1)' },
      { operation: 'Peek (Min/Max)', time: 'O(1)', space: 'O(1)' },
      { operation: 'Heapify', time: 'O(n)', space: 'O(1)' },
      { operation: 'Delete', time: 'O(log n)', space: 'O(1)' },
    ],
    code: {
      javascript: `// Min Heap implementation in JavaScript\nclass MinHeap {\n  constructor() { this.heap = []; }\n  getMin() { return this.heap[0]; }  // O(1)\n  insert(val) {\n    this.heap.push(val);\n    let i = this.heap.length - 1;\n    while (i > 0) {\n      const p = Math.floor((i - 1) / 2);\n      if (this.heap[i] >= this.heap[p]) break;\n      [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];\n      i = p;\n    }\n  }  // O(log n)\n  extractMin() {\n    if (this.heap.length === 0) return null;\n    if (this.heap.length === 1) return this.heap.pop();\n    const min = this.heap[0];\n    this.heap[0] = this.heap.pop();\n    this.heapify(0);\n    return min;\n  }\n  heapify(i) {\n    let smallest = i;\n    const left = 2 * i + 1, right = 2 * i + 2;\n    if (left < this.heap.length && this.heap[left] < this.heap[smallest]) smallest = left;\n    if (right < this.heap.length && this.heap[right] < this.heap[smallest]) smallest = right;\n    if (smallest !== i) { [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]]; this.heapify(smallest); }\n  }\n}`,
      typescript: `class MinHeap<T> {\n  private heap: T[] = [];\n  insert(val: T): void {\n    this.heap.push(val);\n    let i = this.heap.length - 1;\n    while (i > 0) {\n      const p = Math.floor((i - 1) / 2);\n      if (this.heap[i] >= this.heap[p]) break;\n      [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];\n      i = p;\n    }\n  }\n  extractMin(): T | null {\n    if (this.heap.length === 0) return null;\n    if (this.heap.length === 1) return this.heap.pop()!;\n    const min = this.heap[0];\n    this.heap[0] = this.heap.pop()!;\n    this.heapify(0);\n    return min;\n  }\n  private heapify(i: number): void {\n    let smallest = i;\n    const left = 2 * i + 1, right = 2 * i + 2;\n    if (left < this.heap.length && this.heap[left] < this.heap[smallest]) smallest = left;\n    if (right < this.heap.length && this.heap[right] < this.heap[smallest]) smallest = right;\n    if (smallest !== i) { [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]]; this.heapify(smallest); }\n  }\n}`,
      python: `import heapq\n# Python has built-in heapq for min heaps\nheap = []\nheapq.heappush(heap, 10)    # insert - O(log n)\nsmallest = heapq.heappop(heap)  # extract min - O(log n)\nsmallest = heap[0]              # peek - O(1)\n# For max heap, push negative values\nheapq.heappush(heap, -value)\nlargest = -heapq.heappop(heap)`,
      java: `import java.util.PriorityQueue;\n// Java PriorityQueue is a min-heap by default\nPriorityQueue<Integer> minHeap = new PriorityQueue<>();\nminHeap.offer(10);    // insert\nint min = minHeap.poll(); // extract min\nint peek = minHeap.peek(); // peek\n// Max heap\nPriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);`,
      cpp: `#include <queue>\n#include <vector>\n// Min heap\nstd::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;\nminHeap.push(10);     // insert\nint min = minHeap.top();     // peek\nminHeap.pop();               // extract\n// Max heap (default)\nstd::priority_queue<int> maxHeap;`,
    },
    interviewQuestions: [
      { question: 'Find k largest elements in an array', difficulty: 'Medium', hint: 'Use a min-heap of size k' },
      { question: 'Merge k sorted lists', difficulty: 'Hard', hint: 'Use a min-heap of the first elements from each list' },
      { question: 'Find median from a data stream', difficulty: 'Hard', hint: 'Use two heaps - max-heap for lower half, min-heap for upper half' },
    ],
  },
  recursion: {
    title: 'Recursion',
    icon: '\u{1F504}',
    description: 'Recursion is a programming technique where a function calls itself to solve smaller subproblems.',
    overview: {
      what: 'Recursion solves problems by breaking them down into smaller, similar subproblems. Each recursive call works on a smaller instance until reaching a base case.',
      why: 'Recursion leads to elegant, clean solutions for problems with naturally recursive structure like trees, graphs, and divide-and-conquer algorithms.',
      examples: ['File system traversal (depth-first)', 'Tree and graph traversals', 'Divide and conquer algorithms (Merge Sort, Quick Sort)', 'Backtracking (N-Queens, Sudoku solver)'],
      advantages: ['Clean, elegant code for recursive problems', 'Natural fit for tree/graph algorithms', 'Simplifies complex problem decomposition', 'Essential for divide-and-conquer and backtracking'],
      disadvantages: ['Can cause stack overflow for deep recursion', 'Higher memory usage due to call stack', 'Generally slower than iterative solutions', 'Harder to debug and reason about'],
    },
    complexity: [
      { operation: 'Factorial (n)', time: 'O(n)', space: 'O(n)' },
      { operation: 'Fibonacci (naive)', time: 'O(2\u207F)', space: 'O(n)' },
      { operation: 'Fibonacci (memoized)', time: 'O(n)', space: 'O(n)' },
      { operation: 'Tower of Hanoi (n disks)', time: 'O(2\u207F)', space: 'O(n)' },
      { operation: 'Binary Search', time: 'O(log n)', space: 'O(log n)' },
      { operation: 'Tree Traversal', time: 'O(n)', space: 'O(n)' },
    ],
    code: {
      javascript: `// Recursion examples in JavaScript\n\n// Factorial\nfunction factorial(n) {\n  if (n <= 1) return 1;  // base case\n  return n * factorial(n - 1);  // recursive case\n}\n// factorial(5) = 5 * 4 * 3 * 2 * 1 = 120\n\n// Fibonacci\nfunction fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n// fib(6) = 8\n\n// Tower of Hanoi\nfunction towerOfHanoi(n, from, to, aux) {\n  if (n === 1) {\n    console.log(\"Move disk 1 from \" + from + \" to \" + to);\n    return;\n  }\n  towerOfHanoi(n - 1, from, aux, to);\n  console.log(\"Move disk \" + n + \" from \" + from + \" to \" + to);\n  towerOfHanoi(n - 1, aux, to, from);\n}\n\n// Recursion visualization:\n// factorial(5)\n//   -> 5 * factorial(4)\n//     -> 4 * factorial(3)\n//       -> 3 * factorial(2)\n//         -> 2 * factorial(1)\n//           -> 1 (base case)\n//         -> 2 * 1 = 2\n//       -> 3 * 2 = 6\n//     -> 4 * 6 = 24\n//   -> 5 * 24 = 120`,
      typescript: `function factorial(n: number): number {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\nfunction fibonacci(n: number): number {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}`,
      python: `def factorial(n):\n    if n <= 1: return 1\n    return n * factorial(n - 1)\n\ndef fibonacci(n):\n    if n <= 1: return n\n    return fibonacci(n - 1) + fibonacci(n - 2)\n\ndef tower_of_hanoi(n, from_rod, to_rod, aux_rod):\n    if n == 1:\n        print(f"Move disk 1 from {from_rod} to {to_rod}")\n        return\n    tower_of_hanoi(n - 1, from_rod, aux_rod, to_rod)\n    print(f"Move disk {n} from {from_rod} to {to_rod}")\n    tower_of_hanoi(n - 1, aux_rod, to_rod, from_rod)`,
      java: `public class Recursion {\n    static int factorial(int n) {\n        if (n <= 1) return 1;\n        return n * factorial(n - 1);\n    }\n    static int fibonacci(int n) {\n        if (n <= 1) return n;\n        return fibonacci(n - 1) + fibonacci(n - 2);\n    }\n}`,
      cpp: `int factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\nint fibonacci(int n) {\n    if (n <= 1) return n;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n}`,
    },
    interviewQuestions: [
      { question: 'Generate all permutations of a string', difficulty: 'Medium', hint: 'Fix each character and recursively permute the rest' },
      { question: 'Solve N-Queens problem', difficulty: 'Hard', hint: 'Place queens row by row, checking column and diagonal conflicts' },
      { question: 'Generate all subsets of a set (power set)', difficulty: 'Medium', hint: 'For each element, include or exclude it in the subset' },
    ],
  },
  dp: {
    title: 'Dynamic Programming',
    icon: '\u{1F9EE}',
    description: 'Dynamic Programming solves complex problems by breaking them into simpler subproblems and reusing results.',
    overview: {
      what: 'DP is an optimization technique that stores results of expensive function calls and reuses them when the same subproblem occurs again.',
      why: 'DP reduces exponential time complexity to polynomial for problems with overlapping subproblems and optimal substructure.',
      examples: ['Fibonacci sequence (memoization)', 'Shortest path algorithms (Floyd-Warshall)', 'Text alignment and diff tools (LCS)', 'Resource allocation (knapsack)'],
      advantages: ['Dramatically reduces time complexity', 'Systematic approach to optimization problems', 'Clear mathematical recurrence relations', 'Applicable to a wide range of problems'],
      disadvantages: ['Can use significant memory for large tables', 'Harder to understand and debug', 'Not all problems have optimal substructure', 'Requires careful state definition'],
    },
    complexity: [
      { operation: 'Fibonacci (DP)', time: 'O(n)', space: 'O(n)' },
      { operation: '0/1 Knapsack', time: 'O(n*W)', space: 'O(n*W)' },
      { operation: 'LCS', time: 'O(m*n)', space: 'O(m*n)' },
      { operation: 'Coin Change', time: 'O(n*amount)', space: 'O(amount)' },
      { operation: 'Longest Increasing Subsequence', time: 'O(n\u00B2)', space: 'O(n)' },
    ],
    code: {
      javascript: `// Dynamic Programming examples in JavaScript\n\n// Fibonacci with DP (bottom-up)\nfunction fibDP(n) {\n  const dp = [0, 1];\n  for (let i = 2; i <= n; i++) {\n    dp[i] = dp[i - 1] + dp[i - 2];\n  }\n  return dp[n];\n}\n// fibDP(10) = 55\n\n// 0/1 Knapsack\nfunction knapsack(weights, values, W) {\n  const n = weights.length;\n  const dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));\n  for (let i = 1; i <= n; i++) {\n    for (let w = 0; w <= W; w++) {\n      if (weights[i-1] <= w) {\n        dp[i][w] = Math.max(values[i-1] + dp[i-1][w - weights[i-1]], dp[i-1][w]);\n      } else {\n        dp[i][w] = dp[i-1][w];\n      }\n    }\n  }\n  return dp[n][W];\n}\n\n// Longest Common Subsequence\nfunction LCS(str1, str2) {\n  const m = str1.length, n = str2.length;\n  const dp = Array.from({ length: m+1 }, () => new Array(n+1).fill(0));\n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (str1[i-1] === str2[j-1]) dp[i][j] = dp[i-1][j-1] + 1;\n      else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);\n    }\n  }\n  return dp[m][n];\n}\n\n// Coin Change (minimum coins)\nfunction coinChange(coins, amount) {\n  const dp = new Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  for (let i = 1; i <= amount; i++) {\n    for (const coin of coins) {\n      if (coin <= i) dp[i] = Math.min(dp[i], 1 + dp[i - coin]);\n    }\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}`,
      typescript: `function fibDP(n: number): number {\n  const dp = [0, 1];\n  for (let i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];\n  return dp[n];\n}\nfunction knapsack(weights: number[], values: number[], W: number): number {\n  const n = weights.length;\n  const dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));\n  for (let i = 1; i <= n; i++) {\n    for (let w = 0; w <= W; w++) {\n      if (weights[i-1] <= w) dp[i][w] = Math.max(values[i-1] + dp[i-1][w - weights[i-1]], dp[i-1][w]);\n      else dp[i][w] = dp[i-1][w];\n    }\n  }\n  return dp[n][W];\n}`,
      python: `def fib_dp(n):\n    dp = [0, 1]\n    for i in range(2, n + 1):\n        dp.append(dp[i-1] + dp[i-2])\n    return dp[n]\n\ndef knapsack(weights, values, W):\n    n = len(weights)\n    dp = [[0] * (W + 1) for _ in range(n + 1)]\n    for i in range(1, n + 1):\n        for w in range(W + 1):\n            if weights[i-1] <= w:\n                dp[i][w] = max(values[i-1] + dp[i-1][w-weights[i-1]], dp[i-1][w])\n            else:\n                dp[i][w] = dp[i-1][w]\n    return dp[n][W]`,
      java: `public class DP {\n    static int fib(int n) {\n        int[] dp = new int[n + 1];\n        dp[0] = 0; dp[1] = 1;\n        for (int i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];\n        return dp[n];\n    }\n    static int knapsack(int[] weights, int[] values, int W) {\n        int n = weights.length;\n        int[][] dp = new int[n+1][W+1];\n        for (int i = 1; i <= n; i++) {\n            for (int w = 0; w <= W; w++) {\n                if (weights[i-1] <= w)\n                    dp[i][w] = Math.max(values[i-1] + dp[i-1][w-weights[i-1]], dp[i-1][w]);\n                else dp[i][w] = dp[i-1][w];\n            }\n        }\n        return dp[n][W];\n    }\n}`,
      cpp: `int fibDP(int n) {\n    vector<int> dp(n + 1);\n    dp[0] = 0; dp[1] = 1;\n    for (int i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];\n    return dp[n];\n}\nint knapsack(vector<int>& weights, vector<int>& values, int W) {\n    int n = weights.size();\n    vector<vector<int>> dp(n+1, vector<int>(W+1, 0));\n    for (int i = 1; i <= n; i++) {\n        for (int w = 0; w <= W; w++) {\n            if (weights[i-1] <= w)\n                dp[i][w] = max(values[i-1] + dp[i-1][w-weights[i-1]], dp[i-1][w]);\n            else dp[i][w] = dp[i-1][w];\n        }\n    }\n    return dp[n][W];\n}`,
    },
    interviewQuestions: [
      { question: 'Longest increasing subsequence', difficulty: 'Medium', hint: 'For each element, check all previous elements for extension' },
      { question: 'Edit distance (Levenshtein distance)', difficulty: 'Hard', hint: 'DP table comparing prefixes with insert/delete/replace operations' },
      { question: 'Maximum subarray sum (Kadane algorithm)', difficulty: 'Medium', hint: 'DP with state being max sum ending at each position' },
    ],
  },
  searching: {
    title: 'Searching Algorithms',
    icon: '\u{1F50D}',
    description: 'Searching algorithms find the position of a target value within a collection of elements.',
    overview: {
      what: 'Searching is the process of locating a specific element in a data structure. Linear search checks each element sequentially, while binary search divides the search space in half.',
      why: 'Efficient searching is fundamental to computing - databases, search engines, and countless applications rely on fast lookup operations.',
      examples: ['Finding a word in a dictionary', 'Searching for a contact in a phone book', 'Database index lookups', 'Autocomplete suggestions'],
      advantages: ['Linear search works on unsorted data', 'Binary search is extremely fast (O(log n))', 'Simple to implement and understand', 'Foundation for more complex search algorithms'],
      disadvantages: ['Linear search is slow for large datasets', 'Binary search requires sorted data', 'Binary search needs random access (array)', 'Not suitable for linked lists (binary search)'],
    },
    complexity: [
      { operation: 'Linear Search (best)', time: 'O(1)', space: 'O(1)' },
      { operation: 'Linear Search (worst/avg)', time: 'O(n)', space: 'O(1)' },
      { operation: 'Binary Search (best)', time: 'O(1)', space: 'O(1)' },
      { operation: 'Binary Search (worst/avg)', time: 'O(log n)', space: 'O(1)' },
      { operation: 'Ternary Search', time: 'O(log n)', space: 'O(1)' },
      { operation: 'Exponential Search', time: 'O(log n)', space: 'O(1)' },
    ],
    code: {
      javascript: `// Searching algorithms in JavaScript\n\n// Linear Search - O(n)\nfunction linearSearch(arr, target) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) return i;\n  }\n  return -1;\n}\n\n// Binary Search - O(log n) - requires sorted array\nfunction binarySearch(arr, target) {\n  let left = 0, right = arr.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}\n\n// Binary Search (recursive)\nfunction binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {\n  if (left > right) return -1;\n  const mid = Math.floor((left + right) / 2);\n  if (arr[mid] === target) return mid;\n  if (arr[mid] < target) return binarySearchRecursive(arr, target, mid + 1, right);\n  return binarySearchRecursive(arr, target, left, mid - 1);\n}\n\n// First occurrence (lower bound)\nfunction lowerBound(arr, target) {\n  let left = 0, right = arr.length;\n  while (left < right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid;\n  }\n  return left;\n}`,
      typescript: `function linearSearch<T>(arr: T[], target: T): number {\n  for (let i = 0; i < arr.length; i++) if (arr[i] === target) return i;\n  return -1;\n}\nfunction binarySearch(arr: number[], target: number): number {\n  let left = 0, right = arr.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}`,
      python: `def linear_search(arr, target):\n    for i, val in enumerate(arr):\n        if val == target: return i\n    return -1\n\ndef binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: left = mid + 1\n        else: right = mid - 1\n    return -1`,
      java: `public class Search {\n    static int linearSearch(int[] arr, int target) {\n        for (int i = 0; i < arr.length; i++)\n            if (arr[i] == target) return i;\n        return -1;\n    }\n    static int binarySearch(int[] arr, int target) {\n        int left = 0, right = arr.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (arr[mid] == target) return mid;\n            if (arr[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return -1;\n    }\n}`,
      cpp: `int linearSearch(const vector<int>& arr, int target) {\n    for (int i = 0; i < arr.size(); i++) if (arr[i] == target) return i;\n    return -1;\n}\nint binarySearch(const vector<int>& arr, int target) {\n    int left = 0, right = arr.size() - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}`,
    },
    interviewQuestions: [
      { question: 'Search in a rotated sorted array', difficulty: 'Medium', hint: 'Binary search with modified condition to find the rotation point' },
      { question: 'Find peak element in a mountain array', difficulty: 'Medium', hint: 'Binary search comparing mid with mid+1' },
      { question: 'Search in a 2D matrix', difficulty: 'Medium', hint: 'Treat as flattened sorted array, or start from top-right corner' },
    ],
  },
  'hash-table': {
    title: 'Hash Tables',
    icon: '🔑',
    description: 'A hash table is a data structure that maps keys to values using a hash function for O(1) average lookup time.',
    overview: {
      what: 'Hash tables transform key strings into array index numbers via a hash function, storing key-value pairs in buckets.',
      why: 'Provides O(1) average time complexity for insert, search, and delete operations.',
      examples: ['Database indexing', 'Caching and memoization', 'Symbol tables in compilers', 'Group Anagrams and Two Sum algorithms'],
      advantages: ['O(1) average lookup and insertion time', 'Flexible key types (strings, numbers, objects)', 'Fast set membership tests'],
      disadvantages: ['Worst case O(n) during severe collisions', 'Unordered keys', 'Memory overhead for bucket capacity'],
    },
    complexity: [
      { operation: 'Search', time: 'O(1) avg', space: 'O(n)' },
      { operation: 'Insert', time: 'O(1) avg', space: 'O(n)' },
      { operation: 'Delete', time: 'O(1) avg', space: 'O(n)' },
    ],
    code: {
      javascript: `class HashTable {\n  constructor(size = 8) {\n    this.buckets = new Array(size).fill(null).map(() => []);\n  }\n  hash(key) {\n    let sum = 0;\n    for (let c of key) sum += c.charCodeAt(0);\n    return sum % this.buckets.length;\n  }\n  set(key, val) {\n    const idx = this.hash(key);\n    this.buckets[idx].push({ key, val });\n  }\n}`,
      python: `hash_map = {}\nhash_map["apple"] = 10  # Insert O(1)\nval = hash_map.get("apple")  # Lookup O(1)`,
    },
    interviewQuestions: [
      { question: 'Two Sum', difficulty: 'Easy', hint: 'Use a hash map to store complements (target - num).' },
      { question: 'Group Anagrams', difficulty: 'Medium', hint: 'Sort string to build canonical hash key.' },
    ],
  },
};

DSA_TOPICS.heaps = DSA_TOPICS.heap;
DSA_TOPICS['hash-tables'] = DSA_TOPICS['hash-table'];

// ─── Visualizer metadata for routing ───
export const VISUALIZER_LIST = [
  { id: 'arrays', title: 'Array Visualizer', icon: '\u{1F4CB}', built: true },
  { id: 'sorting', title: 'Sorting Visualizer', icon: '\u{1F500}', built: true },
  { id: 'trees', title: 'Tree Visualizer', icon: '\u{1F333}', built: true },
  { id: 'graphs', title: 'Graph Visualizer', icon: '\u{1F4CA}', built: true },
  { id: 'stack', title: 'Stack Visualizer', icon: '\u{1F4DA}', built: true },
  { id: 'queue', title: 'Queue Visualizer', icon: '\u{1F3AF}', built: true },
  { id: 'linked-list', title: 'Linked List Visualizer', icon: '\u{26D3}\uFE0F', built: true },
  { id: 'heap', title: 'Heap Visualizer', icon: '\u{26F0}\uFE0F', built: true },
  { id: 'searching', title: 'Searching Visualizer', icon: '\u{1F50D}', built: true },
  { id: 'recursion', title: 'Recursion Visualizer', icon: '\u{1F504}', built: true },
  { id: 'dp', title: 'Dynamic Programming Visualizer', icon: '\u{1F9EE}', built: true },
];
