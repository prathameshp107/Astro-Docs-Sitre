import { chromium } from 'playwright';
import { existsSync, mkdirSync } from 'node:fs';
import { CONFIG } from './config.mjs';

/**
 * Launch a persistent browser context using local Chrome or Chromium.
 * Disables bot-detection flags so Google/YouTube and Instagram logins succeed.
 */
export async function getBrowserContext(headless = false) {
  if (!existsSync(CONFIG.sessionDir)) {
    mkdirSync(CONFIG.sessionDir, { recursive: true });
  }

  const options = {
    headless,
    viewport: CONFIG.viewport,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-infobars',
    ],
    ignoreDefaultArgs: ['--enable-automation'],
  };

  // Try Google Chrome first (genuine browser = lowest bot suspicion)
  try {
    const ctx = await chromium.launchPersistentContext(CONFIG.sessionDir, {
      ...options,
      channel: 'chrome',
    });
    return { context: ctx, browserType: 'Google Chrome' };
  } catch {
    // Fall back to Playwright's bundled Chromium
    const ctx = await chromium.launchPersistentContext(CONFIG.sessionDir, options);
    return { context: ctx, browserType: 'Chromium' };
  }
}
