import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { CONFIG } from './config.mjs';
import { REELS } from '../reels.config.mjs';
import { captionFor } from '../reel-captions.mjs';

/**
 * Load upload status from reels-out/.upload-status.json
 */
export function loadUploadStatus() {
  try {
    if (existsSync(CONFIG.statusFile)) {
      return JSON.parse(readFileSync(CONFIG.statusFile, 'utf8'));
    }
  } catch { /* ignore corrupted status */ }
  return {};
}

/**
 * Save upload status to reels-out/.upload-status.json
 */
export function saveUploadStatus(status) {
  try {
    writeFileSync(CONFIG.statusFile, JSON.stringify(status, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to save upload status:', err.message);
  }
}

/**
 * Get all reels with their video paths, captions, and upload state
 */
export function getReelsManifest() {
  const status = loadUploadStatus();

  return REELS.map((reel, index) => {
    const id = `${reel.topic}-${reel.track}`;
    const videoFile = path.join(CONFIG.reelsOut, reel.topic, `${reel.track}.mp4`);
    const isRendered = existsSync(videoFile);
    const caption = captionFor(reel);

    return {
      index: index + 1,
      id,
      topic: reel.topic,
      track: reel.track,
      title: reel.title,
      subtitle: reel.subtitle,
      videoFile,
      isRendered,
      instagramCaption: caption.instagram,
      ytTitle: caption.ytTitle,
      ytDescription: caption.ytDescription,
      youtubeStatus: status[id]?.youtube || null,
      instagramStatus: status[id]?.instagram || null,
    };
  });
}

/**
 * Find the next N unoccupied future schedule slots, automatically filling gaps
 */
export function getNextAvailableScheduleSlots(count = 1, config = CONFIG.schedule, extraBooked = new Set(), platform = 'youtube') {
  const status = loadUploadStatus();
  const booked = new Set(extraBooked);

  for (const item of Object.values(status)) {
    const platStatus = item[platform];
    if (platStatus?.uploaded && platStatus?.schedule?.dateStr) {
      if (platStatus.schedule.timeStr) {
        booked.add(`${platStatus.schedule.dateStr}_${platStatus.schedule.timeStr}`);
      }
      if (typeof platStatus.schedule.slotIndex === 'number') {
        booked.add(`${platStatus.schedule.dateStr}_slot_${platStatus.schedule.slotIndex}`);
      }
      if (platStatus.schedule.timeStr) {
        const hMatch = platStatus.schedule.timeStr.match(/^(\d+):/);
        const isPM = /pm/i.test(platStatus.schedule.timeStr);
        if (hMatch) {
          let h = parseInt(hMatch[1], 10);
          if (isPM && h < 12) h += 12;
          if (!isPM && h === 12) h = 0;
          let sIdx = 0;
          if (h >= 11 && h < 15) sIdx = 1;
          else if (h >= 15 && h < 19) sIdx = 2;
          else if (h >= 19 || h < 6) sIdx = 3;
          booked.add(`${platStatus.schedule.dateStr}_slot_${sIdx}`);
        }
      }
    }
  }

  const { startDaysFromNow = 1, timeSlots = ['9:00 AM', '12:00 PM', '5:00 PM', '8:00 PM'], slotNames = [] } = config;
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const available = [];
  const curr = new Date();
  curr.setDate(curr.getDate() + startDaysFromNow);

  // Scan up to 120 days into future
  for (let d = 0; d < 120 && available.length < count; d++) {
    const year = curr.getFullYear();
    const month = String(curr.getMonth() + 1).padStart(2, '0');
    const day = String(curr.getDate()).padStart(2, '0');
    const dayNum = curr.getDate();
    const monthShort = monthNames[curr.getMonth()];
    const dateStr = `${year}-${month}-${day}`;
    const displayDate = `${monthShort} ${dayNum}, ${year}`;

    for (let s = 0; s < timeSlots.length && available.length < count; s++) {
      // Instagram constraint: all future reels must be scheduled after Sep 16, 12:00 PM
      if (platform === 'instagram' || platform === 'ig') {
        if (dateStr < '2026-09-16' || (dateStr === '2026-09-16' && s < 2)) {
          continue;
        }
      }

      const time = timeSlots[s];
      const key = `${dateStr}_${time}`;
      const slotKey = `${dateStr}_slot_${s}`;

      if (!booked.has(key) && !booked.has(slotKey)) {
        const slotName = slotNames[s] || `Slot ${s + 1} (${time})`;
        available.push({
          dateStr,
          timeStr: time,
          displayDate,
          dayNum,
          monthShort,
          year,
          slotIndex: s,
          slotName,
        });
        booked.add(key);
        booked.add(slotKey);
      }
    }
    curr.setDate(curr.getDate() + 1);
  }

  return available;
}

/**
 * Calculate the next scheduled date & time slot for an upload
 */
export function calculateScheduleSlot(existingScheduledCount, config = CONFIG.schedule) {
  const slots = getNextAvailableScheduleSlots(1, config);
  return slots[0];
}
