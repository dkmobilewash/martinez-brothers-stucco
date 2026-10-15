/**
 * Customer testimonials.
 *
 * TODO: Replace with REAL reviews from customers (with their permission) or
 * pull from the Google Business Profile once it exists. Do not publish
 * invented reviews. While this array is empty, the TestimonialsSection
 * renders a "be one of our first reviews" prompt instead of quotes, and no
 * Review/AggregateRating schema is emitted.
 */
export interface Testimonial {
  name: string;
  /** e.g. "Rio Rancho" */
  location: string;
  /** 1–5 */
  rating: number;
  text: string;
  service?: string;
  /** ISO date */
  date?: string;
  source?: 'Google' | 'Facebook' | 'Direct';
}

export const testimonials: Testimonial[] = [
  // Example shape (do not uncomment with fake data):
  // {
  //   name: 'First L.',
  //   location: 'Northeast Heights',
  //   rating: 5,
  //   text: 'Real customer review text goes here.',
  //   service: 'stucco-repairs',
  //   date: '2026-05-01',
  //   source: 'Google',
  // },
];
