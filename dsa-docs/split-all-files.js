
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const sourceRoot = path.resolve(projectRoot, '..', 'AllDocs');
const docsRoot = path.join(projectRoot, 'src', 'content', 'docs');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function toSlug(value) {
  return value
    .toLowerCase()
    .replace(/[#`*_]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/-+/g, '-')
    .trim();
}

function yamlQuote(value) {
  return JSON.stringify(String(value).replace(/\r?\n/g, ' ').trim());
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

function splitFile(sourcePath, targetDir, assetGroup, sectionPattern, indexTitle, indexDesc) {
  ensureDir(targetDir);
  
  // Empty target dir first
  if (fs.existsSync(targetDir)) {
    for (const entry of fs.readdirSync(targetDir)) {
      fs.rmSync(path.join(targetDir, entry), { recursive: true, force: true });
    }
  }
  ensureDir(targetDir);
  
  let content = fs.readFileSync(sourcePath, 'utf8').replace(/^\uFEFF/, '');
  
  // Find all sections
  const sections = [];
  let match;
  const regex = new RegExp(sectionPattern, 'gm');
  
  while ((match = regex.exec(content)) !== null) {
    sections.push({
      title: match[1] || match[2],
      start: match.index,
      fullMatch: match[0]
    });
  }
  
  // Process sections
  const files = [];
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const start = section.start;
    const end = i < sections.length - 1 ? sections[i + 1].start : content.length;
    let sectionContent = content.slice(start, end).trim();
    const title = section.title.trim();
    const slug = toSlug(title);
    const description = firstParagraph(sectionContent);
    
    const finalContent = '---\ntitle: ' + yamlQuote(title) + '\ndescription: ' + yamlQuote(description || 'Study notes for ' + title) + '\nsort: ' + (i + 1) + '\n---\n\n' + rewriteAssetLinks(sectionContent, assetGroup);
    
    fs.writeFileSync(path.join(targetDir, slug + '.md'), finalContent, 'utf8');
    files.push({ title, slug });
  }
  
  // Create index file
  const indexLinks = files.map(function(f) {
    return '- [' + f.title + '](/DSA-Notes-Problems/' + path.basename(targetDir) + '/' + f.slug + ')';
  }).join('\n');
  
  const indexContent = '---\ntitle: ' + yamlQuote(indexTitle) + '\ndescription: ' + yamlQuote(indexDesc) + '\n---\n\n# ' + indexTitle + '\n\n' + indexDesc + '\n\n## Sections\n\n' + indexLinks;
  
  fs.writeFileSync(path.join(targetDir, 'index.md'), indexContent, 'utf8');
  
  return files;
}

// Now split each section!

console.log('Splitting files...');

// 1. JavaScript
const jsFiles = splitFile(
  path.resolve(sourceRoot, 'JavaScript', 'Javascript.md'),
  path.join(docsRoot, 'javascript'),
  null,
  /^##\s+(.+)$/gm,
  'JavaScript',
  'Complete JavaScript notes covering language fundamentals, features, and advanced concepts.'
);

// 2. NamasteJS
const namasteJsFiles = splitFile(
  path.resolve(sourceRoot, 'JavaScript', 'namasteJS.md'),
  path.join(docsRoot, 'namaste-js'),
  null,
  /^#\s+Episode\s+\d+\s*:\s*(.+)$/gm,
  'Namaste JavaScript',
  'Namaste JavaScript course notes covering execution context, hoisting, closures, and more.'
);

// 3. MongoDB
const mongoFiles = splitFile(
  path.resolve(sourceRoot, 'MongoDb', 'mongodb_complete_notes.md'),
  path.join(docsRoot, 'mongodb'),
  null,
  /^##\s+\d+\.\s+(.+)$/gm,
  'MongoDB',
  'Complete MongoDB notes from beginner to advanced, including CRUD, querying, indexing, and aggregation.'
);

// 4. MySQL
const mysqlFiles = splitFile(
  path.resolve(sourceRoot, 'MYSQL', 'MySQL_Complete_Preparation_Notes.md'),
  path.join(docsRoot, 'sql'),
  'sql',
  /^##\s+\d+\.\s+(.+)$/gm,
  'SQL / MySQL',
  'Complete MySQL preparation notes covering queries, joins, schema design, indexing, and interview questions.'
);

// 5. DSA Notes
const dsaFiles = splitFile(
  path.resolve(sourceRoot, 'Data_Structure', 'DSA_Notes.md'),
  path.join(docsRoot, 'data-structures'),
  null,
  /^#\s+(.+)$/gm,
  'Data Structures',
  'Core data structure notes and practice problems covering arrays, linked lists, trees, graphs, recursion, stacks, queues, and more.'
);

console.log('All files split successfully!');
console.log('- JavaScript: ' + jsFiles.length + ' files');
console.log('- Namaste JavaScript: ' + namasteJsFiles.length + ' files');
console.log('- MongoDB: ' + mongoFiles.length + ' files');
console.log('- SQL / MySQL: ' + mysqlFiles.length + ' files');
console.log('- Data Structures: ' + dsaFiles.length + ' files');

