export const hashTableLogic = {
  'hash-table': {
    title: 'Hash Table Data Structure & Hash Functions',
    input: 'Keys = ["apple", "banana", "cherry"], Bucket Array Size = 8',
    goal: 'Demonstrate key-value mapping via hash function hash(key) % capacity in average O(1) time.',
    terms: {
      'Hash Function': 'Deterministic algorithm mapping string/object key to integer hash code.',
      'Bucket Array': 'Internal array storing key-value entries at index = hash(key) % Capacity.',
      'Collision': 'Two distinct keys mapping to the same bucket index.',
      'Load Factor': 'Ratio of entries to capacity (N / Capacity).'
    },
    array: [0, 1, 2, 3, 4, 5, 6, 7],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Hash Key "apple" ➔ hash("apple") % 8 = 3',
        left: 3, right: 3,
        leftLabel: 'bucket 3', rightLabel: 'bucket 3',
        array: ['apple:10'],
        computation: 'hash("apple") = 97+112+112+108+101 = 531 ➔ 531 % 8 = 3',
        comparison: 'Bucket 3 Empty',
        action: 'Insert "apple": 10',
        desc: 'Compute hash code for "apple". 531 % 8 = 3. Bucket 3 is empty. Store {"apple": 10} at index 3.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Hash Key "banana" ➔ hash("banana") % 8 = 5',
        left: 5, right: 5,
        leftLabel: 'bucket 5', rightLabel: 'bucket 5',
        array: ['apple:10', 'banana:20'],
        computation: 'hash("banana") = 605 ➔ 605 % 8 = 5',
        comparison: 'Bucket 5 Empty',
        action: 'Insert "banana": 20',
        desc: 'Compute hash for "banana". 605 % 8 = 5. Bucket 5 is empty. Store {"banana": 20} at index 5.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Lookup "apple" ➔ Instant O(1) Access! 🎉',
        left: 3, right: 3,
        leftLabel: 'match', rightLabel: 'match',
        array: ['apple:10', 'banana:20'],
        computation: 'get("apple") ➔ Bucket 3 ➔ val = 10',
        comparison: 'O(1) CONSTANT TIME 🎉',
        action: 'Return 10',
        isMatch: true,
        desc: 'Lookup "apple". Compute hash index 3 instantly. Retrieve value 10 in average O(1) time! 🎉'
      }
    ]
  },

  'separate-chaining': {
    title: 'Collision Resolution via Separate Chaining O(1)',
    input: 'Insert "apple" (idx 3) and "grape" (idx 3)',
    goal: 'Handle hash collisions by maintaining a linked list of entries at each bucket index.',
    terms: {
      'Collision': 'hash("apple") % 8 == hash("grape") % 8 == 3',
      'LinkedList Bucket': 'Nodes chained sequentially: "apple":10 → "grape":30 → NULL'
    },
    array: [3, 3],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Insert "apple" at Bucket 3',
        left: 3, right: 3,
        leftLabel: 'bucket 3', rightLabel: 'bucket 3',
        array: ['apple:10'],
        computation: 'hash("apple") % 8 = 3 ➔ bucket[3] = {"apple": 10}',
        comparison: 'Bucket 3 Created',
        action: 'Insert "apple"',
        desc: 'Insert "apple": 10 at bucket index 3.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Insert "grape" ➔ COLLISION at Bucket 3!',
        left: 3, right: 3,
        leftLabel: 'collision', rightLabel: 'collision',
        array: ['apple:10', 'grape:30'],
        computation: 'hash("grape") % 8 = 3 (COLLISION WITH "apple"!)',
        comparison: 'Chain Node to List',
        action: 'Append to Chain',
        desc: 'Encounter collision: "grape" hashes to index 3. Append node {"grape": 30} to bucket 3 linked list.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Separate Chaining Complete ➔ bucket[3] = [apple:10 → grape:30] 🎉',
        left: 3, right: 3,
        leftLabel: 'chain', rightLabel: 'chain',
        array: ['apple:10', 'grape:30'],
        computation: 'bucket[3]: "apple":10 → "grape":30 → NULL',
        comparison: 'COLLISION RESOLVED 🎉',
        action: 'Return Table',
        isMatch: true,
        desc: 'Collision resolved via linked list chaining. Both keys preserved without data loss! 🎉'
      }
    ]
  },

  'two-sum-hash': {
    title: 'Two Sum via Hash Map O(N)',
    input: 'Array = [2, 7, 11, 15], Target = 9',
    goal: 'Find two numbers that add to target 9 using hash map for O(1) complement lookup.',
    terms: {
      'Complement Formula': 'complement = target - num',
      'Map Store': 'map[num] = index'
    },
    array: [2, 7, 11, 15],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Inspect num = 2 ➔ complement = 9 - 2 = 7',
        left: 0, right: 0,
        leftLabel: 'curr 2', rightLabel: 'curr 2',
        array: [2, 7, 11, 15],
        computation: 'complement = 9 - 2 = 7. map.has(7) is FALSE',
        comparison: 'Store map[2] = 0',
        action: 'Store 2 in Map',
        desc: 'Inspect index 0 (val 2). Complement needed: 9 - 2 = 7. 7 not in map. Store map[2] = 0.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Inspect num = 7 ➔ complement = 9 - 7 = 2 (MATCH FOUND! 🎉)',
        left: 0, right: 1,
        leftLabel: 'prev 2', rightLabel: 'curr 7',
        array: [2, 7, 11, 15],
        computation: 'complement = 9 - 7 = 2. map.has(2) is TRUE! (idx 0)',
        comparison: '2 + 7 = 9 (TARGET MATCHED! ✅)',
        action: 'Return [0, 1]',
        isMatch: true,
        desc: 'Inspect index 1 (val 7). Complement 9 - 7 = 2 is found in map at index 0! Return indices [0, 1] in single pass O(N) time! 🎉'
      }
    ]
  }
};
