import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { locations } from '../data/locations';
import { contact } from '../data/contact';
import { getPageMeta } from '../lib/pageMeta';
import { usePageMeta } from '../lib/seo';
import PageHero from '../components/PageHero';
import ResponsiveImage from '../components/ResponsiveImage';
import CTASection from '../components/CTASection';

export default function ServiceAreasPage() {
  usePageMeta(getPageMeta('/service-areas'));
  return (
    <>
      <PageHero
        eyebrow="Where We Work"
        title="Stucco Service Areas Around Albuquerque"
        description="From the cottonwoods of the North Valley to the mesas of Rio Rancho and the Sandia foothills, we bring the same careful stucco work to every corner of the metro."
        image={{ base: '/images/hero/about', alt: 'Stucco home in the Albuquerque metro area', width: 1400, height: 788 }}
        breadcrumbs={[{ name: 'Service Areas' }]}
      />
      <section aria-label="Service areas" className="section bg-sand-50">
        <div className="container-site grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((l) => (
            <article key={l.slug} className="group relative flex flex-col overflow-hidden rounded-2xl border border-sand-100 bg-white shadow-sm transition hover:shadow-lg">
              <ResponsiveImage
                base={l.image}
                alt={l.imageAlt}
                width={1400}
                height={933}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="aspect-[3/2] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-6">
                <p className="flex items-center gap-1 text-sm text-slate-500">
                  <MapPin className="h-4 w-4 text-terracotta-600" aria-hidden="true" /> {l.county}
                </p>
                <h2 className="mt-1 text-xl font-bold">
                  <Link to={`/${l.slug}`} className="after:absolute after:inset-0 group-hover:text-terracotta-700">
                    Stucco Contractor in {l.name}
                  </Link>
                </h2>
                <p className="mt-2 flex-1 text-slate-600">{l.shortDescription}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-terracotta-700">
                  View {l.name} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </article>
          ))}
        </div>
        <p className="container-site mt-12 text-center text-lg text-slate-700">
          Don&apos;t see your neighborhood? We regularly work throughout {contact.serviceArea.toLowerCase()} — call{' '}
          <a href={contact.phoneHref} className="font-semibold text-terracotta-700">
            {contact.phone}
          </a>{' '}
          to check.
        </p>
      </section>
      <CTASection />
    </>
  );
}
