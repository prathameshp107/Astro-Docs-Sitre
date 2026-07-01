const sidebar = [
      {
        label: 'MongoDB',
        items: [
          { label: 'MongoDB Overview', link: '/mongodb' },
          {
            label: 'Getting Started',
            items: [
              { label: 'What is MongoDB?', link: '/mongodb/getting-started/what-is-mongodb' },
              { label: 'Installation & Tools', link: '/mongodb/getting-started/installation-and-tools' },
              { label: 'Documents & Collections', link: '/mongodb/getting-started/documents-and-collections' },
            ],
          },
          {
            label: 'Core MongoDB',
            items: [
              { label: 'Fundamentals & CRUD', link: '/mongodb/core/fundamentals-crud' },
              { label: 'Query & Filtering', link: '/mongodb/core/query-filtering' },
              { label: 'Data Modeling', link: '/mongodb/core/data-modeling' },
              { label: 'Indexing', link: '/mongodb/core/indexing' },
            ],
          },
          {
            label: 'Aggregation Framework',
            items: [
              { label: 'Aggregation Overview', link: '/mongodb/aggregation-framework' },
              { label: 'Pipeline Basics & Stages', link: '/mongodb/aggregation-framework/pipeline-basics-stages' },
              { label: '$match, $project, $sort', link: '/mongodb/aggregation-framework/filter-project-sort-pagination' },
              { label: '$group & Accumulators', link: '/mongodb/aggregation-framework/group-accumulators' },
              { label: '$lookup & $unwind', link: '/mongodb/aggregation-framework/lookup-unwind' },
              { label: 'Expressions & Computed Fields', link: '/mongodb/aggregation-framework/expressions-computed-fields' },
              { label: 'Real-World Examples', link: '/mongodb/aggregation-framework/real-world-examples' },
              { label: 'Aggregation Optimization', link: '/mongodb/aggregation-framework/aggregation-optimization' },
            ],
          },
          {
            label: 'Operations',
            items: [
              { label: 'Replication & Replica Sets', link: '/mongodb/operations/replication-and-replica-sets' },
              { label: 'Sharding', link: '/mongodb/operations/sharding' },
              { label: 'Transactions', link: '/mongodb/operations/transactions' },
              { label: 'Read & Write Concern', link: '/mongodb/operations/read-write-concern' },
              { label: 'Change Streams', link: '/mongodb/operations/change-streams' },
              { label: 'Performance & explain()', link: '/mongodb/operations/performance-and-explain' },
            ],
          },
          {
            label: 'Security',
            items: [
              { label: 'Authentication & Authorization', link: '/mongodb/security/authentication-and-authorization' },
              { label: 'Schema Validation', link: '/mongodb/security/schema-validation' },
              { label: 'Security Best Practices', link: '/mongodb/security/security-best-practices' },
            ],
          },
          {
            label: 'Integration',
            items: [
              { label: 'Mongoose — Node.js', link: '/mongodb/mongoose-nodejs-integration' },
            ],
          },
          {
            label: 'Interview & Revision',
            items: [
              { label: '🎯 Interview Questions (150+)', link: '/mongodb/interview-questions' },
              { label: 'Top 100 Interview Questions', link: '/mongodb/top-100-interview-questions' },
              { label: 'Quick Reference Cheat Sheet', link: '/mongodb/quick-reference-cheat-sheet' },
              { label: 'Advanced Topics Hub', link: '/mongodb/advanced-topics' },
            ],
          },
        ],
      },
];
export default sidebar;
