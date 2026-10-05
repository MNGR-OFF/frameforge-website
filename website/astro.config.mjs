import { defineConfig } from 'astro/config';

const origin = process.env.SITE_ORIGIN || 'https://frameforgeui.website';
const originUrl = new URL(origin);
if (originUrl.protocol !== 'https:' || originUrl.pathname !== '/' || originUrl.username || originUrl.password || originUrl.search || originUrl.hash) {
  throw new Error('SITE_ORIGIN must be a clean HTTPS origin.');
}
const rawBase = process.env.SITE_BASE_PATH || '/';
if (!/^\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]*\/?$/.test(rawBase)) {
  throw new Error('SITE_BASE_PATH must be / or a safe repository path.');
}
const base = rawBase === '/' ? '/' : `/${rawBase.replace(/^\/+|\/+$/g, '')}/`;
const output = process.env.SITE_OUT_DIR || 'dist';
if (!/^(?:dist|verification\/[a-z0-9-]+)$/.test(output)) throw new Error('SITE_OUT_DIR must stay inside dist or verification.');

export default defineConfig({
  site: originUrl.origin,
  base,
  output: 'static',
  outDir: `./${output}`,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'never' },
  devToolbar: { enabled: false },
  markdown: { syntaxHighlight: false },
  security: {
    csp: {
      directives: [
        "default-src 'self'", "img-src 'self' data:", "font-src 'self'",
        "connect-src 'self'", "object-src 'none'", "base-uri 'none'",
        "form-action 'none'", "upgrade-insecure-requests"
      ],
      scriptDirective: { resources: ["'self'"] },
      styleDirective: { resources: ["'self'"] }
    }
  }
});
