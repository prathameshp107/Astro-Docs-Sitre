import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const sourceDir = path.resolve(projectRoot, '..', 'AllDocs', 'Docker');
const targetDir = path.join(projectRoot, 'src', 'content', 'docs', 'docker');

const sources = [
  {
    file: 'docker-fundamentals.md',
    group: 'fundamentals',
    title: 'Docker Fundamentals',
    description:
      'Beginner-friendly Docker notes covering containers, images, Docker CLI, volumes, networks, Docker Hub, best practices, and interview questions.',
    orderOffset: 0,
  },
  {
    file: 'docker-advanced.md',
    group: 'advanced',
    title: 'Advanced Docker',
    description:
      'Advanced Docker notes covering Dockerfiles, optimization, multi-stage builds, Compose, production, registries, CI/CD, monitoring, backup, and troubleshooting.',
    orderOffset: 100,
  },
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function toSlug(value) {
  return value
    .toLowerCase()
    .replace(/[#`*_]/g, '')
    .replace(/&/g, 'and')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .trim();
}

function yamlQuote(value) {
  return JSON.stringify(String(value).replace(/\r?\n/g, ' ').trim());
}

function stripEmoji(value) {
  return value
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function firstParagraph(body) {
  const paragraph = body
    .split(/\r?\n\r?\n/)
    .map((block) => block.replace(/\r?\n/g, ' ').trim())
    .find(
      (block) =>
        block &&
        !block.startsWith('#') &&
        !block.startsWith('```') &&
        !block.startsWith('|') &&
        !block.startsWith('>') &&
        !block.startsWith('!')
    );

  if (!paragraph) return '';

  return paragraph
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[`*_>#]/g, '')
    .replace(/\s+/g, ' ')
    .slice(0, 155)
    .trim();
}

function parseSections(content) {
  const lines = content.split(/\r?\n/);
  const starts = [];
  let inCode = false;

  for (let i = 0; i < lines.length; i++) {
    if (/^\s*```/.test(lines[i])) {
      inCode = !inCode;
      continue;
    }

    if (!inCode) {
      const match = lines[i].match(/^##\s+(\d+)\.\s+(.+)$/);
      if (match) {
        starts.push({
          number: Number.parseInt(match[1], 10),
          title: stripEmoji(match[2]),
          lineIdx: i,
        });
      }
    }
  }

  return starts.map((section, index) => {
    const endLine = index < starts.length - 1 ? starts[index + 1].lineIdx : lines.length;
    return {
      ...section,
      body: lines.slice(section.lineIdx, endLine).join('\n').trim(),
    };
  });
}

function normalizeCodeFenceLanguages(content) {
  return content
    .replace(/^```svg\s*$/gm, '```xml')
    .replace(/^```dockerignore\s*$/gm, '```text');
}

function buildGroupIndex(source, files) {
  const links = files
    .map((file) => `- [${file.title}](/DSA-Notes-Problems/docker/${source.group}/${file.slug})`)
    .join('\n');

  return `---
title: ${yamlQuote(source.title)}
description: ${yamlQuote(source.description)}
sidebar:
  order: ${source.orderOffset}
---

# ${source.title}

${source.description}

## Topics

${links}
`;
}

function buildMainIndex(groups) {
  const sections = groups
    .map((group) => {
      const links = group.files
        .map((file) => `- [${file.title}](/DSA-Notes-Problems/docker/${group.source.group}/${file.slug})`)
        .join('\n');

      return `## ${group.source.title}

${group.source.description}

${links}`;
    })
    .join('\n\n');

  return `---
title: "Docker"
description: "Complete Docker guide split topic-wise into fundamentals and advanced production-ready concepts."
---

# Docker

Complete Docker guide split topic-wise into fundamentals and advanced production-ready concepts.

${sections}
`;
}

ensureDir(targetDir);
for (const entry of fs.readdirSync(targetDir, { withFileTypes: true })) {
  fs.rmSync(path.join(targetDir, entry.name), { recursive: true, force: true });
}

const groups = [];

console.log('Splitting Docker markdown files...\n');

for (const source of sources) {
  const sourcePath = path.join(sourceDir, source.file);
  const groupTargetDir = path.join(targetDir, source.group);

  ensureDir(groupTargetDir);

  let content = fs.readFileSync(sourcePath, 'utf8').replace(/^\uFEFF/, '');
  const sections = parseSections(content);
  const files = [];

  for (const section of sections) {
    const slug = toSlug(section.title);
    const description = firstParagraph(section.body);
    const fileContent = `---
title: ${yamlQuote(section.title)}
description: ${yamlQuote(description || `${source.title} notes on ${section.title}`)}
sidebar:
  order: ${source.orderOffset + section.number}
---

${normalizeCodeFenceLanguages(section.body)}
`;

    fs.writeFileSync(path.join(groupTargetDir, `${slug}.md`), fileContent, 'utf8');
    files.push({ title: section.title, slug });
  }

  fs.writeFileSync(path.join(groupTargetDir, 'index.md'), buildGroupIndex(source, files), 'utf8');
  groups.push({ source, files });
  console.log(`  ${source.title}: ${files.length} topic files`);
}

fs.writeFileSync(path.join(targetDir, 'index.md'), buildMainIndex(groups), 'utf8');
console.log('\nDone! Docker docs written to src/content/docs/docker.');
