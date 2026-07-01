const sidebar = [
      {
        label: 'Design Patterns & SOLID',
        items: [
          { label: 'Overview', link: '/design-patterns' },
          {
            label: '01. Fundamentals',
            items: [{ autogenerate: { directory: 'design-patterns/01-fundamentals' } }],
          },
          {
            label: '02. SOLID Principles',
            items: [{ autogenerate: { directory: 'design-patterns/02-solid' } }],
          },
          {
            label: '03. Creational',
            items: [{ autogenerate: { directory: 'design-patterns/03-creational' } }],
          },
          {
            label: '04. Structural',
            items: [{ autogenerate: { directory: 'design-patterns/04-structural' } }],
          },
          {
            label: '05. Behavioral',
            items: [{ autogenerate: { directory: 'design-patterns/05-behavioral' } }],
          },
          {
            label: '06. Practical Guide',
            items: [{ autogenerate: { directory: 'design-patterns/06-practical' } }],
          },
          {
            label: '07. Interview',
            items: [{ autogenerate: { directory: 'design-patterns/07-interview' } }],
          },
        ],
      },
];
export default sidebar;
