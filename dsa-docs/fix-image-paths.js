
import fs from 'node:fs';
import path from 'node:path';

const docsRoot = path.join(process.cwd(), 'src', 'content', 'docs');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix all wrong image paths!
  let fixedContent = content
    .replace(/\]\(\.\.\/dsa-docs\/public\/assets\/([^)]+)\)/g, '](/DSA-Notes-Problems/assets/$1)')
    .replace(/src="\.\.\/dsa-docs\/public\/assets\/([^"]+)"/g, 'src="/DSA-Notes-Problems/assets/$1"');
  
  if (fixedContent !== content) {
    fs.writeFileSync(filePath, fixedContent, 'utf8');
    console.log('Fixed image paths in:', path.relative(docsRoot, filePath));
  }
}

function processDirectory(dirPath) {
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      processFile(fullPath);
    }
  }
}

console.log('Fixing image paths in all content files...');
processDirectory(docsRoot);
console.log('✅ All image paths fixed!');

