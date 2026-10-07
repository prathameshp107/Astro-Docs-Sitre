import { getReelsManifest } from './manifest.mjs';
import { showYouTubeStatus } from './status-yt.mjs';
import { showInstagramStatus } from './status-ig.mjs';

export function showStatus() {
  const reels = getReelsManifest();
  const rendered = reels.filter((r) => r.isRendered);
  const ytDone = reels.filter((r) => r.youtubeStatus?.uploaded);
  const igDone = reels.filter((r) => r.instagramStatus?.uploaded);

  console.log('=====================================================');
  console.log('  🌐 Social Media Upload & Schedule Dashboard (ALL)');
  console.log('=====================================================');
  console.log(`Total Reels in Config : ${reels.length}`);
  console.log(`Rendered Video MP4s   : ${rendered.length}/${reels.length}`);
  console.log(`YouTube Shorts Posted : ${ytDone.length}/${reels.length} (${Math.round((ytDone.length / reels.length) * 100)}%)`);
  console.log(`Instagram Reels Posted: ${igDone.length}/${reels.length} (${Math.round((igDone.length / reels.length) * 100)}%)`);
  console.log('-----------------------------------------------------\n');

  console.log('TOPIC-BY-TOPIC BREAKDOWN:\n');
  const byTopic = {};
  for (const r of reels) {
    if (!byTopic[r.topic]) byTopic[r.topic] = [];
    byTopic[r.topic].push(r);
  }

  for (const [topic, items] of Object.entries(byTopic)) {
    console.log(`📂 ${topic.toUpperCase()} (${items.length} reels):`);
    for (const r of items) {
      const vidIcon = r.isRendered ? '✓ MP4' : '✗ missing';
      let ytIcon = '[YT: ✗]';
      if (r.youtubeStatus?.uploaded) {
        if (r.youtubeStatus.schedule) {
          ytIcon = `[YT: 📅 ${r.youtubeStatus.schedule.displayDate} ${r.youtubeStatus.schedule.timeStr}]`;
        } else {
          ytIcon = `[YT: ${r.youtubeStatus.mode}]`;
        }
      }
      let igIcon = '[IG: ✗]';
      if (r.instagramStatus?.uploaded) {
        if (r.instagramStatus.schedule) {
          igIcon = `[IG: 📅 ${r.instagramStatus.schedule.displayDate} ${r.instagramStatus.schedule.timeStr}]`;
        } else {
          igIcon = `[IG: ✓ ${r.instagramStatus.mode || 'posted'}]`;
        }
      }
      console.log(`   ${r.track.padEnd(24)} ${vidIcon.padEnd(10)} ${ytIcon.padEnd(32)} ${igIcon}`);
    }
    console.log('');
  }
}

if (process.argv[1] && process.argv[1].endsWith('status.mjs')) {
  const args = process.argv.slice(2);
  if (args.includes('--yt') || args.includes('--youtube')) {
    showYouTubeStatus();
  } else if (args.includes('--ig') || args.includes('--instagram')) {
    showInstagramStatus();
  } else {
    showStatus();
  }
}

