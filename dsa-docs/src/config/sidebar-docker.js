const sidebar = [
      {
        label: 'Docker',
        items: [
          { label: 'Docker Overview', link: '/docker' },
          {
            label: 'Fundamentals',
            items: [{ autogenerate: { directory: 'docker/fundamentals' } }],
          },
          {
            label: 'Advanced Docker',
            items: [{ autogenerate: { directory: 'docker/advanced' } }],
          },
          {
            label: 'Orchestration',
            items: [{ autogenerate: { directory: 'docker/orchestration' } }],
          },
          { label: '🎯 Interview Questions (150+)', link: '/docker/interview-questions' },
        ],
      },
];
export default sidebar;
