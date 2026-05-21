import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://prathameshp107.github.io',
  base: '/DSA-Notes-Problems',
  integrations: [
    starlight({
      title: 'DSA & Dev Notes',
      description: 'Personal knowledge base for DSA, JavaScript, React, SQL, MongoDB and Interview Prep',
      defaultLocale: 'en',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/prathameshp107/DSA-Notes-Problems',
        },
      ],
      logo: {
        alt: 'DSA Notes',
        src: './src/assets/logo.svg',
      },
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'Home',
          link: '/',
        },
        {
          label: 'Data Structures',
          items: [{ autogenerate: { directory: 'data-structures' } }],
        },
        {
          label: 'JavaScript',
          items: [{ autogenerate: { directory: 'javascript' } }],
        },
        {
          label: 'Namaste JavaScript',
          items: [{ autogenerate: { directory: 'namaste-js' } }],
        },
        {
          label: 'React',
          items: [
            { label: 'Introduction to React', link: '/react/introduction' },
            { label: 'React Project Structure', link: '/react/project-structure' },
            { label: 'JSX', link: '/react/jsx' },
            { label: 'Components', link: '/react/components' },
            { label: 'Props', link: '/react/props' },
            {
              label: 'Hooks',
              items: [
                { label: 'Hooks Overview', link: '/react/hooks' },
                { label: 'useState', link: '/react/hooks/use-state' },
                { label: 'useEffect', link: '/react/hooks/use-effect' },
                { label: 'useRef', link: '/react/hooks/use-ref' },
                { label: 'useMemo', link: '/react/hooks/use-memo' },
                { label: 'useCallback', link: '/react/hooks/use-callback' },
                { label: 'useContext', link: '/react/hooks/use-context' },
                { label: 'useReducer', link: '/react/hooks/use-reducer' },
                { label: 'Custom Hooks', link: '/react/hooks/custom-hooks' },
              ],
            },
            { label: 'React Strict Mode', link: '/react/strict-mode' },
            { label: 'Fragments', link: '/react/fragments' },
            { label: 'Data Binding', link: '/react/data-binding' },
            { label: 'React Setup Guideline', link: '/react/react-setup-guideline' },
            { label: 'React Full Interview Questions', link: '/react/react-full-interview-questions' },
          ],
        },
        {
          label: 'SQL / MySQL',
          items: [{ autogenerate: { directory: 'sql' } }],
        },
        {
          label: 'MongoDB',
          items: [{ autogenerate: { directory: 'mongodb' } }],
        },
        {
          label: 'Interview Prep',
          items: [{ autogenerate: { directory: 'interview' } }],
        },
      ],
      head: [
        {
          tag: 'meta',
          attrs: {
            name: 'keywords',
            content: 'DSA, JavaScript, React, MongoDB, SQL, Interview Prep',
          },
        },
      ],
    }),
  ],
});
