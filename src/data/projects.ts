/**
 * Project gallery.
 *
 * TODO: Replace placeholder entries with real project photos from the owner.
 * Put optimized WebP files in public/images/projects/ as
 * {name}-640.webp, {name}-1024.webp, {name}-1400.webp (4:3 ratio) and update
 * `image`, `title`, `location` and `description`. Set `placeholder: false`
 * on real projects.
 */
export interface Project {
  id: string;
  title: string;
  /** Service area name, e.g. "Rio Rancho" */
  location: string;
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
    id: 'placeholder-1',
    title: 'Full Stucco Recoat',
    location: 'Northeast Heights',
    service: 'stucco-remodeling',
    description: 'Project photos coming soon. This slot will show a recoat on an established Heights home.',
    image: '/images/projects/placeholder-1',
    imageAlt: 'Placeholder image for an upcoming stucco recoat project photo',
    placeholder: true,
  },
  {
    id: 'placeholder-2',
    title: 'Parapet & Canale Repair',
    location: 'Albuquerque',
    service: 'stucco-repairs',
    description: 'Project photos coming soon. This slot will show parapet cap and canale-area stucco repair.',
    image: '/images/projects/placeholder-2',
    imageAlt: 'Placeholder image for an upcoming parapet stucco repair project photo',
    placeholder: true,
  },
  {
    id: 'placeholder-3',
    title: 'New Construction Stucco',
    location: 'Rio Rancho',
    service: 'stucco-installation',
    description: 'Project photos coming soon. This slot will show lath, brown coat and finish on a new home.',
    image: '/images/projects/placeholder-3',
    imageAlt: 'Placeholder image for an upcoming new construction stucco project photo',
    placeholder: true,
  },
  {
    id: 'placeholder-4',
    title: 'Adobe-Compatible Plaster',
    location: 'Corrales',
    service: 'residential-stucco',
    description: 'Project photos coming soon. This slot will show breathable plaster work on an adobe home.',
    image: '/images/projects/placeholder-4',
    imageAlt: 'Placeholder image for an upcoming adobe plaster project photo',
    placeholder: true,
  },
  {
    id: 'placeholder-5',
    title: 'Commercial EIFS Facade',
    location: 'Albuquerque',
    service: 'eifs-synthetic-stucco',
    description: 'Project photos coming soon. This slot will show an EIFS facade on a commercial building.',
    image: '/images/projects/placeholder-5',
    imageAlt: 'Placeholder image for an upcoming commercial EIFS project photo',
    placeholder: true,
  },
  {
    id: 'placeholder-6',
    title: 'Elastomeric Stucco Painting',
    location: 'Los Lunas',
    service: 'stucco-painting',
    description: 'Project photos coming soon. This slot will show an elastomeric color coat on a family home.',
    image: '/images/projects/placeholder-6',
    imageAlt: 'Placeholder image for an upcoming stucco painting project photo',
    placeholder: true,
  },
];
