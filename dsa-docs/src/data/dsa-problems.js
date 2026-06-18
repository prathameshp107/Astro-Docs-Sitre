// ────────────────────────────────────────────────────
// DSA Problem Lab — Problem Definitions
// Initial set: classic interview problems
// ────────────────────────────────────────────────────

function testContains(pattern) {
  return (code) => code.includes(pattern);
}

function anyTest(...tests) {
  return (code) => tests.some(t => t(code));
}

// ─── TOPICS ───

export const DSA_TOPICS = [
  { id: "arrays", label: "Arrays", icon: "📋", color: "#3b82f6", count: 0 },
  { id: "hash-map", label: "Hash Maps", icon: "🔑", color: "#6366f1", count: 0 },
  { id: "two-pointers", label: "Two Pointers", icon: "👆", color: "#06b6d4", count: 0 },
  { id: "sliding-window", label: "Sliding Window", icon: "🪟", color: "#f59e0b", count: 0 },
  { id: "stack", label: "Stack", icon: "📚", color: "#14b8a6", count: 0 },
  { id: "queue", label: "Queue", icon: "🎯", color: "#f97316", count: 0 },
  { id: "linked-list", label: "Linked List", icon: "⛓️", color: "#ec4899", count: 0 },
  { id: "recursion", label: "Recursion", icon: "🔄", color: "#e11d48", count: 0 },
  { id: "binary-search", label: "Binary Search", icon: "🔍", color: "#06b6d4", count: 0 },
  { id: "sorting", label: "Sorting", icon: "🔀", color: "#f59e0b", count: 0 },
  { id: "trees", label: "Trees", icon: "🌳", color: "#22c55e", count: 0 },
  { id: "heap", label: "Heap", icon: "⛰️", color: "#8b5cf6", count: 0 },
  { id: "graphs", label: "Graphs", icon: "📊", color: "#a78bfa", count: 0 },
  { id: "backtracking", label: "Backtracking", icon: "↩️", color: "#f472b6", count: 0 },
  { id: "dp", label: "Dynamic Programming", icon: "🧮", color: "#10b981", count: 0 },
  { id: "greedy", label: "Greedy", icon: "⚡", color: "#fbbf24", count: 0 },
  { id: "bit-manipulation", label: "Bit Manipulation", icon: "💡", color: "#64748b", count: 0 },
  { id: "trie", label: "Trie", icon: "🌲", color: "#2dd4bf", count: 0 },
];

// ─── DIFFICULTY COLORS ───

export const DIFFICULTY = {
  Easy: { color: "#22c55e", bg: "rgba(34,197,94,0.12)", label: "Easy" },
  Medium: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", label: "Medium" },
  Hard: { color: "#ef4444", bg: "rgba(239,68,68,0.12)", label: "Hard" },
  Expert: { color: "#a78bfa", bg: "rgba(167,139,250,0.12)", label: "Expert" },
};

// ─── PROBLEM DEFINITIONS ───

export const DSA_PROBLEMS = [
  // ═════════════════════════════════════════════════
  // ARRAYS
  // ═════════════════════════════════════════════════

  {
    id: "two-sum",
    number: 1,
    title: "Two Sum",
    difficulty: "Easy",
    topics: ["arrays", "hash-map"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Bloomberg", "Uber"],
    acceptance: 52,
    xp: 10,
    problemStatement: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\nYou can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
      },
    ],
    constraints: [
      "2 \u2264 nums.length \u2264 10\u2074",
      "-10\u2079 \u2264 nums[i] \u2264 10\u2079",
      "-10\u2079 \u2264 target \u2264 10\u2079",
      "Only one valid answer exists.",
    ],
    conceptOverview: `**Why this problem exists:**\nTwo Sum is the quintessential interview problem that tests your understanding of hash maps for O(1) lookups.\n\n**What it teaches:**\n\u2022 Using hash maps for fast element lookup\n\u2022 The complement pattern (target - current)\n\u2022 Trading space for time\n\n**Interview relevance:**\nAsked by every major tech company. Understanding this pattern unlocks many harder problems.\n\n**Common approaches:**\n1. **Brute Force** \u2014 O(n\u00b2) \u2014 Check every pair\n2. **Two-pass Hash Map** \u2014 O(n) \u2014 First pass builds map, second finds complement\n3. **One-pass Hash Map** \u2014 O(n) \u2014 Check complement while building map`,
    patternRecognition: `**Pattern: Hash Map Lookup**\n\nWhen you need to find a pair of elements that satisfy a condition, and checking all pairs is too slow (O(n\u00b2)), consider using a hash map to store elements you've already seen for O(1) lookup.\n\n**When to use this pattern:**\n\u2022 You need to find elements that sum to a target\n\u2022 You need O(1) lookups while iterating\n\u2022 You need to track seen elements`,
    sampleTests: [
      { name: "Example 1: [2,7,11,15], target=9", input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { name: "Example 2: [3,2,4], target=6", input: [[3, 2, 4], 6], expected: [1, 2] },
      { name: "Example 3: [3,3], target=6", input: [[3, 3], 6], expected: [0, 1] },
    ],
    starterCode: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n  // Write your solution here\n  \n}`,
    hints: [
      "Can you store values you've already seen?",
      "Think about what value you need to find for each element to reach the target.",
      "For each number, check if its complement (target - num) exists in a hash map.",
    ],
    bruteForceSolution: {
      code: `function twoSum(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      if (nums[i] + nums[j] === target) {\n        return [i, j];\n      }\n    }\n  }\n  return [];\n}`,
      timeComplexity: "O(n\u00b2)",
      spaceComplexity: "O(1)",
      explanation: "Check every pair of numbers. If they sum to target, return their indices.",
    },
    optimizedSolution: {
      code: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      explanation: "Iterate once. For each number, check if its complement exists in the hash map. If found, return both indices. Otherwise, store the current number and its index.",
    },
    interviewExplanation: `**How to explain to an interviewer:**\n1. Start with the brute force approach (nested loops)\n2. Identify the inefficiency \u2014 O(n\u00b2) time\n3. Propose using a hash map for O(1) lookups\n4. Explain the complement pattern\n5. Walk through the one-pass solution\n\n**Common follow-ups:**\n\u2022 "What if the array is sorted?" \u2192 Two-pointer approach\n\u2022 "What if there are duplicates?" \u2192 The problem guarantees one solution\n\u2022 "What if you need to return values instead of indices?" \u2192 Use a Set`,
    tests: [
      {
        name: "Returns correct indices for basic case",
        validate: (code) => {
          try {
            const fn = new Function(`${code}; return twoSum([2,7,11,15], 9);`)();
            return JSON.stringify(fn) === JSON.stringify([0, 1]);
          } catch { return false; }
        },
      },
      {
        name: "Handles unsorted arrays",
        validate: (code) => {
          try {
            const fn = new Function(`${code}; return twoSum([3,2,4], 6);`)();
            return JSON.stringify(fn) === JSON.stringify([1, 2]);
          } catch { return false; }
        },
      },
      {
        name: "Uses hash map approach",
        validate: anyTest(testContains("Map("), testContains("{}")),
      },
    ],
  },

  {
    id: "contains-duplicate",
    number: 2,
    title: "Contains Duplicate",
    difficulty: "Easy",
    topics: ["arrays", "hash-map"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"],
    acceptance: 68,
    xp: 10,
    problemStatement: `Given an integer array \`nums\`, return \`true\` if any value appears **at least twice** in the array, and return \`false\` if every element is distinct.`,
    examples: [
      { input: "nums = [1,2,3,1]", output: "true" },
      { input: "nums = [1,2,3,4]", output: "false" },
      { input: "nums = [1,1,1,3,3,4,3,2,4,2]", output: "true" },
    ],
    constraints: [
      "1 \u2264 nums.length \u2264 10\u2075",
      "-10\u2079 \u2264 nums[i] \u2264 10\u2079",
    ],
    conceptOverview: `**Why this problem exists:**\nTests your ability to detect duplicates efficiently \u2014 a fundamental operation in data processing.\n\n**What it teaches:**\n\u2022 Using Set for O(1) lookups\n\u2022 Trade-offs between Set and sorting approaches\n\u2022 Early termination optimization`,
    patternRecognition: `**Pattern: Set for Duplicates**\n\nWhen you need to check if elements repeat, use a Set to track seen elements. If an element is already in the Set, you've found a duplicate.`,
    sampleTests: [
      { name: "Example 1: [1,2,3,1]", input: [[1, 2, 3, 1]], expected: true },
      { name: "Example 2: [1,2,3,4]", input: [[1, 2, 3, 4]], expected: false },
      { name: "Example 3: [1,1,1,3,3,4,3,2,4,2]", input: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true },
    ],
    starterCode: `/**\n * @param {number[]} nums\n * @return {boolean}\n */\nfunction containsDuplicate(nums) {\n  // Write your solution here\n  \n}`,
    hints: [
      "Think about using a Set to track seen numbers.",
      "If a number is already in the Set, you've found a duplicate.",
      "As soon as you find any duplicate, you can return true immediately.",
    ],
    bruteForceSolution: {
      code: `function containsDuplicate(nums) {\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      if (nums[i] === nums[j]) return true;\n    }\n  }\n  return false;\n}`,
      timeComplexity: "O(n\u00b2)",
      spaceComplexity: "O(1)",
      explanation: "Compare every pair of elements. If any two are equal, return true.",
    },
    optimizedSolution: {
      code: `function containsDuplicate(nums) {\n  const seen = new Set();\n  for (const num of nums) {\n    if (seen.has(num)) return true;\n    seen.add(num);\n  }\n  return false;\n}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      explanation: "Iterate through the array. For each number, check if it's already in the Set. If so, return true. Otherwise, add it to the Set and continue.",
    },
    interviewExplanation: `**How to explain:**\n1. Start with the brute force O(n\u00b2) approach\n2. Note the problem can be solved in O(n) time with a Set\n3. Explain that we trade O(n) space for O(n) time\n4. Mention the early exit optimization\n\n**Follow-ups:**\n\u2022 "What if memory is constrained?" \u2192 Sort first, then check adjacent elements (O(1) space, O(n log n) time)\n\u2022 "What about streaming data?" \u2192 Use a Bloom filter for approximate results`,
    tests: [
      {
        name: "Returns true when duplicate exists",
        validate: (code) => {
          try {
            return new Function(`${code}; return containsDuplicate([1,2,3,1]);`)() === true;
          } catch { return false; }
        },
      },
      {
        name: "Returns false when all unique",
        validate: (code) => {
          try {
            return new Function(`${code}; return containsDuplicate([1,2,3,4]);`)() === false;
          } catch { return false; }
        },
      },
      {
        name: "Uses Set for O(1) lookup",
        validate: anyTest(testContains("new Set(")),
      },
    ],
  },

  // ═════════════════════════════════════════════════
  // STACK
  // ═════════════════════════════════════════════════

  {
    id: "valid-parentheses",
    number: 3,
    title: "Valid Parentheses",
    difficulty: "Easy",
    topics: ["stack"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Bloomberg", "Adobe"],
    acceptance: 58,
    xp: 15,
    problemStatement: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
      { input: 's = "([)]"', output: "false" },
      { input: 's = "{[]}"', output: "true" },
    ],
    constraints: [
      "1 \u2264 s.length \u2264 10\u2074",
      "s consists of parentheses only '()[]{}'",
    ],
    conceptOverview: `**Why this problem exists:**\nValid Parentheses tests your understanding of the stack data structure and its LIFO (Last In, First Out) property.\n\n**What it teaches:**\n\u2022 Stack operations (push, pop, peek)\n\u2022 Matching paired elements\n\u2022 LIFO ordering for nested structures\n\n**Interview relevance:**\nA classic stack problem that appears in almost every interview.`,
    patternRecognition: `**Pattern: Stack for Matching**\n\nWhen you need to match paired elements in a nested structure, use a stack. Push opening elements, pop and match on closing elements.\n\n**When to use this pattern:**\n\u2022 Parentheses, brackets, or HTML tag matching\n\u2022 Any nested structure validation\n\u2022 Parsing expressions`,
    sampleTests: [
      { name: 'Example 1: "()"', input: ["()"], expected: true },
      { name: 'Example 2: "()[]{}"', input: ["()[]{}"], expected: true },
      { name: 'Example 3: "(]"', input: ["(]"], expected: false },
      { name: 'Example 4: "([)]"', input: ["([)]"], expected: false },
    ],
    starterCode: `/**\n * @param {string} s\n * @return {boolean}\n */\nfunction isValid(s) {\n  // Write your solution here\n  \n}`,
    hints: [
      "Use a stack to track opening brackets.",
      "When you see a closing bracket, check if it matches the most recent opening bracket.",
      "Use a hash map to pair opening and closing brackets.",
    ],
    bruteForceSolution: {
      code: `// There is no good brute force for this.\n// Stack is the standard approach.`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      explanation: "Use a stack with a hash map for bracket matching.",
    },
    optimizedSolution: {
      code: `function isValid(s) {\n  const stack = [];\n  const pairs = { ')': '(', '}': '{', ']': '[' };\n  \n  for (const char of s) {\n    if (!pairs[char]) {\n      // Opening bracket\n      stack.push(char);\n    } else {\n      // Closing bracket\n      if (stack.pop() !== pairs[char]) return false;\n    }\n  }\n  \n  return stack.length === 0;\n}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      explanation: "Iterate through the string. Push opening brackets onto the stack. When you encounter a closing bracket, pop the top of the stack and check if it matches. At the end, the stack should be empty.",
    },
    interviewExplanation: `**How to explain:**\n1. Recognize this as a stack problem due to nested structure\n2. Use a hash map to pair opening and closing brackets\n3. Explain the LIFO property and why it works for nesting\n\n**Follow-ups:**\n\u2022 "What if you also need to handle precedence?" \u2192 Add priority logic\n\u2022 "What if the string is very long?" \u2192 Early fail on first mismatch\n\u2022 "What about minimum additions to make valid?" \u2192 Count unmatched brackets`,
    tests: [
      {
        name: "Valid simple parentheses",
        validate: (code) => {
          try { return new Function(`${code}; return isValid("()");`)() === true; } catch { return false; }
        },
      },
      {
        name: "Valid multiple bracket types",
        validate: (code) => {
          try { return new Function(`${code}; return isValid("()[]{}");`)() === true; } catch { return false; }
        },
      },
      {
        name: "Invalid mismatched brackets",
        validate: (code) => {
          try { return new Function(`${code}; return isValid("(]");`)() === false; } catch { return false; }
        },
      },
      {
        name: "Uses stack data structure",
        validate: testContains("push(") && testContains("pop("),
      },
    ],
  },

  // ═════════════════════════════════════════════════
  // ARRAYS / DYNAMIC PROGRAMMING
  // ═════════════════════════════════════════════════

  {
    id: "maximum-subarray",
    number: 4,
    title: "Maximum Subarray",
    difficulty: "Medium",
    topics: ["arrays", "dp"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Adobe", "Bloomberg"],
    acceptance: 52,
    xp: 20,
    problemStatement: `Given an integer array \`nums\`, find the **subarray** with the largest sum, and return its sum.`,
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      { input: "nums = [1]", output: "1" },
      { input: "nums = [5,4,-1,7,8]", output: "23" },
    ],
    constraints: ["1 \u2264 nums.length \u2264 10\u2075", "-10\u2074 \u2264 nums[i] \u2264 10\u2074"],
    conceptOverview: `**Why this problem exists:**\nMaximum Subarray (Kadane's Algorithm) is a classic DP problem that teaches optimal substructure and the sliding technique for subarray problems.\n\n**What it teaches:**\n\u2022 Dynamic programming with O(1) space\n\u2022 Identifying optimal substructure\n\u2022 Kadane's Algorithm \u2014 a must-know pattern\n\n**Interview relevance:**\nOne of the most frequently asked DP problems.`,
    patternRecognition: `**Pattern: Kadane's Algorithm**\n\nWhen you need the maximum sum subarray, track two values:\n1. Current subarray sum (reset to 0 if it goes negative)\n2. Maximum sum seen so far\n\n**When to use this pattern:**\n\u2022 Maximum/minimum subarray problems\n\u2022 When a prefix can be discarded if it's negative\n\u2022 Circular subarray problems (extension)`,
    sampleTests: [
      { name: "Example 1: [-2,1,-3,4,-1,2,1,-5,4]", input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
      { name: "Example 2: [1]", input: [[1]], expected: 1 },
      { name: "Example 3: [5,4,-1,7,8]", input: [[5, 4, -1, 7, 8]], expected: 23 },
    ],
    starterCode: `/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction maxSubArray(nums) {\n  // Write your solution here\n  \n}`,
    hints: [
      "What's the maximum sum ending at each position?",
      "If the current sum goes negative, it's better to start fresh from the next element.",
      "Track two values: current sum and maximum sum seen so far.",
    ],
    bruteForceSolution: {
      code: `function maxSubArray(nums) {\n  let max = -Infinity;\n  for (let i = 0; i < nums.length; i++) {\n    let sum = 0;\n    for (let j = i; j < nums.length; j++) {\n      sum += nums[j];\n      max = Math.max(max, sum);\n    }\n  }\n  return max;\n}`,
      timeComplexity: "O(n\u00b2)",
      spaceComplexity: "O(1)",
      explanation: "Check every possible subarray by iterating all start and end positions.",
    },
    optimizedSolution: {
      code: `function maxSubArray(nums) {\n  let maxSum = nums[0];\n  let currentSum = nums[0];\n  \n  for (let i = 1; i < nums.length; i++) {\n    currentSum = Math.max(nums[i], currentSum + nums[i]);\n    maxSum = Math.max(maxSum, currentSum);\n  }\n  \n  return maxSum;\n}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      explanation: "Kadane's Algorithm: At each position, decide whether to extend the current subarray or start a new one. Keep track of the maximum sum seen.",
    },
    interviewExplanation: `**How to explain:**\n1. Start with brute force O(n\u00b2)\n2. Notice that extending a negative prefix never helps\n3. Introduce Kadane's insight: at each step, compare current element vs current element + previous sum\n4. Track global maximum\n\n**Follow-ups:**\n\u2022 "What if the array can be circular?" \u2192 Handle wrap-around case\n\u2022 "What if you need to return the subarray itself?" \u2192 Track start and end indices\n\u2022 "What about the minimum subarray?" \u2192 Same algorithm, negated`,
    tests: [
      {
        name: "Returns correct sum for mixed array",
        validate: (code) => {
          try { return new Function(`${code}; return maxSubArray([-2,1,-3,4,-1,2,1,-5,4]);`)() === 6; } catch { return false; }
        },
      },
      {
        name: "Handles single element",
        validate: (code) => {
          try { return new Function(`${code}; return maxSubArray([1]);`)() === 1; } catch { return false; }
        },
      },
      {
        name: "Handles all negative numbers",
        validate: (code) => {
          try { return new Function(`${code}; return maxSubArray([-3,-2,-1]);`)() === -1; } catch { return false; }
        },
      },
    ],
  },

  // ═════════════════════════════════════════════════
  // LINKED LIST
  // ═════════════════════════════════════════════════

  {
    id: "reverse-linked-list",
    number: 5,
    title: "Reverse Linked List",
    difficulty: "Easy",
    topics: ["linked-list"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Adobe"],
    acceptance: 72,
    xp: 15,
    problemStatement: `Given the \`head\` of a singly linked list, reverse the list, and return the reversed list.\n\nA linked list is represented by the \`ListNode\` class:\n\`\`\`\nfunction ListNode(val, next) {\n  this.val = (val===undefined ? 0 : val)\n  this.next = (next===undefined ? null : next)\n}\n\`\`\``,
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "head = [1,2]", output: "[2,1]" },
      { input: "head = []", output: "[]" },
    ],
    constraints: [
      "0 \u2264 list length \u2264 5000",
      "-5000 \u2264 Node.val \u2264 5000",
    ],
    conceptOverview: `**Why this problem exists:**\nReverse Linked List is the foundational linked list problem. It tests your ability to manipulate pointers in a linked structure.\n\n**What it teaches:**\n\u2022 Pointer manipulation in linked lists\n\u2022 Iterative vs recursive approaches\n\u2022 In-place reversal of linked data\n\n**Interview relevance:**\nEvery linked list interview builds on this concept. Master it first.`,
    patternRecognition: `**Pattern: Pointer Reversal**\n\nWhen reversing a linked list, use three pointers: previous, current, and next. Save the next node before breaking the link.\n\n**When to use this pattern:**\n\u2022 Reversing a linked list\n\u2022 Reversing segments of a list\n\u2022 Palindrome checks on linked lists`,
    sampleTests: [
      { name: "Example 1: [1,2,3,4,5]", input: [[]], expected: [] },
      { name: "Example 2: [1,2]", input: [[]], expected: [] },
    ],
    starterCode: `/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nfunction reverseList(head) {\n  // Write your solution here\n  \n}`,
    hints: [
      "Use three pointers: prev, curr, nextTemp.",
      "Save the next node before redirecting the current pointer.",
      "Iterate until curr is null, then return prev as the new head.",
    ],
    bruteForceSolution: {
      code: `// Iterative approach is already optimal for this problem`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      explanation: "There is no brute force \u2014 the iterative reversal is the standard approach.",
    },
    optimizedSolution: {
      code: `function reverseList(head) {\n  let prev = null;\n  let curr = head;\n  \n  while (curr !== null) {\n    const nextTemp = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = nextTemp;\n  }\n  \n  return prev;\n}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      explanation: "Iterate through the list. For each node, save the next node, reverse the pointer to the previous node, then advance both prev and curr.",
    },
    interviewExplanation: `**How to explain:**\n1. Draw a simple list and show the pointer reversal visually\n2. Explain the three-pointer technique: prev, curr, nextTemp\n3. Walk through one iteration on the whiteboard\n4. Note that we return prev as the new head\n\n**Follow-ups:**\n\u2022 "Can you do this recursively?" \u2192 Yes, use the call stack as the iterator\n\u2022 "Reverse a sublist instead of the whole list?" \u2192 Track start and end boundaries\n\u2022 "Reverse in groups of k?" \u2192 Use the same technique with group counting`,
    tests: [
      {
        name: "Creates and reverses a small list",
        validate: (code) => {
          try {
            const fn = new Function(`${code}
              function toArray(head) {
                const arr = [];
                let curr = head;
                while (curr) { arr.push(curr.val); curr = curr.next; }
                return arr;
              }
              function fromArray(arr) {
                if (arr.length === 0) return null;
                const head = new ListNode(arr[0]);
                let curr = head;
                for (let i = 1; i < arr.length; i++) {
                  curr.next = new ListNode(arr[i]);
                  curr = curr.next;
                }
                return head;
              }
              const list = fromArray([1,2,3,4,5]);
              const reversed = reverseList(list);
              return JSON.stringify(toArray(reversed));
            `)();
            return fn === JSON.stringify([5,4,3,2,1]);
          } catch { return false; }
        },
      },
      {
        name: "Handles single node list",
        validate: (code) => {
          try {
            const fn = new Function(`${code}
              function fromArray(arr) {
                if (arr.length === 0) return null;
                const head = new ListNode(arr[0]);
                let curr = head;
                for (let i = 1; i < arr.length; i++) {
                  curr.next = new ListNode(arr[i]);
                  curr = curr.next;
                }
                return head;
              }
              const list = fromArray([1]);
              const reversed = reverseList(list);
              return reversed ? reversed.val : null;
            `)();
            return fn === 1;
          } catch { return false; }
        },
      },
      {
        name: "Uses pointer manipulation",
        validate: testContains(".next"),
      },
    ],
  },

  {
    id: "merge-two-sorted-lists",
    number: 6,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    topics: ["linked-list", "recursion"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Bloomberg"],
    acceptance: 65,
    xp: 15,
    problemStatement: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`.\n\nMerge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.`,
    examples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "list1 = [], list2 = []", output: "[]" },
      { input: "list1 = [], list2 = [0]", output: "[0]" },
    ],
    constraints: [
      "0 \u2264 list length \u2264 50",
      "-100 \u2264 Node.val \u2264 100",
      "Both lists are sorted in non-decreasing order.",
    ],
    conceptOverview: `**Why this problem exists:**\nMerge Two Sorted Lists tests your ability to merge sorted data \u2014 a fundamental divide-and-conquer pattern used in Merge Sort and many other algorithms.\n\n**What it teaches:**\n\u2022 Two-pointer merging technique\n\u2022 Dummy node pattern for linked lists\n\u2022 Recursive vs iterative approaches\n\n**Interview relevance:**\nEssential building block for harder problems like Merge k Sorted Lists.`,
    patternRecognition: `**Pattern: Two-Pointer Merge**\n\nWhen merging two sorted sequences, use two pointers to compare elements. Take the smaller element and advance that pointer. Use a dummy head to simplify edge cases.\n\n**When to use this pattern:**\n\u2022 Merging sorted arrays or linked lists\n\u2022 Merge Sort implementation\n\u2022 Finding the intersection of sorted data`,
    sampleTests: [
      { name: "Example 1", input: [[1,2,4], [1,3,4]], expected: [1,1,2,3,4,4] },
      { name: "Example 2: both empty", input: [[], []], expected: [] },
    ],
    starterCode: `/**\n * @param {ListNode} list1\n * @param {ListNode} list2\n * @return {ListNode}\n */\nfunction mergeTwoLists(list1, list2) {\n  // Write your solution here\n  \n}`,
    hints: [
      "Use a dummy node as the starting point of the merged list.",
      "Compare the current nodes of both lists and attach the smaller one.",
      "When one list is exhausted, attach the remainder of the other list.",
    ],
    bruteForceSolution: {
      code: `function mergeTwoLists(list1, list2) {\n  // Convert to array, merge, sort\n  const arr = [];\n  let curr = list1;\n  while (curr) { arr.push(curr.val); curr = curr.next; }\n  curr = list2;\n  while (curr) { arr.push(curr.val); curr = curr.next; }\n  arr.sort((a, b) => a - b);\n  \n  // Convert back to linked list\n  const dummy = new ListNode();\n  curr = dummy;\n  for (const val of arr) {\n    curr.next = new ListNode(val);\n    curr = curr.next;\n  }\n  return dummy.next;\n}`,
      timeComplexity: "O((n+m) log(n+m))",
      spaceComplexity: "O(n+m)",
      explanation: "Extract all values, sort, and rebuild the list.",
    },
    optimizedSolution: {
      code: `function mergeTwoLists(list1, list2) {\n  const dummy = new ListNode();\n  let curr = dummy;\n  \n  while (list1 !== null && list2 !== null) {\n    if (list1.val <= list2.val) {\n      curr.next = list1;\n      list1 = list1.next;\n    } else {\n      curr.next = list2;\n      list2 = list2.next;\n    }\n    curr = curr.next;\n  }\n  \n  // Attach remaining nodes\n  curr.next = list1 !== null ? list1 : list2;\n  \n  return dummy.next;\n}`,
      timeComplexity: "O(n+m)",
      spaceComplexity: "O(1)",
      explanation: "Use a dummy head to simplify. Compare current nodes from each list, attach the smaller one, and advance. When one list is exhausted, attach the rest of the other.",
    },
    interviewExplanation: `**How to explain:**\n1. Show the dummy node technique to avoid null checks on the head\n2. Walk through the comparison-attach-advance loop\n3. Explain why attaching the remainder works (both lists are sorted)\n4. Mention the recursive alternative\n\n**Follow-ups:**\n\u2022 "Merge k sorted lists?" \u2192 Use a min-heap (priority queue)\n\u2022 "Merge sorted arrays in-place?" \u2192 Merge from the end\n\u2022 "What if there are duplicates?" \u2192 Use <= for stable ordering`,
    tests: [
      {
        name: "Merges two sorted lists correctly",
        validate: (code) => {
          try {
            const fn = new Function(`${code}
              function ListNode(val, next) { this.val = val; this.next = next || null; }
              function toArray(head) {
                const arr = [];
                let curr = head;
                while (curr) { arr.push(curr.val); curr = curr.next; }
                return arr;
              }
              function fromArray(arr) {
                if (arr.length === 0) return null;
                const head = new ListNode(arr[0]);
                let curr = head;
                for (let i = 1; i < arr.length; i++) {
                  curr.next = new ListNode(arr[i]);
                  curr = curr.next;
                }
                return head;
              }
              const l1 = fromArray([1,2,4]);
              const l2 = fromArray([1,3,4]);
              return JSON.stringify(toArray(mergeTwoLists(l1, l2)));
            `)();
            return fn === JSON.stringify([1,1,2,3,4,4]);
          } catch { return false; }
        },
      },
      {
        name: "Handles one empty list",
        validate: (code) => {
          try {
            const fn = new Function(`${code}
              function ListNode(val, next) { this.val = val; this.next = next || null; }
              const result = mergeTwoLists(null, new ListNode(0));
              return result ? result.val : null;
            `)();
            return fn === 0;
          } catch { return false; }
        },
      },
    ],
  },

  // ═════════════════════════════════════════════════
  // BINARY SEARCH
  // ═════════════════════════════════════════════════

  {
    id: "binary-search",
    number: 7,
    title: "Binary Search",
    difficulty: "Easy",
    topics: ["binary-search", "arrays"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"],
    acceptance: 62,
    xp: 10,
    problemStatement: `Given an array of integers \`nums\` which is sorted in **ascending order**, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, return its index. Otherwise, return \`-1\`.\n\nYou must write an algorithm with **O(log n)** runtime complexity.`,
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" },
    ],
    constraints: [
      "1 \u2264 nums.length \u2264 10\u2074",
      "-10\u2074 < nums[i], target < 10\u2074",
      "All integers in nums are unique.",
      "nums is sorted in ascending order.",
    ],
    conceptOverview: `**Why this problem exists:**\nBinary Search is the most fundamental divide-and-conquer algorithm. It halves the search space at each step, achieving logarithmic time complexity.\n\n**What it teaches:**\n\u2022 Divide and conquer strategy\n\u2022 Logarithmic time complexity (O(log n))\n\u2022 The two-pointer approach on sorted data\n\n**Interview relevance:**\nUnderstanding binary search unlocks dozens of harder problems like search in rotated arrays, find peak element, and more.`,
    patternRecognition: `**Pattern: Divide and Conquer Search**\n\nWhen searching a sorted array, eliminate half the search space at each step by comparing the target with the middle element.\n\n**When to use this pattern:**\n\u2022 Sorted array search\n\u2022 Finding boundaries (first/last occurrence)\n\u2022 Finding closest element\n\u2022 Any problem that asks for O(log n) on sorted data`,
    sampleTests: [
      { name: "Example 1: target found", input: [[-1,0,3,5,9,12], 9], expected: 4 },
      { name: "Example 2: target not found", input: [[-1,0,3,5,9,12], 2], expected: -1 },
    ],
    starterCode: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nfunction search(nums, target) {\n  // Write your solution here\n  \n}`,
    hints: [
      "Start with two pointers: left at 0, right at nums.length - 1.",
      "Calculate the middle index as Math.floor((left + right) / 2).",
      "If nums[mid] > target, search the left half. Otherwise, search the right half.",
    ],
    bruteForceSolution: {
      code: `function search(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] === target) return i;\n  }\n  return -1;\n}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      explanation: "Linear scan \u2014 checks every element until target is found.",
    },
    optimizedSolution: {
      code: `function search(nums, target) {\n  let left = 0;\n  let right = nums.length - 1;\n  \n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    \n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  \n  return -1;\n}`,
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      explanation: "At each step, compare the target with the middle element. If equal, return the index. If target is greater, discard the left half. Otherwise, discard the right half.",
    },
    interviewExplanation: `**How to explain:**\n1. Start with the invariant: the target, if present, is between left and right\n2. At each step, check the middle. If it's the target, done\n3. Otherwise, eliminate the half that can't contain the target\n4. Continue until left > right (target not found)\n\n**Follow-ups:**\n\u2022 "What if there are duplicates?" \u2192 Find first/last occurrence with boundary binary search\n\u2022 "What if the array is rotated?" \u2192 Modified binary search with rotation detection\n\u2022 "What if the array size is unknown?" \u2192 Exponential search first to find bounds`,
    tests: [
      {
        name: "Returns correct index for existing target",
        validate: (code) => {
          try { return new Function(`${code}; return search([-1,0,3,5,9,12], 9);`)() === 4; } catch { return false; }
        },
      },
      {
        name: "Returns -1 for missing target",
        validate: (code) => {
          try { return new Function(`${code}; return search([-1,0,3,5,9,12], 2);`)() === -1; } catch { return false; }
        },
      },
      {
        name: "Uses binary search pattern",
        validate: anyTest(testContains("mid"), testContains("left") && testContains("right")),
      },
    ],
  },

  {
    id: "search-rotated-array",
    number: 8,
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    topics: ["binary-search", "arrays"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Bloomberg", "Uber"],
    acceptance: 40,
    xp: 25,
    problemStatement: `There is an integer array \`nums\` sorted in ascending order (with **distinct** values).\n\nPrior to being passed to your function, \`nums\` is **rotated** at an unknown pivot index \`k\` (\`0 <= k < nums.length\`), so that the resulting array is:\n\`[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]\`.\n\nGiven \`nums\` after rotation and an integer \`target\`, return the index of \`target\` if it is in \`nums\`, or \`-1\` if it is not.\n\nYou must write an algorithm with **O(log n)** runtime complexity.`,
    examples: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" },
      { input: "nums = [1], target = 0", output: "-1" },
    ],
    constraints: [
      "1 \u2264 nums.length \u2264 5000",
      "-10\u2074 \u2264 nums[i] \u2264 10\u2074",
      "All values are unique.",
      "nums is guaranteed to be rotated at some pivot.",
    ],
    conceptOverview: `**Why this problem exists:**\nSearch in Rotated Sorted Array extends binary search to handle a modified sorted structure. It tests your deep understanding of the binary search invariant.\n\n**What it teaches:**\n\u2022 Modified binary search\n\u2022 Identifying which half of a rotated array is sorted\n\u2022 Handling multiple comparisons in search logic\n\n**Interview relevance:**\nA classic problem that separates candidates who truly understand binary search from those who memorized it.`,
    patternRecognition: `**Pattern: Modified Binary Search**\n\nEven in a rotated array, at least one half (left or right) is always fully sorted. Determine which half is sorted, then check if the target lies in that half.\n\n**When to use this pattern:**\n\u2022 Searching in a rotated sorted array\n\u2022 Finding minimum in a rotated array\n\u2022 Finding the rotation point (pivot)`,
    sampleTests: [
      { name: "Example 1: target in right half", input: [[4,5,6,7,0,1,2], 0], expected: 4 },
      { name: "Example 2: missing target", input: [[4,5,6,7,0,1,2], 3], expected: -1 },
    ],
    starterCode: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nfunction search(nums, target) {\n  // Write your solution here\n  \n}`,
    hints: [
      "Even in a rotated array, one half is always fully sorted.",
      "Check which half is sorted by comparing nums[left] with nums[mid].",
      "If the target falls within the sorted half, search there. Otherwise, search the other half.",
    ],
    bruteForceSolution: {
      code: `function search(nums, target) {\n  return nums.indexOf(target);\n}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      explanation: "Linear scan using built-in indexOf.",
    },
    optimizedSolution: {
      code: `function search(nums, target) {\n  let left = 0;\n  let right = nums.length - 1;\n  \n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    \n    if (nums[mid] === target) return mid;\n    \n    // Left half is sorted\n    if (nums[left] <= nums[mid]) {\n      if (target >= nums[left] && target < nums[mid]) {\n        right = mid - 1;\n      } else {\n        left = mid + 1;\n      }\n    }\n    // Right half is sorted\n    else {\n      if (target > nums[mid] && target <= nums[right]) {\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n  }\n  \n  return -1;\n}`,
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      explanation: "At each step, determine which half is sorted by comparing nums[left] with nums[mid]. Then check if the target falls in the sorted half. If so, search there; otherwise, search the other half.",
    },
    interviewExplanation: `**How to explain:**\n1. Recognize that binary search can still work if we identify sorted halves\n2. Check if the left half is sorted (nums[left] <= nums[mid])\n3. If so, check if target is in the left half's range. If not, search the right half\n4. If the right half is sorted, apply the same logic\n\n**Follow-ups:**\n\u2022 "What if values can be duplicates?" \u2192 Still works but worst-case becomes O(n)\n\u2022 "Find the minimum in a rotated array?" \u2192 Binary search for the pivot\n\u2022 "Find the rotation count?" \u2192 Count of rotations = index of minimum element`,
    tests: [
      {
        name: "Finds target in rotated array",
        validate: (code) => {
          try { return new Function(`${code}; return search([4,5,6,7,0,1,2], 0);`)() === 4; } catch { return false; }
        },
      },
      {
        name: "Returns -1 for missing target",
        validate: (code) => {
          try { return new Function(`${code}; return search([4,5,6,7,0,1,2], 3);`)() === -1; } catch { return false; }
        },
      },
      {
        name: "Uses O(log n) approach (has mid variable)",
        validate: testContains("mid"),
      },
    ],
  },

  // ═════════════════════════════════════════════════
  // TREES
  // ═════════════════════════════════════════════════

  {
    id: "maximum-depth-of-binary-tree",
    number: 9,
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    topics: ["trees", "recursion"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"],
    acceptance: 75,
    xp: 10,
    problemStatement: `Given the \`root\` of a binary tree, return its **maximum depth**.\n\nA binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3" },
      { input: "root = [1,null,2]", output: "2" },
    ],
    constraints: [
      "0 \u2264 tree nodes \u2264 10\u2074",
      "-100 \u2264 Node.val \u2264 100",
    ],
    conceptOverview: `**Why this problem exists:**\nMaximum Depth is the foundational tree problem. It introduces tree traversal and recursive thinking on hierarchical data.\n\n**What it teaches:**\n\u2022 Tree traversal (DFS / BFS)\n\u2022 Recursive problem solving on trees\n\u2022 Base case: empty tree has depth 0\n\n**Interview relevance:**\nEvery tree problem builds on traversal. This is the starting point.`,
    patternRecognition: `**Pattern: Tree Recursion**\n\nFor most tree problems, the solution is: solve for the left subtree, solve for the right subtree, then combine the results.\n\n**When to use this pattern:**\n\u2022 Any tree traversal problem\n\u2022 Calculating tree properties (depth, diameter, balance)\n\u2022 Path sum problems`,
    sampleTests: [
      { name: "Example 1: [3,9,20,null,null,15,7]", input: [[]], expected: 0 },
    ],
    starterCode: `/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {number}\n */\nfunction maxDepth(root) {\n  // Write your solution here\n  \n}`,
    hints: [
      "What is the depth of an empty tree?",
      "The depth of a node is 1 + max(depth of left, depth of right).",
      "Use recursion: solve for left and right children, then combine.",
    ],
    bruteForceSolution: {
      code: `// Recursive DFS is the standard approach`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
      explanation: "DFS recursion visits every node once. O(h) space for the call stack (h = tree height).",
    },
    optimizedSolution: {
      code: `function maxDepth(root) {\n  if (root === null) return 0;\n  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
      explanation: "Recursively compute the depth of left and right subtrees. The depth of the current node is 1 plus the maximum of its children's depths. Base case: null node has depth 0.",
    },
    interviewExplanation: `**How to explain:**\n1. Start with the base case: empty tree has depth 0\n2. For any node, its depth is 1 + max depth of its children\n3. This is a textbook divide-and-conquer on trees\n4. Mention iterative BFS as alternative\n\n**Follow-ups:**\n\u2022 "How would you do it iteratively?" \u2192 Level-order traversal (BFS) counting levels\n\u2022 "Minimum depth?" \u2192 Same logic but BFS is better (early exit on leaf)\n\u2022 "Diameter of a tree?" \u2192 Extend to track max(leftDepth + rightDepth)`,
    tests: [
      {
        name: "Returns 3 for [3,9,20,null,null,15,7]",
        validate: (code) => {
          try {
            return new Function(`${code}
              function TreeNode(val, left, right) { this.val = val; this.left = left || null; this.right = right || null; }
              const root = new TreeNode(3,
                new TreeNode(9),
                new TreeNode(20, new TreeNode(15), new TreeNode(7))
              );
              return maxDepth(root);
            `)() === 3;
          } catch { return false; }
        },
      },
      {
        name: "Returns 0 for empty tree",
        validate: (code) => {
          try { return new Function(`${code}; return maxDepth(null);`)() === 0; } catch { return false; }
        },
      },
    ],
  },

  {
    id: "invert-binary-tree",
    number: 10,
    title: "Invert Binary Tree",
    difficulty: "Easy",
    topics: ["trees", "recursion"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"],
    acceptance: 77,
    xp: 10,
    problemStatement: `Given the \`root\` of a binary tree, **invert** the tree, and return its root.\n\nInverting a binary tree means swapping the left and right children of every node.`,
    examples: [
      { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
      { input: "root = [2,1,3]", output: "[2,3,1]" },
      { input: "root = []", output: "[]" },
    ],
    constraints: [
      "0 \u2264 tree nodes \u2264 100",
      "-100 \u2264 Node.val \u2264 100",
    ],
    conceptOverview: `**Why this problem exists:**\nInvert Binary Tree (made famous by a Google interview story) tests if you can recursively transform a tree structure.\n\n**What it teaches:**\n\u2022 Tree mutation through recursion\n\u2022 Swapping children at each node\n\u2022 Post-order traversal pattern\n\n**Interview relevance:**\nTests recursive thinking and tree manipulation. Surprisingly tricky for many candidates.`,
    patternRecognition: `**Pattern: Tree Transformation**\n\nWhen transforming a tree structure, solve for the children first (post-order), then transform the current node.\n\n**When to use this pattern:**\n\u2022 Inverting a tree\n\u2022 Mirroring a tree\n\u2022 Any structural tree transformation`,
    sampleTests: [
      { name: "Example 1: [4,2,7,1,3,6,9]", input: [[]], expected: [] },
    ],
    starterCode: `/**\n * @param {TreeNode} root\n * @return {TreeNode}\n */\nfunction invertTree(root) {\n  // Write your solution here\n  \n}`,
    hints: [
      "Swap the left and right children of the current node.",
      "Recursively invert the left and right subtrees before swapping.",
      "The base case is when root is null \u2014 return null.",
    ],
    bruteForceSolution: {
      code: `// Recursive solution is the standard approach`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
      explanation: "Visit every node once. O(h) space for the recursion stack.",
    },
    optimizedSolution: {
      code: `function invertTree(root) {\n  if (root === null) return null;\n  \n  const temp = root.left;\n  root.left = invertTree(root.right);\n  root.right = invertTree(temp);\n  \n  return root;\n}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
      explanation: "Recursively invert the right child, then invert the left child. Swap them at the current node. Return the root.",
    },
    interviewExplanation: `**How to explain:**\n1. Draw a simple tree and trace the recursion\n2. Show that we go down to the leaves first (post-order)\n3. Swap at each level as we come back up\n4. The tree remains valid \u2014 just mirrored\n\n**Follow-ups:**\n\u2022 "Can you do it iteratively?" \u2192 Yes, using a queue (BFS)\n\u2022 "Check if two trees are mirror images?" \u2192 Symmetry check using similar logic\n\u2022 "Invert a binary tree in place?" \u2192 This solution already does in-place inversion`,
    tests: [
      {
        name: "Inverts a simple tree correctly",
        validate: (code) => {
          try {
            const fn = new Function(`${code}
              function TreeNode(val, left, right) { this.val = val; this.left = left || null; this.right = right || null; }
              function toArray(root) {
                if (!root) return [];
                const result = [];
                const queue = [root];
                while (queue.length) {
                  const node = queue.shift();
                  if (node) {
                    result.push(node.val);
                    queue.push(node.left);
                    queue.push(node.right);
                  }
                }
                return result;
              }
              const root = new TreeNode(4,
                new TreeNode(2, new TreeNode(1), new TreeNode(3)),
                new TreeNode(7, new TreeNode(6), new TreeNode(9))
              );
              const inverted = invertTree(root);
              return JSON.stringify(toArray(inverted));
            `)();
            return fn === JSON.stringify([4,7,2,9,6,3,1]);
          } catch { return false; }
        },
      },
      {
        name: "Returns null for empty tree",
        validate: (code) => {
          try { return new Function(`${code}; return invertTree(null);`)() === null; } catch { return false; }
        },
      },
    ],
  },

  // ═════════════════════════════════════════════════
  // GRAPHS
  // ═════════════════════════════════════════════════

  {
    id: "number-of-islands",
    number: 11,
    title: "Number of Islands",
    difficulty: "Medium",
    topics: ["graphs", "recursion"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Bloomberg", "Uber"],
    acceptance: 54,
    xp: 25,
    problemStatement: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of \`'1'\`s (land) and \`'0'\`s (water), return the number of islands.\n\nAn **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are surrounded by water.`,
    examples: [
      {
        input: 'grid = [\n  ["1","1","1","1","0"],\n  ["1","1","0","1","0"],\n  ["1","1","0","0","0"],\n  ["0","0","0","0","0"]\n]',
        output: "1",
      },
      {
        input: 'grid = [\n  ["1","1","0","0","0"],\n  ["1","1","0","0","0"],\n  ["0","0","1","0","0"],\n  ["0","0","0","1","1"]\n]',
        output: "3",
      },
    ],
    constraints: [
      "1 \u2264 m, n \u2264 300",
      "grid[i][j] is '0' or '1'.",
    ],
    conceptOverview: `**Why this problem exists:**\nNumber of Islands is the quintessential graph traversal problem. It tests your ability to explore connected components in a grid.\n\n**What it teaches:**\n\u2022 Graph DFS / BFS on a grid\n\u2022 Visited marking (in-place modification)\n\u2022 Connected component counting\n\n**Interview relevance:**\nOne of the most frequently asked graph problems. Foundation for many grid-based problems.`,
    patternRecognition: `**Pattern: Grid DFS**\n\nWhen counting connected components in a grid, iterate through every cell. When you find unvisited land, start a DFS to mark the entire island, then increment the count.\n\n**When to use this pattern:**\n\u2022 Counting connected components\n\u2022 Grid flood fill\n\u2022 Detecting islands, lakes, or boundaries`,
    sampleTests: [
      { name: "Example 1: single island", input: [[["1","1","1"],["0","0","0"]]], expected: 1 },
    ],
    starterCode: `/**\n * @param {character[][]} grid\n * @return {number}\n */\nfunction numIslands(grid) {\n  // Write your solution here\n  \n}`,
    hints: [
      "Iterate through every cell in the grid.",
      "When you find a '1', increment the count and use DFS to mark all connected land as visited.",
      "You can mark visited cells by changing '1' to '0' to avoid using extra space.",
    ],
    bruteForceSolution: {
      code: `// BFS/DFS with a visited set`,
      timeComplexity: "O(m \u00d7 n)",
      spaceComplexity: "O(m \u00d7 n)",
      explanation: "DFS or BFS from each unvisited land cell. Use a separate visited array.",
    },
    optimizedSolution: {
      code: `function numIslands(grid) {\n  if (!grid || grid.length === 0) return 0;\n  const rows = grid.length, cols = grid[0].length;\n  let count = 0;\n  \n  function dfs(r, c) {\n    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') return;\n    grid[r][c] = '0'; // mark as visited\n    dfs(r + 1, c);\n    dfs(r - 1, c);\n    dfs(r, c + 1);\n    dfs(r, c - 1);\n  }\n  \n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      if (grid[r][c] === '1') {\n        count++;\n        dfs(r, c);\n      }\n    }\n  }\n  \n  return count;\n}`,
      timeComplexity: "O(m \u00d7 n)",
      spaceComplexity: "O(m \u00d7 n)",
      explanation: "Iterate through the grid. When a '1' is found, increment the island count and run DFS to sink the entire island (mark as '0'). This modifies the input in-place, saving space for a visited set.",
    },
    interviewExplanation: `**How to explain:**\n1. Frame the problem as counting connected components in a graph\n2. Show that DFS/BFS from each node finds all nodes in that component\n3. Explain the in-place marking technique (sinking the island)\n4. Mention BFS as alternative (avoids deep recursion on large grids)\n\n**Follow-ups:**\n\u2022 "What about diagonal connections?" \u2192 Add 4 more directions\n\u2022 "Largest island?" \u2192 Track size during DFS\n\u2022 "Number of distinct islands (different shapes)?" \u2192 Track path signatures during traversal`,
    tests: [
      {
        name: "Returns 1 for single island",
        validate: (code) => {
          try {
            return new Function(`${code}; return numIslands([["1","1","1"],["0","0","0"]]);`)() === 1;
          } catch { return false; }
        },
      },
      {
        name: "Returns 3 for three islands",
        validate: (code) => {
          try {
            return new Function(`${code}; return numIslands([
              ["1","1","0","0","0"],
              ["1","1","0","0","0"],
              ["0","0","1","0","0"],
              ["0","0","0","1","1"]
            ]);`)() === 3;
          } catch { return false; }
        },
      },
      {
        name: "Uses DFS/BFS (has recursion or stack)",
        validate: anyTest(testContains("function dfs"), testContains("stack")),
      },
    ],
  },

  {
    id: "clone-graph",
    number: 12,
    title: "Clone Graph",
    difficulty: "Medium",
    topics: ["graphs", "hash-map"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Adobe"],
    acceptance: 49,
    xp: 25,
    problemStatement: `Given a reference of a node in a **connected undirected graph**, return a **deep copy** (clone) of the graph.\n\nEach node in the graph contains a value (\`int\`) and a list (\`List[Node]\`) of its neighbors.\n\n\`\`\`\nfunction Node(val, neighbors) {\n  this.val = val === undefined ? 0 : val;\n  this.neighbors = neighbors === undefined ? [] : neighbors;\n}\n\`\`\``,
    examples: [
      { input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", output: "[[2,4],[1,3],[2,4],[1,3]]", explanation: "A graph with 4 nodes (1-indexed). Node 1 has neighbors [2,4], etc." },
      { input: "adjList = [[]]", output: "[[]]" },
      { input: "adjList = []", output: "[]" },
    ],
    constraints: [
      "0 \u2264 nodes \u2264 100",
      "1 \u2264 Node.val \u2264 100",
      "Node.val is unique for each node.",
      "The graph is undirected.",
    ],
    conceptOverview: `**Why this problem exists:**\nClone Graph tests your ability to deep-copy complex graph structures while handling cycles. It's a fundamental graph traversal problem.\n\n**What it teaches:**\n\u2022 Deep copy of reference-based structures\n\u2022 Handling cycles with a visited map\n\u2022 DFS/BFS traversal on graphs\n\n**Interview relevance:**\nTests whether you understand reference semantics and can handle circular data structures.`,
    patternRecognition: `**Pattern: Deep Copy with Map**\n\nWhen cloning a graph, use a hash map to track already-cloned nodes. For each node, create a clone and recursively copy its neighbors.\n\n**When to use this pattern:**\n\u2022 Cloning complex data structures\n\u2022 Copying linked lists with random pointers\n\u2022 Any problem involving cycles and references`,
    sampleTests: [
      { name: "Single node graph", input: [[]], expected: [[]] },
    ],
    starterCode: `/**\n * @param {Node} node\n * @return {Node}\n */\nfunction cloneGraph(node) {\n  // Write your solution here\n  \n}`,
    hints: [
      "Use a hash map to store cloned nodes by their original reference.",
      "DFS traversal: if a node is already cloned, return the clone to handle cycles.",
      "For each neighbor of the original, recursively clone and add to the clone's neighbors.",
    ],
    bruteForceSolution: {
      code: `// Cannot brute-force this \u2014 graph must be traversed`,
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V)",
      explanation: "Must visit all nodes and edges. A map of size V is needed to handle cycles.",
    },
    optimizedSolution: {
      code: `function cloneGraph(node) {\n  if (!node) return null;\n  \n  const visited = new Map();\n  \n  function dfs(node) {\n    if (visited.has(node)) return visited.get(node);\n    \n    const clone = new Node(node.val);\n    visited.set(node, clone);\n    \n    for (const neighbor of node.neighbors) {\n      clone.neighbors.push(dfs(neighbor));\n    }\n    \n    return clone;\n  }\n  \n  return dfs(node);\n}`,
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V)",
      explanation: "DFS traversal. For each node, create a clone and store it in a visited map before recursing on neighbors. The map handles cycles by returning already-cloned nodes.",
    },
    interviewExplanation: `**How to explain:**\n1. The challenge is handling cycles \u2014 a simple recursive copy would infinite loop\n2. Use a hash map as a "visited" tracker: map original nodes to their clones\n3. When visiting a neighbor, check if it's already cloned\n4. If yes, return the existing clone. If no, create a new clone and recurse\n\n**Follow-ups:**\n\u2022 "What if the graph is disconnected?" \u2192 The map still works; each disconnected component is eventually traversed\n\u2022 "Can you do it with BFS?" \u2192 Yes, use a queue along with the visited map\n\u2022 "What about a linked list with a random pointer?" \u2192 Same two-pass or one-pass with map technique`,
    tests: [
      {
        name: "Clones a single node graph",
        validate: (code) => {
          try {
            const fn = new Function(`${code}
              function Node(val, neighbors) { this.val = val; this.neighbors = neighbors || []; }
              const original = new Node(1);
              const cloned = cloneGraph(original);
              return cloned !== null && cloned.val === 1 && cloned !== original;
            `)();
            return fn === true;
          } catch { return false; }
        },
      },
      {
        name: "Returns null for empty graph",
        validate: (code) => {
          try { return new Function(`${code}; return cloneGraph(null);`)() === null; } catch { return false; }
        },
      },
      {
        name: "Handles cycles (returns different reference)",
        validate: anyTest(testContains("Map"), testContains("visited")),
      },
    ],
  },
];

// ─── HELPER: compute topic counts ───

export function getTopicsWithCounts() {
  const counts = {};
  for (const problem of DSA_PROBLEMS) {
    for (const topicId of problem.topics) {
      counts[topicId] = (counts[topicId] || 0) + 1;
    }
  }
  return DSA_TOPICS.map(t => ({
    ...t,
    count: counts[t.id] || 0,
  }));
}

// ─── HELPER: get problems by topic ───

export function getProblemsByTopic(topicId) {
  if (!topicId || topicId === "all") return DSA_PROBLEMS;
  return DSA_PROBLEMS.filter(p => p.topics.includes(topicId));
}

// ─── HELPER: get problem by id ───

export function getProblemById(id) {
  return DSA_PROBLEMS.find(p => p.id === id);
}

// ─── HELPER: get company problems ───

export function getProblemsByCompany(company) {
  return DSA_PROBLEMS.filter(p => p.companies.includes(company));
}
