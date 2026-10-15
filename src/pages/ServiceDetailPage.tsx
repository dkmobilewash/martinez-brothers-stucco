import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, CheckCircle2, Clock, DollarSign, MapPin } from 'lucide-react';
import type { Service } from '../data/types';
import { services, getServiceDisplayName } from '../data/services';
import { locations } from '../data/locations';
import { blogPosts } from '../data/blog';
import { blogServiceMap } from '../data/blogServiceMap';
import { getPageMeta } from '../lib/pageMeta';
import { usePageMeta } from '../lib/seo';
import PageHero from '../components/PageHero';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';
import EstimateForm from '../components/EstimateForm';
import ServiceIcon from '../components/ServiceIcon';
import ResponsiveImage from '../components/ResponsiveImage';

function formatPrice(n: number): string {
  return n % 1 === 0 ? `$${n.toLocaleString('en-US')}` : `$${n.toFixed(2)}`;
}

export default function ServiceDetailPage({ service }: { service: Service }) {
  usePageMeta(getPageMeta(`/${service.slug}`));
  const display = getServiceDisplayName(service);
  const relatedPosts = blogPosts.filter((p) => (blogServiceMap[p.slug] ?? []).includes(service.slug)).slice(0, 3);
  const otherServices = services.filter((s) => s.slug !== service.slug);
  const { pricing } = service;

  return (
    <>
      <PageHero
        eyebrow={`${display} · Albuquerque, NM`}
        title={service.heroHeadline}
        description={service.heroDescription}
        image={{ base: service.image, alt: service.imageAlt, width: 1400, height: 933 }}
        breadcrumbs={[{ name: 'Services', path: '/services' }, { name: display }]}
      />

      {/* Overview + sidebar */}
      <section className="section bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_380px]">
          <article>
            <h2 className="text-3xl font-bold sm:text-4xl">{display} for Albuquerque Homes &amp; Businesses</h2>
            <div className="prose-site mt-6">
              {service.overview.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>

            <h2 className="mt-12 text-2xl font-bold sm:text-3xl">{service.whyItMatters.heading}</h2>
            <div className="prose-site mt-4">
              {service.whyItMatters.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>

            <h2 className="mt-12 text-2xl font-bold sm:text-3xl">Benefits of Professional {display}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 rounded-xl bg-sage-50 p-4 text-slate-800">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sage-600" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-2xl border border-sand-200 bg-sand-50 p-6">
              <div className="flex items-center gap-3">
                <span className="rounded-xl bg-white p-2.5 text-terracotta-700 shadow-sm">
                  <ServiceIcon name={service.icon} className="h-6 w-6" />
                </span>
                <h2 className="text-lg font-bold">Typical {display} Cost</h2>
              </div>
              <p className="mt-4 text-3xl font-extrabold text-slate-900">
                {formatPrice(pricing.low)}–{formatPrice(pricing.high)}
                {pricing.unit && <span className="text-base font-semibold text-slate-600"> / {pricing.unit}</span>}
              </p>
              <p className="mt-2 text-sm text-slate-600">{pricing.note}</p>
            </div>
            <div className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold">Get a Free {display} Estimate</h2>
              <div className="mt-4">
                <EstimateForm compact defaultService={service.slug} source={`service:${service.slug}`} />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process-heading" className="section bg-slate-900 text-white">
        <div className="container-site">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-sand-300">How It Works</p>
          <h2 id="process-heading" className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            Our {display} Process
          </h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.process.map((step, i) => (
              <li key={step.title} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta-600 font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sand-100">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pain points + common signs */}
      <section aria-labelledby="pain-heading" className="section bg-white">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="eyebrow">High Desert Challenges</p>
            <h2 id="pain-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
              {service.painPoints.heading}
            </h2>
            <p className="mt-4 text-lg text-slate-600">{service.painPoints.description}</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {service.painPoints.items.map((item) => (
              <div key={item.title} className="rounded-2xl border border-sand-100 bg-sand-50 p-6">
                <h3 className="flex items-center gap-2 text-lg font-bold">
                  <AlertTriangle className="h-5 w-5 text-terracotta-600" aria-hidden="true" />
                  {item.title}
                </h3>
                <p className="mt-2 text-slate-700">{item.description}</p>
              </div>
            ))}
          </div>

          {service.commonSigns && (
            <div className="mt-14 grid gap-8 rounded-2xl bg-terracotta-50 p-8 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold sm:text-3xl">{service.commonSigns.heading}</h2>
                <p className="mt-3 text-slate-700">{service.commonSigns.description}</p>
              </div>
              <ul className="space-y-3">
                {service.commonSigns.items.map((sign) => (
                  <li key={sign} className="flex items-start gap-3 text-slate-800">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-600" aria-hidden="true" />
                    {sign}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Why professional */}
      <section aria-labelledby="pro-heading" className="section bg-sand-50">
        <div className="container-site">
          <h2 id="pro-heading" className="max-w-3xl text-3xl font-bold sm:text-4xl">
            {service.whyProfessional.heading}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {service.whyProfessional.reasons.map((r) => (
              <div key={r.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold">{r.title}</h3>
                <p className="mt-2 text-slate-600">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost & timeline */}
      <section aria-labelledby="cost-heading" className="section bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Pricing &amp; Timeline</p>
            <h2 id="cost-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
              {service.costTimeline.heading}
            </h2>
            <div className="prose-site mt-6">
              {service.costTimeline.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            <p className="mt-2 flex items-start gap-3 rounded-xl bg-sage-50 p-4 text-slate-800">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-sage-700" aria-hidden="true" />
              <span>
                <strong>Typical timeline:</strong> {service.costTimeline.timeline}
              </span>
            </p>
          </div>
          <div className="rounded-2xl border border-sand-200 bg-sand-50 p-8">
            <h3 className="flex items-center gap-2 text-xl font-bold">
              <DollarSign className="h-6 w-6 text-terracotta-600" aria-hidden="true" />
              What Affects the Price
            </h3>
            <ul className="mt-5 space-y-3">
              {service.costTimeline.factors.map((f) => (
                <li key={f} className="flex items-start gap-3 text-slate-700">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-terracotta-500" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate-500">
              Prices are typical Albuquerque-area ranges, not quotes. We provide a free written estimate after seeing
              your walls.
            </p>
          </div>
        </div>
      </section>

      <FAQSection faqs={service.faqs} heading={`${display} FAQs`} />

      {/* Service areas for this service */}
      <section aria-labelledby="svc-areas-heading" className="section bg-white">
        <div className="container-site">
          <h2 id="svc-areas-heading" className="text-2xl font-bold sm:text-3xl">
            {display} Across the Albuquerque Metro
          </h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {locations.map((l) => (
              <li key={l.slug}>
                <Link
                  to={`/${l.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-sand-200 bg-sand-50 px-4 py-2 text-sm font-medium text-slate-800 hover:border-terracotta-300 hover:text-terracotta-700"
                >
                  <MapPin className="h-4 w-4 text-terracotta-600" aria-hidden="true" />
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>

          {relatedPosts.length > 0 && (
            <div className="mt-14">
              <h2 className="text-2xl font-bold sm:text-3xl">Related Stucco Guides</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {relatedPosts.map((p) => (
                  <article key={p.slug} className="group relative overflow-hidden rounded-2xl border border-sand-100 bg-white shadow-sm">
                    <ResponsiveImage
                      base={p.image}
                      alt={p.imageAlt}
                      width={1400}
                      height={933}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="aspect-[3/2] w-full object-cover"
                    />
                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-terracotta-600">{p.category}</p>
                      <h3 className="mt-1 font-bold">
                        <Link to={`/blog/${p.slug}`} className="after:absolute after:inset-0 group-hover:text-terracotta-700">
                          {p.title}
                        </Link>
                      </h3>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          <div className="mt-14">
            <h2 className="text-2xl font-bold sm:text-3xl">Other Stucco Services</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {otherServices.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/${s.slug}`}
                    className="flex items-center justify-between rounded-xl border border-sand-200 px-4 py-3 font-medium text-slate-800 hover:border-terracotta-300 hover:text-terracotta-700"
                  >
                    {getServiceDisplayName(s)}
                    <ArrowRight className="h-4 w-4 text-terracotta-600" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection heading={`Ready for ${display}?`} />
    </>
  );
}
