/**
 * SEO lint: every route must have a title ≤ 60 chars and a description of
 * 70–155 chars, with no missing or duplicate entries.
 * Run: npm run seo:lint (also runs at the start of `npm run build`).
 */
import { seo } from '../src/data/seo';
import { services } from '../src/data/services';
import { locations } from '../src/data/locations';
import { blogPosts } from '../src/data/blog';
import { blogServiceMap } from '../src/data/blogServiceMap';

const TITLE_MAX = 60;
const DESC_MIN = 70;
const DESC_MAX = 155;

const errors: string[] = [];
const warnings: string[] = [];

const required = [
  '/',
  '/services',
  '/service-areas',
  '/quote',
  '/about',
  '/projects',
  '/blog',
  '/404',
  ...services.map((s) => `/${s.slug}`),
  ...locations.map((l) => `/${l.slug}`),
];

function check(key: string, title: string, description: string) {
  if (!title?.trim()) errors.push(`${key}: missing title`);
  else if (title.length > TITLE_MAX) errors.push(`${key}: title is ${title.length} chars (max ${TITLE_MAX}): "${title}"`);
  if (!description?.trim()) errors.push(`${key}: missing description`);
  else if (description.length < DESC_MIN || description.length > DESC_MAX)
    errors.push(`${key}: description is ${description.length} chars (need ${DESC_MIN}–${DESC_MAX})`);
}

for (const path of required) {
  const entry = seo[path];
  if (!entry) {
    errors.push(`${path}: no entry in src/data/seo.ts`);
    continue;
  }
  check(path, entry.title, entry.description);
}

for (const key of Object.keys(seo)) {
  if (!required.includes(key)) warnings.push(`${key}: entry in seo.ts has no matching route`);
}

const slugs = new Set<string>();
for (const post of blogPosts) {
  const key = `/blog/${post.slug}`;
  if (slugs.has(post.slug)) errors.push(`${key}: duplicate blog slug`);
  slugs.add(post.slug);
  check(key, post.seoTitle, post.seoDescription);
  if (!services.some((s) => s.slug === post.relatedService)) errors.push(`${key}: relatedService "${post.relatedService}" is not a service`);
  const mapped = blogServiceMap[post.slug];
  if (!mapped?.length) errors.push(`${key}: missing from blogServiceMap`);
  else for (const s of mapped) if (!services.some((x) => x.slug === s)) errors.push(`${key}: blogServiceMap → unknown service "${s}"`);
}

// Duplicate titles / descriptions across everything
const all = [
  ...Object.entries(seo).map(([k, v]) => [k, v.title, v.description] as const),
  ...blogPosts.map((p) => [`/blog/${p.slug}`, p.seoTitle, p.seoDescription] as const),
];
const seenT = new Map<string, string>();
const seenD = new Map<string, string>();
for (const [k, t, d] of all) {
  if (seenT.has(t)) errors.push(`${k}: duplicate title (also ${seenT.get(t)})`);
  if (seenD.has(d)) errors.push(`${k}: duplicate description (also ${seenD.get(d)})`);
  seenT.set(t, k);
  seenD.set(d, k);
}

// Route collisions between services and locations
const top = [...services.map((s) => s.slug), ...locations.map((l) => l.slug)];
const reserved = ['services', 'service-areas', 'quote', 'about', 'projects', 'blog'];
for (const s of top) {
  if (top.filter((x) => x === s).length > 1) errors.push(`/${s}: slug used by more than one page`);
  if (reserved.includes(s)) errors.push(`/${s}: slug collides with a static route`);
}

for (const w of warnings) console.warn(`⚠ ${w}`);
if (errors.length) {
  console.error(`✗ SEO lint failed (${errors.length}):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✓ SEO lint passed: ${required.length + blogPosts.length} pages checked.`);
