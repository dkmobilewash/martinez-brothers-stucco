import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { BUSINESS_NAME, TAGLINE, contact } from '../../data/contact';
import { services, getServiceDisplayName } from '../../data/services';
import { locations } from '../../data/locations';

const companyLinks = [
  { name: 'About Us', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'All Services', path: '/services' },
  { name: 'Service Areas', path: '/service-areas' },
  { name: 'Free Estimate', path: '/quote' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 pb-20 text-sand-100 lg:pb-0">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <section aria-labelledby="footer-company">
          <Link to="/" className="inline-block rounded-lg bg-white p-2">
            <img
              src="/images/logo-320.webp"
              alt={BUSINESS_NAME}
              width={320}
              height={105}
              loading="lazy"
              className="h-14 w-auto"
            />
          </Link>
          <h2 id="footer-company" className="mt-4 text-base font-semibold text-white">
            {BUSINESS_NAME}
          </h2>
          <p className="mt-1 text-sm text-sand-200">{TAGLINE}. Family-owned stucco contractor serving {contact.serviceArea}.</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href={contact.phoneHref} className="flex items-center gap-2 font-semibold text-white hover:text-sand-200">
                <Phone className="h-4 w-4 text-terracotta-400" aria-hidden="true" />
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-white">
                <Mail className="h-4 w-4 text-terracotta-400" aria-hidden="true" />
                {contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta-400" aria-hidden="true" />
              {/* TODO: show full street address once the owner confirms it */}
              <span>
                {contact.address.street ? `${contact.address.street}, ` : ''}
                {contact.address.city}, {contact.address.state} {contact.address.zip}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-terracotta-400" aria-hidden="true" />
              <span>
                {contact.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}: {h.time}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </section>

        <nav aria-labelledby="footer-services">
          <h2 id="footer-services" className="text-base font-semibold text-white">
            Stucco Services
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/${s.slug}`} className="hover:text-white">
                  {getServiceDisplayName(s)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-8">
          <nav aria-labelledby="footer-areas">
            <h2 id="footer-areas" className="text-base font-semibold text-white">
              Service Areas
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {locations.map((l) => (
                <li key={l.slug}>
                  <Link to={`/${l.slug}`} className="hover:text-white">
                    Stucco in {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-labelledby="footer-company-links">
            <h2 id="footer-company-links" className="text-base font-semibold text-white">
              Company
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {companyLinks.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="hover:text-white">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <section aria-labelledby="footer-cta" className="rounded-2xl bg-terracotta-700 p-6 text-white">
          <h2 id="footer-cta" className="text-xl font-bold text-white">
            Ready to fix or refresh your stucco?
          </h2>
          <p className="mt-2 text-sm text-terracotta-50">
            Free, no-obligation estimates across the Albuquerque metro. Call or send us your project details.
          </p>
          <a href={contact.phoneHref} className="btn mt-5 w-full bg-white text-terracotta-800 hover:bg-sand-50">
            <Phone className="h-5 w-5" aria-hidden="true" />
            {contact.phone}
          </a>
          <Link to="/quote" className="btn mt-3 w-full border border-white/50 text-white hover:bg-white/10">
            Request a Free Estimate
          </Link>
        </section>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-sand-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {BUSINESS_NAME}. All rights reserved.
          </p>
          {/* TODO: add NM contractor license number once provided by the owner */}
          {contact.licenseNumber ? <p>NM License #{contact.licenseNumber}</p> : null}
          <p>Stucco &amp; lath contractor · Albuquerque, New Mexico</p>
        </div>
      </div>
    </footer>
  );
}
