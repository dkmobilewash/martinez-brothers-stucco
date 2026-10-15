import { Link } from 'react-router-dom';
import { CheckCircle2, HardHat, HeartHandshake, MessageSquare, Mountain } from 'lucide-react';
import { BUSINESS_NAME } from '../data/contact';
import { services, getServiceDisplayName } from '../data/services';
import { locations } from '../data/locations';
import { getPageMeta } from '../lib/pageMeta';
import { usePageMeta } from '../lib/seo';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import ReviewCTA from '../components/ReviewCTA';

const values = [
  {
    icon: HeartHandshake,
    title: 'Family Accountability',
    text: 'Our name is on every wall. The brothers are on site, answer the phone and stand behind the work.',
  },
  {
    icon: MessageSquare,
    title: 'Straight Answers',
    text: 'If a patch will do, we say so. If the lath or moisture barrier has failed, we show you why before recommending more.',
  },
  {
    icon: HardHat,
    title: 'Craft First',
    text: 'Proper lath, flashing, control joints and curing — the unglamorous steps that decide whether stucco lasts.',
  },
  {
    icon: Mountain,
    title: 'Local Know-How',
    text: 'We build for Albuquerque conditions: UV, wind, monsoon rain, freeze-thaw and the soils under our homes.',
  },
];

const differentiators = [
  'Free, written estimates with clear scope',
  'Texture and color matching for seamless repairs',
  'Adobe-aware recommendations that let walls breathe',
  'Clean job sites and protected landscaping',
  'Residential and commercial experience',
  'Respect for HOA and historic-district requirements',
];

export default function AboutPage() {
  usePageMeta(getPageMeta('/about'));
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={`About ${BUSINESS_NAME}`}
        description="A family-owned stucco and lath contractor serving Albuquerque and the surrounding communities with honest estimates and careful, climate-smart work."
        image={{ base: '/images/hero/about', alt: 'Hand-troweled stucco finish', width: 1400, height: 788 }}
        breadcrumbs={[{ name: 'About' }]}
      />

      <section className="section bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <article className="prose-site">
            <h2 className="!mt-0">Our Story</h2>
            {/* TODO: replace with the owners' real story (founding year, background, family history) — do not invent details. */}
            <p>
              {BUSINESS_NAME} is a family business built on a simple idea: treat every home like it belongs to
              family. We specialize in stucco and lath — new installation, repairs, recoats, EIFS and painting — and
              we focus on doing those things well rather than trying to be everything to everyone.
            </p>
            <p>
              New Mexico is a demanding place for stucco. Our walls bake under some of the strongest sun in the
              country, cool off fast every night, take sideways rain during monsoon season and freeze on winter
              mornings. Good stucco here depends on the steps you can&apos;t see once the finish coat is on, and
              that&apos;s where we put our attention.
            </p>
            <p>
              From Pueblo Revival and Territorial homes to Westside tract houses, foothill customs and commercial
              buildings, we take the time to understand each wall before we touch it — and we explain what we find
              in plain language.
            </p>
          </article>
          <div className="rounded-2xl bg-sand-50 p-8">
            <h2 className="text-2xl font-bold">What Sets Us Apart</h2>
            <ul className="mt-6 space-y-3">
              {differentiators.map((d) => (
                <li key={d} className="flex items-start gap-3 text-slate-800">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sage-600" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-heading" className="section bg-sand-50">
        <div className="container-site">
          <h2 id="values-heading" className="text-center text-3xl font-bold sm:text-4xl">
            Our Values
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl bg-white p-6 shadow-sm">
                <Icon className="h-8 w-8 text-terracotta-600" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site grid gap-12 md:grid-cols-2">
          <nav aria-labelledby="about-services">
            <h2 id="about-services" className="text-2xl font-bold">
              Our Services
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/${s.slug}`} className="text-terracotta-700 hover:underline">
                    {getServiceDisplayName(s)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-labelledby="about-areas">
            <h2 id="about-areas" className="text-2xl font-bold">
              Areas We Serve
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {locations.map((l) => (
                <li key={l.slug}>
                  <Link to={`/${l.slug}`} className="text-terracotta-700 hover:underline">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="container-site mt-14 max-w-3xl">
          <ReviewCTA />
        </div>
      </section>

      <CTASection />
    </>
  );
}
