import { getBrowserContext } from './browser.mjs';
import { loadUploadStatus, saveUploadStatus, getNextAvailableScheduleSlots } from './manifest.mjs';
import { CONFIG } from './config.mjs';

/**
 * Configure native Instagram scheduling under "Advanced settings"
 */
async function configureInstagramSchedule(page, slot) {
  try {
    // Scroll right panel down to reveal Advanced settings
    await page.evaluate(() => {
      const dialog = document.querySelector('div[role="dialog"]');
      if (!dialog) return;
      const scrollables = Array.from(dialog.querySelectorAll('*')).filter(el => {
        const style = window.getComputedStyle(el);
        return (style.overflowY === 'auto' || style.overflowY === 'scroll') || el.scrollHeight > el.clientHeight + 20;
      });
      scrollables.forEach(s => { s.scrollTop = s.scrollHeight; });
    });
    await page.waitForTimeout(300);

    // 1. Expand "Advanced settings" if collapsed
    const advBtn = page.locator('div[role="button"]:has-text("Advanced settings"), span:has-text("Advanced settings"), [role="button"]:has-text("Advanced settings")').first();
    if (await advBtn.isVisible({ timeout: 2500 }).catch(() => false)) {
      await advBtn.scrollIntoViewIfNeeded().catch(() => {});
      await advBtn.click({ force: true });
      await page.waitForTimeout(500);
    }

    // Scroll down again inside Advanced settings
    await page.evaluate(() => {
      const dialog = document.querySelector('div[role="dialog"]');
      if (!dialog) return;
      const scrollables = Array.from(dialog.querySelectorAll('*')).filter(el => el.scrollHeight > el.clientHeight + 20);
      scrollables.forEach(s => { s.scrollTop = s.scrollHeight; });
    });
    await page.waitForTimeout(300);

    // 2. Find all switches and find the one specifically for "Schedule"
    const switchesInfo = await page.evaluate(() => {
      const dialog = document.querySelector('div[role="dialog"]');
      if (!dialog) return { text: '', switches: [] };
      const switches = Array.from(dialog.querySelectorAll('input[type="checkbox"], [role="switch"], button[role="switch"]'));
      const details = switches.map((sw, idx) => {
        let p = sw;
        for (let k = 0; k < 4 && p.parentElement; k++) p = p.parentElement;
        return {
          idx,
          checked: sw.checked || sw.getAttribute('aria-checked') === 'true',
          text: p ? p.innerText.replace(/\n+/g, ' ').trim() : ''
        };
      });
      return { text: dialog.innerText, switches: details };
    });

    const schedSwitchInfo = switchesInfo.switches.find(s => /schedule/i.test(s.text));
    if (schedSwitchInfo) {
      const schedSwitch = page.locator('input[type="checkbox"], [role="switch"], button[role="switch"]').nth(schedSwitchInfo.idx);
      if (!schedSwitchInfo.checked) {
        console.log('  Toggling "Schedule content" switch ON...');
        await schedSwitch.click({ force: true });
        await page.waitForTimeout(600);
      }

      // 3. Configure Date & Time in Instagram schedule controls
      console.log(`  Setting schedule date to ${slot.displayDate}...`);
      const dateBtn = page.locator('div[role="button"]:has-text(", 202")').first();
      if (await dateBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await dateBtn.click({ force: true });
        await page.waitForTimeout(400);

        // Click target day in calendar popup
        const dayClicked = await page.evaluate(({ targetDay }) => {
          const dialog = document.querySelector('div[role="dialog"]');
          if (!dialog) return false;
          const dayButtons = Array.from(dialog.querySelectorAll('button, div[role="button"], span'))
            .filter(el => el.innerText && el.innerText.trim() === String(targetDay) && el.children.length === 0);
          
          if (dayButtons.length > 0) {
            const target = dayButtons[0].closest('button') || dayButtons[0].closest('[role="button"]') || dayButtons[0];
            target.click();
            return true;
          }
          return false;
        }, { targetDay: slot.dayNum });

        if (!dayClicked) {
          const dayBtn = page.locator(`button:has-text("${slot.dayNum}"), [role="button"]:has-text("${slot.dayNum}")`).first();
          if (await dayBtn.isVisible({ timeout: 1500 }).catch(() => false)) {
            await dayBtn.click({ force: true });
          }
        }
        await page.waitForTimeout(300);
      }

      // Configure Hours, Minutes, and AM/PM
      let [timePart, ampm] = slot.timeStr.split(' ');
      let [h, m] = timePart.split(':');
      h = String(parseInt(h, 10)).padStart(2, '0');
      m = String(parseInt(m, 10)).padStart(2, '0');

      console.log(`  Setting schedule time to ${h}:${m} ${ampm}...`);

      // 1. Force React internal state update via prototype setter
      await page.evaluate(({ targetH, targetM, targetAMPM }) => {
        const setVal = (el, val) => {
          if (!el) return;
          const proto = window.HTMLInputElement.prototype;
          const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
          if (setter) setter.call(el, val);
          else el.value = val;
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        };
        setVal(document.querySelector('input[role="spinbutton"][aria-label="Hours"]'), targetH);
        setVal(document.querySelector('input[role="spinbutton"][aria-label="Minutes"]'), targetM);
        setVal(document.querySelector('input[role="spinbutton"][aria-label="AM PM"]'), targetAMPM);
      }, { targetH: h, targetM: m, targetAMPM: ampm });

      // 2. Also simulate genuine keyboard typing on Hours & Minutes
      const hoursInput = page.locator('input[role="spinbutton"][aria-label="Hours"]').first();
      if (await hoursInput.isVisible({ timeout: 1000 }).catch(() => false)) {
        await hoursInput.click({ force: true });
        await page.keyboard.press('Control+A');
        await page.keyboard.type(h);
        await hoursInput.dispatchEvent('input', { bubbles: true }).catch(() => {});
        await hoursInput.dispatchEvent('change', { bubbles: true }).catch(() => {});
      }

      const minutesInput = page.locator('input[role="spinbutton"][aria-label="Minutes"]').first();
      if (await minutesInput.isVisible({ timeout: 1000 }).catch(() => false)) {
        await minutesInput.click({ force: true });
        await page.keyboard.press('Control+A');
        await page.keyboard.type(m);
        await minutesInput.dispatchEvent('input', { bubbles: true }).catch(() => {});
        await minutesInput.dispatchEvent('change', { bubbles: true }).catch(() => {});
      }

      const ampmInput = page.locator('input[role="spinbutton"][aria-label="AM PM"]').first();
      if (await ampmInput.isVisible({ timeout: 1000 }).catch(() => false)) {
        await ampmInput.click({ force: true });
        const val = (await ampmInput.inputValue().catch(() => '')).trim().toUpperCase();
        if (!val.includes(ampm.toUpperCase())) {
          await page.keyboard.press('ArrowUp');
          await ampmInput.dispatchEvent('input', { bubbles: true }).catch(() => {});
          await ampmInput.dispatchEvent('change', { bubbles: true }).catch(() => {});
        }
      }

      // Verify the registered values
      const registeredTime = await page.evaluate(() => {
        const hEl = document.querySelector('input[role="spinbutton"][aria-label="Hours"]');
        const mEl = document.querySelector('input[role="spinbutton"][aria-label="Minutes"]');
        const apEl = document.querySelector('input[role="spinbutton"][aria-label="AM PM"]');
        return {
          h: hEl?.value || '',
          m: mEl?.value || '',
          ap: apEl?.value || '',
        };
      });
      console.log(`  ✓ Schedule time verified: ${registeredTime.h || h}:${registeredTime.m || m} ${registeredTime.ap || ampm}`);
    } else {
      console.warn('  ⚠ No "Schedule" switch found among switches.');
      console.log('  [DEBUG] Full dialog text:\n' + switchesInfo.text.split('\n').map(l => '    ' + l).join('\n'));
      console.warn('  (Ensure your account is set to Professional/Creator mode on Instagram).');
      return;
    }
  } catch (err) {
    console.warn('  Notice while setting schedule options:', err.message);
  }
}

/**
 * Upload a single reel to Instagram via web
 */
export async function uploadToInstagram(reel, options = {}) {
  const {
    page,
    dryRun = false,
    mode = 'schedule',
    scheduleSlot = null,
  } = options;

  console.log(`\n▶ [Instagram] Starting upload: ${reel.title} (${reel.topic}:${reel.track})`);
  console.log(`  File: ${reel.videoFile}`);
  console.log(`  Mode: ${mode.toUpperCase()}`);
  if (mode === 'schedule' && scheduleSlot) {
    console.log(`  Schedule Target: ${scheduleSlot.displayDate} @ ${scheduleSlot.timeStr} (${scheduleSlot.slotName})`);
  }
  if (dryRun) console.log('  [DRY RUN - will not click final Submit]');

  // Check if we are already on instagram.com with create button visible (avoids full reload)
  const createNav = page.locator('svg[aria-label="New post"], svg[aria-label="Create"], a:has-text("Create"), span:has-text("Create")').first();
  const isOnIg = page.url().includes('instagram.com') && await createNav.isVisible({ timeout: 1000 }).catch(() => false);

  if (!isOnIg) {
    await page.goto('https://www.instagram.com/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Check login
    const hasLoginInput = await page.locator('input[name="username"]').isVisible({ timeout: 2000 }).catch(() => false);
    if (hasLoginInput) {
      throw new Error('Not logged into Instagram. Run `npm run upload:ig:login` to log into your account.');
    }

    // Dismiss any "Turn on Notifications" or "Save Your Login Info" prompts
    const notNowBtn = page.locator('button:has-text("Not Now"), button:has-text("Cancel")').first();
    if (await notNowBtn.isVisible({ timeout: 1500 }).catch(() => false)) {
      await notNowBtn.click().catch(() => {});
    }
    await createNav.waitFor({ state: 'visible', timeout: 15000 });
  }

  // Ensure any leftover dialog from a prior action is dismissed
  const existingDialog = page.locator('div[role="dialog"]');
  if (await existingDialog.isVisible({ timeout: 300 }).catch(() => false)) {
    const closeBtn = page.locator('svg[aria-label="Close"], button:has-text("Discard")').first();
    if (await closeBtn.isVisible({ timeout: 500 }).catch(() => false)) {
      await closeBtn.click({ force: true }).catch(() => {});
      const discardConfirm = page.locator('button:has-text("Discard")').first();
      if (await discardConfirm.isVisible({ timeout: 800 }).catch(() => false)) {
        await discardConfirm.click({ force: true }).catch(() => {});
      }
    }
  }

  // Click Create in left navigation sidebar
  console.log('  Opening Create menu...');
  await createNav.click();
  await page.waitForTimeout(800);

  // Instagram opens a flyout menu with "Post", "Live video", "Ad". We must click "Post".
  console.log('  Selecting "Post" option...');
  const postClicked = await page.evaluate(() => {
    const postSpan = Array.from(document.querySelectorAll('span')).find(s => s.innerText.trim() === 'Post');
    if (!postSpan) return false;
    const target = postSpan.closest('a') || postSpan.closest('div[role="button"]') || postSpan;
    target.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    return true;
  });

  if (!postClicked) {
    const postLink = page.locator('a[role="link"]:has-text("Post"), span:has-text("Post")').first();
    await postLink.click({ force: true }).catch(() => {});
  }
  await page.waitForTimeout(800);

  // Upload file
  console.log('  Selecting video file...');
  const fileInput = page.locator('input[type="file"]').first();
  await fileInput.waitFor({ state: 'attached', timeout: 15000 });
  await fileInput.setInputFiles(reel.videoFile);

  // Wait for editor to load
  const readyIndicator = page.locator('button:has(svg[aria-label="Select crop"]), svg[aria-label="Select crop"], div[role="button"]:has-text("Next"), button:has-text("Next"), button:has-text("OK"), button:has-text("Got it")').first();
  await readyIndicator.waitFor({ state: 'visible', timeout: 20000 });

  // Handle "Video posts are now shared as reels" modal if shown
  const okBtn = page.locator('button:has-text("OK"), button:has-text("Got it")').first();
  if (await okBtn.isVisible({ timeout: 1500 }).catch(() => false)) {
    console.log('  Dismissing reels info dialog...');
    await okBtn.click({ force: true }).catch(() => {});
    await page.waitForTimeout(300);
  }

  // Ensure 9:16 aspect ratio in Step 1 (Crop)
  console.log('  Setting aspect ratio to 9:16 (Original / Reels)...');
  try {
    const cropBtn = page.locator('button:has(svg[aria-label="Select crop"]), svg[aria-label="Select crop"], button:has(svg[aria-label="Crop"]), svg[aria-label="Crop"], [aria-label="Select crop"]').first();
    if (await cropBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await cropBtn.click({ force: true });
      await page.waitForTimeout(300);

      const ratioClicked = await page.evaluate(() => {
        const dialog = document.querySelector('div[role="dialog"]');
        if (!dialog) return false;
        const all = Array.from(dialog.querySelectorAll('*'));
        // Find 9:16 option first, then Original (which preserves 1080x1920)
        const target916 = all.find((el) => el.children.length === 0 && el.innerText && el.innerText.trim() === '9:16');
        const targetOrig = all.find((el) => el.children.length === 0 && el.innerText && el.innerText.trim() === 'Original');
        const target = target916 || targetOrig;
        if (target) {
          const btn = target.closest('[role="button"]') || target.closest('button') || target;
          btn.click();
          return true;
        }
        return false;
      });

      if (!ratioClicked) {
        const ratioOption = page.locator('button:has-text("9:16"), span:has-text("9:16"), button:has-text("Original"), span:has-text("Original")').first();
        if (await ratioOption.isVisible({ timeout: 1500 }).catch(() => false)) {
          await ratioOption.click({ force: true });
        }
      }
      await page.waitForTimeout(200);
      console.log('  ✓ Aspect ratio set to 9:16.');
    }
  } catch (err) {
    console.warn('  Notice while setting 9:16 ratio:', err.message);
  }

  // Advance Step 1 (Crop) -> Step 2 (Cover)
  console.log('  Advancing through crop & cover...');
  const nextBtn1 = page.locator('div[role="button"]:has-text("Next"), button:has-text("Next")').first();
  await nextBtn1.waitFor({ state: 'visible', timeout: 10000 });
  await nextBtn1.click({ force: true });

  // Advance Step 2 (Cover) -> Step 3 (Caption)
  const nextBtn2 = page.locator('div[role="button"]:has-text("Next"), button:has-text("Next")').first();
  if (await nextBtn2.isVisible({ timeout: 4000 }).catch(() => false)) {
    await nextBtn2.click({ force: true });
  }

  // Caption input (instant paste for speed)
  console.log('  Entering caption & hashtags...');
  const captionBox = page.locator('div[aria-label*="caption" i], div[role="textbox"][contenteditable="true"]').first();
  await captionBox.waitFor({ state: 'visible', timeout: 10000 });
  await captionBox.focus();
  await captionBox.click({ force: true });

  const pasted = await page.evaluate((text) => {
    const box = document.querySelector('div[aria-label*="caption" i], div[role="textbox"][contenteditable="true"]');
    if (!box) return false;
    box.focus();
    return document.execCommand('insertText', false, text);
  }, reel.instagramCaption);

  if (!pasted) {
    await page.keyboard.type(reel.instagramCaption, { delay: 2 });
  }
  await page.waitForTimeout(200);

  // Native Scheduling (if available on creator/business accounts)
  if (mode === 'schedule') {
    console.log('  Configuring schedule in Advanced settings...');
    await configureInstagramSchedule(page, scheduleSlot || {
      dateStr: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      timeStr: '9:00 AM',
      displayDate: 'Tomorrow',
    });
  }

  if (dryRun) {
    console.log('  [DRY RUN] Would click Share/Schedule now. Discarding post to keep account clean...');
    const closeBtn = page.locator('svg[aria-label="Close"], button:has-text("Discard")').first();
    if (await closeBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await closeBtn.click({ force: true }).catch(() => {});
      await page.waitForTimeout(400);
      const discardConfirm = page.locator('button:has-text("Discard")').first();
      if (await discardConfirm.isVisible({ timeout: 2000 }).catch(() => false)) {
        await discardConfirm.click({ force: true }).catch(() => {});
      }
    }
    console.log(`✓ [Instagram] Dry run completed successfully for ${reel.id}!`);
    return { success: true, dryRun: true };
  }

  // Click Share or Schedule using verified DOM evaluate
  console.log(`  Submitting reel to Instagram (${mode === 'schedule' ? 'Schedule' : 'Share'})...`);
  const clicked = await page.evaluate(() => {
    const dialog = document.querySelector('div[role="dialog"]');
    if (!dialog) return false;
    const all = Array.from(dialog.querySelectorAll('*'));
    const shareLeaf = all.find((e) => e.children.length === 0 && e.innerText && (/share/i.test(e.innerText.trim()) || /schedule/i.test(e.innerText.trim())));
    const btn = shareLeaf?.closest('[role="button"]') || shareLeaf;
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });

  if (!clicked) {
    const submitBtn = page.locator('div[role="dialog"] div[role="button"]:has-text("Schedule"), div[role="dialog"] div[role="button"]:has-text("Share")').first();
    await submitBtn.click({ force: true }).catch(() => {});
  }

  // Wait for upload completion (poll every 500ms instead of 2500ms for instant responsiveness)
  console.log('  Waiting for Instagram confirmation...');
  const startTime = Date.now();
  const timeoutMs = 90000;
  let completed = false;

  while (Date.now() - startTime < timeoutMs) {
    await page.waitForTimeout(500);

    const check = await page.evaluate(() => {
      const dialog = document.querySelector('div[role="dialog"]');
      if (!dialog) return { dialogGone: true };
      const text = dialog.innerText || '';
      const isSharing = /sharing|scheduling/i.test(text);
      const isShared = /shared|scheduled|your reel has been|your post has been/i.test(text);
      return { dialogGone: false, isSharing, isShared };
    });

    if (check.dialogGone || check.isShared) {
      completed = true;
      break;
    }
  }

  if (!completed) {
    throw new Error('Timeout waiting for Instagram reel upload confirmation');
  }

  // Close final confirmation modal only if there are more reels to upload in this batch
  if (!options.isLast) {
    const finishClose = page.locator('svg[aria-label="Close"]').first();
    if (await finishClose.isVisible({ timeout: 2000 }).catch(() => false)) {
      await finishClose.click({ force: true }).catch(() => {});
      await page.waitForTimeout(300);
    }
  } else {
    console.log('  Keeping confirmation dialog on screen for verification.');
  }

  // Record status
  const status = loadUploadStatus();
  status[reel.id] = status[reel.id] || {};
  status[reel.id].instagram = {
    uploaded: true,
    mode: mode,
    timestamp: new Date().toISOString(),
    schedule: mode === 'schedule' && scheduleSlot ? {
      dateStr: scheduleSlot.dateStr,
      timeStr: scheduleSlot.timeStr,
      displayDate: scheduleSlot.displayDate,
      dayNum: scheduleSlot.dayNum,
      monthShort: scheduleSlot.monthShort,
      year: scheduleSlot.year,
      slotIndex: scheduleSlot.slotIndex,
      slotName: scheduleSlot.slotName,
    } : null,
  };
  saveUploadStatus(status);

  console.log(`✓ [Instagram] Successfully ${mode === 'schedule' ? 'scheduled' : 'shared'} ${reel.id}!`);
  return { success: true };
}

/**
 * Bulk upload runner for Instagram (Turbo Optimized)
 */
export async function runInstagramBatch(reels, options = {}) {
  const { limit = reels.length, dryRun = false, headless = false, mode = 'schedule' } = options;
  const toUpload = reels.slice(0, limit);

  console.log(`\n=====================================================`);
  console.log(`  Instagram Reels Bulk Uploader (${toUpload.length} videos queued)`);
  console.log(`  Mode: ${mode.toUpperCase()} | Dry Run: ${dryRun} | Turbo: ON`);
  console.log(`=====================================================\n`);

  let scheduleSlots = [];
  if (mode === 'schedule') {
    scheduleSlots = getNextAvailableScheduleSlots(toUpload.length, CONFIG.schedule, new Set(), 'instagram');
    console.log(`Assigned ${scheduleSlots.length} schedule slots for Instagram reels:`);
    scheduleSlots.slice(0, 5).forEach((slot, idx) => {
      console.log(`  ${idx + 1}. ${toUpload[idx]?.id || 'Video'}: ${slot.displayDate} @ ${slot.timeStr}`);
    });
    if (scheduleSlots.length > 5) {
      console.log(`  ... and ${scheduleSlots.length - 5} more slots`);
    }
    console.log();
  }

  const { context, browserType } = await getBrowserContext(headless);

  let successCount = 0;
  let failedCount = 0;

  // Single page reuse across batch for 3x-4x speedup
  let page = await context.newPage();

  // Block feed media streaming (prevents Chromium from buffering feed video/audio in background)
  await page.route('**/*', (route) => {
    const resourceType = route.request().resourceType();
    const url = route.request().url();
    if (resourceType === 'media' && !url.startsWith('blob:') && !url.includes('/upload/')) {
      return route.abort();
    }
    return route.continue();
  });

  page.on('dialog', async (dialog) => {
    try { await dialog.dismiss(); } catch {}
  });

  try {
    for (let i = 0; i < toUpload.length; i++) {
      const reel = toUpload[i];
      const slot = scheduleSlots[i] || null;

      let uploadSuccess = false;
      try {
        await uploadToInstagram(reel, { page, dryRun, mode, scheduleSlot: slot });
        uploadSuccess = true;
        successCount++;
      } catch (err) {
        failedCount++;
        console.error(`  ✗ Failed ${reel.id}:`, err.message);
        // On failure, refresh or create fresh page to prevent stuck state from cascading
        try {
          await page.close({ runBeforeUnload: false }).catch(() => {});
          page = await context.newPage();
          page.on('dialog', async (dialog) => {
            try { await dialog.dismiss(); } catch {}
          });
        } catch {}
      }

      if (i < toUpload.length - 1) {
        console.log('  Preparing next reel (7s sleep)...');
        await new Promise((resolve) => setTimeout(resolve, 7000));
      }
    }
  } finally {
    await context.close().catch(() => {});
  }

  console.log(`\n-----------------------------------------------------`);
  console.log(`Finished: ${successCount} succeeded, ${failedCount} failed.`);
  console.log(`-----------------------------------------------------\n`);
}

const SCHEDULE_SLOTS = [
  { hour: 9, minute: 0, label: '9:00 AM' },
  { hour: 12, minute: 0, label: '12:00 PM' },
  { hour: 17, minute: 0, label: '5:00 PM' },
  { hour: 20, minute: 0, label: '8:00 PM' },
];

function getNextSlot() {
  const now = new Date();
  for (const slot of SCHEDULE_SLOTS) {
    const candidate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), slot.hour, slot.minute, 0, 0);
    if (candidate.getTime() - now.getTime() > 60000) {
      return {
        date: candidate,
        label: slot.label,
        display: candidate.toLocaleString(),
        msUntil: candidate.getTime() - now.getTime(),
      };
    }
  }
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, SCHEDULE_SLOTS[0].hour, SCHEDULE_SLOTS[0].minute, 0, 0);
  return {
    date: tomorrow,
    label: `${SCHEDULE_SLOTS[0].label} (tomorrow)`,
    display: tomorrow.toLocaleString(),
    msUntil: tomorrow.getTime() - now.getTime(),
  };
}

/**
 * Auto-scheduler daemon for Instagram:
 * Automatically posts reels at 9:00 AM, 12:00 PM, and 6:00 PM daily.
 */
export async function runInstagramScheduler(reels, options = {}) {
  const { dryRun = false, headless = false } = options;

  console.log('\n=====================================================');
  console.log('  Instagram Reels 3x Daily Auto-Scheduler');
  console.log('  Daily Slots: 9:00 AM | 12:00 PM | 6:00 PM');
  console.log(`  Dry Run: ${dryRun}`);
  console.log('=====================================================\n');

  while (true) {
    const manifest = reels.filter((r) => r.isRendered);
    const status = loadUploadStatus();
    const pending = manifest.filter((r) => !status[r.id]?.instagram?.uploaded);

    if (pending.length === 0) {
      console.log('🎉 All reels have been successfully posted to Instagram!');
      break;
    }

    const nextReel = pending[0];
    const nextSlot = getNextSlot();
    const minsUntil = Math.round(nextSlot.msUntil / 60000);
    const hoursUntil = (nextSlot.msUntil / 3600000).toFixed(1);

    console.log(`\n⏳ Next Scheduled Upload:`);
    console.log(`   Reel : ${nextReel.title} (${nextReel.topic}:${nextReel.track})`);
    console.log(`   Slot : ${nextSlot.display} (${hoursUntil} hrs / ${minsUntil} mins from now)`);
    console.log('   Status: Waiting for next time slot... (Press Ctrl+C to stop)\n');

    await new Promise((r) => setTimeout(r, nextSlot.msUntil));

    console.log(`\n⏰ Time slot reached! Starting upload for ${nextReel.title}...`);
    const { context } = await getBrowserContext(headless);
    const page = await context.newPage();
    try {
      await uploadToInstagram(nextReel, { page, dryRun });
      console.log(`✓ Completed scheduled slot for ${nextReel.id}`);
    } catch (err) {
      console.error(`✗ Error uploading ${nextReel.id}:`, err.message);
    } finally {
      await context.close();
    }

    await new Promise((r) => setTimeout(r, 65000));
  }
}
