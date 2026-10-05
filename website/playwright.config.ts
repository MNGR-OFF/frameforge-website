import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  timeout: 45_000,
  expect: { timeout: 8_000 },
  reporter: [['list'], ['json', { outputFile: 'verification/browser-results.json' }], ['html', { outputFolder: 'verification/browser-report', open: 'never' }]],
  outputDir: 'verification/test-results',
  use: {
    baseURL: process.env.PREVIEW_ORIGIN || 'http://127.0.0.1:4321',
    ...devices['Desktop Chrome'],
    viewport: { width: 1440, height: 1000 },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  },
  webServer: {
    command: `node ./node_modules/astro/bin/astro.mjs preview --host 127.0.0.1 --port ${new URL(process.env.PREVIEW_ORIGIN || 'http://127.0.0.1:4321').port || '4321'}`,
    url: `${process.env.PREVIEW_ORIGIN || 'http://127.0.0.1:4321'}${process.env.SITE_BASE_PATH || '/'}`,
    reuseExistingServer: true,
    timeout: 90_000
  }
});
