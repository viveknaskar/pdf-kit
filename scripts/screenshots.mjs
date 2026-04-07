/**
 * scripts/screenshots.mjs
 * Starts the Vite dev server, captures screenshots of the home page
 * and all tool views, then saves them to public/screenshots/.
 *
 * Usage: node scripts/screenshots.mjs
 */

import { createServer } from 'vite';
import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_DIR = resolve(ROOT, 'public/screenshots');
const PORT = 5199;
const BASE_URL = `http://localhost:${PORT}/pdf-kit/`;
const VIEWPORT = { width: 1280, height: 800 };

const TOOLS = [
  'merge', 'split', 'compress', 'inspector', 'extract',
  'pdf2jpg', 'pdf2png', 'img2pdf', 'html2pdf',
  'organize', 'addtext', 'pagenums',
  'watermark', 'encrypt', 'decrypt', 'rotate', 'deletepages',
];

mkdirSync(OUT_DIR, { recursive: true });

async function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

console.log('Starting Vite dev server...');
const server = await createServer({ configFile: resolve(ROOT, 'vite.config.js'), server: { port: PORT } });
await server.listen();

console.log('Launching Puppeteer...');
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport(VIEWPORT);

try {
  // Home screenshot
  console.log('Capturing: home');
  await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
  await wait(500);
  await page.screenshot({ path: `${OUT_DIR}/home.png` });

  // Tool screenshots
  for (const tool of TOOLS) {
    console.log(`Capturing: ${tool}`);
    await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
    await page.click(`[data-tool="${tool}"]`);
    await page.waitForSelector(`#tool-${tool}.active`);
    await wait(400);
    await page.screenshot({ path: `${OUT_DIR}/${tool}.png` });
  }

  console.log(`\nAll screenshots saved to public/screenshots/`);
} finally {
  await browser.close();
  await server.close();
}
