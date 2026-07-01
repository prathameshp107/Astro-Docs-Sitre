const sidebar = [
      {
        label: 'Angular',
        items: [
          { label: 'Overview', link: '/angular' },
          {
            label: 'Phase 1: Fundamentals',
            items: [{ autogenerate: { directory: 'angular/phase-1' } }],
          },
          {
            label: 'Phase 2: Components, Routing & Forms',
            items: [{ autogenerate: { directory: 'angular/phase-2' } }],
          },
          {
            label: 'Phase 3: Advanced',
            items: [{ autogenerate: { directory: 'angular/phase-3' } }],
          },
          {
            label: 'Phase 4: Enterprise',
            items: [{ autogenerate: { directory: 'angular/phase-4' } }],
          },
          {
            label: 'Phase 5: Modern Angular',
            items: [{ autogenerate: { directory: 'angular/phase-5' } }],
          },
          { label: '🎯 Interview Questions (100+)', link: '/angular/interview-questions' },
        ],
      },
];
export default sidebar;
