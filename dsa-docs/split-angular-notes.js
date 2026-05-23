import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const sourceDir   = path.resolve(projectRoot, '..', 'AllDocs', 'Angular');
const targetDir   = path.join(projectRoot, 'src', 'content', 'docs', 'angular');
const svgDir      = path.join(projectRoot, 'public', 'assets', 'angular');

// ─── Helpers ────────────────────────────────────────────────────────────────

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
    .replace(/^-+|-+$/g, '')
    .trim();
}

function yamlQuote(value) {
  return JSON.stringify(String(value).replace(/\r?\n/g, ' ').trim());
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

// ─── SVG title extractor ─────────────────────────────────────────────────────
// Picks the first <text> element that has meaningful content (length > 8, not
// purely numeric, not a single emoji / symbol).
function extractSvgTitle(svgContent) {
  const matches = [...svgContent.matchAll(/<text[^>]*>([^<]+)<\/text>/g)];
  for (const m of matches) {
    const txt = m[1].trim().replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    if (txt.length > 8 && !/^\d+$/.test(txt) && !/^[^\w]+$/.test(txt)) {
      return txt;
    }
  }
  return null;
}

// ─── SVG extraction + replacement ───────────────────────────────────────────
// Finds all ```svg … ``` fenced blocks in `content`, saves each as an SVG
// file under public/assets/angular/, and replaces the code block with an
// ![title](path) image reference.
function extractAndReplaceSvgs(content, phaseNum) {
  let counter = 0;
  // Regex: ```svg  (newline)  <anything>  ``` — non-greedy, multiline
  return content.replace(/```svg\r?\n([\s\S]*?)```/g, (match, svgBody) => {
    counter++;
    const title =
      extractSvgTitle(svgBody) ||
      `Angular Phase ${phaseNum} Diagram ${counter}`;
    const slug     = toSlug(title).slice(0, 55);
    const filename = `phase-${phaseNum}-${counter}-${slug}.svg`;
    const svgPath  = path.join(svgDir, filename);

    // Write the raw SVG content (without the fenced-code wrapper)
    fs.writeFileSync(svgPath, svgBody.trim(), 'utf8');

    const imgPath = `/DSA-Notes-Problems/assets/angular/${filename}`;
    return `![${title}](${imgPath})`;
  });
}

// ─── Header level downshift ──────────────────────────────────────────────────
// Shifts every heading down one level (# → ##, ## → ###, etc.) so that
// section headings sit below Starlight's auto-generated H1 title.
// Skips lines inside fenced code blocks.
function shiftHeaders(content) {
  const lines = content.split(/\r?\n/);
  let inCode = false;
  return lines
    .map((line) => {
      if (/^\s*```/.test(line)) { inCode = !inCode; return line; }
      if (!inCode) {
        const m = line.match(/^(#+)(\s+.*)$/);
        if (m) return '#' + m[1] + m[2];
      }
      return line;
    })
    .join('\n');
}

// ─── Section parser ──────────────────────────────────────────────────────────
// Splits a source file at every top-level "# N. Title" heading.
function parseSections(sourceContent, phaseNum) {
  const lines = sourceContent.split(/\r?\n/);
  let inCode = false;
  const sectionStarts = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*```/.test(line)) { inCode = !inCode; continue; }
    if (!inCode) {
      const m = line.match(/^#\s+(\d+)\.\s+(.+)$/);
      if (m) sectionStarts.push({ num: parseInt(m[1], 10), title: m[2].trim(), lineIdx: i });
    }
  }

  return sectionStarts.map((sec, i) => {
    const startLine = sec.lineIdx;
    const endLine   = i < sectionStarts.length - 1 ? sectionStarts[i + 1].lineIdx : lines.length;
    const rawBody   = lines.slice(startLine, endLine).join('\n').trim();
    return {
      num:   sec.num,
      title: sec.title,
      body:  rawBody,
    };
  });
}

// ─── Build a clean intro block (before first numbered section) ───────────────
function buildIntro(sourceContent, firstSectionLine) {
  const lines = sourceContent.split(/\r?\n/).slice(0, firstSectionLine);
  let inToc = false;
  const kept = [];
  for (const line of lines) {
    const t = line.trim();
    if (/^##\s+Table of Contents/i.test(t) || /^##\s+TOC/i.test(t)) { inToc = true; continue; }
    if (inToc && (/^---/.test(t) || /^#/.test(t))) inToc = false;
    if (!inToc) kept.push(line);
  }
  return kept.join('\n').trim();
}

// ─── Main ─────────────────────────────────────────────────────────────────────

// Clean / recreate SVG assets dir
ensureDir(svgDir);

// Clean / recreate doc target dir
if (fs.existsSync(targetDir)) fs.rmSync(targetDir, { recursive: true, force: true });
ensureDir(targetDir);

const phases = [
  { file: 'Angular-Phase-1-Fundamentals.md',              num: 1, title: 'Phase 1: Fundamentals',                dirName: 'phase-1' },
  { file: 'Angular-Phase-2-Components-Routing-Forms.md',  num: 2, title: 'Phase 2: Components, Routing & Forms', dirName: 'phase-2' },
  { file: 'Angular-Phase-3-Advanced.md',                  num: 3, title: 'Phase 3: Advanced',                    dirName: 'phase-3' },
  { file: 'Angular-Phase-4-Enterprise-Angular.md',        num: 4, title: 'Phase 4: Enterprise Angular',          dirName: 'phase-4' },
];

console.log('Splitting Angular markdown files...\n');
const allPhasesData = [];

for (const phase of phases) {
  const sourcePath = path.join(sourceDir, phase.file);
  if (!fs.existsSync(sourcePath)) {
    console.error(`  [SKIP] Source file not found: ${sourcePath}`);
    continue;
  }

  console.log(`Processing ${phase.file}...`);
  const phaseTargetDir = path.join(targetDir, phase.dirName);
  ensureDir(phaseTargetDir);

  // 1. Read source
  let raw = fs.readFileSync(sourcePath, 'utf8').replace(/^\uFEFF/, '');

  // 2. Extract SVG blocks → save .svg files → replace with img tags
  raw = extractAndReplaceSvgs(raw, phase.num);

  // 3. Parse numbered sections
  const sections = parseSections(raw, phase.num);

  // 4. Build intro (text before first section)
  const lines = raw.split(/\r?\n/);
  let inCode = false;
  let firstSectionLine = lines.length;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*```/.test(lines[i])) { inCode = !inCode; continue; }
    if (!inCode && /^#\s+\d+\.\s+/.test(lines[i])) { firstSectionLine = i; break; }
  }
  const intro = buildIntro(raw, firstSectionLine);

  allPhasesData.push({ phase, intro, sections });

  // 5. Write per-section markdown files
  let svgCount = 0;
  for (const sec of sections) {
    const processedBody = shiftHeaders(sec.body);
    const description   = firstParagraph(processedBody);
    const cleanTitle    = sec.title.replace(/^\d+(\.\d+)*\s+/, '');
    const slug          = `phase-${phase.num}-${toSlug(cleanTitle)}`;

    const fileContent = `---
title: ${yamlQuote(sec.num + '. ' + sec.title)}
description: ${yamlQuote(description || 'Phase ' + phase.num + ' notes on ' + sec.title)}
sidebar:
  order: ${sec.num}
---

${processedBody}
`;
    fs.writeFileSync(path.join(phaseTargetDir, `${slug}.md`), fileContent, 'utf8');
    // Count img references in this section to track SVGs used
    svgCount += (processedBody.match(/!\[.*?\]\(\/DSA-Notes-Problems\/assets\/angular\//g) || []).length;
  }

  console.log(`  → ${sections.length} topic files, ${svgCount} SVG image(s) embedded`);
}

// 6. Generate index.md
let indexContent = `---
title: "Angular Complete Guide"
description: "Structured Angular documentation covering fundamentals, components, routing, forms, advanced reactivity, state management, and enterprise architecture."
---

# Angular Complete Guide

Welcome to the comprehensive, topic-wise Angular study and reference notes. Organized into four phases from beginner to enterprise level.

`;

for (const { phase, intro, sections } of allPhasesData) {
  indexContent += `## ${phase.title}\n\n`;
  const cleanIntro = intro.replace(/^#\s+.*$/m, '').trim();
  if (cleanIntro) indexContent += `${cleanIntro}\n\n`;
  indexContent += `### Topics:\n\n`;
  for (const sec of sections) {
    const cleanTitle = sec.title.replace(/^\d+(\.\d+)*\s+/, '');
    const slug = `phase-${phase.num}-${toSlug(cleanTitle)}`;
    indexContent += `- [${sec.num}. ${sec.title}](/DSA-Notes-Problems/angular/${phase.dirName}/${slug})\n`;
  }
  indexContent += `\n---\n\n`;
}

fs.writeFileSync(path.join(targetDir, 'index.md'), indexContent, 'utf8');
console.log('\nDone! index.md written.');

// 7. Summary
const svgFiles = fs.readdirSync(svgDir);
console.log(`\n✓ ${svgFiles.length} SVG files saved → public/assets/angular/`);
svgFiles.forEach(f => console.log(`  ${f}`));
