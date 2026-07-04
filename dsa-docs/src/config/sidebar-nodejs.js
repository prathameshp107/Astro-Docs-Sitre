const sidebar = [
      {
        label: 'Node.js',
        items: [
          { label: 'Node.js Overview', link: '/nodejs' },
          {
            label: '1. Fundamentals',
            items: [{ autogenerate: { directory: 'nodejs/fundamentals' } }],
          },
          {
            label: '2. Core Concepts',
            items: [{ autogenerate: { directory: 'nodejs/core' } }],
          },
          {
            label: '3. Web Development',
            items: [{ autogenerate: { directory: 'nodejs/web' } }],
          },
          {
            label: '4. Data Layer',
            items: [{ autogenerate: { directory: 'nodejs/data' } }],
          },
          {
            label: '5. Production',
            items: [{ autogenerate: { directory: 'nodejs/production' } }],
          },
          {
            label: '6. Advanced Topics',
            items: [{ autogenerate: { directory: 'nodejs/advanced' } }],
          },
          {
            label: '7. System Design',
            items: [{ autogenerate: { directory: 'nodejs/system-design' } }],
          },
          { label: '🎯 Interview Questions (150+)', link: '/nodejs/interview-questions' },
        ],
      },
];
export default sidebar;
