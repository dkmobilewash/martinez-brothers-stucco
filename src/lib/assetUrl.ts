/**
 * Cache-busting for files in public/images.
 *
 * Images are served with a long browser cache (vercel.json), and replacing a
 * photo keeps the same file name. Appending a content hash (?v=…) makes the
 * URL change whenever the file changes, so browsers fetch the new image.
 * The hash map is computed from public/images at build time (vite.config.ts).
 */
const versions: Record<string, string> = typeof __IMAGE_VERSIONS__ !== 'undefined' ? __IMAGE_VERSIONS__ : {};

export function assetUrl(path: string): string {
  const v = versions[path];
  return v ? `${path}?v=${v}` : path;
}
