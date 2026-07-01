const sidebar = [
      {
        label: 'Redis',
        items: [
          { label: 'Redis Overview', link: '/redis' },
          {
            label: 'Core Concepts',
            items: [
              { label: 'Introduction to Redis', link: '/redis/introduction-to-redis' },
              { label: 'In-Memory Database', link: '/redis/what-is-an-in-memory-database' },
              { label: 'Redis Architecture', link: '/redis/redis-architecture' },
              { label: 'Installing Redis', link: '/redis/installing-redis' },
              { label: 'Data Types Overview', link: '/redis/redis-data-types-overview' },
            ],
          },
          {
            label: 'Data Types',
            items: [
              { label: 'Strings', link: '/redis/redis-strings' },
              { label: 'Lists', link: '/redis/redis-lists' },
              { label: 'Sets', link: '/redis/redis-sets' },
              { label: 'Sorted Sets', link: '/redis/redis-sorted-sets' },
              { label: 'Hashes', link: '/redis/redis-hashes' },
              { label: 'Streams', link: '/redis/redis-streams' },
            ],
          },
          {
            label: 'Features & Patterns',
            items: [
              { label: 'Key Expiration & TTL', link: '/redis/key-expiration-and-ttl' },
              { label: 'Persistence', link: '/redis/redis-persistence' },
              { label: 'Pub/Sub', link: '/redis/redis-pub-sub' },
              { label: 'Transactions', link: '/redis/redis-transactions' },
              { label: 'Caching Patterns', link: '/redis/redis-caching-patterns' },
              { label: 'Eviction Policies', link: '/redis/redis-eviction-policies' },
              { label: 'Distributed Locks', link: '/redis/redis-distributed-locks' },
            ],
          },
          {
            label: 'Scaling & High Availability',
            items: [
              { label: 'Replication', link: '/redis/redis-replication' },
              { label: 'Sentinel', link: '/redis/redis-sentinel' },
              { label: 'Cluster', link: '/redis/redis-cluster' },
            ],
          },
          {
            label: 'Integration & Commands',
            items: [
              { label: 'Redis with Node.js', link: '/redis/redis-with-node-js' },
              { label: 'Redis with Docker', link: '/redis/redis-with-docker' },
              { label: 'Commands Cheat Sheet', link: '/redis/common-redis-commands-cheat-sheet' },
              { label: 'Security', link: '/redis/redis-security' },
            ],
          },
          {
            label: 'Practice & Interview',
            items: [
              { label: '🎯 Interview Questions (150+)', link: '/redis/interview-questions' },
              { label: 'Common Beginner Mistakes', link: '/redis/common-beginner-mistakes' },
              { label: 'Best Practices', link: '/redis/redis-best-practices' },
              { label: 'Interview Questions', link: '/redis/redis-interview-questions' },
              { label: 'Learning Roadmap', link: '/redis/summary-and-learning-roadmap' },
            ],
          },
        ],
      },
];
export default sidebar;
