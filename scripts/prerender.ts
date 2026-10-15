/**
 * Static pre-rendering.
 *
 * 1. Reads the Vite-built dist/index.html as the template.
 * 2. Renders every route through the real React tree (dist-ssr/entry-server.js).
 * 3. Injects per-page <title>, meta description, canonical, Open Graph,
 *    Twitter tags and page JSON-LD (from src/lib/pageMeta.ts).
 * 4. Writes dist/{route}.html (served at clean URLs by Vercel), dist/404.html
 *    (noindex) and dist/sitemap.xml.
 * 5. Verifies every page has <header>, <nav>, <main>, <footer>, a single <h1>,
 *    a unique title, and that every internal link points to a real route.
 */
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { SITE_URL, BUSINESS_NAME } from '../src/data/contact';
import { blogPosts } from '../src/data/blog';
import { getNotFoundMeta, type PageMeta } from '../src/lib/pageMeta';
import { getAllRoutes, resolvePageMeta } from '../src/lib/routes';
import { absoluteUrl } from '../src/lib/schema';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SSR_ENTRY = join(ROOT, 'dist-ssr', 'entry-server.js');

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function jsonLdTag(obj: unknown): string {
  return `<script type="application/ld+json" data-schema="page">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;
}

function headTags(meta: PageMeta): string {
  const url = absoluteUrl(meta.path);
  const image = absoluteUrl(meta.image);
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
    meta.noindex ? '' : `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    meta.noindex ? '' : `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:type" content="${meta.type}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:site_name" content="${esc(BUSINESS_NAME)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    meta.type === 'article' && meta.publishedTime
      ? `<meta property="article:published_time" content="${meta.publishedTime}" />`
      : '',
    meta.type === 'article' && meta.modifiedTime
      ? `<meta property="article:modified_time" content="${meta.modifiedTime}" />`
      : '',
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
  ];
  return tags.filter(Boolean).join('\n    ');
}

function buildPage(template: string, appHtml: string, meta: PageMeta): string {
  const seoStart = template.indexOf('<!--seo-start-->');
  const seoEnd = template.indexOf('<!--seo-end-->');
  if (seoStart === -1 || seoEnd === -1) throw new Error('Template is missing <!--seo-start--> / <!--seo-end--> markers');
  let html = template.slice(0, seoStart) + headTags(meta) + template.slice(seoEnd + '<!--seo-end-->'.length);
  html = html.replace('<!--page-jsonld-->', meta.jsonLd.map(jsonLdTag).join('\n    '));
  if (!html.includes('<!--app-html-->')) throw new Error('Template is missing <!--app-html-->');
  return html.replace('<!--app-html-->', appHtml);
}

function outFile(path: string): string {
  if (path === '/') return join(DIST, 'index.html');
  return join(DIST, `${path.slice(1)}.html`);
}

function verify(path: string, html: string, errors: string[]) {
  const body = html.slice(html.indexOf('<body'));
  for (const tag of ['<header', '<nav', '<main', '<footer']) {
    if (!body.includes(tag)) errors.push(`${path}: missing ${tag}>`);
  }
  const h1s = body.match(/<h1[\s>]/g)?.length ?? 0;
  if (h1s !== 1) errors.push(`${path}: expected exactly 1 <h1>, found ${h1s}`);
  if (body.includes('aria-busy="true"')) errors.push(`${path}: Suspense fallback rendered instead of page content`);
  if (!/<a [^>]*href="\/[a-z]/.test(body)) errors.push(`${path}: no internal links found`);
}

async function main() {
  const templatePath = join(DIST, 'index.html');
  if (!existsSync(templatePath)) throw new Error('dist/index.html not found — run `vite build` first');
  if (!existsSync(SSR_ENTRY)) throw new Error('dist-ssr/entry-server.js not found — run `vite build --ssr` first');
  const template = readFileSync(templatePath, 'utf8');
  const { render } = (await import(pathToFileURL(SSR_ENTRY).href)) as { render: (url: string) => Promise<string> };

  const routes = getAllRoutes();
  const routeSet = new Set(routes);
  const errors: string[] = [];
  const titles = new Map<string, string>();
  const descriptions = new Map<string, string>();
  const internalLinks = new Map<string, Set<string>>();

  const collectLinks = (path: string, html: string) => {
    for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
      const href = m[1];
      if (/\.[a-z0-9]+$/i.test(href)) continue; // static assets
      if (!internalLinks.has(href)) internalLinks.set(href, new Set());
      internalLinks.get(href)!.add(path);
    }
  };

  for (const path of routes) {
    const meta = resolvePageMeta(path);
    if (!meta) {
      errors.push(`${path}: no page metadata`);
      continue;
    }
    const appHtml = await render(path);
    const html = buildPage(template, appHtml, meta);
    verify(path, html, errors);
    collectLinks(path, html);

    if (titles.has(meta.title)) errors.push(`${path}: duplicate title with ${titles.get(meta.title)}`);
    titles.set(meta.title, path);
    if (descriptions.has(meta.description)) errors.push(`${path}: duplicate description with ${descriptions.get(meta.description)}`);
    descriptions.set(meta.description, path);

    const file = outFile(path);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    console.log(`  ✓ ${path.padEnd(48)} → ${file.replace(`${ROOT}/`, '')}`);
  }

  // 404 page (Vercel serves dist/404.html with a real 404 status)
  const nfMeta = getNotFoundMeta();
  const nfHtml = buildPage(template, await render('/__not-found__'), nfMeta);
  if (!nfHtml.includes('noindex')) errors.push('404.html: missing noindex');
  verify('/404', nfHtml, errors);
  collectLinks('/404', nfHtml);
  writeFileSync(join(DIST, '404.html'), nfHtml);
  console.log(`  ✓ ${'(404)'.padEnd(48)} → dist/404.html`);

  // Broken internal link check
  for (const [href, from] of internalLinks) {
    const normalized = href !== '/' ? href.replace(/\/+$/, '') : '/';
    if (!routeSet.has(normalized)) {
      errors.push(`Broken internal link ${href} (found on ${[...from].slice(0, 3).join(', ')})`);
    }
  }

  // Sitemap
  const today = new Date().toISOString().slice(0, 10);
  const postDates = new Map(blogPosts.map((p) => [`/blog/${p.slug}`, p.updated ?? p.date]));
  const latestPost = blogPosts.map((p) => p.updated ?? p.date).sort().at(-1) ?? today;
  const priority = (p: string) =>
    p === '/' ? '1.0' : p === '/quote' ? '0.9' : p.startsWith('/blog/') ? '0.6' : ['/about', '/projects', '/blog'].includes(p) ? '0.7' : '0.8';
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map((p) => {
      const lastmod = postDates.get(p) ?? (p === '/blog' ? latestPost : today);
      return `  <url>\n    <loc>${absoluteUrl(p)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority(p)}</priority>\n  </url>`;
    }),
    '</urlset>',
    '',
  ].join('\n');
  writeFileSync(join(DIST, 'sitemap.xml'), sitemap);
  console.log(`  ✓ sitemap.xml (${routes.length} URLs, ${SITE_URL})`);

  rmSync(join(ROOT, 'dist-ssr'), { recursive: true, force: true });

  if (errors.length) {
    console.error(`\n✗ Prerender verification failed (${errors.length}):`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }
  console.log(`\nPrerendered ${routes.length} routes + 404 with no errors.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
