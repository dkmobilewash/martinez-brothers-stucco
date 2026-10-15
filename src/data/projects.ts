/**
 * Project gallery.
 *
 * To add a project: put the original photo in photos/, map it in
 * scripts/generate-images.py as "projects/{id}" (4:3 crop), run
 * `npm run images`, then add an entry below.
 */
export interface Project {
  id: string;
  title: string;
  /**
   * Service area name, e.g. "Rio Rancho".
   * TODO: add the town for each project once the owner confirms it. Do not guess.
   */
  location?: string;
  /** Service slug for linking */
  service: string;
  description: string;
  /** Base path without width/extension */
  image: string;
  imageAlt: string;
  placeholder: boolean;
}

export const projects: Project[] = [
  {
    id: 'patch-texture-match',
    title: 'Stucco Patch & Texture Match',
    service: 'stucco-repairs',
    description:
      'A large section of wall was rebuilt in base coat, then finished to match the existing texture and color so the repair disappears into the rest of the house.',
    image: '/images/projects/patch-texture-match',
    imageAlt:
      'Before and after of a stucco wall repair: a gray base-coat patch, then the same wall finished to match the surrounding tan texture',
    placeholder: false,
  },
  {
    id: 'modern-smooth-white-stucco',
    title: 'Smooth Modern Stucco Finish',
    service: 'residential-stucco',
    description:
      'Clean, smooth white stucco on a modern home with crisp corners and dark trim, finished for a contemporary look.',
    image: '/images/projects/modern-smooth-white-stucco',
    imageAlt: 'Modern single-story home with a smooth white stucco finish, black window frames and a dark fascia',
    placeholder: false,
  },
  {
    id: 'eifs-two-story-home',
    title: 'EIFS Installation on a Two-Story Home',
    service: 'eifs-synthetic-stucco',
    description:
      'Our crew adhering foam insulation board and applying base coat across a two-story home as part of a full EIFS installation.',
    image: '/images/projects/eifs-two-story-home',
    imageAlt: 'Crew on scaffolding installing EIFS foam board and base coat on a two-story home under construction',
    placeholder: false,
  },
];
