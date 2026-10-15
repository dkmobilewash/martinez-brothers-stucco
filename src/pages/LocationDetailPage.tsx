import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, MapPin, Phone } from 'lucide-react';
import type { Location } from '../data/types';
import { contact } from '../data/contact';
import { services, getServiceDisplayName } from '../data/services';
import { locations } from '../data/locations';
import { getPageMeta } from '../lib/pageMeta';
import { usePageMeta } from '../lib/seo';
import PageHero from '../components/PageHero';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';
import EstimateForm from '../components/EstimateForm';
import ServiceIcon from '../components/ServiceIcon';

export default function LocationDetailPage({ location }: { location: Location }) {
  // Location + per-city Service JSON-LD come from getPageMeta (locationServiceSchema).
  usePageMeta(getPageMeta(`/${location.slug}`));
  const otherAreas = locations.filter((l) => l.slug !== location.slug);

  return (
    <>
      <PageHero
        eyebrow={`Serving ${location.name} · ${location.county}`}
        title={location.heroHeadline}
        description={location.heroDescription}
        image={{ base: location.image, alt: location.imageAlt, width: 1400, height: 933 }}
        breadcrumbs={[{ name: 'Service Areas', path: '/service-areas' }, { name: location.name }]}
      />

      <section className="section bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_380px]">
          <article>
            <h2 className="text-3xl font-bold sm:text-4xl">Your Local Stucco Contractor in {location.name}</h2>
            <div className="prose-site mt-6">
              <p>{location.localInfo}</p>
              {location.extendedContent.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            <div className="mt-8 rounded-2xl bg-sand-50 p-6">
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <MapPin className="h-5 w-5 text-terracotta-600" aria-hidden="true" />
                Neighborhoods &amp; Areas We Serve Near {location.name}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {location.neighborhoods.map((n) => (
                  <li key={n} className="rounded-full bg-white px-3 py-1 text-sm text-slate-700 shadow-sm">
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </article>
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold">Free Stucco Estimate in {location.name}</h2>
              <a href={contact.phoneHref} className="mt-2 inline-flex items-center gap-2 font-semibold text-terracotta-700">
                <Phone className="h-4 w-4" aria-hidden="true" /> {contact.phone}
              </a>
              <div className="mt-4">
                <EstimateForm compact source={`location:${location.slug}`} />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Services available */}
      <section aria-labelledby="loc-services-heading" className="section bg-sand-50">
        <div className="container-site">
          <p className="eyebrow">Services</p>
          <h2 id="loc-services-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
            Stucco Services Available in {location.name}
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/${s.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-sand-100 bg-white p-5 shadow-sm transition hover:border-terracotta-300"
                >
                  <ServiceIcon name={s.icon} className="h-7 w-7 text-terracotta-600" />
                  <span className="mt-3 font-bold text-slate-900 group-hover:text-terracotta-700">
                    {getServiceDisplayName(s)}
                  </span>
                  <span className="mt-1 text-sm text-slate-600">{s.shortDescription}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Climate challenges */}
      <section aria-labelledby="loc-challenges-heading" className="section bg-white">
        <div className="container-site">
          <p className="eyebrow">Local Conditions</p>
          <h2 id="loc-challenges-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
            Stucco Challenges in {location.name}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {location.painPoints.map((p) => (
              <div key={p.title} className="rounded-2xl border border-sand-100 bg-sand-50 p-6">
                <h3 className="flex items-center gap-2 text-lg font-bold">
                  <AlertTriangle className="h-5 w-5 text-terracotta-600" aria-hidden="true" />
                  {p.title}
                </h3>
                <p className="mt-2 text-slate-700">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={location.faqs} heading={`${location.name} Stucco FAQs`} />

      {/* Other areas */}
      <section aria-labelledby="other-areas-heading" className="section bg-white">
        <div className="container-site">
          <h2 id="other-areas-heading" className="text-2xl font-bold sm:text-3xl">
            Other Areas We Serve
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {otherAreas.map((l) => (
              <li key={l.slug}>
                <Link
                  to={`/${l.slug}`}
                  className="flex items-center justify-between rounded-xl border border-sand-200 px-4 py-3 font-medium text-slate-800 hover:border-terracotta-300 hover:text-terracotta-700"
                >
                  {l.name}
                  <ArrowRight className="h-4 w-4 text-terracotta-600" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <Link to="/service-areas" className="font-semibold text-terracotta-700">
              View all service areas →
            </Link>
          </p>
        </div>
      </section>

      <CTASection heading={`Get a Free Stucco Estimate in ${location.name}`} />
    </>
  );
}
