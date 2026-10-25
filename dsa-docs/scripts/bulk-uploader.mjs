/**
 * Bulk Social Media Uploader & Scheduler
 *
 * Automates bulk uploading and scheduling of generated reels to YouTube Shorts
 * and Instagram Reels using Playwright and your genuine local browser.
 *
 * Usage:
 *   npm run upload:login                   # Log into YouTube and Instagram once
 *   npm run upload:status                  # Show upload & schedule status across all reels
 *   npm run upload:yt                      # Bulk schedule all reels to YouTube Shorts
 *   npm run upload:yt:test                 # Test upload 1 video as unlisted on YouTube
 *   npm run upload:ig                      # Bulk upload to Instagram
 *   npm run upload:ig:test                 # Test upload 1 video to Instagram (dry-run)
 *
 * Flags:
 *   --platform=youtube|instagram
 *   --mode=schedule|unlisted|public|draft (default: schedule)
 *   --topic=sorting                       # filter by topic
 *   --limit=2                             # upload first N matching reels
 *   --dry-run                             # simulate without clicking submit
 *   --headless                            # run in background without opening window
 */

import { loginFlow, loginReddit, loginInstagram } from './uploader/login.mjs';
import { showStatus } from './uploader/status.mjs';
import { getReelsManifest } from './uploader/manifest.mjs';
import { runYouTubeBatch } from './uploader/youtube-uploader.mjs';
import { runInstagramBatch, runInstagramScheduler } from './uploader/instagram-uploader.mjs';
import { REDDIT_POSTS } from './uploader/reddit-posts.mjs';
import { runRedditBatch, showRedditDashboard } from './uploader/reddit-uploader.mjs';
import { deleteDraftShorts } from './uploader/clean-drafts.mjs';

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--clean-drafts')) {
    const headless = args.includes('--headless');
    await deleteDraftShorts({ headless });
    return;
  }

  if (args.includes('--login')) {
    await loginFlow();
    return;
  }

  if (args.includes('--ig-login') || args.includes('--instagram-login')) {
    await loginInstagram();
    return;
  }

  if (args.includes('--reddit-login')) {
    await loginReddit();
    return;
  }

  if (args.includes('--reddit-status')) {
    showRedditDashboard();
    return;
  }

  if (args.includes('--status') || args.includes('--list')) {
    if (args.includes('--platform=reddit') || args.includes('reddit')) {
      showRedditDashboard();
    } else if (args.includes('--platform=youtube') || args.includes('--platform=yt') || args.includes('--yt') || args.includes('youtube')) {
      const { showYouTubeStatus } = await import('./uploader/status-yt.mjs');
      showYouTubeStatus();
    } else if (args.includes('--platform=instagram') || args.includes('--platform=ig') || args.includes('--ig') || args.includes('instagram')) {
      const { showInstagramStatus } = await import('./uploader/status-ig.mjs');
      showInstagramStatus();
    } else {
      showStatus();
    }
    return;
  }

  const platformArg = args.find((a) => a.startsWith('--platform='));
  const platform = platformArg
    ? platformArg.split('=')[1].toLowerCase()
    : args.includes('yt') || args.includes('youtube')
      ? 'youtube'
      : args.includes('ig') || args.includes('instagram')
        ? 'instagram'
        : args.includes('reddit')
          ? 'reddit'
          : null;

  if (!platform) {
    console.log('Bulk Social Media & Outreach Uploader\n');
    console.log('Available Commands:');
    console.log('  npm run upload:login        — Log into YouTube & Instagram in browser');
    console.log('  npm run upload:status       — View status of all 80 reels');
    console.log('  npm run upload:yt           — Bulk schedule to YouTube Shorts (4x/day: 9am, 12pm, 5pm, 8pm)');
    console.log('  npm run upload:ig           — Bulk upload to Instagram Reels immediately');
    console.log('  npm run upload:ig:schedule  — Run 4x daily Instagram scheduler (9am, 12pm, 5pm, 8pm)');
    console.log('  npm run upload:reddit:login — Log into Reddit in browser profile');
    console.log('  npm run upload:reddit:test  — Dry-run preview post for Reddit');
    console.log('  npm run upload:reddit       — Post outreach thread to Reddit');
    console.log('  npm run upload:reddit:status— View Reddit outreach dashboard');
    console.log('\nOptions:');
    console.log('  --sub=SideProject           — Target specific subreddit (SideProject, leetcode, etc.)');
    console.log('  --limit=N                   — Only upload N items');
    console.log('  --section=sorting           — Only upload specific section/topic (e.g. sorting, trees, dp)');
    console.log('  --topic=sorting             — Alias for --section');
    console.log('  --dry-run                   — Test run without publishing');
    return;
  }

  const subArg = args.find((a) => a.startsWith('--sub='));
  const sub = subArg ? subArg.split('=')[1] : null;

  const topicArg = args.find((a) => a.startsWith('--section=') || a.startsWith('--topic='));
  const targetTopic = topicArg ? topicArg.split('=')[1] : null;

  const limitArg = args.find((a) => a.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : undefined;

  const modeArg = args.find((a) => a.startsWith('--mode='));
  const mode = modeArg ? modeArg.split('=')[1].toLowerCase() : args.includes('--schedule') ? 'schedule' : null;

  const dryRun = args.includes('--dry-run');
  const headless = args.includes('--headless');

  if (platform === 'reddit') {
    if (args.includes('--status')) {
      showRedditDashboard();
      return;
    }
    await runRedditBatch(REDDIT_POSTS, { dryRun, headless, sub });
    return;
  }

  let manifest = getReelsManifest();

  // Filter only rendered videos
  manifest = manifest.filter((r) => r.isRendered);

  if (targetTopic) {
    manifest = manifest.filter((r) => r.topic.toLowerCase() === targetTopic.toLowerCase());
  }

  if (platform === 'youtube' || platform === 'yt') {
    // Filter out already uploaded if not forcing
    if (!args.includes('--force')) {
      manifest = manifest.filter((r) => !r.youtubeStatus?.uploaded);
    }
    if (manifest.length === 0) {
      console.log('No pending YouTube uploads found! (All rendered videos are already uploaded)');
      return;
    }
    await runYouTubeBatch(manifest, { limit, mode: mode || 'schedule', dryRun, headless });
  } else if (platform === 'instagram' || platform === 'ig') {
    if (!args.includes('--force')) {
      manifest = manifest.filter((r) => !r.instagramStatus?.uploaded);
    }
    if (manifest.length === 0) {
      console.log('No pending Instagram uploads found! (All rendered videos are already uploaded)');
      return;
    }

    if (mode === 'daemon') {
      await runInstagramScheduler(manifest, { dryRun, headless });
    } else {
      await runInstagramBatch(manifest, { limit, mode: mode || 'schedule', dryRun, headless });
    }
  } else {
    console.error(`Unknown platform: ${platform}. Use --platform=youtube, --platform=instagram, or --platform=reddit`);
  }
}

main().catch(console.error);
