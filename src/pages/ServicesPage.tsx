import { services } from '../data/services';
import { getPageMeta } from '../lib/pageMeta';
import { usePageMeta } from '../lib/seo';
import PageHero from '../components/PageHero';
import ServiceCard from '../components/ServiceCard';
import CTASection from '../components/CTASection';

export default function ServicesPage() {
  usePageMeta(getPageMeta('/services'));
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Stucco Services in Albuquerque, NM"
        description="Eight specialties, one family crew. Whether you're building new, fixing cracks before monsoon season or refreshing a faded exterior, we handle the full wall system from lath to finish."
        image={{ base: '/images/hero/home', alt: 'Martinez Brothers stucco crew on scaffolding at a two-story home', width: 1400, height: 788 }}
        breadcrumbs={[{ name: 'Services' }]}
      />
      <section aria-label="All stucco services" className="section bg-sand-50">
        <div className="container-site">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} headingLevel="h2" />
            ))}
          </div>
          <div className="mx-auto mt-16 max-w-3xl space-y-4 text-lg text-slate-700">
            <h2 className="text-2xl font-bold sm:text-3xl">Not Sure Which Service You Need?</h2>
            <p>
              Many Albuquerque homeowners call us about a crack or a stain and aren&apos;t sure whether it needs a
              patch, a full recoat or something bigger. That&apos;s what the free estimate is for. We&apos;ll look at
              the wall, check parapets, canales and the base of the wall for moisture, and explain the options
              that make sense for your home and budget.
            </p>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
