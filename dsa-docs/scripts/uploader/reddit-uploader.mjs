import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { CONFIG } from './config.mjs';
import { getBrowserContext } from './browser.mjs';
import { REDDIT_POSTS, getRedditPost } from './reddit-posts.mjs';

const REDDIT_STATUS_FILE = path.join(CONFIG.reelsOut, '.reddit-status.json');

/**
 * Load Reddit post history
 */
export function loadRedditStatus() {
  try {
    if (existsSync(REDDIT_STATUS_FILE)) {
      return JSON.parse(readFileSync(REDDIT_STATUS_FILE, 'utf8'));
    }
  } catch { /* ignore corrupted status */ }
  return {};
}

/**
 * Save Reddit post history
 */
export function saveRedditStatus(status) {
  try {
    writeFileSync(REDDIT_STATUS_FILE, JSON.stringify(status, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to save Reddit status:', err.message);
  }
}

/**
 * Display Reddit outreach dashboard
 */
export function showRedditDashboard() {
  const status = loadRedditStatus();
  console.log('\n=====================================================');
  console.log('  Reddit Community Outreach Dashboard');
  console.log('=====================================================');
  console.log(`Target Subreddits: ${REDDIT_POSTS.length}\n`);

  for (const post of REDDIT_POSTS) {
    const info = status[post.sub];
    const icon = info?.posted ? '✓ POSTED' : '⏳ PENDING';
    console.log(`r/${post.sub.padEnd(20)} [${icon}]`);
    console.log(`   Title : ${post.title.slice(0, 75)}...`);
    if (info?.url) {
      console.log(`   URL   : ${info.url}`);
    }
    console.log('');
  }
}

/**
 * Upload a single post to Reddit
 */
export async function uploadToReddit(post, options = {}) {
  const { page, dryRun = false } = options;

  console.log(`\n▶ [Reddit] Preparing submission for r/${post.sub}`);
  console.log(`  Title: ${post.title}`);
  if (dryRun) console.log('  [DRY RUN - will not click final Post]');

  const submitUrl = `https://www.reddit.com/r/${post.sub}/submit`;
  await page.goto(submitUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // Check login
  const isLoginPage = page.url().includes('/login') || page.url().includes('account/login');
  const hasLoginBtn = await page.locator('a[href*="/login"], button:has-text("Log In")').first().isVisible({ timeout: 2000 }).catch(() => false);
  if (isLoginPage || hasLoginBtn) {
    throw new Error('Not logged into Reddit. Run `npm run upload:reddit:login` first to sign into Reddit in your browser profile.');
  }

  // Handle cookie banner or age prompts if any
  const cookieAccept = page.locator('button:has-text("Accept all"), button:has-text("Allow all"), button:has-text("I Agree")').first();
  if (await cookieAccept.isVisible({ timeout: 2000 }).catch(() => false)) {
    await cookieAccept.click().catch(() => {});
    await page.waitForTimeout(500);
  }

  // Ensure "Post" or "Text" tab is active
  const textTab = page.locator('button:has-text("Post"), button:has-text("Text")').first();
  if (await textTab.isVisible({ timeout: 3000 }).catch(() => false)) {
    await textTab.click().catch(() => {});
    await page.waitForTimeout(500);
  }

  // Fill Title
  console.log('  Filling post title...');
  const titleInput = page.locator('textarea[name="title"], textarea[placeholder="Title"], input[placeholder="Title"]').first();
  await titleInput.waitFor({ state: 'visible', timeout: 15000 });
  await titleInput.click();
  await titleInput.fill(post.title);
  await page.waitForTimeout(1000);

  // Fill Body text (supports both Rich-Text / Lexical editor and Markdown mode)
  console.log('  Filling post body...');
  const mdBtn = page.locator('button:has-text("Switch to Markdown"), button:has-text("Markdown Mode")').first();
  if (await mdBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    console.log('  Switching to Markdown editor mode...');
    await mdBtn.click({ force: true });
    await page.waitForTimeout(1000);
  }

  const bodyInput = page.locator('div[slot="rte"][contenteditable="true"], div[contenteditable="true"]:visible, textarea[placeholder*="Body text" i], textarea[placeholder*="Text" i]').first();
  await bodyInput.waitFor({ state: 'visible', timeout: 15000 });
  await bodyInput.click({ force: true });
  await page.keyboard.insertText(post.body);
  await page.waitForTimeout(1500);

  // Handle Post Flair (required by subreddits like r/developersIndia)
  const flairBtn = page.locator('button:has-text("Add flair and tags"), button:has-text("Add flair"), button:has-text("Flair")').first();
  if (await flairBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    console.log(`  Selecting flair for r/${post.sub}...`);
    await flairBtn.click();
    await page.waitForTimeout(1500);

    const targetFlair = post.flair || 'Resource';
    await page.evaluate((flair) => {
      const modal = document.querySelector('r-post-flairs-modal') || document;
      function queryDeep(root, selector) {
        let results = Array.from(root.querySelectorAll(selector));
        const children = root.querySelectorAll('*');
        for (const child of children) {
          if (child.shadowRoot) results = results.concat(queryDeep(child.shadowRoot, selector));
        }
        return results;
      }
      const radios = queryDeep(modal.shadowRoot || modal, 'faceplate-radio-input, [role="radio"], label');
      const match = radios.find(r => r.textContent?.trim().toLowerCase().includes(flair.toLowerCase())) ||
                    radios.find(r => r.textContent?.trim().toLowerCase().includes('resource')) ||
                    radios.find(r => r.textContent?.trim().toLowerCase().includes('project')) ||
                    radios.find(r => r.textContent?.trim().toLowerCase().includes('i made this'));
      if (match) match.click();

      const addBtn = queryDeep(modal.shadowRoot || modal, 'button').find(b => b.textContent?.trim() === 'Add' || b.textContent?.trim() === 'Apply');
      if (addBtn) addBtn.click();
    }, targetFlair);
    await page.waitForTimeout(1500);
  }

  // Dry run: screenshot and exit
  if (dryRun) {
    const previewFile = path.join(CONFIG.reelsOut, `reddit-${post.sub}-preview.png`);
    await page.screenshot({ path: previewFile });
    console.log(`  [DRY RUN] Preview saved to ${previewFile}`);
    console.log(`✓ [Reddit] Dry run passed successfully for r/${post.sub}!`);
    return { success: true, dryRun: true, previewFile };
  }

  // Listen for navigation events to capture post ID immediately even during quick redirects
  let detectedUrl = null;
  const onNav = (frame) => {
    try {
      if (frame === page.mainFrame()) {
        const url = frame.url();
        const createdMatch = url.match(/created=t3_([a-zA-Z0-9]+)/);
        const commentMatch = url.match(/\/comments\/([a-zA-Z0-9]+)/);
        if (createdMatch && !detectedUrl) {
          detectedUrl = `https://www.reddit.com/r/${post.sub}/comments/${createdMatch[1]}/`;
        } else if (commentMatch && !detectedUrl) {
          detectedUrl = url;
        }
      }
    } catch {}
  };
  page.on('framenavigated', onNav);

  // Live submission
  console.log('  Submitting post to Reddit...');
  const submitBtn = page.locator('button:has-text("Post"):not([disabled])').first();
  await submitBtn.waitFor({ state: 'visible', timeout: 10000 });
  await submitBtn.click({ force: true });

  // Wait for post confirmation (either detected via redirect, comments URL, or appearing in feed)
  console.log('  Waiting for live post confirmation...');
  let liveUrl = null;
  const startTime = Date.now();

  while (Date.now() - startTime < 35000) {
    if (detectedUrl) {
      liveUrl = detectedUrl;
      break;
    }

    const currentUrl = page.url();
    const createdMatch = currentUrl.match(/created=t3_([a-zA-Z0-9]+)/);
    const commentMatch = currentUrl.match(/\/comments\/([a-zA-Z0-9]+)/);

    if (commentMatch) {
      liveUrl = currentUrl;
      break;
    } else if (createdMatch) {
      liveUrl = `https://www.reddit.com/r/${post.sub}/comments/${createdMatch[1]}/`;
      break;
    }

    // Check if the post link appears on the redirected page / feed
    const postLink = page.locator(`a[href*="/comments/"]`).filter({ hasText: post.title.slice(0, 25) }).first();
    if (await postLink.isVisible().catch(() => false)) {
      const href = await postLink.getAttribute('href').catch(() => null);
      if (href) {
        liveUrl = href.startsWith('http') ? href : `https://www.reddit.com${href}`;
        break;
      }
    }

    await page.waitForTimeout(1000);
  }

  page.off('framenavigated', onNav);

  if (!liveUrl) {
    // If not detected via URL or feed, check if the current page URL has changed away from submit
    const currentUrl = page.url();
    if (!currentUrl.includes('/submit')) {
      liveUrl = currentUrl;
    } else {
      throw new Error(`Timeout waiting for live post confirmation. Current URL: ${currentUrl}`);
    }
  }

  // Save status
  const status = loadRedditStatus();
  status[post.sub] = {
    posted: true,
    title: post.title,
    url: liveUrl,
    timestamp: new Date().toISOString(),
  };
  saveRedditStatus(status);

  console.log(`✓ [Reddit] Successfully posted to r/${post.sub}!`);
  console.log(`  Live URL: ${liveUrl}`);
  return { success: true, url: liveUrl };
}

/**
 * Batch runner for Reddit posts
 */
export async function runRedditBatch(posts, options = {}) {
  const { dryRun = false, headless = false, sub = null, force = false } = options;
  const status = loadRedditStatus();

  let toPost = posts;
  if (sub) {
    const specific = getRedditPost(sub);
    if (!specific) {
      console.error(`Subreddit "${sub}" not found in templates. Available: ${REDDIT_POSTS.map((p) => p.sub).join(', ')}`);
      return;
    }
    toPost = [specific];
  } else if (!force) {
    toPost = toPost.filter((p) => !status[p.sub]?.posted);
  }

  if (toPost.length === 0) {
    console.log('All targeted subreddits have already been posted! Check `npm run upload:reddit:status` or use `--force`.');
    return;
  }

  console.log('\n=====================================================');
  console.log(`  Reddit Outreach Automation (${toPost.length} subreddits queued)`);
  console.log(`  Dry Run: ${dryRun}`);
  console.log('=====================================================\n');

  const { context } = await getBrowserContext(headless);
  const page = await context.newPage();

  let success = 0;
  let failed = 0;

  try {
    for (let i = 0; i < toPost.length; i++) {
      const post = toPost[i];
      try {
        await uploadToReddit(post, { page, dryRun });
        success++;

        // Reddit safety: enforce cooldown between submissions
        if (i < toPost.length - 1 && !dryRun) {
          console.log('\n⏳ Cooldown: Waiting 3 minutes between Reddit submissions for account safety...');
          await page.waitForTimeout(180000);
        }
      } catch (err) {
        failed++;
        console.error(`  ✗ Failed r/${post.sub}:`, err.message);
      }
    }
  } finally {
    await context.close();
  }

  console.log('\n-----------------------------------------------------');
  console.log(`Finished: ${success} succeeded, ${failed} failed.`);
  console.log('-----------------------------------------------------\n');
}
