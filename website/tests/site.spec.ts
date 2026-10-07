import { test, expect, type Locator, type Page } from '@playwright/test';
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
const figmaPluginUrl = 'https://www.figma.com/community/plugin/1688245182223969540';
const studioStoreUrl = 'https://create.roblox.com/store/asset/90693215219484/FrameForge';
const studioDownloadPath = 'downloads/FrameForge-0.1.7.rbxmx';

async function expectStudioChoices(choice: Locator) {
  await expect(choice.locator('summary')).toHaveAccessibleName('Get Studio plugin');
  const options = choice.locator('.studio-choice-options');
  await expect(options).toBeVisible();
  await expect(options.getByRole('link')).toHaveCount(2);
  const store = options.getByRole('link', { name: /Roblox Creator Store/ });
  const download = options.getByRole('link', { name: /Download \.rbxmx/ });
  await expect(store).toHaveAttribute('href', studioStoreUrl);
  await expect(store).toHaveAttribute('target', '_blank');
  await expect(store).toHaveAttribute('rel', 'noopener noreferrer');
  await expect(download).toHaveAttribute('href', url(studioDownloadPath));
  expect(await download.getAttribute('download')).not.toBeNull();
  return { options, store, download };
}

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
  const heroChoice = page.locator('.hero details.studio-choice');
  await heroChoice.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expectStudioChoices(heroChoice);
  await heroChoice.locator('summary').click();
  await expect(heroChoice.locator('.studio-choice-options')).toBeHidden();
  await page.getByLabel('Navigation menu').click();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Guide', exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`${base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}guide/$`));
  await expect(page.locator('main h1')).toBeVisible();
  const guideChoice = page.locator('#installation details.studio-choice');
  await guideChoice.locator('summary').click();
  await expectStudioChoices(guideChoice);
  await guideChoice.locator('summary').click();
  await expect(guideChoice.locator('.studio-choice-options')).toBeHidden();
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
  const choice = page.locator('.hero details.studio-choice');
  await choice.locator('summary').click();
  const { download: downloadLink } = await expectStudioChoices(choice);
  const downloadEvent = page.waitForEvent('download');
  await downloadLink.click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe('FrameForge-0.1.7.rbxmx');
  const downloaded = await readFile((await download.path())!);
  expect(createHash('sha256').update(downloaded).digest('hex')).toBe('53f3ac43f29868c2006fdace12a9f4b237b84fcdb1980b1aa8833fd2aeb20347');
  await expect(choice).toHaveJSProperty('open', false);
  await page.goto(url('guide/#studio-install'));
  await expect(page.getByRole('heading', { name: 'Install the Studio plugin file' })).toBeVisible();
  await expect(page.locator('#studio-install')).toContainText('Plugins → Plugins Folder');
});

test('Studio choices support keyboard dismissal, focus changes, and a separate store tab', async ({ page }) => {
  const storeRequests: string[] = [];
  await page.context().route(studioStoreUrl, async route => {
    storeRequests.push(route.request().url());
    await route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><title>Studio store test</title><h1>Store destination</h1>' });
  });
  await page.goto(url());
  await expect(page.locator('.hero').getByRole('link', { name: 'Install for Figma', exact: true })).toHaveAttribute('href', figmaPluginUrl);
  const choice = page.locator('.hero details.studio-choice');
  const summary = choice.locator('summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  const { options, store, download } = await expectStudioChoices(choice);
  const accessibility = await new AxeBuilder({ page }).include('.hero details.studio-choice').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  expect(accessibility.violations.map(violation => ({ id: violation.id, nodes: violation.nodes.map(node => node.target) }))).toEqual([]);
  await page.keyboard.press('Tab');
  await expect(store).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(download).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(options).toBeHidden();
  await expect(summary).toBeFocused();

  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await expect(download).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(options).toBeHidden();
  expect(await page.evaluate(() => document.activeElement?.closest('.studio-choice') === null)).toBe(true);

  await summary.click();
  await page.locator('main h1').click();
  await expect(options).toBeHidden();
  await summary.click();
  const sectionChoice = page.locator('.studio-download details.studio-choice');
  await sectionChoice.locator('summary').click();
  await expect(sectionChoice).toHaveJSProperty('open', true);
  await expect(choice).toHaveJSProperty('open', false);
  await expect(page.locator('.studio-choice[open]')).toHaveCount(1);

  await summary.click();
  const popupEvent = page.waitForEvent('popup');
  await store.click();
  const popup = await popupEvent;
  await expect(popup).toHaveURL(studioStoreUrl);
  await expect(popup.getByRole('heading', { name: 'Store destination' })).toBeVisible();
  expect(storeRequests).toEqual([studioStoreUrl]);
  await expect(choice).toHaveJSProperty('open', false);
  await expect(page).toHaveURL(url());
  await popup.close();
});

test('open Studio choices fit mobile, zoom-equivalent layouts, the guide, and the compact footer', async ({ page }) => {
  for (const viewport of [{ width: 360, height: 800 }, { width: 720, height: 500 }]) {
    await page.setViewportSize(viewport);
    for (const [route, scopes] of [['', ['.hero', '.studio-download', '.site-footer']], ['guide/', ['#installation', '.site-footer']]] as const) {
      await page.goto(url(route));
      for (const scope of scopes) {
        const choice = page.locator(`${scope} details.studio-choice`);
        await choice.locator('summary').click();
        const { options } = await expectStudioChoices(choice);
        await options.scrollIntoViewIfNeeded();
        const bounds = await options.boundingBox();
        expect(bounds, `${route || '/'} ${scope} at ${viewport.width}px`).not.toBeNull();
        expect(bounds!.x).toBeGreaterThanOrEqual(-1);
        expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(viewport.width + 1);
        expect(bounds!.y).toBeGreaterThanOrEqual(-1);
        expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(viewport.height + 1);
        const size = await overflow(page);
        expect(size.document, `${route || '/'} ${scope} at ${viewport.width}px`).toBeLessThanOrEqual(size.viewport + 1);
        await choice.locator('summary').click();
      }
    }
  }
});

test('capture calm desktop pages and mobile homepage for visual review', async ({ page }) => {
  await mkdir(screenshotDirectory, { recursive: true });
  const installReviewDirectory = resolve('.impeccable/review');
  await mkdir(installReviewDirectory, { recursive: true });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const route of routes) {
    await page.goto(url(route));
    await page.screenshot({ path: resolve(screenshotDirectory, `${route.replace(/\/$/, '').replace('.html', '') || 'home'}-desktop.png`), fullPage: true, animations: 'disabled' });
  }
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto(url());
  await page.screenshot({ path: resolve(screenshotDirectory, 'home-mobile.png'), fullPage: true, animations: 'disabled' });
  for (const [name, viewport] of [['desktop', { width: 1440, height: 1000 }], ['mobile', { width: 360, height: 800 }]] as const) {
    await page.setViewportSize(viewport);
    await page.goto(url());
    await page.locator('.hero .studio-choice > summary').click();
    await page.screenshot({ path: resolve(installReviewDirectory, `${name}.png`), animations: 'disabled' });
    await page.locator('.studio-download .studio-choice > summary').click();
    await page.locator('.studio-download').screenshot({ path: resolve(installReviewDirectory, `download-${name}.png`), animations: 'disabled' });
    await page.locator('.site-footer .studio-choice > summary').click();
    await page.screenshot({ path: resolve(installReviewDirectory, `footer-${name}.png`), animations: 'disabled' });
    await page.goto(url('guide/#installation'));
    await page.locator('#installation .studio-choice > summary').click();
    await page.locator('#installation .studio-choice-options').scrollIntoViewIfNeeded();
    if (name === 'desktop') {
      await page.screenshot({ path: resolve(installReviewDirectory, `guide-${name}.png`), animations: 'disabled' });
    } else {
      await page.locator('#installation').screenshot({ path: resolve(installReviewDirectory, `guide-${name}.png`), animations: 'disabled' });
    }
  }
});
