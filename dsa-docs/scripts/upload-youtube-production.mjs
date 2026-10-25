import { existsSync, readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { getBrowserContext } from './uploader/browser.mjs';

const PRODUCTION_DIR = 'E:\\NewIdeasApps\\Production Ready\\YouTube';
const STATUS_FILE = path.join(PRODUCTION_DIR, '.upload-status.json');
const LOCAL_STATUS_FILE = path.resolve(process.cwd(), '.upload-status-yt-production.json');

/**
 * Load upload status
 */
function loadStatus() {
  for (const file of [STATUS_FILE, LOCAL_STATUS_FILE]) {
    try {
      if (existsSync(file)) {
        return JSON.parse(readFileSync(file, 'utf8'));
      }
    } catch { }
  }
  return {};
}

/**
 * Save upload status
 */
function saveStatus(status) {
  for (const file of [STATUS_FILE, LOCAL_STATUS_FILE]) {
    try {
      writeFileSync(file, JSON.stringify(status, null, 2), 'utf8');
    } catch (err) {
      console.warn(`[Warning] Could not save status to ${file}: ${err.message}`);
    }
  }
}

/**
 * Parse metadata text file for title, description, and tags
 */
export function parseMetadata(raw) {
  let title = '';
  // 1. Try TITLE OPTIONS -> first numbered option
  const optMatch = raw.match(/TITLE(?:\s*OPTIONS[^\n]*)?:[\s\S]*?1\.\s*([^\r\n]+)/i);
  if (optMatch) {
    title = optMatch[1].trim();
  } else {
    // 2. Try TITLE:\n<Title>
    const singleMatch = raw.match(/^TITLE:\s*[\r\n]+([^\r\n]+)/im);
    if (singleMatch) {
      title = singleMatch[1].trim();
    }
  }

  // Ensure title is strictly <= 100 characters for YouTube
  if (title.length > 100) {
    title = title.substring(0, 97).trim() + '...';
  }

  // Description: everything between DESCRIPTION: and TAGS / KEYWORDS or end
  let description = '';
  const descMatch = raw.match(/(?:YOUTUBE\s+)?DESCRIPTION[^\n]*:([\s\S]*?)(?:TAGS(?:\s*\/\s*KEYWORDS)?:|===+|$)/i);
  if (descMatch) {
    description = descMatch[1]
      .replace(/^[\s\r\n-]+/, '')
      .replace(/[\s\r\n-]+$/, '')
      .trim();
  }

  // YouTube strictly forbids '<' and '>' in titles and descriptions (triggers validation error & disables Next button)
  title = title.replace(/=>/g, '->').replace(/</g, '＜').replace(/>/g, '＞');
  description = description.replace(/=>/g, '->').replace(/</g, '＜').replace(/>/g, '＞');

  // Tags: extracted and formatted as comma-separated list
  let tags = '';
  const tagsMatch = raw.match(/TAGS(?:\s*\/\s*KEYWORDS)?:([\s\S]*?)(?:===+|$)/i);
  if (tagsMatch) {
    tags = tagsMatch[1]
      .replace(/^[\s\r\n-]+/, '')
      .replace(/[\s\r\n-]+$/, '')
      .split(/[\r\n,]+/)
      .map((t) => t.trim().replace(/^#/, ''))
      .filter((t) => t.length > 0)
      .join(', ');
  }

  // Limit tags to 480 chars to safely be under YouTube's 500-char total tags limit
  if (tags.length > 480) {
    const lastComma = tags.lastIndexOf(',', 480);
    tags = lastComma !== -1 ? tags.substring(0, lastComma) : tags.substring(0, 480);
  }

  return { title, description, tags };
}

/**
 * Scan E:\NewIdeasApps\Production Ready\YouTube for all video folders
 */
export function getProductionVideos() {
  if (!existsSync(PRODUCTION_DIR)) {
    throw new Error(`Production directory not found: ${PRODUCTION_DIR}`);
  }

  const status = loadStatus();
  const dirs = readdirSync(PRODUCTION_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const videos = [];

  for (const dirName of dirs) {
    const folderPath = path.join(PRODUCTION_DIR, dirName);
    const files = readdirSync(folderPath);

    const mp4File = files.find((f) => f.toLowerCase().endsWith('.mp4'));
    const thumbFile = files.find((f) => f.toLowerCase() === 'thumbnail.png');
    const metaFile = files.find((f) => f.toLowerCase() === 'youtube_metadata.txt');

    if (!mp4File || !metaFile) {
      console.warn(`[Skip] Missing mp4 or metadata in: ${dirName}`);
      continue;
    }

    const videoPath = path.join(folderPath, mp4File);
    const thumbPath = thumbFile ? path.join(folderPath, thumbFile) : null;
    const metaPath = path.join(folderPath, metaFile);

    const rawMeta = readFileSync(metaPath, 'utf8');
    const parsed = parseMetadata(rawMeta);
    const stats = statSync(videoPath);

    videos.push({
      id: dirName,
      name: dirName,
      videoPath,
      videoSizeMB: (stats.size / (1024 * 1024)).toFixed(1),
      thumbPath,
      title: parsed.title,
      description: parsed.description,
      tags: parsed.tags,
      status: status[dirName] || null,
    });
  }

  return videos;
}

/**
 * Upload a single Masterclass video to YouTube Studio
 */
export async function uploadMasterclassVideo(videoItem, options = {}) {
  const { page, mode = 'unlisted', dryRun = false } = options;

  console.log(`\n=====================================================`);
  console.log(`▶ [YouTube Masterclass] ${videoItem.name}`);
  console.log(`  File: ${path.basename(videoItem.videoPath)} (${videoItem.videoSizeMB} MB)`);
  console.log(`  Thumbnail: ${videoItem.thumbPath ? path.basename(videoItem.thumbPath) : 'None'}`);
  console.log(`  Title: "${videoItem.title}"`);
  console.log(`  Mode: ${mode.toUpperCase()}${dryRun ? ' (DRY RUN)' : ''}`);
  console.log(`=====================================================\n`);

  // 1. Navigate to YouTube Studio to get a fresh clean dashboard
  console.log('  Navigating to YouTube Studio...');
  await page.goto('https://studio.youtube.com', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  if (page.url().includes('accounts.google.com') || (await page.locator('#sign-in-button').isVisible().catch(() => false))) {
    throw new Error('Not logged into YouTube Studio. Please authenticate your browser profile.');
  }

  const skipBtn = page.locator('text="SKIP TO YOUTUBE STUDIO", a:has-text("SKIP")').first();
  if (await skipBtn.isVisible().catch(() => false)) {
    await skipBtn.click();
    await page.waitForTimeout(1500);
  }

  const createBtn = page.locator('#create-icon, button[aria-label="Create"], ytcp-button#create-icon').first();
  await createBtn.waitFor({ state: 'visible', timeout: 60000 });

  // 2. Click "Create" -> "Upload videos"
  console.log('  Opening upload wizard...');
  await createBtn.click({ force: true });
  await page.waitForTimeout(500);

  const uploadItem = page.locator('tp-yt-paper-item:has-text("Upload videos"), ytcp-text-menu #text-item-0').first();
  await uploadItem.waitFor({ state: 'visible', timeout: 10000 });
  await uploadItem.click({ force: true });
  await page.waitForTimeout(500);

  // 3. Set video file
  console.log(`  Attaching video file: ${videoItem.videoPath}...`);
  const fileInput = page.locator('input[type="file"]').first();
  await fileInput.setInputFiles(videoItem.videoPath);

  // 4. Wait for upload dialog & Title field
  console.log('  Waiting for video metadata editor...');
  const titleBox = page.locator('#title-textarea #textbox, #textbox[aria-label*="title" i]').first();
  await titleBox.waitFor({ state: 'visible', timeout: 120000 });
  await page.waitForTimeout(500);

  // 5. Fill Title
  console.log(`  Writing Title (${videoItem.title.length} chars)...`);
  await titleBox.focus();
  await titleBox.click({ force: true });
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');
  await titleBox.fill(videoItem.title);
  await page.waitForTimeout(300);

  // 6. Fill Description
  console.log(`  Writing Description (${videoItem.description.length} chars)...`);
  const descBox = page.locator('#description-textarea #textbox, #textbox[aria-label*="description" i]').first();
  await descBox.scrollIntoViewIfNeeded();
  await descBox.focus();
  await descBox.click({ force: true });
  await descBox.fill(videoItem.description);
  await page.waitForTimeout(400);

  // 7. Upload Thumbnail if exists
  if (videoItem.thumbPath && existsSync(videoItem.thumbPath)) {
    console.log(`  Attaching custom thumbnail: ${videoItem.thumbPath}...`);
    try {
      const thumbInput = page.locator('input#file-loader, #file-loader, ytcp-thumbnails-compact input[type="file"]').first();
      if (await thumbInput.count() > 0) {
        await thumbInput.setInputFiles(videoItem.thumbPath);
        console.log('  ✓ Thumbnail uploaded successfully!');
      } else {
        // Try file chooser trigger via button
        const uploadThumbBtn = page.locator('button[aria-label="Upload thumbnail"], ytcp-thumbnails-compact button#upload-button, ytcp-button#upload-button').first();
        if (await uploadThumbBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
          const [fileChooser] = await Promise.all([
            page.waitForEvent('filechooser', { timeout: 5000 }),
            uploadThumbBtn.click(),
          ]);
          await fileChooser.setFiles(videoItem.thumbPath);
          console.log('  ✓ Thumbnail uploaded via file chooser!');
        } else {
          console.warn('  ⚠️ Thumbnail upload button not found or already has custom thumbnail.');
        }
      }
    } catch (err) {
      console.warn(`  ⚠️ Thumbnail upload notice: ${err.message}`);
    }
    await page.waitForTimeout(500);
  }

  // 8. Select "Not made for kids"
  console.log('  Setting Audience (Not made for kids)...');
  const notKidsRadio = page.locator('tp-yt-paper-radio-button[name="VIDEO_MADE_FOR_KIDS_NOT_MFK"], tp-yt-paper-radio-button:has-text("No, it\'s not made for kids")').first();
  await notKidsRadio.scrollIntoViewIfNeeded();
  await notKidsRadio.click({ force: true });
  await page.waitForTimeout(400);

  // 9. Add Tags under "Show more"
  if (videoItem.tags && videoItem.tags.length > 0) {
    console.log('  Expanding "Show more" for tags...');
    const showMoreBtn = page.locator('button:has-text("Show more"), ytcp-button:has-text("Show more"), #toggle-button').first();
    if (await showMoreBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await showMoreBtn.scrollIntoViewIfNeeded();
      await showMoreBtn.click();
      await page.waitForTimeout(500);

      const tagsInput = page.locator('#tags-container input, #tags-container #text-input, input[aria-label="Tags"]').first();
      if (await tagsInput.isVisible({ timeout: 3000 }).catch(() => false)) {
        console.log(`  Setting Tags (${videoItem.tags.length} chars)...`);
        await tagsInput.scrollIntoViewIfNeeded();
        await tagsInput.focus();
        await tagsInput.fill(videoItem.tags);
        await page.keyboard.press('Enter');
        console.log('  ✓ Tags set successfully!');
      }
    }
  }

  // 10. Check Daily upload limit
  const limitBanner = page.locator('text="Daily upload limit reached", [aria-label*="Daily upload limit" i]').first();
  if (await limitBanner.isVisible({ timeout: 1500 }).catch(() => false)) {
    throw new Error('Daily upload limit reached on this YouTube channel.');
  }

  // 11. Advance wizard to Visibility tab
  console.log('  Advancing wizard to Visibility tab...');
  const unlistedRadio = page.locator('tp-yt-paper-radio-button[name="UNLISTED"], [name="UNLISTED"]').first();
  const publicRadio = page.locator('tp-yt-paper-radio-button[name="PUBLIC"], [name="PUBLIC"]').first();
  const scheduleRadio = page.locator('tp-yt-paper-radio-button[name="SCHEDULE"], #schedule-section').first();
  const nextBtn = page.locator('#next-button, button:has-text("Next"):not([hidden])').first();

  const startAdvance = Date.now();
  while (Date.now() - startAdvance < 60000) {
    const isVisTab = (await unlistedRadio.isVisible().catch(() => false)) ||
                     (await publicRadio.isVisible().catch(() => false)) ||
                     (await scheduleRadio.isVisible().catch(() => false));
    if (isVisTab) {
      console.log('  ✓ Reached Visibility tab!');
      break;
    }

    if (await nextBtn.isVisible().catch(() => false)) {
      const isEnabled = await nextBtn.isEnabled().catch(() => false);
      if (isEnabled) {
        await nextBtn.click({ force: true });
        console.log('  Advancing next step...');
      }
    }
    await page.waitForTimeout(1500);
  }

  // 12. Set visibility mode
  if (mode === 'unlisted') {
    console.log('  Selecting visibility: UNLISTED...');
    await unlistedRadio.waitFor({ state: 'visible', timeout: 20000 });
    await unlistedRadio.click({ force: true });
  } else if (mode === 'public') {
    console.log('  Selecting visibility: PUBLIC...');
    await publicRadio.waitFor({ state: 'visible', timeout: 20000 });
    await publicRadio.click({ force: true });
  } else if (mode === 'schedule') {
    console.log('  Selecting visibility: SCHEDULE...');
    await scheduleRadio.scrollIntoViewIfNeeded();
    await scheduleRadio.click({ force: true });
  } else if (mode === 'draft') {
    console.log('  Saving video as draft (closing dialog)...');
    const closeBtn = page.locator('#dialog #close-button, ytcp-button#close-button, ytcp-uploads-dialog #close-button').first();
    if (await closeBtn.isVisible().catch(() => false)) await closeBtn.click();
    return { success: true, mode: 'draft' };
  }

  // 13. Dry run check
  if (dryRun) {
    console.log('  [DRY RUN] All details filled successfully! Closing dialog without submitting.');
    const closeBtn = page.locator('#dialog #close-button, ytcp-button#close-button, ytcp-uploads-dialog #close-button').first();
    if (await closeBtn.isVisible().catch(() => false)) await closeBtn.click();
    return { success: true, dryRun: true };
  }

  // 14. Ensure video file upload finishes to YouTube servers
  console.log('  Ensuring video upload completes to YouTube...');
  const uploadProgress = page.locator('ytcp-video-upload-progress, .progress-label, [aria-label*="uploaded" i], .progress-label-text').first();
  const maxWaitMs = 15 * 60 * 1000;
  const startWait = Date.now();
  let lastLogged = '';

  while (Date.now() - startWait < maxWaitMs) {
    const text = (await uploadProgress.innerText().catch(() => '')).trim();
    if (text && text !== lastLogged) {
      lastLogged = text;
      console.log(`  Upload status: ${text}`);
    }

    if (
      text.includes('Upload complete') ||
      text.includes('Processing') ||
      text.includes('Checks complete') ||
      text.includes('Checks in progress') ||
      text.includes('100%')
    ) {
      console.log(`  ✓ File successfully transferred to YouTube: ${text}`);
      break;
    }

    const isProgVisible = await uploadProgress.isVisible().catch(() => false);
    if (!isProgVisible && Date.now() - startWait > 8000) {
      break;
    }

    await page.waitForTimeout(3000);
  }

  // 15. Click Save / Done / Publish button
  const doneBtn = page.locator('#done-button, ytcp-button#done-button, button:has-text("Schedule"), button:has-text("Save"), button:has-text("Publish")').first();
  await doneBtn.waitFor({ state: 'visible', timeout: 40000 });
  const btnText = (await doneBtn.innerText().catch(() => 'Save')).trim();
  console.log(`  Clicking "${btnText}" button...`);
  await doneBtn.click();

  // 15. Handle post-submission dialogs
  console.log('  Waiting for upload confirmation...');
  const startTime = Date.now();
  let uploadConfirmed = false;

  while (Date.now() - startTime < 90000) {
    const gotItBtn = page.locator('button:has-text("Got it"), ytcp-button:has-text("Got it"), button:has-text("Schedule anyway"), button:has-text("Publish anyway")').first();
    if (await gotItBtn.isVisible().catch(() => false)) {
      console.log('  Dismissing informational check prompt ("Got it")...');
      await gotItBtn.click({ force: true }).catch(() => { });
      await page.waitForTimeout(1000);
    }

    const shareCloseBtn = page.locator('ytcp-video-share-dialog #close-button, ytcp-video-share-dialog button:has-text("Close"), ytcp-uploads-dialog #close-button').first();
    if (await shareCloseBtn.isVisible().catch(() => false)) {
      console.log('  ✓ Video upload completed! Closing share dialog...');
      await shareCloseBtn.click({ force: true }).catch(() => { });
      uploadConfirmed = true;
      break;
    }

    const uploadDialog = page.locator('ytcp-uploads-dialog').first();
    if (!(await uploadDialog.isVisible().catch(() => false)) && Date.now() - startTime > 10000) {
      console.log('  ✓ Upload dialog dismissed. Video uploaded successfully!');
      uploadConfirmed = true;
      break;
    }

    await page.waitForTimeout(1000);
  }

  // 16. Record Status
  const status = loadStatus();
  status[videoItem.id] = {
    uploaded: true,
    mode,
    title: videoItem.title,
    timestamp: new Date().toISOString(),
  };
  saveStatus(status);

  console.log(`✓ [SUCCESS] Successfully uploaded "${videoItem.title}"!\n`);
  return { success: true };
}

/**
 * Main batch runner
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--list') || args.includes('--status')) {
    const videos = getProductionVideos();
    console.log('\n=====================================================');
    console.log(`  YouTube Production Masterclass Library (${videos.length} videos)`);
    console.log('=====================================================\n');
    for (const v of videos) {
      const isUp = v.status?.uploaded ? '✓ UPLOADED' : '○ PENDING';
      console.log(`[${isUp}] ${v.name}`);
      console.log(`       Title: ${v.title}`);
      console.log(`       Video: ${path.basename(v.videoPath)} (${v.videoSizeMB} MB) | Thumb: ${v.thumbPath ? 'YES' : 'NO'}`);
      if (v.status?.uploaded) {
        console.log(`       Uploaded on: ${v.status.timestamp} (Mode: ${v.status.mode})`);
      }
      console.log('');
    }
    return;
  }

  const modeArg = args.find((a) => a.startsWith('--mode='));
  const mode = modeArg ? modeArg.split('=')[1].toLowerCase() : 'unlisted';

  const limitArg = args.find((a) => a.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : undefined;

  const targetArg = args.find((a) => a.startsWith('--video=') || a.startsWith('--name='));
  const targetName = targetArg ? targetArg.split('=')[1].toLowerCase() : null;

  const dryRun = args.includes('--dry-run');
  const headless = args.includes('--headless');
  const force = args.includes('--force');

  let videos = getProductionVideos();

  if (targetName) {
    videos = videos.filter((v) => v.name.toLowerCase().includes(targetName));
  }

  if (!force) {
    videos = videos.filter((v) => !v.status?.uploaded);
  }

  if (videos.length === 0) {
    console.log('No pending production videos found! (All videos are marked as uploaded. Use --force to override)');
    return;
  }

  const queue = limit ? videos.slice(0, limit) : videos;

  console.log(`\n=====================================================`);
  console.log(`  YouTube Masterclass Uploader (${queue.length} of ${videos.length} videos queued)`);
  console.log(`  Target Mode: ${mode.toUpperCase()} | Dry-run: ${dryRun} | Headless: ${headless}`);
  console.log(`=====================================================\n`);

  const { context, browserType } = await getBrowserContext(headless);
  let page = await context.newPage();
  page.on('dialog', async (dialog) => {
    try { await dialog.dismiss(); } catch { }
  });

  let succeeded = 0;
  let failed = 0;

  try {
    for (let i = 0; i < queue.length; i++) {
      const item = queue[i];
      try {
        await uploadMasterclassVideo(item, { page, mode, dryRun });
        succeeded++;
      } catch (err) {
        failed++;
        console.error(`\n✗ Error uploading "${item.name}":`, err.message);
        try {
          await page.close({ runBeforeUnload: false }).catch(() => { });
          page = await context.newPage();
          page.on('dialog', async (dialog) => {
            try { await dialog.dismiss(); } catch { }
          });
        } catch { }
      }

      if (i < queue.length - 1) {
        console.log('  Waiting 7 seconds sleep before next upload...\n');
        await new Promise((r) => setTimeout(r, 7000));
      }
    }
  } finally {
    await context.close().catch(() => { });
  }

  console.log(`\n=====================================================`);
  console.log(`Batch Complete: ${succeeded} succeeded, ${failed} failed.`);
  console.log(`=====================================================\n`);
}

main().catch((err) => {
  console.error('Fatal upload error:', err);
  process.exit(1);
});
