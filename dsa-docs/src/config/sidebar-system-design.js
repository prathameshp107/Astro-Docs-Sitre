const sidebar = [
      {
        label: 'System Design',
        items: [
          { label: 'Overview', link: '/system-design' },
          {
            label: 'Fundamentals',
            items: [{ autogenerate: { directory: 'system-design/01-fundamentals' } }],
          },
          {
            label: 'Building Blocks',
            items: [{ autogenerate: { directory: 'system-design/02-building-blocks' } }],
          },
          {
            label: 'Databases',
            items: [{ autogenerate: { directory: 'system-design/03-databases' } }],
          },
          {
            label: 'Caching',
            items: [{ autogenerate: { directory: 'system-design/04-caching' } }],
          },
          {
            label: 'Communication',
            items: [{ autogenerate: { directory: 'system-design/05-communication' } }],
          },
          {
            label: 'Architecture Patterns',
            items: [{ autogenerate: { directory: 'system-design/06-architecture-patterns' } }],
          },
          {
            label: 'Distributed Systems',
            items: [{ autogenerate: { directory: 'system-design/07-distributed-systems' } }],
          },
          {
            label: 'Reliability & Scale',
            items: [{ autogenerate: { directory: 'system-design/08-reliability-and-scale' } }],
          },
          {
            label: 'Security',
            items: [{ autogenerate: { directory: 'system-design/09-security' } }],
          },
          {
            label: 'Interview Guide',
            items: [{ autogenerate: { directory: 'system-design/10-interview-guide' } }],
          },
          {
            label: 'Case Studies',
            items: [{ autogenerate: { directory: 'system-design/11-case-studies' } }],
          },
        ],
      },
];
export default sidebar;
