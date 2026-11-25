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
const template = await readFile(join(dist, 'index.html'), 'utf8');

// Keep the XML sitemap and the prerendered route list in sync.
const sitemap = await readFile(join(root, 'public/sitemap.xml'), 'utf8');
const robots = await readFile(join(root, 'public/robots.txt'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>\s*(.*?)\s*<\/loc>/g)].map((match) => match[1].trim());
const sitemapRoutes = sitemapUrls.map((value) => {
  const url = new URL(value);
  if (url.origin !== 'https://heritageautofinance.in' || url.search || url.hash) {
    throw new Error(`Unexpected sitemap URL: ${value}`);
  }
  return url.pathname === '/' ? '/' : url.pathname.replace(/\/$/, '');
});
const expectedRoutes = [...routes].sort();
const actualRoutes = [...sitemapRoutes].sort();
if (new Set(sitemapRoutes).size !== sitemapRoutes.length
  || JSON.stringify(actualRoutes) !== JSON.stringify(expectedRoutes)) {
  throw new Error('Sitemap URLs do not exactly match the public prerender route list.');
}
if (!robots.includes('Sitemap: https://heritageautofinance.in/sitemap.xml')) {
  throw new Error('robots.txt does not reference the canonical sitemap URL.');
}
console.log(`Verified sitemap and robots.txt for ${routes.length} public routes.`);
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
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));

  for (const route of routes) {
    const response = await page.goto(`http://127.0.0.1:4173${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    if (!response?.ok()) throw new Error(`Route failed to load: ${route} (${response?.status()})`);
    await page.locator('#root').waitFor({ state: 'attached', timeout: 10000 });
    await page.waitForFunction(() => {
      const root = document.querySelector('#root');
      const canonical = document.querySelector('link[rel="canonical"]');
      const description = document.querySelector('meta[name="description"]');
      return !!root?.firstElementChild
        && document.title.includes('Heritage Auto Finance')
        && !!canonical?.getAttribute('href')
        && !!description?.getAttribute('content');
    }, { timeout: 15000 });
    await delay(1100);

    const { title, rootHtml, headHtml, canonicalUrl, description } = await page.evaluate(() => ({
      title: document.title,
      rootHtml: document.querySelector('#root')?.innerHTML ?? '',
      headHtml: document.head.innerHTML,
      canonicalUrl: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
      description: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
    }));
    if (!rootHtml || rootHtml.trim().length < 100) throw new Error(`Rendered content is unexpectedly empty: ${route}`);
    const expectedCanonical = `https://heritageautofinance.in${route}`;
    if (canonicalUrl !== expectedCanonical) {
      throw new Error(`Incorrect canonical URL for ${route}: expected ${expectedCanonical}, received ${canonicalUrl}`);
    }
    if (!description.trim()) throw new Error(`Missing meta description for ${route}`);
    const routeMeta = await page.evaluate(() => ({
      ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content') ?? '',
      ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute('content') ?? '',
      ogUrl: document.querySelector('meta[property="og:url"]')?.getAttribute('content') ?? '',
      twitterTitle: document.querySelector('meta[name="twitter:title"]')?.getAttribute('content') ?? '',
    }));
    if (!routeMeta.ogTitle || !routeMeta.ogDescription || routeMeta.ogUrl !== expectedCanonical || !routeMeta.twitterTitle) {
      throw new Error(`Incomplete social metadata for ${route}`);
    }
    if (pageErrors.length) {
      throw new Error(`Browser runtime error on ${route}: ${pageErrors.join('; ')}`);
    }

    const withRouteHead = template.replace(/<head>[\s\S]*?<\/head>/i, () => `<head>${headHtml}</head>`);
    if (withRouteHead === template) throw new Error('Could not replace the HTML document head');
    const output = withRouteHead.replace('<div id="root"></div>', `<div id="root">${rootHtml}</div>`);
    if (output === withRouteHead) throw new Error('Could not find root mount point in the Vite HTML template');

    const relative = route === '/' ? '' : route.slice(1);
    const target = join(dist, relative, 'index.html');
    await mkdir(resolve(target, '..'), { recursive: true });
    await writeFile(target, output, 'utf8');
    console.log(`Prerendered ${route} — ${title} — canonical verified`);
  }
} finally {
  if (browser) await browser.close();
  server.kill('SIGTERM');
}
