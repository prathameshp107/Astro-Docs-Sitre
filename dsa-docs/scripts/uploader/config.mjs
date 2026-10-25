import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

export const CONFIG = {
  root: ROOT,
  reelsOut: path.join(ROOT, 'reels-out'),
  sessionDir: path.join(ROOT, '.browser-session'),
  statusFile: path.join(ROOT, 'reels-out', '.upload-status.json'),
  
  // Default scheduling configuration: 4 videos per day (9 AM, 12 PM, 5 PM, 8 PM)
  schedule: {
    startDaysFromNow: 1, // Start scheduling tomorrow
    postsPerDay: 4,      // 4 videos per day
    timeSlots: ['9:00 AM', '12:00 PM', '5:00 PM', '8:00 PM'],
    slotNames: ['Morning (9:00 AM)', 'Midday (12:00 PM)', 'Evening (5:00 PM)', 'Night (8:00 PM)'],
  },
  
  // Viewport for persistent browser context
  viewport: { width: 1280, height: 850 },
};
