import { ChevronDown } from 'lucide-react';
import type { FAQ } from '../data/types';

interface FAQSectionProps {
  faqs: FAQ[];
  heading?: string;
  intro?: string;
  id?: string;
  className?: string;
}

/**
 * Accordion built on <details>/<summary>: answers stay in the HTML (good for
 * crawlers and FAQPage parity) and it works before hydration.
 */
export default function FAQSection({
  faqs,
  heading = 'Frequently Asked Questions',
  intro,
  id = 'faq',
  className = 'section bg-sand-50',
}: FAQSectionProps) {
  if (!faqs.length) return null;
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={className}>
      <div className="container-site max-w-4xl">
        <div className="text-center">
          <p className="eyebrow">FAQ</p>
          <h2 id={`${id}-heading`} className="mt-2 text-3xl font-bold sm:text-4xl">
            {heading}
          </h2>
          {intro && <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">{intro}</p>}
        </div>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <details
              key={f.question}
              className="group rounded-xl border border-sand-200 bg-white shadow-sm open:shadow-md"
              {...(i === 0 ? { open: true } : {})}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                <h3 className="text-base font-semibold sm:text-lg">{f.question}</h3>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-terracotta-600 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="px-5 pb-5 leading-relaxed text-slate-700">{f.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
