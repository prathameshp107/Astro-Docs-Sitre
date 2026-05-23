import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const sourceDir = path.resolve(projectRoot, '..', 'AllDocs', 'Angular');
const targetDir = path.join(projectRoot, 'src', 'content', 'docs', 'angular');

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

function getSlug(phaseNum, title) {
  // Strip starting section numbers if present (e.g. "1. ", "1.1 ")
  let cleanTitle = title.replace(/^\d+(\.\d+)*\s+/, '');
  return `phase-${phaseNum}-${toSlug(cleanTitle)}`;
}

function yamlQuote(value) {
  return JSON.stringify(String(value).replace(/\r?\n/g, ' ').trim());
}

function firstParagraph(body) {
  const paragraph = body
    .split(/\r?\n\r?\n/)
    .map((block) => block.replace(/\r?\n/g, ' ').trim())
    .find((block) => block && !block.startsWith('#') && !block.startsWith('```') && !block.startsWith('|') && !block.startsWith('>'));

  if (!paragraph) return '';
  return paragraph
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[`*_>#]/g, '')
    .replace(/\s+/g, ' ')
    .slice(0, 155)
    .trim();
}

function shiftHeaders(content) {
  const lines = content.split(/\r?\n/);
  let inCodeBlock = false;
  const processedLines = lines.map(line => {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      return line;
    }
    if (!inCodeBlock) {
      const match = line.match(/^(#+)\s+(.*)$/);
      if (match) {
        return '#' + match[1] + ' ' + match[2];
      }
    }
    return line;
  });
  return processedLines.join('\n');
}

function getIntroText(sourcePath, firstSectionLineIndex) {
  let content = fs.readFileSync(sourcePath, 'utf8').replace(/^\uFEFF/, '');
  const lines = content.split(/\r?\n/);
  const introLines = lines.slice(0, firstSectionLineIndex);
  
  let inToc = false;
  const cleanIntroLines = [];
  for (let line of introLines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## Table of Contents') || trimmed.startsWith('## TOC')) {
      inToc = true;
      continue;
    }
    if (inToc && (trimmed.startsWith('---') || trimmed.startsWith('#'))) {
      inToc = false;
    }
    if (!inToc) {
      cleanIntroLines.push(line);
    }
  }
  return cleanIntroLines.join('\n').trim();
}

function parseSections(sourcePath, phaseNum) {
  let content = fs.readFileSync(sourcePath, 'utf8').replace(/^\uFEFF/, '');
  const lines = content.split(/\r?\n/);
  let inCodeBlock = false;
  const sections = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (!inCodeBlock) {
      const match = line.match(/^#\s+(\d+)\.\s+(.+)$/);
      if (match) {
        sections.push({
          num: parseInt(match[1], 10),
          title: match[2].trim(),
          lineIndex: i,
          rawLine: line
        });
      }
    }
  }
  
  const results = [];
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const startLine = section.lineIndex;
    const endLine = i < sections.length - 1 ? sections[i + 1].lineIndex : lines.length;
    
    const sectionLines = lines.slice(startLine, endLine);
    const rawBody = sectionLines.join('\n').trim();
    const processedBody = shiftHeaders(rawBody);
    const description = firstParagraph(processedBody);
    const slug = getSlug(phaseNum, section.title);
    
    results.push({
      title: section.title,
      slug: slug,
      description: description || `Phase ${phaseNum} notes on ${section.title}`,
      content: processedBody,
      order: section.num
    });
  }
  
  const intro = getIntroText(sourcePath, sections.length > 0 ? sections[0].lineIndex : lines.length);
  return { intro, sections: results };
}

// Clean and recreate target directories
if (fs.existsSync(targetDir)) {
  fs.rmSync(targetDir, { recursive: true, force: true });
}
ensureDir(targetDir);

const phases = [
  {
    file: 'Angular-Phase-1-Fundamentals.md',
    num: 1,
    title: 'Phase 1: Fundamentals',
    dirName: 'phase-1'
  },
  {
    file: 'Angular-Phase-2-Components-Routing-Forms.md',
    num: 2,
    title: 'Phase 2: Components, Routing & Forms',
    dirName: 'phase-2'
  },
  {
    file: 'Angular-Phase-3-Advanced.md',
    num: 3,
    title: 'Phase 3: Advanced',
    dirName: 'phase-3'
  },
  {
    file: 'Angular-Phase-4-Enterprise-Angular.md',
    num: 4,
    title: 'Phase 4: Enterprise Angular',
    dirName: 'phase-4'
  }
];

console.log('Splitting Angular markdown files...');
const allPhasesData = [];

for (const phase of phases) {
  const sourcePath = path.join(sourceDir, phase.file);
  if (!fs.existsSync(sourcePath)) {
    console.error(`Source file not found: ${sourcePath}`);
    continue;
  }
  
  console.log(`Processing ${phase.file}...`);
  const phaseTargetDir = path.join(targetDir, phase.dirName);
  ensureDir(phaseTargetDir);
  
  const { intro, sections } = parseSections(sourcePath, phase.num);
  allPhasesData.push({ phase, intro, sections });
  
  for (const section of sections) {
    const finalContent = `---
title: ${yamlQuote(section.order + '. ' + section.title)}
description: ${yamlQuote(section.description)}
sidebar:
  order: ${section.order}
---

${section.content}
`;
    
    const targetFilePath = path.join(phaseTargetDir, `${section.slug}.md`);
    fs.writeFileSync(targetFilePath, finalContent, 'utf8');
  }
}

// Generate the index.md for the landing page
let indexContent = `---
title: "Angular Complete Guide"
description: "Structured Angular documentation covering fundamentals, components, routing, forms, advanced reactivity, state management, and enterprise architecture."
---

# Angular Complete Guide

Welcome to the comprehensive, topic-wise Angular study and reference notes. This documentation is organized into four main phases, going from absolute basics to advanced enterprise-level patterns.

`;

for (const phaseData of allPhasesData) {
  indexContent += `## ${phaseData.phase.title}\n\n`;
  
  // Clean up the intro text by removing main title H1
  let cleanIntro = phaseData.intro
    .replace(/^#\s+.*$/m, '') // Remove top level H1 title
    .trim();
  
  if (cleanIntro) {
    indexContent += `${cleanIntro}\n\n`;
  }
  
  indexContent += `### Topics in this Phase:\n\n`;
  for (const section of phaseData.sections) {
    indexContent += `- [${section.order}. ${section.title}](/DSA-Notes-Problems/angular/${phaseData.phase.dirName}/${section.slug})\n`;
  }
  indexContent += `\n---\n\n`;
}

fs.writeFileSync(path.join(targetDir, 'index.md'), indexContent, 'utf8');
console.log('Angular files split successfully!');
