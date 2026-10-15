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

export default defineConfig({
  plugins: [react(), siteJsonLd()],
  build: {
    target: 'es2020',
  },
  ssr: {
    // Bundle these into the SSR entry so Node can import the output directly.
    noExternal: ['react-router-dom', 'react-router', 'lucide-react'],
  },
});
