import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { contact } from '../data/contact';
import { services, getServiceDisplayName } from '../data/services';
import { locations } from '../data/locations';
import { getNotFoundMeta } from '../lib/pageMeta';
import { usePageMeta } from '../lib/seo';

export default function NotFoundPage() {
  usePageMeta(getNotFoundMeta());
  return (
    <section className="section bg-sand-50">
      <div className="container-site max-w-4xl text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">We couldn&apos;t find that page</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
          The page may have moved or the link may be mistyped. Here are some helpful places to start.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
          <Link to="/quote" className="btn-secondary">
            Get a Free Estimate
          </Link>
          <a href={contact.phoneHref} className="btn-secondary">
            <Phone className="h-5 w-5" aria-hidden="true" /> {contact.phone}
          </a>
        </div>
        <div className="mt-14 grid gap-8 text-left sm:grid-cols-2">
          <nav aria-labelledby="nf-services">
            <h2 id="nf-services" className="text-xl font-bold">
              Stucco Services
            </h2>
            <ul className="mt-3 space-y-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/${s.slug}`} className="inline-flex items-center gap-1 text-terracotta-700 hover:underline">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" /> {getServiceDisplayName(s)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-labelledby="nf-areas">
            <h2 id="nf-areas" className="text-xl font-bold">
              Service Areas
            </h2>
            <ul className="mt-3 space-y-2">
              {locations.map((l) => (
                <li key={l.slug}>
                  <Link to={`/${l.slug}`} className="inline-flex items-center gap-1 text-terracotta-700 hover:underline">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" /> {l.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/blog" className="inline-flex items-center gap-1 text-terracotta-700 hover:underline">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" /> Stucco Blog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
