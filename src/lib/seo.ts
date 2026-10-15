import { useEffect } from 'react';
import { BUSINESS_NAME } from '../data/contact';
import { absoluteUrl, DEFAULT_OG_IMAGE, type JsonLd } from './schema';
import type { PageMeta } from './pageMeta';

export interface PageSEOOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  /** When false, " | Martinez Brothers" is appended to the title. Titles in seo.ts are complete, so default true. */
  rawTitle?: boolean;
  jsonLd?: JsonLd | JsonLd[];
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}

function setMeta(attr: 'name' | 'property', key: string, content: string | undefined) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!content) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Client-side head management for SPA navigation. The pre-rendered HTML
 * already contains identical tags (see scripts/prerender.ts), so on first
 * load this is effectively a no-op.
 */
export function usePageSEO(opts: PageSEOOptions | null) {
  const key = opts ? JSON.stringify(opts) : '';
  useEffect(() => {
    if (!opts) return;
    const title = opts.rawTitle === false ? `${opts.title} | ${BUSINESS_NAME}` : opts.title;
    const url = absoluteUrl(opts.path);
    const image = absoluteUrl(opts.image ?? DEFAULT_OG_IMAGE);
    const type = opts.type ?? 'website';

    document.title = title;
    setMeta('name', 'description', opts.description);
    setMeta('name', 'robots', opts.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    if (opts.noindex) document.head.querySelector('link[rel="canonical"]')?.remove();
    else setCanonical(url);

    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', opts.description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:site_name', BUSINESS_NAME);
    setMeta('property', 'og:locale', 'en_US');
    setMeta('property', 'article:published_time', type === 'article' ? opts.publishedTime : undefined);
    setMeta('property', 'article:modified_time', type === 'article' ? opts.modifiedTime : undefined);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', opts.description);
    setMeta('name', 'twitter:image', image);

    document.head.querySelectorAll('script[data-schema="page"]').forEach((n) => n.remove());
    const blocks = opts.jsonLd ? (Array.isArray(opts.jsonLd) ? opts.jsonLd : [opts.jsonLd]) : [];
    for (const block of blocks) {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.dataset.schema = 'page';
      s.textContent = JSON.stringify(block);
      document.head.appendChild(s);
    }
  }, [key]);
}

/** Convenience: apply a PageMeta from getPageMeta(). */
export function usePageMeta(meta: PageMeta | null) {
  usePageSEO(
    meta
      ? {
          title: meta.title,
          description: meta.description,
          path: meta.path === '/404' ? '/' : meta.path,
          image: meta.image,
          type: meta.type,
          rawTitle: true,
          jsonLd: meta.jsonLd,
          publishedTime: meta.publishedTime,
          modifiedTime: meta.modifiedTime,
          noindex: meta.noindex,
        }
      : null,
  );
}
