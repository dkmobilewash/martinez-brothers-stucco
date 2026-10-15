/**
 * JSON-LD builders. Pure functions (no DOM) so they run in Vite config,
 * the SSR prerender script and the browser.
 */
import { BUSINESS_NAME, SITE_URL, contact, openingHoursSpecification } from '../data/contact';
import { services, getServiceDisplayName } from '../data/services';
import { locations } from '../data/locations';
import type { BlogPost, FAQ, Location, Service } from '../data/types';

export type JsonLd = Record<string, unknown>;

export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const DEFAULT_OG_IMAGE = '/images/og-image.jpg';

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  if (path === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Responsive image base path → absolute URL of the largest variant. */
export function imageUrl(base: string, width = 1400): string {
  return absoluteUrl(/\.(webp|jpe?g|png)$/.test(base) ? base : `${base}-${width}.webp`);
}

function postalAddress(): JsonLd {
  const a = contact.address;
  return {
    '@type': 'PostalAddress',
    // TODO: streetAddress/postalCode are omitted until the owner confirms the real address.
    ...(a.street ? { streetAddress: a.street } : {}),
    addressLocality: a.city,
    addressRegion: a.state,
    ...(a.zip ? { postalCode: a.zip } : {}),
    addressCountry: 'US',
  };
}

function areaServed(): JsonLd[] {
  return locations.map((l) => ({
    '@type': l.slug === 'northeast-heights' ? 'Place' : 'City',
    name: l.slug === 'northeast-heights' ? 'Northeast Heights, Albuquerque, NM' : `${l.name}, NM`,
  }));
}

export function buildBusinessSchema(): JsonLd {
  const sameAs = [contact.googleBusinessProfileUrl, contact.social.facebook, contact.social.instagram].filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': BUSINESS_ID,
    name: BUSINESS_NAME,
    alternateName: 'Martinez Brothers Stucco',
    url: `${SITE_URL}/`,
    logo: absoluteUrl('/images/logo.png'),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    telephone: contact.phoneE164,
    email: contact.email,
    priceRange: '$$',
    address: postalAddress(),
    geo: { '@type': 'GeoCoordinates', latitude: contact.geo.latitude, longitude: contact.geo.longitude },
    openingHoursSpecification,
    areaServed: areaServed(),
    ...(sameAs.length ? { sameAs } : {}),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Stucco Services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: getServiceDisplayName(s),
          url: absoluteUrl(`/${s.slug}`),
        },
      })),
    },
  };
}

export function buildWebsiteSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: BUSINESS_NAME,
    publisher: { '@id': BUSINESS_ID },
    inLanguage: 'en-US',
  };
}

export function buildSiteJsonLd(): JsonLd[] {
  return [buildBusinessSchema(), buildWebsiteSchema()];
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]): JsonLd {
  const all = [{ name: 'Home', path: '/' }, ...crumbs.filter((c) => c.path !== '/')];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function faqPageSchema(faqs: FAQ[]): JsonLd | null {
  if (!faqs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

function priceSpec(s: Service): JsonLd {
  const p = s.pricing;
  return {
    '@type': 'Offer',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: absoluteUrl('/quote'),
    priceSpecification: {
      '@type': p.unit ? 'UnitPriceSpecification' : 'PriceSpecification',
      priceCurrency: 'USD',
      minPrice: p.low,
      maxPrice: p.high,
      ...(p.unit ? { unitText: 'square foot', referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'FTK' } } : {}),
    },
  };
}

export function serviceSchema(s: Service): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(`/${s.slug}`)}#service`,
    name: `${getServiceDisplayName(s)} in Albuquerque, NM`,
    serviceType: getServiceDisplayName(s),
    description: s.heroDescription,
    url: absoluteUrl(`/${s.slug}`),
    image: imageUrl(s.image),
    provider: { '@id': BUSINESS_ID },
    areaServed: areaServed(),
    offers: priceSpec(s),
  };
}

export function locationServiceSchema(l: Location): JsonLd {
  const placeName = l.slug === 'northeast-heights' ? 'Northeast Heights, Albuquerque, NM' : `${l.name}, NM`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(`/${l.slug}`)}#service`,
    name: `Stucco Services in ${l.name}, NM`,
    serviceType: 'Stucco Contractor',
    description: l.heroDescription,
    url: absoluteUrl(`/${l.slug}`),
    provider: { '@id': BUSINESS_ID },
    areaServed: {
      '@type': l.slug === 'northeast-heights' ? 'Place' : 'City',
      name: placeName,
      geo: { '@type': 'GeoCoordinates', latitude: l.geo.latitude, longitude: l.geo.longitude },
      containedInPlace: { '@type': 'AdministrativeArea', name: `${l.county}, New Mexico` },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Stucco Services in ${l.name}`,
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: `${getServiceDisplayName(s)} in ${l.name}`, url: absoluteUrl(`/${s.slug}`) },
      })),
    },
  };
}

/**
 * Pulls Q&A pairs from blog content: a `## ...?` heading followed by the next
 * paragraph becomes a FAQ entry.
 */
export function faqsFromBlogContent(content: string[]): FAQ[] {
  const faqs: FAQ[] = [];
  content.forEach((block, i) => {
    if (!block.startsWith('## ')) return;
    const question = block.slice(3).trim();
    const next = content[i + 1];
    if (question.endsWith('?') && next && !next.startsWith('## ')) {
      faqs.push({ question, answer: next.trim() });
    }
  });
  return faqs;
}

export function blogPostingSchema(post: BlogPost): JsonLd {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const words = post.content.join(' ').split(/\s+/).length;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: post.title,
    description: post.seoDescription,
    image: imageUrl(post.image),
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { '@type': 'Organization', name: post.author, url: `${SITE_URL}/` },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS_NAME,
      logo: { '@type': 'ImageObject', url: absoluteUrl('/images/logo.png') },
    },
    articleSection: post.category,
    wordCount: words,
    inLanguage: 'en-US',
  };
}
