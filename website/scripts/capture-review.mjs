import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
const directory = fileURLToPath(new URL('../verification/screenshots/', import.meta.url));
const browser = await chromium.launch();
const page = await browser.newPage({ reducedMotion: 'reduce' });
await mkdir(directory, { recursive: true });
for (const [name, width, height, route] of [['home-desktop',1440,1000,''],['home-mobile',360,800,''],['guide-desktop',1440,1000,'guide/']]) {
  await page.setViewportSize({ width, height });
  await page.goto(`http://127.0.0.1:4321/${route}`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(directory, `${name}.png`), fullPage: true, animations: 'disabled' });
}
await browser.close();
