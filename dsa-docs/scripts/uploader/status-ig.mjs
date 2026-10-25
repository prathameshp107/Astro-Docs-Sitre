import { getReelsManifest } from './manifest.mjs';

export function showInstagramStatus() {
  const reels = getReelsManifest();
  const total = reels.length;
  const rendered = reels.filter((r) => r.isRendered);
  const igDone = reels.filter((r) => r.instagramStatus?.uploaded);
  const igPending = reels.filter((r) => !r.instagramStatus?.uploaded);

  const publicVideos = igDone.filter((r) => r.instagramStatus?.mode === 'public');
  const scheduledVideos = igDone.filter((r) => r.instagramStatus?.mode === 'schedule');

  console.log('=====================================================');
  console.log('  📸 Instagram Reels Upload & Schedule Status');
  console.log('=====================================================');
  console.log(`Total Reels in Catalog : ${total}`);
  console.log(`Rendered Video MP4s    : ${rendered.length}/${total}`);
  console.log(`Instagram Uploaded/Sched: ${igDone.length}/${total} (${Math.round((igDone.length / total) * 100)}%)`);
  console.log(`  ├─ Published Live    : ${publicVideos.length}`);
  console.log(`  └─ Scheduled         : ${scheduledVideos.length}`);
  console.log(`Pending Instagram Reels: ${igPending.length}/${total}`);
  console.log('-----------------------------------------------------\n');

  // Dates overview
  const dates = scheduledVideos
    .map((r) => r.instagramStatus?.schedule?.dateStr)
    .filter(Boolean)
    .sort();
  if (dates.length > 0) {
    console.log(`📅 SCHEDULE WINDOW: ${dates[0]} to ${dates[dates.length - 1]}`);
    console.log('');
  }

  // Topic breakdown
  console.log('📊 TOPIC BREAKDOWN (INSTAGRAM):');
  const byTopic = {};
  for (const r of reels) {
    if (!byTopic[r.topic]) byTopic[r.topic] = { total: 0, done: 0, pending: 0, items: [] };
    byTopic[r.topic].total++;
    if (r.instagramStatus?.uploaded) byTopic[r.topic].done++;
    else byTopic[r.topic].pending++;
    byTopic[r.topic].items.push(r);
  }

  for (const [topic, stat] of Object.entries(byTopic)) {
    const statusTag = stat.pending === 0 ? '✅ ALL UPLOADED' : `⏳ ${stat.pending} pending`;
    console.log(`\n📂 ${topic.toUpperCase()} — ${stat.done}/${stat.total} (${statusTag})`);
    for (const r of stat.items) {
      const vidIcon = r.isRendered ? '✓ MP4' : '✗ missing';
      let igInfo = '✗ Not uploaded';
      if (r.instagramStatus?.uploaded) {
        if (r.instagramStatus.schedule) {
          igInfo = `📅 ${r.instagramStatus.schedule.displayDate} ${r.instagramStatus.schedule.timeStr}`;
        } else {
          igInfo = `✓ ${r.instagramStatus.mode || 'posted'}`;
        }
      }
      console.log(`   ${r.track.padEnd(24)} ${vidIcon.padEnd(10)} ${igInfo}`);
    }
  }

  if (igPending.length > 0) {
    console.log('\n-----------------------------------------------------');
    console.log(`⏳ PENDING REELS TO UPLOAD (${igPending.length}):`);
    const pendingList = igPending.map((r) => r.id).join(', ');
    console.log(pendingList);
    console.log('\n💡 To upload or schedule pending reels to Instagram:');
    console.log('   npm run upload:ig');
    console.log('   (or test 1 reel: npm run upload:ig:test)');
  }

  console.log('=====================================================\n');
}

if (process.argv[1] && process.argv[1].endsWith('status-ig.mjs')) {
  showInstagramStatus();
}
