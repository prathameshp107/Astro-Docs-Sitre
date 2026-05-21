
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const sourceRoot = path.resolve(projectRoot, '..');
const docsRoot = path.join(projectRoot, 'src', 'content', 'docs');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function yamlQuote(value) {
  return JSON.stringify(String(value).replace(/\r?\n/g, ' ').trim());
}

function rewriteAssetLinks(content, assetGroup) {
  let rewritten = content
    .replace(/\]\(\/assets\//g, '](/DSA-Notes-Problems/assets/')
    .replace(/src="\/assets\//g, 'src="/DSA-Notes-Problems/assets/')
    .replace(/!\[([^\]]*)\]\(\.\.\/dsa-docs\/public\/assets\/([^)]+)\)/g, function(match, alt, assetPath) {
      return `![${alt}](/DSA-Notes-Problems/assets/${assetPath})`;
    })
    .replace(/!\[([^\]]*)\]\(\.\.\/dsa-docs\/public\/assets\/([^)]+)\s*"[^"]*"\)/g, function(match, alt, assetPath) {
      return `![${alt}](/DSA-Notes-Problems/assets/${assetPath})`;
    });
  
  if (assetGroup) {
    rewritten = rewritten.replace(
      /\]\((\.\/)?public\/([^)]+)\)/g,
      function(match, dotSlash, assetPath) {
        return '](/DSA-Notes-Problems/assets/' + assetGroup + '/' + assetPath.toLowerCase().replace(/_/g, '-') + ')';
      }
    );
  }
  
  return rewritten;
}

function copyFileWithFrontmatter(sourceRel, targetRel, title, desc) {
  const sourcePath = path.join(sourceRoot, sourceRel);
  const targetPath = path.join(docsRoot, targetRel);
  
  if (!fs.existsSync(sourcePath)) return;
  
  let content = fs.readFileSync(sourcePath, 'utf8').replace(/^\uFEFF/, '');
  
  const finalContent = '---\ntitle: ' + yamlQuote(title) + '\ndescription: ' + yamlQuote(desc) + '\n---\n\n' + rewriteAssetLinks(content, path.dirname(targetRel).split('/')[0]);
  
  ensureDir(path.dirname(targetPath));
  fs.writeFileSync(targetPath, finalContent, 'utf8');
  console.log('Copied: ' + sourceRel + ' → ' + targetRel);
}

// Copy remaining files!
copyFileWithFrontmatter(
  'Data_Structure/Array/Array_Problems.md',
  'data-structures/array-problems.md',
  'Array Problems',
  'Array problem-solving practice questions and solutions for coding interviews.'
);

copyFileWithFrontmatter(
  'Data_Structure/Graphs/Graphs.md',
  'data-structures/graphs.md',
  'Graphs',
  'Graph data structure notes, traversal algorithms, BFS, DFS, and graph problems.'
);

copyFileWithFrontmatter(
  'Data_Structure/LinkedList/Linkedlist.md',
  'data-structures/linked-list.md',
  'Linked List',
  'Linked list data structure notes, operations, and interview problems.'
);

copyFileWithFrontmatter(
  'Data_Structure/Recursion & Backtracking/Recursion & Backtracking.md',
  'data-structures/recursion-and-backtracking.md',
  'Recursion & Backtracking',
  'Recursion and backtracking concepts, patterns, and problem-solving examples.'
);

copyFileWithFrontmatter(
  'Data_Structure/Tree/Tree.md',
  'data-structures/tree.md',
  'Tree',
  'Tree data structure notes, traversal, BST, AVL trees, and interview problems.'
);

copyFileWithFrontmatter(
  'JavaScript/JavaScript_Interview_Questions.md',
  'javascript/interview-questions.md',
  'JavaScript Interview Questions',
  'Common JavaScript interview questions and answers covering core concepts, async, closures, and more.'
);

copyFileWithFrontmatter(
  'MYSQL/MySQL_Interview_Prep.md',
  'sql/interview-prep.md',
  'MySQL Interview Prep',
  'MySQL interview preparation questions and answers for database and SQL concepts.'
);

copyFileWithFrontmatter(
  'MongoDb/mongodb_top100_interview_qa.md',
  'mongodb/top-100-interview-questions.md',
  'MongoDB Top 100 Interview Questions',
  'Top 100 MongoDB interview questions and answers covering queries, aggregation, and administration.'
);

copyFileWithFrontmatter(
  'fullstack_interview_questions.md',
  'interview/fullstack.md',
  'Fullstack Interview Questions',
  'Fullstack interview questions and answers covering frontend, backend, databases, and system design.'
);

console.log('✅ All remaining files copied!');

