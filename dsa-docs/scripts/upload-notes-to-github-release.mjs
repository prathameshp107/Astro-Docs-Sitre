/**
 * GitHub Releases Uploader for 76 Engineering Notes & Handbooks
 * 
 * Uses the local authenticated GitHub CLI (`gh`) to upload PDFs to a GitHub Release.
 * 100% Free, No Credit Card, 2 GB per file limit, Fastly Global CDN.
 * 
 * Usage:
 *   node scripts/upload-notes-to-github-release.mjs
 *   Or with dry run:
 *   node scripts/upload-notes-to-github-release.mjs --dry-run
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const baseDir = 'E:/Coding_Notes/PDFs';
const REPO = 'prathameshp107/Astro-Docs-Sitre';
const TAG = 'v1.0.0-study-notes';
const TITLE = 'Engineering Handbooks & Visual Study Notes (76 PDFs)';

const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');

console.log('╔═══════════════════════════════════════════════════════════╗');
console.log('║   GitHub Releases Uploader: 76 Engineering Notes & PDFs   ║');
console.log('╚═══════════════════════════════════════════════════════════╝');
console.log(`📁 Source directory : ${baseDir}`);
console.log(`📦 GitHub Repo      : ${REPO}`);
console.log(`🏷️  Release Tag      : ${TAG}`);
console.log(`⚡ Mode             : ${isDryRun ? 'DRY-RUN (Simulated)' : 'LIVE UPLOAD'}\n`);

if (!fs.existsSync(baseDir)) {
  console.error(`❌ Source directory "${baseDir}" does not exist on this machine.`);
  process.exit(1);
}

function scan(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(scan(full));
    } else if (file.endsWith('.pdf')) {
      results.push({
        fullPath: full,
        fileName: file,
        sizeBytes: stat.size,
        sizeMB: (stat.size / (1024 * 1024)).toFixed(2)
      });
    }
  }
  return results;
}

const files = scan(baseDir);
const totalMB = (files.reduce((acc, f) => acc + parseFloat(f.sizeMB), 0) / 1024).toFixed(2);
console.log(`📊 Found ${files.length} PDFs totaling ${totalMB} GB.\n`);

if (!isDryRun) {
  // Check if release exists, or create it
  try {
    console.log(`🔍 Checking if release "${TAG}" exists...`);
    execSync(`gh release view "${TAG}" --repo "${REPO}"`, { stdio: 'ignore' });
    console.log(`✓ Release "${TAG}" already exists.`);
  } catch {
    console.log(`📦 Creating new GitHub Release "${TAG}"...`);
    const notesText = "Curated collection of 76 high-yield engineering study guides, the complete 600-page DSA Master Handbook, System Design blueprints, LLM internals, and handwritten architecture case studies.";
    execSync(`gh release create "${TAG}" --title "${TITLE}" --notes "${notesText}" --repo "${REPO}"`, { stdio: 'inherit' });
    console.log(`✓ Created release "${TAG}".\n`);
  }
}

let uploaded = 0;
let failed = 0;

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  console.log(`[${i + 1}/${files.length}] Uploading: ${file.fileName} (${file.sizeMB} MB)`);

  if (isDryRun) {
    uploaded++;
    continue;
  }

  try {
    execSync(`gh release upload "${TAG}" "${file.fullPath}" --clobber --repo "${REPO}"`, { stdio: 'inherit' });
    uploaded++;
  } catch (err) {
    console.error(`   ❌ Failed to upload ${file.fileName}:`, err.message);
    failed++;
  }
}

console.log('\n═══════════════════════════════════════════════════════════');
console.log(`🎉 Finished: ${uploaded} uploaded, ${failed} failed.`);
console.log('\nRelease CDN Base URL:');
console.log(`https://github.com/${REPO}/releases/download/${TAG}`);
console.log('\nTo connect to the website:');
console.log(`Add to dsa-docs/.env:`);
console.log(`PUBLIC_PDF_HOST=https://github.com/${REPO}/releases/download/${TAG}`);
console.log('═══════════════════════════════════════════════════════════\n');
