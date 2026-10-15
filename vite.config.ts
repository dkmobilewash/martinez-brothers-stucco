import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { buildSiteJsonLd } from './src/lib/schema';

/**
 * Injects the site-wide HomeAndConstructionBusiness + WebSite JSON-LD into
 * index.html. Because dist/index.html is the prerender template, the schema
 * is carried to every pre-rendered page. Built from src/data so it never
 * drifts from the visible content.
 */
function siteJsonLd(): Plugin {
  return {
    name: 'site-jsonld',
    transformIndexHtml(html) {
      const tags = buildSiteJsonLd()
        .map((obj) => `<script type="application/ld+json" data-schema="site">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`)
        .join('\n    ');
      return html.replace('<!--site-jsonld-->', tags);
    },
  };
}

/** Content hash for every file in public/images, keyed by its URL path. */
function imageVersions(): Record<string, string> {
  const root = join(__dirname, 'public');
  const out: Record<string, string> = {};
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else {
        const url = '/' + relative(root, full).split(sep).join('/');
        out[url] = createHash('sha1').update(readFileSync(full)).digest('hex').slice(0, 8);
      }
    }
  };
  walk(join(root, 'images'));
  return out;
}

export default defineConfig({
  define: {
    __IMAGE_VERSIONS__: JSON.stringify(imageVersions()),
  },
  plugins: [react(), siteJsonLd()],
  build: {
    target: 'es2020',
  },
  ssr: {
    // Bundle these into the SSR entry so Node can import the output directly.
    noExternal: ['react-router-dom', 'react-router', 'lucide-react'],
  },
});
