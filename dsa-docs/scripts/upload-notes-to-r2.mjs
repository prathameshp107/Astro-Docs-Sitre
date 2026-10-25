/**
 * Cloudflare R2 Upload Script for 76 Engineering Notes & Handbooks
 * 
 * S3-compatible automated uploader from E:\Coding_Notes\PDFs to Cloudflare R2.
 * 
 * Usage:
 *   node scripts/upload-notes-to-r2.mjs --bucket=interview-notes
 *   Or with dry-run:
 *   node scripts/upload-notes-to-r2.mjs --dry-run
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const baseDir = 'E:/Coding_Notes/PDFs';

const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const bucketArg = args.find(a => a.startsWith('--bucket='))?.split('=')[1] || process.env.R2_BUCKET || 'interview-prep-notes';

console.log('╔═══════════════════════════════════════════════════════════╗');
console.log('║   Cloudflare R2 Uploader: 76 Engineering Notes & PDFs     ║');
console.log('╚═══════════════════════════════════════════════════════════╝');
console.log(`📁 Source directory: ${baseDir}`);
console.log(`🪣 Target R2 Bucket: ${bucketArg}`);
console.log(`⚡ Mode: ${isDryRun ? 'DRY-RUN (Simulated)' : 'LIVE UPLOAD'}\n`);

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
      const rel = path.relative(baseDir, full).replace(/\\/g, '/');
      results.push({
        fullPath: full,
        relPath: rel,
        fileName: file,
        sizeMB: (stat.size / (1024 * 1024)).toFixed(2)
      });
    }
  }
  return results;
}

const files = scan(baseDir);
console.log(`📊 Found ${files.length} PDFs totaling ${(files.reduce((acc, f) => acc + parseFloat(f.sizeMB), 0) / 1024).toFixed(2)} GB.\n`);

let uploaded = 0;
let failed = 0;

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const targetKey = file.relPath;
  console.log(`[${i + 1}/${files.length}] Uploading: ${file.fileName} (${file.sizeMB} MB)`);
  console.log(`   └─> r2://${bucketArg}/${targetKey}`);

  if (isDryRun) {
    uploaded++;
    continue;
  }

  try {
    // Wrangler r2 object put command
    const cmd = `npx wrangler r2 object put "${bucketArg}/${targetKey}" --file="${file.fullPath}" --content-type="application/pdf"`;
    execSync(cmd, { stdio: 'inherit' });
    uploaded++;
  } catch (err) {
    console.error(`   ❌ Failed to upload ${file.fileName}:`, err.message);
    failed++;
  }
}

console.log('\n═══════════════════════════════════════════════════════════');
console.log(`🎉 Finished: ${uploaded} uploaded, ${failed} failed.`);
console.log('\nNext steps:');
console.log('1. Go to Cloudflare Dashboard -> R2 -> Buckets -> ' + bucketArg);
console.log('2. Click Settings -> Public Development R2.dev URL -> Enable');
console.log('3. Copy your public URL (e.g. https://pub-xxxxxx.r2.dev)');
console.log('4. Add to dsa-docs/.env:');
console.log('   PUBLIC_PDF_HOST=https://pub-xxxxxx.r2.dev');
console.log('═══════════════════════════════════════════════════════════\n');
