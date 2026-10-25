import readline from 'node:readline';
import { getBrowserContext } from './browser.mjs';

function waitForKeyPress(promptText) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(promptText, () => {
      rl.close();
      resolve();
    });
  });
}

export async function loginFlow() {
  console.log('=====================================================');
  console.log('  Social Media Uploader — Authentication Setup');
  console.log('=====================================================\n');
  console.log('Launching browser window using your local browser profile...\n');

  const { context, browserType } = await getBrowserContext(false);
  console.log(`Browser running: ${browserType}`);

  const pageYT = await context.newPage();
  console.log('Opening YouTube Studio...');
  await pageYT.goto('https://studio.youtube.com', { waitUntil: 'domcontentloaded' });

  const pageIG = await context.newPage();
  console.log('Opening Instagram...');
  await pageIG.goto('https://www.instagram.com', { waitUntil: 'domcontentloaded' });

  const pageReddit = await context.newPage();
  console.log('Opening Reddit...');
  await pageReddit.goto('https://www.reddit.com/login', { waitUntil: 'domcontentloaded' });

  console.log('\n-----------------------------------------------------');
  console.log('  PLEASE COMPLETE LOGIN IN THE OPENED BROWSER WINDOW:');
  console.log('  1. Tab 1: YouTube Studio');
  console.log('  2. Tab 2: Instagram');
  console.log('  3. Tab 3: Reddit');
  console.log('-----------------------------------------------------\n');

  await waitForKeyPress('Press [Enter] in this terminal when you have finished logging in...');

  console.log('\nSaving session cookies and profile state to .browser-session/...');
  await context.close();
  console.log('✓ Login state saved successfully! You are ready to upload & post.');
}

export async function loginReddit() {
  console.log('=====================================================');
  console.log('  Reddit Authentication Setup');
  console.log('=====================================================\n');

  const { context } = await getBrowserContext(false);
  const page = await context.newPage();
  console.log('Opening Reddit login page...');
  await page.goto('https://www.reddit.com/login', { waitUntil: 'domcontentloaded' });

  console.log('\n-----------------------------------------------------');
  console.log('  PLEASE LOG INTO REDDIT IN THE OPENED BROWSER WINDOW');
  console.log('-----------------------------------------------------\n');

  await waitForKeyPress('Press [Enter] in this terminal when you have logged in...');
  await context.close();
  console.log('✓ Reddit login saved successfully to .browser-session/!\n');
}

export async function loginInstagram() {
  console.log('=====================================================');
  console.log('  Instagram Account Setup (Switch & Discard Old Account)');
  console.log('=====================================================\n');

  // 1. Reset Instagram status in .upload-status.json
  const { loadUploadStatus, saveUploadStatus } = await import('./manifest.mjs');
  const status = loadUploadStatus();
  let resetCount = 0;
  for (const reelId of Object.keys(status)) {
    if (status[reelId]?.instagram) {
      delete status[reelId].instagram;
      resetCount++;
    }
  }
  saveUploadStatus(status);
  console.log(`✓ Reset Instagram upload history for ${resetCount} video(s) in .upload-status.json.`);
  console.log('  All 80 reels are now ready for your new Instagram account.\n');

  // 2. Launch browser and selectively clear Instagram cookies and storage
  console.log('Launching browser to log into the new Instagram account...');
  const { context, browserType } = await getBrowserContext(false);
  console.log(`Browser running: ${browserType}`);

  try {
    const allCookies = await context.cookies();
    const nonIgCookies = allCookies.filter(c => !c.domain.includes('instagram.com'));
    await context.clearCookies();
    if (nonIgCookies.length > 0) {
      await context.addCookies(nonIgCookies);
    }
    console.log('✓ Cleared old Instagram session cookies (preserved YouTube & Reddit logins).');
  } catch (err) {
    console.warn('  Warning while clearing cookies:', err.message);
  }

  const page = await context.newPage();
  console.log('Navigating to Instagram to purge old storage...');
  try {
    await page.goto('https://www.instagram.com', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.evaluate(() => {
      try { localStorage.clear(); } catch { }
      try { sessionStorage.clear(); } catch { }
    });
  } catch { }

  console.log('Opening Instagram login page...');
  await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'domcontentloaded', timeout: 60000 });

  console.log('\n-----------------------------------------------------');
  console.log('  PLEASE LOG INTO YOUR NEW INSTAGRAM ACCOUNT IN THE');
  console.log('  OPENED BROWSER WINDOW.');
  console.log('-----------------------------------------------------\n');

  await waitForKeyPress('Press [Enter] in this terminal when you have finished logging into your new Instagram account...');

  // Check login success & detect new username
  try {
    const profileHandle = await page.evaluate(() => {
      const profileLink = document.querySelector('a[href^="/"][role="link"]:has(img), a[href*="/direct/inbox/"] ~ a');
      const href = profileLink ? profileLink.getAttribute('href') : '';
      return href ? href.replace(/\//g, '') : null;
    }).catch(() => null);

    if (profileHandle) {
      console.log(`✓ Verified active Instagram account: @${profileHandle}`);
    }
  } catch { }

  console.log('\nSaving new Instagram session cookies to .browser-session/...');
  await context.close();
  console.log('✓ New Instagram account saved successfully! You are ready to upload & schedule.\n');
}

if (process.argv[1] && process.argv[1].endsWith('login.mjs')) {
  loginFlow().catch(console.error);
}
