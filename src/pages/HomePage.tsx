import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Mountain, Phone, ShieldCheck, Sun, Users } from 'lucide-react';
import { BUSINESS_NAME, contact } from '../data/contact';
import { services } from '../data/services';
import { locations } from '../data/locations';
import { projects } from '../data/projects';
import { homeFaqs } from '../data/faqs';
import { getPageMeta } from '../lib/pageMeta';
import { usePageMeta } from '../lib/seo';
import ResponsiveImage from '../components/ResponsiveImage';
import ServiceCard from '../components/ServiceCard';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';
import EstimateForm from '../components/EstimateForm';

const reasons = [
  {
    icon: Users,
    title: 'Family-Owned & Local',
    text: 'The Martinez brothers run the jobs themselves. You talk to the people doing the work, not a call center.',
  },
  {
    icon: Mountain,
    title: 'Built for the High Desert',
    text: 'Moist-cured base coats, proper control joints and UV-stable finishes for 5,000+ ft sun, wind and freeze-thaw.',
  },
  {
    icon: Sun,
    title: 'Monsoon-Ready Detailing',
    text: 'Parapets, canales, window heads and weep screeds detailed so July and August storms stay outside the wall.',
  },
  {
    icon: ShieldCheck,
    title: 'Honest, Written Estimates',
    text: 'We explain whether you need a patch, a recoat or a replacement — and put the price in writing before we start.',
  },
];

export default function HomePage() {
  usePageMeta(getPageMeta('/'));

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-slate-900">
        <ResponsiveImage
          base="/images/hero/home"
          alt="Martinez Brothers stucco crew on scaffolding applying stucco to a two-story home"
          width={1400}
          height={788}
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/85 via-slate-900/55 to-slate-900/10" aria-hidden="true" />
        <div className="container-site grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-sand-300">
              Albuquerque&apos;s Family-Owned Stucco &amp; Lath Contractor
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Stucco Contractor in Albuquerque, NM
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sand-100 sm:text-xl">
              {BUSINESS_NAME} installs, repairs and refinishes stucco built to handle New Mexico&apos;s intense sun,
              wild temperature swings and monsoon storms — for homes and businesses across the metro.
            </p>
            <ul className="mt-6 grid max-w-xl gap-2 text-sand-50 sm:grid-cols-2">
              {['Free written estimates', 'Crack & water damage repair', 'Color & texture matching', 'Residential & commercial'].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-sand-300" aria-hidden="true" />
                    {t}
                  </li>
                ),
              )}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/quote" className="btn-primary">
                Get a Free Estimate <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <a href={contact.phoneHref} className="btn-ghost-light">
                <Phone className="h-5 w-5" aria-hidden="true" /> Call {contact.phone}
              </a>
            </div>
          </div>
          <div className="hidden rounded-2xl bg-white p-6 shadow-2xl lg:block">
            <h2 className="text-xl font-bold">Request a Free Estimate</h2>
            <p className="mb-4 mt-1 text-sm text-slate-600">We&apos;ll get back to you quickly to schedule a visit.</p>
            <EstimateForm compact source="home-hero" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section aria-labelledby="services-heading" className="section bg-sand-50">
        <div className="container-site">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Our Services</p>
            <h2 id="services-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
              Complete Stucco Services in Albuquerque
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              From a single cracked parapet to a full tear-off and re-stucco, we handle every stage of the wall — lath,
              base coats, finish and color.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/services" className="btn-secondary">
              View All Stucco Services <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section aria-labelledby="why-heading" className="section bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Why Martinez Brothers</p>
            <h2 id="why-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
              Stucco Done Right for New Mexico&apos;s Climate
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Albuquerque stucco takes a beating: UV at over a mile high, 30-degree swings between afternoon and
              dawn, dry spring winds, sudden monsoon downpours and winter freeze-thaw. Good stucco here starts with
              the details most people never see.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {reasons.map(({ icon: Icon, title, text }) => (
                <div key={title}>
                  <Icon className="h-8 w-8 text-terracotta-600" aria-hidden="true" />
                  <h3 className="mt-3 text-lg font-bold">{title}</h3>
                  <p className="mt-1 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <ResponsiveImage
              base="/images/hero/about"
              alt="Stucco crew applying a finish coat to a commercial storefront from scaffolding"
              width={1400}
              height={788}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* Projects */}
      <section aria-labelledby="projects-heading" className="section bg-sand-50">
        <div className="container-site">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Recent Work</p>
              <h2 id="projects-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
                Stucco Projects Around the Metro
              </h2>
            </div>
            <Link to="/projects" className="inline-flex items-center gap-1 font-semibold text-terracotta-700">
              See all projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p) => (
              <article key={p.id} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <ResponsiveImage
                  base={p.image}
                  alt={p.imageAlt}
                  width={1400}
                  height={1050}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  {p.location && <p className="text-sm text-slate-500">{p.location}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        faqs={homeFaqs}
        heading="Albuquerque Stucco Questions, Answered"
        className="section bg-white"
      />

      {/* Service areas */}
      <section aria-labelledby="areas-heading" className="section bg-sand-50">
        <div className="container-site">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Service Areas</p>
            <h2 id="areas-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
              Serving Albuquerque &amp; Surrounding Communities
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              From the Rio Grande valley to the Sandia foothills, we work across the metro.
            </p>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((l) => (
              <li key={l.slug}>
                <Link
                  to={`/${l.slug}`}
                  className="flex items-center justify-between rounded-xl border border-sand-200 bg-white px-5 py-4 font-semibold text-slate-900 shadow-sm transition hover:border-terracotta-300 hover:text-terracotta-700"
                >
                  Stucco Contractor in {l.name}
                  <ArrowRight className="h-5 w-5 text-terracotta-600" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
