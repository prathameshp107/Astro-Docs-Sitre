---
title: "Sorting Algorithms — Interview Questions"
description: "15+ interview questions on sorting algorithms covering concepts, implementation, complexity analysis, and coding problems with detailed answers."
sidebar:
  order: 9
practice:
  visualizer: /visualizer/sorting
---

# Sorting Algorithms — Interview Questions

## 📋 Quick Reference

| # | Question | Topic | Difficulty |
|---|----------|-------|------------|
| 1 | [Explain Bubble Sort](#q1-explain-bubble-sort) | Concept | Easy |
| 2 | [Bubble Sort optimization](#q2-how-would-you-optimize-bubble-sort) | Implementation | Easy |
| 3 | [Stable vs Unstable Sort](#q3-what-is-a-stable-sort-and-why-does-it-matter) | Concept | Easy |
| 4 | [Selection Sort complexity](#q4-why-is-selection-sort-always-on²-even-on-a-sorted-array) | Complexity | Medium |
| 5 | [Insertion Sort best case](#q5-why-is-insertion-sort-on-in-the-best-case) | Complexity | Medium |
| 6 | [Merge Sort space](#q6-what-is-the-space-complexity-of-merge-sort-and-why) | Complexity | Medium |
| 7 | [Quick Sort worst case](#q7-what-causes-quick-sorts-worst-case-on²-and-how-do-you-avoid-it) | Concept | Medium |
| 8 | [Heap Sort building](#q8-why-is-building-a-heap-on-and-not-on-log-n) | Complexity | Hard |
| 9 | [Comparison sort lower bound](#q9-why-cant-comparison-sorts-be-faster-than-on-log-n) | Theory | Hard |
| 10 | [Sorting algorithm selection](#q10-which-sorting-algorithm-would-you-use-for-a-given-scenario) | Application | Medium |
| 11 | [Quick Sort vs Merge Sort](#q11-compare-and-contrast-quick-sort-and-merge-sort) | Comparison | Medium |
| 12 | [Sorting linked list](#q12-how-would-you-sort-a-linked-list) | Implementation | Medium |
| 13 | [Find kth largest element](#q13-find-the-kth-largest-element-in-an-array) | Coding | Medium |
| 14 | [Sort colors (Dutch national flag)](#q14-sort-an-array-of-0s-1s-and-2s-without-using-a-sorting-algorithm) | Coding | Medium |
| 15 | [Merge two sorted arrays](#q15-merge-two-sorted-arrays) | Coding | Easy |
| 16 | [Inversion count](#q16-count-inversions-in-an-array) | Coding | Hard |
| 17 | [Hybrid sorting (TimSort/IntroSort)](#q17-what-is-a-hybrid-sorting-algorithm-and-why-are-they-used) | Concept | Medium |

---

## Q1: Explain Bubble Sort

**Question**: Explain how Bubble Sort works and what its time complexity is.

**Answer**: Bubble Sort works by repeatedly stepping through the array, comparing adjacent elements, and swapping them if they are in the wrong order. With each pass, the largest unsorted element "bubbles up" to its correct position at the end.

```javascript
function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}
```

**Complexity**:
- **Average/Worst**: O(n²) — two nested loops
- **Best**: O(n) — with early exit optimization on already sorted input
- **Space**: O(1) — in-place

**Key Points**: Stable, in-place, O(1) extra space, rarely used in practice due to O(n²) time.

---

## Q2: How Would You Optimize Bubble Sort?

**Question**: The standard Bubble Sort always runs n-1 passes. How can you optimize it?

**Answer**: Add a `swapped` flag that tracks whether any swaps occurred during a pass. If no swaps occurred, the array is already sorted and we can exit early.

```javascript
function bubbleSortOptimized(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) break;  // Early exit — array is sorted
    }
    return arr;
}
```

**Impact**: Best case improves from O(n²) to O(n) for already sorted input.

---

## Q3: What Is a Stable Sort and Why Does It Matter?

**Question**: What does it mean for a sorting algorithm to be stable? Give an example of when stability matters.

**Answer**: A sort is **stable** if elements with equal keys maintain their original relative order after sorting.

**Example**: Sorting employees by department, then by salary within department:

```text
Step 1: Sort by salary (any sort)
        [(Alice,$70k), (Bob,$60k), (Carol,$70k), (Dave,$60k)]

Step 2: Sort by department (STABLE sort)
        Engineering: Alice($70k) → Carol($70k) ← salary order preserved ✅
        Sales: Bob($60k) → Dave($60k) ← salary order preserved ✅
```

If Step 2 used an unstable sort, the salary ordering within each department would be lost.

**Stable Algorithms**: Bubble Sort, Insertion Sort, Merge Sort, TimSort
**Unstable Algorithms**: Selection Sort, Quick Sort, Heap Sort

---

## Q4: Why Is Selection Sort Always O(n²) Even on a Sorted Array?

**Question**: Selection Sort's best, average, and worst cases are all O(n²). Why can't it be optimized like Bubble Sort?

**Answer**: Selection Sort must always scan the entire unsorted portion to find the minimum element — it has no way of knowing if the array is sorted without checking every element.

```javascript
function selectionSort(arr) {
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            // This loop ALWAYS runs — even on sorted input
            if (arr[j] < arr[minIndex]) minIndex = j;
        }
        // Even if no swap needed, we still did n-i-1 comparisons
        if (minIndex !== i) [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
}
```

**Key insight**: There's no equivalent of Bubble Sort's `swapped` flag for Selection Sort because Selection Sort doesn't compare adjacent elements. It searches for the minimum, which requires scanning everything.

---

## Q5: Why Is Insertion Sort O(n) in the Best Case?

**Question**: Explain why Insertion Sort is O(n) on a sorted array when Selection Sort is O(n²).

**Answer**: When the array is sorted, the inner while loop condition `arr[j] > key` is **immediately false** for every element. No shifting occurs.

```javascript
for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {  // ← False immediately on sorted input
        arr[j + 1] = arr[j];          // ← Never executed
        j--;
    }
    arr[j + 1] = key;
}
// Only the outer loop runs: n iterations × O(1) = O(n)
```

Selection Sort cannot do this because it always needs to scan the unsorted portion to find the minimum, even if the array is already sorted.

---

## Q6: What Is the Space Complexity of Merge Sort and Why?

**Question**: Merge Sort uses O(n) extra space. Where does this space come from, and can it be avoided?

**Answer**: The O(n) auxiliary space comes from the temporary arrays created during the merge step:

```javascript
function merge(left, right) {
    const result = [];  // ← This grows to size n in the top-level merge
    // ... merging logic
    return result;
}
```

**Why it's needed**: To merge two sorted halves, we need a temporary array to hold the combined result. Even the "in-place" version creates temporary copies of the left and right halves.

**Can it be avoided?** Technically yes, but in-place merge algorithms are complex and have high constant factors. For linked lists, however, Merge Sort can be O(1) space because nodes can be re-linked instead of copying values.

**Recursive overhead**: The recursive calls also use O(log n) stack space, but this is typically not counted in auxiliary space analysis.

---

## Q7: What Causes Quick Sort's Worst Case O(n²) and How Do You Avoid It?

**Question**: Quick Sort is usually O(n log n) but can degrade to O(n²). What causes this and how do you prevent it?

**Answer**: The worst case occurs when the pivot is always the smallest or largest element, creating highly unbalanced partitions:

```text
Sorted array: [1, 2, 3, 4, 5, 6, 7, 8]
Pivot = last element = 8
Left partition: [1, 2, 3, 4, 5, 6, 7]  (size n-1)
Right partition: []                     (size 0)
Next call: same pattern → n + (n-1) + ... + 1 = O(n²)
```

**Prevention strategies**:

1. **Random Pivot**: Swap a random element with the last element before partitioning. Makes O(n²) astronomically unlikely.

2. **Median-of-Three**: Choose the median of the first, middle, and last elements as the pivot. Guarantees reasonable behavior on sorted input.

3. **IntroSort**: Switch to Heap Sort if recursion depth exceeds log n. Guarantees O(n log n) worst case.

---

## Q8: Why Is Building a Heap O(n) and Not O(n log n)?

**Question**: Intuitively, building a heap by heapifying n elements should take O(n log n). Why is it O(n)?

**Answer**: The key insight is that **heapify for a node takes O(h) time where h is the node's height from the bottom**, not O(log n) for all nodes.

```text
Level (from bottom)  Nodes at this level  Work per node  Total work
      0 (leaves)           n/2                O(0)          O(0)
      1                   n/4                O(1)          O(n/4)
      2                   n/8                O(2)          O(2n/8)
      3                  n/16                O(3)          O(3n/16)
      ...                 ...                ...           ...

Total = n × Σ(h=0 to ∞) h / 2^(h+1)
      = n × 1  = O(n)
```

**Intuition**: Most nodes are near the bottom of the tree (there are n/2 leaves) and require essentially no work. Only the root might fall all the way down (log n steps), but there's only one root. The sum converges to O(n).

---

## Q9: Why Can't Comparison Sorts Be Faster Than O(n log n)?

**Question**: Prove that any comparison-based sorting algorithm must take at least O(n log n) time.

**Answer**: This is the **comparison sort lower bound**, proven using decision trees:

1. **Input permutations**: There are n! possible orderings of n elements.
2. **Decision tree**: Each comparison has 2 possible outcomes, corresponding to a binary decision tree.
3. **Leaves**: The tree must have at least n! leaves to distinguish all possible orderings.
4. **Tree height**: A binary tree with n! leaves has minimum height log₂(n!).
5. **Stirling's approximation**: log₂(n!) ≈ n log₂ n - 1.44n
6. **Therefore**: At least log₂(n!) = Ω(n log n) comparisons are needed in the worst case.

**This applies to**: All comparison-based sorts — Bubble, Selection, Insertion, Merge, Quick, Heap, and any other sort that determines order by comparing pairs of elements.

**Exceptions**: Non-comparison sorts like Counting Sort, Radix Sort, and Bucket Sort can achieve O(n) time because they use element values directly rather than comparing pairs.

---

## Q10: Which Sorting Algorithm Would You Use for a Given Scenario?

**Question**: You need to sort data in the following scenarios. Which algorithm do you choose and why?

### Scenario A: Sorting a list of 20 integers

**Answer**: **Insertion Sort**. For tiny arrays, Insertion Sort's low overhead and cache efficiency beat O(n log n) algorithms. JavaScript's `.sort()` (TimSort) actually uses Insertion Sort for subarrays < 32 elements.

### Scenario B: Sorting millions of 32-bit integers with limited memory

**Answer**: **Quick Sort** (with random pivot) for best average performance, or **Heap Sort** if memory is strictly O(1) and a guarantee is needed. If the integer range is small, **Counting Sort** would be O(n).

### Scenario C: Sorting a linked list

**Answer**: **Merge Sort**. Merge Sort works naturally with sequential access (no random access needed) and can be O(1) space for linked lists by re-linking nodes.

### Scenario D: Sorting student records by name (string key), with stability required

**Answer**: **Merge Sort** or **TimSort**. Both are stable O(n log n) sorts. Quick Sort is not stable. Heap Sort is not stable.

### Scenario E: Sorting a file too large to fit in RAM

**Answer**: **External Merge Sort** (a variation of Merge Sort). Read chunks into memory, sort each chunk (using Quick Sort), write to temporary files, then merge the sorted chunks together.

### Scenario F: Your company's primary database needs to sort query results

**Answer**: **TimSort** (used by Python, Java, JavaScript) or **IntroSort** (used by C++). These hybrid algorithms combine multiple sorts to handle all input patterns efficiently.

---

## Q11: Compare and Contrast Quick Sort and Merge Sort

**Question**: What are the key differences between Quick Sort and Merge Sort?

**Answer**:

| Aspect | Quick Sort | Merge Sort |
|--------|-----------|------------|
| **Time (Avg)** | O(n log n) | O(n log n) |
| **Time (Worst)** | O(n²) — bad pivots | O(n log n) — guaranteed |
| **Space** | O(log n) average (stack) | O(n) auxiliary array |
| **Stable** | ❌ No | ✅ Yes |
| **In-Place** | ✅ Yes | ❌ No |
| **Cache performance** | ✅ Excellent (sequential) | Good (sequential merge) |
| **Dividing strategy** | Partition around pivot | Split at midpoint |
| **Work happens when** | Before recursion (partition) | After recursion (merge) |
| **Tail recursion** | Can optimize | Harder to optimize |
| **Real-world speed** | 1.0× (fastest) | 1.5× slower |

**When to choose each**:
- Quick Sort: Default choice for in-memory arrays when worst-case isn't a concern
- Merge Sort: When stability is needed, or when sorting linked lists, or for external sorting

---

## Q12: How Would You Sort a Linked List?

**Question**: Implement a function to sort a singly linked list in ascending order. Which algorithm would you choose and why?

**Answer**: **Merge Sort** is the natural choice for linked lists because:
1. No random access needed (sequential traversal only)
2. No extra space needed (O(1) space — re-link nodes instead of copying)
3. Stable sort

```javascript
class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

function sortLinkedList(head) {
    // Base case
    if (!head || !head.next) return head;

    // Find middle (slow/fast pointer)
    let slow = head, fast = head, prev = null;
    while (fast && fast.next) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }
    prev.next = null;  // Split into two lists

    // Recursively sort both halves
    const left = sortLinkedList(head);
    const right = sortLinkedList(slow);

    // Merge sorted lists
    return mergeLists(left, right);
}

function mergeLists(l1, l2) {
    const dummy = new ListNode(0);
    let current = dummy;

    while (l1 && l2) {
        if (l1.val <= l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }

    current.next = l1 || l2;
    return dummy.next;
}
```

**Complexity**: O(n log n) time, O(log n) stack space, O(1) auxiliary space (nodes are re-linked).

---

## Q13: Find the Kth Largest Element in an Array

**Question**: Find the kth largest element in an unsorted array. Do it without fully sorting the array.

**Answer**: Use **Quick Select** (derived from Quick Sort's partition) for O(n) average time:

```javascript
function findKthLargest(nums, k) {
    const n = nums.length;
    const targetIndex = n - k;  // Convert to kth smallest (0-indexed)

    function partition(left, right) {
        const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
        const pivot = nums[pivotIndex];

        // Move pivot to end
        [nums[pivotIndex], nums[right]] = [nums[right], nums[pivotIndex]];

        let storeIndex = left;
        for (let i = left; i < right; i++) {
            if (nums[i] < pivot) {
                [nums[storeIndex], nums[i]] = [nums[i], nums[storeIndex]];
                storeIndex++;
            }
        }

        [nums[storeIndex], nums[right]] = [nums[right], nums[storeIndex]];
        return storeIndex;
    }

    function quickSelect(left, right) {
        if (left === right) return nums[left];

        const pivotIndex = partition(left, right);

        if (pivotIndex === targetIndex) {
            return nums[pivotIndex];
        } else if (pivotIndex < targetIndex) {
            return quickSelect(pivotIndex + 1, right);
        } else {
            return quickSelect(left, pivotIndex - 1);
        }
    }

    return quickSelect(0, n - 1);
}

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));  // Output: 5
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));  // Output: 4
```

**Complexity**: O(n) average, O(n²) worst case (same as Quick Sort).

**Alternative**: Using a Min-Heap of size k gives O(n log k) time.

---

## Q14: Sort an Array of 0s, 1s, and 2s (Dutch National Flag Problem)

**Question**: Sort an array containing only values 0, 1, and 2 in O(n) time. Do not use a standard sorting algorithm or counting sort.

**Answer**: Use the **Dutch National Flag algorithm** (three-way partitioning):

```javascript
function sortColors(nums) {
    let low = 0;        // Boundary for 0s
    let mid = 0;        // Current element being examined
    let high = nums.length - 1;  // Boundary for 2s

    while (mid <= high) {
        if (nums[mid] === 0) {
            // Swap to the left (0s section)
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            // 1 belongs in the middle — just advance
            mid++;
        } else {  // nums[mid] === 2
            // Swap to the right (2s section)
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
            // Don't increment mid — the swapped-in element needs examination
        }
    }

    return nums;
}

console.log(sortColors([2, 0, 2, 1, 1, 0]));
// Output: [0, 0, 1, 1, 2, 2]
```

**Visual Walkthrough**:

```text
Initial: [2, 0, 2, 1, 1, 0]
          ↑               ↑
         low/mid         high

Step 1: nums[mid]=2 → swap with high, high--
         [0, 0, 2, 1, 1, 2]
          ↑            ↑
        low/mid       high

Step 2: nums[mid]=0 → swap with low, low++, mid++
         [0, 0, 2, 1, 1, 2]
             ↑         ↑
            low/mid   high

Step 3: nums[mid]=2 → swap with high, high--
         [0, 0, 2, 1, 1, 2]
                ↑     ↑
               low   high
               mid

Continue until mid > high → [0, 0, 1, 1, 2, 2] ✅
```

**Complexity**: O(n) time, O(1) space. Single pass with three pointers.

---

## Q15: Merge Two Sorted Arrays

**Question**: Given two sorted arrays, merge them into one sorted array. This is the core step of Merge Sort.

**Answer**: Use two pointers to merge in O(n + m) time:

```javascript
function mergeSortedArrays(arr1, arr2) {
    const result = [];
    let i = 0, j = 0;

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] <= arr2[j]) {
            result.push(arr1[i]);
            i++;
        } else {
            result.push(arr2[j]);
            j++;
        }
    }

    // Add remaining elements
    while (i < arr1.length) result.push(arr1[i++]);
    while (j < arr2.length) result.push(arr2[j++]);

    return result;
}

console.log(mergeSortedArrays([1, 3, 5, 7], [2, 4, 6, 8]));
// Output: [1, 2, 3, 4, 5, 6, 7, 8]

console.log(mergeSortedArrays([1, 2, 3], [4, 5, 6]));
// Output: [1, 2, 3, 4, 5, 6]
```

**In-place merge** (merge into arr1 which has extra space at the end):

```javascript
function mergeInPlace(nums1, m, nums2, n) {
    // Start from the end of both arrays
    let i = m - 1;      // Last element in nums1's actual data
    let j = n - 1;      // Last element in nums2
    let k = m + n - 1;  // Last position in nums1

    while (j >= 0) {
        if (i >= 0 && nums1[i] > nums2[j]) {
            nums1[k] = nums1[i];
            i--;
        } else {
            nums1[k] = nums2[j];
            j--;
        }
        k--;
    }
}

const nums1 = [1, 2, 3, 0, 0, 0];
mergeInPlace(nums1, 3, [2, 5, 6], 3);
console.log(nums1);  // Output: [1, 2, 2, 3, 5, 6]
```

**Complexity**: O(n + m) time, O(1) extra space (for the in-place version).

---

## Q16: Count Inversions in an Array

**Question**: Count the number of inversions in an array. An inversion is a pair `(i, j)` such that `i < j` and `arr[i] > arr[j]`.

**Answer**: Use Merge Sort to count inversions during the merge step. When we take an element from the right subarray, it's inverted with all remaining elements in the left subarray.

```javascript
function countInversions(arr) {
    let count = 0;

    function mergeAndCount(left, right) {
        const result = [];
        let i = 0, j = 0;

        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                result.push(left[i]);
                i++;
            } else {
                // left[i] > right[j] — this is an inversion!
                // All remaining elements in left are > right[j]
                count += left.length - i;
                result.push(right[j]);
                j++;
            }
        }

        return [...result, ...left.slice(i), ...right.slice(j)];
    }

    function mergeSort(arr) {
        if (arr.length <= 1) return arr;
        const mid = Math.floor(arr.length / 2);
        return mergeAndCount(
            mergeSort(arr.slice(0, mid)),
            mergeSort(arr.slice(mid))
        );
    }

    mergeSort([...arr]);
    return count;
}

console.log(countInversions([2, 4, 1, 3, 5]));
// Output: 3
// Inversions: (2,1), (4,1), (4,3)

console.log(countInversions([5, 4, 3, 2, 1]));
// Output: 10  (reverse sorted = max inversions = n(n-1)/2)
```

**Why this works**: During merge, when we pick `right[j]` before `left[i]`, it means `left[i] > right[j]`. Since all remaining elements in `left[i..]` are also > `right[j]` (because both halves are sorted), each contributes an inversion.

**Complexity**: O(n log n) time, O(n) space — same as Merge Sort.

---

## Q17: What Is a Hybrid Sorting Algorithm and Why Are They Used?

**Question**: Explain what a hybrid sorting algorithm is and give examples of real-world hybrid sorts.

**Answer**: A **hybrid sorting algorithm** combines two or more sorting algorithms to leverage the strengths of each and mitigate their weaknesses.

### TimSort

Used by: Python, JavaScript (V8), Java (for objects), Rust, Swift

```text
TimSort strategy:
├── Divide array into "runs" (natural sorted subsequences)
├── For small runs (< 32 elements):
│   └── Use INSERTION SORT (fast for small n, cache-efficient)
├── For larger runs:
│   └── Use MERGE SORT merging strategy
│       └── Merge non-adjacent runs using "galloping mode"
└── Result: Stable, adaptive, O(n) on sorted data, O(n log n) worst case
```

### IntroSort

Used by: C++ `std::sort`, Go `sort.Slice`, .NET `Array.Sort()`

```text
IntroSort strategy:
├── Start with QUICK SORT (fast average case)
├── Track recursion depth with a counter
├── If depth exceeds 2 × log₂(n):
│   └── Switch to HEAP SORT (guarantees O(n log n))
└── For small subarrays (< 16 elements):
    └── Switch to INSERTION SORT (low overhead)
```

### Why Hybrid Sorts Dominate

| Pure Algorithm | Weakness | Hybrid Fix |
|---------------|----------|------------|
| Quick Sort | O(n²) worst case | Fallback to Heap Sort (IntroSort) |
| Merge Sort | O(n) space, high overhead for small n | Use Insertion Sort for small subarrays (TimSort) |
| Heap Sort | Poor cache performance | Rarely used alone, only as fallback |
| Insertion Sort | O(n²) for large n | Only used for small subarrays (n < 32–64) |

**Most modern standard library sort functions are hybrids.** No production sorting system uses a single pure algorithm.

---

## 💡 Quick Interview Cheat Sheet

```text
Must-Know Facts for Sorting Interviews:

1. Comparison sorts cannot beat O(n log n)  ← Decision tree proof
2. Only non-comparison sorts (Counting, Radix, Bucket) can do O(n)
3. Quick Sort is fastest in practice         ← Cache efficiency
4. Insertion Sort is O(n) on sorted data     ← Adaptive property
5. Heap Sort is O(1) space, O(n log n) time  ← For memory-constrained systems
6. Merge Sort is stable, guaranteed           ← For linked lists and stability
7. Stability matters when sorting by multiple keys
8. TimSort is the most common real-world sort ← JS, Python, Java, Rust
9. Quick Select finds kth element in O(n) avg ← Partial sorting
10. Dutch National Flag sorts 3 values in O(n) ← Three-way partitioning

Time Complexities:
O(n²):        Bubble, Selection, Insertion (average)
O(n):         Insertion, Bubble (best case — already sorted)
O(n log n):   Merge, Quick (average), Heap
O(n):         Counting, Radix (with constraints)
```

---

**Next:** Back to [Sorting Overview](/DSA-Notes-Problems/data-structures/sorting) →
