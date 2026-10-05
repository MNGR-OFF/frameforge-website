import { writeFile, mkdir, readFile, copyFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { site } from '../src/data/site.ts';
const root = fileURLToPath(new URL('../', import.meta.url));
const output = process.env.SITE_OUT_DIR || 'dist';
if (!/^(?:dist|verification\/[a-z0-9-]+)$/.test(output)) throw new Error('Unsafe output directory.');
const out = path.join(root, output);
const origin = new URL(process.env.SITE_ORIGIN || 'https://frameforgeui.website').origin;
const baseRaw = process.env.SITE_BASE_PATH || '/';
const base = baseRaw === '/' ? '/' : `/${baseRaw.replace(/^\/+|\/+$/g, '')}/`;
const routes = ['', 'guide/', 'account/', 'support/', 'credits/', 'changelog/'];
if (site.legal.publicationReady) routes.push('privacy/', 'terms/');
await mkdir(out, { recursive: true });
await writeFile(path.join(out, '.nojekyll'), '');
await writeFile(path.join(out, 'robots.txt'), `User-agent: *\nAllow: ${base}\nSitemap: ${origin}${base}sitemap.xml\n`);
await writeFile(path.join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(route => `  <url><loc>${origin}${base}${route}</loc></url>`).join('\n')}\n</urlset>\n`);
if (base === '/' && origin === 'https://frameforgeui.website') await writeFile(path.join(out, 'CNAME'), 'frameforgeui.website\n');
const notices = await readFile(path.join(root, 'public/THIRD-PARTY-NOTICES.txt'), 'utf8');
if (!notices.includes('Manrope')) throw new Error('Missing font notice');
await copyFile(path.join(root, 'node_modules/@fontsource-variable/manrope/LICENSE'), path.join(out, 'MANROPE-LICENSE.txt'));
async function countHtml(directory) {
  const counts = await Promise.all((await readdir(directory, { withFileTypes: true })).map(entry => entry.isDirectory() ? countHtml(path.join(directory, entry.name)) : Number(entry.name.endsWith('.html'))));
  return counts.reduce((total, count) => total + count, 0);
}
console.log(`Static output finalized: ${origin}${base} (${await countHtml(out)} HTML routes).`);
