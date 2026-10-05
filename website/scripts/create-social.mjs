import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const logo = await readFile(new URL('../public/assets/frameforge-logo.png', import.meta.url));
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#0B0F14"/><path d="M64 70h1072M64 560h1072" stroke="#2A3140"/><image href="data:image/png;base64,${logo.toString('base64')}" x="65" y="90" width="110" height="110"/><text x="190" y="161" fill="#EDF1F7" font-family="sans-serif" font-size="36" font-weight="600">FrameForge.</text><text x="70" y="300" fill="#EDF1F7" font-family="sans-serif" font-size="72" font-weight="600">Design in Figma.</text><text x="70" y="395" fill="#FF7A2F" font-family="sans-serif" font-size="72" font-weight="600">Forge it into Roblox.</text><text x="74" y="483" fill="#9DA7B8" font-family="sans-serif" font-size="25">Real layers. Editable UI. Room to build.</text><path d="M1010 278h110v110h-110zM982 306h110v110H982z" stroke="#FF7A2F" stroke-width="3" fill="none"/><text x="930" y="515" fill="#9DA7B8" font-family="monospace" font-size="18">FRAMEFORGEUI.WEBSITE</text></svg>`;
await mkdir(new URL('../public/assets/', import.meta.url), { recursive: true });
await writeFile(new URL('../public/assets/social-preview.svg', import.meta.url), svg);
await sharp(Buffer.from(svg)).png().toFile(fileURLToPath(new URL('../public/assets/social-preview.png', import.meta.url)));
console.log('Created original 1200×630 social preview.');
