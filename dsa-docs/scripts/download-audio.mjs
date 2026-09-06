import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const TRACKS = [
  { name: 'chill-1.mp3', url: 'https://raw.githubusercontent.com/mluedke2/app-preview-music/master/chill_preview_1.mp3' },
  { name: 'chill-2.mp3', url: 'https://raw.githubusercontent.com/mluedke2/app-preview-music/master/chill_preview_2.mp3' },
  { name: 'chill-3.mp3', url: 'https://raw.githubusercontent.com/mluedke2/app-preview-music/master/chill_preview_3.mp3' },
  { name: 'chill-4.mp3', url: 'https://raw.githubusercontent.com/mluedke2/app-preview-music/master/chill_preview_4.mp3' },
  { name: 'chill-5.mp3', url: 'https://raw.githubusercontent.com/mluedke2/app-preview-music/master/chill_preview_5.mp3' },
  { name: 'chill-6.mp3', url: 'https://raw.githubusercontent.com/mluedke2/app-preview-music/master/chill_preview_6.mp3' },
  { name: 'cool-1.mp3', url: 'https://raw.githubusercontent.com/mluedke2/app-preview-music/master/cool_preview_1.mp3' },
  { name: 'cool-2.mp3', url: 'https://raw.githubusercontent.com/mluedke2/app-preview-music/master/cool_preview_2.mp3' },
  { name: 'cool-3.mp3', url: 'https://raw.githubusercontent.com/mluedke2/app-preview-music/master/cool_preview_3.mp3' },
  { name: 'light-1.mp3', url: 'https://raw.githubusercontent.com/mluedke2/app-preview-music/master/light_preview_1.mp3' },
  { name: 'light-2.mp3', url: 'https://raw.githubusercontent.com/mluedke2/app-preview-music/master/light_preview_2.mp3' },
  { name: 'focus-1.mp3', url: 'https://raw.githubusercontent.com/mluedke2/app-preview-music/master/contemplative_preview_1.mp3' },
];

const targetDir = path.resolve('scripts/audio');

async function downloadAll() {
  await mkdir(targetDir, { recursive: true });
  console.log(`Downloading ${TRACKS.length} royalty-free tracks into ${targetDir}...`);

  for (const track of TRACKS) {
    const dest = path.join(targetDir, track.name);
    try {
      const res = await fetch(track.url);
      if (!res.ok) {
        console.warn(`Failed to download ${track.name}: HTTP ${res.status}`);
        continue;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(dest, buf);
      console.log(`✓ ${track.name} (${(buf.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`Error downloading ${track.name}:`, err.message);
    }
  }

  // Create a README explaining the source and license in the audio folder
  const readmeContent = `# Royalty-Free Audio Tracks

These non-copyrighted, royalty-free audio tracks are used as background music for the Algorithm Visualizer Reels.

## Sources & Licensing
- Free App Preview Music by Matt Luedke (GarageBand loops & original compositions)
- License: Creative Commons Attribution (CC BY 4.0) / Royalty-Free
- Commercial & social media use permitted with zero copyright strikes.

Feel free to drop any additional .mp3 or .wav files into this folder — the reel recorder and audio remuxer will automatically pick them up at random for each video!
`;
  await writeFile(path.join(targetDir, 'README.md'), readmeContent, 'utf8');
  console.log('Done!');
}

downloadAll();
