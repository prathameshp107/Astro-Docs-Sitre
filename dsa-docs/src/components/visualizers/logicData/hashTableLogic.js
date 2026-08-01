export const hashTableLogic = {
  'hash-table': {
    title: 'Hash Table Data Structure & Hash Functions',
    input: 'Keys = ["apple", "banana", "cherry"], Bucket Array Size = 8',
    goal: 'Demonstrate key-value mapping via hash function hash(key) % capacity in average O(1) time.',
    terms: {
      'Hash Function': 'Deterministic algorithm mapping string/object key to integer hash code.',
      'Bucket Array': 'Internal array storing key-value entries at index = hash(key) % Capacity.',
      'Collision': 'Two distinct keys mapping to the same bucket index.',
      'Load Factor': 'Ratio of entries to capacity (N / Capacity). Keep < 0.75 for performance.'
    },
    array: [0, 1, 2, 3, 4, 5, 6, 7],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Problem Setup — Create 8-Bucket Hash Table',
        left: 0, right: 7,
        leftLabel: 'bucket 0', rightLabel: 'bucket 7',
        array: ['∅', '∅', '∅', '∅', '∅', '∅', '∅', '∅'],
        buckets: Array(8).fill(null).map(() => []),
        activeKey: null, activeVal: null, hashIdx: null,
        computation: 'buckets = new Array(8) — each slot is an empty list',
        comparison: 'Hash Function: h(k) = sum(charCodes) % 8',
        action: 'Init Table',
        desc: 'Create hash table with 8 buckets. Each bucket starts empty. Hash function: sum character ASCII codes, then modulo by capacity.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Hash Key "apple" → bucket 3',
        left: 3, right: 3,
        leftLabel: 'bucket 3', rightLabel: 'bucket 3',
        array: ['∅', '∅', '∅', 'apple:10', '∅', '∅', '∅', '∅'],
        buckets: [[], [], [], [{ key: 'apple', val: 10 }], [], [], [], []],
        activeKey: 'apple', activeVal: 10, hashIdx: 3,
        computation: 'hash("apple") = (97+112+112+108+101) = 530 → 530 % 8 = 3',
        comparison: 'Bucket 3 Empty → Direct Insert',
        action: 'Insert "apple":10',
        desc: 'Compute hash for "apple". ASCII sum = 530. 530 % 8 = 3 (remainder after dividing by 8 gives bucket index 3). Bucket 3 is empty — insert directly.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Hash Key "banana" → bucket 5',
        left: 5, right: 5,
        leftLabel: 'bucket 5', rightLabel: 'bucket 5',
        array: ['∅', '∅', '∅', 'apple:10', '∅', 'banana:20', '∅', '∅'],
        buckets: [[], [], [], [{ key: 'apple', val: 10 }], [], [{ key: 'banana', val: 20 }], [], []],
        activeKey: 'banana', activeVal: 20, hashIdx: 5,
        computation: 'hash("banana") = 605 → 605 % 8 = 5',
        comparison: 'Bucket 5 Empty → Direct Insert',
        action: 'Insert "banana":20',
        desc: 'Compute hash for "banana". ASCII sum = 605. 605 % 8 = 5. Bucket 5 is empty — insert directly. No collision.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Lookup "apple" → O(1) Instant Access! 🎉',
        left: 3, right: 3,
        leftLabel: 'match', rightLabel: 'match',
        array: ['∅', '∅', '∅', 'apple:10', '∅', 'banana:20', '∅', '∅'],
        buckets: [[], [], [], [{ key: 'apple', val: 10 }], [], [{ key: 'banana', val: 20 }], [], []],
        activeKey: 'apple', activeVal: 10, hashIdx: 3,
        computation: 'get("apple") → hash=3 → bucket[3] → value = 10',
        comparison: 'O(1) CONSTANT TIME 🎉',
        action: 'Return 10',
        isMatch: true,
        desc: 'Lookup "apple": compute hash → index 3 → find entry → return value 10. Average O(1) constant time! 🎉'
      }
    ]
  },

  'separate-chaining': {
    title: 'Collision Resolution via Separate Chaining',
    input: 'Insert "apple"(3), "banana"(5), "cherry"(3) → collision at bucket 3',
    goal: 'Handle hash collisions by maintaining a linked list of entries at each bucket index.',
    terms: {
      'Separate Chaining': 'Each bucket holds a linked list. Colliding keys are appended to the same list.',
      'Collision': 'hash("apple") % 8 == hash("cherry") % 8 == 3 — same bucket!',
      'Chain Traversal': 'On lookup, walk the linked list at the bucket to find the matching key.',
      'Load Factor': 'N/Capacity. When > 0.75, rehash (double capacity and re-insert all entries).'
    },
    array: ['∅', '∅', '∅', '∅', '∅', '∅', '∅', '∅'],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Create Empty 8-Bucket Hash Table',
        left: 0, right: 7,
        leftLabel: 'bucket 0', rightLabel: 'bucket 7',
        array: ['∅', '∅', '∅', '∅', '∅', '∅', '∅', '∅'],
        buckets: Array(8).fill(null).map(() => []),
        activeKey: null, activeVal: null, hashIdx: null,
        computation: 'Initialize 8 empty linked list buckets',
        comparison: 'All buckets empty',
        action: 'Init Table',
        desc: 'Create 8 buckets, each an empty linked list. We will demonstrate collision and chaining.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Compute hash("apple") = bucket 3',
        left: 3, right: 3,
        leftLabel: 'bucket 3', rightLabel: 'bucket 3',
        array: ['∅', '∅', '∅', '∅', '∅', '∅', '∅', '∅'],
        buckets: Array(8).fill(null).map(() => []),
        activeKey: 'apple', activeVal: 10, hashIdx: 3,
        computation: 'hash("apple") = sum(ASCII) % 8 = 530 % 8 = 3',
        comparison: 'Bucket 3 is EMPTY ✅',
        action: 'Compute Hash',
        desc: 'Hash "apple": ASCII sum = 530, mod 8 = 3. Bucket 3 is empty — safe to insert without collision.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Insert "apple":10 into Bucket 3',
        left: 3, right: 3,
        leftLabel: 'bucket 3', rightLabel: 'bucket 3',
        array: ['∅', '∅', '∅', 'apple:10', '∅', '∅', '∅', '∅'],
        buckets: [[], [], [], [{ key: 'apple', val: 10 }], [], [], [], []],
        activeKey: 'apple', activeVal: 10, hashIdx: 3,
        computation: 'bucket[3].append({"apple": 10})',
        comparison: 'Chain: "apple":10 → NULL',
        action: 'Insert "apple"',
        desc: 'Insert {"apple":10} as head of bucket 3 linked list. Chain: "apple":10 → NULL. Load factor: 1/8 = 0.125.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Insert "banana":20 into Bucket 5',
        left: 5, right: 5,
        leftLabel: 'bucket 5', rightLabel: 'bucket 5',
        array: ['∅', '∅', '∅', 'apple:10', '∅', 'banana:20', '∅', '∅'],
        buckets: [[], [], [], [{ key: 'apple', val: 10 }], [], [{ key: 'banana', val: 20 }], [], []],
        activeKey: 'banana', activeVal: 20, hashIdx: 5,
        computation: 'hash("banana") % 8 = 5. bucket[5].append({"banana": 20})',
        comparison: 'No collision (bucket 5 was empty)',
        action: 'Insert "banana"',
        desc: 'Hash "banana" → bucket 5. Insert directly. Load factor: 2/8 = 0.25. No collision between buckets 3 and 5.'
      },
      {
        stepNum: 5,
        title: 'Step 5: ⚠️ COLLISION — hash("cherry") = bucket 3!',
        left: 3, right: 3,
        leftLabel: 'collision!', rightLabel: 'collision!',
        array: ['∅', '∅', '∅', 'apple:10', '∅', 'banana:20', '∅', '∅'],
        buckets: [[], [], [], [{ key: 'apple', val: 10 }], [], [{ key: 'banana', val: 20 }], [], []],
        activeKey: 'cherry', activeVal: 30, hashIdx: 3, collision: true,
        computation: 'hash("cherry") % 8 = 3 — SAME as "apple"!',
        comparison: '⚠️ COLLISION at Bucket 3',
        action: 'Detect Collision',
        desc: 'hash("cherry") = 3. Bucket 3 already contains "apple":10! ⚠️ COLLISION DETECTED. Two different keys map to the same index.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Chain "cherry":30 after "apple":10',
        left: 3, right: 3,
        leftLabel: 'chain', rightLabel: 'chain',
        array: ['∅', '∅', '∅', 'apple→cherry', '∅', 'banana:20', '∅', '∅'],
        buckets: [[], [], [], [{ key: 'apple', val: 10 }, { key: 'cherry', val: 30 }], [], [{ key: 'banana', val: 20 }], [], []],
        activeKey: 'cherry', activeVal: 30, hashIdx: 3,
        computation: 'bucket[3]: "apple":10 → "cherry":30 → NULL',
        comparison: 'Collision Resolved via Chaining!',
        action: 'Append to Chain',
        desc: 'Append {"cherry":30} to bucket 3 linked list. Chain: "apple":10 → "cherry":30 → NULL. Both entries preserved!'
      },
      {
        stepNum: 7,
        title: 'Step 7: Lookup "apple" — Walk Chain',
        left: 3, right: 3,
        leftLabel: 'lookup', rightLabel: 'found!',
        array: ['∅', '∅', '∅', 'apple→cherry', '∅', 'banana:20', '∅', '∅'],
        buckets: [[], [], [], [{ key: 'apple', val: 10 }, { key: 'cherry', val: 30 }], [], [{ key: 'banana', val: 20 }], [], []],
        activeKey: 'apple', activeVal: 10, hashIdx: 3,
        computation: 'hash("apple") → bucket 3 → walk chain → "apple" at head → val=10',
        comparison: 'Found at head! O(1)',
        action: 'Lookup "apple"',
        desc: 'Lookup "apple": hash → 3 → walk chain → first node matches "apple" → return 10. Found at head in O(1).'
      },
      {
        stepNum: 8,
        title: 'Step 8: Lookup "cherry" — Walk Chain Past "apple"',
        left: 3, right: 3,
        leftLabel: 'walk', rightLabel: 'found!',
        array: ['∅', '∅', '∅', 'apple→cherry', '∅', 'banana:20', '∅', '∅'],
        buckets: [[], [], [], [{ key: 'apple', val: 10 }, { key: 'cherry', val: 30 }], [], [{ key: 'banana', val: 20 }], [], []],
        activeKey: 'cherry', activeVal: 30, hashIdx: 3,
        computation: 'hash("cherry") → bucket 3 → skip "apple" → match "cherry" → val=30',
        comparison: 'Found after 1 hop! O(chain length)',
        action: 'Lookup "cherry"',
        desc: 'Lookup "cherry": hash → 3 → first node "apple" ≠ "cherry" → next node "cherry" = match → return 30. 1 hop needed.'
      },
      {
        stepNum: 9,
        title: 'Step 9: Separate Chaining Complete 🎉',
        left: 0, right: 7,
        leftLabel: 'start', rightLabel: 'end',
        array: ['∅', '∅', '∅', 'apple→cherry', '∅', 'banana:20', '∅', '∅'],
        buckets: [[], [], [], [{ key: 'apple', val: 10 }, { key: 'cherry', val: 30 }], [], [{ key: 'banana', val: 20 }], [], []],
        activeKey: 'cherry', activeVal: 30, hashIdx: 3,
        computation: '3 entries, 8 buckets. Load factor = 3/8 = 0.375',
        comparison: 'CHAINING COMPLETE 🎉',
        action: 'Done',
        isMatch: true,
        desc: 'Separate chaining complete! 3 entries in 8 buckets. Collision at bucket 3 resolved. Avg O(1) operations. Load factor = 0.375. 🎉'
      }
    ]
  },

  'linear-probing': {
    title: 'Open Addressing — Linear Probing',
    input: 'Insert "keyA"(slot 2), "keyB"(slot 2) → collision, probe to slot 3',
    goal: 'Resolve hash collision by probing linearly to the next empty slot.',
    terms: {
      'Open Addressing': 'All entries stored directly in the table array (no linked lists).',
      'Linear Probing': 'On collision, check slots sequentially: (hash + 1) % N, (hash + 2) % N, ...',
      'Primary Clustering': 'Groups of consecutive occupied slots form clusters, slowing future inserts.',
      'Deletion': 'Must use "tombstone" markers — simple deletion breaks probe chains.'
    },
    array: ['∅', '∅', '∅', '∅', '∅', '∅', '∅', '∅'],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Create Empty 8-Slot Table',
        left: 0, right: 7,
        leftLabel: 'slot 0', rightLabel: 'slot 7',
        array: ['∅', '∅', '∅', '∅', '∅', '∅', '∅', '∅'],
        openBuckets: Array(8).fill(null),
        activeKey: null, hashIdx: null, probeIdx: null,
        computation: 'Initialize 8 empty slots. Each slot holds ONE entry (or null).',
        comparison: 'No linked lists — direct storage',
        action: 'Init Table',
        desc: 'Create 8-slot open addressing table. Unlike chaining, each slot holds at most one entry. Collisions probe forward.'
      },
      {
        stepNum: 2,
        title: 'Step 2: hash("keyA") = slot 2 (empty ✅)',
        left: 2, right: 2,
        leftLabel: 'slot 2', rightLabel: 'empty',
        array: ['∅', '∅', '∅', '∅', '∅', '∅', '∅', '∅'],
        openBuckets: Array(8).fill(null),
        activeKey: 'keyA', hashIdx: 2, probeIdx: null,
        computation: 'hash("keyA") % 8 = 2. Slot 2 is EMPTY ✅',
        comparison: 'No collision — direct insert',
        action: 'Compute Hash',
        desc: 'hash("keyA") → slot 2. Slot is empty. No collision. Insert directly without probing.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Insert "keyA" at Slot 2',
        left: 2, right: 2,
        leftLabel: 'slot 2', rightLabel: '"keyA"',
        array: ['∅', '∅', 'keyA', '∅', '∅', '∅', '∅', '∅'],
        openBuckets: [null, null, 'keyA', null, null, null, null, null],
        activeKey: 'keyA', hashIdx: 2, probeIdx: null,
        computation: 'slots[2] = "keyA". Probe count = 0.',
        comparison: 'Load factor: 1/8 = 12.5%',
        action: 'Insert "keyA"',
        desc: 'Place "keyA" at slot 2. No probing needed. Load factor: 1/8 = 12.5%.'
      },
      {
        stepNum: 4,
        title: 'Step 4: hash("keyB") = slot 2 — ⚠️ COLLISION!',
        left: 2, right: 2,
        leftLabel: 'occupied!', rightLabel: '"keyA"',
        array: ['∅', '∅', 'keyA', '∅', '∅', '∅', '∅', '∅'],
        openBuckets: [null, null, 'keyA', null, null, null, null, null],
        activeKey: 'keyB', hashIdx: 2, probeIdx: 2, collision: true,
        computation: 'hash("keyB") % 8 = 2. Slot 2 OCCUPIED by "keyA"!',
        comparison: '⚠️ COLLISION — must probe',
        action: 'Detect Collision',
        desc: 'hash("keyB") → slot 2. ⚠️ Slot 2 already holds "keyA"! Cannot chain. Must linear probe forward.'
      },
      {
        stepNum: 5,
        title: 'Step 5: Probe to Slot (2+1)%8 = 3',
        left: 2, right: 3,
        leftLabel: 'occupied', rightLabel: 'empty ✅',
        array: ['∅', '∅', 'keyA', '∅', '∅', '∅', '∅', '∅'],
        openBuckets: [null, null, 'keyA', null, null, null, null, null],
        activeKey: 'keyB', hashIdx: 2, probeIdx: 3,
        computation: 'Probe step 1: (2+1) % 8 = 3. Slot 3 is EMPTY ✅',
        comparison: 'Found empty slot after 1 probe!',
        action: 'Probe Forward',
        desc: 'Linear probe: check slot (2+1)%8 = 3. Slot 3 is EMPTY! Found an available slot after just 1 probe step.'
      },
      {
        stepNum: 6,
        title: 'Step 6: Insert "keyB" at Slot 3',
        left: 2, right: 3,
        leftLabel: '"keyA"', rightLabel: '"keyB"',
        array: ['∅', '∅', 'keyA', 'keyB', '∅', '∅', '∅', '∅'],
        openBuckets: [null, null, 'keyA', 'keyB', null, null, null, null],
        activeKey: 'keyB', hashIdx: 3, probeIdx: 3,
        computation: 'slots[3] = "keyB". Probe count = 1. Displaced from ideal slot 2.',
        comparison: 'Load factor: 2/8 = 25%',
        action: 'Insert "keyB"',
        desc: '"keyB" placed at slot 3 (1 probe from ideal slot 2). This displacement is called primary clustering.'
      },
      {
        stepNum: 7,
        title: 'Step 7: Lookup "keyA" → slot 2 (direct) / "keyB" → probe from 2 to 3',
        left: 2, right: 3,
        leftLabel: '"keyA"', rightLabel: '"keyB"',
        array: ['∅', '∅', 'keyA', 'keyB', '∅', '∅', '∅', '∅'],
        openBuckets: [null, null, 'keyA', 'keyB', null, null, null, null],
        activeKey: 'keyA', hashIdx: 2, probeIdx: 2,
        computation: 'Lookup "keyA": slot 2 → match! Lookup "keyB": slot 2 ≠ "keyB" → slot 3 → match!',
        comparison: '"keyA": 0 probes, "keyB": 1 probe',
        action: 'Lookup Both',
        desc: 'Lookup "keyA": hash→2, match. Lookup "keyB": hash→2 (not match), probe→3 (match). Avg probes: 0.5.'
      },
      {
        stepNum: 8,
        title: 'Step 8: Linear Probing Complete 🎉',
        left: 2, right: 3,
        leftLabel: '"keyA"', rightLabel: '"keyB"',
        array: ['∅', '∅', 'keyA', 'keyB', '∅', '∅', '∅', '∅'],
        openBuckets: [null, null, 'keyA', 'keyB', null, null, null, null],
        activeKey: 'keyB', hashIdx: 3, probeIdx: 3,
        computation: '2 entries, 8 slots. Collision resolved with 1 probe.',
        comparison: 'LINEAR PROBING SUCCESS 🎉',
        action: 'Done',
        isMatch: true,
        desc: 'Linear probing complete! Collision at slot 2 resolved by probing to slot 3. Keep load factor < 0.7 to avoid long clusters. 🎉'
      }
    ]
  },

  'two-sum-hash': {
    title: 'Two Sum via Hash Map O(N)',
    input: 'Array = [2, 7, 11, 15], Target = 9',
    goal: 'Find two numbers that add to target 9 using hash map for O(1) complement lookup.',
    terms: {
      'Complement': 'complement = target - current_number',
      'Hash Map': 'map[num] = index — stores previously seen numbers for instant lookup',
      'One-Pass': 'Check complement AND store current number in the same loop iteration',
      'Brute Force Alternative': 'Nested loops O(N²) — hash map reduces to O(N)'
    },
    array: [2, 7, 11, 15],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Problem Setup — Empty Hash Map',
        left: null, right: null,
        leftLabel: '', rightLabel: '',
        array: [2, 7, 11, 15],
        numArray: [2, 7, 11, 15], target: 9, currIdx: null, mapState: {},
        computation: 'Create empty map. Strategy: for each num, check if (target - num) is in map.',
        comparison: 'Target = 9, Map = {}',
        action: 'Init Map',
        desc: 'Given [2,7,11,15] and target 9. Create empty hash map. For each number: compute complement = 9 - num, check map.'
      },
      {
        stepNum: 2,
        title: 'Step 2: nums[0]=2, complement=7 → NOT in map',
        left: 0, right: 0,
        leftLabel: 'curr 2', rightLabel: 'curr 2',
        array: [2, 7, 11, 15],
        numArray: [2, 7, 11, 15], target: 9, currIdx: 0, mapState: {},
        computation: 'complement = 9 - 2 = 7. map.has(7) → FALSE',
        comparison: '7 not found. Store map[2] = 0',
        action: 'Store 2',
        desc: 'Process nums[0]=2. Complement 9-2=7 not in map. Store {2→0} in map for future lookups.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Store {2: 0} in Hash Map',
        left: 0, right: 0,
        leftLabel: 'stored', rightLabel: 'stored',
        array: [2, 7, 11, 15],
        numArray: [2, 7, 11, 15], target: 9, currIdx: 0, mapState: { 2: 0 },
        computation: 'map = {2: 0}. Size = 1.',
        comparison: 'If future num has complement 2, we find index 0',
        action: 'Map Store',
        desc: 'Hash map now contains {2→index 0}. If any future number needs complement 2, we instantly know it\'s at index 0.'
      },
      {
        stepNum: 4,
        title: 'Step 4: nums[1]=7, complement=2 → 🎯 FOUND in map!',
        left: 0, right: 1,
        leftLabel: 'prev 2', rightLabel: 'curr 7',
        array: [2, 7, 11, 15],
        numArray: [2, 7, 11, 15], target: 9, currIdx: 1, mapState: { 2: 0 },
        computation: 'complement = 9 - 7 = 2. map.has(2) → TRUE (index 0)! 🎯',
        comparison: 'MATCH: nums[0]=2 + nums[1]=7 = 9 ✅',
        action: 'Found Match!',
        desc: 'Process nums[1]=7. Complement 9-7=2 → look up 2 in map → FOUND at index 0! 🎯 Pair: (index 0, index 1).'
      },
      {
        stepNum: 5,
        title: 'Step 5: Verify — 2 + 7 = 9 ✅',
        left: 0, right: 1,
        leftLabel: '2', rightLabel: '7',
        array: [2, 7, 11, 15],
        numArray: [2, 7, 11, 15], target: 9, currIdx: 1, mapState: { 2: 0 },
        computation: 'nums[0] + nums[1] = 2 + 7 = 9 = target ✅',
        comparison: 'Solution verified!',
        action: 'Verify',
        desc: 'Verify: nums[0]=2 + nums[1]=7 = 9 = target ✅. Valid pair confirmed. Found in just 2 iterations!'
      },
      {
        stepNum: 6,
        title: 'Step 6: Return [0, 1] — O(N) Solution 🎉',
        left: 0, right: 1,
        leftLabel: 'idx 0', rightLabel: 'idx 1',
        array: [2, 7, 11, 15],
        numArray: [2, 7, 11, 15], target: 9, currIdx: 1, mapState: { 2: 0 },
        computation: 'return [map.get(2), 1] = [0, 1]',
        comparison: 'TWO SUM COMPLETE 🎉',
        action: 'Return [0, 1]',
        isMatch: true,
        desc: 'Return [0, 1]. Hash map O(N) single-pass beats brute force O(N²). Each element visited at most once. 🎉'
      }
    ]
  },

  'group-anagrams': {
    title: 'Group Anagrams via Canonical Hash Keys O(N × K log K)',
    input: 'Words = ["eat", "tea", "tan", "ate"]',
    goal: 'Group strings that are anagrams by using sorted characters as canonical hash map keys.',
    terms: {
      'Canonical Key': 'Sort each word\'s characters to create a unique key for its anagram group.',
      'Hash Map Groups': 'map[sorted_key] = [list of original words sharing that sorted form]',
      'Anagram': 'Two words are anagrams if they contain the same characters in different order.',
      'Complexity': 'O(N × K log K) time — sort K chars for each of N words'
    },
    array: ['eat', 'tea', 'tan', 'ate'],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Problem Setup — Empty Anagram Map',
        left: null, right: null,
        leftLabel: '', rightLabel: '',
        array: ['eat', 'tea', 'tan', 'ate'],
        words: ['eat', 'tea', 'tan', 'ate'], currWord: null, sortedKey: null, anagramGroups: {},
        computation: 'Strategy: sort("eat") = "aet", sort("tea") = "aet" — same key!',
        comparison: 'Map = {}',
        action: 'Init Map',
        desc: 'Group anagrams by sorting each word to create a canonical key. Anagrams share the same sorted form.'
      },
      {
        stepNum: 2,
        title: 'Step 2: "eat" → sort → "aet" (new group)',
        left: 0, right: 0,
        leftLabel: '"eat"', rightLabel: '"aet"',
        array: ['eat', 'tea', 'tan', 'ate'],
        words: ['eat', 'tea', 'tan', 'ate'], currWord: 'eat', sortedKey: 'aet', anagramGroups: { aet: ['eat'] },
        computation: 'sort("eat") = "aet". map["aet"] = ["eat"]',
        comparison: 'New group created',
        action: 'Create Group',
        desc: 'Word "eat" → sorted key "aet". Key not in map. Create new group: map["aet"] = ["eat"].'
      },
      {
        stepNum: 3,
        title: 'Step 3: "tea" → sort → "aet" (append to existing!)',
        left: 0, right: 1,
        leftLabel: '"eat"', rightLabel: '"tea"',
        array: ['eat', 'tea', 'tan', 'ate'],
        words: ['eat', 'tea', 'tan', 'ate'], currWord: 'tea', sortedKey: 'aet', anagramGroups: { aet: ['eat', 'tea'] },
        computation: 'sort("tea") = "aet". map["aet"].push("tea") → ["eat", "tea"]',
        comparison: '"tea" is an anagram of "eat"!',
        action: 'Append to Group',
        desc: '"tea" → "aet" → key exists! Append: map["aet"] = ["eat", "tea"]. Both are anagrams — same sorted chars.'
      },
      {
        stepNum: 4,
        title: 'Step 4: "tan" → sort → "ant" (new group)',
        left: 2, right: 2,
        leftLabel: '"tan"', rightLabel: '"ant"',
        array: ['eat', 'tea', 'tan', 'ate'],
        words: ['eat', 'tea', 'tan', 'ate'], currWord: 'tan', sortedKey: 'ant', anagramGroups: { aet: ['eat', 'tea'], ant: ['tan'] },
        computation: 'sort("tan") = "ant". map["ant"] = ["tan"]',
        comparison: 'Different sorted key → new group',
        action: 'Create Group',
        desc: '"tan" → "ant". Different from "aet". Create new group: map["ant"] = ["tan"]. Two groups now.'
      },
      {
        stepNum: 5,
        title: 'Step 5: "ate" → sort → "aet" (append — 3rd anagram!)',
        left: 0, right: 3,
        leftLabel: '"eat"', rightLabel: '"ate"',
        array: ['eat', 'tea', 'tan', 'ate'],
        words: ['eat', 'tea', 'tan', 'ate'], currWord: 'ate', sortedKey: 'aet', anagramGroups: { aet: ['eat', 'tea', 'ate'], ant: ['tan'] },
        computation: 'sort("ate") = "aet". map["aet"].push("ate") → ["eat", "tea", "ate"]',
        comparison: '"ate" joins the "aet" group!',
        action: 'Append to Group',
        desc: '"ate" → "aet" → key exists! Append: map["aet"] = ["eat", "tea", "ate"]. Three anagrams found!'
      },
      {
        stepNum: 6,
        title: 'Step 6: Extract Groups from Map',
        left: 0, right: 3,
        leftLabel: 'start', rightLabel: 'end',
        array: ['eat', 'tea', 'tan', 'ate'],
        words: ['eat', 'tea', 'tan', 'ate'], currWord: null, sortedKey: null, anagramGroups: { aet: ['eat', 'tea', 'ate'], ant: ['tan'] },
        computation: 'map.values() = [["eat","tea","ate"], ["tan"]]',
        comparison: '2 groups, 4 total words',
        action: 'Extract Values',
        desc: 'All words processed. Extract map values: Group 1 ("aet"): ["eat","tea","ate"]. Group 2 ("ant"): ["tan"].'
      },
      {
        stepNum: 7,
        title: 'Step 7: Group Anagrams Complete 🎉',
        left: 0, right: 3,
        leftLabel: 'start', rightLabel: 'end',
        array: ['eat', 'tea', 'tan', 'ate'],
        words: ['eat', 'tea', 'tan', 'ate'], currWord: null, sortedKey: null, anagramGroups: { aet: ['eat', 'tea', 'ate'], ant: ['tan'] },
        computation: 'Result: [["eat","tea","ate"], ["tan"]]',
        comparison: 'GROUP ANAGRAMS COMPLETE 🎉',
        action: 'Return Groups',
        isMatch: true,
        desc: 'Result: [["eat","tea","ate"], ["tan"]]. O(N × K log K) time, O(N × K) space. Canonical key approach is elegant! 🎉'
      }
    ]
  }
};
