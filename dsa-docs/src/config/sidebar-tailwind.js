const sidebar = [
      {
        label: 'Tailwind CSS',
        items: [
          { label: 'Tailwind Overview', link: '/tailwind' },
          {
            label: '01. Basics',
            items: [{ autogenerate: { directory: 'tailwind/01-basics' } }],
          },
          {
            label: '02. Core Utilities',
            items: [{ autogenerate: { directory: 'tailwind/02-core-utilities' } }],
          },
          {
            label: '03. Layout',
            items: [{ autogenerate: { directory: 'tailwind/03-layout' } }],
          },
          {
            label: '04. Advanced',
            items: [{ autogenerate: { directory: 'tailwind/04-advanced' } }],
          },
          {
            label: '05. Interview',
            items: [{ autogenerate: { directory: 'tailwind/05-interview' } }],
          },
        ],
      },
];
export default sidebar;
