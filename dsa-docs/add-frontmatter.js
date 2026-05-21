import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const sourceRoot = path.resolve(projectRoot, '..');
const docsRoot = path.join(projectRoot, 'src', 'content', 'docs');
const publicRoot = path.join(projectRoot, 'public');

const migrations = [
  ['Data_Structure/DSA_Notes.md', 'data-structures/dsa-notes.md'],
  ['Data_Structure/Array/Array_Problems.md', 'data-structures/array/array-problems.md'],
  ['Data_Structure/Graphs/Graphs.md', 'data-structures/graphs/graphs.md'],
  ['Data_Structure/LinkedList/Linkedlist.md', 'data-structures/linked-list/linked-list.md'],
  [
    'Data_Structure/Recursion & Backtracking/Recursion & Backtracking.md',
    'data-structures/recursion-and-backtracking/recursion-and-backtracking.md',
  ],
  ['Data_Structure/Tree/Tree.md', 'data-structures/tree/tree.md'],
  ['JavaScript/JavaScript_Interview_Questions.md', 'javascript/javascript-interview-questions.md'],
  ['JavaScript/Javascript.md', 'javascript/javascript.md'],
  ['JavaScript/namasteJS.md', 'javascript/namaste-js.md'],
  ['MYSQL/MySQL_Complete_Preparation_Notes.md', 'sql/mysql-complete-preparation-notes.md'],
  ['MYSQL/MySQL_Interview_Prep.md', 'sql/mysql-interview-prep.md'],
  ['MongoDb/mongodb_complete_notes.md', 'mongodb/mongodb-complete-notes.md'],
  ['MongoDb/mongodb_top100_interview_qa.md', 'mongodb/mongodb-top100-interview-qa.md'],
  ['REACT.js/React-Full-Interview_Questions.md', 'react/react-full-interview-questions.md'],
  ['REACT.js/React_setup_guideline.md', 'react/react-setup-guideline.md'],
  ['fullstack_interview_questions.md', 'interview/fullstack.md'],
];

const sectionIndexes = [
  [
    'data-structures/index.md',
    'Data Structures',
    'Core data structure notes and practice problems covering arrays, linked lists, trees, graphs, recursion, stacks, queues, and more.',
  ],
  [
    'javascript/index.md',
    'JavaScript',
    'JavaScript interview questions, language fundamentals, patterns, and practical problem-solving notes.',
  ],
  [
    'react/index.md',
    'React',
    'React setup guidance, notes, hooks, component patterns, and interview preparation.',
  ],
  [
    'sql/index.md',
    'SQL / MySQL',
    'MySQL preparation notes covering queries, joins, schema design, indexing, and interview questions.',
  ],
  [
    'mongodb/index.md',
    'MongoDB',
    'MongoDB notes and interview questions covering collections, queries, aggregation, indexes, and schema design.',
  ],
  [
    'interview/index.md',
    'Interview Prep',
    'Fullstack interview preparation notes and question banks for frontend, backend, database, and system fundamentals.',
  ],
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function toTitle(value) {
  return value
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\bDsa\b/g, 'DSA')
    .replace(/\bSql\b/g, 'SQL')
    .replace(/\bMysql\b/g, 'MySQL')
    .replace(/\bMongodb\b/g, 'MongoDB')
    .replace(/\bJavascript\b/g, 'JavaScript');
}

function yamlQuote(value) {
  return JSON.stringify(String(value).replace(/\r?\n/g, ' ').trim());
}

function splitFrontmatter(content) {
  if (!content.startsWith('---')) return { frontmatter: '', body: content };
  const end = content.indexOf('\n---', 3);
  if (end === -1) return { frontmatter: '', body: content };
  return {
    frontmatter: content.slice(3, end).trim(),
    body: content.slice(end + 4).replace(/^\r?\n/, ''),
  };
}

function firstHeading(body) {
  const match = body.match(/^#\s+(.+)$/m);
  return match?.[1]?.replace(/[#`*_]/g, '').trim();
}

function firstParagraph(body) {
  const paragraph = body
    .split(/\r?\n\r?\n/)
    .map((block) => block.replace(/\r?\n/g, ' ').trim())
    .find((block) => block && !block.startsWith('#') && !block.startsWith('```') && !block.startsWith('|'));

  if (!paragraph) return '';
  return paragraph
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[`*_>#]/g, '')
    .replace(/\s+/g, ' ')
    .slice(0, 155)
    .trim();
}

function addFrontmatter(content, fileName, targetRelative = '') {
  const { frontmatter, body } = splitFrontmatter(content);
  const title = firstHeading(body) || toTitle(fileName);
  const description =
    firstParagraph(body) ||
    `Study notes and interview preparation material for ${title}.`;

  const lines = frontmatter
    ? frontmatter.split(/\r?\n/).filter((line) => !/^(title|description)\s*:/.test(line))
    : [];

  const nextFrontmatter = [
    `title: ${yamlQuote(title)}`,
    `description: ${yamlQuote(description)}`,
    ...lines,
  ].join('\n');

  return `---\n${nextFrontmatter}\n---\n\n${rewriteAssetLinks(body, targetRelative).replace(/^\s+/, '')}`;
}

function rewriteAssetLinks(content, targetRelative) {
  const assetGroup = targetRelative.startsWith('react/')
    ? 'react'
    : targetRelative.startsWith('sql/')
      ? 'sql'
      : '';

  let rewritten = content
    .replace(/\]\(\/assets\//g, '](/DSA-Notes-Problems/assets/')
    .replace(/src="\/assets\//g, 'src="/DSA-Notes-Problems/assets/')
    .replace(/\]\(\.\/\.\.\/public\/INNER-JOIN-SVG\.svg\)/g, '](/DSA-Notes-Problems/assets/sql/inner-join-svg.svg)')
    .replace(/\]\(\.\/\.\.\/public\/LEFT-JOIN-SVG\.svg\)/g, '](/DSA-Notes-Problems/assets/sql/left-join-svg.svg)')
    .replace(/\]\(\.\/\.\.\/public\/RIGHT-JOIN\.svg\)/g, '](/DSA-Notes-Problems/assets/sql/right-join.svg)')
    .replace(/\]\(\.\/\.\.\/public\/FULL-OUTER-JOIN\.svg\)/g, '](/DSA-Notes-Problems/assets/sql/full-outer-join.svg)')
    .replace(/\]\(\.\/\.\.\/public\/CROSS-JOIN\.svg\)/g, '](/DSA-Notes-Problems/assets/sql/cross-join.svg)')
    .replace(/\]\(\.\/\.\.\/public\/SELF-JOIN\.svg\)/g, '](/DSA-Notes-Problems/assets/sql/self-join.svg)')
    .replace(/\]\(\.\/\.\.\/public\/Exclusion-Join\.svg\)/g, '](/DSA-Notes-Problems/assets/sql/exclusion-join.svg)');

  if (assetGroup) {
    rewritten = rewritten.replace(
      /\]\((\.\/)?public\/([^)]+)\)/g,
      (_, _dotSlash, assetPath) =>
        `](/DSA-Notes-Problems/assets/${assetGroup}/${assetPath.toLowerCase().replace(/_/g, '-')})`,
    );
  }

  return rewritten;
}

function emptyDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir)) {
    fs.rmSync(path.join(dir, entry), { recursive: true, force: true });
  }
}

function copyFileRelative(sourceRelative, targetRelative) {
  const source = path.join(sourceRoot, sourceRelative);
  const target = path.join(docsRoot, targetRelative);
  if (!fs.existsSync(source)) {
    throw new Error(`Missing source file: ${sourceRelative}`);
  }
  const content = fs.readFileSync(source, 'utf8').replace(/^\uFEFF/, '');
  ensureDir(path.dirname(target));
  fs.writeFileSync(target, addFrontmatter(content, path.basename(target), targetRelative), 'utf8');
}

function copyAssets(fromRelative, toRelative) {
  const from = path.join(sourceRoot, fromRelative);
  const to = path.join(publicRoot, toRelative);
  if (!fs.existsSync(from)) return;
  ensureDir(to);
  for (const file of fs.readdirSync(from, { withFileTypes: true })) {
    const source = path.join(from, file.name);
    const target = path.join(to, file.name.toLowerCase().replace(/_/g, '-'));
    if (file.isDirectory()) {
      copyAssets(path.join(fromRelative, file.name), path.join(toRelative, file.name.toLowerCase()));
    } else if (/\.(svg|png|jpe?g|gif|webp)$/i.test(file.name)) {
      fs.copyFileSync(source, target);
    }
  }
}

const missingSources = migrations
  .map(([source]) => source)
  .filter((source) => !fs.existsSync(path.join(sourceRoot, source)));

if (missingSources.length) {
  throw new Error(`Missing source file(s): ${missingSources.join(', ')}`);
}

emptyDirectory(docsRoot);

for (const [source, target] of migrations) {
  copyFileRelative(source, target);
}

for (const [target, title, description] of sectionIndexes) {
  const output = path.join(docsRoot, target);
  ensureDir(path.dirname(output));
  fs.writeFileSync(
    output,
    `---\ntitle: ${yamlQuote(title)}\ndescription: ${yamlQuote(description)}\n---\n\n# ${title}\n\n${description}\n`,
    'utf8',
  );
}

fs.writeFileSync(
  path.join(docsRoot, 'index.mdx'),
  `---\ntitle: "DSA & Dev Notes"\ndescription: "Personal knowledge base for DSA, JavaScript, React, SQL, MongoDB, and interview preparation."\n---\n\n# DSA & Dev Notes\n\nA focused knowledge base for data structures, frontend engineering, databases, and interview preparation.\n\n## Sections\n\n- [Data Structures](/DSA-Notes-Problems/data-structures/)\n- [JavaScript](/DSA-Notes-Problems/javascript/)\n- [React](/DSA-Notes-Problems/react/)\n- [SQL / MySQL](/DSA-Notes-Problems/sql/)\n- [MongoDB](/DSA-Notes-Problems/mongodb/)\n- [Interview Prep](/DSA-Notes-Problems/interview/)\n`,
  'utf8',
);

copyAssets('public', 'assets/sql');
copyAssets('REACT.js/public', 'assets/react');

console.log(`Migrated ${migrations.length} Markdown files.`);
console.log(`Created ${sectionIndexes.length} section index pages.`);
