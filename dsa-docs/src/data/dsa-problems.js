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
    sampleTests: [],
    starterCode: "/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nfunction reverseList(head) {\n}",
    hints: ["Use three pointers: prev, curr, nextTemp.", "Save the next node before redirecting.", "Return prev as the new head."],
    bruteForceSolution: { code: "// Iterative is optimal", timeComplexity: "O(n)", spaceComplexity: "O(1)", explanation: "The standard iterative approach." },
    optimizedSolution: { code: "function reverseList(head) {\n  let prev = null, curr = head;\n  while (curr !== null) {\n    const nextTemp = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = nextTemp;\n  }\n  return prev;\n}", timeComplexity: "O(n)", spaceComplexity: "O(1)", explanation: "Three-pointer iterative reversal." },
    interviewExplanation: "1. Draw a simple list and show pointer reversal\n2. Explain prev, curr, nextTemp\n3. Walk through one iteration",
    tests: [
      { name: "Reverses list", validate: (code) => { try { const fn = new Function(`function ListNode(v,n){this.val=v;this.next=n||null}\n${code}; function toArray(h) { const a=[]; let c=h; while(c){a.push(c.val);c=c.next} return a; } function fromArray(arr) { if(!arr.length) return null; const h=new ListNode(arr[0]); let c=h; for(let i=1;i<arr.length;i++){c.next=new ListNode(arr[i]);c=c.next} return h; } return JSON.stringify(toArray(reverseList(fromArray([1,2,3,4,5]))));`)(); return fn === JSON.stringify([5,4,3,2,1]); } catch { return false; } } },
      { name: "Handles single node", validate: (code) => { try { const fn = new Function(`function ListNode(v,n){this.val=v;this.next=n||null}\n${code}; const h=new ListNode(1); const r=reverseList(h); return r?r.val:null;`)(); return fn === 1; } catch { return false; } } },
    ],
  },
  {
    id: "merge-two-sorted-lists", number: 7, title: "Merge Two Sorted Lists", difficulty: "Easy",
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
    sampleTests: [],
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
    id: "binary-search", number: 27, title: "Binary Search", difficulty: "Easy",
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
    ],
  },
  {
    id: "search-rotated-array", number: 35, title: "Search in Rotated Sorted Array", difficulty: "Medium",
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
    ],
  },
  {
    id: "maximum-depth-of-binary-tree", number: 8, title: "Maximum Depth of Binary Tree", difficulty: "Easy",
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
    sampleTests: [],
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
    id: "invert-binary-tree", number: 9, title: "Invert Binary Tree", difficulty: "Easy",
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
    sampleTests: [],
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
    id: "number-of-islands", number: 10, title: "Number of Islands", difficulty: "Medium",
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
    id: "clone-graph", number: 11, title: "Clone Graph", difficulty: "Medium",
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
    sampleTests: [],
    starterCode: "/**\n * @param {Node} node\n * @return {Node}\n */\nfunction cloneGraph(node) {\n}",
    hints: ["Use a hash map for cloned nodes.", "If a node is already cloned, return the clone (handles cycles).", "Recursively clone neighbors."],
    bruteForceSolution: { code: "// Must traverse graph, no brute force", timeComplexity: "O(V+E)", spaceComplexity: "O(V)", explanation: "DFS with visited map." },
    optimizedSolution: { code: "function cloneGraph(node) {\n  if (!node) return null;\n  const visited = new Map();\n  function dfs(node) {\n    if (visited.has(node)) return visited.get(node);\n    const clone = new Node(node.val);\n    visited.set(node, clone);\n    for (const neighbor of node.neighbors) {\n      clone.neighbors.push(dfs(neighbor));\n    }\n    return clone;\n  }\n  return dfs(node);\n}", timeComplexity: "O(V+E)", spaceComplexity: "O(V)", explanation: "DFS with a visited map to handle cycles." },
    interviewExplanation: "1. Cycles make naive recursion infinite loop\n2. Use hash map: original → clone\n3. Check map before recursing on neighbors",
    tests: [
      { name: "Clones single node", validate: (code) => { try { return new Function(`${code}; function Node(v,n){this.val=v;this.neighbors=n||[]} const o=new Node(1); const c=cloneGraph(o); return c!==null && c.val===1 && c!==o;`)() === true; } catch { return false; } } },
      { name: "Returns null", validate: (code) => { try { return new Function(`${code}; return cloneGraph(null);`)() === null; } catch { return false; } } },
      {
        name: "Handles cycles",
        validate: (code) => {
          try {
            return new Function(`${code}
function Node(v,n){this.val=v;this.neighbors=n||[]}
const n1 = new Node(1);
const n2 = new Node(2);
n1.neighbors.push(n2);
n2.neighbors.push(n1);
const c1 = cloneGraph(n1);
return c1 !== null && c1 !== n1 && c1.val === 1 && c1.neighbors.length === 1 &&
  c1.neighbors[0].val === 2 && c1.neighbors[0] !== n2 &&
  c1.neighbors[0].neighbors.length === 1 && c1.neighbors[0].neighbors[0] === c1;
`)() === true;
          } catch { return false; }
        },
      },
    ],
  },

  // ═════════════════════════════════════════════════
  // STACK
  // ═════════════════════════════════════════════════

  {
    id: "min-stack",
    number: 12,
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
    sampleTests: [],
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
        name: "getMin stays correct after popping through duplicate minimums",
        validate: (code) => {
          try {
            const fn = new Function(`${code}
const ms = new MinStack();
ms.push(5); ms.push(3); ms.push(3); ms.push(7); ms.push(2);
const g1 = ms.getMin();
ms.pop();
const g2 = ms.getMin();
ms.pop();
const g3 = ms.getMin();
const t1 = ms.top();
ms.pop();
const g4 = ms.getMin();
ms.pop();
const g5 = ms.getMin();
const t2 = ms.top();
return JSON.stringify({ g1, g2, g3, t1, g4, g5, t2 });
`)();
            return fn === JSON.stringify({ g1: 2, g2: 3, g3: 3, t1: 3, g4: 3, g5: 5, t2: 5 });
          } catch { return false; }
        },
      },
    ],
  },

  {
    id: "daily-temperatures",
    number: 13,
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
    ],
  },

  // ═════════════════════════════════════════════════
  // QUEUE
  // ═════════════════════════════════════════════════

  {
    id: "implement-queue-using-stacks",
    number: 14,
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
    sampleTests: [],
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
        name: "Handles interleaved push/pop across stack transfers",
        validate: (code) => {
          try {
            const fn = new Function(`${code}
const q = new MyQueue();
q.push(1); q.push(2); q.push(3);
const peek1 = q.peek();
const pop1 = q.pop();
q.push(4);
const pop2 = q.pop();
const pop3 = q.pop();
const peek2 = q.peek();
const empty1 = q.empty();
const pop4 = q.pop();
const empty2 = q.empty();
return JSON.stringify({ peek1, pop1, pop2, pop3, peek2, empty1, pop4, empty2 });
`)();
            return fn === JSON.stringify({ peek1: 1, pop1: 1, pop2: 2, pop3: 3, peek2: 4, empty1: false, pop4: 4, empty2: true });
          } catch { return false; }
        },
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
    ],
  },

  {
    id: "three-sum",
    number: 18,
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
      code: "function threeSum(nums) {\n  const result = [];\n  const seen = new Set();\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      for (let k = j + 1; k < nums.length; k++) {\n        if (nums[i] + nums[j] + nums[k] === 0) {\n          const triplet = [nums[i], nums[j], nums[k]].sort((a, b) => a - b);\n          const key = triplet.join(',');\n          if (!seen.has(key)) {\n            seen.add(key);\n            result.push(triplet);\n          }\n        }\n      }\n    }\n  }\n  return result;\n}",
      timeComplexity: "O(n³)",
      spaceComplexity: "O(n)",
      explanation: "Check every possible triplet — O(n³) time. Dedupe via a Set of sorted-triplet keys, since the same value combination can be found through different index triples.",
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
    ],
  },

  // ═════════════════════════════════════════════════
  // SLIDING WINDOW
  // ═════════════════════════════════════════════════

  {
    id: "longest-substring-without-repeating",
    number: 19,
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
    ],
  },

  // ═════════════════════════════════════════════════
  // DYNAMIC PROGRAMMING
  // ═════════════════════════════════════════════════

  {
    id: "climbing-stairs",
    number: 20,
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
    number: 21,
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
    sampleTests: [],
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
    number: 17,
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
  },
  {
    id: "valid-anagram", number: 22, title: "Valid Anagram", difficulty: "Easy",
    topics: ["arrays", "hash-map"],
    companies: ["Amazon", "Bloomberg", "Microsoft", "Google"],
    acceptance: 63, xp: 10,
    problemStatement: "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.\n\nAn anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: "true" },
      { input: 's = "rat", t = "car"', output: "false" },
    ],
    constraints: ["1 ≤ s.length, t.length ≤ 5 × 10⁴", "s and t consist of lowercase English letters"],
    conceptOverview: "Valid Anagram tests your ability to compare character frequencies efficiently using a hash map or fixed-size counting array.",
    patternRecognition: "**Pattern: Frequency Counting**\n\nWhen comparing whether two collections contain the same elements (ignoring order), count occurrences of each element and compare the counts.",
    sampleTests: [
      { name: 'Example 1: "anagram"/"nagaram"', input: ["anagram", "nagaram"], expected: true },
      { name: 'Example 2: "rat"/"car"', input: ["rat", "car"], expected: false },
    ],
    starterCode: "/**\n * @param {string} s\n * @param {string} t\n * @return {boolean}\n */\nfunction isAnagram(s, t) {\n  // Write your solution here\n}",
    hints: ["If the lengths differ, they can't be anagrams.", "Count the frequency of each character in both strings.", "A hash map or a 26-element array works well for lowercase letters."],
    bruteForceSolution: { code: "function isAnagram(s, t) {\n  return s.split('').sort().join('') === t.split('').sort().join('');\n}", timeComplexity: "O(n log n)", spaceComplexity: "O(n)", explanation: "Sort both strings and compare." },
    optimizedSolution: { code: "function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  const counts = new Map();\n  for (const c of s) counts.set(c, (counts.get(c) || 0) + 1);\n  for (const c of t) {\n    if (!counts.get(c)) return false;\n    counts.set(c, counts.get(c) - 1);\n  }\n  return true;\n}", timeComplexity: "O(n)", spaceComplexity: "O(1)", explanation: "Count characters in one pass, decrement in the other." },
    interviewExplanation: "**How to explain:**\n1. Start with sorting-based comparison\n2. Point out sorting costs O(n log n)\n3. Move to frequency counting with a hash map for O(n)\n4. Early exit on length mismatch",
    tests: [
      { name: "Detects valid anagram", validate: (code) => { try { return new Function(`${code}; return isAnagram("anagram", "nagaram");`)() === true; } catch { return false; } } },
      { name: "Detects non-anagram", validate: (code) => { try { return new Function(`${code}; return isAnagram("rat", "car");`)() === false; } catch { return false; } } },
    ],
  },
  {
    id: "group-anagrams", number: 23, title: "Group Anagrams", difficulty: "Medium",
    topics: ["arrays", "hash-map", "sorting"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Bloomberg", "Uber"],
    acceptance: 55, xp: 20,
    problemStatement: "Given an array of strings `strs`, group the **anagrams** together. You can return the answer in **any order**.",
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: 'strs = [""]', output: '[[""]]' },
    ],
    constraints: ["1 ≤ strs.length ≤ 10⁴", "0 ≤ strs[i].length ≤ 100", "strs[i] consists of lowercase English letters only"],
    conceptOverview: "Group Anagrams builds on Valid Anagram by using a canonical signature (sorted string) as a hash map key to bucket similar strings together.",
    patternRecognition: "**Pattern: Canonical Key Hashing**\n\nWhen grouping items that are equivalent under some transformation, map each item to a canonical form and use it as a hash map key.",
    sampleTests: [],
    starterCode: "/**\n * @param {string[]} strs\n * @return {string[][]}\n */\nfunction groupAnagrams(strs) {\n  // Write your solution here\n}",
    hints: ["Two strings are anagrams if their sorted forms match.", "Use the sorted string as a hash map key.", "Group original strings under their canonical key."],
    bruteForceSolution: { code: "function groupAnagrams(strs) {\n  const groups = [];\n  const used = new Array(strs.length).fill(false);\n  for (let i = 0; i < strs.length; i++) {\n    if (used[i]) continue;\n    const group = [strs[i]];\n    used[i] = true;\n    for (let j = i + 1; j < strs.length; j++) {\n      if (!used[j] && [...strs[i]].sort().join('') === [...strs[j]].sort().join('')) {\n        group.push(strs[j]);\n        used[j] = true;\n      }\n    }\n    groups.push(group);\n  }\n  return groups;\n}", timeComplexity: "O(n² k log k)", spaceComplexity: "O(n k)", explanation: "Compare every pair of strings by their sorted form." },
    optimizedSolution: { code: "function groupAnagrams(strs) {\n  const map = new Map();\n  for (const s of strs) {\n    const key = [...s].sort().join('');\n    if (!map.has(key)) map.set(key, []);\n    map.get(key).push(s);\n  }\n  return [...map.values()];\n}", timeComplexity: "O(n k log k)", spaceComplexity: "O(n k)", explanation: "Hash map keyed by sorted string signature." },
    interviewExplanation: "1. Recognize anagrams share a sorted form\n2. Use the sorted string as a hash map key\n3. Explain the O(n k log k) cost of sorting each string\n4. Mention the 26-count array as a faster key alternative",
    tests: [
      { name: "Groups anagrams correctly", validate: (code) => { try { const r = new Function(`${code}; return groupAnagrams(["eat","tea","tan","ate","nat","bat"]).map(g => g.slice().sort()).sort((a,b)=>a.length-b.length || a.join().localeCompare(b.join()));`)(); return JSON.stringify(r) === JSON.stringify([["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]); } catch { return false; } } },
      { name: "Handles empty strings", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return groupAnagrams([""]);`)()) === JSON.stringify([[""]]); } catch { return false; } } },
    ],
  },
  {
    id: "product-of-array-except-self", number: 24, title: "Product of Array Except Self", difficulty: "Medium",
    topics: ["arrays"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Bloomberg", "Adobe"],
    acceptance: 65, xp: 20,
    problemStatement: "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nYou must solve it **without division** and in **O(n)** time.",
    examples: [
      { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
      { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" },
    ],
    constraints: ["2 ≤ nums.length ≤ 10⁵", "-30 ≤ nums[i] ≤ 30"],
    conceptOverview: "Product of Array Except Self tests prefix/suffix product techniques to avoid division while staying at O(n) time.",
    patternRecognition: "**Pattern: Prefix/Suffix Accumulation**\n\nWhen each result depends on everything except the current element, compute a running product from the left, then a running product from the right, and combine.",
    sampleTests: [
      { name: "Example 1", input: [[1, 2, 3, 4]], expected: [24, 12, 8, 6] },
      { name: "Example with zero", input: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0] },
    ],
    starterCode: "/**\n * @param {number[]} nums\n * @return {number[]}\n */\nfunction productExceptSelf(nums) {\n  // Write your solution here\n}",
    hints: ["Compute the product of all elements to the left of each index.", "Compute the product of all elements to the right of each index.", "Multiply the two together for the final answer, without using division."],
    bruteForceSolution: { code: "function productExceptSelf(nums) {\n  return nums.map((_, i) => nums.reduce((p, n, j) => i === j ? p : p * n, 1));\n}", timeComplexity: "O(n²)", spaceComplexity: "O(n)", explanation: "Recompute the product for every index." },
    optimizedSolution: { code: "function productExceptSelf(nums) {\n  const n = nums.length;\n  const answer = new Array(n).fill(1);\n  let prefix = 1;\n  for (let i = 0; i < n; i++) {\n    answer[i] = prefix;\n    prefix *= nums[i];\n  }\n  let suffix = 1;\n  for (let i = n - 1; i >= 0; i--) {\n    answer[i] *= suffix;\n    suffix *= nums[i];\n  }\n  return answer;\n}", timeComplexity: "O(n)", spaceComplexity: "O(1) excluding output", explanation: "Two passes accumulating prefix and suffix products." },
    interviewExplanation: "1. Note division would be simplest but is disallowed (and breaks with zeros)\n2. Build prefix products left to right\n3. Build suffix products right to left, multiplying into the same array\n4. Discuss O(1) extra space excluding the output array",
    tests: [
      { name: "Returns correct products", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return productExceptSelf([1,2,3,4]);`)()) === JSON.stringify([24, 12, 8, 6]); } catch { return false; } } },
      { name: "Handles zero in array", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return productExceptSelf([-1,1,0,-3,3]);`)()) === JSON.stringify([0, 0, 9, 0, 0]); } catch { return false; } } },
    ],
  },
  {
    id: "top-k-frequent-elements", number: 25, title: "Top K Frequent Elements", difficulty: "Medium",
    compareMode: "unordered",
    topics: ["arrays", "hash-map", "heap", "sorting"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Yahoo"],
    acceptance: 62, xp: 25,
    problemStatement: "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in **any order**.\n\nIt is guaranteed that the answer is unique.",
    examples: [
      { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
      { input: "nums = [1], k = 1", output: "[1]" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴", "k is in the range [1, number of distinct elements in nums]"],
    conceptOverview: "Top K Frequent Elements tests your ability to combine hash maps with bucket sort or a heap to avoid a full O(n log n) sort.",
    patternRecognition: "**Pattern: Bucket Sort by Frequency**\n\nWhen you need the top-k elements by frequency and full sorting is too slow, count frequencies then bucket elements by their frequency (bounded by array length) to collect answers in O(n).",
    sampleTests: [
      { name: "Example 1", input: [[1, 1, 1, 2, 2, 3], 2], expected: [1, 2] },
      { name: "Example 2", input: [[1], 1], expected: [1] },
    ],
    starterCode: "/**\n * @param {number[]} nums\n * @param {number} k\n * @return {number[]}\n */\nfunction topKFrequent(nums, k) {\n  // Write your solution here\n}",
    hints: ["Count the frequency of each number first.", "Instead of sorting by frequency, bucket numbers by their frequency count.", "Walk the buckets from highest frequency down until you collect k numbers."],
    bruteForceSolution: { code: "function topKFrequent(nums, k) {\n  const counts = new Map();\n  for (const n of nums) counts.set(n, (counts.get(n) || 0) + 1);\n  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, k).map(e => e[0]);\n}", timeComplexity: "O(n log n)", spaceComplexity: "O(n)", explanation: "Count frequencies, then sort by frequency." },
    optimizedSolution: { code: "function topKFrequent(nums, k) {\n  const counts = new Map();\n  for (const n of nums) counts.set(n, (counts.get(n) || 0) + 1);\n  const buckets = new Array(nums.length + 1).fill(null).map(() => []);\n  for (const [num, freq] of counts) buckets[freq].push(num);\n  const result = [];\n  for (let freq = buckets.length - 1; freq >= 0 && result.length < k; freq--) {\n    for (const num of buckets[freq]) {\n      result.push(num);\n      if (result.length === k) break;\n    }\n  }\n  return result;\n}", timeComplexity: "O(n)", spaceComplexity: "O(n)", explanation: "Bucket sort by frequency avoids comparison-based sorting." },
    interviewExplanation: "1. Start with counting frequencies via a hash map\n2. Sorting by frequency is O(n log n) — can we do better?\n3. Bucket sort: frequency is bounded by array length, so use it as an index\n4. Collect from the highest-frequency bucket downward until k elements are found",
    tests: [
      { name: "Returns top-2 frequent", validate: (code) => { try { const r = new Function(`${code}; return topKFrequent([1,1,1,2,2,3], 2).slice().sort((a,b)=>a-b);`)(); return JSON.stringify(r) === JSON.stringify([1, 2]); } catch { return false; } } },
      { name: "Handles single element", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return topKFrequent([1], 1);`)()) === JSON.stringify([1]); } catch { return false; } } },
    ],
  },
  {
    id: "longest-consecutive-sequence", number: 26, title: "Longest Consecutive Sequence", difficulty: "Medium",
    topics: ["arrays", "hash-map"],
    companies: ["Amazon", "Google", "Meta", "Microsoft"],
    acceptance: 48, xp: 25,
    problemStatement: "Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence.\n\nYou must write an algorithm that runs in **O(n)** time.",
    examples: [
      { input: "nums = [100,4,200,1,3,2]", output: "4", explanation: "The longest consecutive sequence is [1,2,3,4]." },
      { input: "nums = [0,3,7,2,5,8,4,6,0,1]", output: "9" },
    ],
    constraints: ["0 ≤ nums.length ≤ 10⁵", "-10⁹ ≤ nums[i] ≤ 10⁹"],
    conceptOverview: "Longest Consecutive Sequence tests whether you can avoid an O(n log n) sort by using a hash set to detect sequence starts and walk runs in O(n) total.",
    patternRecognition: "**Pattern: Sequence-Start Detection**\n\nPut all elements in a hash set. Only start walking a run from numbers where `num - 1` is absent, so each number is visited at most twice overall.",
    sampleTests: [
      { name: "Example 1", input: [[100, 4, 200, 1, 3, 2]], expected: 4 },
      { name: "Example 2", input: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], expected: 9 },
    ],
    starterCode: "/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction longestConsecutive(nums) {\n  // Write your solution here\n}",
    hints: ["Sorting works but costs O(n log n) — can you avoid it?", "Put every number in a Set for O(1) lookups.", "Only start counting a run from a number whose predecessor (num - 1) is not in the set."],
    bruteForceSolution: { code: "function longestConsecutive(nums) {\n  const sorted = [...new Set(nums)].sort((a, b) => a - b);\n  let longest = 0, current = 1;\n  for (let i = 1; i < sorted.length; i++) {\n    if (sorted[i] === sorted[i - 1] + 1) current++;\n    else current = 1;\n    longest = Math.max(longest, current);\n  }\n  return sorted.length === 0 ? 0 : Math.max(longest, current);\n}", timeComplexity: "O(n log n)", spaceComplexity: "O(n)", explanation: "Sort and scan for consecutive runs." },
    optimizedSolution: { code: "function longestConsecutive(nums) {\n  const set = new Set(nums);\n  let longest = 0;\n  for (const num of set) {\n    if (!set.has(num - 1)) {\n      let length = 1;\n      while (set.has(num + length)) length++;\n      longest = Math.max(longest, length);\n    }\n  }\n  return longest;\n}", timeComplexity: "O(n)", spaceComplexity: "O(n)", explanation: "Only walk runs starting from a sequence start, giving amortized O(n)." },
    interviewExplanation: "1. Sorting first gives an easy O(n log n) solution\n2. To reach O(n), use a hash set for O(1) membership checks\n3. Only begin a walk from numbers that are the start of a run (num - 1 absent)\n4. Each number gets visited at most twice, so total work is linear",
    tests: [
      { name: "Finds longest run", validate: (code) => { try { return new Function(`${code}; return longestConsecutive([100,4,200,1,3,2]);`)() === 4; } catch { return false; } } },
      { name: "Handles empty array", validate: (code) => { try { return new Function(`${code}; return longestConsecutive([]);`)() === 0; } catch { return false; } } },
    ],
  },
  {
    id: "two-sum-ii", number: 28, title: "Two Sum II - Input Array Is Sorted", difficulty: "Medium",
    topics: ["arrays", "two-pointers"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Adobe"],
    acceptance: 60, xp: 15,
    problemStatement: "Given a **1-indexed** array of integers `numbers` sorted in **non-decreasing order**, find two numbers such that they add up to `target`. Return the indices as `[index1, index2]` (1-indexed), where `index1 < index2`.\n\nYou may not use the same element twice.",
    examples: [
      { input: "numbers = [2,7,11,15], target = 9", output: "[1,2]" },
      { input: "numbers = [2,3,4], target = 6", output: "[1,3]" },
    ],
    constraints: ["2 ≤ numbers.length ≤ 3 × 10⁴", "-1000 ≤ numbers[i] ≤ 1000", "numbers is sorted in non-decreasing order", "Exactly one valid answer exists"],
    conceptOverview: "Two Sum II builds on Two Sum by exploiting sorted order, replacing the hash map with a two-pointer sweep for O(1) space.",
    patternRecognition: "**Pattern: Two Pointers on Sorted Array**\n\nWhen the array is sorted and you need a pair matching a target sum, start pointers at both ends and move inward based on whether the current sum is too small or too large.",
    sampleTests: [
      { name: "Example 1", input: [[2, 7, 11, 15], 9], expected: [1, 2] },
      { name: "Example 2", input: [[2, 3, 4], 6], expected: [1, 3] },
    ],
    starterCode: "/**\n * @param {number[]} numbers\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(numbers, target) {\n  // Write your solution here\n}",
    hints: ["The array is sorted — can you avoid a hash map?", "Use two pointers starting at both ends.", "If the sum is too small, move the left pointer right; if too large, move the right pointer left."],
    bruteForceSolution: { code: "function twoSum(numbers, target) {\n  for (let i = 0; i < numbers.length; i++) {\n    for (let j = i + 1; j < numbers.length; j++) {\n      if (numbers[i] + numbers[j] === target) return [i + 1, j + 1];\n    }\n  }\n  return [];\n}", timeComplexity: "O(n²)", spaceComplexity: "O(1)", explanation: "Check every pair, ignoring the sorted order." },
    optimizedSolution: { code: "function twoSum(numbers, target) {\n  let left = 0, right = numbers.length - 1;\n  while (left < right) {\n    const sum = numbers[left] + numbers[right];\n    if (sum === target) return [left + 1, right + 1];\n    if (sum < target) left++;\n    else right--;\n  }\n  return [];\n}", timeComplexity: "O(n)", spaceComplexity: "O(1)", explanation: "Two pointers move inward using the sorted order." },
    interviewExplanation: "**How to explain:**\n1. Note the array is sorted, unlike classic Two Sum\n2. Use two pointers instead of a hash map to save space\n3. Move left pointer when sum too small, right pointer when too large\n4. Return 1-indexed positions",
    tests: [
      { name: "Finds correct indices", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return twoSum([2,7,11,15], 9);`)()) === JSON.stringify([1, 2]); } catch { return false; } } },
      { name: "Handles non-adjacent pair", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return twoSum([2,3,4], 6);`)()) === JSON.stringify([1, 3]); } catch { return false; } } },
    ],
  },
  {
    id: "container-with-most-water", number: 29, title: "Container With Most Water", difficulty: "Medium",
    topics: ["arrays", "two-pointers", "greedy"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Bloomberg", "Adobe"],
    acceptance: 56, xp: 20,
    problemStatement: "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`-th line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water a container can store.\n\nYou may not slant the container.",
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "height = [1,1]", output: "1" },
    ],
    constraints: ["n == height.length", "2 ≤ n ≤ 10⁵", "0 ≤ height[i] ≤ 10⁴"],
    conceptOverview: "Container With Most Water tests the greedy two-pointer insight that moving the shorter line inward is the only move that can improve area.",
    patternRecognition: "**Pattern: Greedy Two Pointers**\n\nStart with the widest container (both ends). The area is capped by the shorter line, so moving the taller line inward can never help — always move the shorter one.",
    sampleTests: [
      { name: "Example 1", input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 },
      { name: "Example 2", input: [[1, 1]], expected: 1 },
    ],
    starterCode: "/**\n * @param {number[]} height\n * @return {number}\n */\nfunction maxArea(height) {\n  // Write your solution here\n}",
    hints: ["Start with pointers at both ends for maximum width.", "Area = min(height[left], height[right]) * (right - left).", "Always move the pointer at the shorter line inward."],
    bruteForceSolution: { code: "function maxArea(height) {\n  let max = 0;\n  for (let i = 0; i < height.length; i++) {\n    for (let j = i + 1; j < height.length; j++) {\n      max = Math.max(max, Math.min(height[i], height[j]) * (j - i));\n    }\n  }\n  return max;\n}", timeComplexity: "O(n²)", spaceComplexity: "O(1)", explanation: "Check every pair of lines." },
    optimizedSolution: { code: "function maxArea(height) {\n  let left = 0, right = height.length - 1, max = 0;\n  while (left < right) {\n    const area = Math.min(height[left], height[right]) * (right - left);\n    max = Math.max(max, area);\n    if (height[left] < height[right]) left++;\n    else right--;\n  }\n  return max;\n}", timeComplexity: "O(n)", spaceComplexity: "O(1)", explanation: "Two pointers shrinking from the widest container, always moving the shorter line." },
    interviewExplanation: "1. Start with brute force checking all pairs\n2. Start pointers at widest container instead\n3. Prove moving the taller line can never increase area\n4. Always move the shorter line inward until pointers meet",
    tests: [
      { name: "Returns correct max area", validate: (code) => { try { return new Function(`${code}; return maxArea([1,8,6,2,5,4,8,3,7]);`)() === 49; } catch { return false; } } },
      { name: "Handles two elements", validate: (code) => { try { return new Function(`${code}; return maxArea([1,1]);`)() === 1; } catch { return false; } } },
    ],
  },
  {
    id: "trapping-rain-water", number: 31, title: "Trapping Rain Water", difficulty: "Hard",
    topics: ["arrays", "two-pointers"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Bloomberg"],
    acceptance: 45, xp: 30,
    problemStatement: "Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.",
    examples: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
      { input: "height = [4,2,0,3,2,5]", output: "9" },
    ],
    constraints: ["n == height.length", "1 ≤ n ≤ 2 × 10⁴", "0 ≤ height[i] ≤ 10⁵"],
    conceptOverview: "Trapping Rain Water is a hard two-pointer problem: water above a bar is bounded by the shorter of the tallest bars to its left and right.",
    patternRecognition: "**Pattern: Two Pointers with Running Max**\n\nTrack leftMax/rightMax while moving pointers inward. Process whichever side has the smaller current height, since its trapped water is bounded by its own running max.",
    sampleTests: [
      { name: "Example 1", input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expected: 6 },
      { name: "Example 2", input: [[4, 2, 0, 3, 2, 5]], expected: 9 },
    ],
    starterCode: "/**\n * @param {number[]} height\n * @return {number}\n */\nfunction trap(height) {\n  // Write your solution here\n}",
    hints: ["Water above index i is min(maxLeft(i), maxRight(i)) - height[i].", "Use two pointers with running leftMax and rightMax instead of precomputed arrays.", "Process the side with the smaller height, since it's the bounding side."],
    bruteForceSolution: { code: "function trap(height) {\n  let total = 0;\n  for (let i = 0; i < height.length; i++) {\n    let maxLeft = 0, maxRight = 0;\n    for (let j = 0; j <= i; j++) maxLeft = Math.max(maxLeft, height[j]);\n    for (let j = i; j < height.length; j++) maxRight = Math.max(maxRight, height[j]);\n    total += Math.min(maxLeft, maxRight) - height[i];\n  }\n  return total;\n}", timeComplexity: "O(n²)", spaceComplexity: "O(1)", explanation: "Recompute maxLeft/maxRight for every index." },
    optimizedSolution: { code: "function trap(height) {\n  let left = 0, right = height.length - 1;\n  let leftMax = 0, rightMax = 0, total = 0;\n  while (left < right) {\n    if (height[left] < height[right]) {\n      leftMax = Math.max(leftMax, height[left]);\n      total += leftMax - height[left];\n      left++;\n    } else {\n      rightMax = Math.max(rightMax, height[right]);\n      total += rightMax - height[right];\n      right--;\n    }\n  }\n  return total;\n}", timeComplexity: "O(n)", spaceComplexity: "O(1)", explanation: "Two pointers with running leftMax/rightMax, processing the shorter side." },
    interviewExplanation: "1. Brute force recomputes maxLeft/maxRight per index — O(n²)\n2. Precomputed arrays reduce to O(n) time but O(n) space\n3. Two pointers with running max reach O(n) time and O(1) space\n4. Justify processing the shorter side: it's the true bound for trapped water there",
    tests: [
      { name: "Returns correct trapped water", validate: (code) => { try { return new Function(`${code}; return trap([0,1,0,2,1,0,1,3,2,1,2,1]);`)() === 6; } catch { return false; } } },
      { name: "Handles varied heights", validate: (code) => { try { return new Function(`${code}; return trap([4,2,0,3,2,5]);`)() === 9; } catch { return false; } } },
    ],
  },
  {
    id: "best-time-to-buy-sell-stock", number: 33, title: "Best Time to Buy and Sell Stock", difficulty: "Easy",
    topics: ["arrays", "sliding-window", "dp"],
    companies: ["Amazon", "Meta", "Apple"],
    acceptance: 54, xp: 15,
    problemStatement: "You are given an array `prices` where `prices[i]` is the price of a given stock on day `i`.\n\nYou want to maximize your profit by choosing a single day to buy and a different day in the future to sell. Return the maximum profit. If no profit is possible, return `0`.",
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price = 1), sell on day 5 (price = 6), profit = 5." },
      { input: "prices = [7,6,4,3,1]", output: "0", explanation: "Prices only decrease, so no profit is possible." },
    ],
    constraints: ["1 ≤ prices.length ≤ 10⁵", "0 ≤ prices[i] ≤ 10⁴"],
    conceptOverview: "Best Time to Buy and Sell Stock is a one-pass sliding window: track the minimum price seen so far and the best profit achievable by selling today.",
    patternRecognition: "**Pattern: Expanding Window with Running Min**\n\nWhen you need the best pair (min, later max) in one pass, track the running minimum on the left and evaluate the profit at each right-side candidate.",
    sampleTests: [
      { name: "Example 1", input: [[7, 1, 5, 3, 6, 4]], expected: 5 },
      { name: "Example 2", input: [[7, 6, 4, 3, 1]], expected: 0 },
    ],
    starterCode: "/**\n * @param {number[]} prices\n * @return {number}\n */\nfunction maxProfit(prices) {\n  // Write your solution here\n}",
    hints: ["Track the minimum price seen so far.", "At each day, compute profit if selling today at that minimum.", "Keep the maximum profit seen across all days."],
    bruteForceSolution: { code: "function maxProfit(prices) {\n  let max = 0;\n  for (let i = 0; i < prices.length; i++) {\n    for (let j = i + 1; j < prices.length; j++) {\n      max = Math.max(max, prices[j] - prices[i]);\n    }\n  }\n  return max;\n}", timeComplexity: "O(n²)", spaceComplexity: "O(1)", explanation: "Check every buy/sell pair." },
    optimizedSolution: { code: "function maxProfit(prices) {\n  let minSoFar = prices[0];\n  let maxProfit = 0;\n  for (let i = 1; i < prices.length; i++) {\n    maxProfit = Math.max(maxProfit, prices[i] - minSoFar);\n    minSoFar = Math.min(minSoFar, prices[i]);\n  }\n  return maxProfit;\n}", timeComplexity: "O(n)", spaceComplexity: "O(1)", explanation: "Track running minimum and best profit in a single pass." },
    interviewExplanation: "1. Brute force checks every pair — O(n²)\n2. Instead track the lowest price seen so far\n3. At each day compute profit as if selling today\n4. Keep the best profit across the whole scan",
    tests: [
      { name: "Returns correct profit", validate: (code) => { try { return new Function(`${code}; return maxProfit([7,1,5,3,6,4]);`)() === 5; } catch { return false; } } },
      { name: "Returns 0 for descending prices", validate: (code) => { try { return new Function(`${code}; return maxProfit([7,6,4,3,1]);`)() === 0; } catch { return false; } } },
    ],
  },
  {
    id: "longest-repeating-character-replacement", number: 36, title: "Longest Repeating Character Replacement", difficulty: "Medium",
    topics: ["strings", "sliding-window"],
    companies: ["Amazon", "Google", "Meta", "Microsoft"],
    acceptance: 51, xp: 20,
    problemStatement: "You are given a string `s` and an integer `k`. You can choose any character and change it to any other uppercase English character, at most `k` times.\n\nReturn the length of the longest substring containing the same letter after performing the above operations.",
    examples: [
      { input: 's = "ABAB", k = 2', output: "4" },
      { input: 's = "AABABBA", k = 1', output: "4" },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁵", "s consists of only uppercase English letters", "0 ≤ k ≤ s.length"],
    conceptOverview: "Longest Repeating Character Replacement tests variable-size sliding window combined with tracking the max character frequency inside it.",
    patternRecognition: "**Pattern: Sliding Window with Max Frequency**\n\nA window is achievable with at most k replacements when windowSize - maxFreq ≤ k. Track maxFreq as the window grows; shrink only when the condition breaks.",
    sampleTests: [
      { name: "Example 1", input: ["ABAB", 2], expected: 4 },
      { name: "Example 2", input: ["AABABBA", 1], expected: 4 },
    ],
    starterCode: "/**\n * @param {string} s\n * @param {number} k\n * @return {number}\n */\nfunction characterReplacement(s, k) {\n  // Write your solution here\n}",
    hints: ["Track a frequency count of characters in the current window.", "Track maxFreq, the count of the most frequent character seen so far.", "If windowSize - maxFreq > k, shrink the window from the left."],
    bruteForceSolution: { code: "function characterReplacement(s, k) {\n  let longest = 0;\n  for (let i = 0; i < s.length; i++) {\n    const counts = {};\n    let maxFreq = 0;\n    for (let j = i; j < s.length; j++) {\n      counts[s[j]] = (counts[s[j]] || 0) + 1;\n      maxFreq = Math.max(maxFreq, counts[s[j]]);\n      if (j - i + 1 - maxFreq <= k) longest = Math.max(longest, j - i + 1);\n    }\n  }\n  return longest;\n}", timeComplexity: "O(n²)", spaceComplexity: "O(1)", explanation: "Check every substring's validity directly." },
    optimizedSolution: { code: "function characterReplacement(s, k) {\n  const counts = {};\n  let left = 0, maxFreq = 0, longest = 0;\n  for (let right = 0; right < s.length; right++) {\n    counts[s[right]] = (counts[s[right]] || 0) + 1;\n    maxFreq = Math.max(maxFreq, counts[s[right]]);\n    while (right - left + 1 - maxFreq > k) {\n      counts[s[left]]--;\n      left++;\n    }\n    longest = Math.max(longest, right - left + 1);\n  }\n  return longest;\n}", timeComplexity: "O(n)", spaceComplexity: "O(1)", explanation: "Sliding window tracking maxFreq, shrinking only when needed." },
    interviewExplanation: "1. Brute force recomputes validity per substring — O(n²) or worse\n2. Slide a window, tracking character counts and maxFreq\n3. A window is valid when windowSize - maxFreq ≤ k\n4. Shrink from the left only when the window becomes invalid",
    tests: [
      { name: "Returns correct length for ABAB", validate: (code) => { try { return new Function(`${code}; return characterReplacement("ABAB", 2);`)() === 4; } catch { return false; } } },
      { name: "Returns correct length for AABABBA", validate: (code) => { try { return new Function(`${code}; return characterReplacement("AABABBA", 1);`)() === 4; } catch { return false; } } },
    ],
  },
  {
    id: "permutation-in-string", number: 37, title: "Permutation in String", difficulty: "Medium",
    topics: ["strings", "sliding-window", "hash-map"],
    companies: ["Amazon", "Microsoft", "Meta"],
    acceptance: 46, xp: 20,
    problemStatement: "Given two strings `s1` and `s2`, return `true` if `s2` contains a permutation of `s1`, or `false` otherwise. In other words, return `true` if one of `s1`'s permutations is a substring of `s2`.",
    examples: [
      { input: 's1 = "ab", s2 = "eidbaooo"', output: "true", explanation: 's2 contains "ba", a permutation of s1.' },
      { input: 's1 = "ab", s2 = "eidboaoo"', output: "false" },
    ],
    constraints: ["1 ≤ s1.length, s2.length ≤ 10⁴", "s1 and s2 consist of lowercase English letters"],
    conceptOverview: "Permutation in String is a fixed-size sliding window problem: check whether any window of s2 has the same character counts as s1.",
    patternRecognition: "**Pattern: Fixed-Size Window with Frequency Match**\n\nSlide a window equal to s1's length across s2, maintaining a running frequency count and comparing it to s1's frequency count at each step.",
    sampleTests: [
      { name: "Example 1", input: ["ab", "eidbaooo"], expected: true },
      { name: "Example 2", input: ["ab", "eidboaoo"], expected: false },
    ],
    starterCode: "/**\n * @param {string} s1\n * @param {string} s2\n * @return {boolean}\n */\nfunction checkInclusion(s1, s2) {\n  // Write your solution here\n}",
    hints: ["Build a frequency count of s1.", "Slide a window of size s1.length across s2, updating a running count.", "Compare the window's frequency count to s1's count at each step."],
    bruteForceSolution: { code: "function checkInclusion(s1, s2) {\n  const sorted1 = [...s1].sort().join('');\n  for (let i = 0; i + s1.length <= s2.length; i++) {\n    const window = s2.slice(i, i + s1.length);\n    if ([...window].sort().join('') === sorted1) return true;\n  }\n  return false;\n}", timeComplexity: "O(n * k log k)", spaceComplexity: "O(k)", explanation: "Sort each window and compare to sorted s1." },
    optimizedSolution: { code: "function checkInclusion(s1, s2) {\n  if (s1.length > s2.length) return false;\n  const need = new Array(26).fill(0);\n  const window = new Array(26).fill(0);\n  const base = 'a'.charCodeAt(0);\n  for (const c of s1) need[c.charCodeAt(0) - base]++;\n  for (let i = 0; i < s2.length; i++) {\n    window[s2.charCodeAt(i) - base]++;\n    if (i >= s1.length) window[s2.charCodeAt(i - s1.length) - base]--;\n    if (i >= s1.length - 1 && need.every((v, idx) => v === window[idx])) return true;\n  }\n  return false;\n}", timeComplexity: "O(n)", spaceComplexity: "O(1)", explanation: "Fixed-size sliding window with a 26-count array comparison." },
    interviewExplanation: "1. Brute force sorts each window — O(n * k log k)\n2. Use fixed-size counting arrays instead of sorting\n3. Slide the window one character at a time, updating counts\n4. Compare counts in O(26) per step instead of full re-sort",
    tests: [
      { name: "Finds permutation substring", validate: (code) => { try { return new Function(`${code}; return checkInclusion("ab", "eidbaooo");`)() === true; } catch { return false; } } },
      { name: "Returns false when absent", validate: (code) => { try { return new Function(`${code}; return checkInclusion("ab", "eidboaoo");`)() === false; } catch { return false; } } },
    ],
  },
  {
    id: "minimum-window-substring", number: 39, title: "Minimum Window Substring", difficulty: "Hard",
    topics: ["strings", "sliding-window", "hash-map"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Bloomberg"],
    acceptance: 40, xp: 30,
    problemStatement: "Given two strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If no such substring exists, return the empty string `\"\"`. The answer is guaranteed to be unique.",
    examples: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' },
      { input: 's = "a", t = "a"', output: '"a"' },
    ],
    constraints: ["m == s.length", "n == t.length", "1 ≤ m, n ≤ 10⁵", "s and t consist of uppercase and lowercase English letters"],
    conceptOverview: "Minimum Window Substring is the hardest classic sliding window problem: a variable-size window that expands to satisfy a constraint and shrinks to minimize.",
    patternRecognition: "**Pattern: Variable Window, Expand-Then-Shrink**\n\nExpand the window until it satisfies the constraint (contains all of t), then greedily shrink from the left while it still satisfies the constraint, recording the best window at each valid state.",
    sampleTests: [
      { name: "Example 1", input: ["ADOBECODEBANC", "ABC"], expected: "BANC" },
      { name: "Example 2", input: ["a", "a"], expected: "a" },
    ],
    starterCode: "/**\n * @param {string} s\n * @param {string} t\n * @return {string}\n */\nfunction minWindow(s, t) {\n  // Write your solution here\n}",
    hints: ["Build a frequency count of characters needed from t.", "Expand the window with a right pointer until all of t's characters are satisfied.", "Once valid, shrink from the left as much as possible while tracking the smallest valid window."],
    bruteForceSolution: { code: "// Checking every substring against t's requirements is O(n^2) or worse", timeComplexity: "O(n²)", spaceComplexity: "O(n)", explanation: "Check every substring for containing all characters of t." },
    optimizedSolution: { code: "function minWindow(s, t) {\n  if (!s || !t) return '';\n  const need = new Map();\n  for (const c of t) need.set(c, (need.get(c) || 0) + 1);\n  const required = need.size;\n  let formed = 0;\n  const windowCounts = new Map();\n  let left = 0, bestLen = Infinity, bestStart = 0;\n  for (let right = 0; right < s.length; right++) {\n    const c = s[right];\n    windowCounts.set(c, (windowCounts.get(c) || 0) + 1);\n    if (need.has(c) && windowCounts.get(c) === need.get(c)) formed++;\n    while (formed === required) {\n      if (right - left + 1 < bestLen) {\n        bestLen = right - left + 1;\n        bestStart = left;\n      }\n      const lc = s[left];\n      windowCounts.set(lc, windowCounts.get(lc) - 1);\n      if (need.has(lc) && windowCounts.get(lc) < need.get(lc)) formed--;\n      left++;\n    }\n  }\n  return bestLen === Infinity ? '' : s.slice(bestStart, bestStart + bestLen);\n}", timeComplexity: "O(m + n)", spaceComplexity: "O(m + n)", explanation: "Expand right to satisfy the window, shrink left to minimize it." },
    interviewExplanation: "1. Build required character counts from t\n2. Expand right pointer, tracking when the window fully satisfies t (formed === required)\n3. Once valid, shrink from the left greedily, recording the smallest valid window\n4. Continue until right reaches the end of s",
    tests: [
      { name: "Finds minimum window", validate: (code) => { try { return new Function(`${code}; return minWindow("ADOBECODEBANC", "ABC");`)() === "BANC"; } catch { return false; } } },
      { name: "Handles single character match", validate: (code) => { try { return new Function(`${code}; return minWindow("a", "a");`)() === "a"; } catch { return false; } } },
    ],
  },
  {
    id: "sliding-window-maximum", number: 41, title: "Sliding Window Maximum", difficulty: "Hard",
    topics: ["arrays", "sliding-window", "heap"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Bloomberg"],
    acceptance: 43, xp: 30,
    problemStatement: "You are given an array of integers `nums` and a sliding window of size `k` moving from the left of the array to the right, one position at a time. Return the max sliding window — an array of the maximum value in each window position.",
    examples: [
      { input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", output: "[3,3,5,5,6,7]" },
      { input: "nums = [1], k = 1", output: "[1]" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴", "1 ≤ k ≤ nums.length"],
    conceptOverview: "Sliding Window Maximum tests the monotonic deque technique to get each window's max in amortized O(1), avoiding a heap's O(log k) per step.",
    patternRecognition: "**Pattern: Monotonic Deque**\n\nMaintain a deque of indices with decreasing values. Pop smaller trailing values before pushing a new index; pop expired indices from the front. The front always holds the current window's max index.",
    sampleTests: [
      { name: "Example 1", input: [[1, 3, -1, -3, 5, 3, 6, 7], 3], expected: [3, 3, 5, 5, 6, 7] },
      { name: "Example 2", input: [[1], 1], expected: [1] },
    ],
    starterCode: "/**\n * @param {number[]} nums\n * @param {number} k\n * @return {number[]}\n */\nfunction maxSlidingWindow(nums, k) {\n  // Write your solution here\n}",
    hints: ["A max-heap works but costs O(n log k) with lazy deletion.", "Use a deque of indices kept in decreasing value order.", "Pop expired indices from the front, and smaller values from the back before pushing."],
    bruteForceSolution: { code: "function maxSlidingWindow(nums, k) {\n  const result = [];\n  for (let i = 0; i + k <= nums.length; i++) {\n    result.push(Math.max(...nums.slice(i, i + k)));\n  }\n  return result;\n}", timeComplexity: "O(n * k)", spaceComplexity: "O(1) excluding output", explanation: "Recompute the max of each window directly." },
    optimizedSolution: { code: "function maxSlidingWindow(nums, k) {\n  const deque = [];\n  const result = [];\n  for (let i = 0; i < nums.length; i++) {\n    while (deque.length && deque[0] <= i - k) deque.shift();\n    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop();\n    deque.push(i);\n    if (i >= k - 1) result.push(nums[deque[0]]);\n  }\n  return result;\n}", timeComplexity: "O(n)", spaceComplexity: "O(k)", explanation: "Monotonic deque of indices tracks the current window's max in amortized O(1)." },
    interviewExplanation: "1. Brute force recomputes max per window — O(n*k)\n2. A monotonic deque of indices avoids redundant comparisons\n3. Evict expired indices from the front, smaller values from the back\n4. The front of the deque is always the current window's max",
    tests: [
      { name: "Returns correct window maxes", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3);`)()) === JSON.stringify([3, 3, 5, 5, 6, 7]); } catch { return false; } } },
      { name: "Handles single element window", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return maxSlidingWindow([1], 1);`)()) === JSON.stringify([1]); } catch { return false; } } },
    ],
  },
  {
    id: "evaluate-reverse-polish-notation", number: 42, title: "Evaluate Reverse Polish Notation", difficulty: "Medium",
    topics: ["stack", "arrays"],
    companies: ["Amazon", "Google", "LinkedIn"],
    acceptance: 47, xp: 20,
    problemStatement: "You are given an array of strings `tokens` representing an arithmetic expression in **Reverse Polish Notation** (postfix). Evaluate the expression and return the result as an integer.\n\nValid operators are `+`, `-`, `*`, `/`. Division truncates toward zero.",
    examples: [
      { input: 'tokens = ["2","1","+","3","*"]', output: "9", explanation: "((2 + 1) * 3) = 9." },
      { input: 'tokens = ["4","13","5","/","+"]', output: "6" },
    ],
    constraints: ["1 ≤ tokens.length ≤ 10⁴", "Each token is an operator (+, -, *, /) or an integer in [-200, 200]"],
    conceptOverview: "Evaluate Reverse Polish Notation is a classic stack application: postfix expressions can be evaluated with a single stack pass, no parsing tree required.",
    patternRecognition: "**Pattern: Stack Evaluation**\n\nPush operands. On an operator, pop the two most recent operands, apply the operator, and push the result back.",
    sampleTests: [
      { name: "Example 1", input: [["2", "1", "+", "3", "*"]], expected: 9 },
      { name: "Example 2", input: [["4", "13", "5", "/", "+"]], expected: 6 },
    ],
    starterCode: "/**\n * @param {string[]} tokens\n * @return {number}\n */\nfunction evalRPN(tokens) {\n  // Write your solution here\n}",
    hints: ["Push numbers onto a stack.", "On an operator, pop the top two values and apply the operator.", "The second-popped value is the left operand; watch operand order for - and /."],
    bruteForceSolution: { code: "// Stack evaluation is already optimal for RPN", timeComplexity: "O(n)", spaceComplexity: "O(n)", explanation: "There's no simpler approach than a single stack pass." },
    optimizedSolution: { code: "function evalRPN(tokens) {\n  const stack = [];\n  const ops = { '+': (a,b) => a+b, '-': (a,b) => a-b, '*': (a,b) => a*b, '/': (a,b) => Math.trunc(a/b) };\n  for (const t of tokens) {\n    if (ops[t]) {\n      const b = stack.pop();\n      const a = stack.pop();\n      stack.push(ops[t](a, b));\n    } else {\n      stack.push(Number(t));\n    }\n  }\n  return stack[0];\n}", timeComplexity: "O(n)", spaceComplexity: "O(n)", explanation: "Push operands, pop and combine on operators." },
    interviewExplanation: "1. Recognize postfix notation maps directly to stack evaluation\n2. Push numbers; on operators, pop two, apply, push result\n3. Watch operand order for non-commutative ops (- and /)\n4. Use Math.trunc for division to truncate toward zero",
    tests: [
      { name: "Evaluates basic expression", validate: (code) => { try { return new Function(`${code}; return evalRPN(["2","1","+","3","*"]);`)() === 9; } catch { return false; } } },
      { name: "Evaluates with division", validate: (code) => { try { return new Function(`${code}; return evalRPN(["4","13","5","/","+"]);`)() === 6; } catch { return false; } } },
    ],
  },
  {
    id: "generate-parentheses", number: 43, title: "Generate Parentheses", difficulty: "Medium",
    topics: ["stack", "backtracking"],
    companies: ["Amazon", "Google", "Meta", "Microsoft"],
    acceptance: 50, xp: 20,
    problemStatement: "Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
    examples: [
      { input: "n = 3", output: '["((()))","(()())","(())()","()(())","()()()"]' },
      { input: "n = 1", output: '["()"]' },
    ],
    constraints: ["1 ≤ n ≤ 8"],
    conceptOverview: "Generate Parentheses tests backtracking with pruning: track open/close counts to only build valid combinations, never generating and later discarding invalid ones.",
    patternRecognition: "**Pattern: Constrained Backtracking**\n\nAt each step, choose to add '(' if under the limit, or ')' if it wouldn't exceed the number of '(' placed so far. This guarantees every complete string is valid.",
    sampleTests: [
      { name: "n = 1", input: [1], expected: ["()"] },
      { name: "n = 2", input: [2], expected: ["(())", "()()"] },
    ],
    starterCode: "/**\n * @param {number} n\n * @return {string[]}\n */\nfunction generateParenthesis(n) {\n  // Write your solution here\n}",
    hints: ["Track counts of '(' and ')' used so far.", "Add '(' only if open count < n.", "Add ')' only if close count < open count."],
    bruteForceSolution: { code: "// Generating all 2^(2n) strings and filtering valid ones is far less efficient", timeComplexity: "O(2^(2n) * n)", spaceComplexity: "O(2^(2n) * n)", explanation: "Generate every combination of parentheses, then validate each one." },
    optimizedSolution: { code: "function generateParenthesis(n) {\n  const result = [];\n  function backtrack(current, open, close) {\n    if (current.length === 2 * n) {\n      result.push(current);\n      return;\n    }\n    if (open < n) backtrack(current + '(', open + 1, close);\n    if (close < open) backtrack(current + ')', open, close + 1);\n  }\n  backtrack('', 0, 0);\n  return result;\n}", timeComplexity: "O(4^n / sqrt(n))", spaceComplexity: "O(n) recursion depth", explanation: "Backtrack while only ever building valid prefixes." },
    interviewExplanation: "1. Brute force generates all 2^(2n) strings then filters — wasteful\n2. Backtrack while enforcing validity constraints at each step\n3. open < n allows adding '('; close < open allows adding ')'\n4. Every complete string built this way is automatically valid",
    tests: [
      { name: "Generates for n=1", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return generateParenthesis(1);`)()) === JSON.stringify(["()"]); } catch { return false; } } },
      { name: "Generates correct count for n=3", validate: (code) => { try { return new Function(`${code}; return generateParenthesis(3).length;`)() === 5; } catch { return false; } } },
    ],
  },
  {
    id: "car-fleet", number: 44, title: "Car Fleet", difficulty: "Medium",
    topics: ["stack", "sorting", "arrays"],
    companies: ["Google", "Amazon"],
    acceptance: 44, xp: 25,
    problemStatement: "There are `n` cars going to the same destination along a one-lane road, `target` miles away. Given `position` and `speed` arrays, a car cannot pass the car ahead of it — it merges into a fleet at that car's speed instead. Return the number of car fleets that will arrive at the destination.",
    examples: [
      { input: "target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]", output: "3" },
      { input: "target = 10, position = [3], speed = [3]", output: "1" },
    ],
    constraints: ["n == position.length == speed.length", "1 ≤ n ≤ 10⁵", "0 < target ≤ 10⁶", "0 ≤ position[i] < target (all unique)", "0 < speed[i] ≤ 10⁶"],
    conceptOverview: "Car Fleet models a monotonic stack problem: sort by position, compute solo arrival times, and merge cars whose time doesn't exceed the fleet ahead of them.",
    patternRecognition: "**Pattern: Sort + Monotonic Stack of Times**\n\nSort cars closest-to-target first. A car merges into the fleet ahead if its own arrival time is ≤ that fleet's time; otherwise it starts a new fleet (push its time like a stack).",
    sampleTests: [
      { name: "Example 1", input: [12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]], expected: 3 },
      { name: "Example 2", input: [10, [3], [3]], expected: 1 },
    ],
    starterCode: "/**\n * @param {number} target\n * @param {number[]} position\n * @param {number[]} speed\n * @return {number}\n */\nfunction carFleet(target, position, speed) {\n  // Write your solution here\n}",
    hints: ["Sort cars by position, closest to target first.", "Compute each car's solo arrival time: (target - position) / speed.", "If a car's time is ≤ the time of the fleet directly ahead, it merges; otherwise it forms a new fleet."],
    bruteForceSolution: { code: "// Simulating position over time step by step is far less efficient than the sort + stack approach", timeComplexity: "O(n * steps)", spaceComplexity: "O(n)", explanation: "Simulate car positions over discrete time steps and detect merges." },
    optimizedSolution: { code: "function carFleet(target, position, speed) {\n  const cars = position.map((p, i) => [p, speed[i]]).sort((a, b) => b[0] - a[0]);\n  const stack = [];\n  for (const [p, s] of cars) {\n    const time = (target - p) / s;\n    if (stack.length === 0 || time > stack[stack.length - 1]) {\n      stack.push(time);\n    }\n  }\n  return stack.length;\n}", timeComplexity: "O(n log n)", spaceComplexity: "O(n)", explanation: "Sort by position, then use a stack of fleet arrival times." },
    interviewExplanation: "1. Sort cars by position, nearest target first\n2. Compute each car's unobstructed arrival time\n3. If current car's time exceeds the fleet ahead's time, it forms a new fleet (push)\n4. Otherwise it catches up and merges (no push) — final stack size is the fleet count",
    tests: [
      { name: "Returns correct fleet count", validate: (code) => { try { return new Function(`${code}; return carFleet(12, [10,8,0,5,3], [2,4,1,1,3]);`)() === 3; } catch { return false; } } },
      { name: "Handles single car", validate: (code) => { try { return new Function(`${code}; return carFleet(10, [3], [3]);`)() === 1; } catch { return false; } } },
    ],
  },
  {
    id: "largest-rectangle-in-histogram", number: 45, title: "Largest Rectangle in Histogram", difficulty: "Hard",
    topics: ["stack", "arrays"],
    companies: ["Amazon", "Google", "Meta", "Microsoft"],
    acceptance: 42, xp: 30,
    problemStatement: "Given an array of integers `heights` representing a histogram's bar heights where each bar has width `1`, return the area of the largest rectangle in the histogram.",
    examples: [
      { input: "heights = [2,1,5,6,2,3]", output: "10", explanation: "Formed by heights 5 and 6 with width 2." },
      { input: "heights = [2,4]", output: "4" },
    ],
    constraints: ["1 ≤ heights.length ≤ 10⁵", "0 ≤ heights[i] ≤ 10⁴"],
    conceptOverview: "Largest Rectangle in Histogram is the canonical hard monotonic stack problem: find, for each bar, how far it can extend as the limiting height.",
    patternRecognition: "**Pattern: Monotonic Increasing Stack**\n\nKeep a stack of indices with increasing heights. When a shorter bar appears, pop and finalize the rectangle for the popped bar, using the new stack top and current index as its boundaries.",
    sampleTests: [
      { name: "Example 1", input: [[2, 1, 5, 6, 2, 3]], expected: 10 },
      { name: "Example 2", input: [[2, 4]], expected: 4 },
    ],
    starterCode: "/**\n * @param {number[]} heights\n * @return {number}\n */\nfunction largestRectangleArea(heights) {\n  // Write your solution here\n}",
    hints: ["Maintain a stack of indices with increasing bar heights.", "When the current bar is shorter than the stack top, pop and compute the rectangle for the popped bar.", "Append a virtual bar of height 0 at the end to flush the stack."],
    bruteForceSolution: { code: "function largestRectangleArea(heights) {\n  let max = 0;\n  for (let i = 0; i < heights.length; i++) {\n    let minHeight = heights[i];\n    for (let j = i; j < heights.length; j++) {\n      minHeight = Math.min(minHeight, heights[j]);\n      max = Math.max(max, minHeight * (j - i + 1));\n    }\n  }\n  return max;\n}", timeComplexity: "O(n²)", spaceComplexity: "O(1)", explanation: "Check every subarray's minimum height times its width." },
    optimizedSolution: { code: "function largestRectangleArea(heights) {\n  const stack = [];\n  let max = 0;\n  for (let i = 0; i <= heights.length; i++) {\n    const h = i === heights.length ? 0 : heights[i];\n    while (stack.length && heights[stack[stack.length - 1]] >= h) {\n      const height = heights[stack.pop()];\n      const width = stack.length ? i - stack[stack.length - 1] - 1 : i;\n      max = Math.max(max, height * width);\n    }\n    stack.push(i);\n  }\n  return max;\n}", timeComplexity: "O(n)", spaceComplexity: "O(n)", explanation: "Monotonic stack finalizes each bar's max rectangle exactly once." },
    interviewExplanation: "1. Brute force checks every subarray's min height — O(n²)\n2. Use a monotonic increasing stack of indices instead\n3. When a shorter bar appears, pop and finalize the popped bar's rectangle\n4. Width is bounded by the new stack top (exclusive) and current index (exclusive)",
    tests: [
      { name: "Returns correct max area", validate: (code) => { try { return new Function(`${code}; return largestRectangleArea([2,1,5,6,2,3]);`)() === 10; } catch { return false; } } },
      { name: "Handles two bars", validate: (code) => { try { return new Function(`${code}; return largestRectangleArea([2,4]);`)() === 4; } catch { return false; } } },
    ],
  },
  {
    id: "search-2d-matrix", number: 30, title: "Search a 2D Matrix", difficulty: "Medium",
    topics: ["binary-search","arrays"],
    companies: ["Amazon","Google","Meta","Microsoft"],
    acceptance: 49, xp: 20,
    problemStatement: "You are given an `m x n` integer matrix `matrix` with the following two properties:\n- Each row is sorted in non-decreasing order.\n- The first integer of each row is greater than the last integer of the previous row.\n\nGiven an integer `target`, return `true` if `target` is in `matrix` or `false` otherwise.\n\nYou must write a solution in `O(log(m * n))` time complexity.",
    examples: [
      {
        "input": "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3",
        "output": "true"
      },
      {
        "input": "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13",
        "output": "false"
      }
    ],
    constraints: [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 ≤ m, n ≤ 100",
      "-10⁴ ≤ matrix[i][j], target ≤ 10⁴"
    ],
    conceptOverview: "Since the matrix has sorted rows and the first cell of a row is greater than the last cell of the previous row, we can treat the entire 2D matrix as a single sorted 1D array of size `m * n` and apply binary search.",
    patternRecognition: "**Pattern: Matrix Flattening Binary Search**\n\nMap a 1D index `mid` to 2D indices `row = Math.floor(mid / n)` and `col = mid % n`.",
    sampleTests: [
      {
        "name": "Target present",
        "input": [
          [
            [
              1,
              3,
              5,
              7
            ],
            [
              10,
              11,
              16,
              20
            ],
            [
              23,
              30,
              34,
              60
            ]
          ],
          3
        ],
        "expected": true
      },
      {
        "name": "Target absent",
        "input": [
          [
            [
              1,
              3,
              5,
              7
            ],
            [
              10,
              11,
              16,
              20
            ],
            [
              23,
              30,
              34,
              60
            ]
          ],
          13
        ],
        "expected": false
      }
    ],
    starterCode: "/**\n * @param {number[][]} matrix\n * @param {number} target\n * @return {boolean}\n */\nfunction searchMatrix(matrix, target) {\n  // Write your solution here\n}",
    hints: [
      "Treat the matrix as a flattened 1D array.",
      "A 1D index `x` maps to `matrix[Math.floor(x / n)][x % n]` where `n` is the number of columns.",
      "Apply standard binary search on the range `[0, m * n - 1]`."
    ],
    bruteForceSolution: {
      code: "function searchMatrix(matrix, target) {\n  for (let r = 0; r < matrix.length; r++) {\n    for (let c = 0; c < matrix[0].length; c++) {\n      if (matrix[r][c] === target) return true;\n    }\n  }\n  return false;\n}",
      timeComplexity: "O(m * n)",
      spaceComplexity: "O(1)",
      explanation: "Scan every element in the matrix."
    },
    optimizedSolution: {
      code: "function searchMatrix(matrix, target) {\n  if (matrix.length === 0) return false;\n  const m = matrix.length;\n  const n = matrix[0].length;\n  let left = 0, right = m * n - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    const val = matrix[Math.floor(mid / n)][mid % n];\n    if (val === target) return true;\n    if (val < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return false;\n}",
      timeComplexity: "O(log(m * n))",
      spaceComplexity: "O(1)",
      explanation: "Standard binary search on virtual 1D array."
    },
    interviewExplanation: "1. Flattens 2D space virtually using division and modulo operators\n2. Shows that row index is `mid / cols` and col index is `mid % cols`\n3. Ensures logarithmic time complexity of O(log(m * n))",
    tests: [
      { name: "Finds target in matrix", validate: (code) => { try { return new Function(`${code}; return searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3);`)() === true; } catch { return false; } } },
      { name: "Returns false when target absent", validate: (code) => { try { return new Function(`${code}; return searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13);`)() === false; } catch { return false; } } }
    ]
  },
  {
    id: "koko-eating-bananas", number: 32, title: "Koko Eating Bananas", difficulty: "Medium",
    topics: ["binary-search","arrays"],
    companies: ["Google","Amazon","Meta","Airbnb"],
    acceptance: 50, xp: 20,
    problemStatement: "Koko loves to eat bananas. There are `n` piles of bananas, the `i`-th pile has `piles[i]` bananas. The guards have gone and will come back in `h` hours.\n\nKoko can decide her bananas-per-hour eating speed of `k`. Each hour, she chooses some pile of bananas and eats `k` bananas from that pile. If the pile has less than `k` bananas, she eats all of them instead and will not eat any more bananas during this hour.\n\nKoko likes to eat slowly but still wants to finish eating all the bananas before the guards return.\n\nReturn the minimum integer `k` such that she can eat all the bananas within `h` hours.",
    examples: [
      {
        "input": "piles = [3,6,7,11], h = 8",
        "output": "4"
      },
      {
        "input": "piles = [30,11,23,4,20], h = 5",
        "output": "30"
      }
    ],
    constraints: [
      "1 ≤ piles.length ≤ 10⁴",
      "piles.length ≤ h ≤ 10⁹",
      "1 ≤ piles[i] ≤ 10⁹"
    ],
    conceptOverview: "This problem asks us to search for an optimal value in a monotonic range of speeds. If Koko eats at speed `k` and succeeds, she can also succeed at any speed `s > k`. This property allows binary search on the range of possible speeds.",
    patternRecognition: "**Pattern: Binary Search on Answer**\n\nThe range of speeds is `[1, max(piles)]`. Calculate middle speed, count hours needed, and narrow down the range.",
    sampleTests: [
      {
        "name": "Example 1",
        "input": [
          [
            3,
            6,
            7,
            11
          ],
          8
        ],
        "expected": 4
      },
      {
        "name": "Example 2",
        "input": [
          [
            30,
            11,
            23,
            4,
            20
          ],
          5
        ],
        "expected": 30
      }
    ],
    starterCode: "/**\n * @param {number[]} piles\n * @param {number} h\n * @return {number}\n */\nfunction minEatingSpeed(piles, h) {\n  // Write your solution here\n}",
    hints: [
      "Find the minimum speed (1) and maximum speed (max value in piles).",
      "For a candidate speed `k`, check if total hours needed is <= `h`.",
      "If valid, search the lower half for a slower speed; else, search the upper half."
    ],
    bruteForceSolution: {
      code: "function minEatingSpeed(piles, h) {\n  let speed = 1;\n  while (true) {\n    let hours = 0;\n    for (const p of piles) hours += Math.ceil(p / speed);\n    if (hours <= h) return speed;\n    speed++;\n  }\n}",
      timeComplexity: "O(n * max(piles))",
      spaceComplexity: "O(1)",
      explanation: "Increment speed one-by-one from 1."
    },
    optimizedSolution: {
      code: "function minEatingSpeed(piles, h) {\n  let left = 1;\n  let right = Math.max(...piles);\n  let ans = right;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    let hours = 0;\n    for (const p of piles) {\n      hours += Math.ceil(p / mid);\n    }\n    if (hours <= h) {\n      ans = mid;\n      right = mid - 1;\n    } else {\n      left = mid + 1;\n    }\n  }\n  return ans;\n}",
      timeComplexity: "O(n * log(max(piles)))",
      spaceComplexity: "O(1)",
      explanation: "Binary search on speed."
    },
    interviewExplanation: "1. The solution space is monotonic: speeds are sorted from 1 to max pile size\n2. Feasibility function counts hours taken at speed `k`\n3. Binary search narrows down range, keeping the smallest valid speed",
    tests: [
      { name: "Finds optimal speed", validate: (code) => { try { return new Function(`${code}; return minEatingSpeed([3,6,7,11], 8);`)() === 4; } catch { return false; } } },
      { name: "Handles max speed case", validate: (code) => { try { return new Function(`${code}; return minEatingSpeed([30,11,23,4,20], 5);`)() === 30; } catch { return false; } } }
    ]
  },
  {
    id: "find-min-rotated", number: 34, title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium",
    topics: ["binary-search","arrays"],
    companies: ["Google","Amazon","Meta","Microsoft"],
    acceptance: 49, xp: 20,
    problemStatement: "Suppose an array of length `n` sorted in ascending order is rotated between `1` and `n` times. Given the sorted rotated array `nums` of unique elements, return the minimum element of this array.\n\nYou must write an algorithm that runs in `O(log n)` time.",
    examples: [
      {
        "input": "nums = [3,4,5,1,2]",
        "output": "1"
      },
      {
        "input": "nums = [4,5,6,7,0,1,2]",
        "output": "0"
      }
    ],
    constraints: [
      "n == nums.length",
      "1 ≤ n ≤ 5000",
      "-5000 ≤ nums[i] ≤ 5000",
      "All integers in nums are unique."
    ],
    conceptOverview: "In a rotated sorted array, the elements to the left of the pivot point are greater than elements to the right of the pivot point. We can use binary search to locate this inflection point.",
    patternRecognition: "**Pattern: Inflection Point Binary Search**\n\nCompare `nums[mid]` with `nums[right]`. If `nums[mid] > nums[right]`, the min is in the right half; else, it is in the left half (including mid).",
    sampleTests: [
      {
        "name": "Pivot in middle",
        "input": [
          [
            3,
            4,
            5,
            1,
            2
          ]
        ],
        "expected": 1
      },
      {
        "name": "Pivot on right",
        "input": [
          [
            4,
            5,
            6,
            7,
            0,
            1,
            2
          ]
        ],
        "expected": 0
      }
    ],
    starterCode: "/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction findMin(nums) {\n  // Write your solution here\n}",
    hints: [
      "Compare `nums[mid]` with `nums[right]`.",
      "If `nums[mid] > nums[right]`, the minimum must be to the right of `mid`.",
      "Otherwise, the minimum is at `mid` or to its left."
    ],
    bruteForceSolution: {
      code: "function findMin(nums) {\n  let min = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    if (nums[i] < min) min = nums[i];\n  }\n  return min;\n}",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      explanation: "Linear search of the minimum."
    },
    optimizedSolution: {
      code: "function findMin(nums) {\n  let left = 0;\n  let right = nums.length - 1;\n  while (left < right) {\n    const mid = Math.floor((left + right) / 2);\n    if (nums[mid] > nums[right]) {\n      left = mid + 1;\n    } else {\n      right = mid;\n    }\n  }\n  return nums[left];\n}",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      explanation: "Binary search comparing mid and right."
    },
    interviewExplanation: "1. Compares middle with right boundary to identify sorted direction\n2. Cuts search space in half based on inflection pivot\n3. Runs in logarithmic O(log n) time",
    tests: [
      { name: "Pivot in middle", validate: (code) => { try { return new Function(`${code}; return findMin([3,4,5,1,2]);`)() === 1; } catch { return false; } } },
      { name: "Pivot on right", validate: (code) => { try { return new Function(`${code}; return findMin([4,5,6,7,0,1,2]);`)() === 0; } catch { return false; } } }
    ]
  },
  {
    id: "time-based-kv", number: 38, title: "Time Based Key-Value Store", difficulty: "Medium",
    topics: ["binary-search","hash-map"],
    companies: ["Netflix","Google","Amazon","Stripe"],
    acceptance: 53, xp: 20,
    problemStatement: "Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.\n\nImplement the `TimeMap` class:\n- `TimeMap()` Initializes the object.\n- `void set(String key, String value, int timestamp)` Stores the key `key` with the value `value` at the given time `timestamp`.\n- `String get(String key, int timestamp)` Returns a value such that `set` was called previously, with `timestamp_prev <= timestamp`. If there are multiple such values, it returns the value associated with the largest `timestamp_prev`. If there are no such values, it returns `\"\"`.",
    examples: [
      {
        "input": "[\"TimeMap\",\"set\",\"get\",\"get\",\"set\",\"get\",\"get\"], [[],[\"foo\",\"bar\",1],[\"foo\",1],[\"foo\",3],[\"foo\",\"bar2\",4],[\"foo\",4],[\"foo\",5]]",
        "output": "[null,null,\"bar\",\"bar\",null,\"bar2\",\"bar2\"]"
      }
    ],
    constraints: [
      "1 <= key.length, value.length <= 100",
      "key and value consist of lowercase English letters and digits.",
      "1 <= timestamp <= 10^7",
      "All timestamps in set are strictly increasing.",
      "At most 2 * 10^5 calls will be made to set and get."
    ],
    conceptOverview: "Timestamps are added in strictly increasing order during `set()`. This means values for a key are sorted by timestamp, allowing binary search during `get()` to find the closest smaller or equal timestamp.",
    patternRecognition: "**Pattern: Timestamp Sorting Binary Search**\n\nUse a hash map of arrays. Since arrays are sorted by timestamp, use binary search to locate the floor timestamp.",
    sampleTests: [],
    starterCode: "class TimeMap {\n  constructor() {\n    this.map = new Map();\n  }\n  \n  set(key, value, timestamp) {\n    // Write set logic here\n  }\n  \n  get(key, timestamp) {\n    // Write get logic here\n  }\n}",
    hints: [
      "Use a Map to associate key with a list of [value, timestamp] pairs.",
      "Since timestamps are sorted, use binary search during get().",
      "Look for the greatest timestamp less than or equal to the target timestamp."
    ],
    bruteForceSolution: {
      code: "class TimeMap {\n  constructor() {\n    this.map = new Map();\n  }\n  set(key, value, timestamp) {\n    if (!this.map.has(key)) this.map.set(key, []);\n    this.map.get(key).push({ value, timestamp });\n  }\n  get(key, timestamp) {\n    const arr = this.map.get(key) || [];\n    for (let i = arr.length - 1; i >= 0; i--) {\n      if (arr[i].timestamp <= timestamp) return arr[i].value;\n    }\n    return '';\n  }\n}",
      timeComplexity: "O(n) per get",
      spaceComplexity: "O(n)",
      explanation: "Linear scan from right to left in get."
    },
    optimizedSolution: {
      code: "class TimeMap {\n  constructor() {\n    this.map = new Map();\n  }\n  set(key, value, timestamp) {\n    if (!this.map.has(key)) this.map.set(key, []);\n    this.map.get(key).push({ value, timestamp });\n  }\n  get(key, timestamp) {\n    const arr = this.map.get(key) || [];\n    let left = 0;\n    let right = arr.length - 1;\n    let ans = '';\n    while (left <= right) {\n      const mid = Math.floor((left + right) / 2);\n      if (arr[mid].timestamp <= timestamp) {\n        ans = arr[mid].value;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n    return ans;\n  }\n}",
      timeComplexity: "O(log n) per get",
      spaceComplexity: "O(n)",
      explanation: "Binary search on timestamp values."
    },
    interviewExplanation: "1. Store timestamp array for each key\n2. Note that timestamps are sorted, which permits O(log n) search\n3. Use binary search to find floor key timestamp",
    tests: [
      { name: "Basic Set and Get", validate: (code) => { try { return new Function(`${code}; const tm = new TimeMap(); tm.set("foo", "bar", 1); return tm.get("foo", 1);`)() === "bar"; } catch { return false; } } },
      { name: "Get with timestamp history", validate: (code) => { try { return new Function(`${code}; const tm = new TimeMap(); tm.set("foo", "bar", 1); tm.set("foo", "bar2", 4); return tm.get("foo", 3);`)() === "bar"; } catch { return false; } } }
    ]
  },
  {
    id: "median-two-sorted", number: 40, title: "Median of Two Sorted Arrays", difficulty: "Hard",
    topics: ["binary-search","arrays"],
    companies: ["Google","Amazon","Meta","Microsoft"],
    acceptance: 40, xp: 30,
    problemStatement: "Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be `O(log (m+n))`.",
    examples: [
      {
        "input": "nums1 = [1,3], nums2 = [2]",
        "output": "2.0"
      },
      {
        "input": "nums1 = [1,2], nums2 = [3,4]",
        "output": "2.5"
      }
    ],
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 ≤ m, n ≤ 1000",
      "1 ≤ m + n ≤ 2000",
      "-10⁶ ≤ nums1[i], nums2[i] ≤ 10⁶"
    ],
    conceptOverview: "To achieve O(log(min(m, n))) time complexity, we partition both arrays such that the left halves of both arrays contain the same number of elements as the right halves, and all elements in the left halves are smaller than or equal to elements in the right halves.",
    patternRecognition: "**Pattern: Array Partitioning Binary Search**\n\nPerform binary search on the smaller array to find a partition index `i`. Compute partition index `j` for the second array. Validate partitioning condition.",
    sampleTests: [
      {
        "name": "Odd length sum",
        "input": [
          [
            1,
            3
          ],
          [
            2
          ]
        ],
        "expected": 2
      },
      {
        "name": "Even length sum",
        "input": [
          [
            1,
            2
          ],
          [
            3,
            4
          ]
        ],
        "expected": 2.5
      }
    ],
    starterCode: "/**\n * @param {number[]} nums1\n * @param {number[]} nums2\n * @return {number}\n */\nfunction findMedianSortedArrays(nums1, nums2) {\n  // Write your solution here\n}",
    hints: [
      "Partition the smaller array at index `i`.",
      "The corresponding partition in the larger array will be `j = Math.floor((m + n + 1) / 2) - i`.",
      "Ensure that left elements are less than or equal to right elements across both arrays."
    ],
    bruteForceSolution: {
      code: "function findMedianSortedArrays(nums1, nums2) {\n  const merged = [...nums1, ...nums2].sort((a, b) => a - b);\n  const mid = Math.floor(merged.length / 2);\n  if (merged.length % 2 !== 0) return merged[mid];\n  return (merged[mid - 1] + merged[mid]) / 2;\n}",
      timeComplexity: "O((m + n) log(m + n))",
      spaceComplexity: "O(m + n)",
      explanation: "Merge and sort."
    },
    optimizedSolution: {
      code: "function findMedianSortedArrays(nums1, nums2) {\n  if (nums1.length > nums2.length) {\n    return findMedianSortedArrays(nums2, nums1);\n  }\n  const m = nums1.length;\n  const n = nums2.length;\n  let left = 0, right = m;\n  while (left <= right) {\n    const i = Math.floor((left + right) / 2);\n    const j = Math.floor((m + n + 1) / 2) - i;\n    \n    const maxLeft1 = i === 0 ? -Infinity : nums1[i - 1];\n    const minRight1 = i === m ? Infinity : nums1[i];\n    \n    const maxLeft2 = j === 0 ? -Infinity : nums2[j - 1];\n    const minRight2 = j === n ? Infinity : nums2[j];\n    \n    if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {\n      if ((m + n) % 2 === 1) {\n        return Math.max(maxLeft1, maxLeft2);\n      }\n      return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;\n    } else if (maxLeft1 > minRight2) {\n      right = i - 1;\n    } else {\n      left = i + 1;\n    }\n  }\n  return 0.0;\n}",
      timeComplexity: "O(log(min(m, n)))",
      spaceComplexity: "O(1)",
      explanation: "Binary search on partitioning index."
    },
    interviewExplanation: "1. Ensures O(log(min(m, n))) by partition binary search\n2. Partition splits both arrays into left and right halves\n3. Verifies alignment boundary conditions via limits",
    tests: [
      { name: "Odd length sum", validate: (code) => { try { return new Function(`${code}; return findMedianSortedArrays([1,3], [2]);`)() === 2; } catch { return false; } } },
      { name: "Even length sum", validate: (code) => { try { return new Function(`${code}; return findMedianSortedArrays([1,2], [3,4]);`)() === 2.5; } catch { return false; } } }
    ]
  },
  {
    id: "linked-list-cycle", number: 46, title: "Linked List Cycle", difficulty: "Easy",
    topics: ["linked-list", "two-pointers"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Bloomberg"],
    acceptance: 48, xp: 15,
    problemStatement: "Given the `head` of a linked list, determine if the linked list has a cycle in it. `pos` denotes the index the tail connects back to (`-1` means no cycle). Return `true` if there is a cycle, or `false` otherwise.",
    examples: [
      { input: "values = [3,2,0,-4], pos = 1", output: "true" },
      { input: "values = [1], pos = -1", output: "false" },
    ],
    constraints: ["The number of nodes is in the range [0, 10⁴]", "-10⁵ ≤ Node.val ≤ 10⁵"],
    conceptOverview: "Linked List Cycle is the canonical Floyd's cycle detection problem, using two pointers moving at different speeds to detect a loop in O(1) space.",
    patternRecognition: "**Pattern: Fast & Slow Pointers**\n\nMove one pointer one step at a time and another two steps at a time. If they ever meet, there's a cycle; if the fast pointer reaches the end, there isn't.",
    sampleTests: [
      { name: "Example 1", input: [[3, 2, 0, -4], 1], expected: true },
      { name: "No cycle", input: [[1], -1], expected: false },
    ],
    starterCode: "class ListNode {\n  constructor(val, next = null) { this.val = val; this.next = next; }\n}\nfunction buildList(values, pos) {\n  if (!values.length) return null;\n  const nodes = values.map(v => new ListNode(v));\n  for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1];\n  if (pos !== -1) nodes[nodes.length - 1].next = nodes[pos];\n  return nodes[0];\n}\n/**\n * @param {number[]} values\n * @param {number} pos\n * @return {boolean}\n */\nfunction hasCycle(values, pos) {\n  const head = buildList(values, pos);\n  // Write your solution here\n}",
    hints: ["Use two pointers moving at different speeds.", "If they ever meet, there's a cycle.", "If the fast pointer reaches null, there's no cycle."],
    bruteForceSolution: { code: "// A visited Set works but uses O(n) space\nfunction hasCycle(values, pos) {\n  const head = buildList(values, pos);\n  const seen = new Set();\n  let curr = head;\n  while (curr) {\n    if (seen.has(curr)) return true;\n    seen.add(curr);\n    curr = curr.next;\n  }\n  return false;\n}", timeComplexity: "O(n)", spaceComplexity: "O(n)", explanation: "Track visited nodes in a Set." },
    optimizedSolution: { code: "function hasCycle(values, pos) {\n  const head = buildList(values, pos);\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) return true;\n  }\n  return false;\n}", timeComplexity: "O(n)", spaceComplexity: "O(1)", explanation: "Floyd's slow/fast pointer cycle detection." },
    interviewExplanation: "**How to explain:**\n1. Start with a visited Set — O(n) space\n2. Introduce Floyd's tortoise-and-hare for O(1) space\n3. Explain why the fast pointer must lap the slow one if a cycle exists\n4. Stopping condition: fast or fast.next becomes null",
    tests: [
      { name: "Detects cycle", validate: (code) => { try { return new Function(`${code}; return hasCycle([3,2,0,-4], 1);`)() === true; } catch { return false; } } },
      { name: "Detects no cycle", validate: (code) => { try { return new Function(`${code}; return hasCycle([1], -1);`)() === false; } catch { return false; } } },
    ],
  },
  {
    id: "reorder-list", number: 47, title: "Reorder List", difficulty: "Medium",
    topics: ["linked-list", "two-pointers"],
    companies: ["Amazon", "Meta", "Microsoft"],
    acceptance: 51, xp: 20,
    problemStatement: "Given the head of a singly linked list, reorder it to be on the form: `L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 -> ...`. You may not modify node values, only the nodes themselves.",
    examples: [
      { input: "values = [1,2,3,4]", output: "[1,4,2,3]" },
      { input: "values = [1,2,3,4,5]", output: "[1,5,2,4,3]" },
    ],
    constraints: ["The number of nodes is in the range [1, 5 × 10⁴]", "1 ≤ Node.val ≤ 1000"],
    conceptOverview: "Reorder List combines three linked-list fundamentals: finding the middle, reversing a sublist, and merging two lists by alternation.",
    patternRecognition: "**Pattern: Split, Reverse, Merge**\n\nFind the middle with slow/fast pointers, reverse the second half, then weave the two halves together node by node.",
    sampleTests: [
      { name: "Example 1", input: [[1, 2, 3, 4]], expected: [1, 4, 2, 3] },
      { name: "Example 2", input: [[1, 2, 3, 4, 5]], expected: [1, 5, 2, 4, 3] },
    ],
    starterCode: "class ListNode {\n  constructor(val, next = null) { this.val = val; this.next = next; }\n}\nfunction buildList(values) {\n  let head = null, tail = null;\n  for (const v of values) { const node = new ListNode(v); if (!head) head = node; else tail.next = node; tail = node; }\n  return head;\n}\nfunction toArray(head) {\n  const arr = []; let curr = head;\n  while (curr) { arr.push(curr.val); curr = curr.next; }\n  return arr;\n}\n/**\n * @param {number[]} values\n * @return {number[]}\n */\nfunction reorderList(values) {\n  const head = buildList(values);\n  // Write your solution here, then return toArray(head)\n}",
    hints: ["Find the middle of the list with slow/fast pointers.", "Reverse the second half in place.", "Merge the two halves by alternating nodes."],
    bruteForceSolution: { code: "// Copying values into an array and rebuilding by index also works but isn't true pointer manipulation\nfunction reorderList(values) {\n  const head = buildList(values);\n  const arr = toArray(head);\n  const result = [];\n  let left = 0, right = arr.length - 1;\n  while (left <= right) {\n    result.push(arr[left++]);\n    if (left <= right) result.push(arr[right--]);\n  }\n  return result;\n}", timeComplexity: "O(n)", spaceComplexity: "O(n)", explanation: "Use an array and two pointers to build the reordered sequence." },
    optimizedSolution: { code: "function reorderList(values) {\n  const head = buildList(values);\n  if (!head || !head.next) return toArray(head);\n  let slow = head, fast = head;\n  while (fast.next && fast.next.next) { slow = slow.next; fast = fast.next.next; }\n  let second = slow.next;\n  slow.next = null;\n  let prev = null;\n  while (second) { const next = second.next; second.next = prev; prev = second; second = next; }\n  let first = head, secondHead = prev;\n  while (secondHead) {\n    const n1 = first.next, n2 = secondHead.next;\n    first.next = secondHead;\n    secondHead.next = n1;\n    first = n1; secondHead = n2;\n  }\n  return toArray(head);\n}", timeComplexity: "O(n)", spaceComplexity: "O(1)", explanation: "Split, reverse the second half, and merge in place." },
    interviewExplanation: "1. An array-based rebuild is simple but uses O(n) extra space\n2. True O(1) space: find middle, reverse second half, merge alternately\n3. Careful pointer bookkeeping is needed during the merge step\n4. Handle odd/even length lists (middle node ends up last in first half)",
    tests: [
      { name: "Reorders even-length list", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return reorderList([1,2,3,4]);`)()) === JSON.stringify([1, 4, 2, 3]); } catch { return false; } } },
      { name: "Reorders odd-length list", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return reorderList([1,2,3,4,5]);`)()) === JSON.stringify([1, 5, 2, 4, 3]); } catch { return false; } } },
    ],
  },
  {
    id: "remove-nth-node-from-end", number: 49, title: "Remove Nth Node From End of List", difficulty: "Medium",
    topics: ["linked-list", "two-pointers"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"],
    acceptance: 44, xp: 20,
    problemStatement: "Given the `head` of a linked list, remove the `n`th node from the end of the list and return its head.",
    examples: [
      { input: "values = [1,2,3,4,5], n = 2", output: "[1,2,3,5]" },
      { input: "values = [1], n = 1", output: "[]" },
    ],
    constraints: ["The number of nodes is in the range [1, 30]", "0 ≤ Node.val ≤ 100", "1 ≤ n ≤ size of the list"],
    conceptOverview: "Remove Nth Node From End tests the two-pointer gap technique to locate a position relative to the end in a single pass, without knowing the list's length up front.",
    patternRecognition: "**Pattern: Two Pointers with a Fixed Gap**\n\nAdvance one pointer n steps ahead first, then move both together — when the lead pointer hits the end, the trailing pointer is positioned exactly at the target.",
    sampleTests: [
      { name: "Example 1", input: [[1, 2, 3, 4, 5], 2], expected: [1, 2, 3, 5] },
      { name: "Example 2", input: [[1], 1], expected: [] },
    ],
    starterCode: "class ListNode {\n  constructor(val, next = null) { this.val = val; this.next = next; }\n}\nfunction buildList(values) {\n  let head = null, tail = null;\n  for (const v of values) { const node = new ListNode(v); if (!head) head = node; else tail.next = node; tail = node; }\n  return head;\n}\nfunction toArray(head) {\n  const arr = []; let curr = head;\n  while (curr) { arr.push(curr.val); curr = curr.next; }\n  return arr;\n}\n/**\n * @param {number[]} values\n * @param {number} n\n * @return {number[]}\n */\nfunction removeNthFromEnd(values, n) {\n  const head = buildList(values);\n  // Write your solution here, then return toArray(newHead)\n}",
    hints: ["Use a dummy node before the head to simplify removing the true head.", "Advance a fast pointer n steps ahead of a slow pointer.", "Move both forward together until fast reaches the last node."],
    bruteForceSolution: { code: "// Two passes: first count the length, then walk to the node before the target\nfunction removeNthFromEnd(values, n) {\n  const dummy = new ListNode(0, buildList(values));\n  let length = 0;\n  let curr = dummy.next;\n  while (curr) { length++; curr = curr.next; }\n  let prev = dummy;\n  for (let i = 0; i < length - n; i++) prev = prev.next;\n  prev.next = prev.next.next;\n  return toArray(dummy.next);\n}", timeComplexity: "O(n)", spaceComplexity: "O(1)", explanation: "Count the length first, then remove in a second pass." },
    optimizedSolution: { code: "function removeNthFromEnd(values, n) {\n  const dummy = new ListNode(0, buildList(values));\n  let fast = dummy, slow = dummy;\n  for (let i = 0; i < n; i++) fast = fast.next;\n  while (fast.next) { fast = fast.next; slow = slow.next; }\n  slow.next = slow.next.next;\n  return toArray(dummy.next);\n}", timeComplexity: "O(n)", spaceComplexity: "O(1)", explanation: "Single pass with a fixed-gap two-pointer technique." },
    interviewExplanation: "1. Two-pass approach counts length then removes — simple but two traversals\n2. One-pass approach keeps a fixed gap of n between two pointers\n3. A dummy node before head simplifies removing the actual head node\n4. When fast reaches the last node, slow is right before the node to remove",
    tests: [
      { name: "Removes from middle", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return removeNthFromEnd([1,2,3,4,5], 2);`)()) === JSON.stringify([1, 2, 3, 5]); } catch { return false; } } },
      { name: "Removes only node", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return removeNthFromEnd([1], 1);`)()) === JSON.stringify([]); } catch { return false; } } },
    ],
  },
  {
    id: "copy-list-with-random-pointer", number: 50, title: "Copy List with Random Pointer", difficulty: "Medium",
    topics: ["linked-list", "hash-map"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Bloomberg"],
    acceptance: 53, xp: 25,
    problemStatement: "A linked list of length `n` has each node containing an extra random pointer, which could point to any node in the list or `null`. Construct a **deep copy** of the list.\n\nThe list is given as an array of `[val, random_index]` pairs (random_index is `null` if the random pointer is null). Return the deep copy encoded the same way.",
    examples: [
      { input: "pairs = [[7,null],[13,0],[11,4],[10,2],[1,0]]", output: "[[7,null],[13,0],[11,4],[10,2],[1,0]]" },
      { input: "pairs = [[1,1],[2,1]]", output: "[[1,1],[2,1]]" },
    ],
    constraints: ["0 ≤ n ≤ 1000", "-10⁴ ≤ Node.val ≤ 10⁴"],
    conceptOverview: "Copy List with Random Pointer tests hash-map-based deep copying when a structure has more than one kind of pointer to replicate.",
    patternRecognition: "**Pattern: Hash Map Deep Copy**\n\nMap each original node to a newly created copy in one pass, then in a second pass wire up each copy's next/random pointers using the map.",
    sampleTests: [
      { name: "Example 1", input: [[[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]], expected: [[7, null], [13, 0], [11, 4], [10, 2], [1, 0]] },
      { name: "Example 2", input: [[[1, 1], [2, 1]]], expected: [[1, 1], [2, 1]] },
    ],
    starterCode: "class Node {\n  constructor(val, next = null, random = null) { this.val = val; this.next = next; this.random = random; }\n}\nfunction buildList(pairs) {\n  if (!pairs.length) return null;\n  const nodes = pairs.map(([v]) => new Node(v));\n  for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1];\n  pairs.forEach(([, r], i) => { if (r !== null) nodes[i].random = nodes[r]; });\n  return nodes[0];\n}\nfunction toPairs(head) {\n  const nodes = []; let curr = head;\n  while (curr) { nodes.push(curr); curr = curr.next; }\n  const indexOf = new Map(nodes.map((n, i) => [n, i]));\n  return nodes.map(n => [n.val, n.random ? indexOf.get(n.random) : null]);\n}\n/**\n * @param {Array} pairs\n * @return {Array}\n */\nfunction copyRandomList(pairs) {\n  const head = buildList(pairs);\n  // Write your solution here, then return toPairs(copiedHead)\n}",
    hints: ["Use a hash map from original node to its copy.", "First pass: create a copy of each node's value only.", "Second pass: wire up each copy's next and random using the map."],
    bruteForceSolution: { code: "// Without a map, you'd need to search the list for random's index each time - O(n^2)\nfunction copyRandomList(pairs) {\n  const head = buildList(pairs);\n  if (!head) return [];\n  const nodes = []; let curr = head;\n  while (curr) { nodes.push(curr); curr = curr.next; }\n  const copies = nodes.map(n => new Node(n.val));\n  for (let i = 0; i < nodes.length - 1; i++) copies[i].next = copies[i + 1];\n  for (let i = 0; i < nodes.length; i++) {\n    if (nodes[i].random) copies[i].random = copies[nodes.indexOf(nodes[i].random)];\n  }\n  return toPairs(copies[0]);\n}", timeComplexity: "O(n²)", spaceComplexity: "O(n)", explanation: "Search for random's position with indexOf instead of a map." },
    optimizedSolution: { code: "function copyRandomList(pairs) {\n  const head = buildList(pairs);\n  if (!head) return [];\n  const map = new Map();\n  let curr = head;\n  while (curr) { map.set(curr, new Node(curr.val)); curr = curr.next; }\n  curr = head;\n  while (curr) {\n    map.get(curr).next = curr.next ? map.get(curr.next) : null;\n    map.get(curr).random = curr.random ? map.get(curr.random) : null;\n    curr = curr.next;\n  }\n  return toPairs(map.get(head));\n}", timeComplexity: "O(n)", spaceComplexity: "O(n)", explanation: "Hash map from original node to copy, filled in two passes." },
    interviewExplanation: "1. Naive approach searches for random's index — O(n²)\n2. Use a hash map from original node to its copy instead\n3. First pass creates copies (values only); second pass wires next/random\n4. The map makes random pointer lookups O(1)",
    tests: [
      { name: "Copies list with random pointers", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return copyRandomList([[7,null],[13,0],[11,4],[10,2],[1,0]]);`)()) === JSON.stringify([[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]); } catch { return false; } } },
      { name: "Handles empty list", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return copyRandomList([]);`)()) === JSON.stringify([]); } catch { return false; } } },
    ],
  },
  {
    id: "add-two-numbers", number: 51, title: "Add Two Numbers", difficulty: "Medium",
    topics: ["linked-list", "recursion"],
    companies: ["Amazon", "Microsoft", "Meta", "Adobe"],
    acceptance: 43, xp: 20,
    problemStatement: "You are given two non-empty linked lists representing two non-negative integers, with digits stored in **reverse order**. Add the two numbers and return the sum as a linked list, also in reverse order.",
    examples: [
      { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]", explanation: "342 + 465 = 807." },
      { input: "l1 = [0], l2 = [0]", output: "[0]" },
    ],
    constraints: ["The number of nodes in each list is in [1, 100]", "0 ≤ Node.val ≤ 9", "No leading zeros, unless the number itself is 0"],
    conceptOverview: "Add Two Numbers tests simulating elementary-school addition using linked lists, including carry propagation across differing list lengths.",
    patternRecognition: "**Pattern: Simultaneous List Walk with Carry**\n\nWalk both lists together (treating an exhausted list as digit 0), track a carry, and append `sum % 10` as each result digit.",
    sampleTests: [
      { name: "Example 1", input: [[2, 4, 3], [5, 6, 4]], expected: [7, 0, 8] },
      { name: "Example 2", input: [[0], [0]], expected: [0] },
    ],
    starterCode: "class ListNode {\n  constructor(val, next = null) { this.val = val; this.next = next; }\n}\nfunction buildList(values) {\n  let head = null, tail = null;\n  for (const v of values) { const node = new ListNode(v); if (!head) head = node; else tail.next = node; tail = node; }\n  return head;\n}\nfunction toArray(head) {\n  const arr = []; let curr = head;\n  while (curr) { arr.push(curr.val); curr = curr.next; }\n  return arr;\n}\n/**\n * @param {number[]} l1Values\n * @param {number[]} l2Values\n * @return {number[]}\n */\nfunction addTwoNumbers(l1Values, l2Values) {\n  let l1 = buildList(l1Values);\n  let l2 = buildList(l2Values);\n  // Write your solution here, then return toArray(resultHead)\n}",
    hints: ["Walk both lists together, treating a finished list as contributing 0.", "Track a running carry from each digit sum.", "Don't forget a possible extra carry digit at the very end."],
    bruteForceSolution: { code: "// Converting to actual numbers works but breaks for very large inputs beyond safe integer range\nfunction addTwoNumbers(l1Values, l2Values) {\n  const toNum = (arr) => arr.reduceRight((acc, d) => acc * 10 + d, 0);\n  const sum = toNum(l1Values) + toNum(l2Values);\n  return sum === 0 ? [0] : sum.toString().split('').reverse().map(Number);\n}", timeComplexity: "O(m + n)", spaceComplexity: "O(m + n)", explanation: "Convert both lists to numbers, add, and convert back (unsafe for huge numbers)." },
    optimizedSolution: { code: "function addTwoNumbers(l1Values, l2Values) {\n  let l1 = buildList(l1Values), l2 = buildList(l2Values);\n  const dummy = new ListNode(0);\n  let tail = dummy, carry = 0;\n  while (l1 || l2 || carry) {\n    const sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;\n    carry = Math.floor(sum / 10);\n    tail.next = new ListNode(sum % 10);\n    tail = tail.next;\n    if (l1) l1 = l1.next;\n    if (l2) l2 = l2.next;\n  }\n  return toArray(dummy.next);\n}", timeComplexity: "O(max(m, n))", spaceComplexity: "O(max(m, n))", explanation: "Digit-by-digit addition with carry, walking both lists together." },
    interviewExplanation: "1. Converting to numbers first breaks for arbitrarily large inputs\n2. Add digit by digit with carry, like manual addition\n3. Treat an exhausted list as contributing 0 so lists of different lengths work\n4. Append a final carry digit if one remains after both lists end",
    tests: [
      { name: "Adds basic numbers", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return addTwoNumbers([2,4,3], [5,6,4]);`)()) === JSON.stringify([7, 0, 8]); } catch { return false; } } },
      { name: "Handles carry overflow", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return addTwoNumbers([9,9,9,9,9,9,9], [9,9,9,9]);`)()) === JSON.stringify([8, 9, 9, 9, 0, 0, 0, 1]); } catch { return false; } } },
    ],
  },
  {
    id: "merge-k-sorted-lists", number: 52, title: "Merge k Sorted Lists", difficulty: "Hard",
    topics: ["linked-list", "heap", "recursion"],
    companies: ["Amazon", "Google", "Meta", "Microsoft"],
    acceptance: 47, xp: 30,
    problemStatement: "You are given an array of `k` linked lists, each sorted in ascending order. Merge all the linked lists into one sorted linked list and return it.",
    examples: [
      { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
      { input: "lists = []", output: "[]" },
    ],
    constraints: ["k == lists.length", "0 ≤ k ≤ 10⁴", "0 ≤ lists[i].length ≤ 500", "-10⁴ ≤ lists[i][j] ≤ 10⁴"],
    conceptOverview: "Merge k Sorted Lists extends Merge Two Sorted Lists to k lists, testing divide-and-conquer or heap-based merging to avoid O(k*n) repeated pairwise merges.",
    patternRecognition: "**Pattern: Divide and Conquer Merge**\n\nRepeatedly merge lists in pairs, halving the number of lists each round, until only one list remains — O(log k) rounds of O(n) work each.",
    sampleTests: [
      { name: "Example 1", input: [[[1, 4, 5], [1, 3, 4], [2, 6]]], expected: [1, 1, 2, 3, 4, 4, 5, 6] },
      { name: "Empty input", input: [[]], expected: [] },
    ],
    starterCode: "class ListNode {\n  constructor(val, next = null) { this.val = val; this.next = next; }\n}\nfunction buildList(values) {\n  let head = null, tail = null;\n  for (const v of values) { const node = new ListNode(v); if (!head) head = node; else tail.next = node; tail = node; }\n  return head;\n}\nfunction toArray(head) {\n  const arr = []; let curr = head;\n  while (curr) { arr.push(curr.val); curr = curr.next; }\n  return arr;\n}\n/**\n * @param {number[][]} lists\n * @return {number[]}\n */\nfunction mergeKLists(lists) {\n  const heads = lists.map(buildList);\n  // Write your solution here, then return toArray(mergedHead)\n}",
    hints: ["Merging lists one at a time into an accumulator is O(k*n) total.", "Instead, merge lists in pairs and repeat on the resulting half-sized set.", "Reuse a mergeTwoLists helper for each pairwise merge."],
    bruteForceSolution: { code: "function mergeTwoLists(a, b) {\n  const dummy = new ListNode(0);\n  let t = dummy;\n  while (a && b) { if (a.val <= b.val) { t.next = a; a = a.next; } else { t.next = b; b = b.next; } t = t.next; }\n  t.next = a || b;\n  return dummy.next;\n}\nfunction mergeKLists(lists) {\n  const heads = lists.map(buildList);\n  let result = null;\n  for (const head of heads) result = mergeTwoLists(result, head);\n  return toArray(result);\n}", timeComplexity: "O(k * n)", spaceComplexity: "O(1)", explanation: "Merge lists one at a time into a growing accumulator." },
    optimizedSolution: { code: "function mergeTwoLists(a, b) {\n  const dummy = new ListNode(0);\n  let t = dummy;\n  while (a && b) { if (a.val <= b.val) { t.next = a; a = a.next; } else { t.next = b; b = b.next; } t = t.next; }\n  t.next = a || b;\n  return dummy.next;\n}\nfunction mergeKLists(lists) {\n  let heads = lists.map(buildList);\n  if (heads.length === 0) return [];\n  while (heads.length > 1) {\n    const merged = [];\n    for (let i = 0; i < heads.length; i += 2) {\n      const l1 = heads[i];\n      const l2 = i + 1 < heads.length ? heads[i + 1] : null;\n      merged.push(mergeTwoLists(l1, l2));\n    }\n    heads = merged;\n  }\n  return toArray(heads[0]);\n}", timeComplexity: "O(n log k)", spaceComplexity: "O(log k) recursion/iteration state", explanation: "Merge lists in pairs, halving the count each round." },
    interviewExplanation: "1. Merging one list at a time into an accumulator is O(k*n)\n2. Merge lists in pairs instead, halving the list count each round\n3. This does O(log k) rounds, each doing O(n) total work — O(n log k)\n4. A min-heap of the k front nodes is an alternative achieving the same complexity",
    tests: [
      { name: "Merges three lists", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return mergeKLists([[1,4,5],[1,3,4],[2,6]]);`)()) === JSON.stringify([1, 1, 2, 3, 4, 4, 5, 6]); } catch { return false; } } },
      { name: "Handles empty input", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return mergeKLists([]);`)()) === JSON.stringify([]); } catch { return false; } } },
    ],
  },
  {
    id: "reverse-nodes-in-k-group", number: 53, title: "Reverse Nodes in k-Group", difficulty: "Hard",
    topics: ["linked-list"],
    companies: ["Amazon", "Microsoft", "Meta", "Google"],
    acceptance: 46, xp: 30,
    problemStatement: "Given the `head` of a linked list, reverse the nodes of the list `k` at a time, and return the modified list. If the number of nodes is not a multiple of `k`, the leftover nodes at the end should remain as they are. You may not alter node values, only the nodes themselves.",
    examples: [
      { input: "values = [1,2,3,4,5], k = 2", output: "[2,1,4,3,5]" },
      { input: "values = [1,2,3,4,5], k = 3", output: "[3,2,1,4,5]" },
    ],
    constraints: ["1 ≤ k ≤ n ≤ 5000", "0 ≤ Node.val ≤ 1000"],
    conceptOverview: "Reverse Nodes in k-Group generalizes Reverse Linked List: reverse fixed-size chunks in place, leaving any incomplete trailing chunk untouched.",
    patternRecognition: "**Pattern: Chunked In-Place Reversal**\n\nCheck a full group of k nodes exists before reversing it, using a pointer to the node before each group to reconnect reversed chunks correctly.",
    sampleTests: [
      { name: "Example 1", input: [[1, 2, 3, 4, 5], 2], expected: [2, 1, 4, 3, 5] },
      { name: "Example 2", input: [[1, 2, 3, 4, 5], 3], expected: [3, 2, 1, 4, 5] },
    ],
    starterCode: "class ListNode {\n  constructor(val, next = null) { this.val = val; this.next = next; }\n}\nfunction buildList(values) {\n  let head = null, tail = null;\n  for (const v of values) { const node = new ListNode(v); if (!head) head = node; else tail.next = node; tail = node; }\n  return head;\n}\nfunction toArray(head) {\n  const arr = []; let curr = head;\n  while (curr) { arr.push(curr.val); curr = curr.next; }\n  return arr;\n}\n/**\n * @param {number[]} values\n * @param {number} k\n * @return {number[]}\n */\nfunction reverseKGroup(values, k) {\n  const head = buildList(values);\n  // Write your solution here, then return toArray(newHead)\n}",
    hints: ["Use a pointer to the node just before each group.", "Confirm a full group of k nodes exists before reversing (walk ahead k steps).", "Reverse the group with the standard three-pointer technique, then reconnect it to groupPrev and the rest of the list."],
    bruteForceSolution: { code: "// Collecting all values, reversing in k-chunks, and rebuilding also works but sidesteps real pointer manipulation\nfunction reverseKGroup(values, k) {\n  const result = [];\n  for (let i = 0; i < values.length; i += k) {\n    const chunk = values.slice(i, i + k);\n    if (chunk.length === k) chunk.reverse();\n    result.push(...chunk);\n  }\n  return result;\n}", timeComplexity: "O(n)", spaceComplexity: "O(n)", explanation: "Reverse each full k-sized chunk of the array directly." },
    optimizedSolution: { code: "function reverseKGroup(values, k) {\n  const head = buildList(values);\n  function getKth(curr, steps) { while (curr && steps > 0) { curr = curr.next; steps--; } return curr; }\n  const dummy = new ListNode(0, head);\n  let groupPrev = dummy;\n  while (true) {\n    const kth = getKth(groupPrev, k);\n    if (!kth) break;\n    const groupNext = kth.next;\n    let prev = groupNext, curr = groupPrev.next;\n    while (curr !== groupNext) {\n      const tmp = curr.next;\n      curr.next = prev;\n      prev = curr;\n      curr = tmp;\n    }\n    const tmp = groupPrev.next;\n    groupPrev.next = kth;\n    groupPrev = tmp;\n  }\n  return toArray(dummy.next);\n}", timeComplexity: "O(n)", spaceComplexity: "O(1) extra space", explanation: "Reverse each full k-group in place, reconnecting via a groupPrev pointer." },
    interviewExplanation: "1. An array-based rebuild works but isn't true in-place pointer manipulation\n2. For each group, first verify k nodes exist by walking ahead\n3. Reverse the group in place with prev/curr pointers\n4. Reconnect the reversed group's tail to groupPrev, then advance groupPrev",
    tests: [
      { name: "Reverses in groups of 2", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return reverseKGroup([1,2,3,4,5], 2);`)()) === JSON.stringify([2, 1, 4, 3, 5]); } catch { return false; } } },
      { name: "Reverses in groups of 3", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return reverseKGroup([1,2,3,4,5], 3);`)()) === JSON.stringify([3, 2, 1, 4, 5]); } catch { return false; } } },
    ],
  },
  {
    id: "diameter-of-binary-tree", number: 54, title: "Diameter of Binary Tree", difficulty: "Easy",
    topics: ["trees"],
    companies: ["Amazon", "Meta", "Microsoft"],
    acceptance: 55, xp: 15,
    problemStatement: "Given the `root` of a binary tree, return the length of the diameter of the tree — the length (in edges) of the longest path between any two nodes, which may or may not pass through the root.",
    examples: [
      { input: "root = [1,2,3,4,5]", output: "3" },
      { input: "root = [1,2]", output: "1" },
    ],
    constraints: ["The number of nodes is in the range [1, 10⁴]", "-100 ≤ Node.val ≤ 100"],
    conceptOverview: "Diameter of Binary Tree tests combining depth computation with a global running maximum in a single post-order pass.",
    patternRecognition: "**Pattern: Post-Order Depth with Side Effect**\n\nCompute each subtree's depth recursively, and while doing so, update a running max diameter using the sum of left and right depths at every node.",
    sampleTests: [
      { name: "Example 1", input: [[1, 2, 3, 4, 5]], expected: 3 },
      { name: "Example 2", input: [[1, 2]], expected: 1 },
    ],
    starterCode: "class TreeNode {\n  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }\n}\nfunction buildTree(values) {\n  if (!values.length || values[0] === null) return null;\n  const root = new TreeNode(values[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length && i < values.length) {\n    const node = queue.shift();\n    if (i < values.length) { const lv = values[i++]; if (lv !== null) { node.left = new TreeNode(lv); queue.push(node.left); } }\n    if (i < values.length) { const rv = values[i++]; if (rv !== null) { node.right = new TreeNode(rv); queue.push(node.right); } }\n  }\n  return root;\n}\n/**\n * @param {number[]} values\n * @return {number}\n */\nfunction diameterOfBinaryTree(values) {\n  const root = buildTree(values);\n  // Write your solution here\n}",
    hints: ["Compute depth recursively: 1 + max(left depth, right depth).", "Track a running max of (left depth + right depth) at every node.", "The diameter is the largest such sum found anywhere in the tree."],
    bruteForceSolution: { code: "// Recomputing depth from scratch for every node is much slower\nfunction depthOf(node) { if (!node) return 0; return 1 + Math.max(depthOf(node.left), depthOf(node.right)); }\nfunction diameterOfBinaryTree(values) {\n  const root = buildTree(values);\n  let diameter = 0;\n  function visit(node) {\n    if (!node) return;\n    diameter = Math.max(diameter, depthOf(node.left) + depthOf(node.right));\n    visit(node.left);\n    visit(node.right);\n  }\n  visit(root);\n  return diameter;\n}", timeComplexity: "O(n²)", spaceComplexity: "O(h)", explanation: "Recompute depth independently at every node." },
    optimizedSolution: { code: "class TreeNode {\n  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }\n}\nfunction buildTree(values) {\n  if (!values.length || values[0] === null) return null;\n  const root = new TreeNode(values[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length && i < values.length) {\n    const node = queue.shift();\n    if (i < values.length) { const lv = values[i++]; if (lv !== null) { node.left = new TreeNode(lv); queue.push(node.left); } }\n    if (i < values.length) { const rv = values[i++]; if (rv !== null) { node.right = new TreeNode(rv); queue.push(node.right); } }\n  }\n  return root;\n}\nfunction diameterOfBinaryTree(values) {\n  const root = buildTree(values);\n  let diameter = 0;\n  function depth(node) {\n    if (!node) return 0;\n    const l = depth(node.left), r = depth(node.right);\n    diameter = Math.max(diameter, l + r);\n    return 1 + Math.max(l, r);\n  }\n  depth(root);\n  return diameter;\n}", timeComplexity: "O(n)", spaceComplexity: "O(h)", explanation: "Single post-order pass computes depth and updates the diameter simultaneously." },
    interviewExplanation: "1. Naive: recompute depth for every node — O(n²)\n2. Optimize: compute depth once per node in a single post-order pass\n3. Update a running max diameter as a side effect while computing depth\n4. Return the depth upward so parents can keep combining",
    tests: [
      { name: "Returns correct diameter", validate: (code) => { try { return new Function(`${code}; return diameterOfBinaryTree([1,2,3,4,5]);`)() === 3; } catch { return false; } } },
      { name: "Handles two-node tree", validate: (code) => { try { return new Function(`${code}; return diameterOfBinaryTree([1,2]);`)() === 1; } catch { return false; } } },
    ],
  },
  {
    id: "balanced-binary-tree", number: 55, title: "Balanced Binary Tree", difficulty: "Easy",
    topics: ["trees"],
    companies: ["Amazon", "Google", "Meta"],
    acceptance: 51, xp: 15,
    problemStatement: "Given a binary tree, determine if it is height-balanced: a binary tree in which the depth of the two subtrees of every node never differs by more than one.",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "true" },
      { input: "root = [1,2,2,3,3,null,null,4,4]", output: "false" },
    ],
    constraints: ["The number of nodes is in the range [0, 5000]", "-10⁴ ≤ Node.val ≤ 10⁴"],
    conceptOverview: "Balanced Binary Tree tests short-circuiting a post-order height computation as soon as an imbalance is detected anywhere in the tree.",
    patternRecognition: "**Pattern: Post-Order Height with Early Exit**\n\nCompute height bottom-up; the moment any subtree's left/right height differ by more than 1, propagate a failure signal instead of continuing to compute meaningless heights.",
    sampleTests: [
      { name: "Example 1", input: [[3, 9, 20, null, null, 15, 7]], expected: true },
      { name: "Example 2", input: [[1, 2, 2, 3, 3, null, null, 4, 4]], expected: false },
    ],
    starterCode: "class TreeNode {\n  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }\n}\nfunction buildTree(values) {\n  if (!values.length || values[0] === null) return null;\n  const root = new TreeNode(values[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length && i < values.length) {\n    const node = queue.shift();\n    if (i < values.length) { const lv = values[i++]; if (lv !== null) { node.left = new TreeNode(lv); queue.push(node.left); } }\n    if (i < values.length) { const rv = values[i++]; if (rv !== null) { node.right = new TreeNode(rv); queue.push(node.right); } }\n  }\n  return root;\n}\n/**\n * @param {number[]} values\n * @return {boolean}\n */\nfunction isBalanced(values) {\n  const root = buildTree(values);\n  // Write your solution here\n}",
    hints: ["Compute height recursively.", "Track whether any imbalance (|leftHeight - rightHeight| > 1) has been found.", "Short-circuit once an imbalance is found instead of doing unnecessary extra work."],
    bruteForceSolution: { code: "// Recomputing height from scratch at every node is O(n^2)\nfunction heightOf(node) { if (!node) return 0; return 1 + Math.max(heightOf(node.left), heightOf(node.right)); }\nfunction isBalanced(values) {\n  const root = buildTree(values);\n  function check(node) {\n    if (!node) return true;\n    if (Math.abs(heightOf(node.left) - heightOf(node.right)) > 1) return false;\n    return check(node.left) && check(node.right);\n  }\n  return check(root);\n}", timeComplexity: "O(n²)", spaceComplexity: "O(h)", explanation: "Recompute height at every node independently." },
    optimizedSolution: { code: "class TreeNode {\n  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }\n}\nfunction buildTree(values) {\n  if (!values.length || values[0] === null) return null;\n  const root = new TreeNode(values[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length && i < values.length) {\n    const node = queue.shift();\n    if (i < values.length) { const lv = values[i++]; if (lv !== null) { node.left = new TreeNode(lv); queue.push(node.left); } }\n    if (i < values.length) { const rv = values[i++]; if (rv !== null) { node.right = new TreeNode(rv); queue.push(node.right); } }\n  }\n  return root;\n}\nfunction isBalanced(values) {\n  const root = buildTree(values);\n  let balanced = true;\n  function height(node) {\n    if (!node) return 0;\n    const l = height(node.left), r = height(node.right);\n    if (Math.abs(l - r) > 1) balanced = false;\n    return 1 + Math.max(l, r);\n  }\n  height(root);\n  return balanced;\n}", timeComplexity: "O(n)", spaceComplexity: "O(h)", explanation: "Single post-order pass, flagging imbalance as a side effect." },
    interviewExplanation: "1. Naive: recompute height at every node — O(n²)\n2. Compute height bottom-up once, flagging imbalance via a shared variable\n3. Every node's height is still needed by its parent, so full traversal happens once\n4. Result is the balanced flag after the traversal completes",
    tests: [
      { name: "Detects balanced tree", validate: (code) => { try { return new Function(`${code}; return isBalanced([3,9,20,null,null,15,7]);`)() === true; } catch { return false; } } },
      { name: "Detects unbalanced tree", validate: (code) => { try { return new Function(`${code}; return isBalanced([1,2,2,3,3,null,null,4,4]);`)() === false; } catch { return false; } } },
    ],
  },
  {
    id: "same-tree", number: 56, title: "Same Tree", difficulty: "Easy",
    topics: ["trees"],
    companies: ["Amazon", "Microsoft", "Bloomberg"],
    acceptance: 58, xp: 10,
    problemStatement: "Given the roots of two binary trees `p` and `q`, check if they are the same or not. Two binary trees are the same if they are structurally identical and the nodes have the same values.",
    examples: [
      { input: "p = [1,2,3], q = [1,2,3]", output: "true" },
      { input: "p = [1,2], q = [1,null,2]", output: "false" },
    ],
    constraints: ["The number of nodes in both trees is in [0, 100]", "-10⁴ ≤ Node.val ≤ 10⁴"],
    conceptOverview: "Same Tree tests simple structural recursion: two trees match only if every corresponding pair of nodes matches, recursively.",
    patternRecognition: "**Pattern: Paired Recursion**\n\nCompare both trees node by node simultaneously: null/null matches, exactly one null fails, otherwise compare values and recurse into both left pairs and both right pairs.",
    sampleTests: [
      { name: "Example 1", input: [[1, 2, 3], [1, 2, 3]], expected: true },
      { name: "Example 2", input: [[1, 2], [1, null, 2]], expected: false },
    ],
    starterCode: "class TreeNode {\n  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }\n}\nfunction buildTree(values) {\n  if (!values.length || values[0] === null) return null;\n  const root = new TreeNode(values[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length && i < values.length) {\n    const node = queue.shift();\n    if (i < values.length) { const lv = values[i++]; if (lv !== null) { node.left = new TreeNode(lv); queue.push(node.left); } }\n    if (i < values.length) { const rv = values[i++]; if (rv !== null) { node.right = new TreeNode(rv); queue.push(node.right); } }\n  }\n  return root;\n}\n/**\n * @param {number[]} values1\n * @param {number[]} values2\n * @return {boolean}\n */\nfunction isSameTree(values1, values2) {\n  const p = buildTree(values1);\n  const q = buildTree(values2);\n  // Write your solution here\n}",
    hints: ["If both nodes are null, they match.", "If exactly one is null, or values differ, they don't match.", "Recurse into both left children and both right children."],
    bruteForceSolution: { code: "// Comparing serialized traversals also works but recursion is simpler and equally efficient\nfunction isSameTree(values1, values2) {\n  const p = buildTree(values1), q = buildTree(values2);\n  function serialize(node) { return node ? `${node.val}(${serialize(node.left)},${serialize(node.right)})` : 'null'; }\n  return serialize(p) === serialize(q);\n}", timeComplexity: "O(min(m, n))", spaceComplexity: "O(min(m, n))", explanation: "Serialize both trees and compare the resulting strings." },
    optimizedSolution: { code: "class TreeNode {\n  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }\n}\nfunction buildTree(values) {\n  if (!values.length || values[0] === null) return null;\n  const root = new TreeNode(values[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length && i < values.length) {\n    const node = queue.shift();\n    if (i < values.length) { const lv = values[i++]; if (lv !== null) { node.left = new TreeNode(lv); queue.push(node.left); } }\n    if (i < values.length) { const rv = values[i++]; if (rv !== null) { node.right = new TreeNode(rv); queue.push(node.right); } }\n  }\n  return root;\n}\nfunction isSameTree(values1, values2) {\n  const p = buildTree(values1), q = buildTree(values2);\n  function same(x, y) {\n    if (!x && !y) return true;\n    if (!x || !y) return false;\n    return x.val === y.val && same(x.left, y.left) && same(x.right, y.right);\n  }\n  return same(p, q);\n}", timeComplexity: "O(min(m, n))", spaceComplexity: "O(min(m, n))", explanation: "Direct paired recursion without building intermediate strings." },
    interviewExplanation: "1. Direct recursive comparison of both trees simultaneously\n2. Base cases: both null (match), one null (mismatch)\n3. Compare current values, then recurse into left/right pairs\n4. Short-circuits as soon as any mismatch is found",
    tests: [
      { name: "Detects identical trees", validate: (code) => { try { return new Function(`${code}; return isSameTree([1,2,3], [1,2,3]);`)() === true; } catch { return false; } } },
      { name: "Detects structural difference", validate: (code) => { try { return new Function(`${code}; return isSameTree([1,2], [1,null,2]);`)() === false; } catch { return false; } } },
    ],
  },
  {
    id: "subtree-of-another-tree", number: 57, title: "Subtree of Another Tree", difficulty: "Easy",
    topics: ["trees"],
    companies: ["Amazon", "Meta", "Microsoft", "Google"],
    acceptance: 46, xp: 15,
    problemStatement: "Given the roots of two binary trees `root` and `subRoot`, return `true` if there is a subtree of `root` with the same structure and node values as `subRoot`.",
    examples: [
      { input: "root = [3,4,5,1,2], subRoot = [4,1,2]", output: "true" },
      { input: "root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]", output: "false" },
    ],
    constraints: ["The number of nodes in root is in [1, 2000]", "The number of nodes in subRoot is in [1, 1000]"],
    conceptOverview: "Subtree of Another Tree builds on Same Tree: check every node in `root` as a potential match point for `subRoot`.",
    patternRecognition: "**Pattern: Same-Tree Check at Every Node**\n\nDFS through `root`; at each node, test whether the subtree rooted there is structurally identical to `subRoot` using the Same Tree comparison.",
    sampleTests: [
      { name: "Example 1", input: [[3, 4, 5, 1, 2], [4, 1, 2]], expected: true },
      { name: "Example 2", input: [[3, 4, 5, 1, 2, null, null, null, null, 0], [4, 1, 2]], expected: false },
    ],
    starterCode: "class TreeNode {\n  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }\n}\nfunction buildTree(values) {\n  if (!values.length || values[0] === null) return null;\n  const root = new TreeNode(values[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length && i < values.length) {\n    const node = queue.shift();\n    if (i < values.length) { const lv = values[i++]; if (lv !== null) { node.left = new TreeNode(lv); queue.push(node.left); } }\n    if (i < values.length) { const rv = values[i++]; if (rv !== null) { node.right = new TreeNode(rv); queue.push(node.right); } }\n  }\n  return root;\n}\n/**\n * @param {number[]} rootValues\n * @param {number[]} subRootValues\n * @return {boolean}\n */\nfunction isSubtree(rootValues, subRootValues) {\n  const root = buildTree(rootValues);\n  const subRoot = buildTree(subRootValues);\n  // Write your solution here\n}",
    hints: ["Write a helper to check if two trees are identical (Same Tree logic).", "DFS through root, testing the same-tree check at every node.", "Return true as soon as any node's subtree matches subRoot."],
    bruteForceSolution: { code: "// Serializing both trees with unique markers and using substring search is a common alternative\nfunction serialize(node) { return node ? `#${node.val}(${serialize(node.left)})(${serialize(node.right)})` : '#null'; }\nfunction isSubtree(rootValues, subRootValues) {\n  const root = buildTree(rootValues), subRoot = buildTree(subRootValues);\n  return serialize(root).includes(serialize(subRoot));\n}", timeComplexity: "O(m + n)", spaceComplexity: "O(m + n)", explanation: "Serialize both trees and check if one string contains the other." },
    optimizedSolution: { code: "class TreeNode {\n  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }\n}\nfunction buildTree(values) {\n  if (!values.length || values[0] === null) return null;\n  const root = new TreeNode(values[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length && i < values.length) {\n    const node = queue.shift();\n    if (i < values.length) { const lv = values[i++]; if (lv !== null) { node.left = new TreeNode(lv); queue.push(node.left); } }\n    if (i < values.length) { const rv = values[i++]; if (rv !== null) { node.right = new TreeNode(rv); queue.push(node.right); } }\n  }\n  return root;\n}\nfunction isSubtree(rootValues, subRootValues) {\n  const root = buildTree(rootValues), subRoot = buildTree(subRootValues);\n  function same(a, b) {\n    if (!a && !b) return true;\n    if (!a || !b) return false;\n    return a.val === b.val && same(a.left, b.left) && same(a.right, b.right);\n  }\n  function dfs(node) {\n    if (!node) return false;\n    if (same(node, subRoot)) return true;\n    return dfs(node.left) || dfs(node.right);\n  }\n  return dfs(root);\n}", timeComplexity: "O(m * n)", spaceComplexity: "O(m + n)", explanation: "DFS through root, checking the same-tree condition at every node." },
    interviewExplanation: "1. Serialization + substring search is a clever alternative, but has string-matching edge cases\n2. Direct approach: reuse Same Tree logic at every node of root\n3. DFS visits every node once, calling same() at each — O(m*n) worst case\n4. Short-circuits as soon as a match is found",
    tests: [
      { name: "Finds matching subtree", validate: (code) => { try { return new Function(`${code}; return isSubtree([3,4,5,1,2], [4,1,2]);`)() === true; } catch { return false; } } },
      { name: "Rejects near-match", validate: (code) => { try { return new Function(`${code}; return isSubtree([3,4,5,1,2,null,null,null,null,0], [4,1,2]);`)() === false; } catch { return false; } } },
    ],
  },
  {
    id: "lowest-common-ancestor-bst", number: 59, title: "Lowest Common Ancestor of a Binary Search Tree", difficulty: "Medium",
    topics: ["trees", "binary-search"],
    companies: ["Amazon", "Meta", "Microsoft", "Google"],
    acceptance: 61, xp: 20,
    problemStatement: "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given values `p` and `q` in the BST.",
    examples: [
      { input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8", output: "6" },
      { input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4", output: "2" },
    ],
    constraints: ["The number of nodes is in the range [2, 10⁵]", "All Node.val are unique", "p and q exist in the BST"],
    conceptOverview: "Lowest Common Ancestor of a BST tests exploiting BST ordering to navigate directly to the split point instead of a general tree search.",
    patternRecognition: "**Pattern: BST Navigation**\n\nCompare both target values to the current node. If both are smaller, go left; if both are larger, go right; otherwise the current node is the split point.",
    sampleTests: [
      { name: "Example 1", input: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 8], expected: 6 },
      { name: "Example 2", input: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 4], expected: 2 },
    ],
    starterCode: "class TreeNode {\n  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }\n}\nfunction buildTree(values) {\n  if (!values.length || values[0] === null) return null;\n  const root = new TreeNode(values[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length && i < values.length) {\n    const node = queue.shift();\n    if (i < values.length) { const lv = values[i++]; if (lv !== null) { node.left = new TreeNode(lv); queue.push(node.left); } }\n    if (i < values.length) { const rv = values[i++]; if (rv !== null) { node.right = new TreeNode(rv); queue.push(node.right); } }\n  }\n  return root;\n}\n/**\n * @param {number[]} values\n * @param {number} p\n * @param {number} q\n * @return {number}\n */\nfunction lowestCommonAncestor(values, p, q) {\n  let root = buildTree(values);\n  // Write your solution here\n}",
    hints: ["Compare both p and q to the current node's value.", "If both are smaller, move left; if both are larger, move right.", "As soon as they split (or one equals the node), that node is the LCA."],
    bruteForceSolution: { code: "// Finding root-to-node paths for both values and comparing them also works\nfunction findPath(node, target, path) {\n  if (!node) return false;\n  path.push(node.val);\n  if (node.val === target) return true;\n  if (target < node.val) return findPath(node.left, target, path);\n  return findPath(node.right, target, path);\n}\nfunction lowestCommonAncestor(values, p, q) {\n  const root = buildTree(values);\n  const pathP = [], pathQ = [];\n  findPath(root, p, pathP);\n  findPath(root, q, pathQ);\n  let lca = pathP[0];\n  for (let i = 0; i < Math.min(pathP.length, pathQ.length); i++) {\n    if (pathP[i] === pathQ[i]) lca = pathP[i]; else break;\n  }\n  return lca;\n}", timeComplexity: "O(h)", spaceComplexity: "O(h)", explanation: "Build both root-to-target paths, then find where they diverge." },
    optimizedSolution: { code: "class TreeNode {\n  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }\n}\nfunction buildTree(values) {\n  if (!values.length || values[0] === null) return null;\n  const root = new TreeNode(values[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length && i < values.length) {\n    const node = queue.shift();\n    if (i < values.length) { const lv = values[i++]; if (lv !== null) { node.left = new TreeNode(lv); queue.push(node.left); } }\n    if (i < values.length) { const rv = values[i++]; if (rv !== null) { node.right = new TreeNode(rv); queue.push(node.right); } }\n  }\n  return root;\n}\nfunction lowestCommonAncestor(values, p, q) {\n  let root = buildTree(values);\n  while (root) {\n    if (p < root.val && q < root.val) root = root.left;\n    else if (p > root.val && q > root.val) root = root.right;\n    else return root.val;\n  }\n  return null;\n}", timeComplexity: "O(h)", spaceComplexity: "O(1)", explanation: "Iterative BST navigation directly toward the split point." },
    interviewExplanation: "1. Path-based approach works but uses extra space for two paths\n2. Exploit BST ordering: navigate directly using value comparisons\n3. Both smaller -> go left; both larger -> go right; otherwise stop\n4. Iterative version needs O(1) extra space",
    tests: [
      { name: "Finds LCA across subtrees", validate: (code) => { try { return new Function(`${code}; return lowestCommonAncestor([6,2,8,0,4,7,9,null,null,3,5], 2, 8);`)() === 6; } catch { return false; } } },
      { name: "Finds LCA within a subtree", validate: (code) => { try { return new Function(`${code}; return lowestCommonAncestor([6,2,8,0,4,7,9,null,null,3,5], 2, 4);`)() === 2; } catch { return false; } } },
    ],
  },
  {
    id: "binary-tree-level-order-traversal", number: 60, title: "Binary Tree Level Order Traversal", difficulty: "Medium",
    topics: ["trees"],
    companies: ["Amazon", "Meta", "Microsoft", "LinkedIn"],
    acceptance: 64, xp: 20,
    problemStatement: "Given the `root` of a binary tree, return the level order traversal of its nodes' values (left to right, level by level), as an array of arrays.",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
      { input: "root = [1]", output: "[[1]]" },
    ],
    constraints: ["The number of nodes is in the range [0, 2000]", "-1000 ≤ Node.val ≤ 1000"],
    conceptOverview: "Level Order Traversal is the canonical BFS-on-a-tree problem, processing one full level at a time using a queue snapshot.",
    patternRecognition: "**Pattern: BFS by Level**\n\nAt each iteration, capture the current queue size (that level's node count), process exactly that many nodes, and push their children for the next round.",
    sampleTests: [
      { name: "Example 1", input: [[3, 9, 20, null, null, 15, 7]], expected: [[3], [9, 20], [15, 7]] },
      { name: "Single node", input: [[1]], expected: [[1]] },
    ],
    starterCode: "class TreeNode {\n  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }\n}\nfunction buildTree(values) {\n  if (!values.length || values[0] === null) return null;\n  const root = new TreeNode(values[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length && i < values.length) {\n    const node = queue.shift();\n    if (i < values.length) { const lv = values[i++]; if (lv !== null) { node.left = new TreeNode(lv); queue.push(node.left); } }\n    if (i < values.length) { const rv = values[i++]; if (rv !== null) { node.right = new TreeNode(rv); queue.push(node.right); } }\n  }\n  return root;\n}\n/**\n * @param {number[]} values\n * @return {number[][]}\n */\nfunction levelOrder(values) {\n  const root = buildTree(values);\n  // Write your solution here\n}",
    hints: ["Use a queue starting with the root.", "At each iteration, capture the current queue size — that's the current level's node count.", "Process exactly that many nodes, collecting values and pushing children for the next level."],
    bruteForceSolution: { code: "// A DFS with depth tracking also works, appending to the depth-th array\nfunction levelOrder(values) {\n  const root = buildTree(values);\n  const result = [];\n  function dfs(node, depth) {\n    if (!node) return;\n    if (!result[depth]) result[depth] = [];\n    result[depth].push(node.val);\n    dfs(node.left, depth + 1);\n    dfs(node.right, depth + 1);\n  }\n  dfs(root, 0);\n  return result;\n}", timeComplexity: "O(n)", spaceComplexity: "O(n)", explanation: "DFS while tracking depth, grouping values by depth." },
    optimizedSolution: { code: "class TreeNode {\n  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }\n}\nfunction buildTree(values) {\n  if (!values.length || values[0] === null) return null;\n  const root = new TreeNode(values[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length && i < values.length) {\n    const node = queue.shift();\n    if (i < values.length) { const lv = values[i++]; if (lv !== null) { node.left = new TreeNode(lv); queue.push(node.left); } }\n    if (i < values.length) { const rv = values[i++]; if (rv !== null) { node.right = new TreeNode(rv); queue.push(node.right); } }\n  }\n  return root;\n}\nfunction levelOrder(values) {\n  const root = buildTree(values);\n  if (!root) return [];\n  const result = [];\n  let queue = [root];\n  while (queue.length) {\n    const level = [], next = [];\n    for (const node of queue) {\n      level.push(node.val);\n      if (node.left) next.push(node.left);\n      if (node.right) next.push(node.right);\n    }\n    result.push(level);\n    queue = next;\n  }\n  return result;\n}", timeComplexity: "O(n)", spaceComplexity: "O(n)", explanation: "Standard BFS, processing one level per iteration." },
    interviewExplanation: "1. DFS with depth tracking works but is less intuitive for 'by level' output\n2. BFS naturally processes nodes in level order\n3. Snapshot the queue size before processing to know where a level ends\n4. Push children into a fresh array for the next level",
    tests: [
      { name: "Returns correct levels", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return levelOrder([3,9,20,null,null,15,7]);`)()) === JSON.stringify([[3], [9, 20], [15, 7]]); } catch { return false; } } },
      { name: "Handles single node", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return levelOrder([1]);`)()) === JSON.stringify([[1]]); } catch { return false; } } },
    ],
  },
  {
    id: "binary-tree-right-side-view", number: 61, title: "Binary Tree Right Side View", difficulty: "Medium",
    topics: ["trees"],
    companies: ["Amazon", "Meta", "Microsoft", "Google"],
    acceptance: 60, xp: 20,
    problemStatement: "Given the `root` of a binary tree, imagine standing on its right side. Return the values of the nodes visible from the right, ordered top to bottom.",
    examples: [
      { input: "root = [1,2,3,null,5,null,4]", output: "[1,3,4]" },
      { input: "root = [1,null,3]", output: "[1,3]" },
    ],
    constraints: ["The number of nodes is in the range [0, 100]", "-100 ≤ Node.val ≤ 100"],
    conceptOverview: "Binary Tree Right Side View builds on Level Order Traversal: the rightmost node of each level is exactly what's visible from the right side.",
    patternRecognition: "**Pattern: BFS, Keep the Last Per Level**\n\nProcess the tree level by level; from each level, keep only the value of the last node processed.",
    sampleTests: [
      { name: "Example 1", input: [[1, 2, 3, null, 5, null, 4]], expected: [1, 3, 4] },
      { name: "Example 2", input: [[1, null, 3]], expected: [1, 3] },
    ],
    starterCode: "class TreeNode {\n  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }\n}\nfunction buildTree(values) {\n  if (!values.length || values[0] === null) return null;\n  const root = new TreeNode(values[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length && i < values.length) {\n    const node = queue.shift();\n    if (i < values.length) { const lv = values[i++]; if (lv !== null) { node.left = new TreeNode(lv); queue.push(node.left); } }\n    if (i < values.length) { const rv = values[i++]; if (rv !== null) { node.right = new TreeNode(rv); queue.push(node.right); } }\n  }\n  return root;\n}\n/**\n * @param {number[]} values\n * @return {number[]}\n */\nfunction rightSideView(values) {\n  const root = buildTree(values);\n  // Write your solution here\n}",
    hints: ["BFS level by level, as in Level Order Traversal.", "From each level, you only need the value of the last node processed.", "Handle the empty tree case separately."],
    bruteForceSolution: { code: "// Full level order traversal, then take the last element of each level\nfunction rightSideView(values) {\n  const root = buildTree(values);\n  if (!root) return [];\n  const levels = [];\n  let queue = [root];\n  while (queue.length) {\n    const level = [], next = [];\n    for (const node of queue) { level.push(node.val); if (node.left) next.push(node.left); if (node.right) next.push(node.right); }\n    levels.push(level);\n    queue = next;\n  }\n  return levels.map(level => level[level.length - 1]);\n}", timeComplexity: "O(n)", spaceComplexity: "O(n)", explanation: "Build full level order result, then extract the last value per level." },
    optimizedSolution: { code: "class TreeNode {\n  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }\n}\nfunction buildTree(values) {\n  if (!values.length || values[0] === null) return null;\n  const root = new TreeNode(values[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length && i < values.length) {\n    const node = queue.shift();\n    if (i < values.length) { const lv = values[i++]; if (lv !== null) { node.left = new TreeNode(lv); queue.push(node.left); } }\n    if (i < values.length) { const rv = values[i++]; if (rv !== null) { node.right = new TreeNode(rv); queue.push(node.right); } }\n  }\n  return root;\n}\nfunction rightSideView(values) {\n  const root = buildTree(values);\n  if (!root) return [];\n  const result = [];\n  let queue = [root];\n  while (queue.length) {\n    result.push(queue[queue.length - 1].val);\n    const next = [];\n    for (const node of queue) { if (node.left) next.push(node.left); if (node.right) next.push(node.right); }\n    queue = next;\n  }\n  return result;\n}", timeComplexity: "O(n)", spaceComplexity: "O(n)", explanation: "BFS, recording only the last node's value at each level directly." },
    interviewExplanation: "1. Building the full level order result then slicing is simple but does extra work\n2. Instead, record only the last node's value while processing each level\n3. This is BFS with one small tweak: peek at the queue's last element before advancing\n4. Handle the empty tree edge case up front",
    tests: [
      { name: "Returns right side view", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return rightSideView([1,2,3,null,5,null,4]);`)()) === JSON.stringify([1, 3, 4]); } catch { return false; } } },
      { name: "Handles right-skewed tree", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return rightSideView([1,null,3]);`)()) === JSON.stringify([1, 3]); } catch { return false; } } },
    ],
  },
  {
    id: "count-good-nodes-in-binary-tree", number: 63, title: "Count Good Nodes in Binary Tree", difficulty: "Medium",
    topics: ["trees"],
    companies: ["Amazon", "Microsoft"],
    acceptance: 68, xp: 20,
    problemStatement: "Given a binary tree `root`, a node `X` is 'good' if in the path from the root to `X`, there is no node with a value greater than `X`'s value. Return the number of good nodes.",
    examples: [
      { input: "root = [3,1,4,3,null,1,5]", output: "4" },
      { input: "root = [3,3,null,4,2]", output: "3" },
    ],
    constraints: ["The number of nodes is in the range [1, 10⁵]", "-10⁴ ≤ Node.val ≤ 10⁴"],
    conceptOverview: "Count Good Nodes tests DFS with state carried down the recursion — the running maximum along the current root-to-node path.",
    patternRecognition: "**Pattern: DFS with Carried State**\n\nPass the maximum value seen so far down each recursive call; a node is good exactly when its value is at least that maximum.",
    sampleTests: [
      { name: "Example 1", input: [[3, 1, 4, 3, null, 1, 5]], expected: 4 },
      { name: "Example 2", input: [[3, 3, null, 4, 2]], expected: 3 },
    ],
    starterCode: "class TreeNode {\n  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }\n}\nfunction buildTree(values) {\n  if (!values.length || values[0] === null) return null;\n  const root = new TreeNode(values[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length && i < values.length) {\n    const node = queue.shift();\n    if (i < values.length) { const lv = values[i++]; if (lv !== null) { node.left = new TreeNode(lv); queue.push(node.left); } }\n    if (i < values.length) { const rv = values[i++]; if (rv !== null) { node.right = new TreeNode(rv); queue.push(node.right); } }\n  }\n  return root;\n}\n/**\n * @param {number[]} values\n * @return {number}\n */\nfunction goodNodes(values) {\n  const root = buildTree(values);\n  // Write your solution here\n}",
    hints: ["Pass the max value seen so far down each recursive call.", "A node is good if its value >= that running max.", "Update the running max with the current node's value before recursing into children."],
    bruteForceSolution: { code: "// Recomputing the max of the path from scratch for every node also works but is redundant\nfunction pathMax(root, target, path) {\n  if (!root) return -Infinity;\n  if (root === target) return Math.max(...path, root.val);\n  return 0;\n}\nfunction goodNodes(values) {\n  const root = buildTree(values);\n  const nodes = [];\n  (function collect(node, path) { if (!node) return; nodes.push([node, [...path, node.val]]); collect(node.left, [...path, node.val]); collect(node.right, [...path, node.val]); })(root, []);\n  let count = 0;\n  for (const [node, path] of nodes) { if (node.val >= Math.max(...path.slice(0, -1), -Infinity)) count++; }\n  return count;\n}", timeComplexity: "O(n²) worst case", spaceComplexity: "O(n²)", explanation: "Track the full path to each node and recompute its max independently." },
    optimizedSolution: { code: "class TreeNode {\n  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }\n}\nfunction buildTree(values) {\n  if (!values.length || values[0] === null) return null;\n  const root = new TreeNode(values[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length && i < values.length) {\n    const node = queue.shift();\n    if (i < values.length) { const lv = values[i++]; if (lv !== null) { node.left = new TreeNode(lv); queue.push(node.left); } }\n    if (i < values.length) { const rv = values[i++]; if (rv !== null) { node.right = new TreeNode(rv); queue.push(node.right); } }\n  }\n  return root;\n}\nfunction goodNodes(values) {\n  const root = buildTree(values);\n  let count = 0;\n  function dfs(node, maxSoFar) {\n    if (!node) return;\n    if (node.val >= maxSoFar) count++;\n    dfs(node.left, Math.max(maxSoFar, node.val));\n    dfs(node.right, Math.max(maxSoFar, node.val));\n  }\n  dfs(root, -Infinity);\n  return count;\n}", timeComplexity: "O(n)", spaceComplexity: "O(h)", explanation: "Single DFS pass, carrying the running max as a parameter instead of recomputing." },
    interviewExplanation: "1. Tracking full paths and recomputing max per node is wasteful\n2. Instead, thread the running max through the recursive call itself\n3. A node is good exactly when its value >= the max passed in\n4. Update the max with the current node's value before recursing further",
    tests: [
      { name: "Counts good nodes example 1", validate: (code) => { try { return new Function(`${code}; return goodNodes([3,1,4,3,null,1,5]);`)() === 4; } catch { return false; } } },
      { name: "Counts good nodes example 2", validate: (code) => { try { return new Function(`${code}; return goodNodes([3,3,null,4,2]);`)() === 3; } catch { return false; } } },
    ],
  },
  {
    id: "validate-binary-search-tree", number: 64, title: "Validate Binary Search Tree", difficulty: "Medium",
    topics: ["trees", "binary-search"],
    companies: ["Amazon", "Meta", "Microsoft", "Google", "Bloomberg"],
    acceptance: 52, xp: 25,
    problemStatement: "Given the `root` of a binary tree, determine if it is a valid binary search tree (BST): every node's left subtree contains only values strictly less than the node's value, and every right subtree contains only values strictly greater, recursively.",
    examples: [
      { input: "root = [2,1,3]", output: "true" },
      { input: "root = [5,1,4,null,null,3,6]", output: "false" },
    ],
    constraints: ["The number of nodes is in the range [1, 10⁴]"],
    conceptOverview: "Validate Binary Search Tree tests carrying a valid value range down the recursion, since a purely local parent comparison is insufficient.",
    patternRecognition: "**Pattern: Bounded Recursion**\n\nPass a `(lo, hi)` range to each recursive call. A node must fall strictly within that range; recursing left tightens the upper bound, recursing right tightens the lower bound.",
    sampleTests: [
      { name: "Example 1", input: [[2, 1, 3]], expected: true },
      { name: "Example 2", input: [[5, 1, 4, null, null, 3, 6]], expected: false },
    ],
    starterCode: "class TreeNode {\n  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }\n}\nfunction buildTree(values) {\n  if (!values.length || values[0] === null) return null;\n  const root = new TreeNode(values[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length && i < values.length) {\n    const node = queue.shift();\n    if (i < values.length) { const lv = values[i++]; if (lv !== null) { node.left = new TreeNode(lv); queue.push(node.left); } }\n    if (i < values.length) { const rv = values[i++]; if (rv !== null) { node.right = new TreeNode(rv); queue.push(node.right); } }\n  }\n  return root;\n}\n/**\n * @param {number[]} values\n * @return {boolean}\n */\nfunction isValidBST(values) {\n  const root = buildTree(values);\n  // Write your solution here\n}",
    hints: ["A local check against just the parent isn't enough — a deep node can violate a grandparent.", "Pass down a valid (lo, hi) range for each node.", "Tighten the range when recursing left (new hi = node.val) or right (new lo = node.val)."],
    bruteForceSolution: { code: "// In-order traversal should be strictly increasing for a valid BST\nfunction isValidBST(values) {\n  const root = buildTree(values);\n  const inorder = [];\n  (function dfs(node) { if (!node) return; dfs(node.left); inorder.push(node.val); dfs(node.right); })(root);\n  for (let i = 1; i < inorder.length; i++) { if (inorder[i] <= inorder[i - 1]) return false; }\n  return true;\n}", timeComplexity: "O(n)", spaceComplexity: "O(n)", explanation: "Collect an in-order traversal and check it's strictly increasing." },
    optimizedSolution: { code: "class TreeNode {\n  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }\n}\nfunction buildTree(values) {\n  if (!values.length || values[0] === null) return null;\n  const root = new TreeNode(values[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length && i < values.length) {\n    const node = queue.shift();\n    if (i < values.length) { const lv = values[i++]; if (lv !== null) { node.left = new TreeNode(lv); queue.push(node.left); } }\n    if (i < values.length) { const rv = values[i++]; if (rv !== null) { node.right = new TreeNode(rv); queue.push(node.right); } }\n  }\n  return root;\n}\nfunction isValidBST(values) {\n  const root = buildTree(values);\n  function valid(node, lo, hi) {\n    if (!node) return true;\n    if (node.val <= lo || node.val >= hi) return false;\n    return valid(node.left, lo, node.val) && valid(node.right, node.val, hi);\n  }\n  return valid(root, -Infinity, Infinity);\n}", timeComplexity: "O(n)", spaceComplexity: "O(h)", explanation: "Recursive bounds-checking, avoiding a separate array pass." },
    interviewExplanation: "1. In-order traversal + strictly-increasing check is a valid O(n) approach\n2. Bounds-passing recursion achieves the same without an extra array\n3. Each node must satisfy lo < val < hi, with bounds tightening as you descend\n4. This correctly rejects violations against non-immediate ancestors",
    tests: [
      { name: "Validates a valid BST", validate: (code) => { try { return new Function(`${code}; return isValidBST([2,1,3]);`)() === true; } catch { return false; } } },
      { name: "Rejects an invalid BST", validate: (code) => { try { return new Function(`${code}; return isValidBST([5,1,4,null,null,3,6]);`)() === false; } catch { return false; } } },
    ],
  },
  {
    id: "kth-smallest-element-bst", number: 65, title: "Kth Smallest Element in a BST", difficulty: "Medium",
    topics: ["trees", "binary-search"],
    companies: ["Amazon", "Meta", "Microsoft", "Bloomberg"],
    acceptance: 71, xp: 20,
    problemStatement: "Given the `root` of a binary search tree, and an integer `k`, return the `k`th smallest value (1-indexed) among all node values in the tree.",
    examples: [
      { input: "root = [3,1,4,null,2], k = 1", output: "1" },
      { input: "root = [5,3,6,2,4,null,null,1], k = 3", output: "3" },
    ],
    constraints: ["The number of nodes is in the range [1, 10⁴]", "1 ≤ k ≤ number of nodes"],
    conceptOverview: "Kth Smallest Element in a BST tests exploiting the fact that an in-order traversal of a BST visits nodes in ascending order.",
    patternRecognition: "**Pattern: In-Order Traversal with Early Stop**\n\nWalk the tree in-order (which is ascending order for a BST), and stop as soon as you've visited the kth node — no need to visit the rest of the tree.",
    sampleTests: [
      { name: "Example 1", input: [[3, 1, 4, null, 2], 1], expected: 1 },
      { name: "Example 2", input: [[5, 3, 6, 2, 4, null, null, 1], 3], expected: 3 },
    ],
    starterCode: "class TreeNode {\n  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }\n}\nfunction buildTree(values) {\n  if (!values.length || values[0] === null) return null;\n  const root = new TreeNode(values[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length && i < values.length) {\n    const node = queue.shift();\n    if (i < values.length) { const lv = values[i++]; if (lv !== null) { node.left = new TreeNode(lv); queue.push(node.left); } }\n    if (i < values.length) { const rv = values[i++]; if (rv !== null) { node.right = new TreeNode(rv); queue.push(node.right); } }\n  }\n  return root;\n}\n/**\n * @param {number[]} values\n * @param {number} k\n * @return {number}\n */\nfunction kthSmallest(values, k) {\n  const root = buildTree(values);\n  // Write your solution here\n}",
    hints: ["In-order traversal of a BST visits values in ascending order.", "Use an explicit stack to traverse iteratively.", "Stop as soon as you've popped the kth node."],
    bruteForceSolution: { code: "// Collect the full in-order traversal, then index into it\nfunction kthSmallest(values, k) {\n  const root = buildTree(values);\n  const inorder = [];\n  (function dfs(node) { if (!node) return; dfs(node.left); inorder.push(node.val); dfs(node.right); })(root);\n  return inorder[k - 1];\n}", timeComplexity: "O(n)", spaceComplexity: "O(n)", explanation: "Collect the entire in-order traversal, even if k is small." },
    optimizedSolution: { code: "class TreeNode {\n  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }\n}\nfunction buildTree(values) {\n  if (!values.length || values[0] === null) return null;\n  const root = new TreeNode(values[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length && i < values.length) {\n    const node = queue.shift();\n    if (i < values.length) { const lv = values[i++]; if (lv !== null) { node.left = new TreeNode(lv); queue.push(node.left); } }\n    if (i < values.length) { const rv = values[i++]; if (rv !== null) { node.right = new TreeNode(rv); queue.push(node.right); } }\n  }\n  return root;\n}\nfunction kthSmallest(values, k) {\n  const root = buildTree(values);\n  const stack = [];\n  let curr = root;\n  while (true) {\n    while (curr) { stack.push(curr); curr = curr.left; }\n    curr = stack.pop();\n    k--;\n    if (k === 0) return curr.val;\n    curr = curr.right;\n  }\n}", timeComplexity: "O(h + k)", spaceComplexity: "O(h)", explanation: "Iterative in-order traversal that stops as soon as the kth node is popped." },
    interviewExplanation: "1. Collecting the full traversal works but wastes time when k is small\n2. Use an explicit stack for iterative in-order traversal\n3. Stop and return as soon as the kth pop is reached\n4. Avoids visiting the rest of the tree unnecessarily",
    tests: [
      { name: "Finds 1st smallest", validate: (code) => { try { return new Function(`${code}; return kthSmallest([3,1,4,null,2], 1);`)() === 1; } catch { return false; } } },
      { name: "Finds 3rd smallest", validate: (code) => { try { return new Function(`${code}; return kthSmallest([5,3,6,2,4,null,null,1], 3);`)() === 3; } catch { return false; } } },
    ],
  },
  {
    id: "construct-binary-tree-preorder-inorder", number: 67, title: "Construct Binary Tree from Preorder and Inorder Traversal", difficulty: "Medium",
    topics: ["trees"],
    companies: ["Amazon", "Microsoft", "Meta", "Bloomberg"],
    acceptance: 58, xp: 25,
    problemStatement: "Given two integer arrays `preorder` and `inorder` representing the preorder and inorder traversal of a binary tree, construct and return the binary tree, returned here as its level-order array.",
    examples: [
      { input: "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]", output: "[3,9,20,null,null,15,7]" },
      { input: "preorder = [-1], inorder = [-1]", output: "[-1]" },
    ],
    constraints: ["1 ≤ preorder.length ≤ 3000", "inorder.length == preorder.length", "Both arrays consist of unique values"],
    conceptOverview: "Construct Binary Tree from Preorder and Inorder tests using the structural properties of preorder (root-first) and inorder (left-root-right) to rebuild a tree uniquely.",
    patternRecognition: "**Pattern: Recursive Split by Root**\n\nThe first element of preorder is always the current subtree's root. Find it in inorder — everything to its left is the left subtree, everything to its right is the right subtree.",
    sampleTests: [
      { name: "Example 1", input: [[3, 9, 20, 15, 7], [9, 3, 15, 20, 7]], expected: [3, 9, 20, null, null, 15, 7] },
      { name: "Single node", input: [[-1], [-1]], expected: [-1] },
    ],
    starterCode: "class TreeNode {\n  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }\n}\nfunction treeToArray(root) {\n  if (!root) return [];\n  const result = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node === null) { result.push(null); continue; }\n    result.push(node.val);\n    queue.push(node.left);\n    queue.push(node.right);\n  }\n  while (result.length && result[result.length - 1] === null) result.pop();\n  return result;\n}\n/**\n * @param {number[]} preorder\n * @param {number[]} inorder\n * @return {number[]}\n */\nfunction buildTreeFromTraversals(preorder, inorder) {\n  // Write your solution here, then return treeToArray(root)\n}",
    hints: ["The first element of preorder is always the root of the current subtree.", "Find that value's position in inorder to split left/right subtrees.", "Use a hash map from value to inorder index for O(1) lookups, and a shared preorder index to avoid slicing arrays."],
    bruteForceSolution: { code: "// Slicing arrays at every recursive call works but adds O(n) overhead per call\nfunction buildTreeFromTraversals(preorder, inorder) {\n  if (!preorder.length) return treeToArray(null);\n  function build(pre, ino) {\n    if (!pre.length) return null;\n    const rootVal = pre[0];\n    const node = new TreeNode(rootVal);\n    const mid = ino.indexOf(rootVal);\n    node.left = build(pre.slice(1, mid + 1), ino.slice(0, mid));\n    node.right = build(pre.slice(mid + 1), ino.slice(mid + 1));\n    return node;\n  }\n  return treeToArray(build(preorder, inorder));\n}", timeComplexity: "O(n²)", spaceComplexity: "O(n²)", explanation: "Slice preorder/inorder arrays at every recursive call." },
    optimizedSolution: { code: "class TreeNode {\n  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }\n}\nfunction treeToArray(root) {\n  if (!root) return [];\n  const result = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node === null) { result.push(null); continue; }\n    result.push(node.val);\n    queue.push(node.left);\n    queue.push(node.right);\n  }\n  while (result.length && result[result.length - 1] === null) result.pop();\n  return result;\n}\nfunction buildTreeFromTraversals(preorder, inorder) {\n  const inorderIndex = new Map();\n  inorder.forEach((v, i) => inorderIndex.set(v, i));\n  let preIdx = 0;\n  function build(left, right) {\n    if (left > right) return null;\n    const rootVal = preorder[preIdx++];\n    const node = new TreeNode(rootVal);\n    const mid = inorderIndex.get(rootVal);\n    node.left = build(left, mid - 1);\n    node.right = build(mid + 1, right);\n    return node;\n  }\n  return treeToArray(build(0, inorder.length - 1));\n}", timeComplexity: "O(n)", spaceComplexity: "O(n)", explanation: "Hash map for O(1) split lookups, shared index instead of slicing." },
    interviewExplanation: "1. Slicing arrays at every call is correct but adds quadratic overhead\n2. Use a hash map from value to inorder index for instant split-point lookup\n3. Track a shared preorder index instead of slicing that array too\n4. Recurse using index ranges (left, right) rather than new array copies",
    tests: [
      { name: "Builds tree from traversals", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return buildTreeFromTraversals([3,9,20,15,7], [9,3,15,20,7]);`)()) === JSON.stringify([3, 9, 20, null, null, 15, 7]); } catch { return false; } } },
      { name: "Handles single node", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return buildTreeFromTraversals([-1], [-1]);`)()) === JSON.stringify([-1]); } catch { return false; } } },
    ],
  },
  {
    id: "binary-tree-maximum-path-sum", number: 69, title: "Binary Tree Maximum Path Sum", difficulty: "Hard",
    topics: ["trees"],
    companies: ["Amazon", "Meta", "Microsoft", "Google", "Bloomberg"],
    acceptance: 39, xp: 30,
    problemStatement: "A path in a binary tree is a sequence of nodes connected by edges, with no node repeated. Given the `root` of a binary tree, return the maximum path sum of any non-empty path (it need not pass through the root).",
    examples: [
      { input: "root = [1,2,3]", output: "6" },
      { input: "root = [-10,9,20,null,null,15,7]", output: "42" },
    ],
    constraints: ["The number of nodes is in the range [1, 3 × 10⁴]", "-1000 ≤ Node.val ≤ 1000"],
    conceptOverview: "Binary Tree Maximum Path Sum is the hardest classic tree DFS problem: distinguishing between a path returned to the parent (must be one-directional) and the best path bending through a node (can use both children).",
    patternRecognition: "**Pattern: Post-Order DFS with Two Return Concepts**\n\nEach call returns the best downward extension for its parent (clamped to 0 if negative), while a global max separately considers the node acting as a bend point using both children.",
    sampleTests: [
      { name: "Example 1", input: [[1, 2, 3]], expected: 6 },
      { name: "Example 2", input: [[-10, 9, 20, null, null, 15, 7]], expected: 42 },
    ],
    starterCode: "class TreeNode {\n  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }\n}\nfunction buildTree(values) {\n  if (!values.length || values[0] === null) return null;\n  const root = new TreeNode(values[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length && i < values.length) {\n    const node = queue.shift();\n    if (i < values.length) { const lv = values[i++]; if (lv !== null) { node.left = new TreeNode(lv); queue.push(node.left); } }\n    if (i < values.length) { const rv = values[i++]; if (rv !== null) { node.right = new TreeNode(rv); queue.push(node.right); } }\n  }\n  return root;\n}\n/**\n * @param {number[]} values\n * @return {number}\n */\nfunction maxPathSum(values) {\n  const root = buildTree(values);\n  // Write your solution here\n}",
    hints: ["A negative subtree contribution should be clamped to 0 (skip it).", "Track a global max considering node.val + leftGain + rightGain (a bend through this node).", "Return to the parent only node.val + max(leftGain, rightGain), since a path passed up can extend in only one direction."],
    bruteForceSolution: { code: "// Enumerating every possible path explicitly is exponential and impractical\n// The DFS-with-two-concepts approach below is the standard efficient solution\nfunction maxPathSum(values) {\n  const root = buildTree(values);\n  let best = -Infinity;\n  function dfs(node) {\n    if (!node) return 0;\n    const l = Math.max(dfs(node.left), 0);\n    const r = Math.max(dfs(node.right), 0);\n    best = Math.max(best, node.val + l + r);\n    return node.val + Math.max(l, r);\n  }\n  dfs(root);\n  return best;\n}", timeComplexity: "O(n)", spaceComplexity: "O(h)", explanation: "There's no simpler correct approach than the linear DFS below." },
    optimizedSolution: { code: "class TreeNode {\n  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }\n}\nfunction buildTree(values) {\n  if (!values.length || values[0] === null) return null;\n  const root = new TreeNode(values[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length && i < values.length) {\n    const node = queue.shift();\n    if (i < values.length) { const lv = values[i++]; if (lv !== null) { node.left = new TreeNode(lv); queue.push(node.left); } }\n    if (i < values.length) { const rv = values[i++]; if (rv !== null) { node.right = new TreeNode(rv); queue.push(node.right); } }\n  }\n  return root;\n}\nfunction maxPathSum(values) {\n  const root = buildTree(values);\n  let best = -Infinity;\n  function dfs(node) {\n    if (!node) return 0;\n    const l = Math.max(dfs(node.left), 0);\n    const r = Math.max(dfs(node.right), 0);\n    best = Math.max(best, node.val + l + r);\n    return node.val + Math.max(l, r);\n  }\n  dfs(root);\n  return best;\n}", timeComplexity: "O(n)", spaceComplexity: "O(h)", explanation: "Single post-order DFS tracking both a return value and a global best." },
    interviewExplanation: "1. The key insight: what a node returns to its parent differs from the best path through it\n2. A node can only pass ONE direction upward (can't fork after returning)\n3. But the global best CAN fork at any node, using both children\n4. Clamp negative subtree contributions to 0 — never worth including a net-negative branch",
    tests: [
      { name: "Simple triangle tree", validate: (code) => { try { return new Function(`${code}; return maxPathSum([1,2,3]);`)() === 6; } catch { return false; } } },
      { name: "Handles negative root", validate: (code) => { try { return new Function(`${code}; return maxPathSum([-10,9,20,null,null,15,7]);`)() === 42; } catch { return false; } } },
    ],
  },
  {
    id: "serialize-deserialize-binary-tree", number: 71, title: "Serialize and Deserialize Binary Tree", difficulty: "Hard",
    topics: ["trees"],
    companies: ["Amazon", "Meta", "Microsoft", "Google"],
    acceptance: 57, xp: 30,
    problemStatement: "Design an algorithm to serialize a binary tree into a string, and deserialize that string back into the original tree structure.",
    examples: [
      { input: "root = [1,2,3,null,null,4,5]", output: "[1,2,3,null,null,4,5]", explanation: "Serializing then deserializing reproduces the original tree." },
      { input: "root = []", output: "[]" },
    ],
    constraints: ["The number of nodes is in the range [0, 10⁴]", "-1000 ≤ Node.val ≤ 1000"],
    conceptOverview: "Serialize and Deserialize Binary Tree tests designing a lossless string encoding that fully captures tree shape, not just values — preorder with explicit null markers is the standard technique.",
    patternRecognition: "**Pattern: Preorder Encoding with Null Markers**\n\nWrite each node's value in preorder, using an explicit marker for missing children, so deserialization can reconstruct the exact shape by consuming tokens in the same order they were written.",
    sampleTests: [
      { name: "Example 1", input: [[1, 2, 3, null, null, 4, 5]], expected: [1, 2, 3, null, null, 4, 5] },
      { name: "Empty tree", input: [[]], expected: [] },
    ],
    starterCode: "class TreeNode {\n  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }\n}\nfunction buildTree(values) {\n  if (!values.length || values[0] === null) return null;\n  const root = new TreeNode(values[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length && i < values.length) {\n    const node = queue.shift();\n    if (i < values.length) { const lv = values[i++]; if (lv !== null) { node.left = new TreeNode(lv); queue.push(node.left); } }\n    if (i < values.length) { const rv = values[i++]; if (rv !== null) { node.right = new TreeNode(rv); queue.push(node.right); } }\n  }\n  return root;\n}\nfunction treeToArray(root) {\n  if (!root) return [];\n  const result = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node === null) { result.push(null); continue; }\n    result.push(node.val);\n    queue.push(node.left);\n    queue.push(node.right);\n  }\n  while (result.length && result[result.length - 1] === null) result.pop();\n  return result;\n}\nfunction serialize(root) {\n  // Write your solution here: return a string encoding of the tree\n}\nfunction deserialize(data) {\n  // Write your solution here: reconstruct and return the TreeNode tree\n}\n/**\n * @param {number[]} values\n * @return {number[]}\n */\nfunction serializeDeserialize(values) {\n  const root = buildTree(values);\n  const data = serialize(root);\n  const restored = deserialize(data);\n  return treeToArray(restored);\n}",
    hints: ["Serialize with a preorder traversal, writing a marker like 'null' for missing children.", "Deserialize by consuming tokens in the same preorder sequence they were written in.", "A shared index (or a queue of tokens) makes recursive deserialization straightforward."],
    bruteForceSolution: { code: "class TreeNode {\n  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }\n}\nfunction buildTree(values) {\n  if (!values.length || values[0] === null) return null;\n  const root = new TreeNode(values[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length && i < values.length) {\n    const node = queue.shift();\n    if (i < values.length) { const lv = values[i++]; if (lv !== null) { node.left = new TreeNode(lv); queue.push(node.left); } }\n    if (i < values.length) { const rv = values[i++]; if (rv !== null) { node.right = new TreeNode(rv); queue.push(node.right); } }\n  }\n  return root;\n}\nfunction treeToArray(root) {\n  if (!root) return [];\n  const result = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node === null) { result.push(null); continue; }\n    result.push(node.val);\n    queue.push(node.left);\n    queue.push(node.right);\n  }\n  while (result.length && result[result.length - 1] === null) result.pop();\n  return result;\n}\n// Level-order (BFS) serialization with null markers is a valid alternative to preorder\nfunction serialize(root) {\n  if (!root) return '';\n  const tokens = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (!node) { tokens.push('null'); continue; }\n    tokens.push(String(node.val));\n    queue.push(node.left);\n    queue.push(node.right);\n  }\n  return tokens.join(',');\n}\nfunction deserialize(data) {\n  if (!data) return null;\n  const tokens = data.split(',');\n  const root = new TreeNode(Number(tokens[0]));\n  const queue = [root];\n  let i = 1;\n  while (queue.length && i < tokens.length) {\n    const node = queue.shift();\n    const leftVal = tokens[i++];\n    if (leftVal !== 'null') { node.left = new TreeNode(Number(leftVal)); queue.push(node.left); }\n    const rightVal = tokens[i++];\n    if (rightVal !== 'null') { node.right = new TreeNode(Number(rightVal)); queue.push(node.right); }\n  }\n  return root;\n}\nfunction serializeDeserialize(values) {\n  const root = buildTree(values);\n  const data = serialize(root);\n  const restored = deserialize(data);\n  return treeToArray(restored);\n}", timeComplexity: "O(n)", spaceComplexity: "O(n)", explanation: "BFS-based level-order serialization, mirroring the level-order array format." },
    optimizedSolution: { code: "class TreeNode {\n  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }\n}\nfunction buildTree(values) {\n  if (!values.length || values[0] === null) return null;\n  const root = new TreeNode(values[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length && i < values.length) {\n    const node = queue.shift();\n    if (i < values.length) { const lv = values[i++]; if (lv !== null) { node.left = new TreeNode(lv); queue.push(node.left); } }\n    if (i < values.length) { const rv = values[i++]; if (rv !== null) { node.right = new TreeNode(rv); queue.push(node.right); } }\n  }\n  return root;\n}\nfunction treeToArray(root) {\n  if (!root) return [];\n  const result = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node === null) { result.push(null); continue; }\n    result.push(node.val);\n    queue.push(node.left);\n    queue.push(node.right);\n  }\n  while (result.length && result[result.length - 1] === null) result.pop();\n  return result;\n}\nfunction serialize(node) {\n  if (!node) return 'null';\n  return node.val + ',' + serialize(node.left) + ',' + serialize(node.right);\n}\nfunction deserialize(data) {\n  const vals = data.split(',');\n  let idx = 0;\n  function helper() {\n    const val = vals[idx++];\n    if (val === 'null') return null;\n    const node = new TreeNode(Number(val));\n    node.left = helper();\n    node.right = helper();\n    return node;\n  }\n  return helper();\n}\nfunction serializeDeserialize(values) {\n  const root = buildTree(values);\n  const data = serialize(root);\n  const restored = deserialize(data);\n  return treeToArray(restored);\n}", timeComplexity: "O(n)", spaceComplexity: "O(n)", explanation: "Preorder serialization with null markers; deserialization consumes tokens in the same order." },
    interviewExplanation: "1. Both preorder and level-order (BFS) encodings work as long as null markers preserve shape\n2. Preorder recursion is simpler to write for both serialize and deserialize\n3. Deserialize must consume tokens in exactly the order they were produced\n4. Verify correctness by checking the round trip reproduces the original structure",
    tests: [
      { name: "Round-trips a branching tree", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return serializeDeserialize([1,2,3,null,null,4,5]);`)()) === JSON.stringify([1, 2, 3, null, null, 4, 5]); } catch { return false; } } },
      { name: "Round-trips an empty tree", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return serializeDeserialize([]);`)()) === JSON.stringify([]); } catch { return false; } } },
    ],
  }
,
  {
    id: "maximum-product-subarray", number: 152, title: "Maximum Product Subarray", difficulty: "Medium",
    topics: ["arrays","dp"], companies: ["Amazon","Google","Microsoft"], acceptance: 35, xp: 15,
    problemStatement: "Given an integer array `nums`, find a subarray that has the largest product, and return *the product*.",
    examples: [{"input":"nums = [2,3,-2,4]","output":"6","explanation":"[2,3] has the largest product 6."},{"input":"nums = [-2,0,-1]","output":"0","explanation":"The result cannot be 2, because [-2,-1] is not a subarray."}],
    constraints: ["1 <= nums.length <= 2 * 10^4","-10 <= nums[i] <= 10"],
    conceptOverview: "Track both maximum and minimum product at each step because multiplying by a negative number flips max and min.",
    patternRecognition: "Dynamic Programming / Min-Max Tracking in Arrays",
    sampleTests: [{"name":"Example 1","input":[[2,3,-2,4]],"expected":6},{"name":"Example 2","input":[[-2,0,-1]],"expected":0}],
    starterCode: "/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction maxProduct(nums) {\n  // Write solution here\n}",
    hints: ["Keep track of running max and running min.","Swap max and min when encountering a negative number."],
    bruteForceSolution: {"code":"function maxProduct(nums) {\n  let res = nums[0];\n  for(let i=0;i<nums.length;i++) {\n    let p = 1;\n    for(let j=i;j<nums.length;j++) {\n      p *= nums[j];\n      res = Math.max(res, p);\n    }\n  }\n  return res;\n}","timeComplexity":"O(n^2)","spaceComplexity":"O(1)","explanation":"Compute product of all subarrays."},
    optimizedSolution: {"code":"function maxProduct(nums) {\n  let res = nums[0], maxP = nums[0], minP = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    if (nums[i] < 0) [maxP, minP] = [minP, maxP];\n    maxP = Math.max(nums[i], maxP * nums[i]);\n    minP = Math.min(nums[i], minP * nums[i]);\n    res = Math.max(res, maxP);\n  }\n  return res;\n}","timeComplexity":"O(n)","spaceComplexity":"O(1)","explanation":"Track max and min product dynamically."},
    interviewExplanation: "Explain how negative numbers swap max and min products. Use O(1) space DP.",
    tests: [
      { name: "Positive subarray product", validate: (code) => { try { return new Function(`${code}; return maxProduct([2,3,-2,4]);`)() === 6; } catch { return false; } } },
      { name: "Handles zero and negatives", validate: (code) => { try { return new Function(`${code}; return maxProduct([-2,0,-1]);`)() === 0; } catch { return false; } } },
    ],
  },
  {
    id: "sum-of-two-integers", number: 371, title: "Sum of Two Integers", difficulty: "Medium",
    topics: ["bit-manipulation"], companies: ["Meta","Amazon"], acceptance: 51, xp: 15,
    problemStatement: "Given two integers `a` and `b`, return the sum of the two integers without using the operators `+` and `-`.",
    examples: [{"input":"a = 1, b = 2","output":"3"},{"input":"a = 2, b = 3","output":"5"}],
    constraints: ["-1000 <= a, b <= 1000"],
    conceptOverview: "Bitwise XOR calculates addition without carry; bitwise AND shifted left calculates carry.",
    patternRecognition: "Bitwise Operations (XOR + AND)",
    sampleTests: [{"name":"1 + 2 = 3","input":[1,2],"expected":3},{"name":"2 + 3 = 5","input":[2,3],"expected":5}],
    starterCode: "/**\n * @param {number} a\n * @param {number} b\n * @return {number}\n */\nfunction getSum(a, b) {\n}",
    hints: ["XOR gives sum without carry.","AND left shifted by 1 gives carry."],
    bruteForceSolution: {"code":"function getSum(a, b) {\n  while (b !== 0) {\n    let carry = (a & b) << 1;\n    a = a ^ b;\n    b = carry;\n  }\n  return a;\n}","timeComplexity":"O(1)","spaceComplexity":"O(1)","explanation":"Iterative bitwise carry."},
    optimizedSolution: {"code":"function getSum(a, b) {\n  while (b !== 0) {\n    let carry = (a & b) << 1;\n    a = a ^ b;\n    b = carry;\n  }\n  return a;\n}","timeComplexity":"O(1)","spaceComplexity":"O(1)","explanation":"Bitwise sum using XOR and shift."},
    interviewExplanation: "Use XOR for bitwise sum and AND shifted for carry until carry becomes zero.",
    tests: [
      { name: "Calculates sum without + operator", validate: (code) => { try { return new Function(`${code}; return getSum(1, 2);`)() === 3; } catch { return false; } } },
    ],
  },
  {
    id: "number-of-1-bits", number: 191, title: "Number of 1 Bits", difficulty: "Easy",
    topics: ["bit-manipulation"], companies: ["Apple","Microsoft"], acceptance: 69, xp: 10,
    problemStatement: "Given a positive integer `n`, write a function that returns the number of set bits it has (also known as Hamming weight).",
    examples: [{"input":"n = 11","output":"3","explanation":"11 in binary is 1011 (3 set bits)"}],
    constraints: ["1 <= n <= 2^31 - 1"],
    conceptOverview: "`n & (n - 1)` clears the lowest set bit.",
    patternRecognition: "Brian Kernighan's Bit Counting Algorithm",
    sampleTests: [{"name":"11 -> 3","input":[11],"expected":3}],
    starterCode: "/**\n * @param {number} n\n * @return {number}\n */\nfunction hammingWeight(n) {\n}",
    hints: ["Use n & (n - 1) to clear bits one by one."],
    bruteForceSolution: {"code":"function hammingWeight(n) {\n  let count = 0;\n  while (n > 0) {\n    count += (n & 1);\n    n >>>= 1;\n  }\n  return count;\n}","timeComplexity":"O(32)","spaceComplexity":"O(1)","explanation":"Shift bits right 32 times."},
    optimizedSolution: {"code":"function hammingWeight(n) {\n  let count = 0;\n  while (n !== 0) {\n    n &= (n - 1);\n    count++;\n  }\n  return count;\n}","timeComplexity":"O(set bits)","spaceComplexity":"O(1)","explanation":"Clears lowest set bit in each iteration."},
    interviewExplanation: "n & (n - 1) removes the least significant 1-bit in O(k) operations.",
    tests: [
      { name: "Counts 1 bits correctly", validate: (code) => { try { return new Function(`${code}; return hammingWeight(11);`)() === 3; } catch { return false; } } },
    ],
  },
  {
    id: "counting-bits", number: 338, title: "Counting Bits", difficulty: "Easy",
    topics: ["bit-manipulation","dp"], companies: ["Google","Amazon"], acceptance: 77, xp: 10,
    problemStatement: "Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (`0 <= i <= n`), `ans[i]` is the number of `1`'s in the binary representation of `i`.",
    examples: [{"input":"n = 5","output":"[0,1,1,2,1,2]"}],
    constraints: ["0 <= n <= 10^5"],
    conceptOverview: "`ans[i] = ans[i >> 1] + (i & 1)` using dynamic programming.",
    patternRecognition: "Bit Manipulation DP",
    sampleTests: [{"name":"n = 5","input":[5],"expected":[0,1,1,2,1,2]}],
    starterCode: "/**\n * @param {number} n\n * @return {number[]}\n */\nfunction countBits(n) {\n}",
    hints: ["Use previous DP values for i >> 1."],
    bruteForceSolution: {"code":"function countBits(n) {\n  const ans = new Array(n + 1).fill(0);\n  for (let i = 1; i <= n; i++) {\n    ans[i] = ans[i >> 1] + (i & 1);\n  }\n  return ans;\n}","timeComplexity":"O(n)","spaceComplexity":"O(n)","explanation":"O(n) DP bit relation."},
    optimizedSolution: {"code":"function countBits(n) {\n  const ans = new Array(n + 1).fill(0);\n  for (let i = 1; i <= n; i++) {\n    ans[i] = ans[i >> 1] + (i & 1);\n  }\n  return ans;\n}","timeComplexity":"O(n)","spaceComplexity":"O(n)","explanation":"O(n) DP bit relation."},
    interviewExplanation: "Number of bits for i equals bits for i >> 1 plus i % 2.",
    tests: [
      { name: "Returns array of bit counts", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return countBits(5);`)()) === JSON.stringify([0,1,1,2,1,2]); } catch { return false; } } },
    ],
  },
  {
    id: "array-missing-number", number: 268, title: "Missing Number", difficulty: "Easy",
    topics: ["arrays","bit-manipulation"], companies: ["Microsoft","Amazon"], acceptance: 66, xp: 10,
    problemStatement: "Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return *the only number in the range that is missing from the array*.",
    examples: [{"input":"nums = [3,0,1]","output":"2"}],
    constraints: ["n == nums.length","1 <= n <= 10^4","0 <= nums[i] <= n"],
    conceptOverview: "Sum formula `n * (n + 1) / 2` minus array sum gives missing number.",
    patternRecognition: "Gauss Sum / Bitwise XOR",
    sampleTests: [{"name":"Example 1","input":[[3,0,1]],"expected":2}],
    starterCode: "/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction missingNumber(nums) {\n}",
    hints: ["Sum from 0 to n is n * (n + 1) / 2."],
    bruteForceSolution: {"code":"function missingNumber(nums) {\n  const n = nums.length;\n  let expected = (n * (n + 1)) / 2;\n  let actual = nums.reduce((a, b) => a + b, 0);\n  return expected - actual;\n}","timeComplexity":"O(n)","spaceComplexity":"O(1)","explanation":"Gauss sum."},
    optimizedSolution: {"code":"function missingNumber(nums) {\n  const n = nums.length;\n  let expected = (n * (n + 1)) / 2;\n  let actual = nums.reduce((a, b) => a + b, 0);\n  return expected - actual;\n}","timeComplexity":"O(n)","spaceComplexity":"O(1)","explanation":"Gauss summation formula."},
    interviewExplanation: "Subtract total array sum from total expected sum n*(n+1)/2.",
    tests: [
      { name: "Finds missing number", validate: (code) => { try { return new Function(`${code}; return missingNumber([3,0,1]);`)() === 2; } catch { return false; } } },
    ],
  },
  {
    id: "reverse-bits", number: 190, title: "Reverse Bits", difficulty: "Easy",
    topics: ["bit-manipulation"], companies: ["Apple","Google"], acceptance: 58, xp: 10,
    problemStatement: "Reverse bits of a given 32-bits unsigned integer.",
    examples: [{"input":"n = 43261596","output":"964176192"}],
    constraints: ["Input must be a 32-bit unsigned integer"],
    conceptOverview: "Extract last bit of n, shift result left, shift n right, 32 times.",
    patternRecognition: "Bit Shifting Loop",
    sampleTests: [{"name":"43261596 -> 964176192","input":[43261596],"expected":964176192}],
    starterCode: "/**\n * @param {number} n - a positive integer\n * @return {number} - a positive integer\n */\nfunction reverseBits(n) {\n}",
    hints: ["Process all 32 bits from right to left."],
    bruteForceSolution: {"code":"function reverseBits(n) {\n  let res = 0;\n  for (let i = 0; i < 32; i++) {\n    res = (res << 1) | (n & 1);\n    n >>>= 1;\n  }\n  return res >>> 0;\n}","timeComplexity":"O(32)","spaceComplexity":"O(1)","explanation":"32 bit shifts."},
    optimizedSolution: {"code":"function reverseBits(n) {\n  let res = 0;\n  for (let i = 0; i < 32; i++) {\n    res = (res << 1) | (n & 1);\n    n >>>= 1;\n  }\n  return res >>> 0;\n}","timeComplexity":"O(32)","spaceComplexity":"O(1)","explanation":"Bitwise reverse using bit shift."},
    interviewExplanation: "Iterate 32 times, extracting lowest bit of n and adding it to res.",
    tests: [
      { name: "Reverses 32 bits integer", validate: (code) => { try { return new Function(`${code}; return reverseBits(43261596);`)() === 964176192; } catch { return false; } } },
    ],
  },
  {
    id: "longest-increasing-subsequence", number: 300, title: "Longest Increasing Subsequence", difficulty: "Medium",
    topics: ["dp","binary-search"], companies: ["Google","Microsoft"], acceptance: 54, xp: 15,
    problemStatement: "Given an integer array `nums`, return the length of the longest strictly increasing subsequence.",
    examples: [{"input":"nums = [10,9,2,5,3,7,101,18]","output":"4"}],
    constraints: ["1 <= nums.length <= 2500"],
    conceptOverview: "Patience sorting / binary search build `tails` array in O(n log n) time.",
    patternRecognition: "Binary Search Patience Sorting / DP",
    sampleTests: [{"name":"Example 1","input":[[10,9,2,5,3,7,101,18]],"expected":4}],
    starterCode: "/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction lengthOfLIS(nums) {\n}",
    hints: ["dp[i] is length of LIS ending at index i.","O(n log n) with patience sorting."],
    bruteForceSolution: {"code":"function lengthOfLIS(nums) {\n  const tails = [];\n  for (const x of nums) {\n    let l = 0, r = tails.length;\n    while (l < r) {\n      let m = (l + r) >> 1;\n      if (tails[m] < x) l = m + 1;\n      else r = m;\n    }\n    tails[l] = x;\n  }\n  return tails.length;\n}","timeComplexity":"O(n log n)","spaceComplexity":"O(n)","explanation":"Patience sorting."},
    optimizedSolution: {"code":"function lengthOfLIS(nums) {\n  const tails = [];\n  for (const x of nums) {\n    let l = 0, r = tails.length;\n    while (l < r) {\n      let m = (l + r) >> 1;\n      if (tails[m] < x) l = m + 1;\n      else r = m;\n    }\n    tails[l] = x;\n  }\n  return tails.length;\n}","timeComplexity":"O(n log n)","spaceComplexity":"O(n)","explanation":"Binary search tails array."},
    interviewExplanation: "Build tails array of smallest tail of all increasing subsequences of length i.",
    tests: [
      { name: "Calculates LIS length", validate: (code) => { try { return new Function(`${code}; return lengthOfLIS([10,9,2,5,3,7,101,18]);`)() === 4; } catch { return false; } } },
    ],
  },
  {
    id: "longest-common-subsequence", number: 1143, title: "Longest Common Subsequence", difficulty: "Medium",
    topics: ["dp"], companies: ["Amazon","Meta"], acceptance: 58, xp: 15,
    problemStatement: "Given two strings `text1` and `text2`, return the length of their longest common subsequence.",
    examples: [{"input":"text1 = \"abcde\", text2 = \"ace\"","output":"3"}],
    constraints: ["1 <= text1.length, text2.length <= 1000"],
    conceptOverview: "2D DP grid where matching characters add 1 to `dp[i-1][j-1]`.",
    patternRecognition: "2D Dynamic Programming Grid",
    sampleTests: [{"name":"abcde & ace","input":["abcde","ace"],"expected":3}],
    starterCode: "/**\n * @param {string} text1\n * @param {string} text2\n * @return {number}\n */\nfunction longestCommonSubsequence(text1, text2) {\n}",
    hints: ["If text1[i] == text2[j], dp[i][j] = 1 + dp[i-1][j-1]."],
    bruteForceSolution: {"code":"function longestCommonSubsequence(text1, text2) {\n  const m = text1.length, n = text2.length;\n  const dp = Array.from({length: m + 1}, () => new Array(n + 1).fill(0));\n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (text1[i-1] === text2[j-1]) dp[i][j] = 1 + dp[i-1][j-1];\n      else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);\n    }\n  }\n  return dp[m][n];\n}","timeComplexity":"O(m*n)","spaceComplexity":"O(m*n)","explanation":"Standard 2D DP."},
    optimizedSolution: {"code":"function longestCommonSubsequence(text1, text2) {\n  const m = text1.length, n = text2.length;\n  const dp = Array.from({length: m + 1}, () => new Array(n + 1).fill(0));\n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (text1[i-1] === text2[j-1]) dp[i][j] = 1 + dp[i-1][j-1];\n      else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);\n    }\n  }\n  return dp[m][n];\n}","timeComplexity":"O(m*n)","spaceComplexity":"O(m*n)","explanation":"2D DP matrix."},
    interviewExplanation: "Compare char by char; if matched move diagonally, else take max of left or top DP cell.",
    tests: [
      { name: "Calculates LCS length", validate: (code) => { try { return new Function(`${code}; return longestCommonSubsequence("abcde", "ace");`)() === 3; } catch { return false; } } },
    ],
  },
  {
    id: "word-break", number: 139, title: "Word Break", difficulty: "Medium",
    topics: ["dp","hash-map","trie"], companies: ["Amazon","Meta","Google"], acceptance: 46, xp: 15,
    problemStatement: "Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.",
    examples: [{"input":"s = \"leetcode\", wordDict = [\"leet\",\"code\"]","output":"true"}],
    constraints: ["1 <= s.length <= 300"],
    conceptOverview: "`dp[i]` indicates if substring `s[0...i-1]` can be segmented.",
    patternRecognition: "1D Dynamic Programming Substring Matching",
    sampleTests: [{"name":"leetcode -> true","input":["leetcode",["leet","code"]],"expected":true}],
    starterCode: "/**\n * @param {string} s\n * @param {string[]} wordDict\n * @return {boolean}\n */\nfunction wordBreak(s, wordDict) {\n}",
    hints: ["dp[i] is true if s[j...i-1] in dict and dp[j] is true."],
    bruteForceSolution: {"code":"function wordBreak(s, wordDict) {\n  const set = new Set(wordDict);\n  const dp = new Array(s.length + 1).fill(false);\n  dp[0] = true;\n  for (let i = 1; i <= s.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (dp[j] && set.has(s.substring(j, i))) {\n        dp[i] = true;\n        break;\n      }\n    }\n  }\n  return dp[s.length];\n}","timeComplexity":"O(n^2)","spaceComplexity":"O(n)","explanation":"1D DP table."},
    optimizedSolution: {"code":"function wordBreak(s, wordDict) {\n  const set = new Set(wordDict);\n  const dp = new Array(s.length + 1).fill(false);\n  dp[0] = true;\n  for (let i = 1; i <= s.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (dp[j] && set.has(s.substring(j, i))) {\n        dp[i] = true;\n        break;\n      }\n    }\n  }\n  return dp[s.length];\n}","timeComplexity":"O(n^2)","spaceComplexity":"O(n)","explanation":"DP boolean array."},
    interviewExplanation: "Use 1D DP where dp[i] represents whether prefix s[0..i] can be formed using dictionary words.",
    tests: [
      { name: "Segments word correctly", validate: (code) => { try { return new Function(`${code}; return wordBreak("leetcode", ["leet","code"]);`)() === true; } catch { return false; } } },
    ],
  },
  {
    id: "combination-sum", number: 48, title: "Combination Sum", difficulty: "Medium",
    topics: ["backtracking","arrays"], companies: ["Airbnb","Amazon"], acceptance: 70, xp: 15,
    problemStatement: "Given an array of **distinct** integers `candidates` and a target integer `target`, return a list of all **unique combinations** of `candidates` where the chosen numbers sum to `target`.",
    examples: [{"input":"candidates = [2,3,6,7], target = 7","output":"[[2,2,3],[7]]"}],
    constraints: ["1 <= candidates.length <= 30"],
    conceptOverview: "Backtracking pick or skip decisions allowing unlimited reuse of elements.",
    patternRecognition: "Backtracking with Element Reuse",
    sampleTests: [{"name":"Target 7","input":[[2,3,6,7],7],"expected":[[2,2,3],[7]]}],
    starterCode: "/**\n * @param {number[]} candidates\n * @param {number} target\n * @return {number[][]}\n */\nfunction combinationSum(candidates, target) {\n}",
    hints: ["Recursive backtracking maintaining current index."],
    bruteForceSolution: {"code":"function combinationSum(candidates, target) {\n  const res = [];\n  function dfs(i, cur, total) {\n    if (total === target) { res.push([...cur]); return; }\n    if (i >= candidates.length || total > target) return;\n    cur.push(candidates[i]);\n    dfs(i, cur, total + candidates[i]);\n    cur.pop();\n    dfs(i + 1, cur, total);\n  }\n  dfs(0, [], 0);\n  return res;\n}","timeComplexity":"O(2^t)","spaceComplexity":"O(t)","explanation":"Backtracking tree."},
    optimizedSolution: {"code":"function combinationSum(candidates, target) {\n  const res = [];\n  function dfs(i, cur, total) {\n    if (total === target) { res.push([...cur]); return; }\n    if (i >= candidates.length || total > target) return;\n    cur.push(candidates[i]);\n    dfs(i, cur, total + candidates[i]);\n    cur.pop();\n    dfs(i + 1, cur, total);\n  }\n  dfs(0, [], 0);\n  return res;\n}","timeComplexity":"O(2^target)","spaceComplexity":"O(target)","explanation":"Depth-first search backtracking."},
    interviewExplanation: "At each step, either include candidate[i] again or advance to candidate[i+1].",
    tests: [
      { name: "Finds combinations", validate: (code) => { try { const r = new Function(`${code}; return combinationSum([2,3,6,7], 7);`)(); return r.length === 2; } catch { return false; } } },
    ],
  },
  {
    id: "house-robber", number: 198, title: "House Robber", difficulty: "Medium",
    topics: ["dp"], companies: ["Google","Amazon"], acceptance: 50, xp: 15,
    problemStatement: "Return the maximum amount of money you can rob tonight without alerting police (cannot rob adjacent houses).",
    examples: [{"input":"nums = [1,2,3,1]","output":"4"}],
    constraints: ["1 <= nums.length <= 100"],
    conceptOverview: "`rob[i] = max(rob[i-1], rob[i-2] + nums[i])`.",
    patternRecognition: "1D Dynamic Programming (Skip Adjacent)",
    sampleTests: [{"name":"[1,2,3,1] -> 4","input":[[1,2,3,1]],"expected":4}],
    starterCode: "/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction rob(nums) {\n}",
    hints: ["Track max profit up to house i-1 and house i-2."],
    bruteForceSolution: {"code":"function rob(nums) {\n  let rob1 = 0, rob2 = 0;\n  for (const n of nums) {\n    let temp = Math.max(n + rob1, rob2);\n    rob1 = rob2;\n    rob2 = temp;\n  }\n  return rob2;\n}","timeComplexity":"O(n)","spaceComplexity":"O(1)","explanation":"Two variable DP."},
    optimizedSolution: {"code":"function rob(nums) {\n  let rob1 = 0, rob2 = 0;\n  for (const n of nums) {\n    let temp = Math.max(n + rob1, rob2);\n    rob1 = rob2;\n    rob2 = temp;\n  }\n  return rob2;\n}","timeComplexity":"O(n)","spaceComplexity":"O(1)","explanation":"Constant space DP."},
    interviewExplanation: "Maintain two pointers rob1 and rob2 representing max loot skipping current vs taking current.",
    tests: [
      { name: "Max loot calculated", validate: (code) => { try { return new Function(`${code}; return rob([1,2,3,1]);`)() === 4; } catch { return false; } } },
    ],
  },
  {
    id: "house-robber-ii", number: 213, title: "House Robber II", difficulty: "Medium",
    topics: ["dp"], companies: ["Google","Microsoft"], acceptance: 41, xp: 15,
    problemStatement: "Houses are arranged in a **circle**. Return the maximum money you can rob without alerting police.",
    examples: [{"input":"nums = [2,3,2]","output":"3"}],
    constraints: ["1 <= nums.length <= 100"],
    conceptOverview: "Run House Robber I twice: once for `nums[0...n-2]` and once for `nums[1...n-1]`.",
    patternRecognition: "Circular DP Decomposition",
    sampleTests: [{"name":"[2,3,2] -> 3","input":[[2,3,2]],"expected":3}],
    starterCode: "/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction rob(nums) {\n}",
    hints: ["First and last house cannot be robbed together."],
    bruteForceSolution: {"code":"function rob(nums) {\n  if (nums.length === 1) return nums[0];\n  function helper(arr) {\n    let r1 = 0, r2 = 0;\n    for (let n of arr) { let t = Math.max(n + r1, r2); r1 = r2; r2 = t; }\n    return r2;\n  }\n  return Math.max(helper(nums.slice(0, nums.length - 1)), helper(nums.slice(1)));\n}","timeComplexity":"O(n)","spaceComplexity":"O(1)","explanation":"Splits circle into two linear ranges."},
    optimizedSolution: {"code":"function rob(nums) {\n  if (nums.length === 1) return nums[0];\n  function helper(arr) {\n    let r1 = 0, r2 = 0;\n    for (let n of arr) { let t = Math.max(n + r1, r2); r1 = r2; r2 = t; }\n    return r2;\n  }\n  return Math.max(helper(nums.slice(0, nums.length - 1)), helper(nums.slice(1)));\n}","timeComplexity":"O(n)","spaceComplexity":"O(1)","explanation":"Linear DP on two slices."},
    interviewExplanation: "Since house 0 and house n-1 are adjacent, take max of robbing houses 0..n-2 and 1..n-1.",
    tests: [
      { name: "Circular robbing solved", validate: (code) => { try { return new Function(`${code}; return rob([2,3,2]);`)() === 3; } catch { return false; } } },
    ],
  },
  {
    id: "decode-ways", number: 91, title: "Decode Ways", difficulty: "Medium",
    topics: ["dp"], companies: ["Meta","Amazon"], acceptance: 34, xp: 15,
    problemStatement: "Return the number of ways to decode a numeric string into letters (1 -> 'A', 26 -> 'Z').",
    examples: [{"input":"s = \"226\"","output":"3"}],
    constraints: ["1 <= s.length <= 100"],
    conceptOverview: "Single digit valid if '1'-'9'; two digits valid if '10'-'26'.",
    patternRecognition: "1D Dynamic Programming String Partitioning",
    sampleTests: [{"name":"\"226\" -> 3","input":["226"],"expected":3}],
    starterCode: "/**\n * @param {string} s\n * @return {number}\n */\nfunction numDecodings(s) {\n}",
    hints: ["dp[i] depends on single digit valid check and double digit valid check."],
    bruteForceSolution: {"code":"function numDecodings(s) {\n  if (!s || s[0] === '0') return 0;\n  const dp = new Array(s.length + 1).fill(0);\n  dp[0] = 1; dp[1] = 1;\n  for (let i = 2; i <= s.length; i++) {\n    const one = parseInt(s.substring(i - 1, i));\n    const two = parseInt(s.substring(i - 2, i));\n    if (one >= 1 && one <= 9) dp[i] += dp[i - 1];\n    if (two >= 10 && two <= 26) dp[i] += dp[i - 2];\n  }\n  return dp[s.length];\n}","timeComplexity":"O(n)","spaceComplexity":"O(n)","explanation":"1D DP decoding table."},
    optimizedSolution: {"code":"function numDecodings(s) {\n  if (!s || s[0] === '0') return 0;\n  const dp = new Array(s.length + 1).fill(0);\n  dp[0] = 1; dp[1] = 1;\n  for (let i = 2; i <= s.length; i++) {\n    const one = parseInt(s.substring(i - 1, i));\n    const two = parseInt(s.substring(i - 2, i));\n    if (one >= 1 && one <= 9) dp[i] += dp[i - 1];\n    if (two >= 10 && two <= 26) dp[i] += dp[i - 2];\n  }\n  return dp[s.length];\n}","timeComplexity":"O(n)","spaceComplexity":"O(n)","explanation":"DP single & double digit lookback."},
    interviewExplanation: "Check valid 1-digit and 2-digit encodings at each index to transition DP values.",
    tests: [
      { name: "Decodes 226 correctly", validate: (code) => { try { return new Function(`${code}; return numDecodings("226");`)() === 3; } catch { return false; } } },
    ],
  },
  {
    id: "unique-paths", number: 62, title: "Unique Paths", difficulty: "Medium",
    topics: ["dp"], companies: ["Google","Amazon"], acceptance: 63, xp: 15,
    problemStatement: "Return the number of unique paths from top-left to bottom-right of an `m x n` grid moving only right or down.",
    examples: [{"input":"m = 3, n = 7","output":"28"}],
    constraints: ["1 <= m, n <= 100"],
    conceptOverview: "`dp[i][j] = dp[i-1][j] + dp[i][j-1]`.",
    patternRecognition: "2D Grid Combinatorics / DP",
    sampleTests: [{"name":"3 x 7","input":[3,7],"expected":28}],
    starterCode: "/**\n * @param {number} m\n * @param {number} n\n * @return {number}\n */\nfunction uniquePaths(m, n) {\n}",
    hints: ["Base case: row 0 and col 0 are all 1."],
    bruteForceSolution: {"code":"function uniquePaths(m, n) {\n  const row = new Array(n).fill(1);\n  for (let i = 1; i < m; i++) {\n    for (let j = 1; j < n; j++) {\n      row[j] += row[j - 1];\n    }\n  }\n  return row[n - 1];\n}","timeComplexity":"O(m*n)","spaceComplexity":"O(n)","explanation":"Space-optimized 1D row DP."},
    optimizedSolution: {"code":"function uniquePaths(m, n) {\n  const row = new Array(n).fill(1);\n  for (let i = 1; i < m; i++) {\n    for (let j = 1; j < n; j++) {\n      row[j] += row[j - 1];\n    }\n  }\n  return row[n - 1];\n}","timeComplexity":"O(m*n)","spaceComplexity":"O(n)","explanation":"Single row array cumulative summation."},
    interviewExplanation: "The number of ways to reach cell (i, j) is the sum of ways from above cell and left cell.",
    tests: [
      { name: "Calculates grid unique paths", validate: (code) => { try { return new Function(`${code}; return uniquePaths(3, 7);`)() === 28; } catch { return false; } } },
    ],
  },
  {
    id: "jump-game", number: 68, title: "Jump Game", difficulty: "Medium",
    topics: ["greedy","dp"], companies: ["Amazon","Microsoft"], acceptance: 38, xp: 15,
    problemStatement: "Return `true` if you can reach the last index starting from index 0 with maximum jump lengths given by `nums[i]`.",
    examples: [{"input":"nums = [2,3,1,1,4]","output":"true"}],
    constraints: ["1 <= nums.length <= 10^4"],
    conceptOverview: "Greedy backward goal post shift.",
    patternRecognition: "Greedy Reachability",
    sampleTests: [{"name":"[2,3,1,1,4] -> true","input":[[2,3,1,1,4]],"expected":true}],
    starterCode: "/**\n * @param {number[]} nums\n * @return {boolean}\n */\nfunction canJump(nums) {\n}",
    hints: ["Track target goal from right to left."],
    bruteForceSolution: {"code":"function canJump(nums) {\n  let goal = nums.length - 1;\n  for (let i = nums.length - 1; i >= 0; i--) {\n    if (i + nums[i] >= goal) goal = i;\n  }\n  return goal === 0;\n}","timeComplexity":"O(n)","spaceComplexity":"O(1)","explanation":"Backward greedy goal post update."},
    optimizedSolution: {"code":"function canJump(nums) {\n  let goal = nums.length - 1;\n  for (let i = nums.length - 1; i >= 0; i--) {\n    if (i + nums[i] >= goal) goal = i;\n  }\n  return goal === 0;\n}","timeComplexity":"O(n)","spaceComplexity":"O(1)","explanation":"Greedy single pass."},
    interviewExplanation: "Iterate backwards starting from end; if current index plus jump distance reaches goal, shift goal to current index.",
    tests: [
      { name: "Determines reachability", validate: (code) => { try { return new Function(`${code}; return canJump([2,3,1,1,4]);`)() === true; } catch { return false; } } },
    ],
  },
  {
    id: "course-schedule", number: 207, title: "Course Schedule", difficulty: "Medium",
    topics: ["graphs","topological-sort"], companies: ["Amazon","Google"], acceptance: 46, xp: 15,
    problemStatement: "Determine if you can finish all `numCourses` given prerequisite pairs `[a, b]`.",
    examples: [{"input":"numCourses = 2, prerequisites = [[1,0]]","output":"true"}],
    constraints: ["1 <= numCourses <= 2000"],
    conceptOverview: "Detect cycles in directed graph using DFS or Topological Sort.",
    patternRecognition: "Graph Cycle Detection / Topological Sort",
    sampleTests: [{"name":"2 courses, no cycle","input":[2,[[1,0]]],"expected":true}],
    starterCode: "/**\n * @param {number} numCourses\n * @param {number[][]} prerequisites\n * @return {boolean}\n */\nfunction canFinish(numCourses, prerequisites) {\n}",
    hints: ["Build adjacency list and check for directed cycles."],
    bruteForceSolution: {"code":"function canFinish(numCourses, prerequisites) {\n  const adj = Array.from({length: numCourses}, () => []);\n  for (let [a, b] of prerequisites) adj[b].push(a);\n  const visited = new Array(numCourses).fill(0);\n  function dfs(node) {\n    if (visited[node] === 1) return true;\n    if (visited[node] === 2) return false;\n    visited[node] = 1;\n    for (let neighbor of adj[node]) {\n      if (dfs(neighbor)) return true;\n    }\n    visited[node] = 2;\n    return false;\n  }\n  for (let i = 0; i < numCourses; i++) {\n    if (dfs(i)) return false;\n  }\n  return true;\n}","timeComplexity":"O(V + E)","spaceComplexity":"O(V + E)","explanation":"DFS directed cycle check."},
    optimizedSolution: {"code":"function canFinish(numCourses, prerequisites) {\n  const adj = Array.from({length: numCourses}, () => []);\n  for (let [a, b] of prerequisites) adj[b].push(a);\n  const visited = new Array(numCourses).fill(0);\n  function dfs(node) {\n    if (visited[node] === 1) return true;\n    if (visited[node] === 2) return false;\n    visited[node] = 1;\n    for (let neighbor of adj[node]) {\n      if (dfs(neighbor)) return true;\n    }\n    visited[node] = 2;\n    return false;\n  }\n  for (let i = 0; i < numCourses; i++) {\n    if (dfs(i)) return false;\n  }\n  return true;\n}","timeComplexity":"O(V + E)","spaceComplexity":"O(V + E)","explanation":"DFS directed cycle check."},
    interviewExplanation: "Construct graph and run DFS to verify no back-edges (cycles) exist.",
    tests: [
      { name: "Detects cycle", validate: (code) => { try { return new Function(`${code}; return canFinish(2, [[1,0],[0,1]]);`)() === false; } catch { return false; } } },
    ],
  },
  {
    id: "pacific-atlantic-water-flow", number: 417, title: "Pacific Atlantic Water Flow", difficulty: "Medium",
    topics: ["graphs"], companies: ["Google","Amazon"], acceptance: 55, xp: 15,
    problemStatement: "Return grid coordinates where water can flow to **both** Pacific and Atlantic oceans.",
    examples: [{"input":"heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]","output":"7 cells"}],
    constraints: ["1 <= m, n <= 200"],
    conceptOverview: "Run DFS/BFS inward from Pacific and Atlantic borders separately, then intersect.",
    patternRecognition: "Reverse Graph Search / Flood Fill",
    sampleTests: [{"name":"Intersection count","input":[[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]],"expected":7}],
    starterCode: "/**\n * @param {number[][]} heights\n * @return {number[][]}\n */\nfunction pacificAtlantic(heights) {\n}",
    hints: ["Search upwards/inwards from oceans rather than downwards from every cell."],
    bruteForceSolution: {"code":"function pacificAtlantic(heights) {\n  const m = heights.length, n = heights[0].length;\n  const pac = Array.from({length: m}, () => new Array(n).fill(false));\n  const atl = Array.from({length: m}, () => new Array(n).fill(false));\n  function dfs(r, c, visit, prev) {\n    if (r<0||c<0||r>=m||c>=n||visit[r][c]||heights[r][c]<prev) return;\n    visit[r][c] = true;\n    dfs(r+1,c,visit,heights[r][c]); dfs(r-1,c,visit,heights[r][c]);\n    dfs(r,c+1,visit,heights[r][c]); dfs(r,c-1,visit,heights[r][c]);\n  }\n  for (let i = 0; i < m; i++) { dfs(i, 0, pac, heights[i][0]); dfs(i, n-1, atl, heights[i][n-1]); }\n  for (let j = 0; j < n; j++) { dfs(0, j, pac, heights[0][j]); dfs(m-1, j, atl, heights[m-1][j]); }\n  const res = [];\n  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) if (pac[i][j] && atl[i][j]) res.push([i,j]);\n  return res;\n}","timeComplexity":"O(m*n)","spaceComplexity":"O(m*n)","explanation":"Flood fill from Pacific and Atlantic borders."},
    optimizedSolution: {"code":"function pacificAtlantic(heights) {\n  const m = heights.length, n = heights[0].length;\n  const pac = Array.from({length: m}, () => new Array(n).fill(false));\n  const atl = Array.from({length: m}, () => new Array(n).fill(false));\n  function dfs(r, c, visit, prev) {\n    if (r<0||c<0||r>=m||c>=n||visit[r][c]||heights[r][c]<prev) return;\n    visit[r][c] = true;\n    dfs(r+1,c,visit,heights[r][c]); dfs(r-1,c,visit,heights[r][c]);\n    dfs(r,c+1,visit,heights[r][c]); dfs(r,c-1,visit,heights[r][c]);\n  }\n  for (let i = 0; i < m; i++) { dfs(i, 0, pac, heights[i][0]); dfs(i, n-1, atl, heights[i][n-1]); }\n  for (let j = 0; j < n; j++) { dfs(0, j, pac, heights[0][j]); dfs(m-1, j, atl, heights[m-1][j]); }\n  const res = [];\n  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) if (pac[i][j] && atl[i][j]) res.push([i,j]);\n  return res;\n}","timeComplexity":"O(m*n)","spaceComplexity":"O(m*n)","explanation":"Flood fill from Pacific and Atlantic borders."},
    interviewExplanation: "Start DFS from ocean borders going uphill; cells reached by both oceans are in the result.",
    tests: [
      { name: "Returns ocean intersection cells", validate: (code) => { try { return new Function(`${code}; return pacificAtlantic([[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]).length;`)() === 7; } catch { return false; } } },
    ],
  },
  {
    id: "alien-dictionary", number: 269, title: "Alien Dictionary", difficulty: "Hard",
    topics: ["graphs","topological-sort"], companies: ["Meta","Airbnb"], acceptance: 36, xp: 20,
    problemStatement: "Given a sorted dictionary of alien words, return the order of letters in the alien language.",
    examples: [{"input":"words = [\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]","output":"\"wertf\""}],
    constraints: ["1 <= words.length <= 100"],
    conceptOverview: "Compare adjacent words to build directed character dependencies, then run Kahn's algorithm topological sort.",
    patternRecognition: "Graph Topological Ordering",
    sampleTests: [{"name":"Example 1","input":[["wrt","wrf","er","ett","rftt"]],"expected":"wertf"}],
    starterCode: "/**\n * @param {string[]} words\n * @return {string}\n */\nfunction alienOrder(words) {\n}",
    hints: ["Compare first differing characters of adjacent words."],
    bruteForceSolution: {"code":"function alienOrder(words) {\n  const adj = {}; const inDegree = {};\n  for (let w of words) for (let c of w) { adj[c] = new Set(); inDegree[c] = 0; }\n  for (let i = 0; i < words.length - 1; i++) {\n    let w1 = words[i], w2 = words[i+1];\n    if (w1.length > w2.length && w1.startsWith(w2)) return \"\";\n    for (let j = 0; j < Math.min(w1.length, w2.length); j++) {\n      if (w1[j] !== w2[j]) {\n        if (!adj[w1[j]].has(w2[j])) {\n          adj[w1[j]].add(w2[j]); inDegree[w2[j]]++;\n        }\n        break;\n      }\n    }\n  }\n  const queue = Object.keys(inDegree).filter(c => inDegree[c] === 0);\n  let res = \"\";\n  while (queue.length) {\n    let char = queue.shift(); res += char;\n    for (let next of adj[char]) {\n      inDegree[next]--;\n      if (inDegree[next] === 0) queue.push(next);\n    }\n  }\n  return res.length === Object.keys(inDegree).length ? res : \"\";\n}","timeComplexity":"O(C)","spaceComplexity":"O(1)","explanation":"Kahn's topological sort."},
    optimizedSolution: {"code":"function alienOrder(words) {\n  const adj = {}; const inDegree = {};\n  for (let w of words) for (let c of w) { adj[c] = new Set(); inDegree[c] = 0; }\n  for (let i = 0; i < words.length - 1; i++) {\n    let w1 = words[i], w2 = words[i+1];\n    if (w1.length > w2.length && w1.startsWith(w2)) return \"\";\n    for (let j = 0; j < Math.min(w1.length, w2.length); j++) {\n      if (w1[j] !== w2[j]) {\n        if (!adj[w1[j]].has(w2[j])) {\n          adj[w1[j]].add(w2[j]); inDegree[w2[j]]++;\n        }\n        break;\n      }\n    }\n  }\n  const queue = Object.keys(inDegree).filter(c => inDegree[c] === 0);\n  let res = \"\";\n  while (queue.length) {\n    let char = queue.shift(); res += char;\n    for (let next of adj[char]) {\n      inDegree[next]--;\n      if (inDegree[next] === 0) queue.push(next);\n    }\n  }\n  return res.length === Object.keys(inDegree).length ? res : \"\";\n}","timeComplexity":"O(C)","spaceComplexity":"O(1)","explanation":"DAG topological sorting on character graph."},
    interviewExplanation: "Build character precedence rules from adjacent words and topologically sort.",
    tests: [
      { name: "Derives character precedence", validate: (code) => { try { return new Function(`${code}; return alienOrder(["wrt","wrf","er","ett","rftt"]);`)() === "wertf"; } catch { return false; } } },
    ],
  },
  {
    id: "graph-valid-tree", number: 261, title: "Graph Valid Tree", difficulty: "Medium",
    topics: ["graphs"], companies: ["Google","LinkedIn"], acceptance: 47, xp: 15,
    problemStatement: "Given `n` nodes labeled from `0` to `n - 1` and a list of undirected edges, check if these edges form a valid tree (connected, no cycles).",
    examples: [{"input":"n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]","output":"true"}],
    constraints: ["1 <= n <= 2000"],
    conceptOverview: "A graph is a valid tree if it has exactly `n - 1` edges and is fully connected (no cycles).",
    patternRecognition: "Union-Find / DFS Connectivity & Cycle Check",
    sampleTests: [{"name":"Valid tree","input":[5,[[0,1],[0,2],[0,3],[1,4]]],"expected":true}],
    starterCode: "/**\n * @param {number} n\n * @param {number[][]} edges\n * @return {boolean}\n */\nfunction validTree(n, edges) {\n}",
    hints: ["Check if edges.length === n - 1 and all nodes are connected."],
    bruteForceSolution: {"code":"function validTree(n, edges) {\n  if (edges.length !== n - 1) return false;\n  const adj = Array.from({length: n}, () => []);\n  for (let [u, v] of edges) { adj[u].push(v); adj[v].push(u); }\n  const visited = new Set();\n  function dfs(node) {\n    visited.add(node);\n    for (let neighbor of adj[node]) if (!visited.has(neighbor)) dfs(neighbor);\n  }\n  dfs(0);\n  return visited.size === n;\n}","timeComplexity":"O(V + E)","spaceComplexity":"O(V + E)","explanation":"Graph connectivity check."},
    optimizedSolution: {"code":"function validTree(n, edges) {\n  if (edges.length !== n - 1) return false;\n  const parent = Array.from({length: n}, (_, i) => i);\n  function find(i) { if (parent[i] === i) return i; return parent[i] = find(parent[i]); }\n  for (let [u, v] of edges) {\n    let r1 = find(u), r2 = find(v);\n    if (r1 === r2) return false;\n    parent[r1] = r2;\n  }\n  return true;\n}","timeComplexity":"O(V alpha(V))","spaceComplexity":"O(V)","explanation":"Union-Find cycle & edge count."},
    interviewExplanation: "A valid tree must have n-1 edges and no cycles.",
    tests: [
      { name: "Checks valid tree", validate: (code) => { try { return new Function(`${code}; return validTree(5, [[0,1],[0,2],[0,3],[1,4]]);`)() === true; } catch { return false; } } },
    ],
  },
  {
    id: "number-of-connected-components", number: 323, title: "Number of Connected Components in an Undirected Graph", difficulty: "Medium",
    topics: ["graphs"], companies: ["Amazon","Google"], acceptance: 62, xp: 15,
    problemStatement: "Given `n` nodes and undirected `edges`, return the number of connected components.",
    examples: [{"input":"n = 5, edges = [[0,1],[1,2],[3,4]]","output":"2"}],
    constraints: ["1 <= n <= 2000"],
    conceptOverview: "Union-Find or DFS starting from unvisited nodes.",
    patternRecognition: "Union-Find Disjoint Set",
    sampleTests: [{"name":"2 components","input":[5,[[0,1],[1,2],[3,4]]],"expected":2}],
    starterCode: "/**\n * @param {number} n\n * @param {number[][]} edges\n * @return {number}\n */\nfunction countComponents(n, edges) {\n}",
    hints: ["Start with n components, decrement each successful union."],
    bruteForceSolution: {"code":"function countComponents(n, edges) {\n  const parent = Array.from({length: n}, (_, i) => i);\n  let res = n;\n  function find(i) { return parent[i] === i ? i : (parent[i] = find(parent[i])); }\n  for (let [u, v] of edges) {\n    let r1 = find(u), r2 = find(v);\n    if (r1 !== r2) { parent[r1] = r2; res--; }\n  }\n  return res;\n}","timeComplexity":"O(V)","spaceComplexity":"O(V)","explanation":"Union-Find counting."},
    optimizedSolution: {"code":"function countComponents(n, edges) {\n  const parent = Array.from({length: n}, (_, i) => i);\n  let res = n;\n  function find(i) { return parent[i] === i ? i : (parent[i] = find(parent[i])); }\n  for (let [u, v] of edges) {\n    let r1 = find(u), r2 = find(v);\n    if (r1 !== r2) { parent[r1] = r2; res--; }\n  }\n  return res;\n}","timeComplexity":"O(V)","spaceComplexity":"O(V)","explanation":"Disjoint Set Union."},
    interviewExplanation: "Start with count = n and decrement count whenever two distinct components are joined.",
    tests: [
      { name: "Counts components", validate: (code) => { try { return new Function(`${code}; return countComponents(5, [[0,1],[1,2],[3,4]]);`)() === 2; } catch { return false; } } },
    ],
  },
  {
    id: "insert-interval", number: 72, title: "Insert Interval", difficulty: "Medium",
    topics: ["arrays"], companies: ["Google","Meta"], acceptance: 40, xp: 15,
    problemStatement: "Insert `newInterval` into `intervals` (sorted non-overlapping) and merge if necessary.",
    examples: [{"input":"intervals = [[1,3],[6,9]], newInterval = [2,5]","output":"[[1,5],[6,9]]"}],
    constraints: ["0 <= intervals.length <= 10^4"],
    conceptOverview: "Three phases: add non-overlapping before, merge overlapping in middle, add non-overlapping after.",
    patternRecognition: "Interval Manipulation",
    sampleTests: [{"name":"Merged interval","input":[[[1,3],[6,9]],[2,5]],"expected":[[1,5],[6,9]]}],
    starterCode: "/**\n * @param {number[][]} intervals\n * @param {number[]} newInterval\n * @return {number[][]}\n */\nfunction insert(intervals, newInterval) {\n}",
    hints: ["Iterate through intervals and merge when overlap occurs."],
    bruteForceSolution: {"code":"function insert(intervals, newInterval) {\n  const res = [];\n  let i = 0;\n  while (i < intervals.length && intervals[i][1] < newInterval[0]) {\n    res.push(intervals[i++]);\n  }\n  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {\n    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);\n    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);\n    i++;\n  }\n  res.push(newInterval);\n  while (i < intervals.length) res.push(intervals[i++]);\n  return res;\n}","timeComplexity":"O(n)","spaceComplexity":"O(n)","explanation":"Single pass interval merging."},
    optimizedSolution: {"code":"function insert(intervals, newInterval) {\n  const res = [];\n  let i = 0;\n  while (i < intervals.length && intervals[i][1] < newInterval[0]) {\n    res.push(intervals[i++]);\n  }\n  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {\n    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);\n    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);\n    i++;\n  }\n  res.push(newInterval);\n  while (i < intervals.length) res.push(intervals[i++]);\n  return res;\n}","timeComplexity":"O(n)","spaceComplexity":"O(n)","explanation":"O(n) linear sweep."},
    interviewExplanation: "Push left non-overlapping, expand newInterval with overlapping, push right non-overlapping.",
    tests: [
      { name: "Inserts and merges interval", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return insert([[1,3],[6,9]], [2,5]);`)()) === JSON.stringify([[1,5],[6,9]]); } catch { return false; } } },
    ],
  },
  {
    id: "merge-intervals", number: 70, title: "Merge Intervals", difficulty: "Medium",
    topics: ["arrays","sorting"], companies: ["Amazon","Meta","Google"], acceptance: 47, xp: 15,
    problemStatement: "Given an array of `intervals`, merge all overlapping intervals.",
    examples: [{"input":"intervals = [[1,3],[2,6],[8,10],[15,18]]","output":"[[1,6],[8,10],[15,18]]"}],
    constraints: ["1 <= intervals.length <= 10^4"],
    conceptOverview: "Sort intervals by start time, then merge adjacent intervals if `curr.start <= prev.end`.",
    patternRecognition: "Sorting + Greedy Interval Merge",
    sampleTests: [{"name":"Example 1","input":[[[1,3],[2,6],[8,10],[15,18]]],"expected":[[1,6],[8,10],[15,18]]}],
    starterCode: "/**\n * @param {number[][]} intervals\n * @return {number[][]}\n */\nfunction merge(intervals) {\n}",
    hints: ["Sort by start time first."],
    bruteForceSolution: {"code":"function merge(intervals) {\n  intervals.sort((a, b) => a[0] - b[0]);\n  const res = [intervals[0]];\n  for (let i = 1; i < intervals.length; i++) {\n    let last = res[res.length - 1];\n    if (intervals[i][0] <= last[1]) last[1] = Math.max(last[1], intervals[i][1]);\n    else res.push(intervals[i]);\n  }\n  return res;\n}","timeComplexity":"O(n log n)","spaceComplexity":"O(n)","explanation":"Sort and merge."},
    optimizedSolution: {"code":"function merge(intervals) {\n  intervals.sort((a, b) => a[0] - b[0]);\n  const res = [intervals[0]];\n  for (let i = 1; i < intervals.length; i++) {\n    let last = res[res.length - 1];\n    if (intervals[i][0] <= last[1]) last[1] = Math.max(last[1], intervals[i][1]);\n    else res.push(intervals[i]);\n  }\n  return res;\n}","timeComplexity":"O(n log n)","spaceComplexity":"O(n)","explanation":"Sort by start time and linear merge."},
    interviewExplanation: "Sorting ensures overlapping intervals are contiguous in the list.",
    tests: [
      { name: "Merges overlapping intervals", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return merge([[1,3],[2,6],[8,10],[15,18]]);`)()) === JSON.stringify([[1,6],[8,10],[15,18]]); } catch { return false; } } },
    ],
  },
  {
    id: "non-overlapping-intervals", number: 435, title: "Non-overlapping Intervals", difficulty: "Medium",
    topics: ["greedy","sorting"], companies: ["Meta","Amazon"], acceptance: 53, xp: 15,
    problemStatement: "Return the minimum number of intervals you need to remove to make the rest non-overlapping.",
    examples: [{"input":"intervals = [[1,2],[2,3],[3,4],[1,3]]","output":"1"}],
    constraints: ["1 <= intervals.length <= 10^5"],
    conceptOverview: "Greedy scheduling problem: sort by end time, pick interval with earliest end time.",
    patternRecognition: "Interval Scheduling / Greedy Choice",
    sampleTests: [{"name":"Remove 1","input":[[[1,2],[2,3],[3,4],[1,3]]],"expected":1}],
    starterCode: "/**\n * @param {number[][]} intervals\n * @return {number}\n */\nfunction eraseOverlapIntervals(intervals) {\n}",
    hints: ["Sort intervals by end time."],
    bruteForceSolution: {"code":"function eraseOverlapIntervals(intervals) {\n  intervals.sort((a, b) => a[1] - b[1]);\n  let count = 0, prevEnd = intervals[0][1];\n  for (let i = 1; i < intervals.length; i++) {\n    if (intervals[i][0] < prevEnd) count++;\n    else prevEnd = intervals[i][1];\n  }\n  return count;\n}","timeComplexity":"O(n log n)","spaceComplexity":"O(1)","explanation":"Greedy choice by end time."},
    optimizedSolution: {"code":"function eraseOverlapIntervals(intervals) {\n  intervals.sort((a, b) => a[1] - b[1]);\n  let count = 0, prevEnd = intervals[0][1];\n  for (let i = 1; i < intervals.length; i++) {\n    if (intervals[i][0] < prevEnd) count++;\n    else prevEnd = intervals[i][1];\n  }\n  return count;\n}","timeComplexity":"O(n log n)","spaceComplexity":"O(1)","explanation":"Earliest end time greedy sorting."},
    interviewExplanation: "Sorting by end time leaves maximum room for future non-overlapping intervals.",
    tests: [
      { name: "Calculates removals needed", validate: (code) => { try { return new Function(`${code}; return eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]]);`)() === 1; } catch { return false; } } },
    ],
  },
  {
    id: "meeting-rooms", number: 252, title: "Meeting Rooms", difficulty: "Easy",
    topics: ["sorting","arrays"], companies: ["Google","Amazon"], acceptance: 57, xp: 10,
    problemStatement: "Given an array of meeting time intervals `[[start, end]]`, determine if a person could attend all meetings.",
    examples: [{"input":"intervals = [[0,30],[5,10],[15,20]]","output":"false"},{"input":"intervals = [[7,10],[2,4]]","output":"true"}],
    constraints: ["0 <= intervals.length <= 10^4"],
    conceptOverview: "Sort by start time, check if `intervals[i][0] < intervals[i-1][1]`.",
    patternRecognition: "Interval Sorting Overlap Check",
    sampleTests: [{"name":"Overlap -> false","input":[[[0,30],[5,10],[15,20]]],"expected":false},{"name":"No overlap -> true","input":[[[7,10],[2,4]]],"expected":true}],
    starterCode: "/**\n * @param {number[][]} intervals\n * @return {boolean}\n */\nfunction canAttendMeetings(intervals) {\n}",
    hints: ["Sort intervals by start time."],
    bruteForceSolution: {"code":"function canAttendMeetings(intervals) {\n  intervals.sort((a, b) => a[0] - b[0]);\n  for (let i = 1; i < intervals.length; i++) {\n    if (intervals[i][0] < intervals[i-1][1]) return false;\n  }\n  return true;\n}","timeComplexity":"O(n log n)","spaceComplexity":"O(1)","explanation":"Sort and adjacent check."},
    optimizedSolution: {"code":"function canAttendMeetings(intervals) {\n  intervals.sort((a, b) => a[0] - b[0]);\n  for (let i = 1; i < intervals.length; i++) {\n    if (intervals[i][0] < intervals[i-1][1]) return false;\n  }\n  return true;\n}","timeComplexity":"O(n log n)","spaceComplexity":"O(1)","explanation":"Sort by start time."},
    interviewExplanation: "If any meeting starts before the previous one ends, attending all is impossible.",
    tests: [
      { name: "Detects meeting conflicts", validate: (code) => { try { return new Function(`${code}; return canAttendMeetings([[0,30],[5,10],[15,20]]);`)() === false; } catch { return false; } } },
    ],
  },
  {
    id: "meeting-rooms-ii", number: 253, title: "Meeting Rooms II", difficulty: "Medium",
    topics: ["heap","sorting","two-pointers"], companies: ["Google","Amazon","Meta"], acceptance: 50, xp: 15,
    problemStatement: "Given an array of meeting time intervals, return the minimum number of conference rooms required.",
    examples: [{"input":"intervals = [[0,30],[5,10],[15,20]]","output":"2"}],
    constraints: ["0 <= intervals.length <= 10^4"],
    conceptOverview: "Separate start and end times, sort both, use two pointers to count active overlapping meetings.",
    patternRecognition: "Two Pointers / Min Heap Overlap Counter",
    sampleTests: [{"name":"2 rooms required","input":[[[0,30],[5,10],[15,20]]],"expected":2}],
    starterCode: "/**\n * @param {number[][]} intervals\n * @return {number}\n */\nfunction minMeetingRooms(intervals) {\n}",
    hints: ["Sort start times and end times independently."],
    bruteForceSolution: {"code":"function minMeetingRooms(intervals) {\n  const starts = intervals.map(i => i[0]).sort((a, b) => a - b);\n  const ends = intervals.map(i => i[1]).sort((a, b) => a - b);\n  let rooms = 0, endIdx = 0;\n  for (let i = 0; i < starts.length; i++) {\n    if (starts[i] < ends[endIdx]) rooms++;\n    else endIdx++;\n  }\n  return rooms;\n}","timeComplexity":"O(n log n)","spaceComplexity":"O(n)","explanation":"Two pointers on sorted starts and ends."},
    optimizedSolution: {"code":"function minMeetingRooms(intervals) {\n  const starts = intervals.map(i => i[0]).sort((a, b) => a - b);\n  const ends = intervals.map(i => i[1]).sort((a, b) => a - b);\n  let rooms = 0, endIdx = 0;\n  for (let i = 0; i < starts.length; i++) {\n    if (starts[i] < ends[endIdx]) rooms++;\n    else endIdx++;\n  }\n  return rooms;\n}","timeComplexity":"O(n log n)","spaceComplexity":"O(n)","explanation":"Chrono start/end pointer scanning."},
    interviewExplanation: "If a meeting starts before the earliest ending meeting finishes, we need an extra room.",
    tests: [
      { name: "Calculates rooms needed", validate: (code) => { try { return new Function(`${code}; return minMeetingRooms([[0,30],[5,10],[15,20]]);`)() === 2; } catch { return false; } } },
    ],
  },
  {
    id: "set-matrix-zeroes", number: 73, title: "Set Matrix Zeroes", difficulty: "Medium",
    topics: ["arrays"], companies: ["Microsoft","Amazon"], acceptance: 53, xp: 15,
    problemStatement: "Given an `m x n` integer matrix, if an element is `0`, set its entire row and column to `0` **in-place**.",
    examples: [{"input":"matrix = [[1,1,1],[1,0,1],[1,1,1]]","output":"[[1,0,1],[0,0,0],[1,0,1]]"}],
    constraints: ["1 <= m, n <= 200"],
    conceptOverview: "Use first row and first column as markers for zero setting.",
    patternRecognition: "In-Place Matrix State Marking",
    sampleTests: [{"name":"Example 1","input":[[[1,1,1],[1,0,1],[1,1,1]]],"expected":[[1,0,1],[0,0,0],[1,0,1]]}],
    starterCode: "/**\n * @param {number[][]} matrix\n * @return {void} Do not return anything, modify matrix in-place instead.\n */\nfunction setZeroes(matrix) {\n}",
    hints: ["Use first row/column as storage."],
    bruteForceSolution: {"code":"function setZeroes(matrix) {\n  const m = matrix.length, n = matrix[0].length;\n  let row0 = false;\n  for (let r = 0; r < m; r++) {\n    for (let c = 0; c < n; c++) {\n      if (matrix[r][c] === 0) {\n        matrix[0][c] = 0;\n        if (r > 0) matrix[r][0] = 0; else row0 = true;\n      }\n    }\n  }\n  for (let r = 1; r < m; r++) {\n    for (let c = 1; c < n; c++) {\n      if (matrix[0][c] === 0 || matrix[r][0] === 0) matrix[r][c] = 0;\n    }\n  }\n  if (matrix[0][0] === 0) for (let r = 0; r < m; r++) matrix[r][0] = 0;\n  if (row0) for (let c = 0; c < n; c++) matrix[0][c] = 0;\n  return matrix;\n}","timeComplexity":"O(m*n)","spaceComplexity":"O(1)","explanation":"O(1) space matrix modification."},
    optimizedSolution: {"code":"function setZeroes(matrix) {\n  const m = matrix.length, n = matrix[0].length;\n  let row0 = false;\n  for (let r = 0; r < m; r++) {\n    for (let c = 0; c < n; c++) {\n      if (matrix[r][c] === 0) {\n        matrix[0][c] = 0;\n        if (r > 0) matrix[r][0] = 0; else row0 = true;\n      }\n    }\n  }\n  for (let r = 1; r < m; r++) {\n    for (let c = 1; c < n; c++) {\n      if (matrix[0][c] === 0 || matrix[r][0] === 0) matrix[r][c] = 0;\n    }\n  }\n  if (matrix[0][0] === 0) for (let r = 0; r < m; r++) matrix[r][0] = 0;\n  if (row0) for (let c = 0; c < n; c++) matrix[0][c] = 0;\n  return matrix;\n}","timeComplexity":"O(m*n)","spaceComplexity":"O(1)","explanation":"In-place zeroing using 1st row/col as markers."},
    interviewExplanation: "Store row/col zero status in first row and first column to achieve O(1) space.",
    tests: [
      { name: "Sets zeroes in place", validate: (code) => { try { return JSON.stringify(new Function(`${code}; const m = [[1,1,1],[1,0,1],[1,1,1]]; setZeroes(m); return m;`)()) === JSON.stringify([[1,0,1],[0,0,0],[1,0,1]]); } catch { return false; } } },
    ],
  },
  {
    id: "spiral-matrix", number: 66, title: "Spiral Matrix", difficulty: "Medium",
    topics: ["arrays"], companies: ["Microsoft","Amazon"], acceptance: 48, xp: 15,
    problemStatement: "Given an `m x n` matrix, return all elements of the matrix in spiral order.",
    examples: [{"input":"matrix = [[1,2,3],[4,5,6],[7,8,9]]","output":"[1,2,3,6,9,8,7,4,5]"}],
    constraints: ["1 <= m, n <= 10"],
    conceptOverview: "4 boundaries (top, bottom, left, right) narrowed after each traversal leg.",
    patternRecognition: "Matrix Boundary Shrinking",
    sampleTests: [{"name":"3x3 matrix","input":[[[1,2,3],[4,5,6],[7,8,9]]],"expected":[1,2,3,6,9,8,7,4,5]}],
    starterCode: "/**\n * @param {number[][]} matrix\n * @return {number[]}\n */\nfunction spiralOrder(matrix) {\n}",
    hints: ["Maintain top, bottom, left, right boundaries."],
    bruteForceSolution: {"code":"function spiralOrder(matrix) {\n  const res = [];\n  let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;\n  while (top <= bottom && left <= right) {\n    for (let c = left; c <= right; c++) res.push(matrix[top][c]); top++;\n    for (let r = top; r <= bottom; r++) res.push(matrix[r][right]); right--;\n    if (top <= bottom) { for (let c = right; c >= left; c--) res.push(matrix[bottom][c]); bottom--; }\n    if (left <= right) { for (let r = bottom; r >= top; r--) res.push(matrix[r][left]); left++; }\n  }\n  return res;\n}","timeComplexity":"O(m*n)","spaceComplexity":"O(1)","explanation":"Boundary contraction."},
    optimizedSolution: {"code":"function spiralOrder(matrix) {\n  const res = [];\n  let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;\n  while (top <= bottom && left <= right) {\n    for (let c = left; c <= right; c++) res.push(matrix[top][c]); top++;\n    for (let r = top; r <= bottom; r++) res.push(matrix[r][right]); right--;\n    if (top <= bottom) { for (let c = right; c >= left; c--) res.push(matrix[bottom][c]); bottom--; }\n    if (left <= right) { for (let r = bottom; r >= top; r--) res.push(matrix[r][left]); left++; }\n  }\n  return res;\n}","timeComplexity":"O(m*n)","spaceComplexity":"O(1)","explanation":"Layer-by-layer boundary shrinking traversal."},
    interviewExplanation: "Traverse right, down, left, up while shrinking top/bottom/left/right boundary bounds.",
    tests: [
      { name: "Spiral traversal correct", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return spiralOrder([[1,2,3],[4,5,6],[7,8,9]]);`)()) === JSON.stringify([1,2,3,6,9,8,7,4,5]); } catch { return false; } } },
    ],
  },
  {
    id: "rotate-image", number: 58, title: "Rotate Image", difficulty: "Medium",
    topics: ["arrays"], companies: ["Amazon","Google","Microsoft"], acceptance: 73, xp: 15,
    problemStatement: "Rotate an `n x n` 2D matrix 90 degrees clockwise **in-place**.",
    examples: [{"input":"matrix = [[1,2,3],[4,5,6],[7,8,9]]","output":"[[7,4,1],[8,5,2],[9,6,3]]"}],
    constraints: ["n == matrix.length","1 <= n <= 20"],
    conceptOverview: "Transpose matrix (swap `matrix[i][j]` with `matrix[j][i]`), then reverse each row.",
    patternRecognition: "Transpose + Reverse Rows",
    sampleTests: [{"name":"3x3 rotate","input":[[[1,2,3],[4,5,6],[7,8,9]]],"expected":[[7,4,1],[8,5,2],[9,6,3]]}],
    starterCode: "/**\n * @param {number[][]} matrix\n * @return {void} Do not return anything, modify matrix in-place instead.\n */\nfunction rotate(matrix) {\n}",
    hints: ["Transpose then reverse each row."],
    bruteForceSolution: {"code":"function rotate(matrix) {\n  const n = matrix.length;\n  for (let i = 0; i < n; i++) {\n    for (let j = i + 1; j < n; j++) {\n      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];\n    }\n  }\n  for (let i = 0; i < n; i++) matrix[i].reverse();\n  return matrix;\n}","timeComplexity":"O(n^2)","spaceComplexity":"O(1)","explanation":"In-place transpose and row reverse."},
    optimizedSolution: {"code":"function rotate(matrix) {\n  const n = matrix.length;\n  for (let i = 0; i < n; i++) {\n    for (let j = i + 1; j < n; j++) {\n      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];\n    }\n  }\n  for (let i = 0; i < n; i++) matrix[i].reverse();\n  return matrix;\n}","timeComplexity":"O(n^2)","spaceComplexity":"O(1)","explanation":"Transpose matrix diagonally, then flip rows horizontally."},
    interviewExplanation: "Rotate 90 deg clockwise = Transpose matrix + Reverse rows.",
    tests: [
      { name: "Rotates 90 degrees clockwise", validate: (code) => { try { return JSON.stringify(new Function(`${code}; const m = [[1,2,3],[4,5,6],[7,8,9]]; rotate(m); return m;`)()) === JSON.stringify([[7,4,1],[8,5,2],[9,6,3]]); } catch { return false; } } },
    ],
  },
  {
    id: "word-search", number: 79, title: "Word Search", difficulty: "Medium",
    topics: ["backtracking","arrays"], companies: ["Amazon","Microsoft"], acceptance: 41, xp: 15,
    problemStatement: "Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.",
    examples: [{"input":"board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"","output":"true"}],
    constraints: ["1 <= m, n <= 6","1 <= word.length <= 15"],
    conceptOverview: "DFS backtracking from each grid cell, marking visited cells temporarily.",
    patternRecognition: "2D Grid DFS Backtracking",
    sampleTests: [{"name":"ABCCED -> true","input":[[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],"ABCCED"],"expected":true}],
    starterCode: "/**\n * @param {character[][]} board\n * @param {string} word\n * @return {boolean}\n */\nfunction exist(board, word) {\n}",
    hints: ["Backtracking DFS from each cell."],
    bruteForceSolution: {"code":"function exist(board, word) {\n  const m = board.length, n = board[0].length;\n  function dfs(r, c, i) {\n    if (i === word.length) return true;\n    if (r < 0 || c < 0 || r >= m || c >= n || board[r][c] !== word[i]) return false;\n    const temp = board[r][c]; board[r][c] = '#';\n    const res = dfs(r+1,c,i+1) || dfs(r-1,c,i+1) || dfs(r,c+1,i+1) || dfs(r,c-1,i+1);\n    board[r][c] = temp;\n    return res;\n  }\n  for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) if (dfs(r, c, 0)) return true;\n  return false;\n}","timeComplexity":"O(N * 4^L)","spaceComplexity":"O(L)","explanation":"Recursive DFS backtracking."},
    optimizedSolution: {"code":"function exist(board, word) {\n  const m = board.length, n = board[0].length;\n  function dfs(r, c, i) {\n    if (i === word.length) return true;\n    if (r < 0 || c < 0 || r >= m || c >= n || board[r][c] !== word[i]) return false;\n    const temp = board[r][c]; board[r][c] = '#';\n    const res = dfs(r+1,c,i+1) || dfs(r-1,c,i+1) || dfs(r,c+1,i+1) || dfs(r,c-1,i+1);\n    board[r][c] = temp;\n    return res;\n  }\n  for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) if (dfs(r, c, 0)) return true;\n  return false;\n}","timeComplexity":"O(N * 4^L)","spaceComplexity":"O(L)","explanation":"Backtracking with in-place cell marking."},
    interviewExplanation: "Start DFS at matching cells; temporarily mutate cell value to '#' to prevent reusing.",
    tests: [
      { name: "Finds word in grid", validate: (code) => { try { return new Function(`${code}; return exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED");`)() === true; } catch { return false; } } },
    ],
  },
  {
    id: "longest-palindromic-substring", number: 6, title: "Longest Palindromic Substring", difficulty: "Medium",
    topics: ["two-pointers","dp"], companies: ["Amazon","Meta","Microsoft"], acceptance: 33, xp: 15,
    problemStatement: "Given a string `s`, return the longest palindromic substring in `s`.",
    examples: [{"input":"s = \"babad\"","output":"\"bab\"","explanation":"\"aba\" is also a valid answer."}],
    constraints: ["1 <= s.length <= 1000"],
    conceptOverview: "Expand around center for both odd and even length palindromes.",
    patternRecognition: "Expand Around Center",
    sampleTests: [{"name":"babad","input":["babad"],"expected":"bab"}],
    starterCode: "/**\n * @param {string} s\n * @return {string}\n */\nfunction longestPalindrome(s) {\n}",
    hints: ["Expand outwards from every index i as center."],
    bruteForceSolution: {"code":"function longestPalindrome(s) {\n  let res = \"\";\n  function expand(l, r) {\n    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }\n    if (r - l - 1 > res.length) res = s.substring(l + 1, r);\n  }\n  for (let i = 0; i < s.length; i++) {\n    expand(i, i);\n    expand(i, i + 1);\n  }\n  return res;\n}","timeComplexity":"O(n^2)","spaceComplexity":"O(1)","explanation":"Expand around center."},
    optimizedSolution: {"code":"function longestPalindrome(s) {\n  let res = \"\";\n  function expand(l, r) {\n    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }\n    if (r - l - 1 > res.length) res = s.substring(l + 1, r);\n  }\n  for (let i = 0; i < s.length; i++) {\n    expand(i, i);\n    expand(i, i + 1);\n  }\n  return res;\n}","timeComplexity":"O(n^2)","spaceComplexity":"O(1)","explanation":"Expand around all n centers."},
    interviewExplanation: "Treat each character (and pair of characters) as center of a potential palindrome.",
    tests: [
      { name: "Finds longest palindrome", validate: (code) => { try { const res = new Function(`${code}; return longestPalindrome("babad");`)(); return res === "bab" || res === "aba"; } catch { return false; } } },
    ],
  },
  {
    id: "palindromic-substrings", number: 647, title: "Palindromic Substrings", difficulty: "Medium",
    topics: ["two-pointers","dp"], companies: ["Meta","Amazon"], acceptance: 69, xp: 15,
    problemStatement: "Given a string `s`, return the number of palindromic substrings in it.",
    examples: [{"input":"s = \"abc\"","output":"3","explanation":"Three palindromic strings: \"a\", \"b\", \"c\"."},{"input":"s = \"aaa\"","output":"6"}],
    constraints: ["1 <= s.length <= 1000"],
    conceptOverview: "Expand around center and count every valid expansion.",
    patternRecognition: "Expand Around Center Counting",
    sampleTests: [{"name":"\"abc\" -> 3","input":["abc"],"expected":3},{"name":"\"aaa\" -> 6","input":["aaa"],"expected":6}],
    starterCode: "/**\n * @param {string} s\n * @return {number}\n */\nfunction countSubstrings(s) {\n}",
    hints: ["Count expansions from single and double centers."],
    bruteForceSolution: {"code":"function countSubstrings(s) {\n  let count = 0;\n  function expand(l, r) {\n    while (l >= 0 && r < s.length && s[l] === s[r]) {\n      count++; l--; r++;\n    }\n  }\n  for (let i = 0; i < s.length; i++) {\n    expand(i, i); expand(i, i + 1);\n  }\n  return count;\n}","timeComplexity":"O(n^2)","spaceComplexity":"O(1)","explanation":"Center expansion counting."},
    optimizedSolution: {"code":"function countSubstrings(s) {\n  let count = 0;\n  function expand(l, r) {\n    while (l >= 0 && r < s.length && s[l] === s[r]) {\n      count++; l--; r++;\n    }\n  }\n  for (let i = 0; i < s.length; i++) {\n    expand(i, i); expand(i, i + 1);\n  }\n  return count;\n}","timeComplexity":"O(n^2)","spaceComplexity":"O(1)","explanation":"O(n^2) time center expansion."},
    interviewExplanation: "Increment total count every time s[l] === s[r] during outwards expansion.",
    tests: [
      { name: "Counts palindromes correctly", validate: (code) => { try { return new Function(`${code}; return countSubstrings("aaa");`)() === 6; } catch { return false; } } },
    ],
  },
  {
    id: "encode-and-decode-strings", number: 271, title: "Encode and Decode Strings", difficulty: "Medium",
    topics: ["arrays"], companies: ["Google","Amazon"], acceptance: 45, xp: 15,
    problemStatement: "Design an algorithm to encode a list of strings to a single string, and decode it back.",
    examples: [{"input":"strs = [\"leet\",\"code\",\"love\",\"you\"]","output":"[\"leet\",\"code\",\"love\",\"you\"]"}],
    constraints: ["0 <= strs.length <= 200"],
    conceptOverview: "Prefix each string with length and a delimiter (e.g., `4#leet4#code`).",
    patternRecognition: "Length Prefix Framing",
    sampleTests: [{"name":"Round-trip encode/decode","input":[["leet","code","love","you"]],"expected":["leet","code","love","you"]}],
    starterCode: "/**\n * @param {string[]} strs\n * @return {string}\n */\nfunction encode(strs) {\n}\n/**\n * @param {string} s\n * @return {string[]}\n */\nfunction decode(s) {\n}\nfunction encodeDecode(strs) {\n  return decode(encode(strs));\n}",
    hints: ["Format each string as length + '#' + string."],
    bruteForceSolution: {"code":"function encode(strs) {\n  return strs.map(s => s.length + '#' + s).join('');\n}\nfunction decode(s) {\n  const res = [];\n  let i = 0;\n  while (i < s.length) {\n    let j = s.indexOf('#', i);\n    let len = parseInt(s.substring(i, j));\n    res.push(s.substring(j + 1, j + 1 + len));\n    i = j + 1 + len;\n  }\n  return res;\n}\nfunction encodeDecode(strs) {\n  return decode(encode(strs));\n}","timeComplexity":"O(N)","spaceComplexity":"O(N)","explanation":"Length-delimited framing."},
    optimizedSolution: {"code":"function encode(strs) {\n  return strs.map(s => s.length + '#' + s).join('');\n}\nfunction decode(s) {\n  const res = [];\n  let i = 0;\n  while (i < s.length) {\n    let j = s.indexOf('#', i);\n    let len = parseInt(s.substring(i, j));\n    res.push(s.substring(j + 1, j + 1 + len));\n    i = j + 1 + len;\n  }\n  return res;\n}\nfunction encodeDecode(strs) {\n  return decode(encode(strs));\n}","timeComplexity":"O(N)","spaceComplexity":"O(N)","explanation":"Chunk length prefix encoding."},
    interviewExplanation: "Prefixing length before delimiter makes parsing unambiguous regardless of internal string characters.",
    tests: [
      { name: "Round-trips strings safely", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return encodeDecode(["leet","code"]);`)()) === JSON.stringify(["leet","code"]); } catch { return false; } } },
    ],
  },
  {
    id: "implement-trie", number: 208, title: "Implement Trie (Prefix Tree)", difficulty: "Medium",
    topics: ["trie"], companies: ["Google","Amazon"], acceptance: 62, xp: 15,
    problemStatement: "Implement a Trie with `insert`, `search`, and `startsWith` methods.",
    examples: [{"input":"insert(\"apple\"), search(\"apple\") -> true, search(\"app\") -> false, startsWith(\"app\") -> true","output":"true"}],
    constraints: ["1 <= word.length <= 2000"],
    conceptOverview: "Tree of node objects where each node contains a children map and `isWordEnd` flag.",
    patternRecognition: "Trie Tree Data Structure",
    sampleTests: [{"name":"Trie operations","input":[["insert","search","startsWith"],[["apple"],["apple"],["app"]]],"expected":[null,true,true]}],
    starterCode: "class Trie {\n  constructor() {\n    this.root = {};\n  }\n  insert(word) {\n  }\n  search(word) {\n  }\n  startsWith(prefix) {\n  }\n}\nfunction testTrie(ops, vals) {\n  const trie = new Trie();\n  return ops.map((op, i) => {\n    if (op === 'insert') { trie.insert(vals[i][0]); return null; }\n    if (op === 'search') return trie.search(vals[i][0]);\n    if (op === 'startsWith') return trie.startsWith(vals[i][0]);\n  });\n}",
    hints: ["Use a nested object mapping characters to child nodes."],
    bruteForceSolution: {"code":"class TrieNode {\n  constructor() { this.children = {}; this.isEnd = false; }\n}\nclass Trie {\n  constructor() { this.root = new TrieNode(); }\n  insert(word) {\n    let node = this.root;\n    for (let c of word) { if (!node.children[c]) node.children[c] = new TrieNode(); node = node.children[c]; }\n    node.isEnd = true;\n  }\n  search(word) {\n    let node = this.root;\n    for (let c of word) { if (!node.children[c]) return false; node = node.children[c]; }\n    return node.isEnd;\n  }\n  startsWith(prefix) {\n    let node = this.root;\n    for (let c of prefix) { if (!node.children[c]) return false; node = node.children[c]; }\n    return true;\n  }\n}\nfunction testTrie(ops, vals) {\n  const trie = new Trie();\n  return ops.map((op, i) => {\n    if (op === 'insert') { trie.insert(vals[i][0]); return null; }\n    if (op === 'search') return trie.search(vals[i][0]);\n    if (op === 'startsWith') return trie.startsWith(vals[i][0]);\n  });\n}","timeComplexity":"O(L)","spaceComplexity":"O(N * L)","explanation":"Standard Trie implementation."},
    optimizedSolution: {"code":"class TrieNode {\n  constructor() { this.children = {}; this.isEnd = false; }\n}\nclass Trie {\n  constructor() { this.root = new TrieNode(); }\n  insert(word) {\n    let node = this.root;\n    for (let c of word) { if (!node.children[c]) node.children[c] = new TrieNode(); node = node.children[c]; }\n    node.isEnd = true;\n  }\n  search(word) {\n    let node = this.root;\n    for (let c of word) { if (!node.children[c]) return false; node = node.children[c]; }\n    return node.isEnd;\n  }\n  startsWith(prefix) {\n    let node = this.root;\n    for (let c of prefix) { if (!node.children[c]) return false; node = node.children[c]; }\n    return true;\n  }\n}\nfunction testTrie(ops, vals) {\n  const trie = new Trie();\n  return ops.map((op, i) => {\n    if (op === 'insert') { trie.insert(vals[i][0]); return null; }\n    if (op === 'search') return trie.search(vals[i][0]);\n    if (op === 'startsWith') return trie.startsWith(vals[i][0]);\n  });\n}","timeComplexity":"O(L)","spaceComplexity":"O(N * L)","explanation":"Hash map based Trie nodes."},
    interviewExplanation: "Each node maintains a map of character pointers and a boolean indicating word boundary.",
    tests: [
      { name: "Executes trie methods", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return testTrie(['insert','search','startsWith'], [["apple"],["apple"],["app"]]);`)()) === JSON.stringify([null, true, true]); } catch { return false; } } },
    ],
  },
  {
    id: "add-and-search-word", number: 211, title: "Design Add and Search Words Data Structure", difficulty: "Medium",
    topics: ["trie","backtracking"], companies: ["Meta","Amazon"], acceptance: 44, xp: 15,
    problemStatement: "Design a data structure supporting `addWord(word)` and `search(word)` where `word` may contain '.' matching any letter.",
    examples: [{"input":"addWord(\"bad\"), search(\".ad\") -> true","output":"true"}],
    constraints: ["1 <= word.length <= 25"],
    conceptOverview: "Trie search using DFS recursion to branch on '.' wildcard characters.",
    patternRecognition: "Trie + Wildcard DFS",
    sampleTests: [{"name":"Wildcard search","input":[["addWord","search"],[["bad"],[".ad"]]],"expected":[null,true]}],
    starterCode: "class WordDictionary {\n  constructor() { this.root = {}; }\n  addWord(word) {\n  }\n  search(word) {\n  }\n}\nfunction testWordDictionary(ops, vals) {\n  const wd = new WordDictionary();\n  return ops.map((op, i) => {\n    if (op === 'addWord') { wd.addWord(vals[i][0]); return null; }\n    if (op === 'search') return wd.search(vals[i][0]);\n  });\n}",
    hints: ["Use recursive DFS for search when encountering '.'."],
    bruteForceSolution: {"code":"class WordDictionary {\n  constructor() { this.root = { children: {}, isEnd: false }; }\n  addWord(word) {\n    let node = this.root;\n    for (let c of word) {\n      if (!node.children[c]) node.children[c] = { children: {}, isEnd: false };\n      node = node.children[c];\n    }\n    node.isEnd = true;\n  }\n  search(word) {\n    function dfs(node, i) {\n      if (i === word.length) return node.isEnd;\n      let c = word[i];\n      if (c === '.') {\n        for (let child in node.children) {\n          if (dfs(node.children[child], i + 1)) return true;\n        }\n        return false;\n      } else {\n        if (!node.children[c]) return false;\n        return dfs(node.children[c], i + 1);\n      }\n    }\n    return dfs(this.root, 0);\n  }\n}\nfunction testWordDictionary(ops, vals) {\n  const wd = new WordDictionary();\n  return ops.map((op, i) => {\n    if (op === 'addWord') { wd.addWord(vals[i][0]); return null; }\n    if (op === 'search') return wd.search(vals[i][0]);\n  });\n}","timeComplexity":"O(N * 26^M)","spaceComplexity":"O(N)","explanation":"Trie with wildcard DFS branch."},
    optimizedSolution: {"code":"class WordDictionary {\n  constructor() { this.root = { children: {}, isEnd: false }; }\n  addWord(word) {\n    let node = this.root;\n    for (let c of word) {\n      if (!node.children[c]) node.children[c] = { children: {}, isEnd: false };\n      node = node.children[c];\n    }\n    node.isEnd = true;\n  }\n  search(word) {\n    function dfs(node, i) {\n      if (i === word.length) return node.isEnd;\n      let c = word[i];\n      if (c === '.') {\n        for (let child in node.children) {\n          if (dfs(node.children[child], i + 1)) return true;\n        }\n        return false;\n      } else {\n        if (!node.children[c]) return false;\n        return dfs(node.children[c], i + 1);\n      }\n    }\n    return dfs(this.root, 0);\n  }\n}\nfunction testWordDictionary(ops, vals) {\n  const wd = new WordDictionary();\n  return ops.map((op, i) => {\n    if (op === 'addWord') { wd.addWord(vals[i][0]); return null; }\n    if (op === 'search') return wd.search(vals[i][0]);\n  });\n}","timeComplexity":"O(N * 26^M)","spaceComplexity":"O(N)","explanation":"Trie with wildcard DFS branch."},
    interviewExplanation: "Store words in Trie; when '.' is encountered, recursively test all child branches.",
    tests: [
      { name: "Searches wildcard patterns", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return testWordDictionary(['addWord','search'], [["bad"],[".ad"]]);`)()) === JSON.stringify([null, true]); } catch { return false; } } },
    ],
  },
  {
    id: "word-search-ii", number: 212, title: "Word Search II", difficulty: "Hard",
    topics: ["trie","backtracking"], companies: ["Amazon","Google","Meta"], acceptance: 36, xp: 20,
    problemStatement: "Given an `m x n` `board` of characters and a list of `words`, return all words on the board.",
    examples: [{"input":"board = [[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]], words = [\"oath\",\"pea\",\"eat\",\"rain\"]","output":"[\"eat\",\"oath\"]"}],
    constraints: ["1 <= m, n <= 12","1 <= words.length <= 3 * 10^4"],
    conceptOverview: "Build a Trie from the word list, then run DFS on each grid cell, pruning Trie branches when matched.",
    patternRecognition: "Grid DFS + Trie Branch Pruning",
    sampleTests: [{"name":"Words found","input":[[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]],["oath","pea","eat","rain"]],"expected":["oath","eat"]}],
    starterCode: "/**\n * @param {character[][]} board\n * @param {string[]} words\n * @return {string[]}\n */\nfunction findWords(board, words) {\n}",
    hints: ["Insert all target words into a Trie before grid DFS."],
    bruteForceSolution: {"code":"function findWords(board, words) {\n  const root = {};\n  for (let w of words) {\n    let curr = root;\n    for (let c of w) { curr[c] = curr[c] || {}; curr = curr[c]; }\n    curr.word = w;\n  }\n  const m = board.length, n = board[0].length, res = new Set();\n  function dfs(r, c, node) {\n    if (r<0||c<0||r>=m||c>=n||!node[board[r][c]]) return;\n    const char = board[r][c];\n    node = node[char];\n    if (node.word) res.add(node.word);\n    board[r][c] = '#';\n    dfs(r+1,c,node); dfs(r-1,c,node); dfs(r,c+1,node); dfs(r,c-1,node);\n    board[r][c] = char;\n  }\n  for (let r=0; r<m; r++) for (let c=0; c<n; c++) dfs(r, c, root);\n  return Array.from(res);\n}","timeComplexity":"O(M*N * 4^L)","spaceComplexity":"O(W*L)","explanation":"Trie + Grid DFS."},
    optimizedSolution: {"code":"function findWords(board, words) {\n  const root = {};\n  for (let w of words) {\n    let curr = root;\n    for (let c of w) { curr[c] = curr[c] || {}; curr = curr[c]; }\n    curr.word = w;\n  }\n  const m = board.length, n = board[0].length, res = new Set();\n  function dfs(r, c, node) {\n    if (r<0||c<0||r>=m||c>=n||!node[board[r][c]]) return;\n    const char = board[r][c];\n    node = node[char];\n    if (node.word) res.add(node.word);\n    board[r][c] = '#';\n    dfs(r+1,c,node); dfs(r-1,c,node); dfs(r,c+1,node); dfs(r,c-1,node);\n    board[r][c] = char;\n  }\n  for (let r=0; r<m; r++) for (let c=0; c<n; c++) dfs(r, c, root);\n  return Array.from(res);\n}","timeComplexity":"O(M*N * 4^L)","spaceComplexity":"O(W*L)","explanation":"Trie + Grid DFS."},
    interviewExplanation: "Store all search words in a Trie to prune DFS exploration early.",
    tests: [
      { name: "Finds words from dictionary", validate: (code) => { try { const r = new Function(`${code}; return findWords([["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], ["oath","pea","eat","rain"]);`)(); return r.length === 2; } catch { return false; } } },
    ],
  },
  {
    id: "find-median-from-data-stream", number: 295, title: "Find Median from Data Stream", difficulty: "Hard",
    topics: ["heap"], companies: ["Google","Amazon","Meta"], acceptance: 51, xp: 20,
    problemStatement: "Design a data structure that supports adding numbers and finding the median of all added elements.",
    examples: [{"input":"addNum(1), addNum(2), findMedian() -> 1.5, addNum(3), findMedian() -> 2","output":"2"}],
    constraints: ["At most 5 * 10^4 calls will be made"],
    conceptOverview: "Maintain a sorted array (or max-heap & min-heap) so that median is middle element or average of two middle elements.",
    patternRecognition: "Two Heaps / Sorted Stream Partitioning",
    sampleTests: [{"name":"Median stream","input":[["addNum","addNum","findMedian","addNum","findMedian"],[[1],[2],[],[3],[]]],"expected":[null,null,1.5,null,2]}],
    starterCode: "class MedianFinder {\n  constructor() {\n    this.nums = [];\n  }\n  addNum(num) {\n  }\n  findMedian() {\n  }\n}\nfunction testMedianFinder(ops, vals) {\n  const mf = new MedianFinder();\n  return ops.map((op, i) => {\n    if (op === 'addNum') { mf.addNum(vals[i][0]); return null; }\n    if (op === 'findMedian') return mf.findMedian();\n  });\n}",
    hints: ["Maintain sorted array using binary search insertion."],
    bruteForceSolution: {"code":"class MedianFinder {\n  constructor() { this.nums = []; }\n  addNum(num) {\n    let l = 0, r = this.nums.length;\n    while (l < r) {\n      let m = (l + r) >> 1;\n      if (this.nums[m] < num) l = m + 1; else r = m;\n    }\n    this.nums.splice(l, 0, num);\n  }\n  findMedian() {\n    const n = this.nums.length;\n    if (n % 2 === 1) return this.nums[Math.floor(n / 2)];\n    return (this.nums[n / 2 - 1] + this.nums[n / 2]) / 2;\n  }\n}\nfunction testMedianFinder(ops, vals) {\n  const mf = new MedianFinder();\n  return ops.map((op, i) => {\n    if (op === 'addNum') { mf.addNum(vals[i][0]); return null; }\n    if (op === 'findMedian') return mf.findMedian();\n  });\n}","timeComplexity":"O(n)","spaceComplexity":"O(n)","explanation":"Binary search insert into sorted array."},
    optimizedSolution: {"code":"class MedianFinder {\n  constructor() { this.nums = []; }\n  addNum(num) {\n    let l = 0, r = this.nums.length;\n    while (l < r) {\n      let m = (l + r) >> 1;\n      if (this.nums[m] < num) l = m + 1; else r = m;\n    }\n    this.nums.splice(l, 0, num);\n  }\n  findMedian() {\n    const n = this.nums.length;\n    if (n % 2 === 1) return this.nums[Math.floor(n / 2)];\n    return (this.nums[n / 2 - 1] + this.nums[n / 2]) / 2;\n  }\n}\nfunction testMedianFinder(ops, vals) {\n  const mf = new MedianFinder();\n  return ops.map((op, i) => {\n    if (op === 'addNum') { mf.addNum(vals[i][0]); return null; }\n    if (op === 'findMedian') return mf.findMedian();\n  });\n}","timeComplexity":"O(n)","spaceComplexity":"O(n)","explanation":"Sorted array stream partitioning."},
    interviewExplanation: "Use binary insertion to keep stream sorted, giving O(1) median access.",
    tests: [
      { name: "Calculates stream median", validate: (code) => { try { return JSON.stringify(new Function(`${code}; return testMedianFinder(['addNum','addNum','findMedian'], [[1],[2],[]]);`)()) === JSON.stringify([null, null, 1.5]); } catch { return false; } } },
    ],
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
