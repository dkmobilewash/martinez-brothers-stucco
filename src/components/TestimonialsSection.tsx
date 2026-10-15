import { Quote, Star } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import ReviewCTA from './ReviewCTA';

export default function TestimonialsSection() {
  return (
    <section aria-labelledby="testimonials-heading" className="section bg-white">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Reviews</p>
          <h2 id="testimonials-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
            What Our Customers Say
          </h2>
        </div>
        {testimonials.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={`${t.name}-${t.text.slice(0, 20)}`} className="rounded-2xl border border-sand-100 bg-sand-50 p-6">
                <Quote className="h-8 w-8 text-terracotta-300" aria-hidden="true" />
                <div className="mt-3 flex gap-0.5 text-sand-500" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-3 text-slate-700">“{t.text}”</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-slate-900">
                  {t.name} <span className="font-normal text-slate-500">· {t.location}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-10 max-w-3xl">
            <ReviewCTA />
          </div>
        )}
      </div>
    </section>
  );
}
