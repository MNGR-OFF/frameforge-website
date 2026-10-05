import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { site } from '../src/data/site.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = process.env.SITE_OUT_DIR || 'dist';
if (!/^(?:dist|verification\/[a-z0-9-]+)$/.test(output)) throw new Error('Unsafe output directory.');
const dist = join(root, output);
const origin = new URL(process.env.SITE_ORIGIN || 'https://frameforgeui.website');
const rawBase = process.env.SITE_BASE_PATH || '/';
const base = rawBase === '/' ? '/' : `/${rawBase.replace(/^\/+|\/+$/g, '')}/`;
const routes = ['', 'guide/', 'account/', 'privacy/', 'terms/', 'support/', 'credits/', 'changelog/', '404.html'];
const problems = [];
const files = [];
const htmlPages = new Map();
const assert = (condition, message) => { if (!condition) problems.push(message); };
const decode = value => value.replace(/&(?:amp|quot|apos|lt|gt|#39|#x27);/g, match => ({ '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>', '&#39;': "'", '&#x27;': "'" })[match]);
const attributes = tag => Object.fromEntries([...tag.matchAll(/\b([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)].map(match => [match[1].toLowerCase(), decode(match[2] ?? match[3] ?? match[4])]));
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map(match => attributes(match[0]));

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else files.push(path);
  }
}
try { await walk(dist); }
catch { console.error('Build output is missing. Run npm run build before npm run check.'); process.exit(1); }

const published = new Set(files.map(file => relative(dist, file).split(sep).join('/')));
const allowedDownloads = new Set(site.downloads.studio.enabled ? [site.downloads.studio.path] : []);
if (site.downloads.studio.enabled) {
  const artifact = await readFile(join(dist, site.downloads.studio.path));
  assert(site.downloads.studio.verified && createHash('sha256').update(artifact).digest('hex') === site.downloads.studio.sha256, 'Studio download does not match the verified release hash');
  assert(artifact.length === site.downloads.studio.bytes && artifact.includes(Buffer.from('<roblox')), 'Studio download is not the expected complete Roblox XML model');
}
const routeFile = path => path === '404.html' ? path : `${path}index.html`;
for (const file of files.filter(file => file.endsWith('.html'))) {
  const path = relative(dist, file).split(sep).join('/');
  const html = await readFile(file, 'utf8');
  htmlPages.set(path, { html, ids: new Set([...html.matchAll(/\bid\s*=\s*"([^"]+)"/gi)].map(match => decode(match[1]))) });
}
for (const route of routes) assert(published.has(routeFile(route)), `Missing public route: ${base}${route}`);

function localDestination(url, source, checkAnchor = true) {
  assert(url.pathname.startsWith(base), `${source}: local destination escapes configured base ${base}: ${url.pathname}`);
  if (!url.pathname.startsWith(base)) return;
  const path = decodeURIComponent(url.pathname.slice(base.length));
  const candidates = path.endsWith('/') || !path ? [`${path}index.html`] : [path, `${path}/index.html`];
  const destination = candidates.find(candidate => published.has(candidate));
  assert(!!destination, `${source}: missing local destination ${url.pathname}`);
  if (checkAnchor && destination && url.hash && htmlPages.has(destination)) {
    const anchor = decodeURIComponent(url.hash.slice(1));
    assert(htmlPages.get(destination).ids.has(anchor), `${source}: missing anchor ${url.pathname}${url.hash}`);
  }
}
let localReferences = 0;
let inlineJavascriptBytes = 0;
const externalUrls = new Set();
for (const [path, { html }] of htmlPages) {
  const route = path === '404.html' ? path : path.replace(/index\.html$/, '');
  const pageUrl = new URL(`${base}${route}`, origin);
  for (const script of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)) inlineJavascriptBytes += Buffer.byteLength(script[1]);
  assert(/<!doctype html>/i.test(html), `${path}: HTML doctype missing`);
  assert(/<html\b[^>]*\blang="en"/i.test(html), `${path}: document language missing`);
  assert((html.match(/<h1\b/gi) || []).length === 1, `${path}: expected one page heading`);
  assert(/<main\b[^>]*\bid="main"/i.test(html), `${path}: main landmark/skip target missing`);
  const links = tags(html, 'link');
  const meta = tags(html, 'meta');
  const canonical = links.find(link => link.rel === 'canonical')?.href;
  const ogUrl = meta.find(item => item.property === 'og:url')?.content;
  const social = meta.find(item => item.property === 'og:image')?.content;
  assert(canonical === pageUrl.href || (path === '404.html' && canonical === new URL(`${base}404/`, origin).href), `${path}: incorrect canonical URL (${canonical || 'missing'})`);
  assert(ogUrl === canonical, `${path}: social URL must match canonical`);
  assert(!!meta.find(item => item.name === 'description')?.content, `${path}: description missing`);
  if (route === 'privacy/' || route === 'terms/') {
    const noindex = meta.some(item => item.name === 'robots' && /\bnoindex\b/.test(item.content || ''));
    if (site.legal.publicationReady) {
      assert(!noindex && html.includes(`Effective date: ${site.legal.effectiveDate}`), `${path}: adopted policy must show its effective date and permit indexing`);
    } else {
      assert(noindex && /Review draft/.test(html) && !/Effective date:/i.test(html), `${path}: unadopted policy must remain visibly labelled as a draft, noindexed, and without an effective date`);
    }
  }
  assert(meta.some(item => item.name === 'twitter:card' && item.content === 'summary_large_image'), `${path}: social card missing`);
  assert(social === new URL(`${base}assets/social-preview.png`, origin).href, `${path}: social image uses incorrect origin/base`);
  const csp = meta.find(item => item['http-equiv']?.toLowerCase() === 'content-security-policy')?.content || '';
  assert(csp.includes("default-src 'self'") && csp.includes("object-src 'none'") && csp.includes("base-uri 'none'") && csp.includes("form-action 'none'"), `${path}: expected practical meta CSP missing`);
  assert(!/unsafe-inline|unsafe-eval/.test(csp), `${path}: CSP permits unsafe inline/eval execution`);
  assert(!/<(?:iframe|embed|object)\b/i.test(html), `${path}: unexpected third-party embed`);
  assert(!/\bon\w+\s*=/i.test(html), `${path}: inline event handler found`);
  for (const match of html.matchAll(/<(?:a|link|script|img|source|video|audio)\b[^>]*>/gi)) {
    const attrs = attributes(match[0]);
    const references = [attrs.href, attrs.src, attrs.poster].filter(Boolean);
    for (const ref of references) {
      if (ref.startsWith('data:') && /^<img\b/i.test(match[0])) continue;
      let url;
      try { url = new URL(ref, pageUrl); }
      catch { problems.push(`${path}: invalid URL ${ref}`); continue; }
      if (url.protocol === 'mailto:') {
        const query = [...url.searchParams];
        const permittedSubject = query.length === 0 || query.length === 1 && query[0][0] === 'subject' && query[0][1] === 'FrameForge privacy';
        assert(/^<a\b/i.test(match[0]) && url.pathname === site.legal.contact && !url.hash && permittedSubject && !/%0[ad]|[\r\n]/i.test(ref), `${path}: unexpected email destination or headers ${ref}`);
        continue;
      }
      if (url.origin === origin.origin) { localReferences++; localDestination(url, path); }
      else {
        assert(url.protocol === 'https:' && !url.username && !url.password && !url.port, `${path}: unsafe external URL ${ref}`);
        assert(!/^(localhost|127\.|0\.0\.0\.0|\[)/i.test(url.hostname), `${path}: nonpublic external URL ${ref}`);
        assert(!/[?&#](?:access_token|refresh_token|client_secret|connectionToken|pairingCode)=/i.test(ref), `${path}: credential-bearing URL`);
        externalUrls.add(url.href);
        if (attrs.target === '_blank') assert(/\bnoopener\b/.test(attrs.rel || ''), `${path}: external new-tab link needs noopener`);
        if (/^<(?:script|img|source|video|audio)\b/i.test(match[0])) problems.push(`${path}: external media/script request ${ref}`);
      }
    }
  }
  assert(!/\b(?:TODO|TBD|FIXME|YOUR_[A-Z_]+|REPLACE_ME|lorem ipsum)\b/i.test(html), `${path}: unresolved production placeholder`);
}

let javascriptBytes = inlineJavascriptBytes;
for (const file of files) {
  const path = relative(dist, file).split(sep).join('/');
  assert(allowedDownloads.has(path) || !/(?:^|\/)(?:\.env(?:\..*)?|\.git|node_modules|upload-service|account-service|database|backups?)(?:\/|$)|\.(?:sqlite|sqlite3|db|pem|key|map|mjs|ts|rbxmx|zip)$/i.test(path), `Private/source artifact must not be published: ${path}`);
  if (file.endsWith('.js')) javascriptBytes += (await stat(file)).size;
  if (/\.(?:html|js|css|json|xml|txt|svg|rbxmx)$/i.test(file)) {
    const text = await readFile(file, 'utf8');
    assert(!/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|FRAMEFORGE_TOKEN_KEY\s*[:=]|(?:access[_-]?token|refresh[_-]?token|client[_-]?secret|connectionToken|encryption[_-]?key)\s*[:=]\s*["'][A-Za-z0-9_+/.=-]{16,}/i.test(text), `Possible authorization secret in ${path}`);
  }
  if (file.endsWith('.css')) {
    const css = await readFile(file, 'utf8');
    assert(!/@import\b/i.test(css), `${path}: unexpected CSS import; bundle styles into the local build`);
    for (const match of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) {
      if (match[1].startsWith('data:')) continue;
      let url;
      try { url = new URL(match[1], new URL(`${base}${path}`, origin)); }
      catch { problems.push(`${path}: invalid CSS URL ${match[1]}`); continue; }
      assert(url.origin === origin.origin, `${path}: external CSS request ${match[1]}`);
      if (url.origin === origin.origin) localDestination(url, path, false);
    }
  }
}
assert(javascriptBytes <= 100 * 1024, `Client JavaScript exceeds the 100 KiB budget: ${javascriptBytes} bytes`);
assert(base !== '/' || origin.hostname !== 'frameforgeui.website' || published.has('CNAME'), 'Custom-domain CNAME missing');
assert(base === '/' || !published.has('CNAME'), 'Project preview must not include a custom-domain CNAME');
if (published.has('CNAME')) assert((await readFile(join(dist, 'CNAME'), 'utf8')).trim() === origin.hostname || base !== '/', 'CNAME does not match configured production domain');
assert(published.has('robots.txt') && published.has('sitemap.xml'), 'robots.txt and sitemap.xml are required');
if (published.has('robots.txt')) {
  const robots = await readFile(join(dist, 'robots.txt'), 'utf8');
  assert(robots.includes(new URL(`${base}sitemap.xml`, origin).href), 'robots sitemap URL has incorrect origin/base');
  assert(!/^\s*Disallow:\s*\S+/im.test(robots), 'Public routes must remain crawlable so policy noindex metadata can be read');
}
if (published.has('sitemap.xml')) {
  const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => decode(match[1]));
  for (const route of routes.filter(route => !['privacy/', 'terms/', '404.html'].includes(route))) assert(locations.includes(new URL(`${base}${route}`, origin).href), `Sitemap omits ${route || '/'}`);
  for (const route of ['privacy/', 'terms/']) assert(locations.includes(new URL(`${base}${route}`, origin).href) === site.legal.publicationReady, `Sitemap must match ${route} adoption status`);
  for (const location of locations) localDestination(new URL(location), 'sitemap.xml', false);
}
if (problems.length) { console.error(`Static verification failed (${problems.length}):\n${problems.map(problem => `- ${problem}`).join('\n')}`); process.exit(1); }
console.log(`Static verification passed: ${htmlPages.size} HTML routes, ${localReferences} local references, ${externalUrls.size} configured HTTPS destinations; ${javascriptBytes} bytes of client JavaScript. Legal draft language is deliberate; publication readiness is checked separately.`);
