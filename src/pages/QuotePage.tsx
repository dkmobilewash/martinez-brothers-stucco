import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { contact } from '../data/contact';
import { getPageMeta } from '../lib/pageMeta';
import { usePageMeta } from '../lib/seo';
import Breadcrumbs from '../components/Breadcrumbs';
import EstimateForm from '../components/EstimateForm';

const steps = [
  'Send the form or call us with a few project details.',
  'We schedule a visit to look at the walls in person.',
  'You get a clear, written estimate — no pressure, no obligation.',
];

export default function QuotePage() {
  usePageMeta(getPageMeta('/quote'));
  return (
    <section className="section bg-sand-50">
      <div className="container-site">
        <Breadcrumbs items={[{ name: 'Free Estimate' }]} />
        <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="eyebrow">Free Estimate</p>
            <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">Get a Free Stucco Estimate</h1>
            <p className="mt-4 text-lg text-slate-700">
              Tell us about your stucco project in Albuquerque, Rio Rancho, Corrales, Los Lunas, Los Ranchos or the
              Northeast Heights. We&apos;ll follow up to schedule a time to see it in person.
            </p>
            <ol className="mt-8 space-y-4">
              {steps.map((s, i) => (
                <li key={s} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-terracotta-600 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-slate-800">{s}</span>
                </li>
              ))}
            </ol>
            <ul className="mt-10 space-y-4 rounded-2xl bg-white p-6 shadow-sm">
              <li>
                <a href={contact.phoneHref} className="flex items-center gap-3 text-lg font-bold text-slate-900 hover:text-terracotta-700">
                  <Phone className="h-5 w-5 text-terracotta-600" aria-hidden="true" /> {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-slate-700 hover:text-terracotta-700">
                  <Mail className="h-5 w-5 text-terracotta-600" aria-hidden="true" /> {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <Clock className="mt-0.5 h-5 w-5 text-terracotta-600" aria-hidden="true" />
                <span>
                  {contact.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}: {h.time}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <MapPin className="h-5 w-5 text-terracotta-600" aria-hidden="true" /> {contact.serviceArea}
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
            <h2 className="text-2xl font-bold">Tell Us About Your Project</h2>
            <p className="mb-6 mt-1 text-slate-600">Fields marked * are required.</p>
            <EstimateForm source="quote-page" />
          </div>
        </div>
      </div>
    </section>
  );
}
