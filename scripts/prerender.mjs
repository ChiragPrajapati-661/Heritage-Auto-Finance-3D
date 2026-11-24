import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { chromium } from 'playwright';

const routes = [
  '/', '/services/new-car-finance', '/services/used-car-finance',
  '/services/car-refinance', '/services/commercial-vehicle-finance',
  '/services/insurance-assistance', '/emi-calculator', '/about',
  '/contact', '/privacy-policy', '/terms-and-conditions',
];
const root = process.cwd();
const dist = resolve(root, 'dist');
const server = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], {
  cwd: root, stdio: 'ignore', shell: process.platform === 'win32',
});
let browser;
try {
  let ready = false;
  for (let i = 0; i < 40; i++) {
    try { const r = await fetch('http://127.0.0.1:4173/'); if (r.ok) { ready = true; break; } } catch {}
    await delay(500);
  }
  if (!ready) throw new Error('Vite preview server did not become ready.');
  browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1365, height: 900 } });
  page.on('pageerror', error => console.warn('Browser page error:', error.message));

  for (const route of routes) {
    const response = await page.goto(`http://127.0.0.1:4173${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    if (!response?.ok()) throw new Error(`Route failed to load: ${route} (${response?.status()})`);
    await page.locator('#root').waitFor({ state: 'attached', timeout: 10000 });
    await page.waitForFunction(() => {
      const root = document.querySelector('#root');
      return !!root?.firstElementChild && document.title.includes('Heritage Auto Finance');
    }, { timeout: 15000 });
    await delay(1100);
    const title = await page.title();
    const rootHtml = await page.locator('#root').innerHTML();
    if (!rootHtml || rootHtml.trim().length < 100) throw new Error(`Rendered content is unexpectedly empty: ${route}`);
    const source = await readFile(join(dist, 'index.html'), 'utf8');
    const output = source.replace('<div id="root"></div>', `<div id="root">${rootHtml}</div>`);
    if (output === source) throw new Error('Could not find root mount point in dist/index.html');
    const relative = route === '/' ? '' : route.slice(1);
    const target = join(dist, relative, 'index.html');
    await mkdir(resolve(target, '..'), { recursive: true });
    await writeFile(target, output, 'utf8');
    console.log(`Prerendered ${route} — ${title}`);
  }
} finally {
  if (browser) await browser.close();
  server.kill('SIGTERM');
}
