import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, sep, extname } from 'node:path';
const root = fileURLToPath(new URL('../verification/project-dist/', import.meta.url));
const base = '/frameforge-preview/';
const types = { '.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8','.xml':'application/xml','.rbxmx':'application/xml' };
createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1:4322').pathname);
    if (!pathname.startsWith(base)) { response.writeHead(404); response.end(); return; }
    let file = resolve(root, pathname.slice(base.length));
    if (file !== resolve(root) && !file.startsWith(resolve(root) + sep)) { response.writeHead(403); response.end(); return; }
    try { if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html'); }
    catch { response.statusCode = 404; file = resolve(root, '404.html'); }
    const data = await readFile(file);
    response.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream');
    response.end(data);
  } catch { response.writeHead(404); response.end(); }
}).listen(4322, '127.0.0.1', () => console.log('Project-site static preview: http://127.0.0.1:4322/frameforge-preview/'));
