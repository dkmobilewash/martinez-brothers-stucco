export interface FAQ {
  question: string;
  answer: string;
}

export interface TitledItem {
  title: string;
  description: string;
}

/** Keys map to Lucide icons in src/components/ServiceIcon.tsx */
export type ServiceIconName =
  | 'hammer'
  | 'refresh'
  | 'home'
  | 'building'
  | 'sparkles'
  | 'wrench'
  | 'layers'
  | 'paintbrush';

export interface ServicePricing {
  low: number;
  high: number;
  /** Omit for whole-project pricing */
  unit?: 'sq ft';
  /** Short human-readable note shown under the price range */
  note: string;
}

export interface Service {
  slug: string;
  name: string;
  /** Keyword-optimized name used in headings/schema when it differs from `name` */
  seoName?: string;
  icon: ServiceIconName;
  /** 1–2 sentence card blurb */
  shortDescription: string;
  /** Base path of the image (no width/extension), e.g. /images/services/stucco-repairs */
  image: string;
  imageAlt: string;
  heroHeadline: string;
  heroDescription: string;
  overview: string[];
  whyItMatters: { heading: string; paragraphs: string[] };
  process: TitledItem[];
  benefits: string[];
  painPoints: { heading: string; description: string; items: TitledItem[] };
  commonSigns?: { heading: string; description: string; items: string[] };
  whyProfessional: { heading: string; reasons: TitledItem[] };
  costTimeline: {
    heading: string;
    paragraphs: string[];
    factors: string[];
    timeline: string;
  };
  faqs: FAQ[];
  pricing: ServicePricing;
}

export interface Location {
  slug: string;
  name: string;
  county: string;
  /** Nearby neighborhoods / landmarks used in content and schema */
  neighborhoods: string[];
  geo: { latitude: number; longitude: number };
  image: string;
  imageAlt: string;
  heroHeadline: string;
  heroDescription: string;
  /** Short card blurb for the service-areas grid */
  shortDescription: string;
  localInfo: string;
  painPoints: TitledItem[];
  faqs: FAQ[];
  extendedContent: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  category: string;
  /** ISO date YYYY-MM-DD */
  date: string;
  /** ISO date YYYY-MM-DD, optional */
  updated?: string;
  author: string;
  readTime: string;
  /** Base path of the image (no width/extension) */
  image: string;
  imageAlt: string;
  relatedService: string;
  /** `## Heading` → <h2>, everything else → <p> */
  content: string[];
}
