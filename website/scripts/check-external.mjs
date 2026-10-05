import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';
const urls = new Set();
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (file.endsWith('.html')) {
      const html = await readFile(file, 'utf8');
      for (const match of html.matchAll(/<a\b[^>]*href="(https:\/\/[^"]+)"/g)) {
        if (!match[1].startsWith(process.env.SITE_ORIGIN || 'https://frameforgeui.website')) urls.add(match[1].replaceAll('&amp;', '&'));
      }
    }
  }
}
await walk('dist');
const results = await Promise.all([...urls].map(async url => {
  try { const response = await fetch(url, { signal: AbortSignal.timeout(20000), headers: { 'User-Agent': 'FrameForge-Link-Check/1.0' } }); await response.body?.cancel(); return {url,status:response.status,destination:response.url}; }
  catch (error) { return {url,error:error.message}; }
}));
await mkdir('verification', { recursive: true });
await writeFile('verification/external-links.json', JSON.stringify({ checkedOn: '2026-10-05', results }, null, 2));
console.log(results.map(result => `${result.status ?? result.error} ${result.url}`).join('\n'));
console.log('Blocked automated requests do not establish that an official page is unavailable. Plugin listing installation URLs remain unverified and are not linked.');
