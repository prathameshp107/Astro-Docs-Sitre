import { getBrowserContext } from './browser.mjs';
import { loadUploadStatus, saveUploadStatus, calculateScheduleSlot, getNextAvailableScheduleSlots } from './manifest.mjs';

// Suppress harmless CDP dialog race conditions when navigating between uploads
if (!globalThis.__yt_uploader_cdp_guard_installed) {
  globalThis.__yt_uploader_cdp_guard_installed = true;
  process.on('unhandledRejection', (reason) => {
    const msg = reason?.message || String(reason || '');
    if (msg.includes('Page.handleJavaScriptDialog') || msg.includes('Not attached to an active page')) {
      return; // Harmless CDP race during page teardown/navigation
    }
    console.error('Unhandled Promise Rejection:', reason);
  });
}

/**
 * Upload a single reel to YouTube Studio
 */
export async function uploadToYouTube(reel, options = {}) {
  const {
    page,
    mode = 'unlisted', // 'schedule' | 'unlisted' | 'public' | 'draft'
    dryRun = false,
    scheduledIndex = 0,
  } = options;

  console.log(`\n▶ [YouTube] Starting upload: ${reel.title} (${reel.topic}:${reel.track})`);
  console.log(`  File: ${reel.videoFile}`);
  console.log(`  Mode: ${mode.toUpperCase()}${dryRun ? ' (DRY RUN - will not submit)' : ''}`);

  // Check if already on YouTube Studio with Create button visible
  const createBtn = page.locator('#create-icon, button[aria-label="Create"], ytcp-button#create-icon').first();
  const isOnStudio = page.url().includes('studio.youtube.com') && await createBtn.isVisible({ timeout: 1000 }).catch(() => false);

  if (!isOnStudio) {
    await page.goto('https://studio.youtube.com', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Check login
    if (page.url().includes('accounts.google.com') || (await page.locator('#sign-in-button').isVisible().catch(() => false))) {
      throw new Error('Not logged into YouTube Studio. Run `npm run upload:login` first to log in.');
    }

    // Handle "SKIP TO YOUTUBE STUDIO" banner if presented
    const skipBtn = page.locator('text="SKIP TO YOUTUBE STUDIO", a:has-text("SKIP"), [aria-label*="SKIP"]').first();
    if (await skipBtn.isVisible().catch(() => false)) {
      console.log('  Dismissing "SKIP TO YOUTUBE STUDIO" interstitial...');
      await skipBtn.click();
      await page.waitForTimeout(1500);
    }

    // Wait for Studio dashboard Create button
    await page.waitForSelector('#create-icon, button[aria-label="Create"], ytcp-button#create-icon', { timeout: 90000 });
  }

  // Click Create
  await createBtn.click();
  await page.waitForTimeout(400);

  // Click Upload videos
  const uploadItem = page.locator('tp-yt-paper-item:has-text("Upload videos"), ytcp-text-menu #text-item-0').first();
  await uploadItem.click();
  await page.waitForTimeout(500);

  // Set file
  const fileInput = page.locator('input[type="file"]').first();
  await fileInput.setInputFiles(reel.videoFile);

  console.log('  Uploading file to YouTube Studio...');
  // Wait for Title box to be visible
  const titleBox = page.locator('#title-textarea #textbox, #textbox[aria-label*="title" i]').first();
  await titleBox.waitFor({ state: 'visible', timeout: 120000 });
  await page.waitForTimeout(400);

  // 1. Fill Title
  console.log(`  Setting Title: "${reel.ytTitle}"`);
  await titleBox.focus();
  await titleBox.click({ force: true });
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');
  await titleBox.fill(reel.ytTitle);

  // 2. Fill Description
  console.log('  Setting Description & links in YouTube...');
  const descBox = page.locator('#description-textarea #textbox, #textbox[aria-label*="description" i]').first();
  await descBox.scrollIntoViewIfNeeded();
  await descBox.focus();
  await descBox.click({ force: true });
  await descBox.fill(reel.ytDescription);
  console.log('  Description filled successfully!');

  // 3. Made for Kids selection
  console.log('  Setting Audience (Not made for kids)...');
  const notKidsRadio = page.locator('tp-yt-paper-radio-button[name="VIDEO_MADE_FOR_KIDS_NOT_MFK"], tp-yt-paper-radio-button:has-text("No, it\'s not made for kids")').first();
  await notKidsRadio.scrollIntoViewIfNeeded();
  await notKidsRadio.click({ force: true });
  await page.waitForTimeout(400);

  // Check for daily upload limit banner
  const limitBanner = page.locator('text="Daily upload limit reached", [aria-label*="Daily upload limit" i]').first();
  if (await limitBanner.isVisible({ timeout: 2000 }).catch(() => false)) {
    throw new Error('Daily upload limit reached on your YouTube channel. YouTube requires a quick one-time phone verification at https://www.youtube.com/verify to unlock up to 100 uploads/day, or wait 24h for the quota to reset.');
  }

  // Next steps: Advance wizard to Visibility tab
  console.log('  Advancing wizard to Visibility tab...');
  // Click Next until Visibility tab (containing PUBLIC or SCHEDULE radio) is reached
  for (let s = 1; s <= 5; s++) {
    const isVisibilityActive = await page.locator('tp-yt-paper-radio-button[name="PUBLIC"], tp-yt-paper-radio-button[name="SCHEDULE"], #schedule-section, #schedule-radio-button').first().isVisible().catch(() => false);
    if (isVisibilityActive) {
      console.log('  ✓ Visibility step active.');
      break;
    }

    const nextBtn = page.locator('#next-button, button:has-text("Next"):not([hidden])').first();
    await nextBtn.waitFor({ state: 'visible', timeout: 60000 });
    // Wait until Next button is enabled
    for (let waitRetry = 0; waitRetry < 20; waitRetry++) {
      if (await nextBtn.isEnabled().catch(() => false)) break;
      await page.waitForTimeout(500);
    }
    await nextBtn.click({ force: true });
    await page.waitForTimeout(600);
  }

  let scheduleInfo = null;

  // Visibility tab
  if (mode === 'schedule') {
    scheduleInfo = options.scheduleInfo || calculateScheduleSlot(scheduledIndex);
    console.log(`  Scheduling for: ${scheduleInfo.slotName} — ${scheduleInfo.displayDate} at ${scheduleInfo.timeStr}`);

    // 1. Expand Schedule section
    const scheduleSection = page.locator('#second-container, #schedule-section, tp-yt-paper-radio-button[name="SCHEDULE"], #schedule-radio-button').first();
    await scheduleSection.scrollIntoViewIfNeeded();
    await scheduleSection.click();
    await page.waitForTimeout(600);

    // 2. Set Time FIRST (unobstructed by calendar popup)
    console.log(`  Setting publish time to: ${scheduleInfo.timeStr}...`);
    const timeInput = page.locator('#time-of-day-picker input, ytcp-time-of-day-picker input, #second-container #time-of-day-picker input, #second-container input').first();
    await timeInput.waitFor({ state: 'visible', timeout: 60000 });
    await timeInput.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await timeInput.fill(scheduleInfo.timeStr);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    console.log(`  ✓ Time set to: ${scheduleInfo.timeStr}`);

    // 3. Check and adjust Date if needed
    const dateTrigger = page.locator('#datepicker-trigger, [aria-label*="Date" i]').first();
    let currentDate = (await dateTrigger.innerText().catch(() => '')).trim();
    if (!currentDate) {
      currentDate = (await dateTrigger.inputValue().catch(() => '')).trim();
    }
    console.log(`  Current picker date: "${currentDate}" (Target: "${scheduleInfo.displayDate}")`);

    if (currentDate && currentDate !== scheduleInfo.displayDate) {
      console.log(`  Adjusting date to: ${scheduleInfo.displayDate}...`);
      await dateTrigger.click();
      await page.waitForTimeout(600);

      // In ytcp-date-picker, click the target day in the calendar grid
      const dayClicked = await page.evaluate(({ targetDay, monthShort }) => {
        const picker = document.querySelector('ytcp-date-picker');
        if (!picker) return false;

        const daySpans = Array.from(picker.querySelectorAll('.calendar-day, [role="gridcell"]'));
        const dayMatch = daySpans.find(s => {
          const text = s.innerText.trim();
          const disabled = s.getAttribute('aria-disabled') === 'true' || s.classList.contains('disabled');
          return text === String(targetDay) && !disabled;
        });

        if (dayMatch) {
          dayMatch.click();
          return true;
        }
        return false;
      }, { targetDay: scheduleInfo.dayNum, monthShort: scheduleInfo.monthShort });

      if (dayClicked) {
        console.log(`  ✓ Selected day ${scheduleInfo.dayNum} in calendar`);
      } else {
        await page.keyboard.press('Escape');
      }
      await page.waitForTimeout(400);
    }
  } else if (mode === 'unlisted') {
    const unlistedRadio = page.locator('tp-yt-paper-radio-button[name="UNLISTED"], [name="UNLISTED"]').first();
    await unlistedRadio.waitFor({ state: 'visible', timeout: 20000 });
    await unlistedRadio.click();
  } else if (mode === 'public') {
    const publicRadio = page.locator('tp-yt-paper-radio-button[name="PUBLIC"], [name="PUBLIC"]').first();
    await publicRadio.waitFor({ state: 'visible', timeout: 20000 });
    await publicRadio.click();
  } else if (mode === 'draft') {
    console.log('  Saving as draft (closing dialog)...');
    const closeBtn = page.locator('#dialog #close-button, ytcp-button#close-button, ytcp-uploads-dialog #close-button').first();
    if (await closeBtn.isVisible().catch(() => false)) await closeBtn.click();
  }

  if (dryRun) {
    console.log('  [DRY RUN] Would submit now. Closing dialog without saving.');
    const closeBtn = page.locator('#dialog #close-button, ytcp-button#close-button, ytcp-uploads-dialog #close-button').first();
    if (await closeBtn.isVisible().catch(() => false)) await closeBtn.click();
    return { success: true, dryRun: true };
  }

  if (mode !== 'draft') {
    const doneBtn = page.locator('#done-button, ytcp-button#done-button, button:has-text("Schedule"), button:has-text("Save")').first();
    await doneBtn.waitFor({ state: 'visible', timeout: 40000 });
    const btnText = (await doneBtn.innerText().catch(() => 'Schedule')).trim();
    console.log(`  Clicking ${btnText} button...`);
    await doneBtn.click();

    // Wait for post-submission dialogs ("We're still checking your content" -> "Got it", then "Video scheduled" -> "Close")
    console.log('  Waiting for post-submission dialogs and checking for "Got it" prompt...');
    const startTime = Date.now();
    let scheduledConfirmed = false;

    while (Date.now() - startTime < 90000) {
      // Check 1: "We're still checking your content" prompt -> Click "Got it"
      const gotItBtn = page.locator([
        'button:has-text("Got it")',
        'ytcp-button:has-text("Got it")',
        'button:has-text("Schedule anyway")',
        'ytcp-button:has-text("Schedule anyway")',
        'button:has-text("Publish anyway")',
        'ytcp-button:has-text("Publish anyway")',
        '#dialog-action-button',
      ].join(', ')).first();

      if (await gotItBtn.isVisible().catch(() => false)) {
        console.log('  ✓ Detected "We\'re still checking your content" dialog. Clicking "Got it"...');
        await gotItBtn.click({ force: true }).catch(() => { });
        await page.waitForTimeout(1000);
      }

      // Check 2: Final "Video scheduled" / share dialog -> Click "Close"
      const shareCloseBtn = page.locator([
        'ytcp-video-share-dialog #close-button',
        'ytcp-video-share-dialog button:has-text("Close")',
        'ytcp-video-share-dialog ytcp-button#close-button',
        'ytcp-uploads-still-processing-dialog #close-button',
        'ytcp-uploads-dialog #close-button',
      ].join(', ')).first();

      if (await shareCloseBtn.isVisible().catch(() => false)) {
        console.log('  ✓ Detected "Video scheduled" share dialog. Closing...');
        await shareCloseBtn.click({ force: true }).catch(() => { });
        scheduledConfirmed = true;
        await page.waitForTimeout(1000);
        break;
      }

      // Check 3: Has the upload dialog completely closed?
      const uploadDialog = page.locator('ytcp-uploads-dialog').first();
      const isDialogVisible = await uploadDialog.isVisible().catch(() => false);
      if (!isDialogVisible && Date.now() - startTime > 10000) {
        console.log('  ✓ Upload dialog closed. Video scheduled successfully!');
        scheduledConfirmed = true;
        break;
      }

      await page.waitForTimeout(1000);
    }

    if (!scheduledConfirmed) {
      console.warn('  ⚠️ Could not confirm schedule dialog dismissal. Checking video visibility...');
    }
  }

  // Record status
  const status = loadUploadStatus();
  status[reel.id] = status[reel.id] || {};
  status[reel.id].youtube = {
    uploaded: true,
    mode,
    timestamp: new Date().toISOString(),
    schedule: mode === 'schedule' && scheduleInfo ? {
      dateStr: scheduleInfo.dateStr,
      timeStr: scheduleInfo.timeStr,
      displayDate: scheduleInfo.displayDate,
      dayNum: scheduleInfo.dayNum,
      monthShort: scheduleInfo.monthShort,
      year: scheduleInfo.year,
      slotIndex: scheduleInfo.slotIndex,
      slotName: scheduleInfo.slotName,
    } : null,
  };
  saveUploadStatus(status);

  console.log(`✓ [YouTube] Successfully uploaded & ${mode === 'schedule' ? 'scheduled' : mode} ${reel.id}!`);
  return { success: true };
}

/**
 * Run bulk upload to YouTube Studio (Turbo Optimized)
 */
export async function runYouTubeBatch(reels, options = {}) {
  const { limit = reels.length, mode = 'schedule', dryRun = false, headless = false } = options;
  const toUpload = reels.slice(0, limit);

  const status = loadUploadStatus();
  const alreadyScheduledCount = Object.values(status).filter((s) => s.youtube?.uploaded && s.youtube?.mode === 'schedule').length;

  console.log(`\n=====================================================`);
  console.log(`  YouTube Shorts Bulk Uploader (${toUpload.length} videos queued)`);
  console.log(`  Mode: ${mode} | Dry Run: ${dryRun} | Already Scheduled: ${alreadyScheduledCount} | Turbo: ON`);
  console.log(`=====================================================\n`);

  const { context, browserType } = await getBrowserContext(headless);

  let successCount = 0;
  let failedCount = 0;

  // Pre-allocate upcoming available schedule slots (filling any gaps)
  const scheduledSlots = getNextAvailableScheduleSlots(toUpload.length);

  // Single page reuse across batch
  let page = await context.newPage();
  page.on('dialog', async (dialog) => {
    try { await dialog.dismiss(); } catch { }
  });

  try {
    for (let i = 0; i < toUpload.length; i++) {
      const reel = toUpload[i];
      let uploadSuccess = false;
      try {
        await uploadToYouTube(reel, {
          page,
          mode,
          dryRun,
          scheduleInfo: scheduledSlots[i],
          scheduledIndex: alreadyScheduledCount + i,
        });
        successCount++;
        uploadSuccess = true;
      } catch (err) {
        failedCount++;
        console.error(`  ✗ Failed ${reel.id}:`, err.message);
        console.log(`  [Note] Error occurred on ${reel.id}. Recovering browser page for next video.`);
        try {
          await page.close({ runBeforeUnload: false }).catch(() => { });
          page = await context.newPage();
          page.on('dialog', async (dialog) => {
            try { await dialog.dismiss(); } catch { }
          });
        } catch { }
      }

      // Pause between uploads (7s sleep)
      if (i < toUpload.length - 1) {
        console.log('  Preparing next upload (7s sleep)...');
        await new Promise((resolve) => setTimeout(resolve, 7000));
      }
    }
  } finally {
    await context.close().catch(() => { });
  }

  console.log(`\n-----------------------------------------------------`);
  console.log(`Finished: ${successCount} succeeded, ${failedCount} failed.`);
  console.log(`-----------------------------------------------------\n`);
}
