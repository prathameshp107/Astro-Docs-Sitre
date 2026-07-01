const sidebar = [
      {
        label: 'HTML & CSS',
        items: [
          { label: 'Overview', link: '/html-css' },
          {
            label: '01. HTML Basics',
            items: [{ autogenerate: { directory: 'html-css/01-html' } }],
          },
          {
            label: '02. CSS Basics',
            items: [{ autogenerate: { directory: 'html-css/02-css-basics' } }],
          },
          {
            label: '03. Layout',
            items: [{ autogenerate: { directory: 'html-css/03-layout' } }],
          },
          {
            label: '04. Advanced',
            items: [{ autogenerate: { directory: 'html-css/04-advanced' } }],
          },
          {
            label: '05. Interview',
            items: [{ autogenerate: { directory: 'html-css/05-interview' } }],
          },
        ],
      },
];
export default sidebar;
