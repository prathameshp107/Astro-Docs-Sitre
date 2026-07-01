const sidebar = [
      {
        label: 'SQL / MySQL',
        items: [
          { label: 'SQL / MySQL Overview', link: '/sql' },
          {
            label: 'Database Basics',
            items: [
              { label: 'Database & RDBMS Basics', link: '/sql/database-rdbms-basics' },
              { label: 'MySQL Architecture', link: '/sql/mysql-architecture' },
              { label: 'Data Types', link: '/sql/data-types' },
              { label: 'Keys & Constraints', link: '/sql/keys-constraints' },
              { label: 'Normalization', link: '/sql/normalization' },
            ],
          },
          {
            label: 'Querying Data',
            items: [
              { label: 'CRUD Operations', link: '/sql/crud-operations' },
              { label: 'Aggregations & Functions', link: '/sql/aggregations-functions' },
              { label: 'Subqueries & CTEs', link: '/sql/subqueries-ctes' },
              { label: 'Views', link: '/sql/views' },
              { label: 'Window Functions', link: '/sql/window-functions' },
              { label: 'Set Operations', link: '/sql/set-operations' },
              { label: 'CASE & Conditional Logic', link: '/sql/case-and-conditional-logic' },
              { label: 'Query Execution Order', link: '/sql/query-execution-order' },
              { label: 'NULL Handling', link: '/sql/null-handling' },
            ],
          },
          {
            label: 'Joins',
            items: [
              { label: 'Joins Overview', link: '/sql/joins' },
              { label: 'INNER JOIN', link: '/sql/inner-join' },
              { label: 'LEFT JOIN', link: '/sql/left-join-left-outer-join' },
              { label: 'RIGHT JOIN', link: '/sql/right-join-right-outer-join' },
              { label: 'FULL OUTER JOIN', link: '/sql/full-outer-join' },
              { label: 'CROSS JOIN', link: '/sql/cross-join' },
              { label: 'SELF JOIN', link: '/sql/self-join' },
              { label: 'Exclusion Joins', link: '/sql/exclusion-joins-anti-joins' },
              { label: 'JOIN Conditions & Pitfalls', link: '/sql/join-conditions-pitfalls' },
              { label: 'Choosing the Right Join', link: '/sql/choosing-the-right-join-decision-guide' },
            ],
          },
          {
            label: 'Performance & Transactions',
            items: [
              { label: 'Indexing', link: '/sql/indexing' },
              { label: 'EXPLAIN & Query Optimization', link: '/sql/explain-query-optimization' },
              { label: 'Performance Optimization', link: '/sql/performance-optimization' },
              { label: 'Transactions & ACID', link: '/sql/transactions-acid-properties' },
              { label: 'Isolation Levels & Deadlocks', link: '/sql/isolation-levels-and-deadlocks' },
              { label: 'Locks', link: '/sql/locks' },
            ],
          },
          {
            label: 'Programmability',
            items: [
              { label: 'Stored Procedures & Functions', link: '/sql/stored-procedures-functions' },
              { label: 'Triggers', link: '/sql/triggers' },
            ],
          },
          {
            label: 'Administration & Scaling',
            items: [
              { label: 'Users & Privileges', link: '/sql/users-and-privileges' },
              { label: 'Backup & Restore', link: '/sql/backup-and-restore' },
              { label: 'Replication', link: '/sql/replication' },
              { label: 'Partitioning & Sharding', link: '/sql/partitioning-and-sharding' },
              { label: 'JSON & Full-Text Search', link: '/sql/json-and-fulltext' },
            ],
          },
          {
            label: 'Interview & Revision',
            items: [
              { label: '🎯 Interview Questions (150+)', link: '/sql/interview-questions' },
              { label: 'MySQL Interview Prep', link: '/sql/interview-prep' },
              { label: 'Common Interview Questions', link: '/sql/common-interview-questions-answers' },
              { label: 'Quick Revision Cheat Sheet', link: '/sql/quick-revision-cheat-sheet' },
              { label: 'Quick Reference Summary', link: '/sql/quick-reference-summary' },
            ],
          },
        ],
      },
];
export default sidebar;
