/** Blog slug → related service slugs (first = primary) for cross-linking. */
export const blogServiceMap: Record<string, string[]> = {
  'high-desert-climate-stucco-albuquerque': ['stucco-repairs', 'stucco-painting', 'stucco-replacement'],
  'stucco-repair-cost-albuquerque': ['stucco-repairs', 'stucco-replacement', 'stucco-painting'],
  'adobe-vs-stucco-albuquerque': ['residential-stucco', 'stucco-remodeling', 'stucco-repairs'],
  'stucco-repair-before-monsoon-season': ['stucco-repairs', 'stucco-painting'],
  'eifs-vs-stucco-new-mexico': ['eifs-synthetic-stucco', 'stucco-installation', 'commercial-stucco'],
  'stucco-installation-cost-albuquerque': ['stucco-installation', 'stucco-replacement', 'residential-stucco'],
  'stucco-over-adobe-albuquerque': ['stucco-remodeling', 'residential-stucco', 'stucco-repairs'],
  'stucco-colors-albuquerque-homes': ['stucco-painting', 'stucco-remodeling'],
};

export function getRelatedServiceSlugs(blogSlug: string): string[] {
  return blogServiceMap[blogSlug] ?? [];
}
