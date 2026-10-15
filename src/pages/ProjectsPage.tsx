import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { projects } from '../data/projects';
import { getServiceBySlug, getServiceDisplayName } from '../data/services';
import { getPageMeta } from '../lib/pageMeta';
import { usePageMeta } from '../lib/seo';
import PageHero from '../components/PageHero';
import ResponsiveImage from '../components/ResponsiveImage';
import CTASection from '../components/CTASection';

export default function ProjectsPage() {
  usePageMeta(getPageMeta('/projects'));
  const hasPlaceholders = projects.some((p) => p.placeholder);
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Stucco Projects in Albuquerque"
        description="A look at stucco installation, repair, recoat and EIFS work from around the metro."
        image={{ base: '/images/hero/about', alt: 'Finished stucco wall', width: 1400, height: 788 }}
        breadcrumbs={[{ name: 'Projects' }]}
      />
      <section aria-label="Project gallery" className="section bg-sand-50">
        <div className="container-site">
          {hasPlaceholders && (
            <p className="mb-8 rounded-xl border border-sand-200 bg-white p-4 text-center text-slate-700">
              Our project gallery is being updated with fresh photos. Want to see examples similar to your project?
              Ask during your free estimate.
            </p>
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => {
              const service = getServiceBySlug(p.service);
              return (
                <article key={p.id} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                  <ResponsiveImage
                    base={p.image}
                    alt={p.imageAlt}
                    width={1400}
                    height={1050}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-lg font-bold">{p.title}</h2>
                    <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                      <MapPin className="h-4 w-4 text-terracotta-600" aria-hidden="true" /> {p.location}
                    </p>
                    <p className="mt-3 text-slate-600">{p.description}</p>
                    {service && (
                      <Link to={`/${service.slug}`} className="mt-4 inline-block text-sm font-semibold text-terracotta-700">
                        {getServiceDisplayName(service)} →
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
