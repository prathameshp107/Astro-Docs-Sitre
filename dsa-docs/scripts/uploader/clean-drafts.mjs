import { getBrowserContext } from './browser.mjs';

/**
 * Remove all draft videos from YouTube Studio Shorts
 */
export async function deleteDraftShorts(options = {}) {
  const { headless = false } = options;

  console.log('=====================================================');
  console.log('  YouTube Studio — Clean Incomplete Draft Shorts');
  console.log('=====================================================\n');

  const { context } = await getBrowserContext(headless);
  const page = await context.newPage();

  try {
    console.log('Opening YouTube Studio Shorts content...');
    await page.goto('https://studio.youtube.com/channel/UCIqpAiJWJbDlgskpgKgPnQA/videos/short', {
      waitUntil: 'domcontentloaded',
    });
    await page.waitForTimeout(4000);

    // Check login
    if (page.url().includes('accounts.google.com') || (await page.locator('#sign-in-button').isVisible().catch(() => false))) {
      throw new Error('Not logged into YouTube Studio. Run `npm run upload:login` first.');
    }

    // Dismiss any modal/dialog that might be blocking the view
    const dismissBtn = page.locator('ytcp-dialog #close-button, [aria-label="Dismiss" i], button:has-text("Dismiss")').first();
    if (await dismissBtn.isVisible().catch(() => false)) {
      await dismissBtn.click().catch(() => {});
      await page.waitForTimeout(1000);
    }

    // Find all rows that are Drafts (indicated by "Edit draft" button or "Draft" text)
    const draftRows = page.locator('ytcp-video-row:has-text("Draft"), [role="row"]:has-text("Draft")');
    let draftCount = await draftRows.count();
    console.log(`Found ${draftCount} draft short(s) on page.`);

    if (draftCount === 0) {
      console.log('✓ No draft videos found! Everything is clean.');
      return { count: 0 };
    }

    console.log('Selecting all draft video checkboxes...');
    let selectedCount = 0;
    for (let i = 0; i < draftCount; i++) {
      const row = draftRows.nth(i);
      const rowCheckbox = row.locator('ytcp-checkbox-lit, #selection-checkbox, [role="checkbox"]').first();
      if (await rowCheckbox.isVisible().catch(() => false)) {
        await rowCheckbox.scrollIntoViewIfNeeded();
        await rowCheckbox.click();
        selectedCount++;
        await page.waitForTimeout(200);
      }
    }

    console.log(`Selected ${selectedCount} draft videos.`);
    await page.waitForTimeout(1500);

    // Look for "More actions" dropdown in the bulk action bar
    console.log('Opening "More actions" menu...');
    const moreActionsBtn = page.locator('ytcp-dropdown-trigger').filter({ hasText: 'More actions' }).first();
    await moreActionsBtn.waitFor({ state: 'visible', timeout: 10000 });
    await moreActionsBtn.click();
    await page.waitForTimeout(1500);

    // Click "Delete forever" in the dropdown
    console.log('Selecting "Delete forever"...');
    const deleteOption = page.locator('tp-yt-paper-item, ytcp-text-menu-item, [role="menuitem"]').filter({ hasText: 'Delete forever' }).first();
    await deleteOption.waitFor({ state: 'visible', timeout: 8000 });
    await deleteOption.click();
    await page.waitForTimeout(2000);

    // Check confirmation checkbox inside the deletion dialog
    console.log('Confirming permanent deletion dialog...');
    const dialogCheckbox = page.locator('ytcp-confirmation-dialog ytcp-checkbox-lit, ytcp-confirmation-dialog #confirm-checkbox, ytcp-confirmation-dialog tp-yt-paper-checkbox').first();
    await dialogCheckbox.waitFor({ state: 'visible', timeout: 10000 });
    await dialogCheckbox.click({ force: true });
    await page.waitForTimeout(1000);

    // Click final "Delete forever" confirm button
    const confirmDeleteBtn = page.locator('ytcp-confirmation-dialog #confirm-button, ytcp-confirmation-dialog button:has-text("Delete forever"), ytcp-confirmation-dialog ytcp-button:has-text("Delete forever")').first();
    await confirmDeleteBtn.waitFor({ state: 'visible', timeout: 8000 });
    await confirmDeleteBtn.click({ force: true });

    console.log('Waiting for deletion to process on YouTube servers...');
    await page.waitForTimeout(6000);

    console.log(`✓ Successfully deleted ${selectedCount} draft video(s)!`);
    return { count: selectedCount };
  } finally {
    await context.close();
  }
}

if (process.argv[1] && process.argv[1].endsWith('clean-drafts.mjs')) {
  deleteDraftShorts().catch(console.error);
}
