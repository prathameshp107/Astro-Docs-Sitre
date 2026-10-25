import { getReelsManifest } from './manifest.mjs';

export function showYouTubeStatus() {
  const reels = getReelsManifest();
  const total = reels.length;
  const rendered = reels.filter((r) => r.isRendered);
  const ytDone = reels.filter((r) => r.youtubeStatus?.uploaded);
  const ytPending = reels.filter((r) => !r.youtubeStatus?.uploaded);

  const publicVideos = ytDone.filter((r) => r.youtubeStatus?.mode === 'public');
  const scheduledVideos = ytDone.filter((r) => r.youtubeStatus?.mode === 'schedule');

  console.log('=====================================================');
  console.log('  🎥 YouTube Shorts Upload & Schedule Status');
  console.log('=====================================================');
  console.log(`Total Reels in Catalog : ${total}`);
  console.log(`Rendered Video MP4s    : ${rendered.length}/${total}`);
  console.log(`YouTube Uploaded/Sched : ${ytDone.length}/${total} (${Math.round((ytDone.length / total) * 100)}%)`);
  console.log(`  ├─ Public / Live     : ${publicVideos.length}`);
  console.log(`  └─ Scheduled         : ${scheduledVideos.length}`);
  console.log(`Pending YouTube Uploads: ${ytPending.length}/${total}`);
  console.log('-----------------------------------------------------\n');

  // Today's schedule check
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const todaysReels = scheduledVideos.filter((r) => r.youtubeStatus?.schedule?.dateStr === todayStr);

  if (todaysReels.length > 0) {
    console.log(`📅 TODAY'S YOUTUBE SCHEDULE (${todayStr}):`);
    for (const r of todaysReels) {
      console.log(`   ⏰ ${r.youtubeStatus.schedule.timeStr.padEnd(10)} [${r.youtubeStatus.schedule.slotName}] -> ${r.id} ("${r.title}")`);
    }
    console.log('');
  }

  // Topic breakdown
  console.log('📊 TOPIC BREAKDOWN (YOUTUBE):');
  const byTopic = {};
  for (const r of reels) {
    if (!byTopic[r.topic]) byTopic[r.topic] = { total: 0, done: 0, pending: 0, items: [] };
    byTopic[r.topic].total++;
    if (r.youtubeStatus?.uploaded) byTopic[r.topic].done++;
    else byTopic[r.topic].pending++;
    byTopic[r.topic].items.push(r);
  }

  for (const [topic, stat] of Object.entries(byTopic)) {
    const statusTag = stat.pending === 0 ? '✅ ALL UPLOADED' : `⏳ ${stat.pending} pending`;
    console.log(`\n📂 ${topic.toUpperCase()} — ${stat.done}/${stat.total} (${statusTag})`);
    for (const r of stat.items) {
      const vidIcon = r.isRendered ? '✓ MP4' : '✗ missing';
      let ytInfo = '✗ Not uploaded';
      if (r.youtubeStatus?.uploaded) {
        if (r.youtubeStatus.schedule) {
          ytInfo = `📅 ${r.youtubeStatus.schedule.displayDate} ${r.youtubeStatus.schedule.timeStr}`;
        } else {
          ytInfo = `✓ ${r.youtubeStatus.mode || 'uploaded'}`;
        }
      }
      console.log(`   ${r.track.padEnd(24)} ${vidIcon.padEnd(10)} ${ytInfo}`);
    }
  }

  if (ytPending.length > 0) {
    console.log('\n-----------------------------------------------------');
    console.log(`⏳ PENDING REELS TO UPLOAD (${ytPending.length}):`);
    const pendingList = ytPending.map((r) => r.id).join(', ');
    console.log(pendingList);
    console.log('\n💡 To bulk-schedule the next pending videos to YouTube:');
    console.log('   npm run upload:yt');
    console.log('   (or test 1 video: npm run upload:yt:test)');
  }

  console.log('=====================================================\n');
}

if (process.argv[1] && process.argv[1].endsWith('status-yt.mjs')) {
  showYouTubeStatus();
}
