# Martinez Brothers Pro-Finish Stucco — Website

Marketing site for **Martinez Brothers Pro-Finish Stucco** (Albuquerque, NM).
Vite 5 + React 18 + TypeScript (strict) + React Router 7 + Tailwind 3, with
every route pre-rendered to static HTML at build time and hosted on Vercel.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server (client-rendered) |
| `npm run build` | SEO lint → client build → SSR build → prerender to `dist/` |
| `npm run seo:lint` | Validates titles (≤ 60) and descriptions (70–155) for every page |
| `npm run typecheck` | `tsc` for app + scripts |
| `npm run images` | Regenerates logo/favicon/OG assets and placeholder photos (needs Python + Pillow) |

## How pre-rendering works

1. `vite build` produces `dist/index.html` (the template). A small Vite plugin
   injects the site-wide **HomeAndConstructionBusiness** and **WebSite** JSON-LD,
   built from `src/data`.
2. `vite build --ssr src/entry-server.tsx` builds `render(url)`, which renders the
   real React tree (`Header`, page, `Footer`) with `renderToPipeableStream` +
   `StaticRouter`, waiting for all `lazy()` pages to resolve.
3. `scripts/prerender.ts` renders every route, injects title/description/canonical/
   Open Graph/Twitter tags and page JSON-LD from `src/lib/pageMeta.ts`, and writes
   `dist/{route}.html`, `dist/404.html` (noindex) and `dist/sitemap.xml`.
   The build **fails** if a page is missing `<header>`/`<nav>`/`<main>`/`<footer>`,
   has ≠ 1 `<h1>`, duplicates a title/description, or links to a route that doesn't exist.

Vercel serves `dist/about.html` at `/about` via `cleanUrls`. There is no catch-all
rewrite, so unknown URLs get `dist/404.html` with a real 404 status.

## Where content lives

| File | Purpose |
|---|---|
| `src/data/contact.ts` | Phone, email, address, hours, domain (`SITE_URL`) |
| `src/data/services.ts` | 8 service pages |
| `src/data/locations.ts` | 6 service-area pages |
| `src/data/blog.ts` / `blogServiceMap.ts` | Blog posts and blog → service cross-links |
| `src/data/seo.ts` | Title + description for every non-blog route |
| `src/data/faqs.ts` | Homepage FAQs |
| `src/data/testimonials.ts` | Reviews (empty until real ones are collected) |
| `src/data/projects.ts` | Project gallery |

Blog `content` is a `string[]`: `## Heading` → `<h2>`, anything else → `<p>`.
A `## Question?` heading plus the following paragraph becomes FAQPage schema.

## Lead form

`EstimateForm` posts to the Supabase `leads` table and a Zapier webhook.
1. Create a Supabase project and run `supabase/migrations/20261015000000_create_leads.sql`.
2. Set `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` and `VITE_ZAPIER_WEBHOOK_URL`
   in Vercel (see `.env.example`).

## Launch checklist (owner TODOs)

Search the code for `TODO` to find each of these:

- [ ] Confirm the domain and update `SITE_URL` (`src/data/contact.ts`), `public/robots.txt` and `vercel.json`
- [ ] Real street address + ZIP (`contact.ts`) — currently omitted from the page and the schema
- [ ] Confirm email address (`contact.ts`)
- [ ] NM contractor license number (`contact.ts`) — shown in the footer once set
- [ ] Google Business Profile + review link (`contact.ts`)
- [ ] Supabase + Zapier env vars (above)
- [x] Real photos: every image slot now uses an owner photo (`photos/`, mapped in `scripts/generate-images.py`)
- [ ] Real testimonials (`testimonials.ts`); add towns to the gallery projects (`projects.ts`)
- [ ] The owners' real story on the About page (`AboutPage.tsx`)
- [ ] Review pricing ranges in `services.ts` / blog posts against actual quotes
- [x] Los Lunas page lives at `/los-lunas`; `/las-lunas` 301-redirects to it (`vercel.json`)
- [ ] Add Google Analytics / Search Console when ready
