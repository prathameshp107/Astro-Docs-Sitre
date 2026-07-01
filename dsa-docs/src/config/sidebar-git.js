const sidebar = [
      {
        label: 'Git & GitHub',
        items: [
          { label: 'Overview', link: '/git' },
          {
            label: '01. Basics',
            items: [{ autogenerate: { directory: 'git/01-basics' } }],
          },
          {
            label: '02. Branching',
            items: [{ autogenerate: { directory: 'git/02-branching' } }],
          },
          {
            label: '03. Remote & GitHub',
            items: [{ autogenerate: { directory: 'git/03-remote-and-github' } }],
          },
          {
            label: '04. Advanced',
            items: [{ autogenerate: { directory: 'git/04-advanced' } }],
          },
          {
            label: '05. Interview',
            items: [{ autogenerate: { directory: 'git/05-interview' } }],
          },
        ],
      },
];
export default sidebar;
