import { chromium } from '@playwright/test';
import { writeFile, mkdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
if (!process.env.LIGHTHOUSE_MODULE) throw new Error('Set LIGHTHOUSE_MODULE to the installed Lighthouse core/index.js for this optional local audit.');
const { default: lighthouse } = await import(pathToFileURL(process.env.LIGHTHOUSE_MODULE).href);
const port = 9233;
const browser = await chromium.launch({ headless: true, args: [`--remote-debugging-port=${port}`] });
try {
  await mkdir('verification', { recursive: true });
  for (const formFactor of ['mobile', 'desktop']) {
    const flags = { port, output: 'json', logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'], ...(formFactor === 'desktop' ? { formFactor: 'desktop', screenEmulation: { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false } } : {}) };
    const result = await lighthouse('http://127.0.0.1:4321/', flags);
    await writeFile(`verification/lighthouse-${formFactor}.json`, result.report);
    console.log(`${formFactor}: ` + Object.entries(result.lhr.categories).map(([key,value]) => `${key} ${Math.round(value.score*100)}`).join(', '));
  }
} finally { await browser.close(); }
