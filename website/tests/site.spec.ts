import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

const rawBase = process.env.SITE_BASE_PATH || '/';
const base = rawBase === '/' ? '/' : `/${rawBase.replace(/^\/+|\/+$/g, '')}/`;
const url = (route = '') => `${base}${route}`;
const routes = ['', 'guide/', 'account/', 'privacy/', 'terms/', 'support/', 'credits/', 'changelog/', '404.html'];
const screenshotDirectory = resolve('verification/screenshots');
const overflow = (page: Page) => page.evaluate(() => ({ document: document.documentElement.scrollWidth, viewport: window.innerWidth }));

test('every public page supports direct navigation, has working links, and passes automated accessibility checks', async ({ page }) => {
  const faults: string[] = [];
  page.on('pageerror', error => faults.push(error.message));
  page.on('console', message => { if (message.type() === 'error') faults.push(message.text()); });
  for (const route of routes) {
    const response = await page.goto(url(route));
    expect(response?.status(), route).toBeLessThan(400);
    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('a.skip-link')).toHaveAttribute('href', '#main');
    const failedImages = await page.locator('img').evaluateAll(images => images.filter(image => image instanceof HTMLImageElement && (!image.complete || image.naturalWidth === 0)).map(image => image.getAttribute('src')));
    expect(failedImages, route).toEqual([]);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(results.violations.map(violation => ({ id: violation.id, impact: violation.impact, nodes: violation.nodes.map(node => node.target) })), route).toEqual([]);
  }
  expect(faults).toEqual([]);
});

test('essential pages and native mobile navigation work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 360, height: 800 } });
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(url(route));
    await expect(page.locator('main h1')).toBeVisible();
    const size = await overflow(page);
    expect(size.document, route).toBeLessThanOrEqual(size.viewport + 1);
  }
  await page.goto(url());
  await page.getByLabel('Navigation menu').click();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Guide', exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`${base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}guide/$`));
  await expect(page.locator('main h1')).toBeVisible();
  await context.close();
});

test('skip link and mobile menu support keyboard navigation and Escape', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto(url());
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  const menu = page.getByLabel('Navigation menu');
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Features', exact: true })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeHidden();
  await expect(menu).toBeFocused();
});

test('stripe demo responds to keyboard settings, keeps its clipping area, and resets', async ({ page }) => {
  await page.goto(url());
  const button = page.getByRole('button', { name: 'LET’S BUILD' });
  const movement = page.getByRole('slider', { name: 'Stripe movement' });
  const tilt = page.getByRole('slider', { name: 'Button tilt' });
  await movement.scrollIntoViewIfNeeded();
  await expect(movement).toBeEnabled();
  await movement.focus();
  await page.keyboard.press('End');
  await expect(movement).toHaveValue('120');
  await expect(page.locator('#movement-output')).toHaveText('120 px');
  await tilt.focus();
  await page.keyboard.press('Home');
  await expect(tilt).toHaveValue('-8');
  await expect(page.locator('#tilt-output')).toHaveText('-8°');
  await button.focus();
  await expect.poll(async () => page.locator('.demo-stripes').evaluate(element => new DOMMatrix(getComputedStyle(element).transform).m41)).toBeCloseTo(120, 0);
  const mask = await page.locator('.stripe-mask').evaluate(element => {
    const css = getComputedStyle(element);
    const bounds = element.getBoundingClientRect();
    const owner = element.parentElement!.getBoundingClientRect();
    return { overflow: css.overflow, radius: parseFloat(css.borderRadius), contained: bounds.left >= owner.left - 2 && bounds.right <= owner.right + 2 && bounds.top >= owner.top - 2 && bounds.bottom <= owner.bottom + 2 };
  });
  expect(mask.overflow).toBe('hidden');
  expect(mask.radius).toBeGreaterThan(0);
  expect(mask.contained).toBe(true);
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-demo-announcement]')).toContainText('does not create or import');
  await page.getByRole('button', { name: 'Reset example' }).click();
  await expect(movement).toHaveValue('48');
  await expect(tilt).toHaveValue('-3');
  await expect(page.getByText('Simplified layer hierarchy')).toBeVisible();
  await expect(page.locator('.layer-list')).toContainText('StripeMask');
});

test('motion can be paused, respects reduced motion, and stops offscreen or during a simulated hidden-tab event', async ({ page }) => {
  await page.goto(url());
  const core = page.locator('.forge-core');
  await expect.poll(() => core.evaluate(element => getComputedStyle(element).animationPlayState)).toBe('running');
  await page.getByRole('button', { name: 'Pause motion', exact: true }).click();
  await expect.poll(() => core.evaluate(element => getComputedStyle(element).animationPlayState)).toBe('paused');
  await page.getByRole('button', { name: 'Resume motion', exact: true }).click();
  await page.locator('.site-footer').scrollIntoViewIfNeeded();
  await expect.poll(() => core.evaluate(element => getComputedStyle(element).animationPlayState)).toBe('paused');
  await core.scrollIntoViewIfNeeded();
  await expect.poll(() => core.evaluate(element => getComputedStyle(element).animationPlayState)).toBe('running');
  await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); document.dispatchEvent(new Event('visibilitychange')); });
  await expect.poll(() => core.evaluate(element => getComputedStyle(element).animationPlayState)).toBe('paused');
  await page.evaluate(() => { delete (document as unknown as { hidden?: boolean }).hidden; document.dispatchEvent(new Event('visibilitychange')); });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(() => core.evaluate(element => getComputedStyle(element).animationName)).toBe('none');
  const button = page.getByRole('button', { name: 'LET’S BUILD' });
  await button.focus();
  await expect.poll(() => button.evaluate(element => getComputedStyle(element).transform)).toBe('none');
  await expect.poll(() => page.locator('.demo-stripes').evaluate(element => getComputedStyle(element).transform)).toBe('none');
});

test('layouts avoid horizontal overflow at mobile, tablet, desktop, landscape, and 200% zoom equivalent', async ({ page }) => {
  for (const viewport of [{ width: 360, height: 800 }, { width: 768, height: 1024 }, { width: 1024, height: 900 }, { width: 1440, height: 1000 }, { width: 740, height: 360 }, { width: 720, height: 500 }]) {
    await page.setViewportSize(viewport);
    for (const route of routes) {
      await page.goto(url(route));
      const size = await overflow(page);
      expect(size.document, `${route || '/'} at ${viewport.width}×${viewport.height}`).toBeLessThanOrEqual(size.viewport + 1);
    }
  }
});

test('404 gives a useful path back to the guide', async ({ page }) => {
  const response = await page.goto(url('this-page-does-not-exist/'));
  expect(response?.status()).toBe(404);
  await expect(page.locator('main h1')).toBeVisible();
  await expect(page.locator('main').getByRole('link', { name: /guide/i })).toBeVisible();
});

test('Studio download delivers the verified plugin and installation guidance', async ({ page }) => {
  await page.goto(url());
  const downloadEvent = page.waitForEvent('download');
  await page.locator('.hero').getByRole('link', { name: 'Download Studio plugin' }).click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe('FrameForge-0.1.7.rbxmx');
  const downloaded = await readFile((await download.path())!);
  expect(createHash('sha256').update(downloaded).digest('hex')).toBe('53f3ac43f29868c2006fdace12a9f4b237b84fcdb1980b1aa8833fd2aeb20347');
  await page.goto(url('guide/#studio-install'));
  await expect(page.getByRole('heading', { name: 'Install the Studio plugin file' })).toBeVisible();
  await expect(page.locator('#studio-install')).toContainText('Plugins → Plugins Folder');
});

test('capture calm desktop pages and mobile homepage for visual review', async ({ page }) => {
  await mkdir(screenshotDirectory, { recursive: true });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const route of routes) {
    await page.goto(url(route));
    await page.screenshot({ path: resolve(screenshotDirectory, `${route.replace(/\/$/, '').replace('.html', '') || 'home'}-desktop.png`), fullPage: true, animations: 'disabled' });
  }
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto(url());
  await page.screenshot({ path: resolve(screenshotDirectory, 'home-mobile.png'), fullPage: true, animations: 'disabled' });
});
