/**
 * Per-route head metadata (title, description, OG, JSON-LD) for every
 * non-blog-post route. Shared by the client `usePageMeta` hook and
 * scripts/prerender.ts (via src/lib/routes.ts) so the static HTML and
 * client-side navigation always agree.
 *
 * Blog post meta lives in blogMeta.ts so the blog content is not pulled
 * into the main client bundle.
 */
import { seo } from '../data/seo';
import { services, getServiceBySlug, getServiceDisplayName } from '../data/services';
import { locations, getLocationBySlug } from '../data/locations';
import { homeFaqs } from '../data/faqs';
import {
  DEFAULT_OG_IMAGE,
  breadcrumbSchema,
  faqPageSchema,
  imageUrl,
  locationServiceSchema,
  serviceSchema,
  type JsonLd,
} from './schema';

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  type: 'website' | 'article';
  /** Absolute or root-relative image URL for og:image */
  image: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  jsonLd: JsonLd[];
}

function compact(items: (JsonLd | null)[]): JsonLd[] {
  return items.filter((x): x is JsonLd => x !== null);
}

const STATIC_PAGES: Record<string, string> = {
  '/services': 'Services',
  '/service-areas': 'Service Areas',
  '/quote': 'Free Estimate',
  '/about': 'About',
  '/projects': 'Projects',
  '/blog': 'Blog',
};

export function getPageMeta(pathname: string): PageMeta | null {
  const path = pathname !== '/' ? pathname.replace(/\/+$/, '') : '/';

  if (path === '/') {
    const s = seo['/'];
    return {
      path,
      ...s,
      type: 'website',
      image: DEFAULT_OG_IMAGE,
      jsonLd: compact([breadcrumbSchema([]), faqPageSchema(homeFaqs)]),
    };
  }

  if (STATIC_PAGES[path]) {
    const s = seo[path];
    return {
      path,
      ...s,
      type: 'website',
      image: DEFAULT_OG_IMAGE,
      jsonLd: [breadcrumbSchema([{ name: STATIC_PAGES[path], path }])],
    };
  }

  const slug = path.slice(1);
  const service = getServiceBySlug(slug);
  if (service) {
    const s = seo[path];
    return {
      path,
      ...s,
      type: 'website',
      image: imageUrl(service.image),
      jsonLd: compact([
        breadcrumbSchema([
          { name: 'Services', path: '/services' },
          { name: getServiceDisplayName(service), path },
        ]),
        serviceSchema(service),
        faqPageSchema(service.faqs),
      ]),
    };
  }

  const location = getLocationBySlug(slug);
  if (location) {
    const s = seo[path];
    return {
      path,
      ...s,
      type: 'website',
      image: imageUrl(location.image),
      jsonLd: compact([
        breadcrumbSchema([
          { name: 'Service Areas', path: '/service-areas' },
          { name: location.name, path },
        ]),
        locationServiceSchema(location),
        faqPageSchema(location.faqs),
      ]),
    };
  }

  return null;
}

export function getNotFoundMeta(): PageMeta {
  return {
    path: '/404',
    ...seo['/404'],
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    noindex: true,
    jsonLd: [],
  };
}

/** Every indexable non-blog-post route. */
export function getStaticRoutes(): string[] {
  return ['/', ...Object.keys(STATIC_PAGES), ...services.map((s) => `/${s.slug}`), ...locations.map((l) => `/${l.slug}`)];
}
