const sidebar = [
      {
        label: 'Data Structures',
        items: [
          { label: 'Home', link: '/data-structures' },
          {
            label: 'Fundamentals',
            items: [{ autogenerate: { directory: 'data-structures/fundamentals' } }],
          },
          {
            label: 'Arrays',
            items: [
              { label: 'Arrays Overview', link: '/data-structures/arrays/arrays' },
              { label: 'Two Sum Problem', link: '/data-structures/arrays/two-sum-problem' },
              { label: 'Array Problems', link: '/data-structures/arrays/array-problems' },
              {
                label: 'Array Methods',
                items: [{ autogenerate: { directory: 'data-structures/arrays/array-methods' } }],
              },
            ],
          },
          {
            label: 'Strings',
            items: [{ autogenerate: { directory: 'data-structures/strings' } }],
          },
          {
            label: 'Matrix',
            items: [{ autogenerate: { directory: 'data-structures/matrix' } }],
          },
          {
            label: 'Hashing',
            items: [{ autogenerate: { directory: 'data-structures/hashing' } }],
          },
          {
            label: 'Stacks & Queues',
            items: [{ autogenerate: { directory: 'data-structures/stacks-queues' } }],
          },
          {
            label: 'Heap & Priority Queue',
            items: [
              { label: 'Priority Queue & Heap', link: '/data-structures/stacks-queues/priority-queue-and-heap' },
              { label: 'Heap Operations', link: '/data-structures/trees/09-heap' },
              { label: 'Heap Sort', link: '/data-structures/sorting/07-heap-sort' },
              { label: 'Top K Elements (Heap Pattern)', link: '/data-structures/interview-prep/13-top-k-heap' },
            ],
          },
          {
            label: 'Linked List',
            items: [{ autogenerate: { directory: 'data-structures/linked-list' } }],
          },
          {
            label: 'Trees',
            items: [{ autogenerate: { directory: 'data-structures/trees' } }],
          },
          {
            label: 'Graphs',
            items: [{ autogenerate: { directory: 'data-structures/graphs' } }],
          },
          {
            label: 'Sorting',
            items: [{ autogenerate: { directory: 'data-structures/sorting' } }],
          },
          {
            label: 'Binary Search',
            items: [
              { autogenerate: { directory: 'data-structures/binary-search' } },
              {
                label: '5 Core Patterns',
                items: [{ autogenerate: { directory: 'data-structures/binary-search/02-patterns' } }],
              },
              {
                label: '10 Classic Problems',
                items: [{ autogenerate: { directory: 'data-structures/binary-search/03-problems' } }],
              },
              {
                label: 'Advanced Topics',
                items: [{ autogenerate: { directory: 'data-structures/binary-search/04-advanced' } }],
              },
              {
                label: 'Interview Questions',
                items: [{ autogenerate: { directory: 'data-structures/binary-search/05-interview-questions' } }],
              },
            ],
          },
          {
            label: 'Recursion & Backtracking',
            items: [{ autogenerate: { directory: 'data-structures/recursion' } }],
          },
          {
            label: 'Dynamic Programming',
            items: [
              { autogenerate: { directory: 'data-structures/dynamic-programming' } },
              {
                label: '1D DP Problems',
                items: [{ autogenerate: { directory: 'data-structures/dynamic-programming/04-1d-dp' } }],
              },
              {
                label: '2D DP Problems',
                items: [{ autogenerate: { directory: 'data-structures/dynamic-programming/05-2d-dp' } }],
              },
              {
                label: 'String DP Problems',
                items: [{ autogenerate: { directory: 'data-structures/dynamic-programming/06-string-dp' } }],
              },
            ],
          },
          {
            label: 'Greedy',
            items: [{ autogenerate: { directory: 'data-structures/greedy' } }],
          },
          {
            label: 'Bit Manipulation',
            items: [{ autogenerate: { directory: 'data-structures/bit-manipulation' } }],
          },
          {
            label: 'Math',
            items: [{ autogenerate: { directory: 'data-structures/math' } }],
          },
          {
            label: 'Interview Prep',
            items: [{ autogenerate: { directory: 'data-structures/interview-prep' } }],
          },
        ],
      },
      {
        label: 'Striver Blind 75 Solutions',
        items: [
          { label: 'All 75 Problems Overview', link: '/striver-blind-75' },
          { label: '01. Arrays', items: [{ autogenerate: { directory: 'striver-blind-75/01-arrays' } }] },
          { label: '02. Bit Manipulation', items: [{ autogenerate: { directory: 'striver-blind-75/02-bit-manipulation' } }] },
          { label: '03. Dynamic Programming', items: [{ autogenerate: { directory: 'striver-blind-75/03-dynamic-programming' } }] },
          { label: '04. Graphs', items: [{ autogenerate: { directory: 'striver-blind-75/04-graphs' } }] },
          { label: '05. Intervals', items: [{ autogenerate: { directory: 'striver-blind-75/05-intervals' } }] },
          { label: '06. Linked List', items: [{ autogenerate: { directory: 'striver-blind-75/06-linked-list' } }] },
          { label: '07. Matrix', items: [{ autogenerate: { directory: 'striver-blind-75/07-matrix' } }] },
          { label: '08. Strings', items: [{ autogenerate: { directory: 'striver-blind-75/08-strings' } }] },
          { label: '09. Trees & BST', items: [{ autogenerate: { directory: 'striver-blind-75/09-trees' } }] },
          { label: '10. Tries & Heaps', items: [{ autogenerate: { directory: 'striver-blind-75/10-tries-heaps' } }] },
        ],
      },
];
export default sidebar;
