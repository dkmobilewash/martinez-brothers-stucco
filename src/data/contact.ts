/**
 * Single source of truth for business contact details.
 * Anything marked TODO must be confirmed with the owner before launch.
 */

// TODO: confirm production domain with owner (suggested: martinezbrosstucco.com).
// Used for canonical URLs, sitemap, Open Graph and JSON-LD.
export const SITE_URL = 'https://martinezbrosstucco.com';

export const BUSINESS_NAME = 'Martinez Brothers Pro-Finish Stucco';
export const BUSINESS_SHORT_NAME = 'Martinez Brothers';
export const TAGLINE = 'ProFinish Stucco & Lath';

export const contact = {
  phone: '(505) 948-4197',
  phoneRaw: '5059484197',
  phoneHref: 'tel:+15059484197',
  phoneE164: '+1-505-948-4197',
  // TODO: placeholder email — confirm with owner.
  email: 'info@martinezbrosstucco.com',
  address: {
    // TODO: get real street address from owner. Leave empty until confirmed so no fake address is published.
    street: '',
    city: 'Albuquerque',
    state: 'NM',
    zip: '',
  },
  // Approximate city-center coordinates for Albuquerque (used for LocalBusiness geo until the real address is known).
  geo: { latitude: 35.0844, longitude: -106.6504 },
  hours: [
    { days: 'Mon–Fri', time: '7:00 AM – 6:00 PM' },
    { days: 'Sat', time: '8:00 AM – 2:00 PM' },
    { days: 'Sun', time: 'Closed' },
  ],
  hoursShort: 'Mon–Fri 7AM–6PM · Sat 8AM–2PM',
  serviceArea: 'Albuquerque & Surrounding Areas',
  // TODO: add Google Business Profile URL after the profile is set up.
  googleBusinessProfileUrl: '',
  // TODO: add Google review link (g.page/r/...) once the GBP exists.
  googleReviewUrl: '',
  // TODO: add NM contractor license number (CID / GB-2 / MS-6) from owner. Do not invent one.
  licenseNumber: '',
  social: {
    // TODO: add social profile URLs if the owner has them.
    facebook: '',
    instagram: '',
  },
} as const;

export const openingHoursSpecification = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '07:00',
    closes: '18:00',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: 'Saturday',
    opens: '08:00',
    closes: '14:00',
  },
];
