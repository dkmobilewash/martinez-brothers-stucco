/**
 * Single source of truth for page <title> and meta description on every
 * non-blog route. Blog posts carry their own seoTitle/seoDescription in blog.ts.
 *
 * Read by both scripts/prerender.ts (static HTML) and usePageSEO (client nav).
 * Validated by scripts/seo-lint.ts: title ≤ 60 chars, description 70–155 chars.
 * Titles are used verbatim (no suffix is appended).
 */
export interface SeoEntry {
  title: string;
  description: string;
}

export const seo: Record<string, SeoEntry> = {
  '/': {
    title: 'Stucco Contractor Albuquerque NM | Martinez Brothers',
    description:
      'Family-owned Albuquerque stucco contractor for installation, repair, replacement, EIFS and painting. Free estimates. Call (505) 948-4197.',
  },
  '/services': {
    title: 'Stucco Services in Albuquerque, NM | Martinez Brothers',
    description:
      'Stucco installation, repair, replacement, EIFS, remodeling and painting for Albuquerque homes and businesses. Built for the high desert climate.',
  },
  '/service-areas': {
    title: 'Stucco Service Areas Around Albuquerque | Martinez Bros',
    description:
      'Martinez Brothers serves Albuquerque, Rio Rancho, Corrales, Los Lunas, Los Ranchos and the Northeast Heights. Find stucco services near you.',
  },
  '/quote': {
    title: 'Free Stucco Estimate in Albuquerque | Martinez Brothers',
    description:
      'Request a free, no-obligation stucco estimate in Albuquerque and nearby. Tell us about your project or call (505) 948-4197 today.',
  },
  '/about': {
    title: 'About Martinez Brothers Pro-Finish Stucco | Albuquerque',
    description:
      'Meet Martinez Brothers Pro-Finish Stucco, a family-owned stucco and lath contractor serving Albuquerque homeowners and businesses.',
  },
  '/projects': {
    title: 'Stucco Projects in Albuquerque | Martinez Brothers',
    description:
      'See stucco installation, repair, recoat and EIFS projects from Martinez Brothers Pro-Finish Stucco across the Albuquerque metro area.',
  },
  '/blog': {
    title: 'Albuquerque Stucco Blog: Costs, Repairs & Tips',
    description:
      'Stucco advice for Albuquerque homeowners: repair costs, monsoon prep, adobe care, EIFS vs. traditional stucco and color ideas.',
  },

  // ── Services ────────────────────────────────────────────────
  '/stucco-installation': {
    title: 'Stucco Installation in Albuquerque, NM | Martinez Bros',
    description:
      'Three-coat and one-coat stucco installation for new homes, additions and commercial builds in Albuquerque. Lath, WRB and finish done right.',
  },
  '/stucco-replacement': {
    title: 'Stucco Replacement Albuquerque | Tear-Off & Re-Stucco',
    description:
      'Failing, cracked or water-damaged stucco? We tear off, replace lath and moisture barrier, and re-stucco Albuquerque homes. Free estimate.',
  },
  '/residential-stucco': {
    title: 'Residential Stucco Contractor Albuquerque | Martinez',
    description:
      'Home stucco services in Albuquerque: new stucco, recoats, repairs and color updates for Pueblo, Territorial and modern homes. Call today.',
  },
  '/commercial-stucco': {
    title: 'Commercial Stucco Contractor in Albuquerque, NM',
    description:
      'Commercial stucco and EIFS for Albuquerque retail, office, multifamily and restaurant buildings. Spec-compliant, scheduled around tenants.',
  },
  '/stucco-remodeling': {
    title: 'Stucco Remodeling Albuquerque | Recoats & Exterior Updates',
    description:
      'Update your Albuquerque home with stucco remodeling: new textures, Santa Fe finishes, recoats over old stucco and color changes.',
  },
  '/stucco-repairs': {
    title: 'Stucco Repair Albuquerque NM | Cracks, Leaks & Patching',
    description:
      'Albuquerque stucco repair for cracks, holes, parapet leaks and monsoon water damage. Seamless texture and color matching. Free estimates.',
  },
  '/eifs-synthetic-stucco': {
    title: 'EIFS Stucco Albuquerque | Synthetic Stucco Install & Repair',
    description:
      'EIFS and synthetic stucco installation, repair and inspection in Albuquerque. Drainable systems with insulation for the high desert.',
  },
  '/stucco-painting': {
    title: 'Stucco Painting Albuquerque | Elastomeric Coatings',
    description:
      'Stucco painting and elastomeric coatings in Albuquerque that resist UV fading and seal hairline cracks. Prep, repair and color help included.',
  },

  // ── Service areas ───────────────────────────────────────────
  '/albuquerque': {
    title: 'Albuquerque Stucco Contractor | Repair & Installation',
    description:
      'Local Albuquerque stucco contractor serving Old Town to the Westside. Stucco repair, installation, recoats and EIFS. Call (505) 948-4197.',
  },
  '/rio-rancho': {
    title: 'Stucco Contractor Rio Rancho, NM | Martinez Brothers',
    description:
      'Rio Rancho stucco repair, recoats and new installation for tract and custom homes. HOA color matching and crack repair. Free estimates.',
  },
  '/corrales': {
    title: 'Corrales Stucco Contractor | Adobe & Stucco Repair',
    description:
      'Stucco and adobe-friendly plaster repair in Corrales, NM. Careful work on historic homes, horse properties and Pueblo-style houses.',
  },
  '/las-lunas': {
    title: 'Stucco Contractor Los Lunas, NM | Martinez Brothers',
    description:
      'Stucco repair, installation and recoats in Los Lunas and Valencia County. New construction, settlement cracks and color updates.',
  },
  '/los-ranchos-de-albuquerque': {
    title: 'Los Ranchos de Albuquerque Stucco Repair & Install',
    description:
      'Stucco services for Los Ranchos de Albuquerque estates and North Valley homes. Territorial and Pueblo Revival detail, matched finishes.',
  },
  '/northeast-heights': {
    title: 'Northeast Heights Stucco Repair | Albuquerque NM',
    description:
      'Stucco repair, recoats and replacement for Northeast Heights homes, from mid-century ranches to Sandia foothill customs. Free estimates.',
  },

  // ── Utility ─────────────────────────────────────────────────
  '/404': {
    title: 'Page Not Found | Martinez Brothers Pro-Finish Stucco',
    description:
      'The page you were looking for could not be found. Explore our Albuquerque stucco services, service areas, or request a free estimate.',
  },
};

export function getSeo(path: string): SeoEntry | undefined {
  return seo[path];
}
