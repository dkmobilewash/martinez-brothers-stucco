/** Build-time route registry (used by scripts/prerender.ts — not imported by the client). */
import { blogPosts, getPostBySlug } from '../data/blog';
import { getBlogPostMeta } from './blogMeta';
import { getPageMeta, getStaticRoutes, type PageMeta } from './pageMeta';

export function getAllRoutes(): string[] {
  return [...getStaticRoutes(), ...blogPosts.map((p) => `/blog/${p.slug}`)];
}

export function resolvePageMeta(path: string): PageMeta | null {
  const m = path.match(/^\/blog\/([^/]+)$/);
  if (m) {
    const post = getPostBySlug(m[1]);
    return post ? getBlogPostMeta(post) : null;
  }
  return getPageMeta(path);
}
