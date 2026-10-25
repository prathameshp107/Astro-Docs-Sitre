/**
 * Batch Audio Adder / Remuxer
 *
 * Adds royalty-free background music to generated Reel MP4s without re-rendering.
 * Since it uses `-c:v copy`, it does not re-encode video frames — 80 videos
 * are remuxed in ~5 to 10 seconds!
 *
 * Usage:
 *   node scripts/add-audio.mjs                  # add random music to all silent reels
 *   node scripts/add-audio.mjs --force          # re-apply/shuffle music on all reels
 *   node scripts/add-audio.mjs --volume=0.30    # adjust music volume (default 0.35)
 *   node scripts/add-audio.mjs sorting          # only reels in topic 'sorting'
 */

import { readdir, stat, rename, unlink, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'reels-out');
const AUDIO_DIR = path.join(ROOT, 'scripts', 'audio');

let FFMPEG = 'ffmpeg';

async function resolveFfmpeg() {
  try {
    await runCmd('ffmpeg', ['-version']);
    return 'ffmpeg (PATH)';
  } catch { /* fall through */ }

  try {
    const mod = await import('ffmpeg-static');
    const bin = mod.default ?? mod;
    if (bin && existsSync(bin)) {
      FFMPEG = bin;
      await runCmd(FFMPEG, ['-version']);
      return 'ffmpeg-static';
    }
  } catch { /* not installed */ }

  return null;
}

function runCmd(cmd, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: ['ignore', 'ignore', 'pipe'] });
    let err = '';
    p.stderr.on('data', (d) => { err += d.toString(); });
    p.on('error', reject);
    p.on('close', (code) => (code === 0 ? resolve() : reject(new Error(err.trim().split('\n').slice(-3).join('\n')))));
  });
}

function getVideoInfo(filePath) {
  return new Promise((resolve) => {
    const p = spawn(FFMPEG, ['-i', filePath]);
    let out = '';
    p.stderr.on('data', (d) => { out += d.toString(); });
    p.on('close', () => {
      const durationMatch = out.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
      const hasAudio = /Stream #.*Audio:/.test(out);
      let duration = 30;
      if (durationMatch) {
        duration =
          parseInt(durationMatch[1], 10) * 3600 +
          parseInt(durationMatch[2], 10) * 60 +
          parseFloat(durationMatch[3]);
      }
      resolve({ duration, hasAudio });
    });
  });
}

async function findVideos(dir) {
  const videos = [];
  if (!existsSync(dir)) return videos;

  async function walk(current) {
    const entries = await readdir(current, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(current, ent.name);
      if (ent.isDirectory() && ent.name !== '.frames') {
        await walk(full);
      } else if (ent.isFile() && ent.name.endsWith('.mp4') && !ent.name.endsWith('.tmp.mp4')) {
        videos.push(full);
      }
    }
  }

  await walk(dir);
  return videos;
}

async function getAudioTracks() {
  if (!existsSync(AUDIO_DIR)) return [];
  const entries = await readdir(AUDIO_DIR);
  return entries
    .filter((f) => /\.(mp3|wav|ogg|m4a|aac)$/i.test(f))
    .map((f) => path.join(AUDIO_DIR, f));
}

async function remuxWithAudio(videoFile, audioFile, duration, volume = 0.35) {
  const tmpOut = videoFile.replace(/\.mp4$/, '.audio-tmp.mp4');
  const fadeStart = Math.max(0, duration - 1.5).toFixed(2);

  const args = [
    '-y',
    '-i', videoFile,
    '-stream_loop', '-1',
    '-i', audioFile,
    '-map', '0:v:0',
    '-map', '1:a:0',
    '-c:v', 'copy',
    '-c:a', 'aac',
    '-b:a', '192k',
    '-af', `volume=${volume},afade=t=out:st=${fadeStart}:d=1.5`,
    '-shortest',
    '-movflags', '+faststart',
    tmpOut,
  ];

  await runCmd(FFMPEG, args);
  await rename(tmpOut, videoFile);
}

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const volArg = args.find((a) => a.startsWith('--volume='));
  const volume = volArg ? parseFloat(volArg.split('=')[1]) : 0.35;
  const concurrencyArg = args.find((a) => a.startsWith('--concurrency='));
  const concurrency = concurrencyArg ? parseInt(concurrencyArg.split('=')[1], 10) : 8;
  const filter = args.find((a) => !a.startsWith('--'));

  const ff = await resolveFfmpeg();
  if (!ff) {
    console.error('ffmpeg not found. Please ensure ffmpeg-static is installed.');
    process.exit(1);
  }

  const audioTracks = await getAudioTracks();
  if (audioTracks.length === 0) {
    console.error(`No audio tracks found in ${AUDIO_DIR}`);
    console.error('Run `node scripts/download-audio.mjs` first to download royalty-free tracks.');
    process.exit(1);
  }

  console.log(`Loaded ${audioTracks.length} royalty-free background tracks from scripts/audio/`);

  let videos = await findVideos(OUT);
  if (filter) {
    videos = videos.filter((v) => v.toLowerCase().includes(filter.toLowerCase()));
  }

  if (videos.length === 0) {
    console.log('No video files found to process.');
    return;
  }

  console.log(`Found ${videos.length} videos in ${OUT}. Processing with concurrency=${concurrency}...`);
  const t0 = Date.now();

  let index = 0;
  let successCount = 0;
  let skippedCount = 0;

  async function worker(workerId) {
    while (index < videos.length) {
      const myIdx = index++;
      const video = videos[myIdx];
      const rel = path.relative(OUT, video);

      try {
        const info = await getVideoInfo(video);
        if (info.hasAudio && !force) {
          skippedCount++;
          // already has audio
          continue;
        }

        // Pick random audio track
        const chosenAudio = audioTracks[Math.floor(Math.random() * audioTracks.length)];
        const audioName = path.basename(chosenAudio);

        await remuxWithAudio(video, chosenAudio, info.duration, volume);
        successCount++;
        console.log(`  [${successCount + skippedCount}/${videos.length}] ✓ ${rel} (${info.duration.toFixed(1)}s) + [${audioName}]`);
      } catch (err) {
        console.error(`  ✗ Error processing ${rel}:`, err.message);
      }
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, videos.length) }, (_, i) => worker(i));
  await Promise.all(workers);

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`\nDone in ${elapsed}s! Processed ${successCount} videos, skipped ${skippedCount} existing.`);
}

main().catch(console.error);
