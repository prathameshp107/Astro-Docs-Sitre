// ────────────────────────────────────────────────────
// DSA Problem Lab — Problem Definitions
// ────────────────────────────────────────────────────

function testContains(pattern) {
  return (code) => code.includes(pattern);
}

function anyTest(...tests) {
  return (code) => tests.some(t => t(code));
}

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

export const DIFFICULTY = {
  Easy: { color: "#22c55e", bg: "rgba(34,197,94,0.12)", label: "Easy" },
  Medium: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", label: "Medium" },
  Hard: { color: "#ef4444", bg: "rgba(239,68,68,0.12)", label: "Hard" },
  Expert: { color: "#a78bfa", bg: "rgba(167,139,250,0.12)", label: "Expert" },
};

export const DSA_PROBLEMS = [
  {
    id: "two-sum", number: 1, title: "Two Sum", difficulty: "Easy",
    topics: ["arrays", "hash-map"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Bloomberg", "Uber"],
    acceptance: 52, xp: 10,
    problemStatement: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
      { input: "nums = [3,3], target = 6", output: "[0,1]" },
    ],
    constraints: ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹", "-10⁹ ≤ target ≤ 10⁹", "Only one valid answer exists."],
    conceptOverview: "**Why this problem exists:**\nTwo Sum is the quintessential interview problem that tests your understanding of hash maps for O(1) lookups.\n\n**What it teaches:**\n• Using hash maps for fast element lookup\n• The complement pattern (target - current)\n• Trading space for time",
    patternRecognition: "**Pattern: Hash Map Lookup**\n\nWhen you need to find a pair of elements that satisfy a condition, and checking all pairs is too slow (O(n²)), consider using a hash map to store elements you've already seen for O(1) lookup.",
    sampleTests: [
      { name: "Example 1: [2,7,11,15], target=9", input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { name: "Example 2: [3,2,4], target=6", input: [[3, 2, 4], 6], expected: [1, 2] },
    ],
    starterCode: "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n  // Write your solution here\n}",
    hints: ["Can you store values you've already seen?", "What value do you need to find for each element to reach the target?", "For each number, check if its complement exists in a hash map."],
    bruteForceSolution: { code: "function twoSum(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      if (nums[i] + nums[j] === target) return [i, j];\n    }\n  }\n  return [];\n}", timeComplexity: "O(n²)", spaceComplexity: "O(1)", explanation: "Check every pair of numbers." },
    optimizedSolution: { code: "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}", timeComplexity: "O(n)", spaceComplexity: "O(n)", explanation: "One pass with a hash map." },
    interviewExplanation: "**How to explain:**\n1. Start with brute force (nested loops)\n2. Use a hash map for O(1) lookups\n3. Explain the complement pattern\n4. Walk through the one-pass solution",
    tests: [
      { name: "Returns correct indices", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return twoSum([2,7,11,15], 9);`)()) === JSON.stringify([0, 1]); } catch { return false; } } },
      { name: "Handles unsorted arrays", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return twoSum([3,2,4], 6);`)()) === JSON.stringify([1, 2]); } catch { return false; } } },
      { name: "Uses hash map", validate: anyTest(testContains("Map("), testContains("{}")) },
    ],
  },
  {
    id: "contains-duplicate", number: 2, title: "Contains Duplicate", difficulty: "Easy",
    topics: ["arrays", "hash-map"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"],
    acceptance: 68, xp: 10,
    problemStatement: "Given an integer array `nums`, return `true` if any value appears **at least twice** in the array.",
    examples: [
      { input: "nums = [1,2,3,1]", output: "true" },
      { input: "nums = [1,2,3,4]", output: "false" },
      { input: "nums = [1,1,1,3,3,4,3,2,4,2]", output: "true" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁹ ≤ nums[i] ≤ 10⁹"],
    conceptOverview: "Tests your ability to detect duplicates efficiently.",
    patternRecognition: "**Pattern: Set for Duplicates**\n\nUse a Set to track seen elements. If an element is already in the Set, you've found a duplicate.",
    sampleTests: [
      { name: "Example 1", input: [[1, 2, 3, 1]], expected: true },
      { name: "Example 2", input: [[1, 2, 3, 4]], expected: false },
    ],
    starterCode: "/**\n * @param {number[]} nums\n * @return {boolean}\n */\nfunction containsDuplicate(nums) {\n}",
    hints: ["Use a Set to track seen numbers.", "If a number is already in the Set, you have a duplicate.", "Return true as soon as you find a duplicate."],
    bruteForceSolution: { code: "function containsDuplicate(nums) {\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      if (nums[i] === nums[j]) return true;\n    }\n  }\n  return false;\n}", timeComplexity: "O(n²)", spaceComplexity: "O(1)", explanation: "Compare every pair." },
    optimizedSolution: { code: "function containsDuplicate(nums) {\n  const seen = new Set();\n  for (const num of nums) {\n    if (seen.has(num)) return true;\n    seen.add(num);\n  }\n  return false;\n}", timeComplexity: "O(n)", spaceComplexity: "O(n)", explanation: "Use a Set for O(1) lookups." },
    interviewExplanation: "1. Brute force O(n²)\n2. Use a Set for O(n) time\n3. Trade O(n) space for O(n) time\n4. Early exit optimization",
    tests: [
      { name: "Detects duplicate", validate: (code) => { try { return new Function(`${code}; return containsDuplicate([1,2,3,1]);`)() === true; } catch { return false; } } },
      { name: "Returns false for unique", validate: (code) => { try { return new Function(`${code}; return containsDuplicate([1,2,3,4]);`)() === false; } catch { return false; } } },
    ],
  },
  {
    id: "valid-parentheses", number: 3, title: "Valid Parentheses", difficulty: "Easy",
    topics: ["stack"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Bloomberg", "Adobe"],
    acceptance: 58, xp: 15,
    problemStatement: "Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.",
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
      { input: 's = "([)]"', output: "false" },
      { input: 's = "{[]}"', output: "true" },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁴"],
    conceptOverview: "Tests your understanding of the stack data structure and its LIFO property.",
    patternRecognition: "**Pattern: Stack for Matching**\n\nUse a stack to match paired elements in nested structures.",
    sampleTests: [
      { name: 'Valid "()"', input: ["()"], expected: true },
      { name: 'Invalid "(]"', input: ["(]"], expected: false },
    ],
    starterCode: "/**\n * @param {string} s\n * @return {boolean}\n */\nfunction isValid(s) {\n}",
    hints: ["Use a stack to track opening brackets.", "When you see a closing bracket, check if it matches the top of the stack.", "Use a hash map to pair brackets."],
    bruteForceSolution: { code: "// Stack is the standard approach", timeComplexity: "O(n)", spaceComplexity: "O(n)", explanation: "Use a stack with a hash map for bracket matching." },
    optimizedSolution: { code: "function isValid(s) {\n  const stack = [];\n  const pairs = { ')': '(', '}': '{', ']': '[' };\n  for (const char of s) {\n    if (!pairs[char]) { stack.push(char); }\n    else { if (stack.pop() !== pairs[char]) return false; }\n  }\n  return stack.length === 0;\n}", timeComplexity: "O(n)", spaceComplexity: "O(n)", explanation: "Push opening brackets, pop and match on closing brackets." },
    interviewExplanation: "1. Recognize as a stack problem\n2. Use LIFO property for nesting\n3. Use a hash map for bracket pairs",
    tests: [
      { name: "Valid parentheses", validate: (code) => { try { return new Function(`${code}; return isValid("()");`)() === true; } catch { return false; } } },
      { name: "Valid multiple types", validate: (code) => { try { return new Function(`${code}; return isValid("()[]{}");`)() === true; } catch { return false; } } },
      { name: "Invalid mismatched", validate: (code) => { try { return new Function(`${code}; return isValid("(]");`)() === false; } catch { return false; } } },
      { name: "Uses stack", validate: testContains("push(") && testContains("pop(") },
    ],
  },
  {
    id: "maximum-subarray", number: 4, title: "Maximum Subarray", difficulty: "Medium",
    topics: ["arrays", "dp"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Adobe", "Bloomberg"],
    acceptance: 52, xp: 20,
    problemStatement: "Given an integer array `nums`, find the **subarray** with the largest sum, and return its sum.",
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      { input: "nums = [1]", output: "1" },
      { input: "nums = [5,4,-1,7,8]", output: "23" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    conceptOverview: "Maximum Subarray (Kadane's Algorithm) is a classic DP problem that teaches optimal substructure.",
    patternRecognition: "**Pattern: Kadane's Algorithm**\n\nTrack current subarray sum and maximum sum seen so far. Reset to 0 if current sum goes negative.",
    sampleTests: [
      { name: "Example 1", input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
      { name: "Single element", input: [[1]], expected: 1 },
    ],
    starterCode: "/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction maxSubArray(nums) {\n}",
    hints: ["What is the maximum sum ending at each position?", "If current sum goes negative, start fresh.", "Track two values: current sum and max sum."],
    bruteForceSolution: { code: "function maxSubArray(nums) {\n  let max = -Infinity;\n  for (let i = 0; i < nums.length; i++) {\n    let sum = 0;\n    for (let j = i; j < nums.length; j++) {\n      sum += nums[j];\n      max = Math.max(max, sum);\n    }\n  }\n  return max;\n}", timeComplexity: "O(n²)", spaceComplexity: "O(1)", explanation: "Check every possible subarray." },
    optimizedSolution: { code: "function maxSubArray(nums) {\n  let maxSum = nums[0];\n  let currentSum = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currentSum = Math.max(nums[i], currentSum + nums[i]);\n    maxSum = Math.max(maxSum, currentSum);\n  }\n  return maxSum;\n}", timeComplexity: "O(n)", spaceComplexity: "O(1)", explanation: "Kadane's Algorithm." },
    interviewExplanation: "1. Start with brute force O(n²)\n2. Extending a negative prefix never helps\n3. Compare current element vs current element + previous sum\n4. Track global maximum",
    tests: [
      { name: "Returns correct sum", validate: (code) => { try { return new Function(`${code}; return maxSubArray([-2,1,-3,4,-1,2,1,-5,4]);`)() === 6; } catch { return false; } } },
      { name: "Single element", validate: (code) => { try { return new Function(`${code}; return maxSubArray([1]);`)() === 1; } catch { return false; } } },
      { name: "All negative", validate: (code) => { try { return new Function(`${code}; return maxSubArray([-3,-2,-1]);`)() === -1; } catch { return false; } } },
    ],
  },
  {
    id: "reverse-linked-list", number: 5, title: "Reverse Linked List", difficulty: "Easy",
    topics: ["linked-list"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Adobe"],
    acceptance: 72, xp: 15,
    problemStatement: "Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "head = [1,2]", output: "[2,1]" },
    ],
    constraints: ["0 ≤ list length ≤ 5000"],
    conceptOverview: "Reverse Linked List is the foundational linked list problem testing pointer manipulation.",
    patternRecognition: "**Pattern: Pointer Reversal**\n\nUse three pointers: previous, current, and next. Save the next node before breaking the link.",
    sampleTests: [
      { name: "Basic reversal", input: [[]], expected: [] },
    ],
    starterCode: "/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nfunction reverseList(head) {\n}",
    hints: ["Use three pointers: prev, curr, nextTemp.", "Save the next node before redirecting.", "Return prev as the new head."],
    bruteForceSolution: { code: "// Iterative is optimal", timeComplexity: "O(n)", spaceComplexity: "O(1)", explanation: "The standard iterative approach." },
    optimizedSolution: { code: "function reverseList(head) {\n  let prev = null, curr = head;\n  while (curr !== null) {\n    const nextTemp = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = nextTemp;\n  }\n  return prev;\n}", timeComplexity: "O(n)", spaceComplexity: "O(1)", explanation: "Three-pointer iterative reversal." },
    interviewExplanation: "1. Draw a simple list and show pointer reversal\n2. Explain prev, curr, nextTemp\n3. Walk through one iteration",
    tests: [
      { name: "Reverses list", validate: (code) => { try { const fn = new Function(`${code}; function toArray(h) { const a=[]; let c=h; while(c){a.push(c.val);c=c.next} return a; } function fromArray(arr) { if(!arr.length) return null; const h=new ListNode(arr[0]); let c=h; for(let i=1;i<arr.length;i++){c.next=new ListNode(arr[i]);c=c.next} return h; } return JSON.stringify(toArray(reverseList(fromArray([1,2,3,4,5]))));`)(); return fn === JSON.stringify([5,4,3,2,1]); } catch { return false; } } },
      { name: "Handles single node", validate: (code) => { try { const fn = new Function(`${code}; const h=new ListNode(1); const r=reverseList(h); return r?r.val:null;`)(); return fn === 1; } catch { return false; } } },
    ],
  },
  {
    id: "merge-two-sorted-lists", number: 6, title: "Merge Two Sorted Lists", difficulty: "Easy",
    topics: ["linked-list", "recursion"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Bloomberg"],
    acceptance: 65, xp: 15,
    problemStatement: "You are given the heads of two sorted linked lists. Merge them into one sorted list.",
    examples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "list1 = [], list2 = [0]", output: "[0]" },
    ],
    constraints: ["0 ≤ list length ≤ 50"],
    conceptOverview: "Tests your ability to merge sorted data — a fundamental divide-and-conquer pattern.",
    patternRecognition: "**Pattern: Two-Pointer Merge**\n\nCompare elements from both lists using two pointers. Take the smaller one and advance. Use a dummy head.",
    sampleTests: [
      { name: "Basic merge", input: [[1,2,4], [1,3,4]], expected: [1,1,2,3,4,4] },
    ],
    starterCode: "/**\n * @param {ListNode} list1\n * @param {ListNode} list2\n * @return {ListNode}\n */\nfunction mergeTwoLists(list1, list2) {\n}",
    hints: ["Use a dummy node.", "Compare and attach the smaller node.", "Attach remaining nodes when one list is exhausted."],
    bruteForceSolution: { code: "function mergeTwoLists(l1, l2) { const arr=[]; while(l1){arr.push(l1.val);l1=l1.next} while(l2){arr.push(l2.val);l2=l2.next} arr.sort((a,b)=>a-b); const d=new ListNode(); let c=d; for(const v of arr){c.next=new ListNode(v);c=c.next} return d.next; }", timeComplexity: "O((n+m) log(n+m))", spaceComplexity: "O(n+m)", explanation: "Extract values, sort, rebuild." },
    optimizedSolution: { code: "function mergeTwoLists(l1, l2) {\n  const dummy = new ListNode();\n  let curr = dummy;\n  while (l1 && l2) {\n    if (l1.val <= l2.val) { curr.next = l1; l1 = l1.next; }\n    else { curr.next = l2; l2 = l2.next; }\n    curr = curr.next;\n  }\n  curr.next = l1 || l2;\n  return dummy.next;\n}", timeComplexity: "O(n+m)", spaceComplexity: "O(1)", explanation: "Dummy head + two-pointer merge." },
    interviewExplanation: "1. Use dummy node to avoid null checks\n2. Compare and attach smaller element\n3. Attach remainder when one list ends",
    tests: [
      { name: "Merges correctly", validate: (code) => { try { const fn = new Function(`${code}; function ListNode(v,n){this.val=v;this.next=n||null} function toArray(h){const a=[];let c=h;while(c){a.push(c.val);c=c.next} return a} function fromArray(arr){if(!arr.length) return null; const h=new ListNode(arr[0]); let c=h; for(let i=1;i<arr.length;i++){c.next=new ListNode(arr[i]);c=c.next} return h} return JSON.stringify(toArray(mergeTwoLists(fromArray([1,2,4]),fromArray([1,3,4]))));`)(); return fn === JSON.stringify([1,1,2,3,4,4]); } catch { return false; } } },
      { name: "Handles empty", validate: (code) => { try { return new Function(`${code}; function ListNode(v,n){this.val=v;this.next=n||null} const r=mergeTwoLists(null,new ListNode(0)); return r?r.val:null;`)() === 0; } catch { return false; } } },
    ],
  },
  {
    id: "binary-search", number: 7, title: "Binary Search", difficulty: "Easy",
    topics: ["binary-search", "arrays"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"],
    acceptance: 62, xp: 10,
    problemStatement: "Given a sorted array of integers and a target, return the index or -1. Must be O(log n).",
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁴"],
    conceptOverview: "Binary Search is the most fundamental divide-and-conquer algorithm achieving O(log n) time.",
    patternRecognition: "**Pattern: Divide and Conquer Search**\n\nEliminate half the search space at each step. Compare target with middle element.",
    sampleTests: [
      { name: "Found", input: [[-1,0,3,5,9,12], 9], expected: 4 },
      { name: "Not found", input: [[-1,0,3,5,9,12], 2], expected: -1 },
    ],
    starterCode: "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nfunction search(nums, target) {\n}",
    hints: ["Use left and right pointers.", "Calculate mid = Math.floor((left + right) / 2).", "Discard the half that cannot contain the target."],
    bruteForceSolution: { code: "function search(nums, target) { for(let i=0;i<nums.length;i++){if(nums[i]===target) return i} return -1 }", timeComplexity: "O(n)", spaceComplexity: "O(1)", explanation: "Linear scan." },
    optimizedSolution: { code: "function search(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}", timeComplexity: "O(log n)", spaceComplexity: "O(1)", explanation: "Classic binary search." },
    interviewExplanation: "1. Invariant: target is between left and right\n2. Check middle, eliminate half\n3. Continue until left > right",
    tests: [
      { name: "Finds target", validate: (code) => { try { return new Function(`${code}; return search([-1,0,3,5,9,12], 9);`)() === 4; } catch { return false; } } },
      { name: "Missing target", validate: (code) => { try { return new Function(`${code}; return search([-1,0,3,5,9,12], 2);`)() === -1; } catch { return false; } } },
      { name: "Uses binary search", validate: testContains("mid") },
    ],
  },
  {
    id: "search-rotated-array", number: 8, title: "Search in Rotated Sorted Array", difficulty: "Medium",
    topics: ["binary-search", "arrays"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Bloomberg", "Uber"],
    acceptance: 40, xp: 25,
    problemStatement: "Search for a target in a rotated sorted array. The array was sorted then rotated at an unknown pivot. Must be O(log n).",
    examples: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" },
    ],
    constraints: ["1 ≤ nums.length ≤ 5000", "All values are unique."],
    conceptOverview: "Extends binary search to handle rotated sorted arrays. Tests deep understanding of the binary search invariant.",
    patternRecognition: "**Pattern: Modified Binary Search**\n\nEven in a rotated array, at least one half is fully sorted. Determine which half, then check if target lies in it.",
    sampleTests: [
      { name: "Target in right half", input: [[4,5,6,7,0,1,2], 0], expected: 4 },
      { name: "Missing", input: [[4,5,6,7,0,1,2], 3], expected: -1 },
    ],
    starterCode: "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nfunction search(nums, target) {\n}",
    hints: ["One half is always sorted.", "Compare nums[left] with nums[mid] to determine which half.", "Check if target falls in the sorted half."],
    bruteForceSolution: { code: "function search(nums, target) { return nums.indexOf(target); }", timeComplexity: "O(n)", spaceComplexity: "O(1)", explanation: "Linear scan via indexOf." },
    optimizedSolution: { code: "function search(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[left] <= nums[mid]) {\n      if (target >= nums[left] && target < nums[mid]) right = mid - 1;\n      else left = mid + 1;\n    } else {\n      if (target > nums[mid] && target <= nums[right]) left = mid + 1;\n      else right = mid - 1;\n    }\n  }\n  return -1;\n}", timeComplexity: "O(log n)", spaceComplexity: "O(1)", explanation: "Modified binary search identifying sorted halves." },
    interviewExplanation: "1. Check which half is sorted via nums[left] <= nums[mid]\n2. If target is in sorted half, search there\n3. Otherwise search the other half",
    tests: [
      { name: "Finds target", validate: (code) => { try { return new Function(`${code}; return search([4,5,6,7,0,1,2], 0);`)() === 4; } catch { return false; } } },
      { name: "Returns -1", validate: (code) => { try { return new Function(`${code}; return search([4,5,6,7,0,1,2], 3);`)() === -1; } catch { return false; } } },
      { name: "Uses mid", validate: testContains("mid") },
    ],
  },
  {
    id: "maximum-depth-of-binary-tree", number: 9, title: "Maximum Depth of Binary Tree", difficulty: "Easy",
    topics: ["trees", "recursion"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"],
    acceptance: 75, xp: 10,
    problemStatement: "Given the root of a binary tree, return its maximum depth (the number of nodes on the longest root-to-leaf path).",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3" },
      { input: "root = [1,null,2]", output: "2" },
    ],
    constraints: ["0 ≤ tree nodes ≤ 10⁴"],
    conceptOverview: "The foundational tree problem introducing tree traversal and recursive thinking.",
    patternRecognition: "**Pattern: Tree Recursion**\n\nSolve for the left subtree, solve for the right subtree, then combine the results.",
    sampleTests: [{ name: "Example 1", input: [[]], expected: 0 }],
    starterCode: "/**\n * @param {TreeNode} root\n * @return {number}\n */\nfunction maxDepth(root) {\n}",
    hints: ["Depth of empty tree is 0.", "Depth of a node = 1 + max(depth of left, depth of right).", "Use recursion."],
    bruteForceSolution: { code: "// Recursive DFS is standard", timeComplexity: "O(n)", spaceComplexity: "O(h)", explanation: "DFS recursion." },
    optimizedSolution: { code: "function maxDepth(root) {\n  if (!root) return 0;\n  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n}", timeComplexity: "O(n)", spaceComplexity: "O(h)", explanation: "Recursive DFS." },
    interviewExplanation: "1. Base case: empty tree depth 0\n2. Node depth = 1 + max(left, right)\n3. Classic divide-and-conquer on trees",
    tests: [
      { name: "Returns depth", validate: (code) => { try { return new Function(`${code}; function TreeNode(v,l,r){this.val=v;this.left=l||null;this.right=r||null} return maxDepth(new TreeNode(3,new TreeNode(9),new TreeNode(20,new TreeNode(15),new TreeNode(7))));`)() === 3; } catch { return false; } } },
      { name: "Empty tree", validate: (code) => { try { return new Function(`${code}; return maxDepth(null);`)() === 0; } catch { return false; } } },
    ],
  },
  {
    id: "invert-binary-tree", number: 10, title: "Invert Binary Tree", difficulty: "Easy",
    topics: ["trees", "recursion"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"],
    acceptance: 77, xp: 10,
    problemStatement: "Invert a binary tree by swapping the left and right children of every node.",
    examples: [
      { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
      { input: "root = [2,1,3]", output: "[2,3,1]" },
    ],
    constraints: ["0 ≤ tree nodes ≤ 100"],
    conceptOverview: "Tests recursive tree transformation. Made famous by a Google interview story.",
    patternRecognition: "**Pattern: Tree Transformation**\n\nSolve for children first (post-order), then transform the current node.",
    sampleTests: [{ name: "Example 1", input: [[]], expected: [] }],
    starterCode: "/**\n * @param {TreeNode} root\n * @return {TreeNode}\n */\nfunction invertTree(root) {\n}",
    hints: ["Swap left and right children.", "Recursively invert subtrees before swapping.", "Base case: null returns null."],
    bruteForceSolution: { code: "// Recursive is standard", timeComplexity: "O(n)", spaceComplexity: "O(h)", explanation: "Recursive post-order swap." },
    optimizedSolution: { code: "function invertTree(root) {\n  if (!root) return null;\n  const temp = root.left;\n  root.left = invertTree(root.right);\n  root.right = invertTree(temp);\n  return root;\n}", timeComplexity: "O(n)", spaceComplexity: "O(h)", explanation: "Recursive post-order inversion." },
    interviewExplanation: "1. Go down to leaves first (post-order)\n2. Swap at each level as you return\n3. Tree remains valid — just mirrored",
    tests: [
      { name: "Inverts tree", validate: (code) => { try { const fn = new Function(`${code}; function TreeNode(v,l,r){this.val=v;this.left=l||null;this.right=r||null} function toArray(r){if(!r) return []; const q=[r],res=[]; while(q.length){const n=q.shift(); if(n){res.push(n.val); q.push(n.left); q.push(n.right)}} return res} const root=new TreeNode(4,new TreeNode(2,new TreeNode(1),new TreeNode(3)),new TreeNode(7,new TreeNode(6),new TreeNode(9))); return JSON.stringify(toArray(invertTree(root)));`)(); return fn === JSON.stringify([4,7,2,9,6,3,1]); } catch { return false; } } },
      { name: "Empty tree", validate: (code) => { try { return new Function(`${code}; return invertTree(null);`)() === null; } catch { return false; } } },
    ],
  },
  {
    id: "number-of-islands", number: 11, title: "Number of Islands", difficulty: "Medium",
    topics: ["graphs", "recursion"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Bloomberg", "Uber"],
    acceptance: 54, xp: 25,
    problemStatement: "Given an m x n 2D binary grid of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and formed by connecting adjacent lands horizontally or vertically.",
    examples: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: "1" },
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: "3" },
    ],
    constraints: ["1 ≤ m, n ≤ 300"],
    conceptOverview: "The quintessential graph traversal problem testing connected component counting in a grid.",
    patternRecognition: "**Pattern: Grid DFS**\n\nIterate through every cell. When you find unvisited land, start a DFS to mark the entire island. Increment count.",
    sampleTests: [{ name: "Single island", input: [[["1","1","1"],["0","0","0"]]], expected: 1 }],
    starterCode: "/**\n * @param {character[][]} grid\n * @return {number}\n */\nfunction numIslands(grid) {\n}",
    hints: ["Iterate every cell.", "When you find '1', increment count and DFS to mark all connected land.", "Mark visited cells by changing '1' to '0'."],
    bruteForceSolution: { code: "// BFS/DFS with visited set", timeComplexity: "O(m×n)", spaceComplexity: "O(m×n)", explanation: "DFS with a separate visited array." },
    optimizedSolution: { code: "function numIslands(grid) {\n  if (!grid || !grid.length) return 0;\n  const rows = grid.length, cols = grid[0].length;\n  let count = 0;\n  function dfs(r, c) {\n    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') return;\n    grid[r][c] = '0';\n    dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1);\n  }\n  for (let r = 0; r < rows; r++)\n    for (let c = 0; c < cols; c++)\n      if (grid[r][c] === '1') { count++; dfs(r, c); }\n  return count;\n}", timeComplexity: "O(m×n)", spaceComplexity: "O(m×n)", explanation: "DFS with in-place marking (sinking islands)." },
    interviewExplanation: "1. Frame as counting connected components\n2. DFS from each unvisited land cell\n3. Sink the island (mark as '0') to save space",
    tests: [
      { name: "Single island", validate: (code) => { try { return new Function(`${code}; return numIslands([[\"1\",\"1\",\"1\"],[\"0\",\"0\",\"0\"]]);`)() === 1; } catch { return false; } } },
      { name: "Three islands", validate: (code) => { try { return new Function(`${code}; return numIslands([[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]);`)() === 3; } catch { return false; } } },
    ],
  },
  {
    id: "clone-graph", number: 12, title: "Clone Graph", difficulty: "Medium",
    topics: ["graphs", "hash-map"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Adobe"],
    acceptance: 49, xp: 25,
    problemStatement: "Return a deep copy (clone) of a connected undirected graph. Each node contains a value and a list of its neighbors.",
    examples: [
      { input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", output: "[[2,4],[1,3],[2,4],[1,3]]" },
      { input: "adjList = [[]]", output: "[[]]" },
    ],
    constraints: ["0 ≤ nodes ≤ 100", "Node.val is unique."],
    conceptOverview: "Tests deep copy of complex graph structures while handling cycles.",
    patternRecognition: "**Pattern: Deep Copy with Map**\n\nUse a hash map to track already-cloned nodes. Handle cycles by returning existing clones.",
    sampleTests: [{ name: "Single node", input: [[]], expected: [[]] }],
    starterCode: "/**\n * @param {Node} node\n * @return {Node}\n */\nfunction cloneGraph(node) {\n}",
    hints: ["Use a hash map for cloned nodes.", "If a node is already cloned, return the clone (handles cycles).", "Recursively clone neighbors."],
    bruteForceSolution: { code: "// Must traverse graph, no brute force", timeComplexity: "O(V+E)", spaceComplexity: "O(V)", explanation: "DFS with visited map." },
    optimizedSolution: { code: "function cloneGraph(node) {\n  if (!node) return null;\n  const visited = new Map();\n  function dfs(node) {\n    if (visited.has(node)) return visited.get(node);\n    const clone = new Node(node.val);\n    visited.set(node, clone);\n    for (const neighbor of node.neighbors) {\n      clone.neighbors.push(dfs(neighbor));\n    }\n    return clone;\n  }\n  return dfs(node);\n}", timeComplexity: "O(V+E)", spaceComplexity: "O(V)", explanation: "DFS with a visited map to handle cycles." },
    interviewExplanation: "1. Cycles make naive recursion infinite loop\n2. Use hash map: original → clone\n3. Check map before recursing on neighbors",
    tests: [
      { name: "Clones single node", validate: (code) => { try { return new Function(`${code}; function Node(v,n){this.val=v;this.neighbors=n||[]} const o=new Node(1); const c=cloneGraph(o); return c!==null && c.val===1 && c!==o;`)() === true; } catch { return false; } } },
      { name: "Returns null", validate: (code) => { try { return new Function(`${code}; return cloneGraph(null);`)() === null; } catch { return false; } } },
      { name: "Handles cycles", validate: anyTest(testContains("Map"), testContains("visited")) },
    ],
  },

  // ═════════════════════════════════════════════════
  // STACK
  // ═════════════════════════════════════════════════

  {
    id: "min-stack",
    number: 13,
    title: "Min Stack",
    difficulty: "Medium",
    topics: ["stack"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Bloomberg", "Adobe"],
    acceptance: 53,
    xp: 20,
    problemStatement: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\n\nImplement the `MinStack` class:\n- `push(val)`: pushes val onto the stack\n- `pop()`: removes the top element\n- `top()`: gets the top element\n- `getMin()`: retrieves the minimum element in the stack\n\nAll operations must be **O(1)** time complexity.",
    examples: [
      { input: 'push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()', output: "-3, 0, -2" },
    ],
    constraints: ["-2³¹ ≤ val ≤ 2³¹ - 1", "Methods pop, top, and getMin will always be called on non-empty stacks."],
    conceptOverview: "**Why this problem exists:**\nMin Stack tests your ability to design a data structure with additional tracking while maintaining O(1) time for all operations.\n\n**What it teaches:**\n• Designing augmented data structures\n• Using an auxiliary stack for tracking\n• Trading space for time at the data structure level\n\n**Interview relevance:**\nA classic design problem that tests both data structure knowledge and optimization thinking.",
    patternRecognition: "**Pattern: Auxiliary Stack**\n\nWhen you need to track additional properties (like min/max) while maintaining O(1) operations, use a separate stack to store the state at each level.\n\n**When to use this pattern:**\n• Tracking min/max in a stack\n• Tracking additional state with O(1) access\n• Augmented data structures",
    sampleTests: [
      { name: "Example sequence", input: [[]], expected: [] },
    ],
    starterCode: "/**\n * Your MinStack object will be instantiated and called as such:\n * var obj = new MinStack()\n * obj.push(val)\n * obj.pop()\n * var param_3 = obj.top()\n * var param_4 = obj.getMin()\n */\nvar MinStack = function() {\n  // Initialize your data structures here\n};\n\nMinStack.prototype.push = function(val) {\n  // Write your solution here\n};\n\nMinStack.prototype.pop = function() {\n  // Write your solution here\n};\n\nMinStack.prototype.top = function() {\n  // Write your solution here\n};\n\nMinStack.prototype.getMin = function() {\n  // Write your solution here\n};",
    hints: [
      "Use TWO stacks: one for values, one for minimums.",
      "When pushing, check if the new value is less than or equal to the current minimum.",
      "When popping, if the popped value equals the current minimum, pop from the min stack too.",
    ],
    bruteForceSolution: {
      code: "// Track all values, scan for min when getMin() is called\nvar MinStack = function() { this.stack = []; };\nMinStack.prototype.push = function(val) { this.stack.push(val); };\nMinStack.prototype.pop = function() { this.stack.pop(); };\nMinStack.prototype.top = function() { return this.stack[this.stack.length - 1]; };\nMinStack.prototype.getMin = function() { return Math.min(...this.stack); };",
      timeComplexity: "O(n) for getMin, O(1) for others",
      spaceComplexity: "O(n)",
      explanation: "Store all values. Scan the entire stack when getMin is called — O(n) time.",
    },
    optimizedSolution: {
      code: "var MinStack = function() {\n  this.stack = [];\n  this.minStack = [];\n};\n\nMinStack.prototype.push = function(val) {\n  this.stack.push(val);\n  if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {\n    this.minStack.push(val);\n  }\n};\n\nMinStack.prototype.pop = function() {\n  const popped = this.stack.pop();\n  if (popped === this.minStack[this.minStack.length - 1]) {\n    this.minStack.pop();\n  }\n};\n\nMinStack.prototype.top = function() {\n  return this.stack[this.stack.length - 1];\n};\n\nMinStack.prototype.getMin = function() {\n  return this.minStack[this.minStack.length - 1];\n};",
      timeComplexity: "O(1) for all operations",
      spaceComplexity: "O(n)",
      explanation: "Use two stacks: one for values, one for keeping track of the current minimum. When pushing, if the value is ≤ current min, push it onto the min stack. When popping, if the popped value equals the current min, pop from the min stack too.",
    },
    interviewExplanation: "**How to explain:**\n1. Start with tracking min by scanning — O(n) getMin is the naive approach\n2. Introduce the auxiliary stack — the minimum stack stores the min at each level\n3. Walk through push/pop interactions with both stacks\n4. Show that all operations remain O(1)\n\n**Follow-ups:**\n• \"Can you do this with a single stack?\" → Yes, store pairs (value, currentMin) on one stack\n• \"What about tracking the median instead?\" → Use two heaps\n• \"What if you could use O(1) extra space?\" → Store the difference from min as the value",
    tests: [
      {
        name: "Correctly tracks minimum",
        validate: (code) => {
          try {
            const fn = new Function(`${code}\nconst ms = new MinStack();\nms.push(-2);\nms.push(0);\nms.push(-3);\nconst m1 = ms.getMin();\nms.pop();\nconst t = ms.top();\nconst m2 = ms.getMin();\nreturn JSON.stringify({m1, t, m2});\n`)();
            return fn === JSON.stringify({ m1: -3, t: 0, m2: -2 });
          } catch { return false; }
        },
      },
      {
        name: "Uses auxiliary stack pattern",
        validate: anyTest(testContains("minStack"), testContains("min")),
      },
    ],
  },

  {
    id: "daily-temperatures",
    number: 14,
    title: "Daily Temperatures",
    difficulty: "Medium",
    topics: ["stack"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Bloomberg"],
    acceptance: 47,
    xp: 25,
    problemStatement: "Given an array of integers `temperatures` that represents the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you would have to wait until a warmer temperature.\n\nIf there is no future day with a warmer temperature, keep `answer[i] = 0` instead.",
    examples: [
      { input: "temperatures = [73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]" },
      { input: "temperatures = [30,40,50,60]", output: "[1,1,1,0]" },
      { input: "temperatures = [30,60,90]", output: "[1,1,0]" },
    ],
    constraints: ["1 ≤ temperatures.length ≤ 10⁵", "30 ≤ temperatures[i] ≤ 100"],
    conceptOverview: "**Why this problem exists:**\nDaily Temperatures is the classic monotonic stack problem. It teaches the pattern of finding the next greater element efficiently.\n\n**What it teaches:**\n• Monotonic stack pattern (strictly decreasing stack)\n• Using indices instead of values on the stack\n• How to avoid O(n²) brute force\n\n**Interview relevance:**\nMonotonic stack is a critical pattern for solving \"next greater/smaller element\" problems.",
    patternRecognition: "**Pattern: Monotonic Stack**\n\nUse a stack that maintains elements in decreasing order. When you find a warmer temperature, pop from the stack and calculate the difference in days.\n\n**When to use this pattern:**\n• Next greater element in an array\n• Next smaller element\n• Stock span problems\n• Largest rectangle in histogram",
    sampleTests: [
      { name: "Example 1", input: [[73,74,75,71,69,72,76,73]], expected: [1,1,4,2,1,1,0,0] },
      { name: "Example 2", input: [[30,40,50,60]], expected: [1,1,1,0] },
    ],
    starterCode: "/**\n * @param {number[]} temperatures\n * @return {number[]}\n */\nfunction dailyTemperatures(temperatures) {\n  // Write your solution here\n}",
    hints: [
      "Use a stack to store indices of days with decreasing temperatures.",
      "When you find a warmer temperature, pop from the stack and calculate the days difference.",
      "The stack stores indices, not temperatures — so you can compute the distance.",
    ],
    bruteForceSolution: {
      code: "function dailyTemperatures(temps) {\n  const result = new Array(temps.length).fill(0);\n  for (let i = 0; i < temps.length; i++) {\n    for (let j = i + 1; j < temps.length; j++) {\n      if (temps[j] > temps[i]) {\n        result[i] = j - i;\n        break;\n      }\n    }\n  }\n  return result;\n}",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(n)",
      explanation: "For each day, scan forward to find a warmer temperature — O(n²) worst case.",
    },
    optimizedSolution: {
      code: "function dailyTemperatures(temperatures) {\n  const n = temperatures.length;\n  const result = new Array(n).fill(0);\n  const stack = [];\n  \n  for (let i = 0; i < n; i++) {\n    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {\n      const prevIndex = stack.pop();\n      result[prevIndex] = i - prevIndex;\n    }\n    stack.push(i);\n  }\n  \n  return result;\n}",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      explanation: "Iterate once, using a monotonic decreasing stack of indices. When a warmer temperature is found, pop all colder days and compute the days difference.",
    },
    interviewExplanation: "**How to explain:**\n1. Brute force thinking: for each day, scan forward for warmer temp\n2. Notice inefficient repeated scanning — monotonic stack solves this\n3. Walk through: stack maintains decreasing temps (by index), when warmer found, pop and compute\n4. Each element pushed and popped at most once → O(n)\n\n**Follow-ups:**\n• \"What if you wanted colder days instead?\" → Use a monotonic increasing stack\n• \"Next greater element in a circular array?\" → Extend array or use modulo\n• \"Largest rectangle in histogram?\" → Same pattern with heights",
    tests: [
      {
        name: "Returns correct days for example",
        validate: (code) => {
          try { return JSON.stringify(new Function(`${code}; return dailyTemperatures([73,74,75,71,69,72,76,73]);`)()) === JSON.stringify([1,1,4,2,1,1,0,0]); } catch { return false; }
        },
      },
      {
        name: "Handles increasing temps",
        validate: (code) => {
          try { return JSON.stringify(new Function(`${code}; return dailyTemperatures([30,40,50,60]);`)()) === JSON.stringify([1,1,1,0]); } catch { return false; }
        },
      },
      {
        name: "Uses stack pattern",
        validate: testContains("push(") && testContains("pop("),
      },
    ],
  },

  // ═════════════════════════════════════════════════
  // QUEUE
  // ═════════════════════════════════════════════════

  {
    id: "implement-queue-using-stacks",
    number: 15,
    title: "Implement Queue using Stacks",
    difficulty: "Easy",
    topics: ["queue", "stack"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"],
    acceptance: 68,
    xp: 15,
    problemStatement: "Implement a first-in-first-out (FIFO) queue using only two stacks. The implemented queue should support all the normal queue functions: `push`, `pop`, `peek`, and `empty`.\n\nAll operations must have **amortized O(1)** time complexity.",
    examples: [
      { input: "push(1), push(2), peek(), pop(), empty()", output: "1, 1, false" },
    ],
    constraints: ["1 ≤ val ≤ 9 (for simplicity)", "pop and peek will always be called on non-empty queues."],
    conceptOverview: "**Why this problem exists:**\nThis problem tests your understanding of the difference between stack (LIFO) and queue (FIFO) data structures, and how to simulate one using the other.\n\n**What it teaches:**\n• Stack vs queue semantics\n• Two-stack simulation of a queue\n• Amortized analysis\n\n**Interview relevance:**\nA classic design problem that tests fundamental data structure understanding.",
    patternRecognition: "**Pattern: Two-Stack Queue**\n\nUse one stack for pushing (input stack) and another for popping (output stack). When the output stack is empty, transfer all elements from the input stack — reversing their order to achieve FIFO.\n\n**When to use this pattern:**\n• Emulating one data structure with another\n• Reversing order via stack transfers\n• Any problem that needs both LIFO and FIFO",
    sampleTests: [
      { name: "Example sequence", input: [[]], expected: [] },
    ],
    starterCode: "/**\n * Your MyQueue object will be instantiated and called as such:\n * var obj = new MyQueue()\n * obj.push(x)\n * var param_2 = obj.pop()\n * var param_3 = obj.peek()\n * var param_4 = obj.empty()\n */\nvar MyQueue = function() {\n  // Initialize your data structures here\n};\n\nMyQueue.prototype.push = function(x) {\n  // Write your solution here\n};\n\nMyQueue.prototype.pop = function() {\n  // Write your solution here\n};\n\nMyQueue.prototype.peek = function() {\n  // Write your solution here\n};\n\nMyQueue.prototype.empty = function() {\n  // Write your solution here\n};",
    hints: [
      "Use two stacks: one for input, one for output.",
      "When you need to pop/peek and the output stack is empty, transfer all elements from the input stack.",
      "Transferring reverses the order — turning LIFO into FIFO.",
    ],
    bruteForceSolution: {
      code: "// Use a single stack — pop/peek would require O(n) to remove bottom element",
      timeComplexity: "O(n) for pop/peek",
      spaceComplexity: "O(n)",
      explanation: "Pop all elements, remove the bottom, push back — O(n) per pop.",
    },
    optimizedSolution: {
      code: "var MyQueue = function() {\n  this.input = [];\n  this.output = [];\n};\n\nMyQueue.prototype.push = function(x) {\n  this.input.push(x);\n};\n\nMyQueue.prototype.pop = function() {\n  this.peek();\n  return this.output.pop();\n};\n\nMyQueue.prototype.peek = function() {\n  if (this.output.length === 0) {\n    while (this.input.length > 0) {\n      this.output.push(this.input.pop());\n    }\n  }\n  return this.output[this.output.length - 1];\n};\n\nMyQueue.prototype.empty = function() {\n  return this.input.length === 0 && this.output.length === 0;\n};",
      timeComplexity: "O(1) amortized",
      spaceComplexity: "O(n)",
      explanation: "Use two stacks. Push always goes to input. Pop/peek uses output — if empty, transfer all input to output (reverses order). Each element is moved at most twice total.",
    },
    interviewExplanation: "**How to explain:**\n1. Recognize the fundamental difference: stack is LIFO, queue is FIFO\n2. Two stacks can reverse elements twice (LIFO + LIFO = FIFO)\n3. Input stack receives pushes. Output stack serves pops/peeks\n4. Transfer only when output is empty — amortized O(1)\n\n**Follow-ups:**\n• \"Can you implement a stack using two queues?\" → Yes, use one queue as temporary storage\n• \"What about implementing a deque using two stacks?\" → More complex, needs balancing\n• \"How would you make all operations worst-case O(1)?\" → Use linked list with head/tail pointers",
    tests: [
      {
        name: "Correctly implements FIFO order",
        validate: (code) => {
          try {
            const fn = new Function(`${code}\nconst q = new MyQueue();\nq.push(1);\nq.push(2);\nconst p1 = q.peek();\nconst p2 = q.pop();\nconst e = q.empty();\nreturn JSON.stringify({peek: p1, pop: p2, empty: e});\n`)();
            return fn === JSON.stringify({ peek: 1, pop: 1, empty: false });
          } catch { return false; }
        },
      },
      {
        name: "Uses two stacks",
        validate: testContains("input") && testContains("output"),
      },
    ],
  },

  // ═════════════════════════════════════════════════
  // TWO POINTERS
  // ═════════════════════════════════════════════════

  {
    id: "valid-palindrome",
    number: 16,
    title: "Valid Palindrome",
    difficulty: "Easy",
    topics: ["two-pointers"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Bloomberg"],
    acceptance: 48,
    xp: 10,
    problemStatement: "A phrase is a **palindrome** if, after converting all uppercase letters to lowercase and removing all non-alphanumeric characters, it reads the same forward and backward.\n\nGiven a string `s`, return `true` if it is a **palindrome**, or `false` otherwise.",
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: "true", explanation: '"amanaplanacanalpanama" is a palindrome.' },
      { input: 's = "race a car"', output: "false", explanation: '"raceacar" is not a palindrome.' },
      { input: 's = " "', output: "true", explanation: 's is an empty string "" after removing non-alphanumeric characters.' },
    ],
    constraints: ["1 ≤ s.length ≤ 2 × 10⁵", "s consists only of printable ASCII characters."],
    conceptOverview: "**Why this problem exists:**\nValid Palindrome is the gateway problem for the two-pointer technique. It's often the first problem taught in the two-pointer pattern.\n\n**What it teaches:**\n• Two-pointer technique on strings\n• Character validation (alphanumeric checking)\n• In-place string processing without extra space\n\n**Interview relevance:**\nA warm-up problem that establishes the two-pointer pattern used in harder problems like 3Sum and container with most water.",
    patternRecognition: "**Pattern: Two Pointers from Ends**\n\nPlace one pointer at the start and one at the end. Move them toward each other, comparing characters as you go. Skip non-alphanumeric characters.\n\n**When to use this pattern:**\n• Checking palindromes\n• Reversing arrays/strings in-place\n• Finding pairs that satisfy a condition in a sorted array",
    sampleTests: [
      { name: 'Valid: "A man, a plan, a canal: Panama"', input: ["A man, a plan, a canal: Panama"], expected: true },
      { name: 'Invalid: "race a car"', input: ["race a car"], expected: false },
    ],
    starterCode: "/**\n * @param {string} s\n * @return {boolean}\n */\nfunction isPalindrome(s) {\n  // Write your solution here\n}",
    hints: [
      "Use two pointers: one starting from the left, one from the right.",
      "Skip non-alphanumeric characters using regex or charCodeAt checks.",
      "Compare characters after converting to lowercase.",
    ],
    bruteForceSolution: {
      code: "function isPalindrome(s) {\n  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n  return cleaned === cleaned.split('').reverse().join('');\n}",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      explanation: "Clean the string, reverse it, compare. O(n) time but O(n) extra space for the reversed string.",
    },
    optimizedSolution: {
      code: "function isPalindrome(s) {\n  let left = 0, right = s.length - 1;\n  \n  while (left < right) {\n    while (left < right && !/[a-zA-Z0-9]/.test(s[left])) left++;\n    while (left < right && !/[a-zA-Z0-9]/.test(s[right])) right--;\n    \n    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;\n    left++;\n    right--;\n  }\n  \n  return true;\n}",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      explanation: "Two pointers from ends. Skip non-alphanumeric characters, compare the letters (case-insensitive), and move inward. No extra space needed.",
    },
    interviewExplanation: "**How to explain:**\n1. Start with the naive approach: clean, reverse, compare\n2. Note the O(n) space is not ideal\n3. Two-pointer approach: left and right moving inward, skipping non-alphanumeric characters\n4. Only O(1) extra space\n\n**Follow-ups:**\n• \"What if you need to find the longest palindromic substring?\" → Expand from center (O(n²))\n• \"What if the string is very long?\" → Two-pointer is already optimal\n• \"What about ignoring spaces only?\" → Adjust the skip condition",
    tests: [
      {
        name: "Valid palindrome with spaces and punctuation",
        validate: (code) => {
          try { return new Function(`${code}; return isPalindrome("A man, a plan, a canal: Panama");`)() === true; } catch { return false; }
        },
      },
      {
        name: "Invalid palindrome",
        validate: (code) => {
          try { return new Function(`${code}; return isPalindrome("race a car");`)() === false; } catch { return false; }
        },
      },
      {
        name: "Empty string",
        validate: (code) => {
          try { return new Function(`${code}; return isPalindrome(" ");`)() === true; } catch { return false; }
        },
      },
      {
        name: "Uses two pointers",
        validate: testContains("left") && testContains("right"),
      },
    ],
  },

  {
    id: "three-sum",
    number: 17,
    title: "3Sum",
    difficulty: "Medium",
    topics: ["two-pointers", "arrays"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Bloomberg", "Adobe"],
    acceptance: 35,
    xp: 30,
    problemStatement: "Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.",
    examples: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
      { input: "nums = [0,1,1]", output: "[]" },
      { input: "nums = [0,0,0]", output: "[[0,0,0]]" },
    ],
    constraints: ["3 ≤ nums.length ≤ 3000", "-10⁵ ≤ nums[i] ≤ 10⁵"],
    conceptOverview: "**Why this problem exists:**\n3Sum is a classic problem that extends the two-sum concept and tests your ability to avoid O(n³) solutions through sorting and two-pointer technique.\n\n**What it teaches:**\n• Sorting + two-pointer combination\n• Avoiding duplicate triplets\n• Reducing complexity from O(n³) to O(n²)\n\n**Interview relevance:**\nOne of the most frequently asked medium-difficulty problems. Tests combinatorial thinking and optimization.",
    patternRecognition: "**Pattern: Fixed + Two Pointers**\n\nFix one element with a loop, then use two pointers (left, right) on the remaining subarray to find pairs that sum to -(fixed value). Sort first to enable two-pointer search and duplicate handling.\n\n**When to use this pattern:**\n• Finding k-sum combinations\n• Any problem where sorting + two pointers can reduce complexity\n• Finding pairs that satisfy a condition",
    sampleTests: [
      { name: "Example 1", input: [[-1,0,1,2,-1,-4]], expected: [[-1,-1,2],[-1,0,1]] },
      { name: "All zeros", input: [[0,0,0]], expected: [[0,0,0]] },
    ],
    starterCode: "/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nfunction threeSum(nums) {\n  // Write your solution here\n}",
    hints: [
      "Sort the array first — enables two-pointer approach and duplicate handling.",
      "Fix one element, then use two pointers on the remaining elements to find pairs summing to -(fixed value).",
      "Skip duplicate values to avoid duplicate triplets in the result.",
    ],
    bruteForceSolution: {
      code: "function threeSum(nums) {\n  const result = [];\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      for (let k = j + 1; k < nums.length; k++) {\n        if (nums[i] + nums[j] + nums[k] === 0) {\n          result.push([nums[i], nums[j], nums[k]]);\n        }\n      }\n    }\n  }\n  return result;\n}",
      timeComplexity: "O(n³)",
      spaceComplexity: "O(n)",
      explanation: "Check every possible triplet — O(n³) time. Also includes duplicates.",
    },
    optimizedSolution: {
      code: "function threeSum(nums) {\n  nums.sort((a, b) => a - b);\n  const result = [];\n  \n  for (let i = 0; i < nums.length - 2; i++) {\n    if (i > 0 && nums[i] === nums[i - 1]) continue; // skip duplicates\n    \n    let left = i + 1, right = nums.length - 1;\n    \n    while (left < right) {\n      const sum = nums[i] + nums[left] + nums[right];\n      \n      if (sum === 0) {\n        result.push([nums[i], nums[left], nums[right]]);\n        while (left < right && nums[left] === nums[left + 1]) left++;\n        while (left < right && nums[right] === nums[right - 1]) right--;\n        left++;\n        right--;\n      } else if (sum < 0) {\n        left++;\n      } else {\n        right--;\n      }\n    }\n  }\n  \n  return result;\n}",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1) excluding output",
      explanation: "Sort the array (O(n log n)). Fix one element, then use two pointers on the remaining subarray. Skip duplicates to avoid repeat triplets. O(n²) total.",
    },
    interviewExplanation: "**How to explain:**\n1. Sort is essential for both two-pointer and duplicate handling\n2. Fix one element (skip duplicates). For each, use two pointers on the rest\n3. Move pointers based on sum: too low → left++, too high → right--\n4. Skip duplicates when found\n\n**Follow-ups:**\n• \"What about 3Sum closest?\" → Track the closest sum instead of exact match\n• \"What about 4Sum?\" → Add another nested loop (O(n³)) or use the same pattern recursively\n• \"What if the array is already sorted?\" → Skip the sorting step, O(n²) directly",
    tests: [
      {
        name: "Finds correct triplets",
        validate: (code) => {
          try {
            const fn = new Function(`${code}; return JSON.stringify(threeSum([-1,0,1,2,-1,-4]).sort());`)();
            return fn === JSON.stringify([[-1,-1,2],[-1,0,1]].sort());
          } catch { return false; }
        },
      },
      {
        name: "Returns empty for no triplets",
        validate: (code) => {
          try { return JSON.stringify(new Function(`${code}; return threeSum([0,1,1]);`)()) === "[]"; } catch { return false; }
        },
      },
      {
        name: "All zeros",
        validate: (code) => {
          try { return JSON.stringify(new Function(`${code}; return threeSum([0,0,0]);`)()) === "[[0,0,0]]"; } catch { return false; }
        },
      },
      {
        name: "Uses sorting and two pointers",
        validate: testContains("sort(") && testContains("left") && testContains("right"),
      },
    ],
  },

  // ═════════════════════════════════════════════════
  // SLIDING WINDOW
  // ═════════════════════════════════════════════════

  {
    id: "longest-substring-without-repeating",
    number: 18,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    topics: ["sliding-window", "hash-map"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Bloomberg", "Adobe", "Uber"],
    acceptance: 35,
    xp: 25,
    problemStatement: "Given a string `s`, find the length of the **longest substring** without repeating characters.",
    examples: [
      { input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: "1", explanation: 'The answer is "b", with the length of 1.' },
      { input: 's = "pwwkew"', output: "3", explanation: 'The answer is "wke", with the length of 3.' },
      { input: 's = ""', output: "0" },
    ],
    constraints: ["0 ≤ s.length ≤ 5 × 10⁴", "s consists of English letters, digits, symbols, and spaces."],
    conceptOverview: "**Why this problem exists:**\nThis is the quintessential sliding window problem. It teaches the expand-contract pattern for finding optimal subarrays/substrings.\n\n**What it teaches:**\n• Sliding window technique\n• Using a hash map/set to track window state\n• Expanding right bound, contracting left bound on conflict\n\n**Interview relevance:**\nThe most important sliding window problem. Master this to unlock all sliding window patterns.",
    patternRecognition: "**Pattern: Sliding Window**\n\nUse two pointers (left, right) to maintain a window. Expand the right pointer, and when a conflict (duplicate) is found, shrink from the left until resolved.\n\n**When to use this pattern:**\n• Finding optimal subarrays/substrings\n• Problems with constraints on window contents\n• Maximum/minimum window that satisfies a condition",
    sampleTests: [
      { name: 'Example 1: "abcabcbb"', input: ["abcabcbb"], expected: 3 },
      { name: 'Example 2: "bbbbb"', input: ["bbbbb"], expected: 1 },
    ],
    starterCode: "/**\n * @param {string} s\n * @return {number}\n */\nfunction lengthOfLongestSubstring(s) {\n  // Write your solution here\n}",
    hints: [
      "Use two pointers: left and right to maintain the current window.",
      "Use a Set or Map to track characters in the current window.",
      "When a duplicate is found, move left forward until the duplicate is removed.",
    ],
    bruteForceSolution: {
      code: "function lengthOfLongestSubstring(s) {\n  let maxLen = 0;\n  for (let i = 0; i < s.length; i++) {\n    const seen = new Set();\n    for (let j = i; j < s.length; j++) {\n      if (seen.has(s[j])) break;\n      seen.add(s[j]);\n      maxLen = Math.max(maxLen, j - i + 1);\n    }\n  }\n  return maxLen;\n}",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(min(m, n))",
      explanation: "Check every possible starting position and extend until a duplicate is found — O(n²) worst case.",
    },
    optimizedSolution: {
      code: "function lengthOfLongestSubstring(s) {\n  let left = 0, maxLen = 0;\n  const charMap = new Map();\n  \n  for (let right = 0; right < s.length; right++) {\n    const char = s[right];\n    \n    if (charMap.has(char) && charMap.get(char) >= left) {\n      left = charMap.get(char) + 1;\n    }\n    \n    charMap.set(char, right);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  \n  return maxLen;\n}",
      timeComplexity: "O(n)",
      spaceComplexity: "O(min(m, n))",
      explanation: "Sliding window with a hash map. Right pointer expands, left pointer jumps past the last occurrence of a duplicate char. O(n) — each character processed once.",
    },
    interviewExplanation: "**How to explain:**\n1. Brute force: check all substrings O(n²)\n2. Optimize with sliding window: maintain [left, right) with no repeats\n3. When right sees a duplicate in the window, jump left past the previous occurrence\n4. Use a hash map to store the last seen index of each character\n\n**Follow-ups:**\n• \"What about longest substring with at most k distinct characters?\" → Same sliding window, different shrink condition\n• \"What about longest substring with at least k repeating characters?\" → Divide and conquer with sliding window\n• \"What if you need to return the substring, not the length?\" → Track the maxLen start/end indices",
    tests: [
      {
        name: 'Finds correct length for "abcabcbb"',
        validate: (code) => {
          try { return new Function(`${code}; return lengthOfLongestSubstring("abcabcbb");`)() === 3; } catch { return false; }
        },
      },
      {
        name: 'Handles all same characters "bbbbb"',
        validate: (code) => {
          try { return new Function(`${code}; return lengthOfLongestSubstring("bbbbb");`)() === 1; } catch { return false; }
        },
      },
      {
        name: 'Handles empty string',
        validate: (code) => {
          try { return new Function(`${code}; return lengthOfLongestSubstring("");`)() === 0; } catch { return false; }
        },
      },
      {
        name: "Uses sliding window pattern",
        validate: testContains("left") && testContains("right"),
      },
    ],
  },

  // ═════════════════════════════════════════════════
  // DYNAMIC PROGRAMMING
  // ═════════════════════════════════════════════════

  {
    id: "climbing-stairs",
    number: 19,
    title: "Climbing Stairs",
    difficulty: "Easy",
    topics: ["dp"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Adobe"],
    acceptance: 72,
    xp: 10,
    problemStatement: "You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    examples: [
      { input: "n = 2", output: "2", explanation: "1. 1 step + 1 step, 2. 2 steps" },
      { input: "n = 3", output: "3", explanation: "1. 1+1+1, 2. 1+2, 3. 2+1" },
    ],
    constraints: ["1 ≤ n ≤ 45"],
    conceptOverview: "**Why this problem exists:**\nClimbing Stairs is the \"Hello World\" of dynamic programming. It teaches the fundamental DP concept of optimal substructure and overlapping subproblems.\n\n**What it teaches:**\n• Dynamic programming fundamentals\n• Fibonacci-like recurrence relation\n• Tabulation vs memoization\n• Space optimization\n\n**Interview relevance:**\nThe first DP problem most people learn. Master the thought process here for all DP problems.",
    patternRecognition: "**Pattern: Fibonacci DP**\n\nWhen a problem asks \"how many ways to reach a goal with a fixed set of moves\", the answer is often a Fibonacci-like recurrence: ways(n) = ways(n-1) + ways(n-2).\n\n**When to use this pattern:**\n• Counting ways to reach a target\n• Problems with 1 or 2-step moves\n• Grid path counting problems\n• Problems with simple recurrence relations",
    sampleTests: [
      { name: "n = 2", input: [2], expected: 2 },
      { name: "n = 3", input: [3], expected: 3 },
    ],
    starterCode: "/**\n * @param {number} n\n * @return {number}\n */\nfunction climbStairs(n) {\n  // Write your solution here\n}",
    hints: [
      "Think about how many ways there are to reach step i.",
      "The number of ways to reach step i equals ways to reach step i-1 (take 1 step) plus ways to reach step i-2 (take 2 steps).",
      "This is the Fibonacci sequence! Start with base cases: 1 way to reach step 1, 2 ways to reach step 2.",
    ],
    bruteForceSolution: {
      code: "function climbStairs(n) {\n  if (n <= 1) return 1;\n  if (n === 2) return 2;\n  return climbStairs(n - 1) + climbStairs(n - 2);\n}",
      timeComplexity: "O(2ⁿ)",
      spaceComplexity: "O(n)",
      explanation: "Pure recursion — exponential due to repeated calculations. Visualize the recursion tree.",
    },
    optimizedSolution: {
      code: "function climbStairs(n) {\n  if (n <= 2) return n;\n  let oneStepBefore = 2;\n  let twoStepsBefore = 1;\n  let allWays = 0;\n  \n  for (let i = 3; i <= n; i++) {\n    allWays = oneStepBefore + twoStepsBefore;\n    twoStepsBefore = oneStepBefore;\n    oneStepBefore = allWays;\n  }\n  \n  return allWays;\n}",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      explanation: "Bottom-up DP with O(1) space using two variables. ways[i] = ways[i-1] + ways[i-2]. Iterate from 3 to n, keeping only the last two values.",
    },
    interviewExplanation: "**How to explain:**\n1. Think in terms of \"how many ways to reach step k\"\n2. At step k, you could have come from step k-1 (1 step) or step k-2 (2 steps)\n3. So ways(k) = ways(k-1) + ways(k-2)\n4. Base: 1 way for step 1, 2 ways for step 2\n5. Recognize this as Fibonacci\n\n**Follow-ups:**\n• \"What if you can take 1, 2, or 3 steps?\" → ways(n) = ways(n-1) + ways(n-2) + ways(n-3)\n• \"What if certain steps are broken?\" → Skip those steps by setting ways(broken) = 0\n• \"Minimum cost to climb stairs?\" → Each step has a cost, find min cost path (another classic DP)",
    tests: [
      {
        name: "Returns 2 for n=2",
        validate: (code) => {
          try { return new Function(`${code}; return climbStairs(2);`)() === 2; } catch { return false; }
        },
      },
      {
        name: "Returns 3 for n=3",
        validate: (code) => {
          try { return new Function(`${code}; return climbStairs(3);`)() === 3; } catch { return false; }
        },
      },
      {
        name: "Returns 5 for n=4",
        validate: (code) => {
          try { return new Function(`${code}; return climbStairs(4);`)() === 5; } catch { return false; }
        },
      },
    ],
  },

  {
    id: "coin-change",
    number: 20,
    title: "Coin Change",
    difficulty: "Medium",
    topics: ["dp"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Bloomberg", "Uber"],
    acceptance: 42,
    xp: 30,
    problemStatement: "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the **fewest number of coins** that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.\n\nYou may assume that you have an infinite number of each kind of coin.",
    examples: [
      { input: "coins = [1,2,5], amount = 11", output: "3", explanation: "11 = 5 + 5 + 1" },
      { input: "coins = [2], amount = 3", output: "-1" },
      { input: "coins = [1], amount = 0", output: "0" },
    ],
    constraints: ["1 ≤ coins.length ≤ 12", "1 ≤ coins[i] ≤ 2³¹ - 1", "0 ≤ amount ≤ 10⁴"],
    conceptOverview: "**Why this problem exists:**\nCoin Change is the classic unbounded knapsack problem. It tests your ability to solve optimization problems with overlapping subproblems.\n\n**What it teaches:**\n• Unbounded knapsack pattern\n• DP with 1D array optimization\n• Infinite supply of items\n• Handling unreachable states\n\n**Interview relevance:**\nOne of the most important DP problems. The pattern appears in many variations (minimum/maximum ways, combination sum).",
    patternRecognition: "**Pattern: Unbounded Knapsack**\n\nWhen you can use unlimited copies of each item, the DP array is filled from left to right (so each coin can be reused). dp[i] = min(dp[i], dp[i - coin] + 1).\n\n**When to use this pattern:**\n• Minimum coins to make an amount\n• Number of ways to make change (combination sum)\n• Problems with unlimited item usage\n• Unbounded knapsack problems",
    sampleTests: [
      { name: "Example 1", input: [[1,2,5], 11], expected: 3 },
      { name: "Example 2: impossible", input: [[2], 3], expected: -1 },
    ],
    starterCode: "/**\n * @param {number[]} coins\n * @param {number} amount\n * @return {number}\n */\nfunction coinChange(coins, amount) {\n  // Write your solution here\n}",
    hints: [
      "Use a DP array where dp[i] = minimum coins needed to make amount i.",
      "Initialize dp[0] = 0 and all others to Infinity (or a large number).",
      "For each coin, for each amount from coin to target, update: dp[i] = min(dp[i], dp[i - coin] + 1).",
    ],
    bruteForceSolution: {
      code: "function coinChange(coins, amount) {\n  if (amount === 0) return 0;\n  let minCoins = Infinity;\n  for (const coin of coins) {\n    if (amount >= coin) {\n      const result = coinChange(coins, amount - coin);\n      if (result !== -1) minCoins = Math.min(minCoins, result + 1);\n    }\n  }\n  return minCoins === Infinity ? -1 : minCoins;\n}",
      timeComplexity: "O(coins.length ^ amount)",
      spaceComplexity: "O(amount)",
      explanation: "Pure recursion — extremely slow due to exponential branching and repeated subproblems.",
    },
    optimizedSolution: {
      code: "function coinChange(coins, amount) {\n  const dp = new Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  \n  for (const coin of coins) {\n    for (let i = coin; i <= amount; i++) {\n      dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n    }\n  }\n  \n  return dp[amount] === Infinity ? -1 : dp[amount];\n}",
      timeComplexity: "O(coins.length × amount)",
      spaceComplexity: "O(amount)",
      explanation: "Bottom-up DP with 1D array. For each coin, iterate through all amounts from coin to target. dp[i] represents the minimum coins needed to make amount i. Initialize with Infinity, dp[0] = 0.",
    },
    interviewExplanation: "**How to explain:**\n1. Start with brute force recursion — show the exponential explosion\n2. Identify overlapping subproblems: making amount 6 with [1,2,5] recalculates subproblems many times\n3. Introduce DP: dp[i] = minimum coins for amount i\n4. For each coin, try using it: dp[i] = min(dp[i], dp[i - coin] + 1)\n5. Iterate coins outer loop (unbounded knapsack pattern — allows reuse)\n\n**Follow-ups:**\n• \"What if each coin can only be used once?\" → Iterate amount from largest to smallest (0/1 knapsack)\n• \"What if you need the number of ways instead of minimum?\" → dp[i] += dp[i - coin] (combination sum)\n• \"What if coins have different values and you want to minimize the number of coins with limited supply?\" → Bounded knapsack variation",
    tests: [
      {
        name: "Returns 3 for [1,2,5], amount=11",
        validate: (code) => {
          try { return new Function(`${code}; return coinChange([1,2,5], 11);`)() === 3; } catch { return false; }
        },
      },
      {
        name: "Returns -1 for impossible amount",
        validate: (code) => {
          try { return new Function(`${code}; return coinChange([2], 3);`)() === -1; } catch { return false; }
        },
      },
      {
        name: "Returns 0 for amount=0",
        validate: (code) => {
          try { return new Function(`${code}; return coinChange([1], 0);`)() === 0; } catch { return false; }
        },
      },
      {
        name: "Uses DP array",
        validate: testContains("dp["),
      },
    ],
  },
  {
    id: "lru-cache",
    number: 15,
    title: "LRU Cache",
    difficulty: "Medium",
    topics: ["hash-map", "linked-list"],
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Bloomberg"],
    acceptance: 42,
    xp: 30,
    problemStatement: "Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.\n\nImplement the `LRUCache` class:\n- `LRUCache(capacity)` Initialize the LRU cache with positive size `capacity`.\n- `get(key)` Return the value of the `key` if the `key` exists, otherwise return `-1`.\n- `put(key, value)` Update the value of the `key` if the `key` exists. Otherwise, add the `key-value` pair to the cache. If the number of keys exceeds the `capacity` from this operation, **evict the least recently used key**.\n\nThe functions `get` and `put` must each run in **O(1)** average time complexity.",
    examples: [
      {
        input: "LRUCache cache = new LRUCache(2);\ncache.put(1, 1);\ncache.put(2, 2);\ncache.get(1);       // returns 1\ncache.put(3, 3);       // evicts key 2\ncache.get(2);       // returns -1",
        output: "1, -1"
      }
    ],
    constraints: [
      "1 <= capacity <= 3000",
      "0 <= key <= 10^4",
      "0 <= value <= 10^5",
      "At most 2 * 10^5 calls will be made to get and put."
    ],
    conceptOverview: "LRU Cache tests your capacity to combine a Hash Map (for O(1) key lookup) and a Doubly Linked List (for O(1) access-priority updates/eviction).",
    patternRecognition: "**Pattern: Hash Map + Doubly Linked List**\n\nWhen you need O(1) lookups combined with O(1) removals/inserts at arbitrary locations, look up elements using a Hash Map pointing to Doubly Linked List nodes.",
    sampleTests: [
      {
        name: "Basic Operations",
        input: [],
        expected: []
      }
    ],
    starterCode: "class LRUCache {\n  /**\n   * @param {number} capacity\n   */\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map();\n  }\n\n  /**\n   * @param {number} key\n   * @return {number}\n   */\n  get(key) {\n    if (!this.cache.has(key)) return -1;\n    const value = this.cache.get(key);\n    this.cache.delete(key);\n    this.cache.set(key, value);\n    return value;\n  }\n\n  /**\n   * @param {number} key\n   * @param {number} value\n   * @return {void}\n   */\n  put(key, value) {\n    if (this.cache.has(key)) {\n      this.cache.delete(key);\n    } else if (this.cache.size >= this.capacity) {\n      const lruKey = this.cache.keys().next().value;\n      this.cache.delete(lruKey);\n    }\n    this.cache.set(key, value);\n  }\n}",
    hints: [
      "Map in JavaScript maintains insertion order. Setting an existing key doesn't move it, but deleting and re-setting it does.",
      "To evict the LRU item, find the first key in the Map using `map.keys().next().value`.",
      "Ensure all operations take O(1) time."
    ],
    bruteForceSolution: {
      code: "class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = {};\n    this.timestamps = [];\n  }\n  get(key) { /* scans array */ }\n}",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      explanation: "Store items in an object and keep a separate array of keys sorted by usage timestamp. get() scans and moves items in the array."
    },
    optimizedSolution: {
      code: "class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map();\n  }\n  get(key) {\n    if (!this.cache.has(key)) return -1;\n    const val = this.cache.get(key);\n    this.cache.delete(key);\n    this.cache.set(key, val);\n    return val;\n  }\n  put(key, value) {\n    if (this.cache.has(key)) { this.cache.delete(key); }\n    else if (this.cache.size >= this.capacity) {\n      const firstKey = this.cache.keys().next().value;\n      this.cache.delete(firstKey);\n    }\n    this.cache.set(key, value);\n  }\n}",
      timeComplexity: "O(1)",
      spaceComplexity: "O(n)",
      explanation: "Using JavaScript's ordered Map to track usage in O(1) time."
    },
    interviewExplanation: "1. Focus on O(1) timing constraints.\n2. Detail the Map + Doubly Linked List approach.\n3. Demonstrate how map re-inserts manage the priority queue.",
    tests: [
      {
        name: "Basic Put and Get",
        validate: (code) => {
          try {
            const fn = new Function(`${code};\nconst c = new LRUCache(2);\nc.put(1, 10);\nc.put(2, 20);\nreturn c.get(1);`)();
            return fn === 10;
          } catch { return false; }
        }
      },
      {
        name: "Evicts Least Recently Used key",
        validate: (code) => {
          try {
            const fn = new Function(`${code};\nconst c = new LRUCache(2);\nc.put(1, 10);\nc.put(2, 20);\nc.get(1);\nc.put(3, 30);\nconst r1 = c.get(2);\nconst r2 = c.get(1);\nreturn JSON.stringify({ r1, r2 });`)();
            return fn === JSON.stringify({ r1: -1, r2: 10 });
          } catch { return false; }
        }
      },
      {
        name: "Handles existing key updates",
        validate: (code) => {
          try {
            const fn = new Function(`${code};\nconst c = new LRUCache(2);\nc.put(1, 10);\nc.put(1, 100);\nreturn c.get(1);`)();
            return fn === 100;
          } catch { return false; }
        }
      }
    ]
  },
  {
    id: "valid-sudoku",
    number: 16,
    title: "Valid Sudoku",
    difficulty: "Medium",
    topics: ["arrays", "hash-map"],
    companies: ["Google", "Amazon", "Meta", "Microsoft"],
    acceptance: 57,
    xp: 20,
    problemStatement: "Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:\n1. Each row must contain the digits `1-9` without repetition.\n2. Each column must contain the digits `1-9` without repetition.\n3. Each of the nine `3 x 3` sub-boxes of the grid must contain the digits `1-9` without repetition.\n\nNote:\n- A Sudoku board (partially filled) could be valid but is not necessarily solvable.\n- Only the filled cells need to be validated according to the mentioned rules.",
    examples: [
      {
        input: 'board = [["5","3",".",".","7",".",".",".","."],[...]]',
        output: "true"
      }
    ],
    constraints: [
      "board.length == 9",
      "board[i].length == 9",
      "board[i][j] is a digit '1-9' or '.'"
    ],
    conceptOverview: "Valid Sudoku checks your ability to use Sets and String keys to validate multidimensional row, column, and box constraints in a single pass.",
    patternRecognition: "**Pattern: Constraint Hashing**\n\nWhen verifying uniqueness across multiple overlapping groups (like rows, cols, and cells), map each item to distinct hashed identifier strings inside a Set.",
    sampleTests: [],
    starterCode: "/**\n * @param {character[][]} board\n * @return {boolean}\n */\nfunction isValidSudoku(board) {\n  // Write your solution here\n}",
    hints: [
      "Separate validations for rows, columns, and 3x3 grids.",
      "For 3x3 boxes, map rows and columns using Math.floor(r/3) and Math.floor(c/3).",
      "A single Set with string keys like `row:i:val`, `col:j:val`, and `box:r-c:val` works in one pass."
    ],
    bruteForceSolution: {
      code: "function isValidSudoku(board) { /* validates row by row, then col by col... */ }",
      timeComplexity: "O(1) - fixed 9x9 size",
      spaceComplexity: "O(1)",
      explanation: "Run three separate loops: one verifying rows, one columns, and one box grids."
    },
    optimizedSolution: {
      code: "function isValidSudoku(board) {\n  const seen = new Set();\n  for (let r = 0; r < 9; r++) {\n    for (let c = 0; c < 9; c++) {\n      const val = board[r][c];\n      if (val === '.') continue;\n      const boxRow = Math.floor(r / 3);\n      const boxCol = Math.floor(c / 3);\n      const rKey = `row:${r}:${val}`;\n      const cKey = `col:${c}:${val}`;\n      const bKey = `box:${boxRow}-${boxCol}:${val}`;\n      if (seen.has(rKey) || seen.has(cKey) || seen.has(bKey)) return false;\n      seen.add(rKey); seen.add(cKey); seen.add(bKey);\n    }\n  }\n  return true;\n}",
      timeComplexity: "O(1) - constant grid operations",
      spaceComplexity: "O(1) - constant space limit",
      explanation: "Single pass validation using string-encoded constraints mapped into a single Set."
    },
    interviewExplanation: "1. Outline row, column, and box constraints.\n2. Detail Math.floor(r/3) mapping to group cells into sub-boxes.\n3. Show how string formatting checks unique constraints.",
    tests: [
      {
        name: "Validates correct sudoku board",
        validate: (code) => {
          const b = [
            ["5","3",".",".","7",".",".",".","."],
            ["6",".",".","1","9","5",".",".","."],
            [".","9","8",".",".",".",".","6","."],
            ["8",".",".",".","6",".",".",".","3"],
            ["4",".",".","8",".","3",".",".","1"],
            ["7",".",".",".","2",".",".",".","6"],
            [".","6",".",".",".",".","2","8","."],
            [".",".",".","4","1","9",".",".","5"],
            [".",".",".",".","8",".",".","7","9"]
          ];
          try {
            return new Function(`${code};\nreturn isValidSudoku(${JSON.stringify(b)});`)() === true;
          } catch { return false; }
        }
      },
      {
        name: "Detects duplicate values in rows",
        validate: (code) => {
          const b = [
            ["8","3",".",".","7",".",".",".","."],
            ["6",".",".","1","9","5",".",".","."],
            [".","9","8",".",".",".",".","6","."],
            ["8",".",".",".","6",".",".",".","3"],
            ["4",".",".","8",".","3",".",".","1"],
            ["7",".",".",".","2",".",".",".","6"],
            [".","6",".",".",".",".","2","8","."],
            [".",".",".","4","1","9",".",".","5"],
            [".",".",".",".","8",".",".","7","9"]
          ];
          try {
            return new Function(`${code};\nreturn isValidSudoku(${JSON.stringify(b)});`)() === false;
          } catch { return false; }
        }
      }
    ]
  }
];

// ─── HELPERS ───

export function getTopicsWithCounts() {
  const counts = {};
  for (const problem of DSA_PROBLEMS) {
    for (const topicId of problem.topics) {
      counts[topicId] = (counts[topicId] || 0) + 1;
    }
  }
  return DSA_TOPICS.map(t => ({ ...t, count: counts[t.id] || 0 }));
}

export function getProblemsByTopic(topicId) {
  if (!topicId || topicId === "all") return DSA_PROBLEMS;
  return DSA_PROBLEMS.filter(p => p.topics.includes(topicId));
}

export function getProblemById(id) {
  return DSA_PROBLEMS.find(p => p.id === id);
}

export function getProblemsByCompany(company) {
  return DSA_PROBLEMS.filter(p => p.companies.includes(company));
}
